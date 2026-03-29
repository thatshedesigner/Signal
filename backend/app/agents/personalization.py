import logging
import asyncio
from typing import Dict, Any
from .base import BaseAgent, AgentEvent, AgentResult
from ..event_bus import bus

logger = logging.getLogger(__name__)

class PersonalizationAgent(BaseAgent):
    """
    Ranks content based on user preference embeddings.
    Listens for 'BRIEFING_CREATED' and publishes 'CONTENT_PERSONALIZED'.
    """
    def __init__(self):
        super().__init__("PersonalizationAgent", "1.0.0")

    async def process(self, event: AgentEvent) -> AgentResult:
        if event.event_type == "BRIEFING_CREATED":
            briefing = event.data
            logger.info(f"Personalizing briefing: {briefing.get('title')}")
            
            # Simulate matching logic against user clusters
            matched_users = await self.match_users(briefing)
            
            await bus.publish(AgentEvent(
                event_type="CONTENT_PERSONALIZED",
                source_agent=self.name,
                data={"briefing": briefing, "matched_users": matched_users}
            ))
            return AgentResult(success=True, data={"matched_count": len(matched_users)})
        return AgentResult(success=True, data={"ignored": True})

    async def match_users(self, content: Dict[str, Any]) -> list[str]:
        """Mock vector similarity match against user preferences."""
        await asyncio.sleep(0.4) 
        # In a real system, FAISS would be queried here
        return ["user_123", "user_456"]
