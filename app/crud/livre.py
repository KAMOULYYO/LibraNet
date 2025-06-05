from app.config import db
from app.models.livre import LivreCreate, LivreUpdate
from bson import ObjectId

def livre_entity(livre) -> dict:
    return {
        "id": str(livre["_id"]),
        "titre": livre["titre"],
        "auteur": livre["auteur"],
        "description": livre.get("description"),
        "image_url": livre.get("image_url")
    }

async def create_livre(data: LivreCreate) -> dict:
    livre = data.dict()
    result = await db.livres.insert_one(livre)
    created = await db.livres.find_one({"_id": result.inserted_id})
    return livre_entity(created)

async def get_all_livres():
    livres = await db.livres.find().to_list(length=100)
    return [livre_entity(l) for l in livres]

async def get_livre_by_id(livre_id: str):
    livre = await db.livres.find_one({"_id": ObjectId(livre_id)})
    if not livre:
        return None
    return livre_entity(livre)

async def update_livre(livre_id: str, data: LivreUpdate):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    result = await db.livres.update_one({"_id": ObjectId(livre_id)}, {"$set": update_data})
    if result.modified_count:
        return await get_livre_by_id(livre_id)
    return None

async def delete_livre(livre_id: str):
    result = await db.livres.delete_one({"_id": ObjectId(livre_id)})
    return result.deleted_count == 1
