"""Live API — Live stream hub"""
from fastapi import APIRouter, HTTPException
from app.mock_data import LIVE_STREAMS

router = APIRouter()


@router.get("/live/streams")
async def list_live_streams():
    """List active and recent live streams"""
    return {
        "streams": LIVE_STREAMS,
        "active_count": sum(1 for s in LIVE_STREAMS if s.get("is_active")),
    }


@router.get("/live/{stream_id}")
async def get_live_stream(stream_id: str):
    """Get live stream detail with AI summaries"""
    stream = next((s for s in LIVE_STREAMS if s["id"] == stream_id), None)
    if not stream:
        raise HTTPException(status_code=404, detail="Stream not found")
    return {"stream": stream}
