# app/stripe_client.py
import stripe
from app.config import STRIPE_SECRET_KEY

stripe.api_key = STRIPE_SECRET_KEY