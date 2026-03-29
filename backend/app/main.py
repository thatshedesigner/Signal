from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.api import feed, stories, briefings, reels, live, chat, users, admin
from app.event_bus import bus
from app.agents.ingestion import IngestionAgent
from app.agents.credibility import CredibilityAgent
from app.agents.synthesis import SynthesisAgent
from app.agents.personalization import PersonalizationAgent
from app.agents.content_gen import ContentGenerationAgent
from app.agents.moderation import ModerationAgent
from app.agents.learning import LearningAgent

# Initialize Agents
ingestion_agent = IngestionAgent()
credibility_agent = CredibilityAgent()
synthesis_agent = SynthesisAgent()
personalization_agent = PersonalizationAgent()
content_gen_agent = ContentGenerationAgent()
moderation_agent = ModerationAgent()
learning_agent = LearningAgent()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start the event bus worker
    await bus.start()
    
    # Subscribe agents to their corresponding triggers
    bus.subscribe("TRIGGER_INGESTION", ingestion_agent.run)
    bus.subscribe("ARTICLE_FETCHED", credibility_agent.run)
    bus.subscribe("ARTICLE_SCORED", synthesis_agent.run)
    bus.subscribe("BRIEFING_CREATED", personalization_agent.run)
    bus.subscribe("BRIEFING_CREATED", content_gen_agent.run)
    bus.subscribe("USER_COMMENT_POSTED", moderation_agent.run)
    bus.subscribe("USER_INTERACTION", learning_agent.run)
    
    yield
    
    # Shutdown event bus
    await bus.stop()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-native news platform API",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routes
app.include_router(feed.router, prefix="/api/v1", tags=["Feed"])
app.include_router(stories.router, prefix="/api/v1", tags=["Stories"])
app.include_router(briefings.router, prefix="/api/v1", tags=["Briefings"])
app.include_router(reels.router, prefix="/api/v1", tags=["Reels"])
app.include_router(live.router, prefix="/api/v1", tags=["Live"])
app.include_router(chat.router, prefix="/api/v1", tags=["Chat"])
app.include_router(users.router, prefix="/api/v1", tags=["Users"])
app.include_router(admin.router, prefix="/api/v1", tags=["Admin"])


@app.get("/")
async def root():
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "operational",
        "endpoints": {
            "feed": "/api/v1/feed",
            "stories": "/api/v1/stories",
            "briefings": "/api/v1/briefings",
            "reels": "/api/v1/reels",
            "live": "/api/v1/live",
            "chat": "/api/v1/chat",
            "docs": "/docs",
        }
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}
