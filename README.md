# Karthikeya Games Galaxy 🎮

A modern, full-stack gaming arcade booking application with interactive features and real-time availability.

## 🌟 Features

### User Features
- 🎲 **Interactive 3D Dice Cursor** - Follows mouse movement with smooth animations
- 🎮 **Real Game Images** - Actual game screenshots and artwork (Ghost of Yotei, GTA 5, Mario Kart, Spider-Man 2, etc.)
- 📅 **Online Booking System** - Book gaming sessions with real-time slot availability
- 📱 **Mobile Responsive** - Fully optimized for all devices with scrollable mobile menu
- 🎫 **Reference Numbers** - Auto-generated KGG-prefixed booking references
- ❌ **Booking Cancellation** - Cancel bookings within rules (1-hour before session)
- 📢 **Announcements** - Stay updated with latest news and offers

### Admin Features
- 🔐 **Admin Dashboard** - Password-protected admin panel
- 📊 **Booking Management** - View and manage all bookings
- 📥 **Export to Excel** - Download booking data
- ⚙️ **Settings Management** - Configure game types and pricing

## 🚀 Tech Stack

### Frontend
- **React 18.3** - Modern UI library
- **React Router 7.5** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Lucide Icons** - Beautiful icon set
- **Axios** - HTTP client
- **Date-fns** - Date manipulation

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **CORS** - Cross-origin resource sharing

### Deployment
- **Frontend:** Netlify
- **Backend:** E1 Platform
- **Database:** MongoDB Atlas

## 📦 Installation

### Prerequisites
- Node.js 20+
- Python 3.8+
- MongoDB
- Yarn 1.22+

### Local Development

#### 1. Clone the repository
```bash
git clone https://github.com/dhanush-repaka/Kgamesgalaxy.git
cd Kgamesgalaxy
```

#### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
echo "MONGO_URL=mongodb://localhost:27017" > .env

# Start backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

#### 3. Frontend Setup
```bash
cd frontend
yarn install

# Create .env file
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Start frontend
yarn start
```

Visit http://localhost:3000

## 🌐 Deployment

See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for comprehensive deployment guide.

### Quick Deploy to Netlify

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy on Netlify**
   - Connect GitHub repository
   - Build command: `chmod +x .netlify/build.sh && ./.netlify/build.sh && ./validate-build.sh`
   - Publish directory: `frontend/build`
   - Add environment variable: `REACT_APP_BACKEND_URL`

3. **Backend on E1**
   - Already deployed at: `https://e239b078-6e78-47a7-b7f1-cef6da6b3bb4.e1-us-east-1.amy.app`

## 🎨 UI Updates

### Recent Improvements
- ✅ Header shows "Karthikeya's Games Galaxy" (full brand name)
- ✅ Fixed header overlap with proper spacing
- ✅ 3D dice cursor (30x30px) on all pages
- ✅ Actual game-specific images replaced generic controllers
- ✅ "What's New at KGG" section with proper apostrophe
- ✅ Mobile menu now scrollable with all options accessible
- ✅ Timeslot dropdown working with proper z-index

## 🧪 Testing

### Backend Tests (100% Pass Rate)
```bash
python karthikeya_specific_test.py
```

**Tested APIs:**
- ✅ Availability API
- ✅ Bookings API (Create)
- ✅ Cancel Booking API
- ✅ Settings API
- ✅ Admin API

### Frontend Features Verified
- ✅ Homepage sections (Latest Games, Featured Games, Announcements)
- ✅ Booking flow (date selection, time slots, form submission)
- ✅ Mobile menu scroll functionality
- ✅ Dice cursor animation on all pages
- ✅ Responsive design (desktop, tablet, mobile)

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Admin Access

Access admin dashboard at `/admin`
- **Password:** `kgg2024admin`
- **Features:** View bookings, export data, manage settings

## 📂 Project Structure

```
Kgamesgalaxy/
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── HeroBot.jsx (3D Dice)
│   │   │   ├── LatestGames.js
│   │   │   ├── FeaturedGames.js
│   │   │   └── ...
│   │   ├── pages/         # Page components
│   │   │   ├── HomePage.js
│   │   │   ├── BookingPage.js
│   │   │   ├── AdminPage.js
│   │   │   └── CancelBookingPage.js
│   │   ├── services/      # API services
│   │   └── styles/        # CSS files
│   ├── public/
│   │   ├── kgg-logo.jpeg
│   │   ├── _redirects
│   │   └── .htaccess
│   └── package.json
│
├── backend/               # FastAPI application
│   ├── server.py         # Main FastAPI app
│   ├── requirements.txt  # Python dependencies
│   └── .env             # Environment variables
│
├── netlify.toml          # Netlify configuration
├── NETLIFY_DEPLOYMENT.md # Deployment guide
└── README.md            # This file
```

## 🎯 Key Components

### HeroBot (3D Dice Cursor)
- Location: `frontend/src/components/HeroBot.jsx`
- Size: 30x30px
- Features: Mouse following, rolling animation, 3D rotation

### Booking System
- Real-time slot checking
- Date picker with availability
- Form validation
- Reference number generation (KGG prefix)

### Mobile Menu
- Scrollable navigation (max-h: 70vh)
- All options accessible
- Smooth transitions

## 🐛 Known Issues

None! All reported issues have been resolved:
- ✅ Fixed header overlap
- ✅ Fixed timeslot dropdown not opening
- ✅ Fixed mobile menu scroll
- ✅ Updated to actual game images
- ✅ Improved dice cursor size

## 📝 Environment Variables

### Frontend (.env)
```
REACT_APP_BACKEND_URL=<your-backend-url>
```

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for Karthikeya Games Galaxy.

## 📞 Contact

- **Website:** Coming soon on Netlify
- **Instagram:** [@karthikeyasgamesgalaxy](https://www.instagram.com/karthikeyasgamesgalaxy/)
- **Email:** info@kgg.com

## 🙏 Acknowledgments

- Game images from Unsplash and GameSpot
- Icons by Lucide
- UI components by Radix UI
- Font: Inter and Orbitron from Google Fonts

---

**Built with ❤️ for Karthikeya Games Galaxy**

**Status:** Production Ready ✅
**Last Updated:** October 28, 2024
**Version:** 1.0.0

