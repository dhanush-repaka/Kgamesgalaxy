#!/bin/bash
echo "Starting Karthikeya Games Galaxy backend..."
echo "PORT: ${PORT:-8080}"
echo "MONGO_URL: ${MONGO_URL:+SET}"
echo "DB_NAME: ${DB_NAME:+SET}"
exec uvicorn server:app --host 0.0.0.0 --port ${PORT:-8080}