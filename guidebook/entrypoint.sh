#!/usr/bin/env bash
set -e

echo "📘 Starting MkDocs container..."

# Si pasas "build" al contenedor, construye los docs
if [ "$1" = "build" ]; then
    echo "🏗️  Building static site..."
    python -m mkdocs build --clean
    exit 0
fi

# Por defecto, levanta el servidor
echo "🚀 Serving docs on http://0.0.0.0:8000"
exec python -m mkdocs serve --dev-addr=0.0.0.0:8000
