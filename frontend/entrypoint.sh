bash#!/bin/sh
set -e

# Verificar que las variables críticas estén presentes
if [ -z "$NEXT_PUBLIC_API_URL" ]; then
  echo "WARNING: NEXT_PUBLIC_API_URL is not set, using default"
fi

# Iniciar Next.js en modo producción
echo "Starting Next.js server..."
exec npm run start
