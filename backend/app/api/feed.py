"""Feed API — Personalized news feed"""
from fastapi import APIRouter, Query
from typing import Optional
from app.mock_data import ARTICLES, TRENDING_TOPICS, CATEGORIES, SOURCES

router = APIRouter()


@router.get("/feed")
async def get_feed(
    category: Optional[str] = None,
    limit: int = Query(default=20, le=50),
    offset: int = 0,
):
    """Get personalized news feed"""
    items = ARTICLES
    if category:
        items = [a for a in items if a.get("category", "").lower() == category.lower()]

    # Enrich with source name
    source_map = {s["id"]: s for s in SOURCES}
    feed_items = []
    for art in items[offset:offset + limit]:
        source = source_map.get(art["source_id"], {})
        feed_items.append({
            "id": art["id"],
            "title": art["title"],
            "content": art["content"][:200] + "..." if len(art.get("content", "")) > 200 else art.get("content", ""),
            "source_name": source.get("name", "Unknown"),
            "source_reliability": source.get("reliability_score", 0),
            "category": art.get("category", ""),
            "image_url": art.get("image_url", ""),
            "trust_score": art.get("trust_score", 0),
            "published_at": art.get("published_at", ""),
            "url": art.get("url", ""),
        })

    return {
        "items": feed_items,
        "total": len(items),
        "offset": offset,
        "limit": limit,
    }


@router.get("/feed/trending")
async def get_trending():
    """Get trending topics"""
    return {"topics": TRENDING_TOPICS}


@router.get("/feed/categories")
async def get_categories():
    """Get available categories"""
    return {"categories": CATEGORIES}
