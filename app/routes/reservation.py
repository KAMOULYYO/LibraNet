from bson import ObjectId
from fastapi import APIRouter, HTTPException, Query
from app.models.reservation import ReservationCreate, ReservationDB
from app.crud.reservation import convert_objectid_to_str, create_reservation, update_reservation_status
from app.config import STRIPE_SECRET_KEY
import stripe
from app.config import db

stripe.api_key = STRIPE_SECRET_KEY

router = APIRouter()

@router.post("/reservations/create")
async def create_reservation_route(data: ReservationCreate):
    try:
        # 🔥 Get the book to fetch the price
        livre = await db.livres.find_one({"_id": ObjectId(data.livre_id)})
        if not livre:
            raise HTTPException(status_code=404, detail="Livre not found")
        

        montant = livre.get("reservation_price")
        if montant is None:
            raise HTTPException(status_code=400, detail="Book missing reservation_price")

        # 🧾 Create Stripe Checkout Session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'cad',
                    'product_data': {
                        'name': f'Reservation Livre {data.livre_id}',
                    },
                    'unit_amount': int(montant * 100),
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='http://localhost:5173/cancel',
        )

        # 💾 Create reservation with pending status
        reservation = await create_reservation(data, session.id)

        return convert_objectid_to_str({
            "reservation": reservation,
            "checkout_url": session.url
        })

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/reservations/confirm")
async def confirm_reservation(session_id: str):
    try:
        session = stripe.checkout.Session.retrieve(session_id)

        if session.payment_status == "paid":
            result = await db.reservations.update_one(
                {"stripe_session_id": session_id},
                {"$set": {"status": "success"}}
            )
            if result.modified_count == 1:
                return {"message": "Reservation confirmed ✅"}
            else:
                raise HTTPException(status_code=404, detail="Reservation not found")
        else:
            raise HTTPException(status_code=400, detail="Payment not completed")

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))