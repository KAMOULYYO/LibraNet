from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

class ReservationCreate(BaseModel):
    user_id: str
    livre_id: str
    date_debut: date
    date_fin: date

class ReservationDB(ReservationCreate):
    id: str
    status: Optional[str]
    stripe_session_id: Optional[str]
