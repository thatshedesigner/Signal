import logging
import asyncio
from typing import Callable, Awaitable, Dict, List
from .agents.base import AgentEvent

logger = logging.getLogger(__name__)

# Type alias for event handlers
EventHandler = Callable[[AgentEvent], Awaitable[None]]

class EventBus:
    """
    An async event bus for inter-agent communication.
    In a full production environment, this is backed by Redis Streams.
    For local development and testing, it uses an in-memory asyncio queue 
    to maintain the exact same event-driven architecture without requiring 
    a local Redis container to be running.
    """
    def __init__(self):
        self._subscribers: Dict[str, List[EventHandler]] = {}
        self._queue: asyncio.Queue = asyncio.Queue()
        self._running = False
        self._worker_task = None

    def subscribe(self, event_type: str, handler: EventHandler):
        """Subscribe an agent's handler to a specific event type."""
        if event_type not in self._subscribers:
            self._subscribers[event_type] = []
        self._subscribers[event_type].append(handler)
        logger.info(f"Subscribed to event '{event_type}'")

    async def publish(self, event: AgentEvent):
        """Publish an event to the bus."""
        logger.debug(f"Publishing event: {event.event_type} from {event.source_agent}")
        await self._queue.put(event)

    async def _worker(self):
        """Background worker to process events from the queue."""
        while self._running:
            try:
                event: AgentEvent = await self._queue.get()
                handlers = self._subscribers.get(event.event_type, [])
                
                # Process handlers concurrently
                tasks = []
                for handler in handlers:
                    tasks.append(asyncio.create_task(handler(event)))
                
                if tasks:
                    results = await asyncio.gather(*tasks, return_exceptions=True)
                    for result in results:
                        if isinstance(result, Exception):
                            logger.error(f"Error in handler for {event.event_type}: {result}")
                
                self._queue.task_done()
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"Event bus worker error: {e}")

    async def start(self):
        """Start the event bus worker."""
        if not self._running:
            self._running = True
            self._worker_task = asyncio.create_task(self._worker())
            logger.info("Event bus started")

    async def stop(self):
        """Stop the event bus worker."""
        self._running = False
        if self._worker_task:
            self._worker_task.cancel()
            try:
                await self._worker_task
            except asyncio.CancelledError:
                pass
        logger.info("Event bus stopped")

# Global singleton instance
bus = EventBus()
