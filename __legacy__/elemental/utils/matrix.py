"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: MatricesT.py
"""

import numpy as np


class MatrixTransform:
    """"""

    @staticmethod
    def translate(dx: float, dy: float, dz: float) -> np.matrix:
        """Return matrix for translation along vector (dx, dy, dz).

        :param dx: translation along vector (dx, dy, dz)
        :param dy: translation along vector (dx, dy, dz)
        :param dz: translation along vector (dx, dy, dz)
        """
        return np.matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [dx, dy, dz, 1]])

    @staticmethod
    def rotate_x(radians: float) -> np.matrix:
        """Return matrix for rotating about the x-axis by 'radians' radians.

        :param radians: rotation about the x-axis
        """
        c = np.cos(radians)
        s = np.sin(radians)

        return np.matrix([[1, 0, 0, 0], [0, c, -s, 0], [0, s, c, 0], [0, 0, 0, 1]])

    @staticmethod
    def rotate_y(radians: float) -> np.matrix:
        """Return matrix for rotating about the y-axis by 'radians' radians.

        :param radians: rotation about the y-axis
        """
        c = np.cos(radians)
        s = np.sin(radians)

        return np.matrix([[c, 0, s, 0], [0, 1, 0, 0], [-s, 0, c, 0], [0, 0, 0, 1]])

    @staticmethod
    def rotate_z(radians: float) -> np.matrix:
        """Return matrix for rotating about the z-axis by 'radians' radians.

        :param radians: rotation about the z-axis
        """
        c = np.cos(radians)
        s = np.sin(radians)

        return np.matrix([[c, -s, 0, 0], [s, c, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])

    @classmethod
    def apply_transformation(
        cls, coordinates: np.ndarray, matrix: np.matrix
    ) -> np.ndarray:
        """Apply transformation matrix to coordinates.

        :param coordinates: coordinates to transform
        :param matrix: transformation matrix
        """
        transformed = np.dot(coordinates.T, matrix)

        return np.array(transformed[0])[0]


if __name__ == "__main__":
    ...
