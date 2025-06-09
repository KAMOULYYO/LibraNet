from fastapi import APIRouter, HTTPException, Query
from app.models.reservation import ReservationCreate, ReservationDB
from app.crud.reservation import create_reservation, update_reservation_status
from app.config import STRIPE_SECRET_KEY
import stripe
from app.config import db

stripe.api_key = STRIPE_SECRET_KEY

router = APIRouter()

# STEP 1: Create Reservation + Stripe Checkout Session
@router.post("/reservations/create")
async def create_reservation_route(data: ReservationCreate):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'cad',
                    'product_data': {
                        'name': f'Reservation Livre {data.livre_id}',
                    },
                    'unit_amount': int(data.montant * 100),
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='http://localhost:3000/cancel',
        )
        
        # Save with status pending
        reservation = await create_reservation(data, session.id)

        # Return BOTH the reservation and the Stripe Checkout URL
        return {
            "reservation": reservation,
            "checkout_url": session.url  # THIS IS THE LINK TO OPEN IN BROWSER
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# STEP 2: Confirm payment after redirect (e.g., from /success frontend)
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
