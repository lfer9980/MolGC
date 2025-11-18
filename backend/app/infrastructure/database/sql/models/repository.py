from typing import Any, List, Optional, Union

from app.elemental.exceptions import DatabaseError
from app.infrastructure.database.sql.models.tables import ElementalTable
from sqlalchemy import delete, exists, insert
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


class ElementalRepository:
    def __init__(self, model: type[ElementalTable], session: AsyncSession):
        self.model = model
        self.session = session

    async def _get_by_id(self, id: Any) -> Optional[ElementalTable]:
        """Get a record by its primary key ID."""
        instance = await self.session.get(self.model, id)
        return instance

    async def _create(self, instance: ElementalTable) -> ElementalTable:
        """Add a new record and commit."""
        try:
            self.session.add(instance)
            await self._commit()
            await self.session.refresh(instance)
        except SQLAlchemyError as e:
            raise DatabaseError(message="Error saving new instance") from e

        return instance

    async def _delete(self, instance: ElementalTable) -> None:
        """Delete a record and commit."""
        try:
            await self.session.delete(instance)
            await self._commit()
        except SQLAlchemyError as e:
            raise DatabaseError(message="Error deleting the instance") from e

    async def _update(self, instance: ElementalTable) -> ElementalTable:
        """Commit changes to an existing record."""
        try:
            await self._commit()
            await self.session.refresh(instance)
        except SQLAlchemyError as e:
            raise DatabaseError(message="Error updating instance") from e

        return instance

    async def _get_all(
        self, page: int = 1, page_size: int = 10
    ) -> List[ElementalTable]:
        """Get paginated list of records."""
        if page < 1:
            raise DatabaseError(message="Page must be >= 1")
        if page_size < 1:
            raise DatabaseError(message="Page size must be >= 1")

        offset = (page - 1) * page_size
        query = select(self.model).offset(offset).limit(page_size)

        try:
            result = await self.session.execute(query)
            return list(result.scalars().all())
        except SQLAlchemyError as e:
            raise DatabaseError(message="Error fetching records") from e

    async def _commit(self):
        """Helper method for committing a transaction with error handling."""
        try:
            await self.session.commit()
        except SQLAlchemyError as e:
            await self.session.rollback()
            raise e

    async def _filter_by(self, key: str, value: Union[str]) -> List[ElementalTable]:
        """Method for filter by a specific value in a specific key :returns:

        all entries found it.
        """
        valid_keys = self.model.__mapper__.c.keys()

        if key not in valid_keys:
            raise DatabaseError(
                message=f"Error finding: {key} in table: {self.model.__tablename__}"
            )

        column = getattr(self.model, key)
        query = select(self.model).where(column == value)

        try:
            result = await self.session.execute(query)
            return list(result.scalars().all())
        except SQLAlchemyError as e:
            raise DatabaseError(message="Error fetching records") from e

    async def _get_one_by(
        self, key: str, value: Union[str]
    ) -> Optional[ElementalTable]:
        """Method for filter by a specific value in a specific key :returns:

        the first entry found.
        """
        valid_keys = self.model.__mapper__.c.keys()

        if key not in valid_keys:
            raise DatabaseError(
                message=f"Error finding: {key} in table: {self.model.__tablename__}"
            )

        column = getattr(self.model, key)
        query = select(self.model).where(column == value)

        try:
            result = await self.session.execute(query)
            return result.scalar_one_or_none()
        except SQLAlchemyError as e:
            raise DatabaseError(message="Error fetching records") from e

    async def _get_all_by(
        self, key: str, value: Union[str, int]
    ) -> List[ElementalTable]:
        """Returns all records that match a value in a specific column.

        :param key: column name
        :param value: searched value
        :return: list of model instances found (empty if there are no
            matches)
        """
        valid_keys = self.model.__mapper__.c.keys()

        if key not in valid_keys:
            raise DatabaseError(
                message=f"Error finding: {key} in table: {self.model.__tablename__}"
            )

        column = getattr(self.model, key)
        query = select(self.model).where(column == value)

        try:
            result = await self.session.execute(query)
            return result.scalars().all()
        except SQLAlchemyError as e:
            raise DatabaseError(message="Error fetching records") from e

    async def _exists(self, key: str, value: Union[str]) -> bool:
        """Verifies if a specific value on a specific key exists :returns:

        true, if value exists.
        """
        valid_keys = self.model.__mapper__.c.keys()

        if key not in valid_keys:
            raise DatabaseError(
                message=f"Error finding: {key} in table: {self.model.__tablename__}"
            )

        column = getattr(self.model, key)
        query = select(exists().where(column == value))

        try:
            result = await self.session.execute(query)
            return result.scalar()
        except SQLAlchemyError as e:
            raise DatabaseError(
                message=f"Error verifying registration existence"
            ) from e

    async def _bulk_insert(
        self, records: List[dict], chunk_size: int = 1000, return_ids: bool = False
    ) -> Optional[List[Any]]:
        if not records:
            return [] if return_ids else None

        inserted_ids: List[Any] = []

        try:
            for chunk in self._chunked(records, chunk_size):
                if return_ids:
                    try:
                        stmt = insert(self.model).returning(getattr(self.model, "id"))
                        result = await self.session.execute(stmt, chunk)
                        rows = result.fetchall()
                        inserted_ids.extend([r[0] for r in rows])
                    except SQLAlchemyError:
                        await self.session.execute(insert(self.model), chunk)
                else:
                    await self.session.execute(insert(self.model), chunk)

            await self._commit()
            return inserted_ids if return_ids else None

        except SQLAlchemyError as e:
            raise DatabaseError(message=f"Error inserting bulk records: {e}") from e

    async def _bulk_delete(self, id_list: List[str]) -> int:
        """Bulk delete multiple records by id."""
        try:
            column = getattr(self.model, "id")
            stmt = delete(self.model).where(column.in_(id_list))
            result = await self.session.execute(stmt)
            await self.session.commit()
            return result.rowcount or 0

        except SQLAlchemyError as e:
            await self.session.rollback()
            raise

    @staticmethod
    def _chunked(lst: List[dict], size: int):
        for i in range(0, len(lst), size):
            yield lst[i : i + size]
