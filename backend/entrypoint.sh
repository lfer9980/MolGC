#!/bin/bash
set -e

echo "Starting MolGC Backend..."
exec uvicorn app.gateways.web:app --host 0.0.0.0 --port 4000