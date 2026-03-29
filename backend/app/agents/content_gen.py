import logging
import asyncio
from typing import Dict, Any
from .base import BaseAgent, AgentEvent, AgentResult
from ..event_bus import bus

logger = logging.getLogger(__name__)

class ContentGenerationAgent(BaseAgent):
    """
    Transforms text content into scripts or summaries for alternative formats.
    Listens for 'BRIEFING_CREATED' and publishes 'REEL_SCRIPT_CREATED'.
    """
    def __init__(self):
        super().__init__("ContentGenerationAgent", "1.0.0")

    async def process(self, event: AgentEvent) -> AgentResult:
        if event.event_type == "BRIEFING_CREATED":
            briefing = event.data
            logger.info(f"Generating scripts for briefing: {briefing.get('title')}")
            
            script = await self.generate_reel_script(briefing)
            
            await bus.publish(AgentEvent(
                event_type="REEL_SCRIPT_CREATED",
                source_agent=self.name,
                data={"briefing_id": briefing.get("id", "temp_id"), "script": script}
            ))
            return AgentResult(success=True, data={"script_length": len(script)})
        return AgentResult(success=True, data={"ignored": True})

    async def generate_reel_script(self, briefing: Dict[str, Any]) -> str:
        """Mock LLM prompt to convert a briefing to a snappy video script."""
        await asyncio.sleep(1.2) # LLM latency
        return f"Hey everyone, big news on {briefing.get('topic')}. Here are the top 3 things you need to know..."
