'use client'

import { motion } from 'framer-motion'
import { Droplets, Zap, Recycle, Wind } from 'lucide-react'
import { useRealtimeMetrics } from '@/lib/hooks'
import { useAppStore } from '@/store/appStore'
import { useEffect, useState } from 'react'

export default function QuickStats() {
  const { cityName } = useAppStore()
  const { data: metricsData, loading, lastUpdate } = useRealtimeMetrics(cityName)
  const [pulsingIndex, setPulsingIndex] = useState<number | null>(null)

  // Trigger pulse animation on specific stat when data updates
  useEffect(() => {
    if (lastUpdate) {
      const randomIndex = Math.floor(Math.random() * 4)
      setPulsingIndex(randomIndex)
      const timer = setTimeout(() => setPulsingIndex(null), 1000)
      return () => clearTimeout(timer)
    }
  }, [lastUpdate])

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-lg animate-pulse">
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const stats = [
    {
      icon: Wind,
      label: 'Air Quality Index',
      value: Math.round(metricsData?.environment?.aqi) || 0,
      unit: 'AQI',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
    },
    {
      icon: Droplets,
      label: 'Water Quality',
      value: Math.round(metricsData?.environment?.waterQuality) || 0,
      unit: '%',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Zap,
      label: 'Energy Efficiency',
      value: Math.round(metricsData?.environment?.energyEfficiency) || 0,
      unit: '%',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: Recycle,
      label: 'Waste Recycling',
      value: Math.round(metricsData?.environment?.wasteRecycling) || 0,
      unit: '%',
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
  ]
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.1,
            type: 'spring',
            stiffness: 200,
          }}
          whileHover={{ scale: 1.05 }}
          className={`bg-white rounded-xl p-4 shadow-lg transition-all ${
            pulsingIndex === index ? 'ring-4 ring-blue-400 ring-opacity-50 scale-105' : ''
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-2 h-2 rounded-full bg-green-500"
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="space-y-1"
          >
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm text-gray-500">{stat.unit}</span>
            </div>
            <p className="text-xs text-gray-600 leading-tight">
              {stat.label}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
