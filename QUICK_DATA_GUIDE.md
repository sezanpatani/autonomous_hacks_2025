# 🎯 QUICK START: Check & Change Data in Your App

## 📍 WHERE IS YOUR DATA NOW?

Your app currently uses **LOCAL DATA** from this file:
- **File**: `lib/cityData.ts` ✅ 
- **City**: Mumbai
- **ESG Score**: 72
- **AQI**: 156
- **Water Quality**: 76

---

## 🔍 HOW TO SEE CURRENT DATA (3 WAYS)

### Method 1: Browser Console (EASIEST)
1. Open http://localhost:3000
2. Press **F12** (or Right-click → Inspect)
3. Go to **Console** tab
4. Type these commands:

```javascript
// See city data
console.log(localStorage.getItem('cityData'))

// See ESG score
console.log('ESG Score:', 72)

// Check API status
fetch('http://localhost:3000/api/health')
  .then(r => r.json())
  .then(data => console.log('API Status:', data))
```

### Method 2: View Data Files Directly
Open these files in VS Code to see all data:

1. **`lib/cityData.ts`** ← Main data file (EDIT THIS!)
2. **`store/appStore.ts`** ← App settings
3. **`lib/aiEngine.ts`** ← AI calculations

### Method 3: Test API Endpoints
Open these URLs in your browser:

- http://localhost:3000/api/health (Check if backend works)
- http://localhost:3000/api/cities/Mumbai (Get city data)
- http://localhost:3000/api/cities/Mumbai/esg-score (Get ESG score)
- http://localhost:3000/api/cities/Mumbai/aqi (Get AQI data)

---

## ✏️ HOW TO CHANGE DATA (STEP-BY-STEP)

### Option 1: Edit Local Data (NO BACKEND NEEDED)

**Step 1:** Open `lib/cityData.ts`

**Step 2:** Find this section:
```typescript
export const CITY_DATA: CityData = {
  cityName: 'Mumbai',  // ← CHANGE THIS
  esgScore: 72,        // ← CHANGE THIS
  population: 20_000_000,  // ← CHANGE THIS
```

**Step 3:** Change any value you want:
```typescript
export const CITY_DATA: CityData = {
  cityName: 'Delhi',   // Changed!
  esgScore: 85,        // Changed!
  population: 25_000_000,  // Changed!
  
  environment: {
    airQuality: {
      aqi: 200,  // Changed from 156 to 200
      pm25: 120,  // Changed from 89 to 120
```

**Step 4:** Save the file (Ctrl+S)

**Step 5:** Your app automatically reloads with new data! 🎉

### Option 2: Switch to Delhi Data (INSTANT)

**Step 1:** Open `lib/cityData.ts`

**Step 2:** Find this function at the bottom:
```typescript
export const getCurrentCityData = (): CityData => {
  return CITY_DATA  // Currently Mumbai
}
```

**Step 3:** Change to:
```typescript
export const getCurrentCityData = (): CityData => {
  return DELHI_DATA  // Now Delhi!
}
```

**Step 4:** Save → App reloads with Delhi data!

### Option 3: Create Your Own City

**Step 1:** Open `lib/cityData.ts`

**Step 2:** Copy the `CITY_DATA` object and rename it:
```typescript
export const BANGALORE_DATA: CityData = {
  cityName: 'Bangalore',
  esgScore: 78,
  population: 12_000_000,
  area: 741,
  
  environment: {
    airQuality: {
      aqi: 95,  // Better air quality
      pm25: 52,
      zones: [
        { name: 'Whitefield', aqi: 102, status: 'Moderate' },
        { name: 'Koramangala', aqi: 88, status: 'Moderate' },
        // Add more zones
      ]
    },
    // ... copy and modify all other sections
  }
}
```

**Step 3:** Update the getter:
```typescript
export const getCurrentCityData = (): CityData => {
  return BANGALORE_DATA  // Your new city!
}
```

---

## 🔄 HOW TO USE BACKEND (CONNECT TO REAL DATA)

### ✅ Backend Already Created!
Your app has a built-in backend at:
- **API Routes**: `app/api/` folder
- **Already Working**: Yes! ✅

### Test Your Backend Now:
1. Open browser
2. Visit: http://localhost:3000/api/health
3. You should see: `{"status":"ok",...}`

### Available API Endpoints:
```
✅ GET  /api/health                    - Check if backend works
✅ GET  /api/cities/:cityName          - Get full city data
✅ GET  /api/cities/:cityName/esg-score - Get ESG score
✅ GET  /api/cities/:cityName/aqi      - Get real-time AQI
✅ PUT  /api/cities/:cityName/metrics  - Update a metric
✅ POST /api/complaints                - Submit complaint
✅ GET  /api/complaints                - Get all complaints
```

### How to Connect Your Component to Backend:

**Example**: Fetch real-time AQI

```typescript
'use client'

import { useEffect, useState } from 'react'
import { cityAPI } from '@/lib/api'

export default function AQIDisplay() {
  const [aqi, setAqi] = useState(0)

  useEffect(() => {
    // Fetch from backend
    const fetchAQI = async () => {
      try {
        const data = await cityAPI.getAQIData('Mumbai')
        setAqi(data.aqi)
      } catch (error) {
        console.error('Failed to fetch AQI:', error)
      }
    }
    
    fetchAQI()
    
    // Refresh every minute
    const interval = setInterval(fetchAQI, 60000)
    return () => clearInterval(interval)
  }, [])

  return <div>Current AQI: {aqi}</div>
}
```

---

## 🎮 PRACTICAL EXAMPLES

### Example 1: Change Mumbai's AQI to 200

**File**: `lib/cityData.ts`
```typescript
environment: {
  airQuality: {
    aqi: 200,  // Changed from 156
    pm25: 115,  // Updated accordingly
```

**Result**: All charts and displays show AQI 200!

### Example 2: Improve ESG Score to 85

**File**: `lib/cityData.ts`
```typescript
export const CITY_DATA: CityData = {
  cityName: 'Mumbai',
  esgScore: 85,  // Changed from 72
```

**Result**: ESG meter shows 85/100!

### Example 3: Add More Renewable Energy

**File**: `lib/cityData.ts`
```typescript
energy: {
  totalConsumption: 2340,
  renewable: 35,  // Changed from 18%
  solarCapacity: 850,  // Changed from 450 MW
  windCapacity: 220,  // Changed from 120 MW
}
```

**Result**: Energy charts show improved renewable %!

---

## 🌐 CONNECT TO EXTERNAL APIs

### Example: Real Government AQI API

**File**: `lib/api.ts`

Add this function:
```typescript
export const externalAPI = {
  // Get real AQI from government API
  async getRealAQI(city: string) {
    try {
      const response = await axios.get(
        `https://api.data.gov.in/resource/aqi?city=${city}&api-key=YOUR_KEY`
      )
      return response.data
    } catch (error) {
      console.error('Failed to fetch real AQI:', error)
      // Fallback to local data
      return { aqi: 156 }
    }
  }
}
```

### Example: Real Weather API

```typescript
export const weatherAPI = {
  async getWeather(city: string) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_KEY`
    )
    return response.data
  }
}
```

---

## 📊 DATA ACCURACY CHECKLIST

To ensure your data is accurate:

- [ ] **Check Source**: Is data from API or local file?
  - Open browser console
  - Look for "Data loaded from API" or "Using local data"

- [ ] **Verify Values**: Compare displayed data with source
  - Open `lib/cityData.ts`
  - Check values match what you see on screen

- [ ] **Test API**: Visit API endpoints
  - http://localhost:3000/api/health
  - Should return `{"status":"ok"}`

- [ ] **Check Updates**: Are values updating?
  - Change a value in `cityData.ts`
  - Save file
  - Check if UI updates (it should!)

- [ ] **Monitor Console**: Look for errors
  - Press F12
  - Check Console tab
  - Fix any red errors

---

## 🚀 WHERE TO EDIT WHAT

| What You Want to Change | File to Edit | Line Number |
|------------------------|--------------|-------------|
| **City Name** | `lib/cityData.ts` | Line 77 |
| **ESG Score** | `lib/cityData.ts` | Line 78 |
| **AQI Value** | `lib/cityData.ts` | Line 83 |
| **Renewable Energy %** | `lib/cityData.ts` | Line 97 |
| **Literacy Rate** | `lib/cityData.ts` | Line 120 |
| **Budget Amount** | `lib/cityData.ts` | Line 170 |
| **Switch City** | `lib/cityData.ts` | Line 296 |

---

## 💡 PRO TIPS

### Tip 1: See Live Changes
After editing `cityData.ts`, the app reloads automatically. If not:
- Save the file (Ctrl+S)
- Wait 2-3 seconds
- Refresh browser (F5)

### Tip 2: Check Data in Console
```javascript
// Open Console (F12) and type:
fetch('/api/cities/Mumbai')
  .then(r => r.json())
  .then(data => console.table(data))
```

### Tip 3: Test Different Values
Try extreme values to test your app:
```typescript
aqi: 500,  // Very bad air quality
esgScore: 95,  // Excellent ESG
renewable: 100,  // 100% renewable energy
```

### Tip 4: Use Real Data Sources
Connect to:
- Government Open Data Portal
- IoT Sensor Networks
- Weather APIs
- Social Media APIs

---

## 🎯 QUICK CHECKLIST

**To Change Data Right Now:**
1. [ ] Open `lib/cityData.ts`
2. [ ] Find the value you want to change
3. [ ] Edit the number/text
4. [ ] Save file (Ctrl+S)
5. [ ] Check browser - data updated! ✅

**To Use Backend:**
1. [ ] Test: Visit http://localhost:3000/api/health
2. [ ] See `{"status":"ok"}` ✅
3. [ ] Backend is working!

**To Verify Data Accuracy:**
1. [ ] Open browser console (F12)
2. [ ] Type: `fetch('/api/cities/Mumbai').then(r=>r.json()).then(console.log)`
3. [ ] Compare values with `lib/cityData.ts`
4. [ ] They should match! ✅

---

## 📚 FILES SUMMARY

| File | Purpose | Edit This? |
|------|---------|-----------|
| `lib/cityData.ts` | 📊 All city ESG data | ✅ YES - Edit values here! |
| `lib/api.ts` | 🌐 API functions | ✅ YES - Add new APIs |
| `app/api/cities/[cityName]/route.ts` | 🔌 Backend API endpoint | ✅ YES - Add database queries |
| `components/examples/DataSourceExample.tsx` | 📖 Example component | 📚 Reference only |
| `DATA_BACKEND_GUIDE.md` | 📚 Full documentation | 📖 Read for details |

---

## ✅ YOU'RE DONE!

Your data is now:
- ✅ Stored in `lib/cityData.ts`
- ✅ Served by backend API at `/api/cities/*`
- ✅ Easy to change (just edit the file!)
- ✅ Ready for production backend integration

**Next Steps:**
1. Try changing a value in `cityData.ts` right now!
2. Save and watch your app update automatically
3. Visit http://localhost:3000/api/health to test backend
4. Read `DATA_BACKEND_GUIDE.md` for advanced features

**Need Help?**
- All your data is in: `lib/cityData.ts`
- API documentation: `DATA_BACKEND_GUIDE.md`
- Example code: `components/examples/DataSourceExample.tsx`
