# Resource capacity configuration
RESOURCE_CAPACITY = {
    "playstation": 7,
    "playstation_steering": 1,
    "meta_quest_vr": 2,
    "nintendo": 1,
    "xbox": 1,
    "board_games": 999  # Unlimited
}

# Pricing per hour per person (in rupees)
PRICING_PER_HOUR = {
    "playstation": 120,
    "playstation_steering": 130,
    "meta_quest_vr": 250,
    "nintendo": 120,
    "xbox": 120,
    "board_games": 50
}

# Time slot configuration
START_TIME = 10  # 10:00 AM
END_TIME = 21    # 9:00 PM
SLOT_INTERVAL = 30  # 30 minutes

# Game type display names
GAME_TYPE_NAMES = {
    "playstation": "PlayStation",
    "playstation_steering": "PS5 + Steering",
    "meta_quest_vr": "Meta Quest VR",
    "nintendo": "Nintendo Switch",
    "xbox": "Xbox",
    "board_games": "Board Games"
}
