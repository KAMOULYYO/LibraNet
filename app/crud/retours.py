from app.config import db
from bson import ObjectId
from datetime import datetime
from fastapi import HTTPException

async def return_book(data):
    reservation = await db.reservations.find_one({"_id": ObjectId(data.reservation_id)})

    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")

    if reservation["status"] != "success":
        raise HTTPException(status_code=400, detail="Book not currently borrowed")

    date_retour = data.date_retour.replace(tzinfo=None)
    date_fin = datetime.fromisoformat(reservation["date_fin"])  

    fine = 0
    if date_retour > date_fin:
        days_late = (date_retour - date_fin).days
        fine = days_late * 2  # $2 per day late, you can tweak this

    # Update reservation status and return date
    await db.reservations.update_one(
        {"_id": ObjectId(data.reservation_id)},
        {"$set": {
            "status": "returned",
            "date_retour": date_retour,
            "fine": fine
        }}
    )

    # Increase stock by 1 for the returned book
    await db.livres.update_one(
        {"_id": ObjectId(reservation["livre_id"])},
        {"$inc": {"stock": 1}}
    )

    return {"message": "Book returned", "fine": fine}
