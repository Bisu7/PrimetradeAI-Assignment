from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Primetrade AI Assignment"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    SECRET_KEY: str = "supersecretkey_please_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    DATABASE_URL: str = "postgresql://admin:adminpassword@127.0.0.1:5433/primetrade"
    BACKEND_CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
