'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cityAPI, checkAPIHealth } from '@/lib/api'
import { getCurrentCityData, CityData } from '@/lib/cityData'
import { Database, RefreshCw, CheckCircle, XCircle } from 'lucide-react'

/**
 * EXAMPLE: How to use backend data in your components
 * 
 * This component shows:
 * 1. How to check if backend is available
 * 2. How to fetch data from API
 * 3. How to fallback to local data if API fails
 * 4. How to display real-time data
 */

export default function DataSourceExample() {
  const [cityData, setCityData] = useState<CityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const [dataSource, setDataSource] = useState<'api' | 'local'>('local')
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Check API health on mount
  useEffect(() => {
    checkBackendHealth()
  }, [])

  // Fetch data on mount and refresh every 30 seconds
  useEffect(() => {
    fetchCityData()
    
    const interval = setInterval(() => {
      fetchCityData()
    }, 30000) // 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const checkBackendHealth = async () => {
    setApiStatus('checking')
    const isHealthy = await checkAPIHealth()
    setApiStatus(isHealthy ? 'online' : 'offline')
  }

  const fetchCityData = async () => {
    setLoading(true)
    try {
      // Try to fetch from backend API
      const data = await cityAPI.getCityData('Mumbai')
      setCityData(data)
      setDataSource('api')
      setApiStatus('online')
      console.log('✅ Data loaded from API:', data)
    } catch (error) {
      // Fallback to local data if API fails
      console.warn('⚠️ API unavailable, using local data')
      const localData = getCurrentCityData()
      setCityData(localData)
      setDataSource('local')
      setApiStatus('offline')
    } finally {
      setLoading(false)
      setLastUpdate(new Date())
    }
  }

  if (loading && !cityData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <RefreshCw size={48} className="text-blue-500" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* API Status Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Data Source Status</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchCityData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* API Status */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Database size={20} className="text-blue-500" />
              <span className="font-semibold">Backend API</span>
            </div>
            <div className="flex items-center gap-2">
              {apiStatus === 'online' ? (
                <>
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-green-600 font-bold">Online</span>
                </>
              ) : apiStatus === 'offline' ? (
                <>
                  <XCircle size={20} className="text-red-500" />
                  <span className="text-red-600 font-bold">Offline</span>
                </>
              ) : (
                <span className="text-gray-500">Checking...</span>
              )}
            </div>
          </div>

          {/* Data Source */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="font-semibold mb-2">Data Source</div>
            <div className={`font-bold ${dataSource === 'api' ? 'text-green-600' : 'text-orange-600'}`}>
              {dataSource === 'api' ? '🌐 Live API' : '💾 Local Data'}
            </div>
          </div>

          {/* Last Update */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="font-semibold mb-2">Last Updated</div>
            <div className="text-sm text-gray-600">
              {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </motion.div>

      {/* City Data Display */}
      {cityData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {cityData.cityName} - ESG Data
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* ESG Score */}
            <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white">
              <div className="text-sm opacity-90">ESG Score</div>
              <div className="text-4xl font-bold">{cityData.esgScore}</div>
              <div className="text-xs mt-1">out of 100</div>
            </div>

            {/* AQI */}
            <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white">
              <div className="text-sm opacity-90">Air Quality Index</div>
              <div className="text-4xl font-bold">{cityData.environment.airQuality.aqi}</div>
              <div className="text-xs mt-1">PM2.5: {cityData.environment.airQuality.pm25}</div>
            </div>

            {/* Water Quality */}
            <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white">
              <div className="text-sm opacity-90">Water Quality</div>
              <div className="text-4xl font-bold">{cityData.environment.water.quality}</div>
              <div className="text-xs mt-1">{cityData.environment.water.wastewaterTreated}% treated</div>
            </div>

            {/* Renewable Energy */}
            <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white">
              <div className="text-sm opacity-90">Renewable Energy</div>
              <div className="text-4xl font-bold">{cityData.environment.energy.renewable}%</div>
              <div className="text-xs mt-1">{cityData.environment.energy.solarCapacity}MW solar</div>
            </div>
          </div>

          {/* Environment Details */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-lg mb-4">Environment Metrics</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Energy:</span>
                <span className="font-bold ml-2">{cityData.environment.energy.totalConsumption} MWh</span>
              </div>
              <div>
                <span className="text-gray-600">Waste Generated:</span>
                <span className="font-bold ml-2">{cityData.environment.waste.totalWaste} tons/day</span>
              </div>
              <div>
                <span className="text-gray-600">Waste Recycled:</span>
                <span className="font-bold ml-2">{cityData.environment.waste.recycled}%</span>
              </div>
              <div>
                <span className="text-gray-600">Water Consumption:</span>
                <span className="font-bold ml-2">{cityData.environment.water.consumption} ML/day</span>
              </div>
            </div>
          </div>

          {/* Social Metrics */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-lg mb-4">Social Metrics</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Literacy Rate:</span>
                <span className="font-bold ml-2">{cityData.social.education.literacyRate}%</span>
              </div>
              <div>
                <span className="text-gray-600">Healthcare Facilities:</span>
                <span className="font-bold ml-2">{cityData.social.healthcare.hospitals} hospitals</span>
              </div>
              <div>
                <span className="text-gray-600">Employment Rate:</span>
                <span className="font-bold ml-2">{cityData.social.employment.rate}%</span>
              </div>
              <div>
                <span className="text-gray-600">Vaccination:</span>
                <span className="font-bold ml-2">{cityData.social.healthcare.vaccination}%</span>
              </div>
            </div>
          </div>

          {/* Governance Metrics */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-lg mb-4">Governance Metrics</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Transparency Score:</span>
                <span className="font-bold ml-2">{cityData.governance.transparency.score}/100</span>
              </div>
              <div>
                <span className="text-gray-600">Citizen Engagement:</span>
                <span className="font-bold ml-2">{cityData.governance.participation.engagedCitizens.toLocaleString()} users</span>
              </div>
              <div>
                <span className="text-gray-600">E-Governance Services:</span>
                <span className="font-bold ml-2">{cityData.governance.digitalGovernance.eGovernanceServices}</span>
              </div>
              <div>
                <span className="text-gray-600">Digital Payments:</span>
                <span className="font-bold ml-2">{cityData.governance.digitalGovernance.digitalPayments}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* How to Use Guide */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white"
      >
        <h3 className="text-xl font-bold mb-4">📚 How This Works</h3>
        <div className="space-y-2 text-sm">
          <p>✅ <strong>Backend API:</strong> Tries to fetch data from /api/cities/Mumbai</p>
          <p>✅ <strong>Fallback:</strong> Uses local data from lib/cityData.ts if API fails</p>
          <p>✅ <strong>Auto-refresh:</strong> Updates every 30 seconds</p>
          <p>✅ <strong>Health Check:</strong> Monitors API availability</p>
        </div>
        
        <div className="mt-4 p-4 bg-white/20 rounded-xl">
          <p className="font-semibold mb-2">To change data:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Edit <code className="bg-black/20 px-2 py-1 rounded">lib/cityData.ts</code></li>
            <li>Or connect to your own backend API</li>
            <li>Or use Next.js API routes in <code className="bg-black/20 px-2 py-1 rounded">app/api/</code></li>
          </ol>
        </div>
      </motion.div>
    </div>
  )
}
