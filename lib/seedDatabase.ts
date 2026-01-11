import { getDatabase } from './mongodbClient'

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

  // Seed Recommendations
  const recommendations = [
    {
      cityName: 'Mumbai',
      id: 'rec_001',
      title: 'Deploy Air Purification Towers in High AQI Zones',
      module: 'environment',
      priority: 'critical',
      impact: 25,
      cost: 45000000,
      status: 'pending',
      aiConfidence: 0.92,
      description: 'Install 15 large-scale air purification towers',
      timestamp: new Date()
    },
    {
      cityName: 'Mumbai',
      id: 'rec_002',
      title: 'Expand Metro Network to Eastern Suburbs',
      module: 'social',
      priority: 'high',
      impact: 18,
      cost: 120000000,
      status: 'pending',
      aiConfidence: 0.87,
      description: 'Reduce vehicle emissions by 30%',
      timestamp: new Date()
    }
  ]

  await db.collection('recommendations').deleteMany({})
  await db.collection('recommendations').insertMany(recommendations)

  // Seed Alerts
  const alerts = [
    {
      cityName: 'Mumbai',
      severity: 'critical',
      message: 'AQI exceeds 200 in Central Zone',
      timestamp: new Date(),
      active: true,
      module: 'environment'
    },
    {
      cityName: 'Mumbai',
      severity: 'warning',
      message: 'Water quality declining in North Zone',
      timestamp: new Date(),
      active: true,
      module: 'environment'
    }
  ]

  await db.collection('esgalerts').deleteMany({})
  await db.collection('esgalerts').insertMany(alerts)

  console.log('Database seeded successfully')
}
