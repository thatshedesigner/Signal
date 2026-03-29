"""SQLAlchemy database models for Signal"""
import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Text, Float, Integer, Boolean,
    DateTime, ForeignKey, JSON, Table
)
from sqlalchemy.orm import relationship, DeclarativeBase
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker


class Base(DeclarativeBase):
    pass


# Many-to-many: briefings <-> articles
briefing_articles = Table(
    "briefing_articles",
    Base.metadata,
    Column("briefing_id", String, ForeignKey("briefings.id"), primary_key=True),
    Column("article_id", String, ForeignKey("articles.id"), primary_key=True),
)


class Source(Base):
    __tablename__ = "sources"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    url = Column(String)
    type = Column(String, default="rss")  # rss, api, journalist, live
    reliability_score = Column(Float, default=70.0)
    total_articles = Column(Integer, default=0)
    verified_count = Column(Integer, default=0)
    last_scraped = Column(DateTime, default=datetime.utcnow)
    articles = relationship("Article", back_populates="source")


class Article(Base):
    __tablename__ = "articles"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    source_id = Column(String, ForeignKey("sources.id"))
    title = Column(String, nullable=False)
    content = Column(Text)
    url = Column(String)
    image_url = Column(String)
    language = Column(String, default="en")
    category = Column(String)
    trust_score = Column(Float)
    credibility_details = Column(JSON)
    entities = Column(JSON)
    published_at = Column(DateTime)
    ingested_at = Column(DateTime, default=datetime.utcnow)
    source = relationship("Source", back_populates="articles")
    briefings = relationship("Briefing", secondary=briefing_articles, back_populates="articles")
    comments = relationship("Comment", back_populates="article")


class Briefing(Base):
    __tablename__ = "briefings"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    summary = Column(Text)
    key_facts = Column(JSON)
    perspectives = Column(JSON)
    implications = Column(JSON)
    topic_cluster = Column(String)
    trust_score = Column(Float)
    source_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    articles = relationship("Article", secondary=briefing_articles, back_populates="briefings")


class Reel(Base):
    __tablename__ = "reels"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    journalist_name = Column(String)
    title = Column(String, nullable=False)
    video_url = Column(String)
    thumbnail_url = Column(String)
    transcript = Column(Text)
    tags = Column(JSON)
    credibility_score = Column(Float, default=75.0)
    views = Column(Integer, default=0)
    avg_watch_pct = Column(Float, default=0.0)
    duration_sec = Column(Integer, default=60)
    created_at = Column(DateTime, default=datetime.utcnow)


class LiveStream(Base):
    __tablename__ = "live_streams"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    source_id = Column(String, ForeignKey("sources.id"), nullable=True)
    title = Column(String, nullable=False)
    stream_url = Column(String)
    thumbnail_url = Column(String)
    is_active = Column(Boolean, default=True)
    ai_summaries = Column(JSON)
    viewer_count = Column(Integer, default=0)
    started_at = Column(DateTime, default=datetime.utcnow)


class Comment(Base):
    __tablename__ = "comments"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_name = Column(String, default="Anonymous")
    article_id = Column(String, ForeignKey("articles.id"))
    content = Column(Text)
    quality_score = Column(Float)
    flagged = Column(Boolean, default=False)
    flag_reason = Column(String)
    likes = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    article = relationship("Article", back_populates="comments")


class UserInteraction(Base):
    __tablename__ = "user_interactions"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, default="anonymous")
    item_type = Column(String)  # article, briefing, reel, live
    item_id = Column(String)
    action = Column(String)  # view, click, share, skip, like
    duration_sec = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)


class StoryArc(Base):
    __tablename__ = "story_arcs"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(Text)
    timeline_events = Column(JSON)
    sentiment_data = Column(JSON)
    status = Column(String, default="developing")
    article_count = Column(Integer, default=0)
    first_seen = Column(DateTime, default=datetime.utcnow)
    last_updated = Column(DateTime, default=datetime.utcnow)


class AgentLog(Base):
    __tablename__ = "agent_logs"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    agent_name = Column(String)
    action = Column(String)
    input_summary = Column(Text)
    output_summary = Column(Text)
    duration_ms = Column(Float)
    status = Column(String, default="success")
    created_at = Column(DateTime, default=datetime.utcnow)
