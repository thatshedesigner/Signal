"""Chat API — Interactive news chat with grounded responses"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.mock_data import ARTICLES, SOURCES
import uuid
from datetime import datetime

router = APIRouter()

# In-memory chat sessions (demo)
_sessions: dict = {}


class ChatMessage(BaseModel):
    message: str
    story_id: Optional[str] = None


DEMO_RESPONSES = {
    "climate": {
        "response": "Based on 4 verified sources (avg Trust Score: 92/100):\n\nThe 2026 Geneva Climate Summit produced the most ambitious climate agreement in history. Key outcomes include:\n\n1. **147 nations** signed the updated carbon pledge\n2. **$500B** committed to green energy transition fund\n3. **2035 net-zero target** adopted by 89 developed countries\n4. **Carbon border adjustment** mechanism approved for the first time\n\nDeveloping nations secured an additional 5-year grace period, though critics argue even these targets may be insufficient to limit warming to 1.5°C.\n\nThe agreement is legally binding, unlike previous voluntary commitments.",
        "sources": [
            {"name": "Reuters", "trust_score": 94, "title": "147 Nations Sign Updated Carbon Pledge"},
            {"name": "BBC News", "trust_score": 91, "title": "Climate Summit Reaches Historic Deal"},
            {"name": "The Guardian", "trust_score": 87, "title": "Green Fund Surpasses $500B"},
            {"name": "Al Jazeera", "trust_score": 85, "title": "Developing Nations React to New Treaty"},
        ]
    },
    "banking": {
        "response": "Based on 3 verified sources (avg Trust Score: 91/100):\n\nThe March 2026 banking instability was triggered by:\n\n1. **Rapid interest rate shifts** by the Federal Reserve\n2. **Overexposure** of mid-size banks to commercial real estate\n3. A **liquidity crunch** following deposit outflows at three regional banks\n\nKey context: Unlike 2023, regulators intervened within **48 hours**, preventing wider contagion. The Fed activated emergency lending facilities and signaled a potential rate cut.\n\nTreasury yields fell 45 basis points. The situation appears to be stabilizing.",
        "sources": [
            {"name": "Bloomberg", "trust_score": 91, "title": "Fed Signals Emergency Rate Cut"},
            {"name": "Financial Times", "trust_score": 93, "title": "Bank Stress Analysis"},
            {"name": "AP News", "trust_score": 95, "title": "Regulatory Response Timeline"},
        ]
    },
    "default": {
        "response": "I can help you explore any news story in depth. Here are some topics I can discuss based on today's top stories:\n\n• **Climate Summit 2026** — What was agreed and what it means\n• **Banking Crisis** — March 2026 instability analysis\n• **GPT-5 Launch** — Capabilities and market impact\n• **EU AI Regulation** — The new framework explained\n• **Turkey Earthquake** — Latest rescue updates\n• **Malaria Vaccine** — The mRNA breakthrough\n\nAsk me anything about these stories, or request a simplified explanation, impact analysis, or fact-check.",
        "sources": []
    }
}


@router.post("/chat/sessions")
async def create_session():
    """Create a new chat session"""
    session_id = str(uuid.uuid4())
    _sessions[session_id] = {
        "id": session_id,
        "messages": [],
        "created_at": datetime.utcnow().isoformat(),
    }
    return {"session": _sessions[session_id]}


@router.post("/chat/sessions/{session_id}/message")
async def send_message(session_id: str, msg: ChatMessage):
    """Send a message and get a grounded response"""
    if session_id not in _sessions:
        _sessions[session_id] = {"id": session_id, "messages": [], "created_at": datetime.utcnow().isoformat()}

    session = _sessions[session_id]
    session["messages"].append({"role": "user", "content": msg.message, "timestamp": datetime.utcnow().isoformat()})

    # Simple keyword matching for demo
    text = msg.message.lower()
    if any(kw in text for kw in ["climate", "summit", "carbon", "green", "environment"]):
        resp = DEMO_RESPONSES["climate"]
    elif any(kw in text for kw in ["bank", "fed", "rate", "finance", "deposit"]):
        resp = DEMO_RESPONSES["banking"]
    else:
        resp = DEMO_RESPONSES["default"]

    assistant_msg = {
        "role": "assistant",
        "content": resp["response"],
        "sources": resp["sources"],
        "timestamp": datetime.utcnow().isoformat(),
    }
    session["messages"].append(assistant_msg)

    return {"message": assistant_msg, "session_id": session_id}


@router.get("/chat/sessions/{session_id}")
async def get_session(session_id: str):
    """Get chat session history"""
    session = _sessions.get(session_id)
    if not session:
        return {"session": {"id": session_id, "messages": []}}
    return {"session": session}
