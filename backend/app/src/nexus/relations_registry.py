from app.src.analysis.infrastructure.models.mae_family_model import MAEFamilyModelSQL
from app.src.analysis.infrastructure.models.mae_general_model import MAEGeneralModelSQL
from app.src.analysis.infrastructure.models.mae_variant_model import MAEVariantModelSQL
from app.src.analysis.infrastructure.models.report_model import ReportModelSQL
from app.src.analysis.infrastructure.models.rmsd_model import RMSDModelSQL
from app.src.analysis.infrastructure.models.structure_model import StructureModelSQL
from app.src.analysis.infrastructure.models.topsis_model import TopsisModelSQL
from app.src.files.infrastructure.models.file_model import FileModelSQL
from app.src.jobs.infrastructure.models.cleanup_model import CleanupModelSQL
from app.src.jobs.infrastructure.models.job_model import JobModelSQL
from sqlalchemy.orm import relationship


def register_all_relationships() -> None:
    """Centralizes all relationships here."""
    register_job_relationships()
    register_cleanup_relationships()
    register_files_relationships()
    register_report_relationships()
    register_mae_general_relationships()
    register_mae_family_relationships()
    register_mae_variant_relationships()
    register_rmsd_relationships()
    register_topsis_relationships()
    register_structure_relationships()


def register_job_relationships():
    """Defines relationships for Session Model."""
    JobModelSQL.files = relationship(
        "FileModelSQL",
        back_populates="job",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    JobModelSQL.reports = relationship(
        "ReportModelSQL",
        back_populates="job",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    JobModelSQL.cleanup = relationship(
        "CleanupModelSQL",
        back_populates="job",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )


def register_cleanup_relationships():
    """Defines relationships for cleanup Model."""
    CleanupModelSQL.job = relationship(
        "JobModelSQL", back_populates="cleanup", passive_deletes=True
    )


def register_files_relationships():
    """Defines relationships for Files Model."""
    FileModelSQL.job = relationship(
        "JobModelSQL", back_populates="files", passive_deletes=True
    )


def register_report_relationships():
    """Defines relationships for Report Model."""
    ReportModelSQL.job = relationship(
        "JobModelSQL", back_populates="reports", passive_deletes=True
    )

    ReportModelSQL.mae_general = relationship(
        "MAEGeneralModelSQL",
        back_populates="report",
        cascade="all, delete-orphan",
        passive_deletes=True,
        uselist=False,
    )

    ReportModelSQL.mae_family = relationship(
        "MAEFamilyModelSQL",
        back_populates="report",
        cascade="all, delete-orphan",
        passive_deletes=True,
        uselist=False,
    )

    ReportModelSQL.structure = relationship(
        "StructureModelSQL",
        back_populates="report",
        cascade="all, delete-orphan",
        passive_deletes=True,
        uselist=False,
    )

    ReportModelSQL.mae_variant = relationship(
        "MAEVariantModelSQL",
        back_populates="report",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    ReportModelSQL.rmsd = relationship(
        "RMSDModelSQL",
        back_populates="report",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    ReportModelSQL.topsis = relationship(
        "TopsisModelSQL",
        back_populates="report",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )


def register_mae_general_relationships():
    """Defines relationships for MAEGeneral Model."""
    MAEGeneralModelSQL.report = relationship(
        "ReportModelSQL", back_populates="mae_general", passive_deletes=True
    )


def register_mae_family_relationships():
    """Defines relationships for MAEFamily Model."""
    MAEFamilyModelSQL.report = relationship(
        "ReportModelSQL", back_populates="mae_family", passive_deletes=True
    )


def register_mae_variant_relationships():
    """Defines relationships for MAEVariant Model."""
    MAEVariantModelSQL.report = relationship(
        "ReportModelSQL", back_populates="mae_variant", passive_deletes=True
    )


def register_rmsd_relationships():
    """Defines relationships for RMSD Model."""
    RMSDModelSQL.report = relationship(
        "ReportModelSQL", back_populates="rmsd", passive_deletes=True
    )


def register_topsis_relationships():
    """Defines relationships for Topsis Model."""
    TopsisModelSQL.report = relationship(
        "ReportModelSQL", back_populates="topsis", passive_deletes=True
    )


def register_structure_relationships():
    """Defines relationships for Topsis Model."""
    StructureModelSQL.report = relationship(
        "ReportModelSQL", back_populates="structure", passive_deletes=True
    )
