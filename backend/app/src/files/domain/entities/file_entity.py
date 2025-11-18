from uuid import uuid4

from app.elemental.common import ElementalSchema
from app.src.files.domain.value_objects import (
    FileChecksum,
    FileFamily,
    FileFunctional,
    FileID,
    FileJob,
    FileName,
    FilePath,
    FileSize,
    FileSoftware,
    FileVariant,
)
from pydantic import Field


class FileEntity(ElementalSchema):
    id: FileID = Field(default_factory=lambda: str(uuid4().hex), description="File ID")

    job_id: FileJob = Field(description="File Session ID")

    path: FilePath = Field(description="File Path")

    family: FileFamily = Field(description="File Family")

    variant: FileVariant = Field(description="File Variant")

    software: FileSoftware = Field(description="File Software")

    functional: FileFunctional = Field(description="File functional")

    filename: FileName = Field(description="File Name")

    checksum: FileChecksum = Field(description="File Checksum")

    size: FileSize = Field(description="File Size")
