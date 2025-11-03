#!/bin/bash
set -e

echo "Starting MolGC Backend..."

# Iniciar Gunicorn
exec gunicorn \
  -k uvicorn.workers.UvicornWorker \
  app:app \
  --bind 0.0.0.0:4000 \
  --workers ${GUNICORN_WORKERS:-4} \
  --timeout ${GUNICORN_TIMEOUT:-120} \
  --log-level info \
  --access-logfile - \
  --error-logfile -