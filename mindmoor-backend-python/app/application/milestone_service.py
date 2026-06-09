from app.infrastructure.repositories import MilestoneRepository
from app.domain.models import Milestone

class MilestoneService:
    def __init__(self, db):
        self.repo = MilestoneRepository(db)

    def get_all(self):
        return self.repo.get_all()

    def create(self, user_id: int, nome_conquista: str):
        if not nome_conquista.strip():
            raise ValueError("Nome da conquista não pode ser vazio")
        milestone = Milestone(user_id=user_id, nome_conquista=nome_conquista)
        return self.repo.add(milestone)

    def update(self, id: int, dados: dict):
        milestone = self.repo.get_by_id(id)
        if not milestone:
            raise ValueError("Conquista não encontrada")
        return self.repo.update(id, dados)

    def delete(self, id: int):
        milestone = self.repo.get_by_id(id)
        if not milestone:
            raise ValueError("Conquista não encontrada")
        self.repo.delete(id)