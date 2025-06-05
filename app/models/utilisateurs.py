from pydantic import BaseModel, EmailStr
from typing import Optional

class UtilisateurBase(BaseModel):
    nom: Optional[str]
    prenom: Optional[str]
    email: Optional[EmailStr]
    role: Optional[str] = "user"  # Default role is 'user'

class UtilisateurCreate(UtilisateurBase):
    mot_de_passe: str

class UtilisateurLogin(BaseModel):
    email: EmailStr
    password: str  # Notice lowercase 'password' here, matching your login model

class UtilisateurOut(UtilisateurBase):
    id: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
