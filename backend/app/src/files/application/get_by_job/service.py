from collections import defaultdict
from typing import Any

from app.src.files.application.get_by_job.dto import FamilyGroupDTO, VariantCountDTO
from app.src.files.domain.repositories.file_repository import FileRepository


class GetByJobFileService:
    def __init__(self, repository: FileRepository):
        self.repository = repository

    async def execute(self, job_id: str) -> tuple[list[Any], list[tuple[str, str]]]:
        # get data
        files = await self.repository.get_by_job_id(job_id)

        grouped: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
        for file in files:
            grouped[file.family][file.variant] += 1

        # build all software - functional founded on data
        software_variant = {(item.software, item.functional) for item in files}
        software_variant = sorted(software_variant, key=lambda x: (x[0], x[1]))

        # converts to output DTO
        result = []
        for family, variants_dict in grouped.items():
            variants = [
                VariantCountDTO(variant=v, count=c) for v, c in variants_dict.items()
            ]
            result.append(FamilyGroupDTO(family=family, variants=variants))

        return result, software_variant
