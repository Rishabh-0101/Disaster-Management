from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "citizen"  # citizen | university | industry | government


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    token: str
    user: dict


class ProblemCreate(BaseModel):
    title: str
    description: str
    category: str
    state: str
    district: str
    city: Optional[str] = None
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    affected_count: int = 0
    reporter_name: Optional[str] = None
    reporter_contact: Optional[str] = None


class ProblemOut(ProblemCreate):
    id: str
    tracking_id: str
    status: str
    priority: str
    created_at: datetime
