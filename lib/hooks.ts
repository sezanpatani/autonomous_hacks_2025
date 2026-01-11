import { useState, useEffect } from 'react'

export function useESGMetrics(cityName: string = 'Mumbai') {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/esg-metrics?city=${cityName}`)
      if (!res.ok) throw new Error('Failed to fetch metrics')
      const result = await res.json()
      setData(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [cityName])

  return { data, loading, error, refresh: fetchData }
}

export function useRecommendations(cityName: string = 'Mumbai', filters?: { status?: string; module?: string }) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({ city: cityName, ...filters })
      const res = await fetch(`/api/recommendations?${params}`)
      if (!res.ok) throw new Error('Failed to fetch recommendations')
      const result = await res.json()
      setData(result.recommendations || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [cityName, filters?.status, filters?.module])

  return { data, loading, error, refresh: fetchData }
}

export function usePredictions(cityName: string = 'Mumbai', type?: string) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const params = new URLSearchParams({ city: cityName })
        if (type) params.append('type', type)
        const res = await fetch(`/api/predictions?${params}`)
        if (!res.ok) throw new Error('Failed to fetch predictions')
        const result = await res.json()
        setData(result.predictions || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [cityName, type])

  return { data, loading, error }
}

export function useActions(cityName: string = 'Mumbai') {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/actions?city=${cityName}`)
      if (!res.ok) throw new Error('Failed to fetch actions')
      const result = await res.json()
      setData(result.actions || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [cityName])

  const executeAction = async (recommendationId: string, notes?: string) => {
    try {
      const res = await fetch('/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recommendationId, executedBy: 'AI Agent', notes })
      })
      if (!res.ok) throw new Error('Failed to execute action')
      await fetchData() // Refresh actions
      return await res.json()
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return { data, loading, error, executeAction, refresh: fetchData }
}

export function useAlerts(cityName: string = 'Mumbai') {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch(`/api/alerts?city=${cityName}`)
        if (!res.ok) throw new Error('Failed to fetch alerts')
        const result = await res.json()
        setData(result.alerts || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    
    // Poll for new alerts every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [cityName])

  return { data, loading, error }
}

// Real-time streaming hook using Server-Sent Events (SSE)
export function useRealtimeMetrics(cityName: string = 'Mumbai') {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLive, setIsLive] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    let eventSource: EventSource | null = null
    let reconnectTimeout: NodeJS.Timeout

    const connect = () => {
      try {
        // Create SSE connection
        eventSource = new EventSource(`/api/stream/metrics?cityName=${cityName}`)
        
        eventSource.onopen = () => {
          setIsLive(true)
          setLoading(false)
          setError(null)
        }
        
        eventSource.onmessage = (event) => {
          try {
            if (!event.data || event.data === '') return
            
            const newData = JSON.parse(event.data)
            
            // Validate data structure
            if (newData && typeof newData === 'object') {
              setData(newData)
              setLastUpdate(new Date())
              setIsLive(true)
            }
          } catch (err) {
            console.error('Failed to parse SSE data:', err, 'Raw data:', event.data)
          }
        }
        
        eventSource.onerror = (err) => {
          console.error('SSE error:', err)
          setIsLive(false)
          setError('Connection lost, reconnecting...')
          eventSource?.close()
          
          // Attempt reconnection after 5 seconds
          reconnectTimeout = setTimeout(() => {
            connect()
          }, 5000)
        }
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }

    connect()

    // Cleanup on unmount
    return () => {
      if (eventSource) {
        eventSource.close()
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
    }
  }, [cityName])

  return { data, loading, error, isLive, lastUpdate }
}

// Multi-Agent Activity Hook
export function useAgentActivity(pollingInterval: number = 3000) {
  const [agents, setAgents] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch('/api/agents?type=all')
      if (!res.ok) throw new Error('Failed to fetch agent activity')
      const data = await res.json()
      
      setAgents(data.agents || [])
      setTasks(data.tasks || [])
      setMessages(data.messages || [])
      setSummary(data.summary || null)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Poll for updates
    const interval = setInterval(fetchData, pollingInterval)
    return () => clearInterval(interval)
  }, [pollingInterval])

  const executeTask = async (taskId: string) => {
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'execute_task', taskId })
      })
      if (!res.ok) throw new Error('Failed to execute task')
      await fetchData() // Refresh data
      return await res.json()
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const createTask = async (taskData: any) => {
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_task', taskData })
      })
      if (!res.ok) throw new Error('Failed to create task')
      await fetchData()
      return await res.json()
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const orchestrateWorkflow = async (workflowType: string) => {
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'orchestrate_workflow', workflowType })
      })
      if (!res.ok) throw new Error('Failed to orchestrate workflow')
      await fetchData()
      return await res.json()
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return {
    agents,
    tasks,
    messages,
    summary,
    loading,
    error,
    executeTask,
    createTask,
    orchestrateWorkflow,
    refresh: fetchData
  }
}
