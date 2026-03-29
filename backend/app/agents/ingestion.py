import asyncio
import logging
from typing import List, Dict, Any
from .base import BaseAgent, AgentEvent, AgentResult
from ..event_bus import bus

logger = logging.getLogger(__name__)

class IngestionAgent(BaseAgent):
    """
    Simulates checking RSS feeds and News APIs for new articles.
    Publishes 'ARTICLE_FETCHED' events to the event bus.
    """
    def __init__(self):
        super().__init__("IngestionAgent", "1.0.0")

    async def process(self, event: AgentEvent) -> AgentResult:
        if event.event_type == "TRIGGER_INGESTION":
            logger.info("Ingestion triggered, fetching latest news...")
            articles = await self.fetch_latest_news()
            for article in articles:
                await bus.publish(AgentEvent(
                    event_type="ARTICLE_FETCHED",
                    source_agent=self.name,
                    data=article
                ))
            return AgentResult(success=True, data={"ingested_count": len(articles)})
        return AgentResult(success=True, data={"ignored": True})

    async def fetch_latest_news(self) -> List[Dict[str, Any]]:
        """Mock news fetcher."""
        await asyncio.sleep(0.5) 
        return [
            {
                "url": "https://example.com/news/1",
                "title": "Global Markets Rally Amid Tech Earnings",
                "content": "Tech stocks soared today as major companies reported record Q3 earnings...",
                "source": "TechCrunch Mock",
                "category": "Technology"
            },
            {
                "url": "https://example.com/news/2",
                "title": "New Climate Agreement Signed in Geneva",
                "content": "Leaders from 147 nations have agreed to phase out internal combustion engines by 2040...",
                "source": "Reuters Mock",
                "category": "Climate"
            },
            {
                "url": "https://example.com/news/3",
                "title": "Breakthrough in Fusion Energy Research",
                "content": "Scientists announce a net-positive fusion reactor sustaining plasma for 10 minutes...",
                "source": "Nature Mock",
                "category": "Technology"
            }
        ]
