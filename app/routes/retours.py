from fastapi import APIRouter
from app.models.retours import RetourCreate
from app.crud.retours import return_book

router = APIRouter()


@router.post("/retours/create")
async def create_retour(data: RetourCreate):
    return await return_book(data)