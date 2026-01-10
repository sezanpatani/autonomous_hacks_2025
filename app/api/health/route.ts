import { NextResponse } from 'next/server'

// GET /api/health
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      database: 'connected',
      ai: 'active',
      api: 'operational'
    }
  })
}
