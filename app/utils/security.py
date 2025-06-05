from dotenv import load_dotenv
load_dotenv()
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os



SECRET = os.getenv("JWT_SECRET")
print("JWT_SECRET used in create_token:", SECRET)
if not SECRET:
    raise RuntimeError("JWT_SECRET environment variable is not set")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_token(user_data: dict, expires: timedelta = timedelta(hours=24)) -> str:
    payload = {
        "sub": user_data["email"],
        "role": user_data.get("role", "user"),
        "exp": datetime.utcnow() + expires,
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")

bearer_scheme = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token invalide")

async def get_current_admin_user(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return current_user
