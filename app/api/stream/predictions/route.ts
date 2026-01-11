import { NextRequest } from 'next/server'
import { PredictiveEngine } from '@/lib/aiEngine'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function generateStreamingPrediction(type: string, baseScore: number) {
  const timestamp = new Date().toISOString()
  
  if (type === 'esg') {
    const forecast = PredictiveEngine.forecastESG(baseScore, 6)
    return {
      type: 'esg_forecast',
      timestamp,
      currentScore: baseScore,
      predictions: forecast.map((value: any, index: any) => ({
        month: index,
        value: value,
        confidence: 0.75 + Math.random() * 0.15
      })),
      trend: forecast[forecast.length - 1] > forecast[0] ? 'improving' : 'declining',
      change: parseFloat((forecast[forecast.length - 1] - forecast[0]).toFixed(1))
    }
  }
  
  if (type === 'pollution') {
    const zones = [
      { name: 'Zone-1', aqi: 142 + Math.floor(Math.random() * 20) },
      { name: 'Zone-2', aqi: 168 + Math.floor(Math.random() * 20) },
      { name: 'Zone-3', aqi: 135 + Math.floor(Math.random() * 20) },
      { name: 'Zone-4', aqi: 151 + Math.floor(Math.random() * 20) }
    ]
    
    const spikes = PredictiveEngine.predictPollutionSpikes(zones, 3)
    
    return {
      type: 'pollution_forecast',
      timestamp,
      predictions: spikes,
      highRiskZones: spikes
        .filter((s: any) => s.spikes.length > 0)
        .map((s: any) => s.zone)
    }
  }
  
  // Generic prediction
  return {
    type: 'generic_prediction',
    timestamp,
    value: baseScore + (Math.random() - 0.5) * 10,
    confidence: 0.70 + Math.random() * 0.2,
    factors: [
      { name: 'Historical Trend', impact: parseFloat((Math.random() * 5).toFixed(1)) },
      { name: 'Seasonal Pattern', impact: parseFloat((Math.random() * 3).toFixed(1)) },
      { name: 'Policy Impact', impact: parseFloat((Math.random() * 4).toFixed(1)) }
    ]
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') || 'esg'
  const baseScore = parseInt(searchParams.get('baseScore') || '75')

  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial prediction
      const initialData = generateStreamingPrediction(type, baseScore)
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`)
      )

      // Stream updates every 8 seconds
      const intervalId = setInterval(() => {
        try {
          const data = generateStreamingPrediction(type, baseScore + (Math.random() - 0.5) * 5)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          )
        } catch (error) {
          console.error('Prediction stream error:', error)
          clearInterval(intervalId)
          controller.close()
        }
      }, 8000)

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
