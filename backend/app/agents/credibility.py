import logging
import asyncio
from typing import Dict, Any
from .base import BaseAgent, AgentEvent, AgentResult
from ..event_bus import bus
from ..config import settings
try:
    from openai import AsyncOpenAI
except ImportError:
    AsyncOpenAI = None

logger = logging.getLogger(__name__)

class CredibilityAgent(BaseAgent):
    """
    Analyzes articles for trust and credibility.
    Listens for 'ARTICLE_FETCHED', processes, and publishes 'ARTICLE_SCORED'.
    """
    def __init__(self):
        super().__init__("CredibilityAgent", "1.0.0")
        self.openai_client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if getattr(settings, 'OPENAI_API_KEY', None) else None

    async def process(self, event: AgentEvent) -> AgentResult:
        if event.event_type == "ARTICLE_FETCHED":
            article = event.data
            logger.info(f"Scoring article: {article.get('title')}")
            scored_article = await self.score_article(article)
            await bus.publish(AgentEvent(
                event_type="ARTICLE_SCORED",
                source_agent=self.name,
                data=scored_article
            ))
            return AgentResult(success=True, data={"url": scored_article["url"], "score": scored_article["trust_score"]})
        return AgentResult(success=True, data={"ignored": True})

    async def score_article(self, article: Dict[str, Any]) -> Dict[str, Any]:
        """Use LLM (or mock logic) to assess credibility."""
        if self.openai_client:
            # Placeholder for actual LLM call using openai_client
            await asyncio.sleep(1)
            score = 85
        else:
            await asyncio.sleep(0.3)
            score = 88 # Mock score

        article["trust_score"] = score
        article["credibility_details"] = {
            "sources_verified": True,
            "bias_level": "low",
            "factual_consistency": "high"
        }
        return article
