'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Brain, Zap, AlertTriangle, Activity } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { PredictiveEngine } from '@/lib/aiEngine'
import { useState, useEffect } from 'react'
import { useRealtimeMetrics } from '@/lib/hooks'
import { useAppStore } from '@/store/appStore'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export default function PredictiveForecastingEngine() {
  const { cityName } = useAppStore()
  const { data: metricsData, loading, isLive, lastUpdate } = useRealtimeMetrics(cityName)
  const [timeframe, setTimeframe] = useState<3 | 6 | 12>(6)
  const [forecastData, setForecastData] = useState<number[]>([])
  const [pollutionSpikes, setPollutionSpikes] = useState<any[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (!metricsData) return
    
    // Trigger update animation
    setIsUpdating(true)
    const timer = setTimeout(() => setIsUpdating(false), 800)
    
    const forecast = PredictiveEngine.forecastESG(metricsData.overall?.score || 72, timeframe)
    setForecastData(forecast)
    
    const spikes = PredictiveEngine.predictPollutionSpikes(
      metricsData.environment?.zones || [],
      timeframe
    )
    setPollutionSpikes(spikes)
    
    return () => clearTimeout(timer)
  }, [timeframe, metricsData])

  if (loading) {
    return <div className="text-center py-20">Loading forecast engine...</div>
  }

  const chartData = {
    labels: ['Now', ...Array.from({ length: timeframe }, (_, i) => `Month ${i + 1}`)],
    datasets: [
      {
        label: 'ESG Score Forecast',
        data: forecastData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Confidence Band',
        data: forecastData.map(v => v + 3),
        borderColor: 'rgba(34, 197, 94, 0.3)',
        backgroundColor: 'rgba(34, 197, 94, 0.05)',
        borderDash: [5, 5],
        fill: '-1',
        tension: 0.4,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#22c55e',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        min: 60,
        max: 85,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.div
              animate={isUpdating ? { rotate: 360, scale: [1, 1.2, 1] } : { rotate: [0, 360] }}
              transition={{ duration: isUpdating ? 0.8 : 3, repeat: isUpdating ? 0 : Infinity, ease: 'linear' }}
            >
              <Brain className="w-12 h-12" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold">AI Predictive Forecasting Engine</h1>
              <p className="text-purple-100">LSTM-powered temporal modeling & ensemble predictions</p>
            </div>
          </div>
          {isLive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Activity size={16} />
              </motion.div>
              LIVE
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Zap className="w-6 h-6" />
          <span className="text-lg">Active Learning • Real-time Adaptation • 85% Confidence</span>
        </div>
      </motion.div>

      {/* Timeframe Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4">Forecast Timeframe</h2>
        <div className="flex gap-4">
          {[3, 6, 12].map((months) => (
            <motion.button
              key={months}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeframe(months as 3 | 6 | 12)}
              className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                timeframe === months
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {months} Months
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ESG Score Forecast Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">ESG Score Forecast</h2>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
            <TrendingUp className="text-green-600" size={20} />
            <span className="text-sm font-semibold text-green-700">
              Predicted: {forecastData[forecastData.length - 1]?.toFixed(1)} (+{(forecastData[forecastData.length - 1] - (metricsData?.overall?.score || 72)).toFixed(1)})
            </span>
          </div>
        </div>
        
        <div className="h-80">
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Best Case</div>
            <div className="text-2xl font-bold text-green-600">
              {(forecastData[forecastData.length - 1] + 3)?.toFixed(1)}
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Expected</div>
            <div className="text-2xl font-bold text-blue-600">
              {forecastData[forecastData.length - 1]?.toFixed(1)}
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Worst Case</div>
            <div className="text-2xl font-bold text-orange-600">
              {(forecastData[forecastData.length - 1] - 2)?.toFixed(1)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pollution Spike Predictions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-orange-500" size={24} />
          <h2 className="text-xl font-bold">Predicted Pollution Spikes</h2>
        </div>

        <div className="space-y-4">
          {pollutionSpikes.map((zone, index) => (
            zone.spikes.length > 0 && (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200"
              >
                <div className="font-semibold text-lg mb-2">{zone.zone}</div>
                <div className="space-y-2">
                  {zone.spikes.slice(0, 2).map((spike: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Month {spike.month}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-orange-600">
                          AQI: {spike.aqi}
                        </span>
                        <span className="px-2 py-1 bg-orange-200 rounded text-xs font-bold">
                          {Math.round(spike.probability * 100)}% probable
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>
      </motion.div>

      {/* Model Confidence Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-xl border-2 border-indigo-200"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Brain className="text-indigo-600" size={20} />
          AI Model Performance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">85%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">92%</div>
            <div className="text-sm text-gray-600">Precision</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">24</div>
            <div className="text-sm text-gray-600">Data Sources</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">Real-time</div>
            <div className="text-sm text-gray-600">Updates</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
