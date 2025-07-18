from datetime import datetime, timedelta
from typing import List, Optional
from models import Booking, GameType, GalleryImage, Settings, TimeSlot, AvailabilityResponse, PricingInfo, ContactInfo
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging

logger = logging.getLogger(__name__)

class BookingService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.bookings
    
    def calculate_total(self, duration: int, group_size: int) -> float:
        """Calculate total price based on duration and group size"""
        individual_rate = 120
        group_rate = 100
        group_min_size = 3
        
        if group_size >= group_min_size:
            return group_rate * duration * group_size
        else:
            return individual_rate * duration * group_size
    
    async def create_booking(self, booking_data: dict) -> Booking:
        """Create a new booking"""
        # Calculate total price
        total = self.calculate_total(booking_data['duration'], booking_data['group_size'])
        
        booking = Booking(
            **booking_data,
            total=total,
            status="confirmed"
        )
        
        booking_dict = booking.dict()
        await self.collection.insert_one(booking_dict)
        
        logger.info(f"Created booking for {booking.name} on {booking.date}")
        return booking
    
    async def get_all_bookings(self) -> List[Booking]:
        """Get all bookings"""
        cursor = self.collection.find()
        bookings = []
        async for booking_doc in cursor:
            bookings.append(Booking(**booking_doc))
        return bookings
    
    async def get_booking_by_id(self, booking_id: str) -> Optional[Booking]:
        """Get booking by ID"""
        booking_doc = await self.collection.find_one({"id": booking_id})
        if booking_doc:
            return Booking(**booking_doc)
        return None
    
    async def update_booking(self, booking_id: str, update_data: dict) -> Optional[Booking]:
        """Update booking"""
        update_data['updated_at'] = datetime.utcnow()
        result = await self.collection.update_one(
            {"id": booking_id},
            {"$set": update_data}
        )
        
        if result.modified_count > 0:
            return await self.get_booking_by_id(booking_id)
        return None
    
    async def delete_booking(self, booking_id: str) -> bool:
        """Delete booking"""
        result = await self.collection.delete_one({"id": booking_id})
        return result.deleted_count > 0
    
    async def get_bookings_by_date(self, date: datetime) -> List[Booking]:
        """Get bookings for a specific date"""
        start_date = datetime.combine(date.date(), datetime.min.time())
        end_date = start_date + timedelta(days=1)
        
        cursor = self.collection.find({
            "date": {
                "$gte": start_date,
                "$lt": end_date
            }
        })
        
        bookings = []
        async for booking_doc in cursor:
            bookings.append(Booking(**booking_doc))
        return bookings

class AvailabilityService:
    def __init__(self, booking_service: BookingService):
        self.booking_service = booking_service
        self.time_slots = [
            "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
            "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"
        ]
    
    async def get_availability_for_date(self, date: datetime) -> AvailabilityResponse:
        """Get available time slots for a specific date"""
        # Get existing bookings for the date
        bookings = await self.booking_service.get_bookings_by_date(date)
        
        # Get booked time slots
        booked_slots = [booking.time_slot for booking in bookings]
        
        # Create availability response
        time_slots = []
        for slot in self.time_slots:
            available = slot not in booked_slots
            time_slots.append(TimeSlot(time=slot, available=available))
        
        return AvailabilityResponse(
            date=date.strftime("%Y-%m-%d"),
            time_slots=time_slots
        )

class GameTypeService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.game_types
    
    async def get_all_game_types(self) -> List[GameType]:
        """Get all game types"""
        cursor = self.collection.find()
        game_types = []
        async for game_type_doc in cursor:
            game_types.append(GameType(**game_type_doc))
        return game_types
    
    async def seed_game_types(self):
        """Seed initial game types data"""
        game_types_data = [
            {
                "id": "ps5",
                "name": "PlayStation 5",
                "description": "Latest PlayStation 5 console with exclusive games and 4K gaming",
                "icon": "🎮",
                "available": True,
                "popular_games": [
                    "Spider-Man 2", "God of War Ragnarök", "Horizon Forbidden West", 
                    "The Last of Us Part I", "Demon's Souls", "Ratchet & Clank: Rift Apart",
                    "Gran Turismo 7", "Ghost of Tsushima Director's Cut", "Final Fantasy VII Rebirth"
                ]
            },
            {
                "id": "xbox",
                "name": "Xbox Series X",
                "description": "Xbox Series X with Game Pass library and 4K gaming",
                "icon": "🎮",
                "available": True,
                "popular_games": [
                    "Halo Infinite", "Forza Horizon 5", "Starfield", "Hi-Fi Rush",
                    "Gears 5", "Microsoft Flight Simulator", "Minecraft",
                    "Sea of Thieves", "Ori and the Will of the Wisps", "Cyberpunk 2077"
                ]
            },
            {
                "id": "switch",
                "name": "Nintendo Switch",
                "description": "Nintendo Switch with exclusive games and portable gaming",
                "icon": "🎮",
                "available": True,
                "popular_games": [
                    "The Legend of Zelda: Tears of the Kingdom", "Super Mario Bros. Wonder",
                    "Super Mario Odyssey", "Mario Kart 8 Deluxe", "Super Smash Bros. Ultimate",
                    "Animal Crossing: New Horizons", "Pokémon Scarlet/Violet", 
                    "Splatoon 3", "Metroid Dread", "Fire Emblem Engage"
                ]
            },
            {
                "id": "vr",
                "name": "VR Gaming",
                "description": "Immersive virtual reality gaming with latest VR headsets",
                "icon": "🥽",
                "available": True,
                "popular_games": [
                    "Beat Saber", "Half-Life: Alyx", "Superhot VR", "Resident Evil 4 VR",
                    "Pavlov VR", "The Walking Dead: Saints & Sinners", "Pistol Whip",
                    "Blade & Sorcery", "Boneworks", "Arizona Sunshine"
                ]
            },
            {
                "id": "board",
                "name": "Board Games",
                "description": "Classic and modern board games for all ages and groups",
                "icon": "🎲",
                "available": True,
                "popular_games": [
                    "Monopoly", "Scrabble", "Settlers of Catan", "Ticket to Ride",
                    "Azul", "Splendor", "7 Wonders", "Pandemic", "Codenames",
                    "King of Tokyo", "Dixit", "Sequence", "UNO", "Jenga", "Chess",
                    "Backgammon", "Ludo", "Snakes & Ladders", "Carrom"
                ]
            }
        ]
        
        # Clear existing data
        await self.collection.delete_many({})
        
        # Insert new data
        await self.collection.insert_many(game_types_data)
        logger.info("Game types seeded successfully")

class GalleryService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.gallery
    
    async def get_all_images(self) -> List[GalleryImage]:
        """Get all gallery images"""
        cursor = self.collection.find()
        images = []
        async for image_doc in cursor:
            images.append(GalleryImage(**image_doc))
        return images
    
    async def create_image(self, image_data: dict) -> GalleryImage:
        """Create a new gallery image"""
        image = GalleryImage(**image_data)
        image_dict = image.dict()
        await self.collection.insert_one(image_dict)
        return image
    
    async def seed_gallery_images(self):
        """Seed initial gallery images with real images"""
        gallery_data = [
            {
                "title": "Modern Gaming Setup",
                "category": "Setup",
                "description": "State-of-the-art gaming setup with RGB lighting and modern equipment",
                "image_data": "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cHxlbnwwfHx8fDE3NTI4Mjc5ODF8MA&ixlib=rb-4.1.0&q=85"
            },
            {
                "title": "Gaming Lounge Atmosphere",
                "category": "Lounge",
                "description": "Atmospheric gaming room with mood lighting and comfortable seating",
                "image_data": "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBzZXR1cHxlbnwwfHx8fDE3NTI4Mjc5ODF8MA&ixlib=rb-4.1.0&q=85"
            },
            {
                "title": "Professional Gaming Station",
                "category": "PlayStation",
                "description": "Professional dual-monitor gaming setup with premium accessories",
                "image_data": "https://images.unsplash.com/photo-1675049626914-b2e051e92f23?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxnYW1pbmclMjBzZXR1cHxlbnwwfHx8fDE3NTI4Mjc5ODF8MA&ixlib=rb-4.1.0&q=85"
            },
            {
                "title": "Social Gaming Area",
                "category": "Group",
                "description": "Gaming lounge where friends and families enjoy gaming together",
                "image_data": "https://images.unsplash.com/photo-1580617971627-cffa74e39d1d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsb3VuZ2V8ZW58MHx8fHwxNzUyODI3OTkwfDA&ixlib=rb-4.1.0&q=85"
            },
            {
                "title": "Arcade Gaming Zone",
                "category": "Arcade",
                "description": "Colorful arcade machines with LED lighting and retro gaming",
                "image_data": "https://images.unsplash.com/photo-1558324190-c940eb141401?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBsb3VuZ2V8ZW58MHx8fHwxNzUyODI3OTkwfDA&ixlib=rb-4.1.0&q=85"
            },
            {
                "title": "Esports Tournament Setup",
                "category": "Esports",
                "description": "Professional esports and competitive gaming environment",
                "image_data": "https://images.pexels.com/photos/7915214/pexels-photo-7915214.jpeg"
            },
            {
                "title": "VR Gaming Experience",
                "category": "VR",
                "description": "Immersive virtual reality gaming setup with latest VR technology",
                "image_data": "https://images.pexels.com/photos/7915449/pexels-photo-7915449.jpeg"
            },
            {
                "title": "Group Gaming Sessions",
                "category": "Events",
                "description": "Birthday parties and group gaming events in our spacious lounge",
                "image_data": "https://images.pexels.com/photos/7915255/pexels-photo-7915255.jpeg"
            }
        ]
        
        # Clear existing data
        await self.collection.delete_many({})
        
        # Insert new data
        await self.collection.insert_many(gallery_data)
        logger.info("Gallery images seeded successfully")

class SettingsService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.settings
    
    async def get_settings(self) -> Optional[Settings]:
        """Get application settings"""
        settings_doc = await self.collection.find_one({})
        if settings_doc:
            return Settings(**settings_doc)
        return None
    
    async def update_settings(self, settings_data: dict) -> Settings:
        """Update application settings"""
        settings_data['updated_at'] = datetime.utcnow()
        
        result = await self.collection.update_one(
            {},
            {"$set": settings_data},
            upsert=True
        )
        
        return await self.get_settings()
    
    async def seed_settings(self):
        """Seed initial settings data"""
        settings_data = {
            "pricing": {
                "individual": 120.0,
                "group": 100.0,
                "group_min_size": 3,
                "birthday_package": 2500.0,
                "birthday_duration": 4,
                "birthday_max_people": 8
            },
            "contact": {
                "address": "123 Gaming Street, Tech City, TC 12345",
                "phone": "+91 98765 43210",
                "email": "info@karthikeyagamesgalaxy.com",
                "hours": "10:00 AM - 10:00 PM",
                "social": {
                    "facebook": "#",
                    "twitter": "#",
                    "instagram": "#",
                    "youtube": "#"
                }
            }
        }
        
        # Clear existing data
        await self.collection.delete_many({})
        
        # Insert new data
        await self.collection.insert_one(settings_data)
        logger.info("Settings seeded successfully")