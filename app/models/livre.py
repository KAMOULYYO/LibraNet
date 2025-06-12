from pydantic import BaseModel
from typing import Optional


class LivreCreate(BaseModel):
    titre: str
    auteur: str
    description: str
    image_url: str
    purchase_price: float
    reservation_price: float
    stock: int

class LivreUpdate(BaseModel):
    titre: Optional[str]
    auteur: Optional[str]
    description: Optional[str]
    image_url: Optional[str]
    purchase_price: Optional[float]
    reservation_price: Optional[float]
    stock: Optional[int]

class LivreOut(BaseModel):
    id: str
    titre: str
    auteur: str
    description: str
    image_url: Optional[str]
    purchase_price: float
    reservation_price: float
    stock: int 

    class Config:
        orm_mode = True
