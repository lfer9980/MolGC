import argparse
import sys

from app import run


def main():
    parser = argparse.ArgumentParser(
        description="Run the application in a specific mode."
    )
    parser.add_argument(
        "mode",
        type=str,
        choices=["web", "cli"],
        nargs="?",  # Hacer opcional
        default="web",  # Default a web
        help="Execution mode (web or cli). Default: web",
    )

    # Usar parse_known_args en lugar de parse_args
    args, unknown_args = parser.parse_known_args()

    if args.mode.lower() == "cli":
        # Preparar sys.argv para typer con todos los argumentos desconocidos
        original_argv = sys.argv.copy()
        sys.argv = [sys.argv[0]] + unknown_args

        try:
            run("cli")
        finally:
            sys.argv = original_argv
    else:
        run(args.mode.lower())


if __name__ == "__main__":
    main()
