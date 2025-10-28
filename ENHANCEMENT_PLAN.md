# Booking System Enhancement Plan

## Overview
Upgrade from hourly booking system to duration-based booking with resource capacity management, 30-minute slots, pricing, and admin timeline view.

## Phase 1: Backend Updates

### 1.1 Database Schema Changes
**Update Booking Model** (`models.py`):
```python
class BookingCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    game_type: str
    time_slot: str  # Start time (e.g., "10:00 AM")
    duration: int  # Duration in minutes (30, 60, 90, 120)
    date: date
    num_people: int = 1  # Number of people
    special_requests: Optional[str] = None
    price: float  # Calculated price
```

### 1.2 Resource Capacity Configuration
**Add to Settings** (`services.py`):
```python
RESOURCE_CAPACITY = {
    "playstation": 7,
    "playstation_steering": 1,
    "meta_quest_vr": 2,
    "nintendo": 1,
    "xbox": 1,
    "board_games": 999  # Unlimited
}

PRICING_PER_HOUR = {
    "playstation": 120,
    "playstation_steering": 130,
    "meta_quest_vr": 250,
    "nintendo": 120,
    "xbox": 120,
    "board_games": 50
}
```

### 1.3 Time Slot Generation
**Update Availability Service**:
- Generate 30-minute intervals: 10:00 AM, 10:30 AM, 11:00 AM, etc.
- Check resource capacity for each slot
- Consider duration when checking availability
- Example: 1-hour booking at 10:00 AM needs 10:00 AM AND 10:30 AM available

### 1.4 New API Endpoints
```
POST /api/bookings/calculate-price
  - Input: game_type, duration, num_people
  - Output: {price: number, breakdown: {...}}

GET /api/availability/timeline/{date}
  - Return bookings for the day grouped by resource
  - Used for admin timeline view

GET /api/analytics/monthly/{year}/{month}
  - Return monthly statistics
  - Total bookings, revenue, breakdown by game type

POST /api/admin/bookings
  - Create booking from admin (optional customer details)
```

## Phase 2: Frontend - Booking Form

### 2.1 Duration Selection (Step 1)
Add duration dropdown BEFORE date selection:
```
Select Duration:
○ 30 minutes (₹60 - ₹125 per person)
○ 1 hour (₹120 - ₹250 per person)
○ 1 hour 30 minutes (₹180 - ₹375 per person)
○ 2 hours (₹240 - ₹500 per person)
```

### 2.2 Updated Flow
1. Select duration
2. Select game type
3. Select number of people
4. **Show estimated price**
5. Select date
6. Select time slot (only show slots where duration fits)
7. Enter customer details
8. Confirm booking

### 2.3 Time Slot Display
- Show 30-minute intervals
- Disable slots where resource capacity is full
- Show "X/7 available" for PS5
- Show "Booked" for single-capacity resources

### 2.4 Price Display
```
Booking Summary:
━━━━━━━━━━━━━━━━━━━━━━━
Game Type: PlayStation
Duration: 1 hour
Number of People: 2
Price per person: ₹120/hour
━━━━━━━━━━━━━━━━━━━━━━━
Subtotal: ₹240
Total: ₹240
```

## Phase 3: Admin Timeline View

### 3.1 Timeline Component
**Layout**: Similar to Google Calendar / Teams

```
          10:00  10:30  11:00  11:30  12:00  12:30 ...
PS5 (7)   [  ] [  ] [●●] [●●] [  ] [  ] ...
PS5+Str   [  ] [  ] [  ] [  ] [●●] [●●] ...
Meta VR   [  ] [●●] [●●] [  ] [  ] [  ] ...
Nintendo  [  ] [  ] [  ] [  ] [  ] [  ] ...
Xbox      [  ] [  ] [  ] [  ] [  ] [  ] ...
Board G   [  ] [  ] [  ] [  ] [  ] [  ] ...
```

### 3.2 Features
- Click empty slot → Create booking modal
- Click booking → View/Edit booking
- Color coding by status (pending, confirmed, completed)
- Show customer name on booking block
- Drag to resize (change duration)
- Show capacity indicator (e.g., "4/7" for PS5)

### 3.3 Manual Booking Form (Admin)
```
Resource: [PlayStation ▾]
Date: [2025-11-01]
Start Time: [10:00 AM ▾]
Duration: [1 hour ▾]

Customer Details (Optional):
Name: [          ]
Phone: [          ]
Email: [          ]
Number of People: [1]

[Create Booking]
```

## Phase 4: Admin Analytics Dashboard

### 4.1 Monthly Tracker Tab
```
┌─ Monthly Overview ─────────────────────┐
│ November 2025                          │
│                                        │
│ Total Bookings: 45                     │
│ Total Revenue: ₹15,300                 │
│ Average Booking Value: ₹340            │
└────────────────────────────────────────┘

┌─ Revenue by Game Type ─────────────────┐
│ PlayStation: ₹8,400 (35 bookings)      │
│ Meta Quest VR: ₹5,000 (10 bookings)    │
│ Board Games: ₹1,200 (12 bookings)      │
│ Nintendo: ₹500 (2 bookings)            │
│ Xbox: ₹200 (1 booking)                 │
└────────────────────────────────────────┘

┌─ Booking Trends ───────────────────────┐
│  [Chart showing bookings per day]      │
└────────────────────────────────────────┘
```

### 4.2 Export Options
- Export monthly report to Excel
- Include all bookings with pricing
- Summary statistics

## Phase 5: Price Calculation Logic

### Example Calculations:
**PlayStation - 1 hour - 2 people**
- Rate: ₹120/hour/person
- Calculation: 120 × 1 × 2 = ₹240

**Meta Quest VR - 1.5 hours - 1 person**
- Rate: ₹250/hour/person
- Calculation: 250 × 1.5 × 1 = ₹375

**Board Games - 30 minutes - 4 people**
- Rate: ₹50/hour/person
- Calculation: 50 × 0.5 × 4 = ₹100

## Implementation Order

### Priority 1 (Core Functionality):
1. ✅ Backend: Update booking model with duration & pricing
2. ✅ Backend: Add 30-minute time slot generation
3. ✅ Backend: Implement resource capacity checking
4. ✅ Backend: Add price calculation endpoint
5. ✅ Frontend: Add duration selection to booking form
6. ✅ Frontend: Update time slot display
7. ✅ Frontend: Add price calculation & display

### Priority 2 (Admin Features):
8. ✅ Backend: Add timeline API endpoint
9. ✅ Frontend: Create admin timeline component
10. ✅ Frontend: Add manual booking from timeline
11. ✅ Backend: Add monthly analytics endpoint
12. ✅ Frontend: Create analytics dashboard

### Priority 3 (Polish):
13. ✅ Add loading states
14. ✅ Add error handling
15. ✅ Add validation
16. ✅ Add confirmation dialogs
17. ✅ Test all edge cases

## Testing Checklist

### Booking Flow:
- [ ] Can select duration
- [ ] Price updates correctly
- [ ] Time slots show availability
- [ ] Cannot book when capacity full
- [ ] Board games always available
- [ ] Booking confirmation shows correct price

### Admin Timeline:
- [ ] Shows all resources
- [ ] Displays bookings correctly
- [ ] Can create manual booking
- [ ] Shows capacity indicators
- [ ] Updates in real-time

### Analytics:
- [ ] Monthly stats calculate correctly
- [ ] Revenue breakdown accurate
- [ ] Export works

## Database Migration
Since we're adding new fields, existing bookings need defaults:
- duration: 60 (assume 1 hour)
- num_people: 1
- price: calculated based on game_type

---

**Estimated Implementation Time**: 4-6 hours
**Files to Modify**: ~15 files
**New Files to Create**: ~5 files
