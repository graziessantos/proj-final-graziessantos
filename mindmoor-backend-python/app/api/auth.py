from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.infrastructure.database import get_db
from app.domain.models import User

SECRET_KEY = "mindmoor-secret-key-2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()

class UserRegister(BaseModel):
    nome: str
    email: str
    senha: str

class UserLogin(BaseModel):
    email: str
    senha: str

def hash_senha(senha: str):
    return pwd_context.hash(senha)

def verificar_senha(senha: str, hash: str):
    return pwd_context.verify(senha, hash)

def criar_token(data: dict):
    dados = data.copy()
    expira = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    dados.update({"exp": expira})
    return jwt.encode(dados, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register")
def register(data: UserRegister, db: Session = Depends(get_db)):
    usuario_existente = db.query(User).filter(User.email == data.email).first()
    if usuario_existente:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    
    usuario = User(
        nome=data.nome,
        email=data.email,
        senha=hash_senha(data.senha)
    )
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return {"message": "Usuário criado com sucesso"}

@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    usuario = db.query(User).filter(User.email == data.email).first()
    if not usuario or not verificar_senha(data.senha, usuario.senha):
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")
    
    token = criar_token({"sub": usuario.email})
    return {"access_token": token, "token_type": "bearer"}