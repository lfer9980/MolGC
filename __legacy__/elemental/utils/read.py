"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: main1.py
"""
import re

import pandas as pd


def read_file(path: str) -> pd.DataFrame | None:
    """

        :param: path: path to file
    """
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            content = re.sub(r'\\\s*\n\s*', '', content)
            return content
    except FileNotFoundError:
        raise FileNotFoundError(path)


def read_csv(path: str, header: int | None = None) -> pd.DataFrame | None:
    """

        :param: path: path to file
    """
    try:
        if header:
            df = pd.read_csv(path, sep='delimiter', header=header, engine='python', encoding='iso-8859-1')
        else:
            df = pd.read_csv(path, sep='delimiter', engine='python', encoding='iso-8859-1')

        return df
    except FileNotFoundError:
        raise FileNotFoundError(path)


if __name__ == '__main__':
    ...
