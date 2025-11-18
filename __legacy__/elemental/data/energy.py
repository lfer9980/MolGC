"""
Original Code: Abimael Guzman Pando & Graciela Ramirez
Refactored: Angel Fernandez
File: Function_Gaussian.py
"""

import sys
import warnings
from typing import List, Tuple

import numpy as np
import numpy.typing as npt
import pandas as pd
from elemental.algorithms import Kabsch
from elemental.utils import DotsTransform, get_bond_dataframe, matrix_distance


class DataEnergy:
    """A comprehensive class for processing molecular geometries, performing
    alignment, and analyzing molecular bonds and distance."""

    def __init__(self, tolerance: float = 3.0):
        """Initialize the molecular geometry processor.

        :param: tolerance: Distance tolerance for bond analysis
        """
        self.tolerance = tolerance
        self.bond_table = get_bond_dataframe()
        self.transform = DotsTransform()
        self.aligner = Kabsch()

        self.max_bond_dist = {
            pair: dist
            for pair, dist in zip(self.bond_table.Pairs, self.bond_table.Dist)
        }
        self.COLUMNS: list[str] = [
            "distance",
            "element_1",
            "x1",
            "y1",
            "z1",
            "element_2",
            "x2",
            "y2",
            "z2",
            "r_c",
            "phi_c",
            "z_c",
            "sum_cylindrical",
            "morphism",
        ]

    def __call__(
        self,
        geom: pd.DataFrame,
        ref_geom: pd.DataFrame,
        plot_molecule: bool = False,
        plot_energy: bool = False,
    ) -> dict:
        """Process molecular geometry data from DataFrames.

        :param: geom: DataFrame with molecular geometry (columns:
            element, x, y, z)
        :param: ref_geom: Reference geometry DataFrame for alignment
        :param: plot_molecule: Plotting option for molecule
        :param: plot_energy: Plotting option for energy
        :return: List containing processed data, molecular array, final
            table, RMSD, etc.
        """
        try:
            # Validate input DataFrames
            val_geom, val_ref_geom = self._validate_dataframes(geom, ref_geom)

            # Apply transformations if config provided
            transform_geom = self.transform(val_geom)
            transform_ref_geom = self.transform(val_ref_geom)

            # Align molecules using Kabsch algorithm
            coords = transform_geom[["x", "y", "z"]].values.astype(float)
            ref_coords = transform_ref_geom[["x", "y", "z"]].values.astype(float)

            aligned_coords, rmsd = self.aligner(ref_coords, coords)

            # Update coordinates with aligned values
            final_df = transform_geom.copy()
            final_df[["x", "y", "z"]] = aligned_coords

            # Calculate distance matrix
            distance_matrix = matrix_distance(aligned_coords, aligned_coords)

            # Identify bonds
            elements = final_df["element"].tolist()
            bond_matrix = self._identify_bonds(distance_matrix, elements)

            # Extract unique bond pairs
            bonds, bond_indices = self._extract_bond_pairs(bond_matrix)

            if len(bonds) == 0:
                warnings.warn("No bonds found in the molecule")
                # Return minimal structure
                empty_df = pd.DataFrame(columns=self.COLUMNS)

                return {
                    "save_info": empty_df.values,
                    "final_df": final_df,
                    "rmsd": rmsd,
                }

            # Calculate morphism descriptors
            morphism_descriptors = self._calculate_bond_neighbors(bonds, elements)

            # Calculate cylindrical coordinates
            cylindrical_coords = self._calculate_cylindrical_coordinates(
                bonds, aligned_coords
            )

            # Create final organized DataFrame
            bond_analysis_df = self._create_final_dataframe(
                bonds,
                distance_matrix,
                aligned_coords,
                elements,
                morphism_descriptors,
                cylindrical_coords,
            )

            # Prepare return values (compatible with original function)
            return {
                "save_info": bond_analysis_df,
                "final_df": final_df,
                "rmsd": rmsd,
            }

        except Exception as e:
            sys.stdout.write(f"Error processing geometry: {str(e)}")
            raise

    @classmethod
    def _validate_dataframes(
        cls, geom: pd.DataFrame, ref_geom: pd.DataFrame
    ) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """Validate and standardize input DataFrames.

        :param: geom: Target geometry DataFrame
        :param: ref_geom: Reference geometry DataFrame
        :return: Tuple of validated and standardized DataFrames
        """
        required_columns = ["element", "x", "y", "z"]

        # Check if required columns exist
        for df_name, df in [("geometry", geom), ("reference", ref_geom)]:
            missing_cols = set(required_columns) - set(df.columns)
            if missing_cols:
                raise ValueError(f"{df_name} DataFrame missing columns: {missing_cols}")

        # Ensure numeric types for coordinates
        coord_cols = ["x", "y", "z"]
        geom = geom.copy()
        ref_geom = ref_geom.copy()

        for col in coord_cols:
            geom[col] = pd.to_numeric(geom[col], errors="coerce")
            ref_geom[col] = pd.to_numeric(ref_geom[col], errors="coerce")

        # Check for NaN values
        if geom[coord_cols].isnull().any().any():
            warnings.warn("NaN values found in geometry coordinates")
        if ref_geom[coord_cols].isnull().any().any():
            warnings.warn("NaN values found in reference coordinates")

        # Ensure same number of atoms
        if len(geom) != len(ref_geom):
            raise ValueError(
                f"Geometry ({len(geom)} atoms) and reference ({len(ref_geom)} atoms) must have same number of atoms"
            )

        return geom, ref_geom

    def _identify_bonds(
        self, distance_matrix: npt.NDArray, elements: List[str]
    ) -> npt.NDArray:
        """Identify bonds based on distance matrix and element types.

        :param: distance_matrix: Matrix of inter-atomic distance
        :param: elements: List of element symbols
        :return: Bond pairs matrix (-1 for bonded atoms, 0 otherwise)
        """
        n_atoms = len(elements)
        bond_matrix = np.zeros_like(distance_matrix)

        for i in range(n_atoms):
            elem_i = elements[i].upper()

            for j in range(n_atoms):
                if i == j:
                    continue

                elem_j = elements[j].upper()

                max_dist = self.max_bond_dist.get(
                    elem_i + elem_j
                ) or self.max_bond_dist.get(elem_j + elem_i)
                if max_dist and 0.0001 < distance_matrix[i, j] <= max_dist:
                    bond_matrix[i, j] = -1

        return bond_matrix

    @classmethod
    def _extract_bond_pairs(
        cls, bond_matrix: npt.NDArray
    ) -> Tuple[npt.NDArray, npt.NDArray]:
        """Extract unique bond pairs from bond matrix.

        :param: bond_matrix: Matrix indicating bonds (-1 for bonded
            atoms)
        :return: Tuple of (unique_bonds, original_indices)
        """
        bonded_positions = np.where(bond_matrix == -1)
        bonded_atoms = list(zip(bonded_positions[0], bonded_positions[1]))

        unique_bonds = []
        original_indices = []
        for idx, (i, j) in enumerate(bonded_atoms):
            if i < j:
                unique_bonds.append([i, j])
                original_indices.append(idx)

        return np.array(unique_bonds), np.array(original_indices)

    @classmethod
    def _calculate_bond_neighbors(
        cls, bonds: npt.NDArray, elements: List[str]
    ) -> List[str]:
        """Calculate morphism descriptors based on bond neighborhoods.

        :param: bonds: Array of bond pairs
        :param: elements: List of element symbols
        :return: List of morphism descriptors
        """
        morphism_descriptors = []

        for bond in bonds:
            atom1, atom2 = bond

            # Find all bonds involving atom1 (excluding current bond)
            neighbors1 = []
            for other_bond in bonds:
                if atom1 in other_bond and not np.array_equal(bond, other_bond):
                    other_atom = (
                        other_bond[1] if other_bond[0] == atom1 else other_bond[0]
                    )
                    neighbors1.append(elements[other_atom])

            # Find all bonds involving atom2 (excluding current bond)
            neighbors2 = []
            for other_bond in bonds:
                if atom2 in other_bond and not np.array_equal(bond, other_bond):
                    other_atom = (
                        other_bond[1] if other_bond[0] == atom2 else other_bond[0]
                    )
                    neighbors2.append(elements[other_atom])

            # Create central bond descriptor
            central = "".join(sorted([elements[atom1], elements[atom2]]))

            # Create neighbor descriptors
            all_neighbors = neighbors1 + neighbors2
            neighbor_desc = "".join(sorted(all_neighbors))

            # Combine descriptors
            morphism = neighbor_desc + central
            morphism_descriptors.append(morphism)

        return morphism_descriptors

    @classmethod
    def _calculate_cylindrical_coordinates(
        cls, bonds: npt.NDArray, coordinates: npt.NDArray
    ) -> npt.NDArray:
        """Calculate cylindrical coordinates for bond centers.

        :param: bonds: Array of bond pairs
        :param: coordinates: Molecular coordinates
        :return: Array of cylindrical coordinates [r, phi, z]
        """
        cylindrical_coords = []

        for bond in bonds:
            atom1, atom2 = bond

            # Calculate bond center
            center = (coordinates[atom1] + coordinates[atom2]) / 2

            # Convert to cylindrical coordinates
            x, y, z = center
            r = np.sqrt(x**2 + y**2)
            phi = np.arctan2(y, x)

            cylindrical_coords.append([r, phi, z])

        return np.array(cylindrical_coords)

    def _create_final_dataframe(
        self,
        bonds: npt.NDArray,
        distance_matrix: npt.NDArray,
        coordinates: npt.NDArray,
        elements: List[str],
        morphism_descriptors: List[str],
        cylindrical_coords: npt.NDArray,
    ) -> pd.DataFrame:
        """Create final organized DataFrame with all bond information.

        :param: bonds: Bond pairs array
        :param: distance_matrix: Distance matrix
        :param: coordinates: Molecular coordinates
        :param: elements: Element symbols
        :param: morphism_descriptors: Morphism descriptors
        :param: cylindrical_coords: Cylindrical coordinates
        :return: Organized DataFrame with bond information
        """
        bond_data = []

        for idx, bond in enumerate(bonds):
            atom1, atom2 = bond

            bond_info = [
                distance_matrix[atom1, atom2],  # Distance
                elements[atom1],  # Element 1
                coordinates[atom1, 0],  # x1
                coordinates[atom1, 1],  # y1
                coordinates[atom1, 2],  # z1
                elements[atom2],  # Element 2
                coordinates[atom2, 0],  # x2
                coordinates[atom2, 1],  # y2
                coordinates[atom2, 2],  # z2
                cylindrical_coords[idx, 0],  # r_c
                cylindrical_coords[idx, 1],  # phi_c
                cylindrical_coords[idx, 2],  # z_c
                np.sum(cylindrical_coords[idx]),  # sum_cylindrical
                morphism_descriptors[idx],  # Morphism
            ]

            bond_data.append(bond_info)

        if not bond_data:
            # Return empty DataFrame with correct columns if no bonds found
            return pd.DataFrame(columns=self.COLUMNS)

        df = pd.DataFrame(bond_data, columns=self.COLUMNS)

        # Sort by morphism and cylindrical sum
        sorted_df = df.sort_values(["morphism", "sum_cylindrical"]).reset_index(
            drop=True
        )

        return sorted_df


if __name__ == "__main__":
    """Entry point for testing the ENERGY molecular geometry processor."""
    processor = DataEnergy(tolerance=3.0)

    target_geometry = pd.DataFrame(
        {
            "element": [
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
            ],
            "x": [
                0.0,
                7.59255,
                5.79912,
                3.39789,
                5.46067,
                0.290155,
                1.42159,
                6.37516,
                1.34779,
                2.01917,
                1.99554,
                4.02589,
                5.46073,
                6.08626,
                3.37443,
                4.07367,
                3.40182,
                -0.460942,
                0.00826201,
                1.67938,
                2.21282,
                7.48378,
                6.29493,
                6.21058,
                4.0,
                6.56283,
                1.44773,
                7.17836,
                1.85811,
                2.26569,
                -0.319751,
                -1.5323,
                -0.569115,
                -0.149953,
                2.23799,
                3.24355,
                -0.0877606,
                6.16382,
                6.26806,
                5.76962,
                7.76445,
                8.32713,
            ],
            "y": [
                0.0,
                3.49557,
                4.79975,
                3.58287,
                0.139396,
                -4.99747,
                -2.44508,
                3.61018,
                -2.07005e-17,
                -1.21372,
                1.18283,
                2.5595,
                2.49239,
                1.31466,
                1.27417,
                0.101235,
                -1.09166,
                -3.81064,
                -2.69104,
                -4.7817,
                -3.63658,
                -1.27452,
                -2.11585,
                -1.04243,
                -1.96449,
                5.42517,
                2.102,
                1.31066,
                -4.53769,
                -5.68927,
                -3.49472,
                -3.99157,
                -1.77993,
                -3.01179,
                -3.93681,
                -3.44632,
                -5.83589,
                -1.34837,
                -3.15148,
                -1.93424,
                -0.532791,
                -1.70925,
            ],
            "z": [
                0.0,
                -0.0186614,
                0.302481,
                0.385584,
                -0.501433,
                -0.0896789,
                -0.46607,
                0.0747253,
                -0.168343,
                -0.438243,
                -0.0197092,
                0.0903341,
                -0.0622079,
                -0.341452,
                -0.128321,
                -0.414273,
                -0.604013,
                0.222387,
                -0.670143,
                0.197044,
                -0.631657,
                -0.0695044,
                0.231806,
                -0.79796,
                -0.862128,
                0.36781,
                0.220421,
                -0.430927,
                1.27518,
                -0.0321947,
                1.28413,
                0.0539415,
                -0.490018,
                -1.72334,
                -1.70092,
                -0.302309,
                0.371157,
                -1.84998,
                -0.109937,
                1.17182,
                0.680862,
                -0.611668,
            ],
        }
    )

    ref_geometry = pd.DataFrame(
        {
            "element": [
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
                "O",
                "N",
                "S",
                "C",
                "H",
            ],
            "x": [
                -6.19978,
                -6.41345,
                -7.578,
                -8.33201,
                -7.95624,
                -6.01158,
                -6.3654,
                -6.03083,
                -1.30922,
                -2.05877,
                -1.19107,
                0.0615929,
                -0.00760013,
                0.830197,
                0.60216,
                -2.95634,
                -2.36375,
                -0.186321,
                0.521355,
                1.75534,
                1.09243,
                -1.72859,
                -1.02846,
                -3.40543,
                -5.79542,
                -7.62764,
                -5.46196,
                -3.37944,
                -4.0705,
                -3.38844,
                -6.09278,
                -5.48745,
                -4.0557,
                -2.00617,
                -1.99579,
                -1.35186,
                -6.3968,
                -7.15405,
                -1.47987,
                -6.47154,
                0.0,
                -3.91554,
            ],
            "y": [
                1.1425,
                2.11155,
                1.30319,
                1.80362,
                0.500466,
                1.81732,
                3.17401,
                1.56409,
                2.45375,
                3.70829,
                4.75508,
                4.91736,
                2.62113,
                3.67258,
                5.73466,
                3.52762,
                4.09737,
                2.96223,
                1.66852,
                3.84437,
                3.28184,
                5.7091,
                4.41774,
                -3.63086,
                -4.88248,
                -3.55891,
                -0.0834061,
                1.18264,
                -0.0412195,
                -1.2593,
                -1.28668,
                -2.51125,
                -2.58475,
                -1.20758,
                1.24574,
                -1.70016e-16,
                -3.66028,
                -1.26388,
                -2.13804,
                -5.58759,
                0.0,
                2.09789,
            ],
            "z": [
                1.32677,
                0.175512,
                0.717447,
                1.31299,
                0.0926671,
                -0.789337,
                0.388105,
                2.31469,
                0.50756,
                0.37084,
                -0.331319,
                0.402482,
                1.18951,
                0.468946,
                0.136309,
                -0.232233,
                1.35945,
                2.22363,
                1.21624,
                1.02829,
                -0.53359,
                -0.356807,
                -1.37464,
                0.435361,
                1.07832,
                1.31276,
                1.08095,
                0.828281,
                0.838475,
                0.633351,
                1.17033,
                0.986673,
                0.667064,
                0.376831,
                0.575062,
                0.337312,
                1.1341,
                1.40376,
                0.182884,
                1.18441,
                0.0,
                1.04768,
            ],
        }
    )

    sys.stdout.write("Molecular Geometry Processor initialized successfully! \n")
    sys.stdout.write(
        f"Bond table contains {len(processor.bond_table)} element pairs \n"
    )
    sys.stdout.write("\nProcessing sample geometries... \n")

    results = processor(target_geometry, ref_geometry)

    sys.stdout.write(f"RMSD after alignment: {results['rmsd']:.6f} \n")
    sys.stdout.write(f"Number of bonds found: {len(results['save_info'])} \n")

    if len(results["save_info"]) > 0:
        bond_df = pd.DataFrame(
            results["save_info"],
            columns=[
                "distance",
                "element_1",
                "x1",
                "y1",
                "z1",
                "element_2",
                "x2",
                "y2",
                "z2",
                "r_c",
                "phi_c",
                "z_c",
                "sum_cylindrical",
                "morphism",
            ],
        )

        sys.stdout.write("\nBond analysis summary: \n")
        sys.stdout.write(
            f"{bond_df[['element_1', 'element_2', 'distance', 'morphism']].head()}"
        )
