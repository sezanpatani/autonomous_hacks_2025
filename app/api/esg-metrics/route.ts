import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodbClient'
import { getInMemoryData } from '@/lib/inMemoryDB'

export async function GET(request: NextRequest) {
  try {
    const cityName = request.nextUrl.searchParams.get('city') || 'Mumbai'
    
    const db = await getDatabase()
    let metrics
    
    if (db) {
      metrics = await db.collection('esgmetrics').findOne({ cityName })
    } else {
      // Fallback to in-memory data
      metrics = getInMemoryData('esgmetrics', { cityName })[0]
    }
    
    if (!metrics) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Error fetching ESG metrics:', error)
    // Return fallback data
    const metrics = getInMemoryData('esgmetrics')[0]
    return NextResponse.json(metrics || { error: 'No data available' })
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase()
    const data = await request.json()
    
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 503 })
    }
    
    const result = await db.collection('esgmetrics').updateOne(
      { cityName: data.cityName },
      { $set: { ...data, timestamp: new Date() } },
      { upsert: true }
    )

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Error updating ESG metrics:', error)
    return NextResponse.json({ error: 'Failed to update metrics' }, { status: 500 })
  }
}
