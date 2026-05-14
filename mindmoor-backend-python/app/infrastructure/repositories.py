from sqlalchemy.orm import Session
from app.domain.models import DiaryEntry, Medication, TherapySession, Milestone, User

class DiaryRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(DiaryEntry).all()

    def get_by_id(self, id: int):
        return self.db.query(DiaryEntry).filter(DiaryEntry.id == id).first()

    def add(self, entry: DiaryEntry):
        self.db.add(entry)
        self.db.commit()
        self.db.refresh(entry)
        return entry

    def delete(self, id: int):
        entry = self.db.query(DiaryEntry).filter(DiaryEntry.id == id).first()
        if entry:
            self.db.delete(entry)
            self.db.commit()

class MedicationRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Medication).all()

    def get_by_id(self, id: int):
        return self.db.query(Medication).filter(Medication.id == id).first()

    def add(self, medication: Medication):
        self.db.add(medication)
        self.db.commit()
        self.db.refresh(medication)
        return medication

    def delete(self, id: int):
        medication = self.db.query(Medication).filter(Medication.id == id).first()
        if medication:
            self.db.delete(medication)
            self.db.commit()

class TherapySessionRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(TherapySession).all()

    def get_by_id(self, id: int):
        return self.db.query(TherapySession).filter(TherapySession.id == id).first()

    def add(self, session: TherapySession):
        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)
        return session

    def delete(self, id: int):
        session = self.db.query(TherapySession).filter(TherapySession.id == id).first()
        if session:
            self.db.delete(session)
            self.db.commit()

class MilestoneRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Milestone).all()

    def get_by_id(self, id: int):
        return self.db.query(Milestone).filter(Milestone.id == id).first()

    def add(self, milestone: Milestone):
        self.db.add(milestone)
        self.db.commit()
        self.db.refresh(milestone)
        return milestone

    def delete(self, id: int):
        milestone = self.db.query(Milestone).filter(Milestone.id == id).first()
        if milestone:
            self.db.delete(milestone)
            self.db.commit()  