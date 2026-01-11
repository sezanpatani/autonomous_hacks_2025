'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRealtimeMetrics } from '@/lib/hooks'
import { useAppStore } from '@/store/appStore'
import { Activity } from 'lucide-react'

export default function ESGScoreMeter() {
  const { cityName } = useAppStore()
  const { data: metricsData, loading, isLive, lastUpdate } = useRealtimeMetrics(cityName)
  const [score, setScore] = useState(0)
  const [isPulsing, setIsPulsing] = useState(false)
  
  // Safely extract score with proper type checking
  const targetScore = typeof metricsData?.overall?.score === 'number' 
    ? Math.round(metricsData.overall.score) 
    : (typeof metricsData?.overall === 'number' ? Math.round(metricsData.overall) : 72)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (score < targetScore) {
        setScore((prev) => Math.min(prev + 1, targetScore))
      }
    }, 20)
    return () => clearTimeout(timer)
  }, [score, targetScore])

  // Trigger pulse animation when data updates
  useEffect(() => {
    if (lastUpdate) {
      setIsPulsing(true)
      const timer = setTimeout(() => setIsPulsing(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [lastUpdate])

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#3b82f6'
    if (score >= 40) return '#f59e0b'
    return '#ef4444'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  if (loading) {
    return (
      <div className="relative bg-white rounded-3xl shadow-xl p-8 animate-pulse">
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-400">Loading ESG metrics...</div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className={`relative bg-white rounded-3xl shadow-xl p-8 overflow-hidden ${
        isPulsing ? 'ring-4 ring-green-400 ring-opacity-50' : ''
      }`}
    >
      {/* LIVE Indicator */}
      {isLive && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 bg-white rounded-full"
          />
          LIVE
        </motion.div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Circular Score Meter */}
        <div className="flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isPulsing ? [1, 1.05, 1] : 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative"
          >
            <svg width="200" height="200" className="transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
              />
              {/* Animated Progress Circle */}
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={getScoreColor(score)}
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 502' }}
                animate={{
                  strokeDasharray: `${(score / 100) * 502} 502`,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>

            {/* Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={score}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-bold"
                style={{ color: getScoreColor(score) }}
              >
                {score}
              </motion.span>
              <span className="text-sm text-gray-500 font-medium">
                ESG Score
              </span>
            </div>

            {/* Pulse Effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: getScoreColor(score) }}
            />
          </motion.div>
        </div>

        {/* Score Details */}
        <div className="flex-1 space-y-4">
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-2">
              {getScoreLabel(score)} Performance
            </h3>
            <p className="text-gray-600">
              Your city is performing {getScoreLabel(score).toLowerCase()} across ESG metrics. 
              Keep monitoring to maintain sustainability goals.
            </p>
          </motion.div>

          {/* Sub-scores */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { 
                label: 'Environment', 
                score: Math.round(Number(metricsData?.environment?.score) || 75), 
                color: '#10b981' 
              },
              { 
                label: 'Social', 
                score: Math.round(Number(metricsData?.social?.score) || 72), 
                color: '#3b82f6' 
              },
              { 
                label: 'Governance', 
                score: Math.round(Number(metricsData?.governance?.score) || 68), 
                color: '#8b5cf6' 
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100"
              >
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: item.color }}
                >
                  {item.score}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {item.label}
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className="h-1 rounded-full mt-2 mx-auto"
                  style={{ backgroundColor: item.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
