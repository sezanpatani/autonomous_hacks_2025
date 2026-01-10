import axios from 'axios'
import { CityData } from './cityData'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// API timeout and retry configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  }
})

// Add request interceptor for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message)
    return Promise.reject(error)
  }
)

// City Data API
export const cityAPI = {
  // Get complete city data
  async getCityData(cityName: string): Promise<CityData> {
    try {
      const response = await axiosInstance.get(`/cities/${cityName}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch city data:', error)
      throw error
    }
  },

  // Get ESG score only
  async getESGScore(cityName: string): Promise<number> {
    try {
      const response = await axiosInstance.get(`/cities/${cityName}/esg-score`)
      return response.data.score
    } catch (error) {
      console.error('Failed to fetch ESG score:', error)
      throw error
    }
  },

  // Get real-time AQI data
  async getAQIData(cityName: string) {
    try {
      const response = await axiosInstance.get(`/cities/${cityName}/aqi`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch AQI data:', error)
      throw error
    }
  },

  // Update city metrics
  async updateMetric(cityName: string, metric: string, value: number) {
    try {
      const response = await axiosInstance.put(`/cities/${cityName}/metrics`, {
        metric,
        value
      })
      return response.data
    } catch (error) {
      console.error('Failed to update metric:', error)
      throw error
    }
  }
}

// Complaints API
export const complaintsAPI = {
  // Submit new complaint
  async create(complaint: {
    category: string
    description: string
    location: string
    priority: 'Low' | 'Medium' | 'High'
    image?: File
  }) {
    try {
      const formData = new FormData()
      formData.append('category', complaint.category)
      formData.append('description', complaint.description)
      formData.append('location', complaint.location)
      formData.append('priority', complaint.priority)
      
      if (complaint.image) {
        formData.append('image', complaint.image)
      }

      const response = await axiosInstance.post('/complaints', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      console.error('Failed to create complaint:', error)
      throw error
    }
  },

  // Get all complaints
  async getAll(filters?: { status?: string; category?: string }) {
    try {
      const response = await axiosInstance.get('/complaints', { params: filters })
      return response.data
    } catch (error) {
      console.error('Failed to fetch complaints:', error)
      throw error
    }
  },

  // Update complaint status
  async updateStatus(complaintId: number, status: string) {
    try {
      const response = await axiosInstance.patch(`/complaints/${complaintId}`, { status })
      return response.data
    } catch (error) {
      console.error('Failed to update complaint:', error)
      throw error
    }
  }
}

// AI Predictions API
export const aiAPI = {
  // Get AI predictions
  async getPredictions(cityName: string, months: number) {
    try {
      const response = await axiosInstance.get('/ai/predictions', {
        params: { cityName, months }
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch predictions:', error)
      throw error
    }
  },

  // Get scenario simulation results
  async simulateScenario(cityName: string, scenario: any) {
    try {
      const response = await axiosInstance.post('/ai/simulate', {
        cityName,
        scenario
      })
      return response.data
    } catch (error) {
      console.error('Failed to simulate scenario:', error)
      throw error
    }
  },

  // Get causal analysis
  async getCausalAnalysis(cityName: string, problem: string) {
    try {
      const response = await axiosInstance.get('/ai/causal-analysis', {
        params: { cityName, problem }
      })
      return response.data
    } catch (error) {
      console.error('Failed to get causal analysis:', error)
      throw error
    }
  },

  // Get AI recommendations
  async getRecommendations(cityName: string) {
    try {
      const response = await axiosInstance.get('/ai/recommendations', {
        params: { cityName }
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch recommendations:', error)
      throw error
    }
  }
}

// Budget API
export const budgetAPI = {
  // Get current budget allocation
  async getAllocation(cityName: string) {
    try {
      const response = await axiosInstance.get(`/budget/${cityName}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch budget:', error)
      throw error
    }
  },

  // Optimize budget
  async optimize(cityName: string, constraints: any) {
    try {
      const response = await axiosInstance.post(`/budget/${cityName}/optimize`, constraints)
      return response.data
    } catch (error) {
      console.error('Failed to optimize budget:', error)
      throw error
    }
  }
}

// Analytics API
export const analyticsAPI = {
  // Get historical data
  async getHistoricalData(cityName: string, metric: string, period: string) {
    try {
      const response = await axiosInstance.get('/analytics/historical', {
        params: { cityName, metric, period }
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch historical data:', error)
      throw error
    }
  },

  // Get real-time metrics
  async getRealTimeMetrics(cityName: string) {
    try {
      const response = await axiosInstance.get('/analytics/realtime', {
        params: { cityName }
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch real-time metrics:', error)
      throw error
    }
  }
}

// Utility function to check API health
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get('/health')
    return response.data.status === 'ok'
  } catch (error) {
    console.error('API health check failed:', error)
    return false
  }
}

export default {
  city: cityAPI,
  complaints: complaintsAPI,
  ai: aiAPI,
  budget: budgetAPI,
  analytics: analyticsAPI,
  checkHealth: checkAPIHealth
}
