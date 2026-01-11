import { getDatabase } from './mongodb'

export async function seedDatabase() {
  const db = await getDatabase()

  if (!db) {
    console.error('Database connection failed')
    return
  }

  // Seed ESG Metrics
  const esgMetrics = {
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
        { id: 1, name: 'Zone-1 (Central)', aqi: 178, color: '#ef4444', pollution: 'high', lat: 19.0760, lng: 72.8777 },
        { id: 2, name: 'Zone-2 (North)', aqi: 142, color: '#f59e0b', pollution: 'moderate', lat: 19.2183, lng: 72.9781 },
        { id: 3, name: 'Zone-3 (South)', aqi: 98, color: '#fbbf24', pollution: 'moderate', lat: 18.9388, lng: 72.8354 },
        { id: 4, name: 'Zone-4 (East)', aqi: 165, color: '#ef4444', pollution: 'high', lat: 19.1136, lng: 72.9087 },
        { id: 5, name: 'Zone-5 (West)', aqi: 135, color: '#f59e0b', pollution: 'moderate', lat: 19.0545, lng: 72.8320 },
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

  await db.collection('esgmetrics').deleteMany({})
  await db.collection('esgmetrics').insertOne(esgMetrics)

  // Seed AI Predictions
  const predictions = [
    {
      type: 'pollution_forecast',
      cityName: 'Mumbai',
      timestamp: new Date(),
      predictions: [
        { month: 1, aqi: 160, confidence: 0.85 },
        { month: 2, aqi: 168, confidence: 0.82 },
        { month: 3, aqi: 175, confidence: 0.78 },
      ]
    },
    {
      type: 'water_stress',
      cityName: 'Mumbai',
      timestamp: new Date(),
      predictions: [
        { month: 1, usage: 82, stress: 'Medium', confidence: 0.88 },
        { month: 2, usage: 89, stress: 'High', confidence: 0.84 },
        { month: 3, usage: 95, stress: 'High', confidence: 0.81 },
      ]
    }
  ]

  await db.collection('predictions').deleteMany({})
  await db.collection('predictions').insertMany(predictions)

  // Seed AI Recommendations
  const recommendations = [
    {
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
  ]

  await db.collection('recommendations').deleteMany({})
  await db.collection('recommendations').insertMany(recommendations)

  // Seed Actions (executed recommendations)
  await db.collection('actions').deleteMany({})

  // Seed Alerts
  const alerts = [
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

  await db.collection('esgalerts').deleteMany({})
  await db.collection('esgalerts').insertMany(alerts)

  console.log('Database seeded successfully!')
  return { success: true }
}
