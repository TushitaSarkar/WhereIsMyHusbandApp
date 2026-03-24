from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# MongoDB connection
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb+srv://phdtushita_db_user:d8CkArUzAnUjsZs6@cluster0.crr3xpy.mongodb.net/?appName=Cluster0"
)
client = AsyncIOMotorClient(MONGO_URI)
# Use a specific database name, e.g., 'location_tracker'
db = client["location_tracker"]

from datetime import datetime

class Location(BaseModel):
    device_id: str
    latitude: float
    longitude: float
    timestamp: Optional[str] = None  # ISO format


@app.post("/location")
async def post_location(location: Location):
    # Use current UTC time if timestamp not provided
    loc_data = location.dict()
    if not loc_data.get("timestamp"):
        loc_data["timestamp"] = datetime.utcnow().isoformat()
    await db.locations.update_one(
        {"device_id": loc_data["device_id"]},
        {"$set": loc_data},
        upsert=True
    )
    return {"status": "success"}

@app.get("/location/{device_id}")
async def get_location(device_id: str):
    loc = await db.locations.find_one({"device_id": device_id})
    if not loc:
        raise HTTPException(status_code=404, detail="Device not found")
    loc.pop("_id", None)
    return loc

# Add entrypoint for Railway deployment
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
