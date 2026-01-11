import { NextRequest } from 'next/server'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { getDatabase } from '@/lib/mongodbClient'

export async function POST(req: NextRequest) {
  try {
    const { messages, cityName = 'Mumbai' } = await req.json()

    // Get real-time city data for context
    const db = await getDatabase()

    let metrics: any = null
    let recommendations: any[] = []
    let alerts: any[] = []

    if (db) {
      metrics = await db.collection('esgmetrics').findOne({ cityName })
      recommendations = await db.collection('recommendations')
        .find({ cityName, status: 'pending' })
        .limit(5)
        .toArray()
      alerts = await db.collection('esgalerts')
        .find({ cityName, active: true })
        .limit(3)
        .toArray()
    } else {
      // Use fallback defaults if DB unavailable
      metrics = null
      recommendations = []
      alerts = []
    }

    // Build context for AI
    const contextData = {
      cityName,
      esgScore: metrics?.overall || 72,
      environment: {
        aqi: metrics?.environment?.aqi || 156,
        waterQuality: metrics?.environment?.waterQuality || 75,
        wasteRecycling: metrics?.environment?.wasteRecycling || 45
      },
      social: {
        healthcare: metrics?.social?.healthcare || 71,
        education: metrics?.social?.education || 82,
        safety: metrics?.social?.safety || 79
      },
      governance: {
        transparency: metrics?.governance?.transparency || 78,
        compliance: metrics?.governance?.compliance || 82
      },
      topRecommendations: recommendations.map(r => ({
        title: r.title,
        priority: r.priority,
        impact: r.estimatedImpact
      })),
      activeAlerts: alerts.map(a => ({
        message: a.message,
        severity: a.severity
      }))
    }

    const systemPrompt = `You are an AI sustainability assistant for ${cityName}'s ESG platform. 

Current City Context:
- ESG Score: ${contextData.esgScore}/100
- AQI Level: ${contextData.environment.aqi} (Target: <100)
- Water Quality: ${contextData.environment.waterQuality}%
- Waste Recycling: ${contextData.environment.wasteRecycling}%
- Healthcare Access: ${contextData.social.healthcare}%
- Education Score: ${contextData.social.education}%
- Safety Index: ${contextData.social.safety}%

Active Alerts:
${contextData.activeAlerts.map(a => `- [${a.severity}] ${a.message}`).join('\n')}

Top Recommendations:
${contextData.topRecommendations.map(r => `- [${r.priority}] ${r.title} (Impact: +${r.impact})`).join('\n')}

Your role:
1. Provide data-driven insights based on real city metrics
2. Explain ESG concepts in simple language for non-technical users
3. Suggest actionable interventions with clear ROI
4. Answer questions about pollution, water, energy, social issues
5. Be conversational, helpful, and focused on sustainability

Keep responses concise (2-3 sentences) unless asked for detailed analysis.`

    const result = await streamText({
      model: openai('gpt-4-turbo-preview'),
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
    })

    return result.toTextStreamResponse()

  } catch (error: any) {
    console.error('OpenAI API Error:', error)
    
    // Fallback to intelligent mock responses if OpenAI fails
    if (error.message?.includes('API key')) {
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key not configured. Add OPENAI_API_KEY to .env.local',
          fallback: true,
          message: "I can see your city's ESG score is 72/100. The main issues are high AQI (156) in Zone-1 and low waste recycling (45%). I recommend deploying electric buses and improving waste segregation campaigns."
        }), 
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
