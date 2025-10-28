from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime

class BookingCreate(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    game_type: str
    time_slot: str
    duration: int = 60  # Duration in minutes (30, 60, 90, 120)
    num_people: int = 1  # Number of people
    date: date
    special_requests: Optional[str] = None

class BookingUpdate(BaseModel):
    status: Optional[str] = None
    special_requests: Optional[str] = None

class Booking(BaseModel):
    id: str
    reference_number: str
    name: str
    phone: str
    email: Optional[str] = None
    game_type: str
    time_slot: str
    duration: int = 60
    num_people: int = 1
    price: float = 0.0
    date: date
    status: str = "pending"
    special_requests: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
