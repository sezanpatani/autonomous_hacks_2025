import { NextResponse } from 'next/server'

// GET /api/cities/[cityName]/aqi
export async function GET(
  request: Request,
  { params }: { params: { cityName: string } }
) {
  try {
    // Simulate real-time AQI data
    // In production, fetch from IoT sensors or government APIs
    const baseAQI = params.cityName.toLowerCase() === 'mumbai' ? 156 : 287
    const realTimeAQI = baseAQI + Math.floor(Math.random() * 20 - 10)
    
    const zones = [
      { name: 'Zone 1', aqi: realTimeAQI - 10, status: getAQIStatus(realTimeAQI - 10) },
      { name: 'Zone 2', aqi: realTimeAQI + 5, status: getAQIStatus(realTimeAQI + 5) },
      { name: 'Zone 3', aqi: realTimeAQI, status: getAQIStatus(realTimeAQI) },
      { name: 'Zone 4', aqi: realTimeAQI - 5, status: getAQIStatus(realTimeAQI - 5) },
    ]
    
    return NextResponse.json({
      cityName: params.cityName,
      aqi: realTimeAQI,
      pm25: Math.round(realTimeAQI * 0.57),
      timestamp: new Date().toISOString(),
      zones
    })
  } catch (error) {
    console.error('Error fetching AQI data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AQI data' },
      { status: 500 }
    )
  }
}

function getAQIStatus(aqi: number): string {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very Unhealthy'
  return 'Hazardous'
}
