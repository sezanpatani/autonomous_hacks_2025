// Multi-Agent Orchestration System

interface Task {
  id: string
  type: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedAgent: string
  data: any
  result?: any
  createdAt: Date
  completedAt?: Date
}

interface Agent {
  id: string
  name: string
  type: string
  status: 'idle' | 'busy' | 'offline'
  currentTask?: string
  completedTasks: number
  metrics: {
    successRate: number
    avgResponseTime: number
  }
}

interface Message {
  id: string
  from: string
  to: string
  type: string
  content: string
  timestamp: Date
}

class MultiAgentOrchestrator {
  private agents: Map<string, Agent> = new Map()
  private tasks: Map<string, Task> = new Map()
  private messages: Message[] = []
  private activities: any[] = []

  constructor() {
    this.initializeAgents()
  }

  private initializeAgents() {
    const agentTypes = [
      { id: 'policy-agent', name: 'Policy Generator', type: 'policy' },
      { id: 'budget-agent', name: 'Budget Optimizer', type: 'budget' },
      { id: 'forecast-agent', name: 'Forecasting Engine', type: 'forecast' },
    ]

    agentTypes.forEach(config => {
      this.agents.set(config.id, {
        ...config,
        status: 'idle',
        completedTasks: 0,
        metrics: {
          successRate: 0.95,
          avgResponseTime: 250
        }
      })
    })
  }

  createTask(taskData: any): Task {
    const task: Task = {
      id: `task_${Date.now()}`,
      type: taskData.type,
      status: 'pending',
      priority: taskData.priority || 'medium',
      assignedAgent: taskData.agent || 'policy-agent',
      data: taskData,
      createdAt: new Date()
    }
    
    this.tasks.set(task.id, task)
    this.addActivity({
      type: 'task_created',
      taskId: task.id,
      timestamp: new Date()
    })
    
    return task
  }

  async executeTask(taskId: string): Promise<any> {
    const task = this.tasks.get(taskId)
    if (!task) throw new Error('Task not found')

    task.status = 'in-progress'
    const agent = this.agents.get(task.assignedAgent)
    if (agent) {
      agent.status = 'busy'
      agent.currentTask = taskId
    }

    // Simulate task execution
    await new Promise(resolve => setTimeout(resolve, 1000))

    task.status = 'completed'
    task.completedAt = new Date()
    task.result = { success: true, data: 'Task completed' }

    if (agent) {
      agent.status = 'idle'
      agent.currentTask = undefined
      agent.completedTasks++
    }

    this.addActivity({
      type: 'task_completed',
      taskId: task.id,
      timestamp: new Date()
    })

    return task.result
  }

  async executeParallelTasks(taskIds: string[]): Promise<any[]> {
    const results = await Promise.all(
      taskIds.map(id => this.executeTask(id))
    )
    return results
  }

  async executeWorkflow(workflowType: string, data: any): Promise<any> {
    // Create and execute tasks based on workflow type
    const tasks = this.createWorkflowTasks(workflowType, data)
    const results = await this.executeParallelTasks(tasks.map(t => t.id))
    return { workflowType, results }
  }

  private createWorkflowTasks(workflowType: string, data: any): Task[] {
    const tasks: Task[] = []
    
    if (workflowType === 'esg_analysis') {
      tasks.push(this.createTask({ type: 'analyze_environment', agent: 'forecast-agent', ...data }))
      tasks.push(this.createTask({ type: 'analyze_social', agent: 'policy-agent', ...data }))
      tasks.push(this.createTask({ type: 'analyze_governance', agent: 'budget-agent', ...data }))
    }
    
    return tasks
  }

  getAllAgents(): Agent[] {
    return Array.from(this.agents.values())
  }

  getAllTasks(): Task[] {
    return Array.from(this.tasks.values())
  }

  getMessages(limit: number = 50): Message[] {
    return this.messages.slice(0, limit)
  }

  getAllActivities(): any[] {
    return this.activities
  }

  private addActivity(activity: any) {
    this.activities.unshift(activity)
    if (this.activities.length > 100) {
      this.activities = this.activities.slice(0, 100)
    }
  }

  sendMessage(from: string, to: string, content: string) {
    const message: Message = {
      id: `msg_${Date.now()}`,
      from,
      to,
      type: 'communication',
      content,
      timestamp: new Date()
    }
    this.messages.unshift(message)
    if (this.messages.length > 100) {
      this.messages = this.messages.slice(0, 100)
    }
  }
}

let orchestratorInstance: MultiAgentOrchestrator | null = null

export function getOrchestrator(): MultiAgentOrchestrator {
  if (!orchestratorInstance) {
    orchestratorInstance = new MultiAgentOrchestrator()
  }
  return orchestratorInstance
}

export default MultiAgentOrchestrator
