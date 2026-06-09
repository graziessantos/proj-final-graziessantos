from app.infrastructure.repositories import MedicationRepository
from app.domain.models import Medication

class MedicationService:
    def __init__(self, db):
        self.repo = MedicationRepository(db)

    def get_all(self):
        return self.repo.get_all()

    def create(self, user_id: int, nome_remedio: str, dosagem: str, horario):
        if not nome_remedio.strip():
            raise ValueError("Nome do remédio não pode ser vazio")
        if not dosagem.strip():
            raise ValueError("Dosagem não pode ser vazia")
        med = Medication(user_id=user_id, nome_remedio=nome_remedio, dosagem=dosagem, horario=horario)
        return self.repo.add(med)

    def update(self, id: int, dados: dict):
        med = self.repo.get_by_id(id)
        if not med:
            raise ValueError("Medicamento não encontrado")
        return self.repo.update(id, dados)

    def delete(self, id: int):
        med = self.repo.get_by_id(id)
        if not med:
            raise ValueError("Medicamento não encontrado")
        self.repo.delete(id)