"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: main1.py
"""

import sys
from collections import defaultdict

import pandas as pd
from elemental.data import DataEnergy, DataLoader, DataReader, DataReport
from elemental.enums import FileModel, FuncEnum, FunctionalModel
from elemental.utils.progress import progress_bar


class IndividualAnalysis:
    """Executes individual analysis process."""

    def __init__(self, path: str):
        """
        :param path:
        """
        self.path: str = path
        self.data: list[FileModel] = []
        self.reference: FileModel | None = None
        self.functional: tuple[FunctionalModel, ...] = ()
        self.loader = DataLoader(path)
        self.reader = DataReader()
        self.energy = DataEnergy()
        self.report = DataReport("../../files_ind_eval")

    def __call__(self):
        """"""
        self.load_data()
        self.extract_data()
        self.process_data()
        self.report_data()

    def load_data(self) -> list:
        """Load data using DataLoader class."""
        self.data = self.loader()
        return self.data

    def extract_data(self):
        """Extract data using DataReader class."""
        _readers = {
            FuncEnum.GAUSSIAN: self.reader.gaussian,
            FuncEnum.CASTEP: self.reader.castep,
            FuncEnum.FHI: self.reader.fhi,
            FuncEnum.CRYSTALS: self.reader.crystals,
        }

        size = len(self.data) - 1
        for i, item in enumerate(self.data):
            read_func = _readers.get(item.software)
            progress_bar(i, size)
            if read_func:
                item.geom = read_func(item.path)

    def process_data(self):
        """Process data using DataEnergy class."""
        self._select_functional()

        grouped_idx = defaultdict(list)
        for i, item in enumerate(self.data):
            grouped_idx[item.variant].append(i)

        for variant, idx in grouped_idx.items():
            ref_idx = next(
                (
                    i
                    for i in idx
                    if (self.data[i].software, self.data[i].functional)
                    == self.functional
                ),
                None,
            )

            if ref_idx is None:
                continue

            ref_geom = self.data[ref_idx].geom
            for i in idx:
                item = self.data[i]
                sys.stdout.write(
                    f"\n--- Processing variant {variant}: {item.software}/{item.functional} --- \n"
                )

                item.energy = self.energy(item.geom, ref_geom)
                item.reference = self.data[ref_idx].functional

        sys.stdout.write(f"\n \nAll files processed successfully! \n")

    def report_data(self):
        """Generates reports of data divide data on parts."""
        mae_report: defaultdict[any, list] = self._report_by_variant()
        self._report_by_family(mae_report)
        self._report_general(mae_report)

        sys.stdout.write(f"\n \nAll files report generated successfully! \n")

    def _report_by_variant(self) -> defaultdict[any, list]:
        """Generates individual report by variant.

        :return: a default dict with all rendered data
        """
        grouped_idx = defaultdict(list)
        for _, item in enumerate(self.data):
            grouped_idx[item.variant].append(item)

        size = len(grouped_idx) - 1
        report: defaultdict[any, list] = defaultdict(list)
        for i, (variant, idx) in enumerate(grouped_idx.items()):
            progress_bar(i, size, "Processing reports by VARIANT")

            self.report.structure_graphs(variant, idx)
            self.report.rmsd_graphs(variant, idx)

            mae_data = self.report.mae_graphs(variant, idx)
            report[variant].extend(mae_data)

        return report

    def _report_by_family(self, data: defaultdict[any, list]) -> any:
        """Generates a report by family (for RMSD, MAE, etc.)

        :param data: a defaultdict with information grouped by specific
            category
        """
        grouped_idx = self._map_data_for_report(data)

        size = len(grouped_idx) - 1
        for i, (category, idx) in enumerate(grouped_idx.items()):
            progress_bar(i, size, "Processing reports by FAMILY")
            self.report.mae_graphs_lines(category, idx)

    def _report_general(self, data: defaultdict[any, list]) -> any:
        """Generates general report of processed data.

        :param data:
        """
        sys.stdout.write(f"\n \nGenerating general report... \n")

        grouped_idx = self._map_data_for_report(data)
        self.report.general(grouped_idx)

    @staticmethod
    def _map_data_for_report(data: defaultdict[any, list]) -> defaultdict[any, list]:
        """

        :param data:
        """
        grouped_idx = defaultdict(list)
        for original_key, items in data.items():
            for item in items:
                family_key = item["family"]

                grouped_idx[family_key].append(
                    {
                        "variant": original_key,
                        "functional": item["functional"],
                        "label": item["label"],
                        "percentage": item["percentage"] * 100,
                        "reference": item["reference"],
                    }
                )

        return grouped_idx

    def _select_functional(self):
        """Function to interactive CLI user selection."""
        unique_functional = {(item.software, item.functional) for item in self.data}
        unique_functional = sorted(unique_functional, key=lambda x: (x[0], x[1]))

        if not unique_functional:
            sys.stdout.write("\nNo Functional and Software found \n")
            return None

        sys.stdout.write("\nFunctional and Software used found: \n")
        for i, item in enumerate(unique_functional):
            sys.stdout.write(f"{i} --> Software: {item[0]}, Functional: {item[1]} \n")

        while True:
            try:
                user_selection = int(
                    input("Enter the integer number of the selected reference: \n")
                )
                if 0 <= user_selection <= len(unique_functional):
                    self.functional = unique_functional[user_selection]
                    break
                else:
                    sys.stdout.write("Introduce a valid integer \n")

            except ValueError:
                sys.stdout.write("Introduce a valid integer \n")

        sys.stdout.write(
            f"Selected option: Software: {self.functional[0]}, Functional: {self.functional[1]} \n"
        )
        return None


if __name__ == "__main__":
    analysis = IndividualAnalysis(path="../../molecules")
    analysis()
