"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: graphics_mol.py
"""

import sys

import numpy as np
import numpy.typing as npt
import pandas as pd
import plotly.graph_objects as go
from elemental.enums import FileModel


class MoleculesPlotter:
    """Molecules plotting library."""

    def __init__(self):
        """"""
        self.color_map = {
            "O": [0, 72, 254],
            "C": [254, 134, 0],
            "N": [0, 254, 248],
            "H": [254, 0, 219],
            "F": [0, 0, 0],
            "Cl": [0, 255, 0],
        }

    def __call__(self, data: list[FileModel], target_idx: int):
        """

        :param target_idx:
        """
        fig = go.Figure()

        target = data[target_idx]
        coords = target.energy["final_df"]
        bonds = target.energy["save_info"]

        fig.add_trace(
            self._scatter_atoms(coords, f"{target.software} - {target.functional}")
        )
        fig.add_traces(
            self._draw_bonds(
                bonds, f"{target.software} - {target.functional}", "red", 1
            )
        )

        px = (bonds["x1"] + bonds["x2"]) / 2
        py = (bonds["y1"] + bonds["y2"]) / 2
        pz = (bonds["z1"] + bonds["z2"]) / 2
        labels = list(range(bonds.shape[0]))

        fig.add_trace(
            self._draw_text_points(
                px,
                py,
                pz,
                labels=labels,
                size=4,
                name=f"CENTER - {target.software} - {target.functional}",
            )
        )

        x, y, z = (
            coords["x"].astype(float),
            coords["y"].astype(float),
            coords["z"].astype(float),
        )
        xr, yr, zr = self._get_coordinate_ranges(x, y, z)

        for i, item in enumerate(data):
            if i == target_idx:
                continue

            coords = item.energy["final_df"]
            bonds = item.energy["save_info"]

            fig.add_trace(
                self._scatter_atoms(coords, f"{item.software} - {item.functional}")
            )
            fig.add_traces(
                self._draw_bonds(
                    bonds, f"{item.software} - {item.functional}", "black", 0.2
                )
            )

            px = (bonds["x1"] + bonds["x2"]) / 2
            py = (bonds["y1"] + bonds["y2"]) / 2
            pz = (bonds["z1"] + bonds["z2"]) / 2
            labels = list(range(bonds.shape[0]))

            fig.add_trace(
                self._draw_text_points(
                    px,
                    py,
                    pz,
                    labels=labels,
                    size=2,
                    name=f"CENTER - {item.software} - {item.functional}",
                )
            )

        fig.update_layout(
            scene=dict(
                xaxis=dict(tickvals=xr),
                yaxis=dict(tickvals=yr),
                zaxis=dict(tickvals=zr),
                aspectmode="data",
            )
        )

        return fig

    def _get_atom_colors(self, elements: list[str]) -> npt.NDArray:
        """

        :param elements:
        """
        return np.array([self.color_map.get(el, [100, 100, 100]) for el in elements])

    @classmethod
    def _get_coordinate_ranges(cls, x: list[float], y: list[float], z: list[float]):
        """

        :param x:
        :param y:
        :param z:
        """
        xr = np.arange(round(min(x)) - 1, round(max(x)) + 1)
        yr = np.arange(round(min(y)) - 1, round(max(y)) + 1)
        zr = np.arange(round(min(z)) - 1, round(max(z)) + 1)
        return xr, yr, zr

    def _scatter_atoms(self, coords: pd.DataFrame, name: str):
        """

        :param coords:
        :param name:
        """
        color_vec = self._get_atom_colors(coords["element"])

        return go.Scatter3d(
            x=coords["x"],
            y=coords["y"],
            z=coords["z"],
            name=f"ATOMS - {name}",
            mode="markers+text",
            text=coords["element"],
            marker=dict(size=8, color=color_vec, opacity=1),
        )

    @classmethod
    def _draw_bonds(
        cls, bonds: pd.DataFrame, name: str, color: str = "red", opacity: float = 1
    ) -> list:
        """

        :param bonds:
        :param name:
        :param color:
        :param opacity:
        """
        traces = []
        for i, bond in bonds.iterrows():
            x1, x2 = bond["x1"], bond["x2"]
            y1, y2 = bond["y1"], bond["y2"]
            z1, z2 = bond["z1"], bond["z2"]

            x = [x1, x2, (x1 + x2) / 2]
            y = [y1, y2, (y1 + y2) / 2]
            z = [z1, z2, (z1 + z2) / 2]

            text = f"distance{round(bond['distance'], 5)}"

            traces.append(
                go.Scatter3d(
                    x=x,
                    y=y,
                    z=z,
                    mode="lines",
                    text=text,
                    name=f"BONDS {i} - {name}",
                    marker=dict(color=color, opacity=opacity),
                )
            )

        return traces

    @staticmethod
    def _draw_text_points(
        px: list[float],
        py: list[float],
        pz: list[float],
        labels: list[str | int],
        size: int,
        name: str,
    ):
        """

        :param px:
        :param py:
        :param pz:
        :param size:
        :param name:
        """
        return go.Scatter3d(
            x=px,
            y=py,
            z=pz,
            mode="text",
            name=name,
            text=labels,
            marker=dict(size=size, opacity=1),
        )


if __name__ == "__main__":
    # TODO refactor this entrypoint
    ...
    # def create_sample_molecule_data():
    #     """
    #         Creates sample data for testing MoleculesPlotter
    #
    #         Expected structure for each molecule:
    #         - data[i][0][-1]: bonds matrix with columns [distance, ?, x1, y1, y1, z1, ?, x2, y2, z2].
    #         - data[i][1]: coordinate matrix with columns [element, x, y, z]: coordinate matrix with columns [element, x, y, z].
    #         - data[i][5]: identifier 1
    #         - data[i][6]: identifier 2
    #     """
    #
    #     # Molecule 1: Water (H2O)
    #     coords1 = np.array([
    #         ['O', 0.0, 0.0, 0.0],
    #         ['H', 0.76, 0.59, 0.0],
    #         ['H', -0.76, 0.59, 0.0]
    #     ])
    #
    #     # Water bonds (O-H bonds)
    #     bonds1 = np.array([
    #         [0.96, 0, 0.0, 0.0, 0.0, 0, 0.76, 0.59, 0.0],
    #         [0.96, 0, 0.0, 0.0, 0.0, 0, -0.76, 0.59, 0.0]
    #     ])
    #
    #     molecule1 = [
    #         [None, None, None, None, None, None, None, bonds1],
    #         coords1,
    #         None, None, None,
    #         'MOL', '001'
    #     ]
    #
    #     #  Molecule 2: Methane (CH4)
    #     coords2 = np.array([
    #         ['C', 2.0, 0.0, 0.0],
    #         ['H', 3.09, 0.0, 0.0],
    #         ['H', 1.64, 1.03, 0.0],
    #         ['H', 1.64, -0.51, 0.89],
    #         ['H', 1.64, -0.51, -0.89]
    #     ])
    #
    #     # Methane bonds (C-H bonds)
    #     bonds2 = np.array([
    #         [1.09, 0, 2.0, 0.0, 0.0, 0, 3.09, 0.0, 0.0],  # C-H1
    #         [1.09, 0, 2.0, 0.0, 0.0, 0, 1.64, 1.03, 0.0],  # C-H2
    #         [1.09, 0, 2.0, 0.0, 0.0, 0, 1.64, -0.51, 0.89],  # C-H3
    #         [1.09, 0, 2.0, 0.0, 0.0, 0, 1.64, -0.51, -0.89]  # C-H4
    #     ])
    #
    #     molecule2 = [
    #         [None, None, None, None, None, None, None, bonds2],
    #         coords2,
    #         None, None, None,
    #         'MOL', '002'
    #     ]
    #
    #     return [molecule1, molecule2]
    #
    #
    # sys.stdout.write('Creando datos de muestra... \n')
    #
    # molecules_data = create_sample_molecule_data()
    # example_labels = ['H2O', 'CH4', 'NH3']
    #
    # plotter = MoleculesPlotter(molecules_data, example_labels)
    #
    # sys.stdout.write('Creando visualización... \n')
    #
    # generated_fig = plotter(target_idx=0)
    #
    # generated_fig.update_layout(
    #     title='Visualización de Moléculas - Agua como Target',
    #     title_x=0.5
    # )
    #
    # generated_fig.show()
    #
    # sys.stdout.write('\nProbando con metano como target... \n')
    # generated_fig2 = plotter(target_idx=1)
    # generated_fig2.update_layout(
    #     title='Visualización de Moléculas - Metano como Target',
    #     title_x=0.5
    # )
    # generated_fig2.show()
    #
    # sys.stdout.write('\nVisualizaciones creadas exitosamente! \n')
    # sys.stdout.write('- La molécula target se muestra con bonds rojos y puntos centrales más grandes \n')
    # sys.stdout.write('- Las otras moléculas se muestran con bonds negros y puntos centrales más pequeños \n')
