import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodbClient'

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const cityName = request.nextUrl.searchParams.get('city') || 'Mumbai'
    
    if (!db) {
      return NextResponse.json({ alerts: [] })
    }
    
    const alerts = await db.collection('esgalerts')
      .find({ cityName, active: true })
      .sort({ severity: -1, timestamp: -1 })
      .toArray()

    return NextResponse.json({ alerts })
  } catch (error) {
    console.error('Error fetching alerts:', error)
    return NextResponse.json({ alerts: [] })
  }
}
