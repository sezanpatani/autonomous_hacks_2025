import { NextRequest } from 'next/server'
import { getDatabase } from '@/lib/mongodbClient'
import { getInMemoryData } from '@/lib/inMemoryDB'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Simulate real-time sensor data fluctuations
function generateRealtimeFluctuation(baseValue: number, variance: number = 5): number {
  const fluctuation = (Math.random() - 0.5) * variance
  return Math.max(0, baseValue + fluctuation)
}

function generateRealtimeMetrics(cityName: string = 'Smart City Alpha') {
  // Generate realistic fluctuations
  const timestamp = new Date().toISOString()
  
  return {
    cityName,
    timestamp,
    overall: {
      score: generateRealtimeFluctuation(78, 2),
      trend: Math.random() > 0.5 ? 'up' : 'stable',
      change: parseFloat((Math.random() * 4 - 1).toFixed(1))
    },
    environment: {
      aqi: Math.floor(generateRealtimeFluctuation(156, 8)),
      waterQuality: Math.floor(generateRealtimeFluctuation(82, 3)),
      energyEfficiency: Math.floor(generateRealtimeFluctuation(91, 2)),
      wasteRecycling: Math.floor(generateRealtimeFluctuation(76, 4)),
      carbonEmissions: Math.floor(generateRealtimeFluctuation(420, 15)),
      zones: [
        {
          name: 'Zone-1',
          aqi: Math.floor(generateRealtimeFluctuation(142, 10)),
          status: 'moderate',
          population: 125000
        },
        {
          name: 'Zone-2',
          aqi: Math.floor(generateRealtimeFluctuation(168, 12)),
          status: 'unhealthy',
          population: 98000
        },
        {
          name: 'Zone-3',
          aqi: Math.floor(generateRealtimeFluctuation(135, 8)),
          status: 'moderate',
          population: 110000
        },
        {
          name: 'Zone-4',
          aqi: Math.floor(generateRealtimeFluctuation(151, 10)),
          status: 'unhealthy',
          population: 87000
        }
      ]
    },
    social: {
      education: Math.floor(generateRealtimeFluctuation(88, 1)),
      healthcare: Math.floor(generateRealtimeFluctuation(85, 2)),
      employment: Math.floor(generateRealtimeFluctuation(79, 2)),
      housingAffordability: Math.floor(generateRealtimeFluctuation(72, 3)),
      publicSafety: Math.floor(generateRealtimeFluctuation(91, 1))
    },
    governance: {
      transparency: Math.floor(generateRealtimeFluctuation(83, 2)),
      publicParticipation: Math.floor(generateRealtimeFluctuation(76, 3)),
      digitalServices: Math.floor(generateRealtimeFluctuation(89, 2)),
      anticorruption: Math.floor(generateRealtimeFluctuation(81, 2)),
      regulatoryEfficiency: Math.floor(generateRealtimeFluctuation(77, 3))
    }
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cityName = searchParams.get('cityName') || 'Smart City Alpha'

  // Set up Server-Sent Events (SSE)
  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial data immediately
      const initialData = generateRealtimeMetrics(cityName)
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`)
      )

      // Set up interval for live updates
      const intervalId = setInterval(() => {
        try {
          const data = generateRealtimeMetrics(cityName)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          )
        } catch (error) {
          console.error('Stream error:', error)
          clearInterval(intervalId)
          controller.close()
        }
      }, 4000) // Update every 4 seconds

      // Cleanup on connection close
      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId)
        controller.close()
      })
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
}
