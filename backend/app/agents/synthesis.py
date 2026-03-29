import logging
import asyncio
from typing import Dict, Any, List
from .base import BaseAgent, AgentEvent, AgentResult
from ..event_bus import bus

logger = logging.getLogger(__name__)

class SynthesisAgent(BaseAgent):
    """
    Groups scored articles into topics and generates briefings.
    Listens for 'ARTICLE_SCORED' and publishes 'BRIEFING_CREATED'.
    """
    def __init__(self):
        super().__init__("SynthesisAgent", "1.0.0")
        self.topic_buffers: Dict[str, List[Dict[str, Any]]] = {}
        self.buffer_threshold = 2 # Articles needed to trigger a briefing

    async def process(self, event: AgentEvent) -> AgentResult:
        if event.event_type == "ARTICLE_SCORED":
            article = event.data
            topic = article.get("category", "General")
            
            if topic not in self.topic_buffers:
                self.topic_buffers[topic] = []
            
            self.topic_buffers[topic].append(article)
            logger.info(f"Buffered article for topic '{topic}' ({len(self.topic_buffers[topic])}/{self.buffer_threshold})")
            
            if len(self.topic_buffers[topic]) >= self.buffer_threshold:
                articles = self.topic_buffers.pop(topic)
                logger.info(f"Threshold reached. Synthesizing briefing for '{topic}'...")
                briefing = await self.generate_briefing(topic, articles)
                await bus.publish(AgentEvent(
                    event_type="BRIEFING_CREATED",
                    source_agent=self.name,
                    data=briefing
                ))
                return AgentResult(success=True, data={"briefing_title": briefing["title"]})
            
            return AgentResult(success=True, data={"buffered": True, "topic": topic})
        return AgentResult(success=True, data={"ignored": True})

    async def generate_briefing(self, topic: str, articles: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Synthesize multiple articles into a single briefing using LLM logic."""
        await asyncio.sleep(0.8) # Simulate LLM generation time
        return {
            "title": f"Synthesis: Developments in {topic}",
            "topic": topic,
            "source_count": len(articles),
            "summary": f"This briefing maps the context and implications from {len(articles)} recent reports on {topic}.",
            "key_facts": [a["title"] for a in articles],
            "trust_score": sum(a.get("trust_score", 0) for a in articles) / len(articles)
        }
