set -e

# Esperar a que Redis / Postgres estén listos
# Example simple wait-for
# WAIT_FOR="redis:6379"
# until nc -z $(echo $WAIT_FOR | cut -d: -f1) $(echo $WAIT_FOR | cut -d: -f2); do
#   echo "Waiting for $WAIT_FOR..."
#   sleep 1
# done

if [ "${ALEMBIC_AUTO_UPGRADE:-false}" = "true" ]; then
  echo "Running Alembic upgrade head..."
  alembic -c /app/alembic.ini upgrade head
fi

exec gunicorn -k uvicorn.workers.UvicornWorker app:app --bind 0.0.0.0:5000 --workers ${GUNICORN_WORKERS:-4} --log-level info
