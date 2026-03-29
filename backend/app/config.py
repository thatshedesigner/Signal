"""Signal Backend Configuration"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    APP_NAME: str = "Signal API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./signal.db"

    # Redis (event bus)
    REDIS_URL: str = "redis://localhost:6379"

    # OpenAI (optional — mock mode if not set)
    OPENAI_API_KEY: Optional[str] = None

    # JWT
    JWT_SECRET: str = "signal-dev-secret-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = 24

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"


settings = Settings()
