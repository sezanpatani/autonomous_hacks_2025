import { NextResponse } from 'next/server'
import { getCurrentCityData, DELHI_DATA } from '@/lib/cityData'

// GET /api/cities/[cityName]
export async function GET(
  request: Request,
  { params }: { params: { cityName: string } }
) {
  try {
    const cityName = params.cityName.toLowerCase()
    
    // You can add database query here
    // const data = await db.cities.findUnique({ where: { name: cityName } })
    
    // For now, return mock data based on city name
    let cityData
    if (cityName === 'mumbai') {
      cityData = getCurrentCityData()
    } else if (cityName === 'delhi') {
      cityData = DELHI_DATA
    } else {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(cityData, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    })
  } catch (error) {
    console.error('Error fetching city data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/cities/[cityName]/metrics
export async function PUT(
  request: Request,
  { params }: { params: { cityName: string } }
) {
  try {
    const { metric, value } = await request.json()
    
    // Update the metric in database
    // await db.metrics.update({ where: { city: params.cityName, name: metric }, data: { value } })
    
    console.log(`Updated ${metric} for ${params.cityName}: ${value}`)
    
    return NextResponse.json({
      success: true,
      metric,
      value,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating metric:', error)
    return NextResponse.json(
      { error: 'Failed to update metric' },
      { status: 500 }
    )
  }
}
