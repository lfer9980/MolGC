"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: Main1.py
"""

import json
from collections import defaultdict

from app.infrastructure.molgc.elemental.enums import (
    FileModel,
    MaeVariantModel,
    ReportVariantModel,
    RMSDVariantModel,
)
from app.infrastructure.molgc.elemental.utils import MoleculesPlotter, TopsisUW


class DataReport:
    """Class to generate reports from processed data."""

    def __init__(self, output_path: str = "../../files_ind_eval"):
        """
        :param output_path:
        """
        self.output_path = output_path
        self.plotter = MoleculesPlotter()
        self.columns_mae = ["functional", "percentage"]

    def mae_chart(self, data: list[FileModel]) -> list[MaeVariantModel]:
        """Generates a plot for MAE, and return data as list for external use.

        :param data: list to generate plots :return A list with
            processed data for external usage
        """
        ref_idx = self._find_index(data)

        mae_values: list = []
        for i, item in enumerate(data):
            if i == ref_idx:
                continue

            mae_np = (
                (
                        data[ref_idx].energy["save_info"]["distance"]
                        - item.energy["save_info"]["distance"]
                )
                .abs()
                .mean()
            )
            # returns the percentage
            mae_np = mae_np * 100

            mae_model = MaeVariantModel(
                software=item.software,
                functional=item.functional,
                value=mae_np,
            )

            mae_values.append(mae_model)

        return mae_values

    def mae_grouped_chart(self, data: dict) -> str:
        """Generates JSON Structure.

        :param data:
        """
        labels = data["labels"]

        datasets = []
        for variant_name, variant_data in data["variants"].items():
            dataset_values = [variant_data.get(label, 0) for label in labels]

            datasets.append(
                {"type": "bar", "label": variant_name, "data": dataset_values}
            )

        chart_data = {
            "labels": labels,
            "datasets": datasets,
        }

        json_str = json.dumps(chart_data, indent=2)
        return json_str

    def structure_chart(self, data_type: str, data: list[FileModel]):
        """Save a plot for a specific data group structure, saves HTML and
        returns a JSON with processed plot.

        :param data_type: family, variant or other category for input
            data
        :param data: list to generate plots :return A JSON object to
            render data on external clients such a UI web interface
        """
        ref_idx = self._find_index(data)

        generated_fig = self.plotter(data, ref_idx)
        generated_fig.update_layout(
            title=f"Stacked Molecules for: {data_type}", title_x=0.5
        )

        return generated_fig.to_json()

    def rmsd_chart(self, data: list[FileModel]) -> list[RMSDVariantModel]:
        """Generates a plot for RMSD, and return data as list for external use.

        :param data: list to generate plots :return A list with
            processed data for external usage
        """
        ref_idx = self._find_index(data)

        rmsd_values: list = []
        for i, item in enumerate(data):
            if i == ref_idx:
                continue

            rmsd_model = RMSDVariantModel(
                functional=item.functional,
                software=item.software,
                value=item.energy["rmsd"],
            )

            rmsd_values.append(rmsd_model)

        return rmsd_values

    def mae_topsis_chart(
            self, data: list[ReportVariantModel]
    ) -> tuple[str, list[dict]]:
        """Generates the data structure for the MAE general report.

        :param data: list of ReportVariantModel
        :return: tuple with (chart_data dict, topsis_dataframe)
        """
        mae_values: list = []

        # Group by family
        grouped_by_family = defaultdict(list)
        for report_model in data:
            for mae_entry in report_model.mae:
                grouped_by_family[report_model.family].append(
                    {
                        "functional": mae_entry.functional,
                        "software": mae_entry.software,
                        "value": mae_entry.value,
                    }
                )

        # Calculate means by family and functional
        for family, items in grouped_by_family.items():
            grouped_by_functional = defaultdict(list)

            for idx in items:
                functional_key = f"{idx['software']}/{idx['functional']}"
                grouped_by_functional[functional_key].append(idx["value"])

            for functional, values in grouped_by_functional.items():
                mean = sum(values) / len(values)
                mae_values.append(
                    {
                        "family": family,
                        "functional": functional,
                        "mean": mean,
                    }
                )

        # generates TOPSIS
        topsis = TopsisUW(mae_values)
        topsis_data = topsis()

        # Calculates general mean per functional
        grouped_mean: defaultdict[str, list[float]] = defaultdict(list)
        for element in mae_values:
            grouped_mean[element["functional"]].append(element["mean"])

        for functional, means in grouped_mean.items():
            overall = sum(means) / len(means)
            mae_values.insert(
                0,
                {
                    "family": "AVERAGE",
                    "functional": functional,
                    "mean": overall,
                }
            )

        # Prepare data
        chart_data = self._prepare_mae_general_chart(mae_values)
        chart_string = json.dumps(chart_data, indent=2)

        return chart_string, topsis_data

    @staticmethod
    def _prepare_mae_general_chart(mae_values: list) -> dict:
        """Prepare the Chart.js-compatible data structure for MAE General.

        :param mae_values: list with calculated MAE values
        :return: dictionary with Chart.js structure
        """
        # Obtains all functional labels
        labels = sorted(list(set(item["functional"] for item in mae_values)))

        # group by family
        grouped_by_family = defaultdict(lambda: defaultdict(float))
        for item in mae_values:
            grouped_by_family[item["family"]][item["functional"]] = item["mean"]

        # create datasets
        datasets = []
        for family, functional_data in grouped_by_family.items():
            dataset_values = [functional_data.get(label, 0) for label in labels]
            datasets.append({
                "type": f"{'bar' if family != 'AVERAGE' else 'line'}",
                "label": family,
                "data": dataset_values
            })

        return {
            "labels": labels,
            "datasets": datasets,
            "title": "MAE General - Average by Family and Functional",
        }

    @staticmethod
    def _find_index(data: list[FileModel]) -> int:
        """Utility to find index of reference for a grouped data passed as
        parameter.

        :param data: the data where search is going to be executed
        """
        for i, item in enumerate(data):
            if item.functional == item.reference:
                return i

        return -1
