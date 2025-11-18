from app.src.analysis.application.mae_family.create_massive.dto import (
    CreateMAEFamilyDTO,
)
from app.src.analysis.application.mae_family.create_massive.service import (
    MassiveMAEFamilyService,
)
from app.src.analysis.application.mae_general.create.dto import CreateMAEGeneralDTO
from app.src.analysis.application.mae_general.create.service import (
    CreateMAEGeneralService,
)
from app.src.analysis.application.mae_variant.create_massive.dto import (
    CreateMAEVariantDTO,
)
from app.src.analysis.application.mae_variant.create_massive.service import (
    MassiveMAEVariantService,
)
from app.src.analysis.application.rmsd.create_massive.dto import CreateRMSDDTO
from app.src.analysis.application.rmsd.create_massive.service import MassiveRMSDService
from app.src.analysis.application.structure.create_massive.dto import CreateStructureDTO
from app.src.analysis.application.structure.create_massive.service import (
    MassiveStructureService,
)
from app.src.analysis.application.topsis.create_massive.dto import CreateTopsisDTO
from app.src.analysis.application.topsis.create_massive.service import (
    MassiveTopsisService,
)
from app.src.analysis.infrastructure.repository.mae_family_repository import (
    MAEFamilyRepositorySQL,
)
from app.src.analysis.infrastructure.repository.mae_general_repository import (
    MAEGeneralRepositorySQL,
)
from app.src.analysis.infrastructure.repository.mae_variant_repository import (
    MAEVariantRepositorySQL,
)
from app.src.analysis.infrastructure.repository.report_repository import (
    ReportRepositorySQL,
)
from app.src.analysis.infrastructure.repository.rmsd_repository import RMSDRepositorySQL
from app.src.analysis.infrastructure.repository.structure_repository import (
    StructureRepositorySQL,
)
from app.src.analysis.infrastructure.repository.topsis_repository import (
    TopsisRepositorySQL,
)
from app.src.jobs.application.job.update.dto import UpdateJobDTO
from app.src.jobs.application.job.update.service import UpdateJobService
from app.src.jobs.domain.enums import JobAnalysisEnum, JobStatusEnum
from app.src.jobs.domain.repositories.job_repository import JobRepository
from app.src.jobs.infrastructure.repository.job_repository import JobRepositorySQL
from sqlalchemy.ext.asyncio import AsyncSession


async def save_mae_variant_data(
    session: AsyncSession,
    repository_report: ReportRepositorySQL,
    job_id: str,
    mae_variant_data: list[dict],
):
    """Save mae variant data."""
    repository = MAEVariantRepositorySQL(session)

    service = MassiveMAEVariantService(
        repository=repository, repository_report=repository_report
    )

    # parsing data
    mae_variant_dto = [
        CreateMAEVariantDTO(
            family=item["family"],
            variant=item["variant"],
            reference=item["reference"],
            software=mae["software"],
            functional=mae["functional"],
            value=mae["value"],
        )
        for item in mae_variant_data
        for mae in item["mae"]
    ]

    await service.execute(job_id, mae_variant_dto)


async def save_rmsd_variant_data(
    session: AsyncSession,
    repository_report: ReportRepositorySQL,
    job_id: str,
    rmsd_data: list[dict],
):
    """Save structure data."""
    repository = RMSDRepositorySQL(session)

    service = MassiveRMSDService(
        repository=repository,
        repository_report=repository_report,
    )

    # parsing data
    rmsd_variant_dto = [
        CreateRMSDDTO(
            family=item["family"],
            variant=item["variant"],
            reference=item["reference"],
            software=rmsd["software"],
            functional=rmsd["functional"],
            value=rmsd["value"],
        )
        for item in rmsd_data
        for rmsd in item["rmsd"]
    ]

    await service.execute(job_id, rmsd_variant_dto)


async def save_structure_data(
    session: AsyncSession,
    repository_report: ReportRepositorySQL,
    job_id: str,
    structure_data: list[dict],
):
    """Save structure data."""
    repository = StructureRepositorySQL(session)

    service = MassiveStructureService(
        repository=repository,
        repository_report=repository_report,
    )

    # parsing data
    structure_dto = [
        CreateStructureDTO(
            family=item["family"],
            variant=item["variant"],
            reference=item["reference"],
            data=item["structure"],
        )
        for item in structure_data
    ]

    await service.execute(job_id, structure_dto)


async def save_mae_family_data(
    session: AsyncSession,
    repository_report: ReportRepositorySQL,
    job_id: str,
    mae_data: list[dict],
):
    """Save mae data."""
    repository = MAEFamilyRepositorySQL(session)

    service = MassiveMAEFamilyService(
        repository=repository,
        repository_report=repository_report,
    )

    # parsing data
    mae_dto = [CreateMAEFamilyDTO(**item) for item in mae_data]

    await service.execute(job_id, mae_dto)


async def save_mae_general_data(
    session: AsyncSession,
    repository_report: ReportRepositorySQL,
    job_id: str,
    mae_data: str,
):
    """Save mae general data."""
    repository = MAEGeneralRepositorySQL(session)

    service = CreateMAEGeneralService(
        repository=repository,
        repository_report=repository_report,
    )

    # parsing data
    mae_dto = CreateMAEGeneralDTO(data=mae_data)

    await service.execute(job_id, mae_dto)


async def save_topsis_data(
    session: AsyncSession,
    repository_report: ReportRepositorySQL,
    job_id: str,
    topsis_data: list[dict],
):
    """Save topsis data."""
    repository = TopsisRepositorySQL(session)

    service = MassiveTopsisService(
        repository=repository, repository_report=repository_report
    )

    # parsing data
    topsis_dto = [CreateTopsisDTO(**item) for item in topsis_data]

    await service.execute(job_id, topsis_dto)


async def update_job_status(
    session: AsyncSession,
    job_id: str,
):
    """Update job status."""
    job_dto = UpdateJobDTO(
        status=JobStatusEnum.COMPLETED,
    )

    await UpdateJobService.execute(
        session=session,
        job_id=job_id,
        new_data=job_dto,
    )
