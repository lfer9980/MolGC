"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: Main1.py
"""
import os
import sys

from elemental.enums import FileModel, ExtEnum, FuncEnum


class DataLoader:
    """
    """

    def __init__(self, path: str):
        self.BASE_PATH: str = os.path.abspath(path)

    def __call__(self):
        """
            :return:
        """
        data_list: list[FileModel] = []

        if os.path.exists(self.BASE_PATH):
            sys.stdout.write(f'Founding files... please wait')

            self._search(path=self.BASE_PATH, data_list=data_list)

            sys.stdout.write(f'\nFounded {len(data_list)} files \n \n')
            return data_list
        else:
            sys.stdout.write(f'Not found route: {self.BASE_PATH}')
            return None

    def _search(self, path: str, data_list: list[FileModel]) -> list[FileModel] | None:
        """
            :param path:
            :param data_list:
            :return:
        """
        try:
            elements = os.listdir(path)
        except PermissionError:
            sys.stdout.write('some of the folders had not enough permissions')
            return

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
                ext = ext.lstrip('.').lower()

                rel_path: str = os.path.relpath(file_path, self.BASE_PATH)
                rel_path_list: list = rel_path.split(os.sep)
                rel_path_list: list = rel_path_list[:-1]

                try:
                    entry = FileModel(
                        path=file,
                        ext=ExtEnum(ext),
                        family=rel_path_list[0],
                        variant=rel_path_list[1],
                        software=FuncEnum(rel_path_list[2]),
                        functional=rel_path_list[3],
                        geom=None,
                        energy=None,
                        reference=None
                    )

                    actual_data.append(entry)
                except Exception as e:
                    sys.stdout.write(f'Validation error on FileEntry: {e}')

            data_list.extend(actual_data)
        else:
            for sub_directory in subdirectories:
                self._search(path=sub_directory, data_list=data_list)


if __name__ == '__main__':
    sys.stdout.write('type a directory to found and extension to found \n')
    root_path = str(input('directory (default = molecules): ') or '../../molecules')

    if not root_path.startswith('\\'):
        formatted_path: str = os.path.dirname(os.path.abspath(__file__))
        formatted_path: str = formatted_path.split('src')[0]
        formatted_path: str = os.path.join(formatted_path, root_path)
    else:
        formatted_path = fr"{root_path}"

    reader = DataLoader(path=formatted_path)
    found_files: list[FileModel] = reader()

    if len(found_files) >= 0:
        sys.stdout.write('List of founded files \n')

    for found in found_files:
        sys.stdout.write(f'{found} \n')
    else:
        sys.stdout.write('Not files found \n')
