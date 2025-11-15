from pydantic import BaseModel, EmailStr
from typing import Optional, List
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
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            date: lambda v: v.isoformat()
        }

class TimeSlot(BaseModel):
    time: str
    available: bool
    booked: int = 0
    capacity: int = 1

class AvailabilityResponse(BaseModel):
    date: date
    time_slots: List[TimeSlot]

class GameType(BaseModel):
    id: str
    name: str
    icon: Optional[str] = None
    description: Optional[str] = None

class GalleryImage(BaseModel):
    id: str
    url: str
    caption: Optional[str] = None
    category: Optional[str] = None

class GalleryImageCreate(BaseModel):
    url: str
    caption: Optional[str] = None
    category: Optional[str] = None

class ContactInfo(BaseModel):
    phone: str
    email: str
    address: str
    hours: str

class PricingInfo(BaseModel):
    game_type: str
    rate_per_hour: float
    description: Optional[str] = None

class Settings(BaseModel):
    id: str
    site_name: str
    contact_info: ContactInfo
    pricing: List[PricingInfo]
    game_types: List[GameType]

