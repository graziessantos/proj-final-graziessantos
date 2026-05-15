from fastapi import FastAPI
from app.api.routes import router
from app.infrastructure.database import create_tables

app = FastAPI(title="MindMoor API", version="1.0.0")

create_tables()

app.include_router(router, prefix="/api")