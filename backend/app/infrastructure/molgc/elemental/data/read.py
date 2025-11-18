"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: Read_Gaussianf.py Read_CASTEPf.py Read_FHIAIMSf.py
"""

import re
import sys

import numpy as np
import pandas as pd
from app.infrastructure.molgc.elemental.utils import read_csv, read_file


class DataReader:
    """"""

    def __init__(self):
        self.content: str = ""

        # regex & constants
        self.GAUSSIAN_SLASH: str = r"\\"
        self.GAUSSIAN_SLASH_DOUBLE: str = r"\\\\"
        self.GAUSSIAN_LINES: int = 60
        self.GAUSSIAN_COLUMN: str = "Entering Gaussian System, Link 0=g09"

        self.CASTEP_ANGLES: dict = {"a": 1.0, "b": 1.0, "c": 1.0}
        self.CASTEP_REGEX = re.compile(
            r"x\s+([A-Z][a-z]?)\s+\d+\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+x"
        )
        self.CASTEP_ANGLES_REGEX = {
            "a": re.compile(r"\ba\s*=\s*([0-9]+\.[0-9]+)"),
            "b": re.compile(r"\bb\s*=\s*([0-9]+\.[0-9]+)"),
            "c": re.compile(r"\bc\s*=\s*([0-9]+\.[0-9]+)"),
        }

    def gaussian(self, path: str) -> pd.DataFrame:
        """Extracts atomic coordinates from a Gaussian log file using regex.

        :param path: Path to the Gaussian log file
        :return: DataFrame with columns [Element, X, Y, Z]
        """
        original_df: pd.DataFrame = read_csv(path)
        e_table: pd.DataFrame = pd.DataFrame()
        e3_table: pd.DataFrame = pd.DataFrame()

        original_df.replace({self.GAUSSIAN_COLUMN: {"|": " "}}, regex=True)

        find_name: pd.DataFrame = original_df[self.GAUSSIAN_COLUMN].str.match(
            f"1{self.GAUSSIAN_SLASH}1{self.GAUSSIAN_SLASH}GINC"
        )

        find_name = original_df[find_name]
        find_name_list: list = find_name.index.tolist()
        atoms_number: pd.DataFrame = original_df.iloc[
            find_name_list[0] : find_name_list[0] + self.GAUSSIAN_LINES
        ]

        added: str = ""
        for item in range(len(atoms_number)):
            added = added + str(atoms_number.iloc[item, 0])

        e_table["texto"] = [added]
        e_table = e_table.replace(
            to_replace={self.GAUSSIAN_SLASH_DOUBLE}, value={"*"}, regex=True
        )
        e_table = e_table["texto"].str.split(pat="*", n=1000, expand=True)

        e3_table["texto"] = [e_table.iloc[0][3]]
        e3_table = e3_table["texto"].str.split(
            pat=self.GAUSSIAN_SLASH, n=1000, expand=True
        )

        df: pd.DataFrame = e3_table.T
        df = df.drop([0], axis=0)
        df = df[0].str.split(pat=",", n=1000, expand=True)
        df.columns = ["element", "x", "y", "z"]

        return df

    def castep(self, path: str) -> pd.DataFrame:
        """Convenience function to read CASTEP data.

        :param path: Path to the Gaussian log file
        :return: DataFrame with parsed data or None if parsing fails
        """
        self.content = read_file(path=path)

        for key, pattern in self.CASTEP_ANGLES_REGEX.items():
            match = pattern.search(self.content)
            if match:
                self.CASTEP_ANGLES[key] = float(match.group(1))
            else:
                sys.stdout.write(f"No CASTEP ANGLES found in {path} \n")
                return pd.DataFrame()

        start_block = re.search(
            r"BFGS\s*:\s*Final Configuration:\s*=+\s+", self.content
        )
        if not start_block:
            sys.stdout.write(f"No Final Configuration found in: {path} \n")

        table_after = self.content[start_block.end() :]

        end_block = re.search(r"\n\s*BFGS", table_after)
        if not end_block:
            raise ValueError("No se encontró un segundo 'BFGS' como marcador de fin")

        table_block = table_after[: end_block.start()]
        found_items = self.CASTEP_REGEX.findall(table_block)

        if not found_items:
            sys.stdout.write(f"No CASTEP coordinates found in {path} \n")
            return pd.DataFrame()

        elements, x, y, z = zip(*found_items)

        df = pd.DataFrame(
            {
                "element": np.array(elements, dtype="str"),
                "x": np.array(x, dtype="float64") * self.CASTEP_ANGLES["a"],
                "y": np.array(y, dtype="float64") * self.CASTEP_ANGLES["b"],
                "z": np.array(z, dtype="float64") * self.CASTEP_ANGLES["c"],
            }
        )

        df = df.iloc[::-1].reset_index(drop=True)
        df.index += 1

        return df

    def fhi(self, path: str) -> pd.DataFrame:
        """Convenience function to read FHI AIMS data.

        :param path: Path to the FHI file
        :return: DataFrame with parsed data or None if parsing fails
        """

        self.content = read_file(path=path)
        found_atoms = re.search(r"The structure contains\s+(\d+)\s+atoms", self.content)

        if not found_atoms:
            sys.stdout.write(f"No atom found found in {path} \n")

        number_atoms = int(found_atoms.group(1))

        found_struct = re.search(
            r"Final atomic structure:.*?\n\s*x \[A].*?\n(.*?)\n-{10,}",
            self.content,
            re.DOTALL,
        )

        if not found_struct:
            sys.stdout.write(r"No FHI data found in: {path}")
            return pd.DataFrame()

        struct_block = found_struct.group(1)

        atom_lines = re.findall(
            r"atom\s+([\d.\-Ee]+)\s+([\d.\-Ee]+)\s+([\d.\-Ee]+)\s+([A-Z][a-z]?)",
            struct_block,
        )

        if not atom_lines or len(atom_lines) != number_atoms:
            sys.stdout.write(
                f"Expected {number_atoms} atoms, but found {len(atom_lines)}."
            )
            return pd.DataFrame()

        x, y, z, elements = zip(*atom_lines)

        df = pd.DataFrame(
            {
                "element": np.array(elements, dtype="str"),
                "x": np.array(x, dtype="float64"),
                "y": np.array(y, dtype="float64"),
                "z": np.array(z, dtype="float64"),
            }
        )

        df.index += 1

        return df

    @classmethod
    def crystals(cls, path: str) -> pd.DataFrame | None:
        """Extracts atomic coordinates from a crystals log file using regex.

        :param path: Path to the Crystals log file
        :return: DataFrame with columns [Element, X, Y, Z]
        """
        original_df: pd.DataFrame = read_csv(path)

        atoms_number, _ = original_df.shape

        original_df.replace(to_replace={"      "}, value={" R "}, regex=True)
        original_df = original_df.iloc[:, 0].str.split(pat="R", n=5, expand=True)

        reflex_x = np.array([[1, 0, 0], [0, -1, 0], [0, 0, -1]])

        new_data = original_df.iloc[:, 1:]
        data = np.array(new_data, dtype="float64")

        data_ref = data @ reflex_x

        df_n = pd.Series(np.array(original_df.iloc[:, 0]))
        df_a = pd.Series(data_ref[:, 0])
        df_b = pd.Series(data_ref[:, 1])
        df_c = pd.Series(data_ref[:, 2])

        df = pd.concat([df_n, df_a, df_b, df_c], axis=1)

        return df


if __name__ == "__main__":
    gaussian_path = r"/mnt/c/Users/luis_/Downloads/MolGCSoftware/MolGCSoftware/Molecules/FLUOROQUINOLONES/ciprofloxacin/Gaussian/B3LYP/geometry.log"
    castep_path = r"/mnt/c/Users/luis_/Downloads/MolGCSoftware/MolGCSoftware/Molecules/FLUOROQUINOLONES/ciprofloxacin/Castep/LDA/geometry.castep"
    fhi_path = r"/mnt/c/Users/luis_/Downloads/MolGCSoftware/MolGCSoftware/Molecules/FLUOROQUINOLONES/ciprofloxacin/FHI-aims/PBE/geometry.out"

    reader = DataReader()
    result_gaussian = reader.gaussian(gaussian_path)
    result_castep = reader.castep(castep_path)
    result_fhi = reader.fhi(fhi_path)

    sys.stdout.write(f"Gaussian RESULT: \n {result_gaussian} \n")
    sys.stdout.write(f"Castep RESULT: \n {result_castep} \n")
    sys.stdout.write(f"FHI RESULT: \n {result_fhi} \n")
