"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: TOPSIS_uw.py
"""

import sys

import numpy as np
import pandas as pd


class TopsisUW:
    """Implementation of TOPSIS (without weights) for minimum variance.

    Accept as input:
      - a list of dicts with braces [‘family’, ‘functional’, ‘mean’].
    """

    def __init__(self, data: list[dict]):
        """
        :param data: list[dict]. if it's a list, it must have the keys family', 'functional' and 'mean'.
        """
        df = pd.DataFrame.from_records(data)
        df = df.pivot_table(
            index="functional", columns="family", values="mean"
        ).reset_index()

        self.df = df
        self.ids = self.df["functional"]
        self.criteria = self.df.iloc[:, 1:].astype(float)
        self.normalized = None
        self.pis = None
        self.nis = None

    def __call__(self) -> list[dict]:
        """
        Executes all steps and returns:
            - result_df: DataFrame with [ID, D_plus, D_minus, Closeness, Ranking].
            - normalized_df: Normalized DataFrame (without the ID column).
        """
        self._normalize()
        self._compute_ideal_solutions()
        d_plus, d_minus = self._compute_distances()
        closeness = self._compute_closeness(d_plus, d_minus)
        ranking = self._rank(closeness)

        metrics_df = pd.DataFrame(
            {
                "d_not_ideal": d_minus,
                "d_ideal": d_plus,
                "closeness": closeness,
                "ranking": ranking,
            },
            index=self.df.index,
        )

        original_criteria = self.df.iloc[:, 1:]

        result_df = pd.concat([self.ids, metrics_df], axis=1)
        result_df["criteria"] = original_criteria.to_dict(orient="records")
        result_df = result_df.sort_values(by="ranking").reset_index(drop=True)

        result_df = result_df[
            ["functional", "criteria", "d_not_ideal", "d_ideal", "closeness", "ranking"]
        ]
        result_dict = result_df.to_dict(orient="records")

        return result_dict

    def _normalize(self):
        """Normalize each criterion column by the Euclidean norm."""
        norm = np.sqrt((self.criteria**2).sum())
        self.normalized = self.criteria / norm

    def _compute_ideal_solutions(self):
        """
        For criteria to be minimized:
            PIS = minimum (positive ideal)
            NIS = maximum (negative ideal)
        """
        self.pis = self.normalized.min()
        self.nis = self.normalized.max()

    def _compute_distances(self):
        """Calculate Euclidean distances to PIS (d_plus) and NIS (d_minus)."""
        d_plus = np.sqrt(((self.normalized - self.pis) ** 2).sum(axis=1))
        d_minus = np.sqrt(((self.normalized - self.nis) ** 2).sum(axis=1))

        return d_plus, d_minus

    @staticmethod
    def _compute_closeness(d_plus, d_minus):
        """C = d_minus / (d_plus + d_minus)"""
        return d_minus / (d_plus + d_minus)

    @staticmethod
    def _rank(closeness):
        """Ascending ranking (1 = best proximity)."""
        return pd.Series(closeness).rank(ascending=False).astype(int)


if __name__ == "__main__":
    data_list = [
        {
            "family": "FLUOROQUINOLONES",
            "functional": "Castep/LDA",
            "mean": 1.7073608565024543,
        },
        {"family": "FLUOROQUINOLONES", "functional": "Castep/LDA", "mean": 1.23},
        {
            "family": "FLUOROQUINOLONES",
            "functional": "Castep/LDA+OBS",
            "mean": 1.7575882788340238,
        },
        {
            "family": "FLUOROQUINOLONES",
            "functional": "Castep/PBE",
            "mean": 0.6342446974426821,
        },
        {"family": "OTROS", "functional": "Castep/LDA", "mean": 0.6342446974426821},
        {"family": "OTROS", "functional": "Castep/LDA+OBS", "mean": 0.7575882788340238},
        {"family": "OTROS", "functional": "Castep/PBE", "mean": 0.6342446974426821},
    ]

    topsis = TopsisUW(data_list)
    result = topsis()

    sys.stdout.write("\n=== TOPSIS results === \n")
    sys.stdout.write(result.to_string(index=False))
