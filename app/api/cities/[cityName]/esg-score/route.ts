import { NextResponse } from 'next/server'

// GET /api/cities/[cityName]/esg-score
export async function GET(
  request: Request,
  { params }: { params: { cityName: string } }
) {
  try {
    // You can calculate real-time ESG score from database
    // const metrics = await db.metrics.findMany({ where: { city: params.cityName } })
    // const score = calculateESGScore(metrics)
    
    // For now, return mock score with some variation
    const baseScore = params.cityName.toLowerCase() === 'mumbai' ? 72 : 68
    const variation = Math.random() * 4 - 2 // ±2 points
    const score = Math.round(baseScore + variation)
    
    return NextResponse.json({
      score,
      timestamp: new Date().toISOString(),
      cityName: params.cityName
    })
  } catch (error) {
    console.error('Error fetching ESG score:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ESG score' },
      { status: 500 }
    )
  }
}
