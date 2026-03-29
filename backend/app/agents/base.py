"""Base agent class for the Signal multi-agent system"""
import uuid
import time
import logging
from datetime import datetime
from typing import Any, Optional
from dataclasses import dataclass, field


logger = logging.getLogger(__name__)


@dataclass
class AgentEvent:
    """An event passed between agents via the event bus"""
    event_type: str
    data: dict
    source_agent: str = ""
    event_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())


@dataclass
class AgentResult:
    """Result returned from agent processing"""
    success: bool
    data: Any = None
    error: Optional[str] = None
    duration_ms: float = 0.0


class BaseAgent:
    """Base class for all Signal agents.
    
    Each agent has:
    - A name and version for identification
    - A process() method for handling events
    - Logging for auditability
    - Health check capability
    """

    def __init__(self, name: str, version: str = "1.0.0"):
        self.name = name
        self.version = version
        self._logs: list[dict] = []

    async def process(self, event: AgentEvent) -> AgentResult:
        """Process an incoming event. Override in subclasses."""
        raise NotImplementedError(f"{self.name} must implement process()")

    async def health_check(self) -> bool:
        """Check if this agent is operational."""
        return True

    def log(self, action: str, input_summary: str, output_summary: str, status: str = "success", duration_ms: float = 0.0):
        """Record an audit log entry."""
        entry = {
            "id": str(uuid.uuid4()),
            "agent_name": self.name,
            "action": action,
            "input_summary": input_summary,
            "output_summary": output_summary,
            "duration_ms": duration_ms,
            "status": status,
            "created_at": datetime.utcnow().isoformat(),
        }
        self._logs.append(entry)
        logger.info(f"[{self.name}] {action}: {status} ({duration_ms:.1f}ms)")
        return entry

    def get_logs(self, limit: int = 50) -> list[dict]:
        """Return recent audit logs."""
        return self._logs[-limit:]

    async def run(self, event: AgentEvent) -> AgentResult:
        """Execute the agent with timing and logging."""
        start = time.time()
        try:
            result = await self.process(event)
            duration = (time.time() - start) * 1000
            result.duration_ms = duration
            self.log(
                action=event.event_type,
                input_summary=str(event.data)[:200],
                output_summary=str(result.data)[:200] if result.data else "",
                status="success" if result.success else "error",
                duration_ms=duration,
            )
            return result
        except Exception as e:
            duration = (time.time() - start) * 1000
            self.log(
                action=event.event_type,
                input_summary=str(event.data)[:200],
                output_summary=str(e),
                status="error",
                duration_ms=duration,
            )
            return AgentResult(success=False, error=str(e), duration_ms=duration)

    def info(self) -> dict:
        """Return agent metadata."""
        return {
            "name": self.name,
            "version": self.version,
            "log_count": len(self._logs),
        }
