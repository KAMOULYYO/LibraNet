from typing import Optional, List
from bson import ObjectId
from fastapi import HTTPException
from app.config import db
from app.models.utilisateurs import UtilisateurCreate, UtilisateurOut, UtilisateurBase
from app.utils.security import hash_password

async def create_utilisateur(data: UtilisateurCreate) -> str:
    existing = await db["utilisateurs"].find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    utilisateur_dict = data.dict()
    utilisateur_dict["mot_de_passe"] = hash_password(utilisateur_dict["mot_de_passe"])
    result = await db["utilisateurs"].insert_one(utilisateur_dict)
    return str(result.inserted_id)

async def get_utilisateur_by_id(user_id: str) -> Optional[UtilisateurOut]:
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID")
    
    utilisateur = await db["utilisateurs"].find_one({"_id": ObjectId(user_id)})
    if utilisateur:
        utilisateur["id"] = str(utilisateur["_id"])
        utilisateur.pop("mot_de_passe", None)

        # Fallback to "user" role if not set
        if "role" not in utilisateur:
            utilisateur["role"] = "user"

        return UtilisateurOut(**utilisateur)
    else:
        raise HTTPException(status_code=404, detail="User not found")

async def get_utilisateurs() -> List[UtilisateurOut]:
    utilisateurs = []
    cursor = db["utilisateurs"].find()
    async for doc in cursor:
        utilisateur_out = {
            "id": str(doc["_id"]),
            "nom": doc["nom"],
            "prenom": doc["prenom"],
            "email": doc["email"],
            "role": doc["role"],
        }
        utilisateurs.append(UtilisateurOut(**utilisateur_out))
    return utilisateurs

async def update_utilisateur(user_id: str, data: UtilisateurBase) -> UtilisateurOut:
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID")
    
    update_data = data.dict(exclude_unset=True)
    result = await db["utilisateurs"].update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
    if result.modified_count == 1:
        utilisateur = await db["utilisateurs"].find_one({"_id": ObjectId(user_id)})
        utilisateur_out = {
            "id": str(utilisateur["_id"]),
            "nom": utilisateur["nom"],
            "prenom": utilisateur["prenom"],
            "email": utilisateur["email"],
            "role": utilisateur["role"],
        }
        return UtilisateurOut(**utilisateur_out)
    else:
        raise HTTPException(status_code=404, detail="User not found or no changes applied")

async def delete_utilisateur(user_id: str) -> dict:
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID")
    
    result = await db["utilisateurs"].delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 1:
        return {"detail": "User deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")

async def get_utilisateur_by_email(email: str) -> Optional[dict]:
    user = await db["utilisateurs"].find_one({"email": email})
    return user
