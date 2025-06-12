from pydantic import BaseModel
from datetime import datetime

class RetourCreate(BaseModel):
    reservation_id: str
    date_retour: datetime
