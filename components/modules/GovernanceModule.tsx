'use client'

import { motion } from 'framer-motion'
import { Building2, CheckCircle, Clock, FileText, TrendingUp, AlertCircle } from 'lucide-react'
import { useESGMetrics } from '@/lib/hooks'
import { useAppStore } from '@/store/appStore'

export default function GovernanceModule() {
  const { cityName } = useAppStore()
  const { data: metricsData, loading } = useESGMetrics(cityName)

  if (loading) {
    return <div className="text-center py-20">Loading governance data...</div>
  }

  const ESG_DATA = metricsData || {
    governance: {
      score: 80,
      transparency: 85,
      compliance: 88,
      budgetUtilization: 82,
      responseTime: 76
    }
  }

  const complianceItems = [
    { name: 'Budget Transparency', status: 'completed', score: 92 },
    { name: 'Audit Reports', status: 'completed', score: 88 },
    { name: 'Public Procurement', status: 'pending', score: 75 },
    { name: 'Policy Implementation', status: 'completed', score: 85 },
    { name: 'Citizen Grievances', status: 'in-progress', score: 78 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Building2 className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">Governance</h1>
            <p className="text-purple-100">Transparency, Compliance & Digital Services</p>
          </div>
        </div>
        <div className="text-5xl font-bold">{ESG_DATA.governance?.score || 80}</div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Transparency', value: ESG_DATA.governance?.transparency || 85, icon: '🔍' },
          { label: 'Compliance', value: ESG_DATA.governance?.compliance || 88, icon: '✅' },
          { label: 'Budget Use', value: ESG_DATA.governance?.budgetUtilization || 82, icon: '💰' },
          { label: 'Response Time', value: ESG_DATA.governance?.responseTime || 76, icon: '⚡' },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-morphism rounded-xl p-4 shadow-lg"
          >
            <div className="text-3xl mb-2">{metric.icon}</div>
            <div className="text-3xl font-bold text-purple-600 mb-1">{metric.value}</div>
            <div className="text-sm text-gray-700 font-medium">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Compliance Checklist with Animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          Compliance Checklist
        </h2>
        
        <div className="space-y-4">
          {complianceItems.map((item, index) => {
            const statusConfig = {
              completed: { color: 'green', icon: CheckCircle, bg: 'bg-green-100' },
              'in-progress': { color: 'yellow', icon: Clock, bg: 'bg-yellow-100' },
              pending: { color: 'orange', icon: AlertCircle, bg: 'bg-orange-100' },
            }
            const config = statusConfig[item.status as keyof typeof statusConfig]
            const Icon = config.icon

            return (
              <motion.div
                key={item.name}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="glass-morphism rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${config.bg}`}>
                      <Icon className={`text-${config.color}-600`} size={20} />
                    </div>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-purple-600">
                      {item.score}
                    </span>
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    className={`h-full bg-gradient-to-r from-purple-400 to-purple-600`}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Tasks Progress */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="text-orange-500" />
            Pending Tasks
          </h3>
          
          <div className="flex items-end gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-6xl font-bold text-orange-600"
            >
              {ESG_DATA?.governance?.pendingTasks || 0}
            </motion.div>
            <div className="text-sm text-gray-600 mb-2">tasks requiring attention</div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="mt-4 h-2 bg-orange-300 rounded-full"
          />
        </motion.div>

        {/* Completed Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            Completed Tasks
          </h3>
          
          <div className="flex items-end gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-6xl font-bold text-green-600"
            >
              {ESG_DATA?.governance?.completedTasks || 0}
            </motion.div>
            <div className="text-sm text-gray-600 mb-2">tasks completed</div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="mt-4 h-2 bg-green-300 rounded-full"
          />
        </motion.div>
      </div>

      {/* Progress Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="text-purple-500" />
          Quarterly Progress Timeline
        </h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-purple-600" />
          
          {/* Timeline Items */}
          <div className="space-y-8">
            {[
              { quarter: 'Q1 2026', achievement: 'Digital services launched', score: 85, status: 'completed' },
              { quarter: 'Q2 2026', achievement: 'Budget transparency improved', score: 78, status: 'completed' },
              { quarter: 'Q3 2026', achievement: 'Audit compliance enhanced', score: 92, status: 'in-progress' },
              { quarter: 'Q4 2026', achievement: 'Full digital transformation', score: 95, status: 'upcoming' },
            ].map((item, index) => (
              <motion.div
                key={item.quarter}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="relative flex items-start gap-6"
              >
                {/* Timeline Dot */}
                <motion.div
                  animate={item.status === 'in-progress' ? {
                    scale: [1, 1.3, 1],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: item.status === 'in-progress' ? Infinity : 0,
                  }}
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'in-progress' ? 'bg-yellow-500' :
                    'bg-gray-300'
                  }`}
                >
                  <span className="text-white font-bold">{item.score}</span>
                </motion.div>

                {/* Content */}
                <div className="flex-1 glass-morphism rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-purple-600">{item.quarter}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'completed' ? 'bg-green-100 text-green-700' :
                      item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-700">{item.achievement}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Risk Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <AlertCircle className="text-purple-600" size={24} />
          </motion.div>
          <h2 className="text-xl font-bold">AI Risk Highlights</h2>
        </div>
        
        <div className="space-y-3">
          {[
            { risk: 'Public Procurement delays in Zone-3', level: 'medium', action: 'Automate approval process' },
            { risk: 'Budget utilization below 80% in infrastructure', level: 'low', action: 'Review allocation' },
            { risk: 'Citizen grievance response time increasing', level: 'high', action: 'Add support staff' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
              className={`p-4 rounded-xl border-2 ${
                item.level === 'high' ? 'bg-red-50 border-red-200' :
                item.level === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-semibold text-gray-800">{item.risk}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  item.level === 'high' ? 'bg-red-200 text-red-700' :
                  item.level === 'medium' ? 'bg-yellow-200 text-yellow-700' :
                  'bg-green-200 text-green-700'
                }`}>
                  {item.level.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">AI Suggests:</span> {item.action}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
