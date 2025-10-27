"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: EucDist.py
"""
import numpy as np


def matrix_distance(A: np.ndarray, B: np.ndarray, squared: bool = False) -> np.ndarray:
    """
        Compute pairwise Euclidean distances (or squared distances) between rows of A and B.

        :param: A : np.ndarray, shape (M, K) First set of vectors (M samples, K features).
        :param: B : np.ndarray, shape (N, K) Second set of vectors (N samples, K features).
        :param: squared : bool, optional If True, return squared distances. Default is False.

        :return: np.ndarray, shape (M, N)
            Distance matrix where D[i, j] is the distance (or squared distance) between
            A[i] and B[j].
    """

    A = np.asarray(A)
    B = np.asarray(B)

    if A.ndim != 2 or B.ndim != 2:
        raise ValueError(f'Both A and B must be 2D arrays, got shapes {A.shape} and {B.shape}.')
    if A.shape[1] != B.shape[1]:
        raise ValueError(f'Feature dimension mismatch: A has {A.shape[1]} features, B has {B.shape[1]}.')

    A_sq = np.sum(A * A, axis=1)[:, np.newaxis]
    B_sq = np.sum(B * B, axis=1)[np.newaxis, :]

    cross = A @ B.T

    D_sq = A_sq + B_sq - 2.0 * cross
    np.maximum(D_sq, 0.0, out=D_sq)

    if squared:
        return D_sq

    return np.sqrt(D_sq)


if __name__ == '__main__':
    ...
