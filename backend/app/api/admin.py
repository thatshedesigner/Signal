"""Admin API — Agent status, logs, and metrics"""
from fastapi import APIRouter
from functools import lru_cache
from app.mock_data import ARTICLES, BRIEFINGS, REELS, LIVE_STREAMS, STORY_ARCS

router = APIRouter()

AGENT_STATUS = [
    {"name": "Ingestion Agent", "status": "active", "version": "1.0.0", "last_run": "2 min ago", "items_processed": 1247},
    {"name": "Credibility Agent", "status": "active", "version": "1.0.0", "last_run": "3 min ago", "items_processed": 1180},
    {"name": "Synthesis Agent", "status": "active", "version": "1.0.0", "last_run": "5 min ago", "items_processed": 89},
    {"name": "Personalization Agent", "status": "active", "version": "1.0.0", "last_run": "1 min ago", "items_processed": 3420},
    {"name": "Content Generation Agent", "status": "active", "version": "1.0.0", "last_run": "10 min ago", "items_processed": 67},
    {"name": "Video Intelligence Agent", "status": "active", "version": "1.0.0", "last_run": "4 min ago", "items_processed": 234},
    {"name": "Live Broadcast Agent", "status": "active", "version": "1.0.0", "last_run": "30 sec ago", "items_processed": 18},
    {"name": "Interaction Agent", "status": "active", "version": "1.0.0", "last_run": "1 min ago", "items_processed": 567},
    {"name": "Moderation Agent", "status": "active", "version": "1.0.0", "last_run": "2 min ago", "items_processed": 890},
    {"name": "Learning Agent", "status": "active", "version": "1.0.0", "last_run": "1 hour ago", "items_processed": 12},
]


@router.get("/admin/agents/status")
async def get_agent_status():
    """Get status of all agents"""
    return {"agents": AGENT_STATUS}


@router.post("/admin/agents/trigger-ingestion")
async def trigger_ingestion():
    """Manually trigger the INGESTION pipeline to test the multi-agent cascade"""
    from app.event_bus import bus
    from app.agents.base import AgentEvent
    await bus.publish(AgentEvent(event_type="TRIGGER_INGESTION", source_agent="admin_api", data={}))
    return {"status": "Ingestion triggered"}


@lru_cache(maxsize=1)
def _compute_metrics():
    """Heavy DB metrics aggregated using a cache"""
    return {
        "metrics": {
            "total_articles": len(ARTICLES),
            "total_briefings": len(BRIEFINGS),
            "total_reels": len(REELS),
            "active_streams": sum(1 for s in LIVE_STREAMS if s.get("is_active")),
            "story_arcs": len(STORY_ARCS),
            "avg_trust_score": round(sum(a.get("trust_score", 0) for a in ARTICLES) / len(ARTICLES), 1),
            "misinformation_flagged": 23,
            "user_sessions_today": 1847,
            "avg_engagement_min": 8.4,
        }
    }


@router.get("/admin/metrics")
async def get_metrics():
    """Get platform metrics"""
    return _compute_metrics()


@router.get("/admin/story-arcs")
async def get_story_arcs():
    """Get tracked story arcs"""
    return {"story_arcs": STORY_ARCS}
