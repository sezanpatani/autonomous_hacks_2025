'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { History, CheckCircle2, Clock, TrendingUp, Calendar, User, DollarSign } from 'lucide-react'
import { useActions } from '@/lib/hooks'
import { useAppStore } from '@/store/appStore'
import { formatDistance } from 'date-fns'

export default function ActionHistoryDashboard() {
  const { cityName } = useAppStore()
  const { data: actions, loading } = useActions(cityName)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <History size={48} className="text-blue-500" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <History className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">Autonomous Action History</h1>
            <p className="text-white/90">Track all AI-executed actions and their impact</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-1">Total Actions</div>
            <div className="text-3xl font-bold">{actions.length}</div>
          </div>
          <div className="bg-green-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-1">Completed</div>
            <div className="text-3xl font-bold">{actions.length}</div>
          </div>
          <div className="bg-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-1">Total Impact</div>
            <div className="text-3xl font-bold">
              +{actions.reduce((sum, a) => sum + (a.estimatedImpact || 0), 0)}
            </div>
          </div>
          <div className="bg-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-1">Total Cost</div>
            <div className="text-2xl font-bold">
              ₹{(actions.reduce((sum, a) => sum + (a.cost || 0), 0) / 10000000).toFixed(1)}Cr
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Timeline */}
      <div className="bg-white rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Clock className="text-purple-600" />
          Execution Timeline
        </h2>

        {actions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <History size={64} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">No actions executed yet</p>
            <p className="text-sm">Execute AI recommendations to see history</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {actions.map((action, index) => (
                <motion.div
                  key={action._id || index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  {/* Timeline Line */}
                  {index < actions.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 to-transparent" />
                  )}

                  {/* Action Card */}
                  <div className="flex gap-4">
                    {/* Timeline Dot */}
                    <div className="flex-shrink-0 relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 + 0.2 }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg"
                      >
                        <CheckCircle2 className="text-white" size={24} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600">{action.notes}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            action.module === 'environment' ? 'bg-green-200 text-green-800' :
                            action.module === 'social' ? 'bg-blue-200 text-blue-800' :
                            'bg-purple-200 text-purple-800'
                          }`}>
                            {action.module}
                          </span>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp size={14} className="text-green-600" />
                            <span className="text-xs text-gray-600">Impact</span>
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            +{action.estimatedImpact || 0}
                          </div>
                        </div>

                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign size={14} className="text-blue-600" />
                            <span className="text-xs text-gray-600">Cost</span>
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            ₹{((action.cost || 0) / 10000000).toFixed(1)}Cr
                          </div>
                        </div>

                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <User size={14} className="text-purple-600" />
                            <span className="text-xs text-gray-600">Executor</span>
                          </div>
                          <div className="text-sm font-bold text-purple-600">
                            {action.executedBy || 'AI Agent'}
                          </div>
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={12} />
                        <span>
                          {action.executedAt 
                            ? formatDistance(new Date(action.executedAt), new Date(), { addSuffix: true })
                            : 'Just now'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
