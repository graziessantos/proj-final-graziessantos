from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.api.auth import router as auth_router
from app.infrastructure.database import create_tables

app = FastAPI(title="MindMoor API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

app.include_router(router, prefix="/api")
app.include_router(auth_router, prefix="/auth")