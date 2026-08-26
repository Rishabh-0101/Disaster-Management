import random
from datetime import datetime
from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from ..core.database import db
from ..models.schemas import ProblemCreate

router = APIRouter(prefix="/api/problems", tags=["problems"])


def generate_tracking_id() -> str:
    year = datetime.utcnow().year
    return f"JH-{year}-{random.randint(100000, 999999)}"


@router.post("/")
async def create_problem(payload: ProblemCreate):
    doc = payload.dict()
    doc["tracking_id"] = generate_tracking_id()
    doc["status"] = "submitted"
    doc["priority"] = "Medium"
    doc["created_at"] = datetime.utcnow()
    result = await db.problems.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return doc


@router.get("/track/{tracking_id}")
async def track_problem(tracking_id: str):
    problem = await db.problems.find_one({"tracking_id": tracking_id})
    if not problem:
        raise HTTPException(status_code=404, detail="No problem found with that tracking ID")
    problem["id"] = str(problem["_id"])
    del problem["_id"]
    return problem


@router.get("/by-contact/{contact}")
async def track_by_contact(contact: str):
    cursor = db.problems.find({"reporter_contact": contact}).sort("created_at", -1)
    results = []
    async for p in cursor:
        p["id"] = str(p["_id"])
        del p["_id"]
        results.append(p)
    return results


@router.get("/")
async def list_problems(category: Optional[str] = None, status: Optional[str] = None, state: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    if status:
        query["status"] = status
    if state:
        query["state"] = state
    cursor = db.problems.find(query).sort("created_at", -1)
    results = []
    async for p in cursor:
        p["id"] = str(p["_id"])
        del p["_id"]
        results.append(p)
    return results


@router.get("/stats/by-state")
async def stats_by_state():
    pipeline = [{"$group": {"_id": "$state", "count": {"$sum": 1}}}, {"$sort": {"count": -1}}]
    results = []
    async for row in db.problems.aggregate(pipeline):
        results.append({"state": row["_id"], "count": row["count"]})
    return results
