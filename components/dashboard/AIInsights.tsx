'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react'
import { AI_INSIGHTS } from '@/data/mockData'

const priorityConfig = {
  high: { icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  medium: { icon: Lightbulb, color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  low: { icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
}

export default function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-10 h-10 rounded-full gradient-esg flex items-center justify-center"
        >
          <span className="text-xl">🤖</span>
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
          <p className="text-sm text-gray-600">Real-time recommendations</p>
        </div>
      </div>

      <div className="space-y-4">
        {AI_INSIGHTS.map((insight, index) => {
          const config = priorityConfig[insight.priority as keyof typeof priorityConfig]
          const Icon = config.icon

          return (
            <motion.div
              key={insight.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 + index * 0.15 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className={`p-4 rounded-xl border-2 ${config.bgColor} ${config.borderColor} cursor-pointer group`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={`p-2 rounded-lg ${config.bgColor}`}
                >
                  <Icon className={config.color} size={20} />
                </motion.div>

                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">{insight.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      {insight.module}
                    </span>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className={`text-sm font-semibold ${config.color} flex items-center gap-1`}
                    >
                      {insight.action}
                      <ArrowRight size={14} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
