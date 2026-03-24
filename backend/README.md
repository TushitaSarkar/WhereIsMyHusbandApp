# Backend (FastAPI)

This is the backend for the Location Tracker app. It provides REST APIs for posting and retrieving device locations, and uses MongoDB for storage.

## Setup
- Python 3.9+
- FastAPI
- Motor (async MongoDB driver)
- Uvicorn
- Pydantic
- MongoDB

## Endpoints
- `POST /location` — Devices send their location (device_id, latitude, longitude, timestamp)
- `GET /location/{device_id}` — Get the latest location for a device

## MongoDB Cloud Key
username : phdtushita_db_user
password : d8CkArUzAnUjsZs6
mongodb+srv://phdtushita_db_user:d8CkArUzAnUjsZs6@cluster0.crr3xpy.mongodb.net/?appName=Cluster0