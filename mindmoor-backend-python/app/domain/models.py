from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    senha = Column(String, nullable=False)
    data_cadastro = Column(DateTime, default=datetime.utcnow)

class DiaryEntry(Base):
    __tablename__ = "diary_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime, default=datetime.utcnow)
    conteudo = Column(String, nullable=False)
    humor = Column(String, nullable=False)

class Medication(Base):
    __tablename__ = "medications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    nome_remedio = Column(String, nullable=False)
    dosagem = Column(String, nullable=False)
    horario = Column(DateTime)
    foi_tomado = Column(Boolean, default=False)

class TherapySession(Base):
    __tablename__ = "therapy_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    data = Column(DateTime, default=datetime.utcnow)
    nome_terapeuta = Column(String, nullable=False)
    anotacoes = Column(String, nullable=False)

class Milestone(Base):
    __tablename__ = "milestones"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    nome_conquista = Column(String, nullable=False)
    desbloqueada = Column(Boolean, default=False)
    data_desbloqueio = Column(DateTime, nullable=True)