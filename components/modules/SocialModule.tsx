'use client'

import { motion } from 'framer-motion'
import { Users, GraduationCap, Heart, Shield, Home, MessageSquare, MapPin } from 'lucide-react'
import { useESGMetrics } from '@/lib/hooks'
import { useAppStore } from '@/store/appStore'
import { useState } from 'react'

const heatmapData = [
  { zone: 'Zone-1', education: 85, healthcare: 65, x: 1, y: 1 },
  { zone: 'Zone-2', education: 78, healthcare: 72, x: 2, y: 1 },
  { zone: 'Zone-3', education: 65, healthcare: 58, x: 1, y: 2 },
  { zone: 'Zone-4', education: 82, healthcare: 78, x: 2, y: 2 },
]

export default function SocialModule() {
  const { cityName } = useAppStore()
  const { data: metricsData, loading } = useESGMetrics(cityName)
  const [selectedMetric, setSelectedMetric] = useState<'education' | 'healthcare'>('education')
  const [reportText, setReportText] = useState('')

  if (loading) {
    return <div className="text-center py-20">Loading social metrics...</div>
  }

  const ESG_DATA = metricsData || {
    social: {
      score: 75,
      education: 80,
      healthcare: 75,
      safety: 85,
      housingAccess: 70,
      issues: []
    }
  }

  const submitIssue = () => {
    if (!reportText.trim()) return
    alert(`Issue reported successfully! Our team will respond within 24 hours.\n\nYour report: "${reportText}"`)
    setReportText('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Users className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">Social</h1>
            <p className="text-blue-100">Health, Education, Safety & Community</p>
          </div>
        </div>
        <div className="text-5xl font-bold">{ESG_DATA.social?.score || 75}</div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: GraduationCap, label: 'Education', value: ESG_DATA.social?.education || 80, color: 'blue' },
          { icon: Heart, label: 'Healthcare', value: ESG_DATA.social?.healthcare || 75, color: 'red' },
          { icon: Shield, label: 'Safety', value: ESG_DATA.social?.safety || 85, color: 'green' },
          { icon: Home, label: 'Housing', value: ESG_DATA.social?.housingAccess || 70, color: 'purple' },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-xl p-4 shadow-lg"
          >
            <div className={`p-3 rounded-lg bg-${metric.color}-100 inline-block mb-3`}>
              <metric.icon className={`text-${metric.color}-600`} size={24} />
            </div>
            <div className="text-3xl font-bold mb-1">{metric.value}</div>
            <div className="text-sm text-gray-600">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Access Heatmap</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMetric('education')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedMetric === 'education'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🎓 Education
            </button>
            <button
              onClick={() => setSelectedMetric('healthcare')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedMetric === 'healthcare'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ❤️ Healthcare
            </button>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {heatmapData.map((zone, index) => {
            const value = selectedMetric === 'education' ? zone.education : zone.healthcare
            const color = value >= 80 ? '#10b981' : value >= 70 ? '#3b82f6' : value >= 60 ? '#f59e0b' : '#ef4444'
            
            return (
              <motion.div
                key={zone.zone}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                className="relative aspect-square rounded-xl p-4 cursor-pointer"
                style={{ backgroundColor: `${color}20`, border: `2px solid ${color}` }}
              >
                {/* Heat Pulse Effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 rounded-xl"
                  style={{ backgroundColor: color }}
                />

                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <MapPin style={{ color }} size={24} />
                  <div className="text-2xl font-bold mt-2" style={{ color }}>
                    {value}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    {zone.zone}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-6 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>High (80+)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Good (70-80)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Fair (60-70)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Low (&lt;60)</span>
          </div>
        </div>
      </motion.div>

      {/* Community Issues */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="text-orange-500" />
          Community Issues
        </h2>
        
        <div className="space-y-3">
          {(ESG_DATA?.social?.issues || []).map((issue: any, index: number) => (
            <motion.div
              key={issue.type}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  issue.urgent > 5 ? 'bg-red-100' : 'bg-yellow-100'
                }`}>
                  <span className="text-xl">
                    {issue.type === 'healthcare' ? '❤️' : issue.type === 'education' ? '🎓' : '🛡️'}
                  </span>
                </div>
                <div>
                  <div className="font-semibold capitalize">{issue.type}</div>
                  <div className="text-sm text-gray-600">
                    {issue.count} total • {issue.urgent} urgent
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  issue.urgent > 5 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {issue.urgent} Urgent
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* One-Tap Issue Reporting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4">📢 Report an Issue</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your voice matters! Report any social issues in your area.
        </p>
        
        <div className="space-y-4">
          <textarea
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            placeholder="Describe the issue... (e.g., 'Need better street lighting in Zone-2')"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none"
            rows={3}
          />
          
          <div className="flex gap-2 flex-wrap">
            {['Healthcare', 'Education', 'Safety', 'Transport', 'Water', 'Other'].map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600"
              >
                {tag}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={submitIssue}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg"
          >
            Submit Report
          </motion.button>
        </div>

        {/* Emoji Feedback */}
        <div className="mt-6 p-4 bg-white rounded-xl">
          <p className="text-sm font-medium mb-3 text-center">Quick Feedback</p>
          <div className="flex justify-center gap-4">
            {['😊', '😐', '😟', '😡'].map((emoji) => (
              <motion.button
                key={emoji}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className="text-4xl hover:drop-shadow-lg"
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
