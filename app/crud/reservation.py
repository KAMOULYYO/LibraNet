from app.config import db
from app.models.reservation import ReservationCreate
from datetime import datetime

from bson import ObjectId

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
    reservation = {
        "user_id": data.user_id,
        "livre_id": data.livre_id,
        "date_debut": data.date_debut.isoformat(),
        "date_fin": data.date_fin.isoformat(),
        "montant": data.montant,
        "status": "pending",
        "stripe_session_id": stripe_session_id,
        "created_at": datetime.utcnow()
    }

    result = await db.reservations.insert_one(reservation)
    reservation["id"] = result.inserted_id  # keep ObjectId here for now

    # Deep convert ObjectIds to strings everywhere
    cleaned_reservation = convert_objectid_to_str(reservation)

    return cleaned_reservation


async def update_reservation_status(session_id: str, new_status: str):
    await db.reservations.update_one(
        {"stripe_session_id": session_id},
        {"$set": {"status": new_status}}
    )
