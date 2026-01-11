// In-memory data store for real-time features
let inMemoryData = {
  recommendations: [] as any[],
  alerts: [] as any[],
  predictions: [] as any[],
  metrics: {} as any,
  activities: [] as any[]
}

export function getInMemoryData() {
  return inMemoryData
}

export function updateRecommendations(data: any[]) {
  inMemoryData.recommendations = data
}

export function updateAlerts(data: any[]) {
  inMemoryData.alerts = data
}

export function updatePredictions(data: any[]) {
  inMemoryData.predictions = data
}

export function updateMetrics(data: any) {
  inMemoryData.metrics = data
}

export function addActivity(activity: any) {
  inMemoryData.activities.unshift(activity)
  if (inMemoryData.activities.length > 100) {
    inMemoryData.activities = inMemoryData.activities.slice(0, 100)
  }
}

export function getActivities(limit: number = 50) {
  return inMemoryData.activities.slice(0, limit)
}

export function clearInMemoryData() {
  inMemoryData = {
    recommendations: [],
    alerts: [],
    predictions: [],
    metrics: {},
    activities: []
  }
}
