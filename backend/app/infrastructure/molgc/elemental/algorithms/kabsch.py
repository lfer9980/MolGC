"""
Original Code: Abimael Guzman Pando & Graciela Ramirez
Refactored: Angel Fernandez
File: kabsch_algorithm.py
"""

import sys

import matplotlib.pyplot as plt
import numpy as np
import numpy.typing as npt
from mpl_toolkits.mplot3d import Axes3D
from scipy.spatial import KDTree


class Kabsch:
    """Implementation of the Kabsch algorithm with ICP (Iterative Closest
    Point) for 3D molecule alignment."""

    def __init__(
        self, max_iterations: int = 200, tolerance: float = 1e-10, delta: float = 1.0
    ):
        """Initializes the Kabsch aligner.

        :param: max_iterations (int): Maximum number of iterations for
            ICP
        :param: tolerance (float):  Tolerance for convergence
        :param: delta (float): Parameter for Huber loss function
        """
        self.max_iterations = max_iterations
        self.tolerance = tolerance
        self.delta = delta
        self.best_rmsd = None
        self.best_aligned_source = None

    def __call__(
        self, target: npt.NDArray, source: npt.NDArray, visualize: bool = False
    ):
        """Executes the alignment algorithm.

        :param: target (np.ndarray): Coordinates of the target molecule
            (N x 3)
        :param: source (np.ndarray): Coordinates of the source molecule
            (N x 3)
        :param: visualize (bool): Whether to show the visualization.
        :returns: tuple: (aligned_coordinates, rmsd_final)
        """
        initial_rmsd = self.calculate_rmsd(target, source)
        sys.stdout.write(f"RMSD before ICP+Kabsch: {initial_rmsd:.6f} \n")

        best_P_aligned = None
        min_rmsd = float("inf")

        for reflections in self._generate_reflection_patterns():
            src = self.apply_reflections(source, reflections)
            prev_error = float("inf")

            for i in range(self.max_iterations):
                tree = KDTree(target)

                distances, indices = tree.query(src)
                target_matched = target[indices]

                weights = np.array(
                    [self.huber_weight(d, self.delta) for d in distances]
                )

                weighted_src = src * weights[:, np.newaxis]
                weighted_target = target_matched * weights[:, np.newaxis]

                R, src_centroid, tgt_centroid = self.kabsch_algorithm(
                    weighted_src, weighted_target
                )
                src = np.dot(src - src_centroid, R) + tgt_centroid

                mean_error = np.mean(distances)

                if abs(prev_error - mean_error) < self.tolerance:
                    break

                prev_error = mean_error

                current_rmsd = self.calculate_rmsd(src, target_matched)
                if current_rmsd < min_rmsd:
                    min_rmsd = current_rmsd
                    best_P_aligned = src.copy()

        self.best_rmsd = min_rmsd
        self.best_aligned_source = best_P_aligned

        sys.stdout.write(f"RMSD After ICP+Kabsch: {min_rmsd:.6f} \n")

        if visualize:
            self.visualize_alignment(target, source, best_P_aligned)

        return best_P_aligned, min_rmsd

    @staticmethod
    def calculate_rmsd(P, Q):
        """Calculates the RMSD between two sets of points."""
        return np.sqrt(np.mean(np.sum((P - Q) ** 2, axis=1)))

    @staticmethod
    def kabsch_algorithm(P: npt.NDArray, Q: npt.NDArray):
        """Implements the Kabsch algorithm to find the optimal rotation.

        :param: P, Q (np.ndarray): Sets of points to align.
        :return: tuple: (rotation_array, centroid_P, centroid_Q)
        """
        # Centering the points
        P_centroid = np.mean(P, axis=0)
        Q_centroid = np.mean(Q, axis=0)
        P_centered = P - P_centroid
        Q_centered = Q - Q_centroid

        # Covariance matrix
        C = np.dot(np.transpose(P_centered), Q_centered)

        # Decomposition of singular values
        V, S, W = np.linalg.svd(C)

        # Optimal rotation matrix
        R = np.dot(V, W)

        return R, P_centroid, Q_centroid

    @staticmethod
    def huber_weight(residual, delta):
        """Calculate the weight using the Huber loss function."""
        return 1 if abs(residual) <= delta else delta / abs(residual)

    @staticmethod
    def apply_reflections(P, reflections):
        """Applies reflections to points according to the specified pattern."""
        P_reflected = P.copy()
        for i, reflect in enumerate(reflections):
            if reflect:
                P_reflected[:, i] *= -1

        return P_reflected

    @staticmethod
    def _generate_reflection_patterns():
        """Generates all possible reflection patterns."""
        return [
            (False, False, False),
            (True, False, False),
            (False, True, False),
            (False, False, True),
            (True, True, False),
            (True, False, True),
            (False, True, True),
            (True, True, True),
        ]

    def _icp_iteration(self, target, source):
        """Runs one iteration of the ICP algorithm.

        :return: tuple: (source_transformed, mean_error, converged)
        """
        src = source.copy()
        prev_error = float("inf")
        min_rmsd = float("inf")
        best_src = src.copy()

        for i in range(self.max_iterations):
            tree = KDTree(target)

            distances, indices = tree.query(src)
            target_matched = target[indices]

            weights = np.array([self.huber_weight(d, self.delta) for d in distances])

            weighted_src = src * weights[:, np.newaxis]
            weighted_target = target_matched * weights[:, np.newaxis]

            R, src_centroid, tgt_centroid = self.kabsch_algorithm(
                weighted_src, weighted_target
            )
            src = np.dot(src - src_centroid, R) + tgt_centroid

            mean_error = np.mean(distances)

            if abs(prev_error - mean_error) < self.tolerance:
                break
            prev_error = mean_error

            current_rmsd = self.calculate_rmsd(src, target_matched)
            if current_rmsd < min_rmsd:
                min_rmsd = current_rmsd
                best_src = src.copy()

        return best_src, min_rmsd

    def visualize_alignment(self, target, original_source, aligned_source):
        """Visualizes molecules before and after alignment."""
        fig = plt.figure(figsize=(12, 8))
        ax = fig.add_subplot(111, projection="3d")

        ax.scatter(
            target[:, 0],
            target[:, 1],
            target[:, 2],
            color="blue",
            label="Molécula Objetivo",
            s=50,
            alpha=0.7,
        )
        ax.scatter(
            original_source[:, 0],
            original_source[:, 1],
            original_source[:, 2],
            color="red",
            label="Molécula Original",
            s=50,
            alpha=0.7,
        )
        ax.scatter(
            aligned_source[:, 0],
            aligned_source[:, 1],
            aligned_source[:, 2],
            color="green",
            label="Molécula Alineada",
            s=50,
            alpha=0.7,
        )

        ax.set_xlabel("Eje X")
        ax.set_ylabel("Eje Y")
        ax.set_zlabel("Eje Z")
        ax.legend()
        ax.set_title(f"Molecular Alignment (RMSD: {self.best_rmsd:.4f})")

        plt.tight_layout()
        plt.show()


if __name__ == "__main__":
    molecule_1 = np.array(
        [
            [0.0, 0.0, 0.0],
            [7.59255, 3.49557, -0.0186614],
            [5.79912, 4.79975, 0.302481],
            [3.39789, 3.58287, 0.385584],
            [5.46067, 0.139396, -0.501433],
            [0.290155, -4.99747, -0.0896789],
            [1.42159, -2.44508, -0.46607],
            [6.37516, 3.61018, 0.0747253],
            [1.34779, -2.07005e-17, -0.168343],
            [2.01917, -1.21372, -0.438243],
            [1.99554, 1.18283, -0.0197092],
            [4.02589, 2.5595, 0.0903341],
            [5.46073, 2.49239, -0.0622079],
            [6.08626, 1.31466, -0.341452],
            [3.37443, 1.27417, -0.128321],
            [4.07367, 0.101235, -0.414273],
            [3.40182, -1.09166, -0.604013],
            [-0.460942, -3.81064, 0.222387],
            [0.00826201, -2.69104, -0.670143],
            [1.67938, -4.7817, 0.197044],
            [2.21282, -3.63658, -0.631657],
            [7.48378, -1.27452, -0.0695044],
            [6.29493, -2.11585, 0.231806],
            [6.21058, -1.04243, -0.79796],
            [4.0, -1.96449, -0.862128],
            [6.56283, 5.42517, 0.36781],
            [1.44773, 2.102, 0.220421],
            [7.17836, 1.31066, -0.430927],
            [1.85811, -4.53769, 1.27518],
            [2.26569, -5.68927, -0.0321947],
            [-0.319751, -3.49472, 1.28413],
            [-1.5323, -3.99157, 0.0539415],
            [-0.569115, -1.77993, -0.490018],
            [-0.149953, -3.01179, -1.72334],
            [2.23799, -3.93681, -1.70092],
            [3.24355, -3.44632, -0.302309],
            [-0.0877606, -5.83589, 0.371157],
            [6.16382, -1.34837, -1.84998],
            [6.26806, -3.15148, -0.109937],
            [5.76962, -1.93424, 1.17182],
            [7.76445, -0.532791, 0.680862],
            [8.32713, -1.70925, -0.611668],
        ]
    )

    molecule_2 = -1 * np.array(
        [
            [6.19978, -1.1425, -1.32677],
            [6.41345, -2.11155, -0.175512],
            [7.578, -1.30319, -0.717447],
            [8.33201, -1.80362, -1.31299],
            [7.95624, -0.500466, -0.0926671],
            [6.01158, -1.81732, 0.789337],
            [6.3654, -3.17401, -0.388105],
            [6.03083, -1.56409, -2.31469],
            [1.30922, -2.45375, -0.50756],
            [2.05877, -3.70829, -0.37084],
            [1.19107, -4.75508, 0.331319],
            [-0.0615929, -4.91736, -0.402482],
            [0.00760013, -2.62113, -1.18951],
            [-0.830197, -3.67258, -0.468946],
            [-0.60216, -5.73466, -0.136309],
            [2.95634, -3.52762, 0.232233],
            [2.36375, -4.09737, -1.35945],
            [0.186321, -2.96223, -2.22363],
            [-0.521355, -1.66852, -1.21624],
            [-1.75534, -3.84437, -1.02829],
            [-1.09243, -3.28184, 0.53359],
            [1.72859, -5.7091, 0.356807],
            [1.02846, -4.41774, 1.37464],
            [3.40543, 3.63086, -0.435361],
            [5.79542, 4.88248, -1.07832],
            [7.62764, 3.55891, -1.31276],
            [5.46196, 0.0834061, -1.08095],
            [3.37944, -1.18264, -0.828281],
            [4.0705, 0.0412195, -0.838475],
            [3.38844, 1.2593, -0.633351],
            [6.09278, 1.28668, -1.17033],
            [5.48745, 2.51125, -0.986673],
            [4.0557, 2.58475, -0.667064],
            [2.00617, 1.20758, -0.376831],
            [1.99579, -1.24574, -0.575062],
            [1.35186, 1.70016e-16, -0.337312],
            [6.3968, 3.66028, -1.1341],
            [7.15405, 1.26388, -1.40376],
            [1.47987, 2.13804, -0.182884],
            [6.47154, 5.58759, -1.18441],
            [0, 0, 0],
            [3.91554, -2.09789, -1.04768],
        ]
    )

    aligner = Kabsch(max_iterations=200, tolerance=1e-10, delta=1.0)

    aligned_coords, final_rmsd = aligner(molecule_1, molecule_2, visualize=True)

    sys.stdout.write(f"\nFinal Results: \n")
    sys.stdout.write(f"Final RMSD: {final_rmsd:.6f} \n")
    sys.stdout.write(f"Reached Convergence: {final_rmsd < 1.0} \n")
