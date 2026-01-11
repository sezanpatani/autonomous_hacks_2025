import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodbClient'

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const cityName = request.nextUrl.searchParams.get('city') || 'Mumbai'
    const type = request.nextUrl.searchParams.get('type')
    
    if (!db) {
      return NextResponse.json({ predictions: [] })
    }
    
    const filter: any = { cityName }
    if (type) filter.type = type

    const predictions = await db.collection('predictions')
      .find(filter)
      .sort({ timestamp: -1 })
      .toArray()

    return NextResponse.json({ predictions })
  } catch (error) {
    console.error('Error fetching predictions:', error)
    return NextResponse.json({ predictions: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase()
    const data = await request.json()
    
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 503 })
    }
    
    const prediction = {
      ...data,
      timestamp: new Date()
    }

    const result = await db.collection('predictions').insertOne(prediction)

    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error('Error creating prediction:', error)
    return NextResponse.json({ error: 'Failed to create prediction' }, { status: 500 })
  }
}
