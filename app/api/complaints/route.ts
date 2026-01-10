import { NextResponse } from 'next/server'

// In-memory storage (replace with database in production)
let complaints: any[] = []
let nextId = 1

// GET /api/complaints
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    
    let filtered = complaints
    
    if (status) {
      filtered = filtered.filter(c => c.status === status)
    }
    
    if (category) {
      filtered = filtered.filter(c => c.category === category)
    }
    
    return NextResponse.json({
      complaints: filtered,
      total: filtered.length
    })
  } catch (error) {
    console.error('Error fetching complaints:', error)
    return NextResponse.json(
      { error: 'Failed to fetch complaints' },
      { status: 500 }
    )
  }
}

// POST /api/complaints
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    const complaint = {
      id: nextId++,
      category: formData.get('category'),
      description: formData.get('description'),
      location: formData.get('location'),
      priority: formData.get('priority') || 'Medium',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      image: formData.get('image') ? 'uploaded' : null
    }
    
    complaints.push(complaint)
    
    // In production, save to database
    // await db.complaints.create({ data: complaint })
    
    console.log('New complaint created:', complaint)
    
    return NextResponse.json({
      success: true,
      complaint
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating complaint:', error)
    return NextResponse.json(
      { error: 'Failed to create complaint' },
      { status: 500 }
    )
  }
}
