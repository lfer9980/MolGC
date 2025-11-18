import sys


def progress_bar(
    iteration: int,
    total: int,
    prefix: str = "Processing Files",
    suffix: str = "Completed",
    length: int = 50,
    fill: str = "█",
) -> None:
    """Displays a progress bar in the console.

    :param iteration : int Current iteration (starts at 0)
    :param total : int Total iterations
    :param prefix : str Text at the beginning (for example: 'Progress').
    :param suffix : str Text at the end (for example: 'Completed').
    :param length : int Total length of the bar (in characters).
    :param fill : str Character representing the progress.
    """
    percent = f"{100 * (iteration / float(total)):.1f}"
    filled_length = int(length * iteration // total)
    bar = fill * filled_length + "-" * (length - filled_length)
    sys.stdout.write(f"\r{prefix} |{bar}| {percent}% {suffix}")
    sys.stdout.flush()

    if iteration == total:
        sys.stdout.write("\n")


if __name__ == "__main__":
    import time

    items = list(range(0, 100))
    size = len(items)

    for i, _ in enumerate(items, 1):
        progress_bar(i, size, prefix="Procesando", suffix="Completado", length=40)
        time.sleep(0.05)
