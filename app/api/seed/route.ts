import { NextRequest, NextResponse } from 'next/server'
import { seedDatabase } from '@/lib/seedDatabase'

export async function POST(request: NextRequest) {
  try {
    const result = await seedDatabase()
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error seeding database:', error)
    return NextResponse.json({ 
      error: error.message,
      fallback: 'Using in-memory data instead'
    }, { status: 200 }) // Return 200 with fallback message
  }
}

export async function GET(request: NextRequest) {
  return POST(request)
}
