// In-memory data store fallback when MongoDB is unavailable
let inMemoryData: any = {
  esgmetrics: [{
    cityName: 'Mumbai',
    timestamp: new Date(),
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
  }],
  recommendations: [
    {
      _id: 'rec1',
      cityName: 'Mumbai',
      timestamp: new Date(),
      priority: 'high',
      module: 'environment',
      title: 'Deploy 200 Electric Buses',
      description: 'Replace diesel buses in high-pollution zones to reduce AQI by 15 points',
      estimatedCost: 800000000,
      estimatedImpact: 15,
      estimatedTimeline: '6 months',
      roi: 12.5,
      status: 'pending',
      confidence: 0.89
    },
    {
      _id: 'rec2',
      cityName: 'Mumbai',
      timestamp: new Date(),
      priority: 'medium',
      module: 'social',
      title: 'Open 3 New Health Centers',
      description: 'Improve healthcare access in underserved zones',
      estimatedCost: 150000000,
      estimatedImpact: 8,
      estimatedTimeline: '9 months',
      roi: 8.3,
      status: 'pending',
      confidence: 0.82
    },
    {
      _id: 'rec3',
      cityName: 'Mumbai',
      timestamp: new Date(),
      priority: 'high',
      module: 'environment',
      title: 'Install Smart Water Meters',
      description: 'Reduce water leakage by 25% with IoT monitoring',
      estimatedCost: 300000000,
      estimatedImpact: 12,
      estimatedTimeline: '4 months',
      roi: 18.7,
      status: 'pending',
      confidence: 0.91
    }
  ],
  actions: [],
  predictions: [],
  esgalerts: [
    {
      cityName: 'Mumbai',
      timestamp: new Date(),
      type: 'warning',
      severity: 'high',
      module: 'environment',
      message: 'Zone-1 AQI increased by 15% this week',
      recommendation: 'Consider implementing odd-even vehicle policy',
      active: true
    }
  ]
}

export function getInMemoryData(collection: string, filter?: any) {
  const data = inMemoryData[collection] || []
  if (!filter) return data
  
  return data.filter((item: any) => {
    return Object.keys(filter).every(key => {
      if (typeof filter[key] === 'object') return true // Skip complex queries
      return item[key] === filter[key]
    })
  })
}

export function insertInMemoryData(collection: string, data: any) {
  if (!inMemoryData[collection]) inMemoryData[collection] = []
  const item = { ...data, _id: generateId() }
  inMemoryData[collection].push(item)
  return { _id: item._id }
}

export function updateInMemoryData(collection: string, filter: any, update: any) {
  const data = getInMemoryData(collection, filter)
  data.forEach((item: any) => {
    Object.assign(item, update.$set || update)
  })
  return { modifiedCount: data.length }
}

function generateId() {
  return Math.random().toString(36).substr(2, 9)
}
