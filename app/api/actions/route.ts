import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodbClient'
import { getInMemoryData, insertInMemoryData, updateInMemoryData } from '@/lib/inMemoryDB'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { recommendationId, executedBy, notes } = await request.json()

    if (!recommendationId) {
      return NextResponse.json({ error: 'Recommendation ID required' }, { status: 400 })
    }

    const db = await getDatabase()
    
    if (db) {
      // Dynamically import ObjectId
      const { ObjectId } = await import('mongodb')
      
      // Use MongoDB
      const recommendation = await db.collection('recommendations').findOne({
        _id: new ObjectId(recommendationId)
      })

      if (!recommendation) {
        return NextResponse.json({ error: 'Recommendation not found' }, { status: 404 })
      }

      await db.collection('recommendations').updateOne(
        { _id: new ObjectId(recommendationId) },
        { 
          $set: { 
            status: 'executed',
            executedAt: new Date(),
            executedBy: executedBy || 'AI Agent'
          } 
        }
      )

      const action = {
        recommendationId,
        cityName: recommendation.cityName,
        title: recommendation.title,
        module: recommendation.module,
        executedAt: new Date(),
        executedBy: executedBy || 'AI Agent',
        notes: notes || `Autonomous execution of ${recommendation.title}`,
        estimatedImpact: recommendation.estimatedImpact,
        cost: recommendation.estimatedCost
      }

      await db.collection('actions').insertOne(action)

      return NextResponse.json({ 
        success: true, 
        message: 'Action executed successfully',
        action 
      })
    } else {
      // Use in-memory data
      const recommendations = getInMemoryData('recommendations')
      const recommendation = recommendations.find((r: any) => r._id === recommendationId)
      
      if (!recommendation) {
        return NextResponse.json({ error: 'Recommendation not found' }, { status: 404 })
      }

      updateInMemoryData('recommendations', { _id: recommendationId }, {
        $set: { status: 'executed', executedAt: new Date(), executedBy: executedBy || 'AI Agent' }
      })

      const action = {
        recommendationId,
        cityName: recommendation.cityName,
        title: recommendation.title,
        module: recommendation.module,
        executedAt: new Date(),
        executedBy: executedBy || 'AI Agent',
        notes: notes || `Autonomous execution of ${recommendation.title}`,
        estimatedImpact: recommendation.estimatedImpact,
        cost: recommendation.estimatedCost
      }

      insertInMemoryData('actions', action)

      return NextResponse.json({ 
        success: true, 
        message: 'Action executed successfully (in-memory)',
        action 
      })
    }
  } catch (error) {
    console.error('Error executing action:', error)
    return NextResponse.json({ error: 'Failed to execute action' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const cityName = request.nextUrl.searchParams.get('city') || 'Mumbai'
    
    const db = await getDatabase()
    let actions
    
    if (db) {
      actions = await db.collection('actions')
        .find({ cityName })
        .sort({ executedAt: -1 })
        .limit(20)
        .toArray()
    } else {
      actions = getInMemoryData('actions', { cityName })
        .sort((a: any, b: any) => b.executedAt - a.executedAt)
        .slice(0, 20)
    }

    return NextResponse.json({ actions })
  } catch (error) {
    console.error('Error fetching actions:', error)
    return NextResponse.json({ actions: [] })
  }
}
