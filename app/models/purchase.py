

from pydantic import BaseModel

class PurchaseIn(BaseModel):
    user_id: str
    book_id: str

class StripeSessionOut(BaseModel):
    checkout_url: str
