from app.infrastructure.repositories import TherapySessionRepository
from app.domain.models import TherapySession

class SessionService:
    def __init__(self, db):
        self.repo = TherapySessionRepository(db)

    def get_all(self):
        return self.repo.get_all()

    def create(self, user_id: int, nome_terapeuta: str, anotacoes: str):
        if not nome_terapeuta.strip():
            raise ValueError("Nome do terapeuta não pode ser vazio")
        if not anotacoes.strip():
            raise ValueError("Anotações não podem ser vazias")
        session = TherapySession(user_id=user_id, nome_terapeuta=nome_terapeuta, anotacoes=anotacoes)
        return self.repo.add(session)

    def update(self, id: int, dados: dict):
        session = self.repo.get_by_id(id)
        if not session:
            raise ValueError("Sessão não encontrada")
        return self.repo.update(id, dados)

    def delete(self, id: int):
        session = self.repo.get_by_id(id)
        if not session:
            raise ValueError("Sessão não encontrada")
        self.repo.delete(id)