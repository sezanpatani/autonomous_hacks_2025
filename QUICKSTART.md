# 🚀 Quick Start Guide

## Installation (5 minutes)

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Start Development Server
```powershell
npm run dev
```

### Step 3: Open Browser
Navigate to: **http://localhost:3000**

---

## 🎯 Demo Walkthrough (For Judges)

### **30-Second Impact Demo**

1. **Landing Page** - Watch ESG score animate from 0 to 72
2. **Click Environment Card** - See pollution clouds and zone map
3. **Open AI Assistant** (FAB button) - Ask "Why is Zone-1 pollution high?"
4. **Future Simulator** - Slide to 50% electric buses → See AQI reduction
5. **Social Module** - Toggle heatmap between Education & Healthcare
6. **Gamification** - Show badges, leaderboard, and monthly challenge

### **Key Talking Points**
- ✅ "No training needed - understood in 30 seconds"
- ✅ "AI explains everything in simple language"
- ✅ "Government-friendly transparency design"
- ✅ "Mobile + Web responsive"
- ✅ "Gamification drives ward-level competition"

---

## 📱 Navigation Guide

### **Desktop**
- **Sidebar (Left):** Main navigation
- **Top Bar:** Current module, level badge
- **FAB (Bottom Right):** AI Assistant
- **Bottom Nav:** Hidden on desktop

### **Mobile**
- **Hamburger Menu:** Sidebar navigation
- **Bottom Nav:** Quick module switching
- **FAB (Bottom Right):** AI Assistant
- **Swipe:** Smooth transitions

---

## 🎨 Module Overview

### **Home Dashboard**
- Animated ESG Score Meter
- Quick Stats (AQI, Water, Energy, Waste)
- 3 Module Cards (clickable)
- Interactive City Map
- AI Insights Panel
- Gamification Section

### **Environment Module**
- Zone-wise AQI with pollution animations
- Water quality waves
- Energy flow visualization
- Waste recycling progress
- Future Impact Simulator

### **Social Module**
- Interactive heatmap (Education/Healthcare)
- Community issues tracker
- One-tap issue reporting
- Emoji feedback

### **Governance Module**
- Glassmorphism compliance cards
- Progress timeline (quarterly)
- Task management
- AI risk highlights

---

## 🤖 AI Features

### **Chat Assistant**
- Click FAB button (bottom right)
- Type or use voice
- Get simple explanations
- Contextual recommendations

### **Insights**
- Automatic alerts on dashboard
- Priority-based (high/medium/low)
- Action buttons for quick response

### **Simulator**
- Environment module
- Slide to adjust parameters
- Real-time impact prediction

---

## 🏆 Gamification

### **Progress Tracking**
- Current Level: Silver City
- Points: 7,250
- Streak: 12 days 🔥

### **Badges**
- 🌱 Green Pioneer (earned)
- 💧 Water Savior (earned)
- 🌬️ Clean Air Champion (locked)
- ♻️ Waste Warrior (earned)

### **Leaderboard**
- Ward-wise ranking
- Real-time updates
- Medal system (🏆🥈🥉)

---

## 🎤 Judge Presentation Script

### **Opening (10 seconds)**
*"I'll show you how anyone can understand city sustainability in 30 seconds."*

### **Demo (4 minutes)**
1. **Dashboard** - "See the animated score? No tables, just visuals."
2. **Environment** - "Click Zone-1. AI tells us why pollution is high."
3. **Simulator** - "Slide this. AI predicts future impact."
4. **AI Chat** - "Ask anything. Simple answers."
5. **Gamification** - "Wards compete. Engagement drives results."

### **Closing (30 seconds)**
*"This isn't just an app. It's how India's 100+ smart cities can achieve sustainability goals faster with engaged citizens and data-driven decisions."*

---

## 🛠️ Troubleshooting

### **Port Already in Use**
```powershell
# Use different port
npm run dev -- -p 3001
```

### **Dependencies Error**
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### **Build Error**
```powershell
# Check TypeScript
npm run lint
```

---

## 📊 Performance Tips

### **Smooth Animations**
- Uses Framer Motion (GPU-accelerated)
- 60fps target on all devices
- Lazy loading for images

### **Responsive Design**
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px
- Touch-optimized interactions

---

## 🎓 User Roles

### **Admin** (Default)
- Full access to all modules
- Advanced AI tools
- Scenario planning
- Detailed reports

### **Official**
- Area-wise data
- Alerts & tasks
- Basic AI recommendations

### **Public**
- View-only
- Simple scores
- Issue reporting
- Awareness content

---

## 📞 Support

**Questions?** Check README.md for detailed documentation

**Bug Found?** This is a demo - focus on features during presentation

**Customization?** All data in `data/mockData.ts`

---

**Ready to Win! 🏆**
