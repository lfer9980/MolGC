"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: main.py
"""
import sys

from src.individual import IndividualAnalysis


def main() -> None:
    sys.stdout.write('MolGC: Molecular Geometry Comparator Algorithm \n')
    sys.stdout.write('############################################## \n')

    while True:
        sys.stdout.write('Select your option: \n')
        sys.stdout.write('0- Individual analysis \n')
        sys.stdout.write('1- Comprehensive multiple-criteria decision analysis \n')

        try:
            option: int = int(input())
            if option == 0:
                individual = IndividualAnalysis(path=r'./molecules')
                individual()
                break

            elif option == 1:
                break
            else:
                sys.stdout.write('Introduce 0 or 1 \n \r')
                sys.stdout.flush()

        except ValueError:
            sys.stdout.write('Introduce 0 or 1 \n \r')
            sys.stdout.flush()


if __name__ == '__main__':
    main()
