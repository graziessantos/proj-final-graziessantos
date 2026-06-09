from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.infrastructure.database import get_db
from app.application.diary_service import DiaryService
from app.application.medication_service import MedicationService
from app.application.session_service import SessionService
from app.application.milestone_service import MilestoneService
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# DTOs
class DiaryEntryCreate(BaseModel):
    user_id: int
    conteudo: str
    humor: str

class MedicationCreate(BaseModel):
    user_id: int
    nome_remedio: str
    dosagem: str
    horario: datetime

class TherapySessionCreate(BaseModel):
    user_id: int
    nome_terapeuta: str
    anotacoes: str

class MilestoneCreate(BaseModel):
    user_id: int
    nome_conquista: str

class DiaryEntryUpdate(BaseModel):
    conteudo: str | None = None
    humor: str | None = None

class MedicationUpdate(BaseModel):
    nome_remedio: str | None = None
    dosagem: str | None = None
    horario: datetime | None = None
    foi_tomado: bool | None = None

class TherapySessionUpdate(BaseModel):
    nome_terapeuta: str | None = None
    anotacoes: str | None = None

class MilestoneUpdate(BaseModel):
    desbloqueada: bool | None = None
    data_desbloqueio: datetime | None = None

# Diário
@router.get("/diary")
def get_all_diary(db: Session = Depends(get_db)):
    return DiaryService(db).get_all()

@router.get("/diary/{id}")
def get_diary(id: int, db: Session = Depends(get_db)):
    try:
        return DiaryService(db).get_by_id(id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/diary")
def create_diary(data: DiaryEntryCreate, db: Session = Depends(get_db)):
    try:
        return DiaryService(db).create(data.user_id, data.conteudo, data.humor)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/diary/{id}")
def delete_diary(id: int, db: Session = Depends(get_db)):
    try:
        DiaryService(db).delete(id)
        return {"message": "Deletado com sucesso"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/diary/{id}")
def update_diary(id: int, data: DiaryEntryUpdate, db: Session = Depends(get_db)):
    try:
        return DiaryService(db).update(id, data.model_dump(exclude_none=True))
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# Medicações
@router.get("/medications")
def get_all_medications(db: Session = Depends(get_db)):
    return MedicationService(db).get_all()

@router.post("/medications")
def create_medication(data: MedicationCreate, db: Session = Depends(get_db)):
    try:
        return MedicationService(db).create(data.user_id, data.nome_remedio, data.dosagem, data.horario)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/medications/{id}")
def delete_medication(id: int, db: Session = Depends(get_db)):
    try:
        MedicationService(db).delete(id)
        return {"message": "Deletado com sucesso"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/medications/{id}")
def update_medication(id: int, data: MedicationUpdate, db: Session = Depends(get_db)):
    try:
        return MedicationService(db).update(id, data.model_dump(exclude_none=True))
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# Sessões
@router.get("/sessions")
def get_all_sessions(db: Session = Depends(get_db)):
    return SessionService(db).get_all()

@router.post("/sessions")
def create_session(data: TherapySessionCreate, db: Session = Depends(get_db)):
    try:
        return SessionService(db).create(data.user_id, data.nome_terapeuta, data.anotacoes)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/sessions/{id}")
def delete_session(id: int, db: Session = Depends(get_db)):
    try:
        SessionService(db).delete(id)
        return {"message": "Deletado com sucesso"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/sessions/{id}")
def update_session(id: int, data: TherapySessionUpdate, db: Session = Depends(get_db)):
    try:
        return SessionService(db).update(id, data.model_dump(exclude_none=True))
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# Conquistas
@router.get("/milestones")
def get_all_milestones(db: Session = Depends(get_db)):
    return MilestoneService(db).get_all()

@router.post("/milestones")
def create_milestone(data: MilestoneCreate, db: Session = Depends(get_db)):
    try:
        return MilestoneService(db).create(data.user_id, data.nome_conquista)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/milestones/{id}")
def delete_milestone(id: int, db: Session = Depends(get_db)):
    try:
        MilestoneService(db).delete(id)
        return {"message": "Deletado com sucesso"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/milestones/{id}")
def update_milestone(id: int, data: MilestoneUpdate, db: Session = Depends(get_db)):
    try:
        return MilestoneService(db).update(id, data.model_dump(exclude_none=True))
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))