# 📊 DATA MANAGEMENT & BACKEND INTEGRATION GUIDE

## 🔍 HOW TO CHECK CURRENT DATA IN YOUR APP

### Method 1: View Data in Browser
1. Open http://localhost:3000
2. Open **Developer Tools** (Press `F12` or `Ctrl+Shift+I`)
3. Go to **Console** tab
4. Type: `localStorage` to see stored data
5. Or use **React DevTools** to inspect component state

### Method 2: Check Data Files
Your app's data is currently stored in these files:

1. **City Configuration**: `lib/cityData.ts` ✅ (Just created!)
   - Contains all city ESG data
   - Easy to modify without coding

2. **App State**: `store/appStore.ts`
   - City name, ESG score, current module
   - User role and settings

3. **AI Engine**: `lib/aiEngine.ts`
   - AI predictions and calculations
   - Algorithm parameters

---

## ✏️ HOW TO CHANGE DATA

### Option 1: Edit City Data File (EASIEST)

**File**: `lib/cityData.ts`

```typescript
// Find this section and change the values:
export const CITY_DATA: CityData = {
  cityName: 'Mumbai',  // Change to your city
  esgScore: 72,        // Change ESG score
  population: 20_000_000,  // Change population
  
  environment: {
    airQuality: {
      aqi: 156,  // Change AQI (0-500)
      pm25: 89,  // Change PM2.5 level
      zones: [
        { name: 'South Mumbai', aqi: 142, status: 'Unhealthy' },
        // Add more zones or modify existing ones
      ]
    },
    energy: {
      totalConsumption: 2340,  // Change energy consumption
      renewable: 18,           // Change renewable %
      // ... more fields
    }
  }
}
```

**Save the file** → Your app will **auto-reload** with new data!

### Option 2: Switch Between Cities

In `lib/cityData.ts`, change the return value:

```typescript
export const getCurrentCityData = (): CityData => {
  // Change from CITY_DATA to DELHI_DATA
  return DELHI_DATA  // Switch city!
}
```

### Option 3: Create Your Own City

Add a new city configuration in `lib/cityData.ts`:

```typescript
export const YOUR_CITY_DATA: CityData = {
  cityName: 'Bangalore',
  esgScore: 75,
  population: 12_000_000,
  area: 741,
  environment: {
    // ... your city's data
  },
  social: {
    // ... your city's data
  },
  governance: {
    // ... your city's data
  },
  budget: {
    total: 400,
    // ...
  }
}
```

Then update the getter:
```typescript
export const getCurrentCityData = (): CityData => {
  return YOUR_CITY_DATA
}
```

---

## 🔄 HOW TO USE BACKEND (API INTEGRATION)

### Step 1: Create API Service

Create file: `lib/api.ts`

```typescript
import axios from 'axios'
import { CityData } from './cityData'

// Your backend API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const cityAPI = {
  // Get city data from backend
  async getCityData(cityName: string): Promise<CityData> {
    const response = await axios.get(`${API_BASE_URL}/cities/${cityName}`)
    return response.data
  },

  // Get real-time ESG score
  async getESGScore(cityName: string): Promise<number> {
    const response = await axios.get(`${API_BASE_URL}/cities/${cityName}/esg-score`)
    return response.data.score
  },

  // Get real-time AQI data
  async getAQIData(cityName: string) {
    const response = await axios.get(`${API_BASE_URL}/cities/${cityName}/aqi`)
    return response.data
  },

  // Post citizen complaint
  async postComplaint(complaint: {
    category: string
    description: string
    location: string
    image?: File
  }) {
    const formData = new FormData()
    formData.append('category', complaint.category)
    formData.append('description', complaint.description)
    formData.append('location', complaint.location)
    if (complaint.image) {
      formData.append('image', complaint.image)
    }

    const response = await axios.post(`${API_BASE_URL}/complaints`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  // Get AI predictions
  async getAIPredictions(cityName: string, months: number) {
    const response = await axios.get(`${API_BASE_URL}/ai/predictions`, {
      params: { cityName, months }
    })
    return response.data
  },

  // Update ESG metrics
  async updateMetric(metricId: string, value: number) {
    const response = await axios.put(`${API_BASE_URL}/metrics/${metricId}`, { value })
    return response.data
  }
}
```

### Step 2: Use API in Components

Example: Fetch real data in `components/Dashboard.tsx`

```typescript
'use client'

import { useEffect, useState } from 'react'
import { cityAPI } from '@/lib/api'
import { CityData } from '@/lib/cityData'

export default function Dashboard() {
  const [cityData, setCityData] = useState<CityData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const data = await cityAPI.getCityData('Mumbai')
        setCityData(data)
      } catch (error) {
        console.error('Failed to fetch city data:', error)
        // Fallback to local data
        setCityData(getCurrentCityData())
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      {/* Use cityData instead of hardcoded values */}
      <h1>{cityData?.cityName}</h1>
      <p>ESG Score: {cityData?.esgScore}</p>
    </div>
  )
}
```

### Step 3: Environment Variables

Create file: `.env.local`

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Or production URL
# NEXT_PUBLIC_API_URL=https://your-api.com/api

# API Keys (if needed)
NEXT_PUBLIC_API_KEY=your_api_key_here

# Database (if using)
DATABASE_URL=postgresql://user:password@localhost:5432/esg_db
```

---

## 🚀 BACKEND OPTIONS

### Option A: Node.js + Express Backend

Create `backend/server.js`:

```javascript
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Mock database
let cityData = {
  Mumbai: {
    cityName: 'Mumbai',
    esgScore: 72,
    population: 20000000,
    // ... more data
  }
}

// Get city data
app.get('/api/cities/:cityName', (req, res) => {
  const { cityName } = req.params
  const data = cityData[cityName]
  
  if (!data) {
    return res.status(404).json({ error: 'City not found' })
  }
  
  res.json(data)
})

// Get ESG score
app.get('/api/cities/:cityName/esg-score', (req, res) => {
  const { cityName } = req.params
  const data = cityData[cityName]
  
  res.json({ score: data?.esgScore || 0 })
})

// Post complaint
app.post('/api/complaints', (req, res) => {
  const complaint = req.body
  console.log('New complaint:', complaint)
  
  // Save to database here
  
  res.json({ success: true, id: Date.now() })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
```

**Run backend:**
```bash
cd backend
npm init -y
npm install express cors
node server.js
```

### Option B: Next.js API Routes (Built-in Backend)

Create `app/api/cities/[cityName]/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { getCurrentCityData } from '@/lib/cityData'

export async function GET(
  request: Request,
  { params }: { params: { cityName: string } }
) {
  const cityData = getCurrentCityData()
  
  // You can fetch from database here
  // const data = await db.city.findUnique({ where: { name: params.cityName } })
  
  return NextResponse.json(cityData)
}
```

Create `app/api/complaints/route.ts`:

```typescript
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const complaint = await request.json()
  
  // Save to database
  // await db.complaint.create({ data: complaint })
  
  return NextResponse.json({ success: true, id: Date.now() })
}
```

**Access at:** `http://localhost:3000/api/cities/Mumbai`

### Option C: Firebase (Real-time Database)

Install Firebase:
```bash
npm install firebase
```

Create `lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, set } from 'firebase/database'

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app.firebaseio.com",
  projectId: "your-project",
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

// Listen to real-time city data
export const subscribeToCityData = (cityName: string, callback: (data: any) => void) => {
  const cityRef = ref(db, `cities/${cityName}`)
  return onValue(cityRef, (snapshot) => {
    callback(snapshot.val())
  })
}

// Update city data
export const updateCityData = async (cityName: string, data: any) => {
  const cityRef = ref(db, `cities/${cityName}`)
  await set(cityRef, data)
}
```

### Option D: Supabase (PostgreSQL Database)

Install Supabase:
```bash
npm install @supabase/supabase-js
```

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

// Get city data
export const getCityData = async (cityName: string) => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('name', cityName)
    .single()
  
  return data
}

// Get real-time ESG updates
export const subscribeToESG = (cityName: string, callback: (data: any) => void) => {
  return supabase
    .channel('esg-updates')
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'cities',
      filter: `name=eq.${cityName}`
    }, callback)
    .subscribe()
}
```

---

## 📡 REAL-TIME DATA UPDATES

### Using WebSockets

Create `lib/websocket.ts`:

```typescript
export class ESGWebSocket {
  private ws: WebSocket | null = null
  
  connect(cityName: string) {
    this.ws = new WebSocket(`ws://localhost:5000/cities/${cityName}`)
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('Real-time update:', data)
      
      // Update your app state here
      useAppStore.getState().setESGScore(data.esgScore)
    }
  }
  
  disconnect() {
    this.ws?.close()
  }
}
```

---

## 🔄 DATA FLOW DIAGRAM

```
┌──────────────────────────────────────────────────────────┐
│                    YOUR APP                              │
│                                                          │
│  ┌─────────────┐      ┌──────────────┐                 │
│  │ Components  │─────▶│  lib/api.ts  │                 │
│  │ (Dashboard) │      │  (API calls) │                 │
│  └─────────────┘      └──────┬───────┘                 │
│         │                     │                          │
│         │                     ▼                          │
│         │            ┌─────────────────┐                │
│         └───────────▶│ lib/cityData.ts │ (Local data)   │
│                      │  (Fallback)     │                │
│                      └─────────────────┘                │
└────────────────────────┬─────────────────────────────────┘
                         │
                         │ HTTP/WebSocket
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│                   BACKEND API                            │
│                                                          │
│  ┌──────────────┐    ┌──────────────┐   ┌────────────┐ │
│  │   Express    │───▶│  PostgreSQL  │   │  MongoDB   │ │
│  │   Node.js    │    │   Database   │   │  Database  │ │
│  └──────────────┘    └──────────────┘   └────────────┘ │
│                                                          │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │   Firebase   │    │   Supabase   │                  │
│  │  Real-time   │    │  PostgreSQL  │                  │
│  └──────────────┘    └──────────────┘                  │
└──────────────────────────────────────────────────────────┘
                         │
                         │ External APIs
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│              EXTERNAL DATA SOURCES                       │
│                                                          │
│  • Government APIs (Open Data)                          │
│  • IoT Sensors (AQI, Water, Traffic)                   │
│  • Weather APIs                                          │
│  • Satellite Data                                        │
│  • Social Media APIs                                     │
└──────────────────────────────────────────────────────────┘
```

---

## 📝 QUICK START CHECKLIST

### To Change Data Now (No Backend):
- [x] Open `lib/cityData.ts` (just created!)
- [ ] Modify values in `CITY_DATA` object
- [ ] Save file
- [ ] See changes in browser immediately

### To Add Backend (Simple):
- [ ] Create `lib/api.ts` (copy from above)
- [ ] Create `.env.local` with API URL
- [ ] Update components to use `cityAPI.getCityData()`
- [ ] Build backend using Option A, B, C, or D

### To Use Real Data Sources:
- [ ] Sign up for APIs (weather, AQI, etc.)
- [ ] Add API keys to `.env.local`
- [ ] Create data fetching service
- [ ] Schedule periodic updates (cron job)

---

## 🎯 RECOMMENDED APPROACH

**For Development/Testing:**
→ Use `lib/cityData.ts` (local data) ✅

**For Demo/Hackathon:**
→ Use Next.js API Routes + Supabase

**For Production:**
→ Use Node.js/Express + PostgreSQL + Redis Cache

---

## 💡 NEED HELP?

Check these files:
- **Data Configuration**: `lib/cityData.ts` ✅
- **App State**: `store/appStore.ts`
- **AI Engine**: `lib/aiEngine.ts`

Your data is accurate if you:
1. Update `lib/cityData.ts` with real values
2. Connect to a backend API
3. Verify in browser console

**All data is currently simulated but ready for backend integration!**
