"""Stories API — Article detail and search"""
from fastapi import APIRouter, HTTPException
from app.mock_data import ARTICLES, SOURCES

router = APIRouter()


@router.get("/stories/{story_id}")
async def get_story(story_id: str):
    """Get full story detail with credibility panel"""
    article = next((a for a in ARTICLES if a["id"] == story_id), None)
    if not article:
        raise HTTPException(status_code=404, detail="Story not found")

    source = next((s for s in SOURCES if s["id"] == article["source_id"]), {})

    # Find related articles (same category, different article)
    related = [
        {"id": a["id"], "title": a["title"], "source_name": next((s["name"] for s in SOURCES if s["id"] == a["source_id"]), ""),
         "trust_score": a.get("trust_score", 0), "image_url": a.get("image_url", ""), "published_at": a.get("published_at", "")}
        for a in ARTICLES
        if a["id"] != story_id and a.get("category") == article.get("category")
    ][:4]

    return {
        "article": {
            **article,
            "source_name": source.get("name", "Unknown"),
            "source_reliability": source.get("reliability_score", 0),
            "source_url": source.get("url", ""),
        },
        "credibility": article.get("credibility_details", {}),
        "related": related,
    }


@router.get("/stories/{story_id}/related")
async def get_related_stories(story_id: str):
    """Get related articles"""
    article = next((a for a in ARTICLES if a["id"] == story_id), None)
    if not article:
        raise HTTPException(status_code=404, detail="Story not found")

    related = [
        {"id": a["id"], "title": a["title"], "trust_score": a.get("trust_score", 0),
         "source_name": next((s["name"] for s in SOURCES if s["id"] == a["source_id"]), ""),
         "image_url": a.get("image_url", "")}
        for a in ARTICLES if a["id"] != story_id and a.get("category") == article.get("category")
    ]
    return {"related": related}


@router.get("/stories/search/query")
async def search_stories(q: str):
    """Search stories by keyword"""
    results = [
        {"id": a["id"], "title": a["title"], "trust_score": a.get("trust_score", 0),
         "category": a.get("category", ""), "source_name": next((s["name"] for s in SOURCES if s["id"] == a["source_id"]), ""),
         "image_url": a.get("image_url", "")}
        for a in ARTICLES if q.lower() in a["title"].lower() or q.lower() in a.get("content", "").lower()
    ]
    return {"results": results, "count": len(results)}
