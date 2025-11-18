"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: TablaEnlacesElemento.py
"""

BOND_DISTANCES = {
    "CO": 1.97249,
    "CC": 1.89002,
    "CN": 1.79202,
    "CH": 1.20000,
    "CF": 1.76002,
    "OH": 1.20000,
    "HN": 1.20000,
    "NN": 1.88260,
    "NO": 1.81746,
    "ClC": 2.11002,
}


def get_bond_dataframe():
    import pandas as pd

    return pd.DataFrame(list(BOND_DISTANCES.items()), columns=["Pairs", "Dist"])
