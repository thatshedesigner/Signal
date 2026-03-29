"""Users API — Authentication and profile"""
from fastapi import APIRouter
from app.mock_data import CATEGORIES

router = APIRouter()


@router.get("/users/me")
async def get_profile():
    """Get current user profile (demo user)"""
    return {
        "user": {
            "id": "demo-user-001",
            "name": "Alex Signal",
            "email": "alex@signal.news",
            "interests": ["Technology", "Climate", "Finance"],
            "preferences": {
                "language": "en",
                "dark_mode": True,
                "notification_frequency": "daily",
            },
            "joined": "2026-01-15",
            "articles_read": 342,
            "briefings_viewed": 28,
            "reels_watched": 156,
        }
    }


@router.get("/users/me/interactions")
async def get_interactions():
    """Get user interaction history"""
    return {
        "interactions": [
            {"type": "article", "action": "read", "count": 342},
            {"type": "briefing", "action": "viewed", "count": 28},
            {"type": "reel", "action": "watched", "count": 156},
            {"type": "chat", "action": "sessions", "count": 12},
        ],
        "top_categories": ["Technology", "Climate", "Finance"],
    }
