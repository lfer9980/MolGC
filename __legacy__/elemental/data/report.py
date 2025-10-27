"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: Main1.py
"""
import os
from collections import defaultdict

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

from plotly.subplots import make_subplots

from elemental.enums import FileModel
from elemental.utils import TopsisUW
from elemental.utils.plotter import MoleculesPlotter


class DataReport:
    """
       Class to generate reports from processed data
    """

    def __init__(self, output_path: str = '../../files_ind_eval'):
        """
            :param output_path:
        """
        self.output_path = output_path
        self.plotter = MoleculesPlotter()
        self.columns_mae = ['functional', 'percentage']

    @staticmethod
    def _find_index(data: list[FileModel]) -> int:
        """
            utility to find index of reference for a grouped data passed as parameter.
            :param data: the data where search is going to be executed
        """
        for i, item in enumerate(data):
            if item.functional == item.reference:
                return i

        return -1

    def _generate_path(self, folders: list[str], filename: str) -> str:
        """
            :param folders:
            :param filename:
            :return: string with folder made it
        """
        directory = os.path.join(self.output_path, *folders)
        full_path = os.path.join(directory, filename)

        if not os.path.exists(directory):
            os.makedirs(directory)

        return full_path

    def structure_graphs(self, data_type: str, data: list[FileModel]):
        """
            save a plot for a specific data group structure, saves HTML and returns a JSON with processed plot

            :param data_type: family, variant or other category for input data
            :param data: list to generate plots
            :return A JSON object to render data on external clients such a UI web interface
        """
        ref_idx = self._find_index(data)

        generated_fig = self.plotter(data, ref_idx)
        generated_fig.update_layout(title=f'Stacked Molecules for: {data_type}', title_x=0.5)

        first_item = data[0]
        folder = [first_item.family, f'{first_item.variant}_files']
        filename = f'{data_type}_structure.html'
        full_path = self._generate_path(folder, filename)

        generated_fig.write_html(full_path, auto_open=False)

        return generated_fig.to_json()

    def mae_graphs(self, data_type: str, data: list[FileModel]) -> list[dict]:
        """
            generates a plot for MAE, and return data as list for external use.

            :param data_type: family, variant or other category for input data
            :param data: list to generate plots
            :return A list with processed data for external usage
        """
        ref_idx = self._find_index(data)
        reference = f'{data[ref_idx].software} - {data[ref_idx].functional}'

        mae_values: list = []
        for i, item in enumerate(data):
            if i == ref_idx:
                continue

            mae_np = (data[ref_idx].energy['save_info']['distance'] - item.energy['save_info']['distance']).abs().mean()
            mae_values.append({
                'family': item.family,
                'functional': f'{item.software}/{item.functional}',
                'percentage': mae_np,
                'label': f'{round(mae_np * 100, 5)}%',
                'reference': reference,
            })

        mae_data: pd.DataFrame = pd.DataFrame(mae_values)

        generated_fig = px.line(mae_data,
                                x='functional',
                                y='percentage',
                                text=mae_data['label'],
                                markers=True
                                )

        generated_fig.update_traces(textposition='top center')
        generated_fig.update_layout(
            title_text=f'{data[ref_idx].variant} Bond lengths MAE Functional vs {reference}',
            title_x=0.5,
        )

        first_item = data[0]
        folder = [first_item.family, f'{first_item.variant}_files']
        filename = f'{data_type}_MAE.html'
        full_path = self._generate_path(folder, filename)

        generated_fig.write_html(full_path, auto_open=False)

        return mae_values

    def mae_graphs_lines(self, data_type: str, data: list):
        """

            :param data_type:
            :param data:
        """
        mae_data: pd.DataFrame = pd.DataFrame(data)

        generated_fig = px.bar(data,
                               x='functional',
                               y='percentage',
                               color='variant',
                               barmode='group',
                               text=mae_data['label'],
                               height=800
                               )

        generated_fig.update_layout(
            title_text=f'Percentage MAE per functional and per molecule of: {data_type} - reference: {mae_data['reference'][0]}',
            title_x=0.5
        )

        folder = [data_type]
        filename = f'{data_type}_MAE_general.html'
        full_path = self._generate_path(folder, filename)

        generated_fig.write_html(full_path, auto_open=False)

    def rmsd_graphs(self, data_type: str, data: list[FileModel]) -> list[dict]:
        """
            generates a plot for RMSD, and return data as list for external use.

            :param data_type: family, variant or other category for input data
            :param data: list to generate plots
            :return A list with processed data for external usage
        """
        ref_idx = self._find_index(data)
        reference = f'{data[ref_idx].software} - {data[ref_idx].functional}'

        rmsd_values: list = []
        for i, item in enumerate(data):
            if i == ref_idx:
                continue

            rmsd_values.append({
                'family': item.family,
                'functional': f'{item.software}/{item.functional}',
                'RMSD': item.energy['rmsd'],
                'label': round(item.energy['rmsd'], 5),
                'reference': reference
            })

        rmsd_data: pd.DataFrame = pd.DataFrame(rmsd_values)

        first_item = data[0]

        generated_fig = px.line(rmsd_data,
                                x='functional',
                                y='RMSD',
                                text=rmsd_data['label'],
                                markers=True
                                )

        generated_fig.update_traces(textposition='top center')
        generated_fig.update_layout(
            title_text=f'{first_item.variant} RMSD of functional vs reference: {reference}',
            title_x=0.5
        )

        folder = [first_item.family, f'{first_item.variant}_files']
        filename = f'{data_type}_RMSD.html'
        full_path = self._generate_path(folder, filename)

        generated_fig.write_html(full_path, auto_open=False)

        return rmsd_values

    @staticmethod
    def topsis_report(data: list) -> pd.DataFrame:
        """
            :return: pd.DataFrame with topsis results
        """
        topsis = TopsisUW(data)
        return topsis()

    def general(self, data: defaultdict[any, list]):
        """
        grouped_idx = defaultdict(list)
        for _, item in enumerate(self.data):
            grouped_idx[item.variant].append(item)

            :param data:
        """
        mae_values: list = []
        for family, items in data.items():
            grouped_idx = defaultdict(list)

            for idx in items:
                grouped_idx[idx['functional']].append(idx)

            for functional, element in grouped_idx.items():
                mapped_values = [x['percentage'] for x in element]
                mean = sum(mapped_values) / len(mapped_values)

                mae_values.append({
                    'family': family,
                    'functional': functional,
                    'mean': mean,
                    'label': str(round(mean, 5))
                })

        # topsis
        topsis_data = self.topsis_report(mae_values)
        topsis_headers = list(topsis_data.columns)
        topsis_values = [topsis_data[col] for col in topsis_headers]

        # average
        grouped_mean: defaultdict[str, list[float]] = defaultdict(list)
        for element in mae_values:
            grouped_mean[element['functional']].append(element['mean'])

        for functional, means in grouped_mean.items():
            overall = sum(means) / len(means)
            mae_values.append({
                'family': 'average',
                'functional': functional,
                'mean': overall,
                'label': f'{overall:.5f}'
            })

        mae_data: pd.DataFrame = pd.DataFrame(mae_values)

        generated_fig = make_subplots(
            rows=2, cols=1,
            specs=[[{'type': 'scatter'}], [{'type': 'table'}]],
            vertical_spacing=0.05
        )

        # subplot for MAE mean scatter

        fig_mae = px.scatter(mae_data,
                             x='functional',
                             y='mean',
                             color='family',
                             text='label',
                             title='Average MAE per functional and family'
                             )

        for trace in fig_mae.data:
            generated_fig.add_trace(trace, row=1, col=1)

        generated_fig.update_traces(
            mode='lines+markers+text',
            textposition='top center',
        )

        generated_fig.update_xaxes(title_text="Functional", row=1, col=1)
        generated_fig.update_yaxes(title_text="MAE medio", row=1, col=1)

        generated_fig.add_trace(
            go.Table(
                header=dict(
                    values=topsis_headers,
                    fill_color='paleturquoise',
                    align='left',
                ),
                cells=dict(
                    values=topsis_values,
                    fill_color='lavender',
                    align='left',
                )
            ),
            row=2,
            col=1,
        )

        generated_fig.update_layout(
            showlegend=True,
            title_text='MAE Summary and TOPSIS Results',
            title_x=0.5,
        )

        # subplot for TOPSIS Table

        filename = f'MAE_general.html'
        full_path = self._generate_path([], filename)

        generated_fig.write_html(full_path, auto_open=False)

        return mae_values, topsis_data
