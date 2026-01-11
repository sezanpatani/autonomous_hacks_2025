import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodbClient'
import { getInMemoryData } from '@/lib/inMemoryDB'

export async function GET(request: NextRequest) {
  try {
    const cityName = request.nextUrl.searchParams.get('city') || 'Mumbai'
    const status = request.nextUrl.searchParams.get('status')
    const module = request.nextUrl.searchParams.get('module')
    
    const filter: any = { cityName }
    if (status) filter.status = status
    if (module) filter.module = module

    const db = await getDatabase()
    let recommendations
    
    if (db) {
      recommendations = await db.collection('recommendations')
        .find(filter)
        .sort({ priority: -1, confidence: -1 })
        .toArray()
    } else {
      // Fallback to in-memory data
      recommendations = getInMemoryData('recommendations', filter)
        .sort((a: any, b: any) => {
          const priority = { high: 3, medium: 2, low: 1 }
          return (priority[b.priority as keyof typeof priority] || 0) - 
                 (priority[a.priority as keyof typeof priority] || 0)
        })
    }

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    const recommendations = getInMemoryData('recommendations')
    return NextResponse.json({ recommendations })
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase()
    const data = await request.json()
    
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 503 })
    }
    
    const recommendation = {
      ...data,
      timestamp: new Date(),
      status: data.status || 'pending'
    }

    const result = await db.collection('recommendations').insertOne(recommendation)

    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error('Error creating recommendation:', error)
    return NextResponse.json({ error: 'Failed to create recommendation' }, { status: 500 })
  }
}
