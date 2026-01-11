'use client'

import { motion } from 'framer-motion'
import { Wind, Droplets, Zap, Recycle, Trees, AlertTriangle, Leaf } from 'lucide-react'
import { useESGMetrics } from '@/lib/hooks'
import { useAppStore } from '@/store/appStore'
import { useState } from 'react'

export default function EnvironmentModule() {
  const { cityName } = useAppStore()
  const { data: metricsData, loading } = useESGMetrics(cityName)
  const [simulationValue, setSimulationValue] = useState(50)

  if (loading) {
    return <div className="text-center py-20">Loading environment data...</div>
  }

  const ESG_DATA = metricsData || {
    environment: {
      score: 72,
      wasteRecycling: 45,
      zones: [
        { id: 1, name: 'Zone-1', aqi: 145, status: 'moderate', population: 125000 },
        { id: 2, name: 'Zone-2', aqi: 168, status: 'unhealthy', population: 98000 },
        { id: 3, name: 'Zone-3', aqi: 132, status: 'moderate', population: 110000 },
        { id: 4, name: 'Zone-4', aqi: 151, status: 'unhealthy', population: 87000 }
      ]
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-400 to-emerald-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Leaf className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">Environment</h1>
            <p className="text-green-100">Air, Water, Energy & Waste Management</p>
          </div>
        </div>
        <div className="text-5xl font-bold">{ESG_DATA.environment?.score || 72}</div>
      </motion.div>

      {/* AQI Zones with Pollution Clouds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Wind className="text-orange-500" />
          Air Quality by Zone
        </h2>
        <div className="space-y-4">
          {(ESG_DATA.environment?.zones || []).map((zone: any, index: number) => (
            <motion.div
              key={zone.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{zone.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold" style={{ color: zone.color }}>
                    {zone.aqi}
                  </span>
                  <AlertTriangle className="text-orange-500" size={20} />
                </div>
              </div>
              
              {/* Animated Progress Bar with Pollution Cloud */}
              <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(zone.aqi / 200) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  className="h-full rounded-full relative"
                  style={{ backgroundColor: zone.color }}
                >
                  {/* Pollution Cloud Animation */}
                  <motion.div
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 blur-sm"
                    style={{ backgroundColor: zone.color }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
        >
          <p className="text-sm">
            <span className="font-semibold">🤖 AI Recommendation:</span> Zone-1 and Zone-4 need immediate attention. 
            Increase electric vehicles by 30% to reduce AQI by 20 points.
          </p>
        </motion.div>
      </motion.div>

      {/* Water & Energy Flow Animations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Water Quality */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Droplets className="text-blue-500" />
            Water Quality
          </h3>
          <div className="relative h-48 bg-gradient-to-b from-blue-100 to-blue-300 rounded-xl overflow-hidden">
            {/* Animated Water Waves */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
                className="absolute bottom-0 left-0 right-0 h-24 bg-blue-400 rounded-full blur-xl"
                style={{ transform: `translateY(${i * 20}px)` }}
              />
            ))}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white">
                <div className="text-5xl font-bold">{ESG_DATA?.environment?.waterQuality || 0}%</div>
                <div className="text-sm mt-2">Quality Score</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Energy Efficiency */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500" />
            Energy Efficiency
          </h3>
          <div className="relative h-48 bg-gradient-to-t from-yellow-100 to-yellow-300 rounded-xl overflow-hidden">
            {/* Animated Energy Flow */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: ['100%', '-100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.4,
                }}
                className="absolute left-1/2 w-1 bg-yellow-400 opacity-70"
                style={{ 
                  height: '20px',
                  transform: `translateX(${(i - 2) * 20}px)`,
                }}
              />
            ))}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-gray-800">
                <div className="text-5xl font-bold">{ESG_DATA?.environment?.energyEfficiency || 0}%</div>
                <div className="text-sm mt-2">Efficiency Rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Waste Recycling Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Recycle className="text-green-500" />
          Waste Recycling Progress
        </h3>
        
        {/* Recycling Animation */}
        <div className="relative h-32 bg-gray-100 rounded-xl overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${ESG_DATA?.environment?.wasteRecycling || 0}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-end pr-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Recycle className="text-white" size={32} />
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-700">
              {ESG_DATA.environment?.wasteRecycling || 45}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Current: {ESG_DATA.environment?.wasteRecycling || 45}%</span>
          <span className="text-green-600 font-semibold">Target: 60%</span>
        </div>
      </motion.div>

      {/* Future Impact Simulator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 shadow-xl"
      >
        <h3 className="text-lg font-bold mb-4">🔮 Future Impact Simulator</h3>
        <p className="text-sm text-gray-600 mb-4">
          Simulate the impact of increasing electric buses on AQI
        </p>
        
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">
            Electric Buses Increase: {simulationValue}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={simulationValue}
            onChange={(e) => setSimulationValue(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <motion.div
          key={simulationValue}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 bg-white rounded-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Projected AQI Reduction:</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              className="text-2xl font-bold text-green-600"
            >
              -{Math.round(simulationValue * 0.3)} points
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
