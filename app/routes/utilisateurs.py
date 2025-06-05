from fastapi import APIRouter, HTTPException, status
from typing import List
from app.models.utilisateurs import UtilisateurCreate, UtilisateurOut, UtilisateurBase
from app.crud.utilisateurs import (
    create_utilisateur, get_utilisateur_by_id,
    get_utilisateurs, update_utilisateur, delete_utilisateur
)
from app.utils.security import get_current_admin_user
from fastapi import Depends

router = APIRouter(prefix="/utilisateurs", tags=["Utilisateurs"])

@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=dict, dependencies=[Depends(get_current_admin_user)])
async def create_user(utilisateur: UtilisateurCreate):
    user_id = await create_utilisateur(utilisateur)
    return {"id": user_id}

@router.get("/get-all", response_model=List[UtilisateurOut] , dependencies=[Depends(get_current_admin_user)])
async def list_users():
    return await get_utilisateurs()

@router.get("/get-by-id/{user_id}", response_model=UtilisateurOut , dependencies=[Depends(get_current_admin_user)])
async def read_user(user_id: str):
    return await get_utilisateur_by_id(user_id)

@router.put("/edit/{user_id}", response_model=UtilisateurOut , dependencies=[Depends(get_current_admin_user)])
async def update_user(user_id: str, utilisateur: UtilisateurBase):
    return await update_utilisateur(user_id, utilisateur)

@router.delete("/delete/{user_id}", status_code=status.HTTP_204_NO_CONTENT , dependencies=[Depends(get_current_admin_user)])
async def delete_user(user_id: str):
    await delete_utilisateur(user_id)
    return