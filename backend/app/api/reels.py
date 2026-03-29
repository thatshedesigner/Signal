"""Reels API — Journalist video feed"""
from fastapi import APIRouter, HTTPException
from app.mock_data import REELS

router = APIRouter()


@router.get("/reels/feed")
async def get_reel_feed(limit: int = 10, offset: int = 0):
    """Get personalized reel feed"""
    items = REELS[offset:offset + limit]
    return {"reels": items, "total": len(REELS)}


@router.get("/reels/{reel_id}")
async def get_reel(reel_id: str):
    """Get single reel detail"""
    reel = next((r for r in REELS if r["id"] == reel_id), None)
    if not reel:
        raise HTTPException(status_code=404, detail="Reel not found")
    return {"reel": reel}


@router.post("/reels/{reel_id}/interaction")
async def track_reel_interaction(reel_id: str, action: str = "view", duration_sec: float = 0):
    """Track reel engagement (watch time, skip, like)"""
    return {"status": "tracked", "reel_id": reel_id, "action": action}
