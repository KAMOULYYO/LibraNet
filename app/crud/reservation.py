from app.config import db
from app.models.reservation import ReservationCreate
from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException

def convert_objectid_to_str(obj):
    if isinstance(obj, list):
        return [convert_objectid_to_str(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: convert_objectid_to_str(v) for k, v in obj.items()}
    elif isinstance(obj, ObjectId):
        return str(obj)
    else:
        return obj

async def create_reservation(data: ReservationCreate, stripe_session_id: str):
    livre = await db.livres.find_one({"_id": ObjectId(data.livre_id)})
    if not livre:
        raise HTTPException(status_code=404, detail="Livre not found")

    montant = livre.get("reservation_price")
    if montant is None:
        raise HTTPException(status_code=400, detail="Book missing reservation_price")

    stock = livre.get("stock", 0)
    if stock <= 0:
        raise HTTPException(status_code=400, detail="Book is sold out or out of stock")
    
    update_result = await db.livres.update_one(
        {"_id": ObjectId(data.livre_id), "stock": {"$gt": 0}},
        {"$inc": {"stock": -1}}
    )
    if update_result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to reserve: Book might be sold out")

    reservation = {
        "user_id": data.user_id,
        "livre_id": data.livre_id,
        "date_debut": data.date_debut.isoformat(),
        "date_fin": data.date_fin.isoformat(),
        "montant": montant,
        "status": "pending",
        "stripe_session_id": stripe_session_id,
        "created_at": datetime.utcnow()
    }

    result = await db.reservations.insert_one(reservation)
    reservation["_id"] = result.inserted_id

    return convert_objectid_to_str(reservation)

async def update_reservation_status(session_id: str, new_status: str):
    await db.reservations.update_one(
        {"stripe_session_id": session_id},
        {"$set": {"status": new_status}}
    )


async def update_reservation_status(session_id: str, new_status: str):
    result = await db.reservations.update_one(
        {"stripe_session_id": session_id},
        {"$set": {"status": new_status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Reservation with this session_id not found")
