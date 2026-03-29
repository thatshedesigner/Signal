"""Briefings API — Synthesized news briefings"""
from fastapi import APIRouter, HTTPException
from app.mock_data import BRIEFINGS

router = APIRouter()


@router.get("/briefings")
async def list_briefings():
    """List all briefings"""
    items = [
        {
            "id": b["id"],
            "title": b["title"],
            "summary": b["summary"][:150] + "...",
            "topic_cluster": b.get("topic_cluster", ""),
            "trust_score": b.get("trust_score", 0),
            "source_count": b.get("source_count", 0),
            "key_facts_count": len(b.get("key_facts", [])),
            "created_at": b.get("created_at", ""),
        }
        for b in BRIEFINGS
    ]
    return {"briefings": items, "total": len(items)}


@router.get("/briefings/{briefing_id}")
async def get_briefing(briefing_id: str):
    """Get full briefing detail"""
    briefing = next((b for b in BRIEFINGS if b["id"] == briefing_id), None)
    if not briefing:
        raise HTTPException(status_code=404, detail="Briefing not found")
    return {"briefing": briefing}


@router.get("/briefings/topic/{topic}")
async def get_briefings_by_topic(topic: str):
    """Get briefings by topic cluster"""
    matches = [b for b in BRIEFINGS if b.get("topic_cluster", "").lower() == topic.lower()]
    return {"briefings": matches, "total": len(matches)}
