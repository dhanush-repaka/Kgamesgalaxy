# 🔐 Admin Panel Access Guide - Karthikeya Games Galaxy

## How to Access Admin Panel

### Step 1: Navigate to Admin Page
Open your browser and go to:
```
http://localhost:3000/admin
```
(Or once deployed on Netlify: `https://your-site-name.netlify.app/admin`)

### Step 2: Login
You'll see a login screen with a password field.

**Admin Password:** `kgg2024admin`

Enter the password and click **"Login"** or press Enter.

### Step 3: View Bookings Dashboard
Once logged in, you'll see:
- **Total number of bookings** at the top
- **Complete list of all bookings** in a table

---

## 📊 Admin Dashboard Features

### Booking Information Displayed
Each booking shows:
- **Reference Number** (e.g., KGGABC123)
- **Customer Name**
- **Phone Number**
- **Email** (if provided)
- **Date** of booking
- **Time Slot** booked
- **Game Type** (PlayStation, Xbox, VR, etc.)
- **Status** (Confirmed, Cancelled, Completed)
- **Booking Created Date/Time**

### Available Actions

#### 1. **View Bookings**
- All bookings are displayed in a table
- Most recent bookings appear first
- Scroll down to see older bookings

#### 2. **Export Bookings to Excel**
- Click the **"Export to Excel"** button at the top
- Downloads an Excel file with all booking data
- File name format: `bookings_YYYY-MM-DD.xlsx`
- Great for record-keeping and analysis

#### 3. **Search/Filter** (if implemented)
- Use filters to find specific bookings
- Search by reference number, name, or date

#### 4. **Logout**
- Click **"Logout"** button in the top-right corner
- Returns you to the login screen
- Session expires automatically after some time

---

## 📱 Checking Bookings - Step by Step

### Method 1: Check Recent Bookings
1. Go to `/admin`
2. Enter password: `kgg2024admin`
3. View the list - newest bookings appear at the top
4. Look for today's date or specific time slots

### Method 2: Export and Review in Excel
1. Login to admin panel
2. Click **"Export to Excel"** button
3. Open the downloaded file
4. Sort/filter data in Excel as needed
5. Perfect for weekly/monthly reviews

### Method 3: Search for Specific Booking
If you have a reference number:
1. Login to admin panel
2. Use browser search (Ctrl+F / Cmd+F)
3. Type the reference number
4. It will highlight the matching booking

---

## 🔍 What to Look For

### When a New Booking Comes In:
✅ **Reference Number** - Give this to the customer
✅ **Date & Time** - When they're coming
✅ **Game Type** - What they want to play
✅ **Phone Number** - Contact them if needed
✅ **Status** - Should say "Confirmed"

### Before Customer Arrives:
- Check time slot is correct
- Prepare the gaming station/equipment
- Note any special requests

### After Session:
- You can manually mark as "Completed" (if feature is added)
- Keep record for future reference

---

## 🎯 Quick Access Guide

### Daily Routine:
**Morning:**
1. Login to admin panel
2. Check today's bookings
3. Prepare gaming stations accordingly

**Throughout Day:**
1. Keep admin panel open in a browser tab
2. Refresh page to see new bookings
3. Check reference numbers against walk-ins

**Evening:**
1. Review all completed sessions
2. Export data for records
3. Plan for next day

---

## 💡 Pro Tips

### Tip 1: Keep Admin Tab Open
- Keep the admin panel open in a browser tab
- Refresh (F5) periodically to see new bookings
- No need to login repeatedly during the day

### Tip 2: Use Multiple Devices
- Access admin panel from phone, tablet, or computer
- Same password works on all devices
- Perfect for checking bookings on the go

### Tip 3: Bookmark the Admin URL
- Save `/admin` page as a bookmark
- Quick access whenever you need it
- Add to home screen on mobile for app-like experience

### Tip 4: Export Data Regularly
- Export bookings weekly for backup
- Keep records organized by date
- Useful for business analysis and tax records

### Tip 5: Print Today's Schedule
- Export to Excel
- Filter for today's date
- Print for front desk reference

---

## 📞 Customer Reference Number Lookup

When a customer calls or arrives:
1. Ask for their **reference number** (starts with "KGG")
2. Login to admin panel
3. Use Ctrl+F to search for the reference number
4. Verify their details (name, time, game type)
5. Confirm their booking

---

## 🚨 Troubleshooting

### Can't Login?
- **Check password:** `kgg2024admin` (all lowercase, no spaces)
- **Clear browser cache** and try again
- **Try incognito/private mode**

### No Bookings Showing?
- **Check internet connection**
- **Refresh the page** (F5)
- **Check if backend is running**
- **Verify database connection**

### Export Not Working?
- **Allow pop-ups** in browser settings
- **Check download folder** - file might be there
- **Try different browser** (Chrome recommended)

### Logged Out Automatically?
- **Session expired** - just login again
- **Password:** `kgg2024admin`
- Sessions last for your browser session

---

## 🔒 Security Notes

### Password Security:
- Current password: `kgg2024admin`
- Change password after deployment (recommended)
- Don't share password with staff unless necessary

### Access Control:
- Only give admin access to trusted staff
- Consider creating separate accounts later
- Monitor who accesses the admin panel

### Data Privacy:
- Customer phone numbers and emails are private
- Don't share booking data publicly
- Keep Excel exports secure

---

## 📈 Future Enhancements (Not Yet Implemented)

These features can be added later:
- ⏰ **WhatsApp/Email notifications** when booking is made
- 🔔 **Real-time booking alerts** without refresh
- 📊 **Analytics dashboard** with charts and graphs
- 🎫 **Booking management** (edit, mark as completed)
- 👥 **Multiple admin accounts** with different roles
- 🔍 **Advanced search and filters**
- 📅 **Calendar view** of bookings

---

## Quick Reference Card

**Admin URL:** `http://localhost:3000/admin` (or your Netlify URL + `/admin`)
**Password:** `kgg2024admin`
**Export:** Click "Export to Excel" button
**Logout:** Click "Logout" in top-right corner
**Search:** Use Ctrl+F (or Cmd+F on Mac)

---

**Last Updated:** October 28, 2024
**For Support:** Check main README.md or contact development team
