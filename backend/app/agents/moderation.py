import logging
import asyncio
from typing import Dict, Any
from .base import BaseAgent, AgentEvent, AgentResult
from ..event_bus import bus

logger = logging.getLogger(__name__)

class ModerationAgent(BaseAgent):
    """
    Monitors user input (e.g. comments, chat) for safety violations.
    Listens for 'USER_COMMENT_POSTED' and publishes 'COMMENT_MODERATED'.
    """
    def __init__(self):
        super().__init__("ModerationAgent", "1.0.0")
        self.banned_words = {"spam", "scam", "clickbait"}

    async def process(self, event: AgentEvent) -> AgentResult:
        if event.event_type == "USER_COMMENT_POSTED":
            comment = event.data
            logger.info("Moderating user comment...")
            
            is_safe, reason = await self.check_safety(comment.get("content", ""))
            
            await bus.publish(AgentEvent(
                event_type="COMMENT_MODERATED",
                source_agent=self.name,
                data={"comment_id": comment.get("id"), "is_safe": is_safe, "reason": reason}
            ))
            return AgentResult(success=True, data={"is_safe": is_safe})
        return AgentResult(success=True, data={"ignored": True})

    async def check_safety(self, text: str) -> tuple[bool, str]:
        """Mock safety check."""
        await asyncio.sleep(0.2)
        text_lower = text.lower()
        for word in self.banned_words:
            if word in text_lower:
                return False, f"Contains restricted term: {word}"
        return True, "Passed"
