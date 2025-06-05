from fastapi import APIRouter, HTTPException, status
from app.models.utilisateurs import UtilisateurCreate, UtilisateurLogin, TokenResponse
from app.config import db  # your async database client, e.g. MongoDB
from app.utils.security import hash_password, verify_password, create_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(utilisateur: UtilisateurCreate):
    existing_user = await db.users.find_one({"email": utilisateur.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already used")
    user_data = utilisateur.dict()
    user_data["mot_de_passe"] = hash_password(user_data["mot_de_passe"])
    if user_data.get("role") != "admin":
        user_data["role"] = "user"
    await db.users.insert_one(user_data)
    return {"message": "User created successfully"}

@router.post("/login", response_model=TokenResponse)
async def login(data: UtilisateurLogin):
    user_db = await db.users.find_one({"email": data.email})
    if not user_db or not verify_password(data.password, user_db["mot_de_passe"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(user_db)
    return {"access_token": token, "token_type": "bearer"}
