# app/routes/purchases.py

from datetime import datetime
from fastapi import APIRouter, HTTPException, Query, Request
import stripe
from app.models.purchase import PurchaseIn, StripeSessionOut
from app.crud.purchase import create_stripe_checkout_session
from app.config import db

router = APIRouter(prefix="/purchases", tags=["Purchases"])

FRONTEND_URL = "http://localhost:5173"  # change if needed

@router.post("/buy", response_model=StripeSessionOut)
async def buy_book(data: PurchaseIn):
    checkout_url = await create_stripe_checkout_session(data, FRONTEND_URL)
    return {"checkout_url": checkout_url}


@router.get("/confirm")
async def confirm_purchase(session_id: str = Query(...)):
    try:
        session = stripe.checkout.Session.retrieve(session_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Stripe error: {str(e)}")

    if session.payment_status != "paid":
        raise HTTPException(status_code=400, detail="Payment not completed")

    # Optional: Check if already saved (avoid duplicates)
    existing = await db.purchases.find_one({"stripe_session_id": session.id})
    if existing:
        return {"message": "Purchase already recorded"}

    # You might need to pass user_id and book_id as metadata (best practice)
    user_id = session.metadata.get("user_id")
    book_id = session.metadata.get("book_id")
    price = session.amount_total / 100  # Stripe uses cents

    # Insert into MongoDB
    result = await db.purchases.insert_one({
        "user_id": user_id,
        "book_id": book_id,
        "price": price,
        "date_achat": datetime.utcnow(),
        "stripe_session_id": session.id,
        "status": "purchased"
    })

    return {"message": "Purchase confirmed", "purchase_id": str(result.inserted_id)}