# """
# Original Code: Abimael Guzman Pando
# Refactored: Angel Fernandez
# File: transformaciones_m.py
# """
#
import sys
from typing import List, Optional, Tuple

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from app.infrastructure.molgc.elemental.utils import MatrixTransform
from mpl_toolkits.mplot3d import Axes3D
from numpy import floating


class DotsTransform(MatrixTransform):
    """A class for aligning and centering molecular structures.

    This class performs molecular alignment by:
    1. Moving the reference atom to the origin
    2. Aligning the second reference atom along the X-axis
    3. Aligning the third reference atom in the XY plane
    """

    def __init__(self, regression: Optional[callable] = None):
        """Initialize the DotsTransform.

        :param: regression: Optional regression function for molecular
            plane fitting
        """
        self.regression = regression
        self.original_data = None
        self.transformed_data = None
        self.reference_atoms = []

    def __call__(self, dataframe: pd.DataFrame) -> pd.DataFrame:
        """Main method to align molecular structure.

        :param: dataframe: DataFrame with molecular coordinates
        :param: conf: Configuration flag
        :return: Aligned molecular coordinates as DataFrame with
            original columns
        """
        self.original_data = dataframe.copy()
        result_df = dataframe.copy()

        #  Convert to array only the coordinates, keeping the elements separated.
        data = np.array(dataframe)
        data_with_homogeneous = np.column_stack([data, np.ones(len(data))])

        center = self._calculate_center(data_with_homogeneous)

        ref1_idx = self._find_reference_atom_by_distance(data_with_homogeneous, center)

        self.reference_atoms.append(ref1_idx)
        data_with_homogeneous = self._translate_to_origin(
            data_with_homogeneous, ref1_idx
        )

        # Update the coordinates in the result DataFrame
        result_df.iloc[:, 1:4] = data_with_homogeneous[:, 1:4]

        ref2_idx = self._find_next_reference_atom(
            data_with_homogeneous, ref1_idx, [ref1_idx]
        )
        if ref2_idx != -1:
            self.reference_atoms.append(ref2_idx)
            data_with_homogeneous = self._align_to_x_axis(
                data_with_homogeneous, ref2_idx
            )
            result_df.iloc[:, 1:4] = data_with_homogeneous[:, 1:4]

            ref3_idx = self._find_next_reference_atom(
                data_with_homogeneous, ref2_idx, [ref1_idx, ref2_idx]
            )
            if ref3_idx != -1:
                self.reference_atoms.append(ref3_idx)
                data_with_homogeneous = self._align_to_xy_plane(
                    data_with_homogeneous, ref3_idx
                )
                result_df.iloc[:, 1:4] = data_with_homogeneous[:, 1:4]

        self.transformed_data = result_df

        return result_df

    @classmethod
    def _calculate_center(
        cls, coordinates: np.ndarray
    ) -> tuple[floating, floating, floating]:
        """Calculate the centroid of coordinates.

        :param: coordinates:
        :return: Center of coordinates
        """
        return (
            np.mean(coordinates[:, 1].astype("float64")),
            np.mean(coordinates[:, 2].astype("float64")),
            np.mean(coordinates[:, 3].astype("float64")),
        )

    @classmethod
    def _find_reference_atom_by_distance(
        cls, data: np.ndarray, center: Tuple[floating, floating, floating]
    ) -> int:
        """Find reference atom based on distance criteria.

        :param: data: Coordinate data
        :param: center: Center coordinates
        :param: conf: Configuration (0 for min distance, 1 for max)
        :return: Index of reference atom
        """
        unique_elements = np.unique(data[:, 0])
        element_distances = []

        for element in unique_elements:
            element_mask = data[:, 0] == element
            element_coords = data[element_mask]

            distances = []
            for i, coord in enumerate(element_coords):
                x, y, z = coord[1:4].astype("float64")

                dist = np.sqrt(
                    np.abs(x - center[0])
                    + np.abs(y - center[1])
                    + np.abs(z - center[2])
                )

                original_idx = np.where((data == coord).all(axis=1))[0][0]
                distances.append([dist, original_idx])

            distances.sort(key=lambda x: x[0])
            element_distances.append(
                [len(distances), element, distances[0][1], distances[0][0]]
            )

        element_df = pd.DataFrame(element_distances)
        element_df = element_df.sort_values([0, 1])

        return int(element_df.iloc[0, 2])

    @classmethod
    def _find_next_reference_atom(
        cls, data: np.ndarray, reference_idx: int, exclude_indices: List[int]
    ) -> int:
        """Find the next reference atom based on distance from current
        reference.

        :param: data: Coordinate data
        :param: reference_idx: Index of reference atom
        :param: exclude_indices:
        :return: Index of next reference atom
        """
        unique_elements = np.unique(data[:, 0])
        element_distances = []

        ref_coords = data[reference_idx, 1:4].astype("float64")

        for element in unique_elements:
            element_mask = data[:, 0] == element
            element_coords = data[element_mask]

            distances = []
            for coord in element_coords:
                original_idx = np.where((data == coord).all(axis=1))[0][0]
                if original_idx in exclude_indices:
                    continue

                x, y, z = coord[1:4].astype("float64")
                dist = np.sqrt(np.sum((np.array([x, y, z]) - ref_coords) ** 2))
                distances.append([dist, original_idx])

            if distances:
                distances.sort(key=lambda x: x[0])
                element_distances.append(
                    [len(distances), element, distances[0][1], distances[0][0]]
                )

        if not element_distances:
            return -1

        element_df = pd.DataFrame(element_distances)
        element_df = element_df.sort_values([3])

        return int(element_df.iloc[-1, 2])

    def _translate_to_origin(self, data: np.ndarray, reference_idx: int) -> np.ndarray:
        """Translate molecule so reference atom is at origin.

        :param: data: Coordinate data
        :param: reference_idx: Index of reference atom
        :return: Translated coordinates
        """
        ref_coords = data[reference_idx, 1:4].astype("float64")
        translation_vector = -ref_coords

        transformed_data = data.copy()
        translation_matrix = self.translate(*translation_vector)

        for i in range(len(data)):
            coords_homogeneous = np.append(data[i, 1:4].astype("float64"), 1)
            transformed_coords = self.apply_transformation(
                coords_homogeneous, translation_matrix
            )
            transformed_data[i, 1:4] = transformed_coords[:3]

        return transformed_data

    def _align_to_x_axis(self, data: np.ndarray, target_idx: int) -> np.ndarray:
        """Rotate molecule to align target atom with X-axis.

        :param: data: Coordinate data
        :param: target_idx: Index of target atom
        :return: Translated coordinates
        """
        target_coords = data[target_idx, 1:3].astype("float64")
        x, y = target_coords

        angle_xy = np.arctan2(y, x)
        if x < 0:
            angle_xy = np.pi + angle_xy

        rotation_matrix = self.rotate_z(angle_xy)

        transformed_data = data.copy()
        for i in range(len(data)):
            coords_homogeneous = np.append(data[i, 1:4].astype("float64"), 1)
            transformed_coords = self.apply_transformation(
                coords_homogeneous, rotation_matrix
            )
            transformed_data[i, 1:4] = transformed_coords[:3]

        return transformed_data

    def _align_to_xy_plane(self, data: np.ndarray, target_idx: int) -> np.ndarray:
        """Rotate molecule to align target atom in XY plane.

        :param: data: Coordinate data :target_idx: Index of target atom
        :return: Translated coordinates
        """
        target_coords = data[target_idx, [1, 3]].astype("float64")
        x, z = target_coords

        angle_xz = np.arctan2(z, x)
        rotation_matrix = self.rotate_y(angle_xz)

        transformed_data = data.copy()
        for i in range(len(data)):
            coords_homogeneous = np.append(data[i, 1:4].astype("float64"), 1)
            transformed_coords = self.apply_transformation(
                coords_homogeneous, rotation_matrix
            )
            transformed_data[i, 1:4] = transformed_coords[:3]

        return transformed_data

    def get_transformation_summary(self) -> dict:
        """Get summary of transformation performed."""
        return {
            "reference_atoms": self.reference_atoms,
            "num_atoms": (
                len(self.original_data) if self.original_data is not None else 0
            ),
            "transformation_complete": self.transformed_data is not None,
            "original_columns": (
                list(self.original_data.columns)
                if self.original_data is not None
                else []
            ),
            "final_columns": (
                list(self.transformed_data.columns)
                if self.transformed_data is not None
                else []
            ),
        }


if __name__ == "__main__":

    def create_sample_molecule() -> pd.DataFrame:
        """Create a sample molecule for testing.

        CH4 (methane)
        """
        # Add offset to test translation
        offset = np.array([10.0, 5.0, 2.0])

        # Define CH4 molecule geometry
        carbon = np.array([0.0, 0.0, 0.0])
        hydrogen1 = np.array([1.0, 1.0, 1.0])
        hydrogen2 = np.array([-1.0, -1.0, 1.0])
        hydrogen3 = np.array([-1.0, 1.0, -1.0])
        hydrogen4 = np.array([1.0, -1.0, -1.0])

        # Apply offset
        atoms = np.array([carbon, hydrogen1, hydrogen2, hydrogen3, hydrogen4]) + offset

        # Create DataFrame
        elements = ["C", "H", "H", "H", "H"]
        df = pd.DataFrame(atoms, columns=["x", "y", "z"])
        df.insert(0, "element", elements)

        return df

    def create_complex_molecule() -> pd.DataFrame:
        """Create a more complex molecule for testing."""
        # Simulate a more complex organic molecule
        atoms_data = [
            ["C", 0.0, 0.0, 0.0],
            ["C", 1.5, 0.0, 0.0],
            ["C", 2.25, 1.3, 0.0],
            ["N", 3.75, 1.3, 0.0],
            ["O", 1.5, 2.6, 0.0],
            ["H", -0.5, -0.9, 0.0],
            ["H", -0.5, 0.9, 0.0],
            ["H", 1.5, -0.9, 0.9],
            ["H", 4.25, 0.4, 0.0],
            ["H", 4.25, 2.2, 0.0],
        ]

        # Add random offset
        offset = np.array([15.0, -8.0, 12.0])

        elements = [row[0] for row in atoms_data]
        coords = np.array([row[1:] for row in atoms_data]) + offset

        df = pd.DataFrame(coords, columns=["x", "y", "z"])
        df.insert(0, "element", elements)

        return df

    sys.stdout.write("Molecule Alignment System Test\n")
    sys.stdout.write("-" * 40 + "\n\n")

    # Test with simple molecule (CH4)
    print("=== Testing with CH4 molecule ===")
    sample_molecule = create_sample_molecule()
    print("Original molecule coordinates:")
    print(sample_molecule)
    print()

    aligner = DotsTransform()
    aligned_coords = aligner(sample_molecule)

    print("Aligned molecule coordinates:")
    print(aligned_coords)
    print()

    summary = aligner.get_transformation_summary()
    print("Transformation Summary:")
    for key, value in summary.items():
        print(f"  {key}: {value}")
    print()

    # Test with complex molecule
    print("=== Testing with complex molecule ===")
    complex_molecule = create_complex_molecule()
    print("Original complex molecule coordinates:")
    print(complex_molecule)
    print()

    aligner2 = DotsTransform()
    aligned_complex = aligner2(complex_molecule)

    print("Aligned complex molecule coordinates:")
    print(aligned_complex)
    print()

    summary2 = aligner2.get_transformation_summary()
    print("Complex Transformation Summary:")
    for key, value in summary2.items():
        print(f"  {key}: {value}")

    # Visualization
    try:
        fig = plt.figure(figsize=(15, 10))

        # CH4 molecule plots
        ax1 = fig.add_subplot(221, projection="3d")
        ax1.set_title("CH4 Original")
        colors = ["red" if x == "C" else "blue" for x in sample_molecule["element"]]
        ax1.scatter(
            sample_molecule["x"],
            sample_molecule["y"],
            sample_molecule["z"],
            c=colors,
            s=100,
        )
        ax1.set_xlabel("X")
        ax1.set_ylabel("Y")
        ax1.set_zlabel("Z")

        ax2 = fig.add_subplot(222, projection="3d")
        ax2.set_title("CH4 Aligned")
        colors = ["red" if x == "C" else "blue" for x in aligned_coords["element"]]
        ax2.scatter(
            aligned_coords["x"],
            aligned_coords["y"],
            aligned_coords["z"],
            c=colors,
            s=100,
        )
        ax2.set_xlabel("X")
        ax2.set_ylabel("Y")
        ax2.set_zlabel("Z")

        # Complex molecule plots
        ax3 = fig.add_subplot(223, projection="3d")
        ax3.set_title("Complex Original")
        color_map = {"C": "black", "N": "blue", "O": "red", "H": "lightgray"}
        colors = [color_map.get(x, "green") for x in complex_molecule["element"]]
        ax3.scatter(
            complex_molecule["x"],
            complex_molecule["y"],
            complex_molecule["z"],
            c=colors,
            s=100,
        )
        ax3.set_xlabel("X")
        ax3.set_ylabel("Y")
        ax3.set_zlabel("Z")

        ax4 = fig.add_subplot(224, projection="3d")
        ax4.set_title("Complex Aligned")
        colors = [color_map.get(x, "green") for x in aligned_complex["element"]]
        ax4.scatter(
            aligned_complex["x"],
            aligned_complex["y"],
            aligned_complex["z"],
            c=colors,
            s=100,
        )
        ax4.set_xlabel("X")
        ax4.set_ylabel("Y")
        ax4.set_zlabel("Z")

        plt.tight_layout()
        plt.show()

    except Exception as e:
        print(f"Visualization error: {e}")
        print("Continuing without plots...")

    print(f"\nType of result: {type(aligned_coords)}")
    print(f"Columns: {list(aligned_coords.columns)}")
    print("\nTest completed successfully!")
