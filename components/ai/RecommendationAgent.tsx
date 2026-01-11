'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Zap, Clock, DollarSign, TrendingUp, AlertTriangle, CheckCircle2, XCircle, Play } from 'lucide-react'
import { useState } from 'react'
import { useRecommendations, useActions } from '@/lib/hooks'
import { useAppStore } from '@/store/appStore'

export default function RecommendationAgentUI() {
  const { cityName } = useAppStore()
  const { data: recommendations, loading, refresh } = useRecommendations(cityName, { status: 'pending' })
  const { executeAction } = useActions(cityName)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [executing, setExecuting] = useState<string | null>(null)

  const filteredRecs = recommendations.filter(rec => 
    filter === 'all' || rec.priority === filter
  )

  const handleExecute = async (recommendationId: string, title: string) => {
    if (!confirm(`Execute action: ${title}?\n\nThis will update ESG metrics and log the action.`)) return
    
    try {
      setExecuting(recommendationId)
      await executeAction(recommendationId, `Autonomous AI execution`)
      alert('✅ Action executed successfully! ESG metrics updated.')
      refresh()
    } catch (error: any) {
      alert(`❌ Failed to execute: ${error.message}`)
    } finally {
      setExecuting(null)
    }
  }

  if (loading) {
    return <div className="text-center py-20">Loading recommendations...</div>
  }

  const priorityCounts = {
    high: recommendations.filter(r => r.priority === 'high').length,
    medium: recommendations.filter(r => r.priority === 'medium').length,
    low: recommendations.filter(r => r.priority === 'low').length,
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-orange-500 to-amber-600'
      case 'medium': return 'from-yellow-500 to-orange-400'
      case 'low': return 'from-green-500 to-emerald-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return Zap
      case 'medium': return TrendingUp
      case 'low': return CheckCircle2
      default: return Bot
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bot className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">Autonomous Recommendation Agent</h1>
            <p className="text-white/90">AI-driven actions with autonomous execution</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-1">Total Actions</div>
            <div className="text-3xl font-bold">{recommendations.length}</div>
          </div>
          <div className="bg-red-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-1">High Priority</div>
            <div className="text-3xl font-bold">{priorityCounts.high}</div>
          </div>
          <div className="bg-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-1">Medium</div>
            <div className="text-3xl font-bold">{priorityCounts.medium}</div>
          </div>
          <div className="bg-green-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-1">Low Priority</div>
            <div className="text-3xl font-bold">{priorityCounts.low}</div>
          </div>
        </div>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {['all', 'high', 'medium', 'low'].map((f) => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f as any)}
            className={`px-6 py-3 rounded-xl font-bold capitalize transition-all ${
              filter === f
                ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow hover:shadow-lg'
            }`}
          >
            {f}
            {f !== 'all' && (
              <span className="ml-2 px-2 py-1 bg-white/30 rounded-full text-xs">
                {f === 'high' && priorityCounts.high}
                {f === 'medium' && priorityCounts.medium}
                {f === 'low' && priorityCounts.low}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredRecs.map((rec, index) => {
            const Icon = getPriorityIcon(rec.priority)
            return (
              <motion.div
                key={rec._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Priority Badge */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`p-4 bg-gradient-to-br ${getPriorityColor(rec.priority)} rounded-xl shadow-lg flex-shrink-0`}
                  >
                    <Icon className="text-white" size={32} />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getPriorityColor(rec.priority)} text-white text-xs font-bold rounded-full mb-2`}>
                          {rec.priority} PRIORITY
                        </span>
                        <h3 className="text-xl font-bold text-gray-800">{rec.action}</h3>
                      </div>
                    </div>

                    {/* Reason */}
                    <p className="text-gray-600 mb-4">{rec.reason}</p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp size={16} className="text-blue-600" />
                          <span className="text-xs text-gray-600">Impact</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">+{rec.estimatedImpact}</div>
                      </div>

                      <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign size={16} className="text-green-600" />
                          <span className="text-xs text-gray-600">Cost</span>
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          ₹{(rec.estimatedCost / 10000000).toFixed(1)}Cr
                        </div>
                      </div>

                      <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock size={16} className="text-purple-600" />
                          <span className="text-xs text-gray-600">Timeline</span>
                        </div>
                        <div className="text-lg font-bold text-purple-600">{rec.estimatedTimeline}</div>
                      </div>

                      <div className="p-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap size={16} className="text-orange-600" />
                          <span className="text-xs text-gray-600">ROI</span>
                        </div>
                        <div className="text-xl font-bold text-orange-600">{rec.roi}%</div>
                      </div>
                    </div>

                    {/* Expected Outcome */}
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 mb-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="text-green-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <div className="font-semibold text-green-900 text-sm mb-1">AI Confidence: {(rec.confidence * 100).toFixed(0)}%</div>
                          <p className="text-sm text-gray-700">{rec.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleExecute(rec._id, rec.title)}
                        disabled={executing === rec._id}
                        className={`flex-1 py-3 px-6 bg-gradient-to-r ${getPriorityColor(rec.priority)} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 disabled:opacity-50`}
                      >
                        {executing === rec._id ? (
                          <>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                              <Play size={18} />
                            </motion.div>
                            Executing...
                          </>
                        ) : (
                          <>
                            <Play size={18} />
                            Execute Action
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => alert(`Module: ${rec.module}\nPriority: ${rec.priority}\nROI: ${rec.roi}%\nConfidence: ${(rec.confidence * 100).toFixed(0)}%`)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
                      >
                        Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {filteredRecs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-12 text-center shadow-xl"
        >
          <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">All Clear!</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? "No active recommendations. Great job managing your city's ESG performance!"
              : `No ${filter} priority recommendations at this time.`
            }
          </p>
        </motion.div>
      )}
    </div>
  )
}
