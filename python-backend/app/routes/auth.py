from fastapi import APIRouter, HTTPException
from bson import ObjectId
from ..core.database import db
from ..core.security import hash_password, verify_password, create_access_token
from ..models.schemas import SignupRequest, LoginRequest, TokenResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup", response_model=TokenResponse)
async def signup(payload: SignupRequest):
    existing = await db.users.find_one({"email": payload.email.lower()})
    if existing:
        raise HTTPException(status_code=409, detail="An account with this email already exists")

    user_doc = {
        "name": payload.name,
        "email": payload.email.lower(),
        "password_hash": hash_password(payload.password),
        "role": payload.role,
        "provider": "local",
    }
    result = await db.users.insert_one(user_doc)
    token = create_access_token({"id": str(result.inserted_id), "email": user_doc["email"], "role": user_doc["role"]})
    return {"token": token, "user": {"id": str(result.inserted_id), "name": payload.name, "email": payload.email, "role": payload.role}}


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest):
    user = await db.users.find_one({"email": payload.email.lower()})
    # Real check: user must exist AND password must match the stored hash —
    # a random / made-up password will always be rejected here.
    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"id": str(user["_id"]), "email": user["email"], "role": user["role"]})
    return {
        "token": token,
        "user": {"id": str(user["_id"]), "name": user["name"], "email": user["email"], "role": user["role"]},
    }


# ============================================================
# GOOGLE / GITHUB OAUTH (Python side) — YAHAN KYA KARNA HAI:
# Firebase Authentication use karo (frontend scaffold already hai:
# src/services/firebaseClient.ts). Firebase se aaya verified ID token
# yahan verify karke apna JWT issue karo:
#
#   pip install firebase-admin
#
#   import firebase_admin
#   from firebase_admin import auth as firebase_auth, credentials
#   firebase_admin.initialize_app(credentials.Certificate("serviceAccountKey.json"))
#
#   @router.post("/oauth/firebase")
#   async def oauth_firebase(id_token: str):
#       decoded = firebase_auth.verify_id_token(id_token)
#       user = await db.users.find_one({"email": decoded["email"]})
#       if not user:
#           result = await db.users.insert_one({
#               "name": decoded.get("name", decoded["email"]),
#               "email": decoded["email"],
#               "provider": "google",  # or "github"
#               "role": "citizen",
#           })
#           user_id = str(result.inserted_id)
#       else:
#           user_id = str(user["_id"])
#       token = create_access_token({"id": user_id, "email": decoded["email"]})
#       return {"token": token}
# ============================================================
