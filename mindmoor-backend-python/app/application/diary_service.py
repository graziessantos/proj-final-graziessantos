from app.infrastructure.repositories import DiaryRepository
from app.domain.models import DiaryEntry

class DiaryService:
    def __init__(self, db):
        self.repo = DiaryRepository(db)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, id: int):
        entry = self.repo.get_by_id(id)
        if not entry:
            raise ValueError("Entrada não encontrada")
        return entry

    def create(self, user_id: int, conteudo: str, humor: str):
        if not conteudo.strip():
            raise ValueError("Conteúdo não pode ser vazio")
        if humor not in ["😔", "😕", "😐", "🙂", "😊", "ótimo", "bem", "neutro", "baixo", "mal"]:
            raise ValueError("Humor inválido")
        entry = DiaryEntry(user_id=user_id, conteudo=conteudo, humor=humor)
        return self.repo.add(entry)

    def update(self, id: int, dados: dict):
        entry = self.repo.get_by_id(id)
        if not entry:
            raise ValueError("Entrada não encontrada")
        return self.repo.update(id, dados)

    def delete(self, id: int):
        entry = self.repo.get_by_id(id)
        if not entry:
            raise ValueError("Entrada não encontrada")
        self.repo.delete(id)