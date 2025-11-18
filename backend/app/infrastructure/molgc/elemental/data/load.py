"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: Main1.py
"""

import os

from app.infrastructure.molgc.elemental.data.exceptions import DataLoaderError
from app.infrastructure.molgc.elemental.enums import ExtEnum, FileModel, SoftEnum


class DataLoader:
    """Class used for load all data from current session, load files from
    path."""

    def __init__(self, path: str):
        self.BASE_PATH: str = os.path.abspath(path)

    def __call__(self) -> list[FileModel]:
        data_list: list[FileModel] = []

        if os.path.exists(self.BASE_PATH):
            self._search(path=self.BASE_PATH, data_list=data_list)
            return data_list
        else:
            raise DataLoaderError(f"the path does not exist: {self.BASE_PATH}")

    def _search(self, path: str, data_list: list[FileModel]):
        """
        :param path: the current path to looking
        :param data_list: populating the unique folder declared on __call__ statement

        :return: if something goes wrong, return a message else return None
        """
        try:
            elements = os.listdir(path)
        except PermissionError:
            raise DataLoaderError(f"No permission to access folder: {path}")

        actual_files: list[str] = []
        subdirectories: list[str] = []

        for element in elements:
            complete_path = os.path.join(path, element)

            if os.path.isfile(complete_path):
                actual_files.append(complete_path)

            elif os.path.isdir(complete_path):
                subdirectories.append(complete_path)

        actual_data: list = []
        if actual_files:
            for file in actual_files:
                file_path = os.path.abspath(file)
                _, ext = os.path.splitext(file)
                ext = ext.lstrip(".").lower()

                rel_path: str = os.path.relpath(file_path, self.BASE_PATH)
                rel_path_list: list = rel_path.split(os.sep)
                rel_path_list: list = rel_path_list[:-1]

                try:
                    entry = FileModel(
                        path=file,
                        ext=ExtEnum(ext),
                        family=rel_path_list[0],
                        variant=rel_path_list[1],
                        software=SoftEnum(rel_path_list[2]),
                        functional=rel_path_list[3],
                        geom=None,
                        energy=None,
                        reference=None,
                    )

                    actual_data.append(entry)
                except Exception as e:
                    raise DataLoaderError(
                        f"an error occurred while loading {file}: {e}"
                    )

            data_list.extend(actual_data)
        else:
            for sub_directory in subdirectories:
                self._search(path=sub_directory, data_list=data_list)


if __name__ == "__main__":
    print("type a directory to found and extension to found \n")
    root_path = str(input("directory (default = molecules): ") or "../../molecules")

    if not root_path.startswith("\\"):
        formatted_path: str = os.path.dirname(os.path.abspath(__file__))
        formatted_path: str = formatted_path.split("src")[0]
        formatted_path: str = os.path.join(formatted_path, root_path)
    else:
        formatted_path = rf"{root_path}"

    reader = DataLoader(path=formatted_path)
    found_files: list[FileModel] = reader()

    if len(found_files) >= 0:
        print("List of founded files \n")

    for found in found_files:
        print(f"{found} \n")
    else:
        print("Not files found \n")
