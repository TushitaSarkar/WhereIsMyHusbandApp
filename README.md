# Location Tracker App

This monorepo contains:
- **backend/**: FastAPI + MongoDB for device location APIs
- **frontend/**: Next.js (React, TypeScript) dashboard to view device locations on a map

## Quick Start

### Backend
1. `cd backend`
2. Create a `.env` file from `.env.example` and set your MongoDB URI
3. Install dependencies: `pip install -r requirements.txt`
4. Run: `uvicorn main:app --reload`

### Frontend
1. `cd frontend`
2. Install dependencies: `npm install`
3. Run: `npm run dev`

### Usage
- Devices POST location to `/location` endpoint
- Dashboard fetches and displays device locations

---

You can now extend the backend for authentication, and the frontend for device management and real-time updates.
