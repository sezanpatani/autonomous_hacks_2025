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
      const params = new URLSearchParams({ city: cityName })
      if (filters?.status) params.append('status', filters.status)
      if (filters?.module) params.append('module', filters.module)
      
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

export function useAlerts(cityName: string = 'Mumbai') {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
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

  useEffect(() => {
    fetchData()
  }, [cityName])

  return { data, loading, error, refresh: fetchData }
}

export function usePredictions(cityName: string = 'Mumbai', type: string = 'all') {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/predictions?city=${cityName}&type=${type}`)
      if (!res.ok) throw new Error('Failed to fetch predictions')
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
  }, [cityName, type])

  return { data, loading, error, refresh: fetchData }
}

export function useActions(cityName: string = 'Mumbai') {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeAction = async (recommendationId: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recommendationId, cityName })
      })
      if (!res.ok) throw new Error('Failed to execute action')
      const result = await res.json()
      return result
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { executeAction, loading, error }
}

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

export function useMultiAgentActivity() {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let eventSource: EventSource | null = null

    try {
      eventSource = new EventSource('/api/stream/agents')
      
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          setActivities(prev => [data, ...prev].slice(0, 50))
          setLoading(false)
        } catch (err) {
          console.error('Failed to parse agent activity:', err)
        }
      }
    } catch (err) {
      console.error('Failed to connect to agent stream:', err)
      setLoading(false)
    }

    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [])

  return { activities, loading }
}

export function useRealtimePredictions(cityName: string = 'Mumbai') {
  const [predictions, setPredictions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let eventSource: EventSource | null = null

    try {
      eventSource = new EventSource(`/api/stream/predictions?cityName=${cityName}`)
      
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          setPredictions([data])
          setLoading(false)
        } catch (err) {
          console.error('Failed to parse predictions:', err)
        }
      }
    } catch (err) {
      console.error('Failed to connect to predictions stream:', err)
      setLoading(false)
    }

    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [cityName])

  return { predictions, loading }
}
