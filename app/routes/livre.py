from uuid import uuid4
from fastapi import APIRouter, HTTPException, status, Depends, UploadFile, File, Form
from typing import List, Optional
import os

from app.models.livre import LivreCreate, LivreOut, LivreUpdate
from app.crud.livre import (
    create_livre as crud_create_livre,
    get_all_livres,
    get_livre_by_id,
    update_livre,
    delete_livre,
)
from app.utils.security import get_current_admin_user

UPLOAD_DIR = "images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/livres", tags=["Livres"])

@router.post("/create", response_model=LivreOut, dependencies=[Depends(get_current_admin_user)])
async def create_livre(
    titre: str = Form(...),
    auteur: str = Form(...),
    description: str = Form(...),
    purchase_price: float = Form(...),
    reservation_price: float = Form(...),
    image: UploadFile = File(...),
    stock:int= Form(...)
):
    filename = f"{uuid4().hex}{os.path.splitext(image.filename)[1]}"
    image_path = os.path.join(UPLOAD_DIR, filename)

    with open(image_path, "wb") as f:
        f.write(await image.read())

    livre_data = LivreCreate(
        titre=titre,
        auteur=auteur,
        description=description,
        image_url=f"/images/{filename}",
        purchase_price=purchase_price,
        reservation_price=reservation_price,
        stock=stock
    )

    return await crud_create_livre(livre_data)

@router.get("/get-all", response_model=List[LivreOut])
async def list_livres():
    return await get_all_livres()

@router.get("/get-by-id/{livre_id}", response_model=LivreOut)
async def get_livre(livre_id: str):
    livre = await get_livre_by_id(livre_id)
    if not livre:
        raise HTTPException(404, detail="Livre not found")
    return livre

@router.put("/edit/{livre_id}", response_model=LivreOut, dependencies=[Depends(get_current_admin_user)])
async def edit_livre(
    livre_id: str,
    titre: str = Form(...),
    auteur: str = Form(...),
    description: str = Form(...),
    purchase_price: float = Form(...),
    reservation_price: float = Form(...),
    image: Optional[UploadFile] = File(None)
):
    image_url = None
    if image:
        filename = f"{uuid4().hex}{os.path.splitext(image.filename)[1]}"
        image_path = os.path.join(UPLOAD_DIR, filename)
        with open(image_path, "wb") as f:
            f.write(await image.read())
        image_url = f"/images/{filename}"

    data = LivreUpdate(
        titre=titre,
        auteur=auteur,
        description=description,
        image_url=image_url,
        purchase_price=purchase_price,
        reservation_price=reservation_price
    )

    updated = await update_livre(livre_id, data)
    if not updated:
        raise HTTPException(404, detail="Livre not found or not updated")
    return updated

@router.delete("/delete/{livre_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin_user)])
async def remove_livre(livre_id: str):
    success = await delete_livre(livre_id)
    if not success:
        raise HTTPException(404, detail="Livre not found")
