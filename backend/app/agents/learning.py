import logging
import asyncio
from typing import Dict, Any
from .base import BaseAgent, AgentEvent, AgentResult
from ..event_bus import bus

logger = logging.getLogger(__name__)

class LearningAgent(BaseAgent):
    """
    Processes human feedback to adjust matching vectors and agent parameters.
    Listens for 'USER_INTERACTION' and publishes 'USER_PROFILE_UPDATED'.
    """
    def __init__(self):
        super().__init__("LearningAgent", "1.0.0")

    async def process(self, event: AgentEvent) -> AgentResult:
        if event.event_type == "USER_INTERACTION":
            interaction = event.data
            logger.info(f"Processing user interaction: {interaction.get('action')}")
            
            updated_profile = await self.update_embeddings(interaction)
            
            await bus.publish(AgentEvent(
                event_type="USER_PROFILE_UPDATED",
                source_agent=self.name,
                data={"user_id": interaction.get("user_id"), "profile_delta": updated_profile}
            ))
            return AgentResult(success=True, data={"profile_updated": True})
        return AgentResult(success=True, data={"ignored": True})

    async def update_embeddings(self, interaction: Dict[str, Any]) -> Dict[str, Any]:
        """Mock behavior to shift a user's interest vector."""
        await asyncio.sleep(0.3)
        return {"shift_vector": [0.01, -0.02, 0.05]}
