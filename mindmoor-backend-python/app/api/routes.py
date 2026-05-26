from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.infrastructure.database import get_db
from app.infrastructure.repositories import DiaryRepository, MedicationRepository, TherapySessionRepository, MilestoneRepository
from app.domain.models import DiaryEntry, Medication, TherapySession, Milestone
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
    return DiaryRepository(db).get_all()

@router.get("/diary/{id}")
def get_diary(id: int, db: Session = Depends(get_db)):
    entry = DiaryRepository(db).get_by_id(id)
    if not entry:
        raise HTTPException(status_code=404, detail="Entrada não encontrada")
    return entry

@router.post("/diary")
def create_diary(data: DiaryEntryCreate, db: Session = Depends(get_db)):
    entry = DiaryEntry(user_id=data.user_id, conteudo=data.conteudo, humor=data.humor)
    return DiaryRepository(db).add(entry)

@router.delete("/diary/{id}")
def delete_diary(id: int, db: Session = Depends(get_db)):
    DiaryRepository(db).delete(id)
    return {"message": "Deletado com sucesso"}

@router.put("/diary/{id}")
def update_diary(id: int, data: DiaryEntryUpdate, db: Session = Depends(get_db)):
    entry = DiaryRepository(db).update(id, data.model_dump(exclude_none=True))
    if not entry:
        raise HTTPException(status_code=404, detail="Entrada não encontrada")
    return entry

# Medicações
@router.get("/medications")
def get_all_medications(db: Session = Depends(get_db)):
    return MedicationRepository(db).get_all()

@router.post("/medications")
def create_medication(data: MedicationCreate, db: Session = Depends(get_db)):
    med = Medication(user_id=data.user_id, nome_remedio=data.nome_remedio, dosagem=data.dosagem, horario=data.horario)
    return MedicationRepository(db).add(med)

@router.delete("/medications/{id}")
def delete_medication(id: int, db: Session = Depends(get_db)):
    MedicationRepository(db).delete(id)
    return {"message": "Deletado com sucesso"}

@router.put("/medications/{id}")
def update_medication(id: int, data: MedicationUpdate, db: Session = Depends(get_db)):
    med = MedicationRepository(db).update(id, data.model_dump(exclude_none=True))
    if not med:
        raise HTTPException(status_code=404, detail="Medicamento não encontrado")
    return med


# Sessões
@router.get("/sessions")
def get_all_sessions(db: Session = Depends(get_db)):
    return TherapySessionRepository(db).get_all()

@router.post("/sessions")
def create_session(data: TherapySessionCreate, db: Session = Depends(get_db)):
    session = TherapySession(user_id=data.user_id, nome_terapeuta=data.nome_terapeuta, anotacoes=data.anotacoes)
    return TherapySessionRepository(db).add(session)

@router.delete("/sessions/{id}")
def delete_session(id: int, db: Session = Depends(get_db)):
    TherapySessionRepository(db).delete(id)
    return {"message": "Deletado com sucesso"}

@router.put("/sessions/{id}")
def update_session(id: int, data: TherapySessionUpdate, db: Session = Depends(get_db)):
    session = TherapySessionRepository(db).update(id, data.model_dump(exclude_none=True))
    if not session:
        raise HTTPException(status_code=404, detail="Sessão não encontrada")
    return session

# Conquistas
@router.get("/milestones")
def get_all_milestones(db: Session = Depends(get_db)):
    return MilestoneRepository(db).get_all()

@router.post("/milestones")
def create_milestone(data: MilestoneCreate, db: Session = Depends(get_db)):
    milestone = Milestone(user_id=data.user_id, nome_conquista=data.nome_conquista)
    return MilestoneRepository(db).add(milestone)

@router.delete("/milestones/{id}")
def delete_milestone(id: int, db: Session = Depends(get_db)):
    MilestoneRepository(db).delete(id)
    return {"message": "Deletado com sucesso"}

@router.put("/milestones/{id}")
def update_milestone(id: int, data: MilestoneUpdate, db: Session = Depends(get_db)):
    milestone = MilestoneRepository(db).update(id, data.model_dump(exclude_none=True))
    if not milestone:
        raise HTTPException(status_code=404, detail="Conquista não encontrada")
    return milestone