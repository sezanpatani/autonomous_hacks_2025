import { NextRequest, NextResponse } from 'next/server'
import { getOrchestrator } from '@/lib/multiAgentSystem'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, taskData, workflowType, taskIds } = body
    
    const orchestrator = getOrchestrator()

    if (action === 'create_task') {
      // Create a single task
      const task = orchestrator.createTask(taskData)
      return NextResponse.json({ success: true, task })
    }

    if (action === 'execute_task') {
      // Execute a single task
      const { taskId } = body
      const result = await orchestrator.executeTask(taskId)
      return NextResponse.json({ success: true, result })
    }

    if (action === 'execute_parallel') {
      // Execute multiple tasks in parallel
      const results = await orchestrator.executeParallelTasks(taskIds)
      return NextResponse.json({ success: true, results })
    }

    if (action === 'orchestrate_workflow') {
      // Execute a predefined workflow
      const result = await orchestrator.executeWorkflow(workflowType, taskData)
      return NextResponse.json({ success: true, workflow: result })
    }

    if (action === 'send_message') {
      // Send inter-agent message
      const { from, to, content, type } = body
      orchestrator.sendMessage(from, to, content)
      return NextResponse.json({ success: true, message: { from, to, content, type } })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Agent API error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || 'all'
    
    const orchestrator = getOrchestrator()

    if (type === 'agents') {
      const agents = orchestrator.getAllAgents()
      return NextResponse.json({ agents })
    }

    if (type === 'tasks') {
      const tasks = orchestrator.getAllTasks()
      return NextResponse.json({ tasks })
    }

    if (type === 'messages') {
      const limit = parseInt(searchParams.get('limit') || '50')
      const messages = orchestrator.getMessages(limit)
      return NextResponse.json({ messages })
    }

    if (type === 'all') {
      const agents = orchestrator.getAllAgents()
      const tasks = orchestrator.getAllTasks()
      const messages = orchestrator.getMessages(50)
      
      return NextResponse.json({
        agents,
        tasks,
        messages,
        summary: {
          totalAgents: agents.length,
          busyAgents: agents.filter((a: any) => a.status === 'busy').length,
          totalTasks: tasks.length,
          completedTasks: tasks.filter((t: any) => t.status === 'completed').length,
          pendingTasks: tasks.filter((t: any) => t.status === 'pending').length,
          messageCount: messages.length
        }
      })
    }

    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Agent GET error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
