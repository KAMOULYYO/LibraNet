# app/crud/purchases.py

from app.config import db
from bson import ObjectId
from fastapi import HTTPException
import stripe
from app.config import db
from bson import ObjectId
from fastapi import HTTPException
import stripe

async def create_stripe_checkout_session(data, frontend_url: str):
    livre = await db.livres.find_one({"_id": ObjectId(data.book_id)})
    if not livre:
        raise HTTPException(status_code=404, detail="Book not found")

    price = livre.get("purchase_price")
    if price is None:
        raise HTTPException(status_code=400, detail="Book missing purchase_price")
    
    stock = livre.get("stock", 0)
    if stock <= 0:
        raise HTTPException(status_code=400, detail="Book is sold out or out of stock")
    
    update_result = await db.livres.update_one(
        {"_id": ObjectId(data.book_id), "stock": {"$gt": 0}},
        {"$inc": {"stock": -1}}
    )
    if update_result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to reserve: Book might be sold out")
    

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[{
            "price_data": {
                "currency": "usd",
                "product_data": {
                    "name": livre["titre"]
                },
                "unit_amount": int(price * 100)
            },
            "quantity": 1
        }],
        mode="payment",
        success_url=f"{frontend_url}/purchase-success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{frontend_url}/purchase-cancelled",
        metadata={
            "user_id": data.user_id,
            "book_id": data.book_id
        }
    )

    return session.url