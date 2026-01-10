export const ESG_DATA = {
  overall: 72,
  environment: {
    score: 68,
    aqi: 156,
    waterQuality: 75,
    energyEfficiency: 62,
    wasteRecycling: 45,
    greenCover: 28,
    zones: [
      { id: 1, name: 'Zone-1 (Central)', aqi: 178, color: '#ef4444', pollution: 'high' },
      { id: 2, name: 'Zone-2 (North)', aqi: 142, color: '#f59e0b', pollution: 'moderate' },
      { id: 3, name: 'Zone-3 (South)', aqi: 98, color: '#fbbf24', pollution: 'moderate' },
      { id: 4, name: 'Zone-4 (East)', aqi: 165, color: '#ef4444', pollution: 'high' },
      { id: 5, name: 'Zone-5 (West)', aqi: 135, color: '#f59e0b', pollution: 'moderate' },
    ]
  },
  social: {
    score: 75,
    education: 82,
    healthcare: 71,
    employment: 68,
    safety: 79,
    housingAccess: 65,
    communityEngagement: 73,
    issues: [
      { type: 'healthcare', count: 23, urgent: 5 },
      { type: 'education', count: 18, urgent: 2 },
      { type: 'safety', count: 31, urgent: 8 },
    ]
  },
  governance: {
    score: 73,
    transparency: 78,
    compliance: 82,
    citizenServices: 69,
    budgetUtilization: 76,
    responseTime: 71,
    digitalServices: 68,
    pendingTasks: 142,
    completedTasks: 1287,
  }
}

export const GAMIFICATION_DATA = {
  currentLevel: 'Silver City',
  points: 7250,
  streak: 12,
  badges: [
    { id: 1, name: 'Green Pioneer', icon: '🌱', earned: true },
    { id: 2, name: 'Water Savior', icon: '💧', earned: true },
    { id: 3, name: 'Clean Air Champion', icon: '🌬️', earned: false },
    { id: 4, name: 'Waste Warrior', icon: '♻️', earned: true },
  ],
  leaderboard: [
    { ward: 'Ward-A', score: 85, rank: 1 },
    { ward: 'Ward-B', score: 78, rank: 2 },
    { ward: 'Ward-C', score: 72, rank: 3 },
    { ward: 'Ward-D', score: 69, rank: 4 },
    { ward: 'Ward-E', score: 65, rank: 5 },
  ]
}

export const AI_INSIGHTS = [
  {
    id: 1,
    type: 'alert',
    module: 'environment',
    message: 'Zone-1 AQI increased by 15% this week. Consider implementing odd-even vehicle policy.',
    priority: 'high',
    action: 'View Details'
  },
  {
    id: 2,
    type: 'suggestion',
    module: 'social',
    message: 'Healthcare access in Zone-3 is below average. 2 new clinics recommended.',
    priority: 'medium',
    action: 'See Locations'
  },
  {
    id: 3,
    type: 'success',
    module: 'governance',
    message: 'Budget utilization improved by 12%. On track for quarterly goals!',
    priority: 'low',
    action: 'View Report'
  },
]
