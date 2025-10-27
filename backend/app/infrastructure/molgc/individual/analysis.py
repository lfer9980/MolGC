"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: main1.py
"""

from collections import defaultdict
from typing import Any, Optional

from app.elemental.tasks.dependencies import scaled_percent
from app.elemental.tasks.enums import TaskStatusEnum
from app.elemental.tasks.types import PublisherType
from app.infrastructure.molgc.elemental.data import (
    DataEnergy,
    DataLoader,
    DataReader,
    DataReport,
)
from app.infrastructure.molgc.elemental.data.exceptions import (
    DataLoaderError,
    DataProcessError,
)
from app.infrastructure.molgc.elemental.enums import (
    FileModel,
    FunctionalModel,
    ReportModel,
    ReportVariantModel,
    SoftEnum,
)


class IndividualAnalysis:
    """Executes individual analysis process."""

    def __init__(
        self,
        path: str,
        reference: str,
        publisher: Optional[PublisherType] = None,
    ):
        self.path: str = path
        self.data: list[FileModel] = []
        self.reference: str = reference

        # processors
        self.loader = DataLoader(path)
        self.reader = DataReader()
        self.energy = DataEnergy()
        self.report = DataReport()
        self.publisher = publisher

    def __call__(self):
        self.load_data()
        self.extract_data()
        self.process_data()
        self.report_data()

    def load_data(self) -> list[FileModel]:
        """Load data using DataLoader class :return: list of FileModel."""
        try:
            self.data = self.loader()

            self.publisher(
                {
                    "progress": 10,
                    "status": TaskStatusEnum.READY,
                    "message": f"{len(self.data)} loaded Successfully to Individual Analysis Service",
                }
            )

            return self.data

        except DataLoaderError as e:
            self.publisher(
                {
                    "progress": 0,
                    "status": TaskStatusEnum.ERROR,
                    "message": str(e),
                }
            )

            raise

    def extract_data(self):
        """Extract data using DataReader class."""
        _readers = {
            SoftEnum.GAUSSIAN: self.reader.gaussian,
            SoftEnum.CASTEP: self.reader.castep,
            SoftEnum.FHI: self.reader.fhi,
            SoftEnum.CRYSTALS: self.reader.crystals,
        }

        size = len(self.data) - 1
        for i, item in enumerate(self.data):
            read_func = _readers.get(item.software)
            if read_func:
                item.geom = read_func(item.path)

            percent = scaled_percent(i, size, 10, 40)
            self.publisher(
                {
                    "progress": percent,
                    "status": TaskStatusEnum.RUNNING,
                    "message": f"Extracting Data...",
                }
            )

    def process_data(self):
        """Process data using DataEnergy class."""
        # creates reference model to compare with actual data
        reference_model = self._create_reference()

        # group the indexes of self.data to have "variant": [1,2,3, N]
        grouped_idx = defaultdict(list)
        for i, item in enumerate(self.data):
            grouped_idx[item.variant].append(i)

        # iterates every variant and performs processing
        size = len(grouped_idx)
        for current_idx, (variant, idx) in enumerate(grouped_idx.items()):
            # find index reference for variant
            ref_idx = next(
                (
                    i
                    for i in idx
                    if (self.data[i].software, self.data[i].functional)
                    == reference_model
                ),
                None,
            )

            # if there is no reference to analyze on current variant continue to next variant
            if ref_idx is None:
                continue

            # obtains the ref geom for the current variant
            ref_geom = self.data[ref_idx].geom

            # analyzing from original data
            for i in idx:
                item = self.data[i]
                item.energy = self.energy(item.geom, ref_geom)

                # save the reference on the original data (for reports)
                item.reference = self.data[ref_idx].functional

            percent = scaled_percent(current_idx, size, 40, 70)
            self.publisher(
                {
                    "progress": percent,
                    "status": TaskStatusEnum.RUNNING,
                    "message": f"Processing Data on variant {current_idx}/{size}: {variant}",
                }
            )

        self.publisher(
            {
                "progress": 70,
                "status": TaskStatusEnum.RUNNING,
                "message": f"All files processed successfully!",
            }
        )

    def report_data(
        self,
    ) -> tuple[list[ReportVariantModel], list[ReportModel], str, list[dict]]:
        """Generates reports of data divide data on parts."""
        report_variant = self._report_by_variant()
        report_family = self._report_by_family(report_variant)
        report_general, topsis = self._report_general(report_variant)

        return report_variant, report_family, report_general, topsis

    def _report_by_variant(self) -> list[ReportVariantModel]:
        """Generates individual report by variant :return: a default dict with
        all rendered data."""
        grouped_idx = defaultdict(list)
        for _, item in enumerate(self.data):
            grouped_idx[item.variant].append(item)

        size = len(grouped_idx)
        report_variant: list[ReportVariantModel] = []
        for i, (variant, idx) in enumerate(grouped_idx.items()):
            report_model = ReportVariantModel(
                family=idx[0].family,
                variant=variant,
                reference=self.reference,
            )

            mae = self.report.mae_chart(idx)
            rmsd = self.report.rmsd_chart(idx)
            structure = self.report.structure_chart(variant, idx)

            report_model.mae.extend(mae)
            report_model.rmsd.extend(rmsd)
            report_model.structure = structure

            percent = scaled_percent(i, size, 70, 80)
            self.publisher(
                {
                    "progress": percent,
                    "status": TaskStatusEnum.RUNNING,
                    "message": f"Processing reports by VARIANT",
                }
            )

            report_variant.append(report_model)

        return report_variant

    def _report_by_family(self, data: list[ReportVariantModel]) -> list[ReportModel]:
        """Generates a report by family (for RMSD, MAE, etc.)

        :param data: a defaultdict with information grouped by specific
            category
        """
        grouped_idx = self._map_data_family(data)

        size = len(grouped_idx)
        report_family: list[ReportModel] = []
        for i, (family, idx) in enumerate(grouped_idx.items()):
            mae_data = self.report.mae_grouped_chart(idx)

            mae_model = ReportModel(
                family=family,
                data=mae_data,
            )

            percent = scaled_percent(i, size, 80, 90)
            self.publisher(
                {
                    "progress": percent,
                    "status": TaskStatusEnum.RUNNING,
                    "message": f"Processing reports by VARIANT",
                }
            )

            report_family.append(mae_model)

        return report_family

    def _report_general(self, data: list[ReportVariantModel]) -> tuple[str, list[dict]]:
        """Generates general report of processed data.

        :param data:
        """
        return self.report.mae_topsis_chart(data)

    def _create_reference(self) -> tuple[SoftEnum, str]:
        """Validates, transforms and creates an object to perform processing
        data :return: an object to perform processing data."""
        if not self.reference:
            self.publisher(
                {
                    "progress": 0,
                    "status": TaskStatusEnum.ERROR,
                    "message": "No Reference Model Found or was not provided",
                }
            )

            raise DataProcessError("No Reference Model Found or was not provided")

        parts = [p.strip() for p in self.reference.split("-")]

        if len(parts) != 2:
            self.publisher(
                {
                    "progress": 0,
                    "status": TaskStatusEnum.ERROR,
                    "message": "Invalid Reference Format, the provided format must be: Software - Functional",
                }
            )

            raise DataProcessError(
                "Invalid Reference Format, the provided format must be: Software - Functional"
            )

        software_str, functional_str = parts

        model = FunctionalModel(
            software=SoftEnum(software_str), functional=functional_str
        )

        return model.software, model.functional

    @staticmethod
    def _map_data_family(data: list[ReportVariantModel]) -> defaultdict[Any, dict]:
        """

        :param data: ReportVariantModel list
        :return:
        """
        grouped_idx = defaultdict(
            lambda: {
                "labels": set(),
                "variants": defaultdict(lambda: defaultdict(float)),
                "reference": None,
            }
        )

        for report_model in data:
            family_key = report_model.family
            variant_name = report_model.variant
            reference = report_model.reference

            for mae_entry in report_model.mae:
                functional = mae_entry.functional
                software = mae_entry.software
                value = mae_entry.value

                label = f"{software}/{functional}"

                grouped_idx[family_key]["labels"].add(label)
                grouped_idx[family_key]["variants"][variant_name][label] = value
                grouped_idx[family_key]["reference"] = reference

        for family_key in grouped_idx:
            grouped_idx[family_key]["labels"] = sorted(
                list(grouped_idx[family_key]["labels"])
            )

        return grouped_idx


if __name__ == "__main__":
    ...
    # analysis = IndividualAnalysis(path='../../molecules')
    # analysis()
