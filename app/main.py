from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from app.routes import auth,utilisateurs,livre,reservation  # import your auth router
from app.utils.security import bearer_scheme

app = FastAPI(title="LibraNet API")
from fastapi.staticfiles import StaticFiles

app.mount("/images", StaticFiles(directory="images"), name="images")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(utilisateurs.router)
app.include_router(livre.router)
app.include_router(reservation.router)


# Override OpenAPI to set BearerAuth globally
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="LibraNet API",
        version="1.0.0",
        description="API with JWT Bearer Auth",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

@app.get("/")
async def root():
    return {"message": "Welcome to LibraNet API! 🚀"}

