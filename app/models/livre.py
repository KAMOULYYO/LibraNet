from pydantic import BaseModel
from typing import Optional

class LivreCreate(BaseModel):
    titre: str
    auteur: str
    description: str
    image_url: str  


class LivreUpdate(BaseModel):
    titre: Optional[str]
    auteur: Optional[str]
    description: Optional[str]
    image_url: Optional[str]

class LivreOut(BaseModel):
    id: str
    titre: str
    auteur: str
    description: str
    image_url: Optional[str] 

    class Config:
        orm_mode = True
