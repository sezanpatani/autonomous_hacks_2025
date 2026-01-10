'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, CloudRain, Flame, Wind, MapPin, Clock, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { EarlyWarningSystem } from '@/lib/aiEngine'

export default function EarlyWarningDashboard() {
  const [risks, setRisks] = useState<any[]>([])
  const [selectedRisk, setSelectedRisk] = useState<any>(null)

  useEffect(() => {
    const detectedRisks = EarlyWarningSystem.detectRisks({
      rainfall: 85,
      temperature: 42,
      aqi: 185,
      waterLevel: 78
    })
    setRisks(detectedRisks)
    if (detectedRisks.length > 0) {
      setSelectedRisk(detectedRisks[0])
    }
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'from-red-600 to-rose-700'
      case 'high': return 'from-orange-500 to-red-600'
      case 'medium': return 'from-yellow-500 to-orange-500'
      case 'low': return 'from-green-500 to-emerald-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getRiskIcon = (type: string) => {
    if (type.includes('Flood')) return CloudRain
    if (type.includes('Heatwave')) return Flame
    if (type.includes('AQI')) return Wind
    return AlertTriangle
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <div className="relative z-10 flex items-center gap-4 mb-4">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertTriangle className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">Early Warning System</h1>
            <p className="text-white/90">Real-time risk detection & predictive alerts</p>
          </div>
        </div>

        {/* Active Alerts Count */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-1">Total Risks</div>
            <div className="text-3xl font-bold">{risks.length}</div>
          </div>
          <div className="bg-red-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-1">Critical</div>
            <div className="text-3xl font-bold">
              {risks.filter(r => r.severity.toLowerCase() === 'critical').length}
            </div>
          </div>
          <div className="bg-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-1">High Priority</div>
            <div className="text-3xl font-bold">
              {risks.filter(r => r.severity.toLowerCase() === 'high').length}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Risk Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {risks.map((risk, index) => {
          const Icon = getRiskIcon(risk.type)
          return (
            <motion.div
              key={risk.type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => setSelectedRisk(risk)}
              className={`p-6 rounded-2xl cursor-pointer shadow-xl transition-all ${
                selectedRisk?.type === risk.type
                  ? `bg-gradient-to-br ${getSeverityColor(risk.severity)} text-white`
                  : 'bg-white hover:shadow-2xl'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`p-3 rounded-xl ${
                    selectedRisk?.type === risk.type
                      ? 'bg-white/20'
                      : `bg-gradient-to-br ${getSeverityColor(risk.severity)}`
                  }`}
                >
                  <Icon className={selectedRisk?.type === risk.type ? 'text-white' : 'text-white'} size={28} />
                </motion.div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedRisk?.type === risk.type
                    ? 'bg-white/30 text-white'
                    : `bg-gradient-to-r ${getSeverityColor(risk.severity)} text-white`
                }`}>
                  {risk.severity}
                </span>
              </div>

              <h3 className={`text-xl font-bold mb-2 ${
                selectedRisk?.type === risk.type ? 'text-white' : 'text-gray-800'
              }`}>
                {risk.type}
              </h3>

              <div className={`text-sm mb-4 ${
                selectedRisk?.type === risk.type ? 'text-white/90' : 'text-gray-600'
              }`}>
                {risk.description}
              </div>

              {/* Probability Bar */}
              <div className="mb-3">
                <div className={`flex items-center justify-between text-xs mb-1 ${
                  selectedRisk?.type === risk.type ? 'text-white/80' : 'text-gray-600'
                }`}>
                  <span>Probability</span>
                  <span className="font-bold">{Math.round(risk.probability * 100)}%</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${
                  selectedRisk?.type === risk.type ? 'bg-white/30' : 'bg-gray-200'
                }`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${risk.probability * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full ${
                      selectedRisk?.type === risk.type
                        ? 'bg-white'
                        : `bg-gradient-to-r ${getSeverityColor(risk.severity)}`
                    }`}
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className={`flex items-center gap-2 text-sm ${
                selectedRisk?.type === risk.type ? 'text-white/90' : 'text-gray-700'
              }`}>
                <Clock size={16} />
                <span className="font-semibold">{risk.timeframe}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Detailed Risk View */}
      {selectedRisk && (
        <motion.div
          key={selectedRisk.type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedRisk.type}</h2>
              <p className="text-gray-600">{selectedRisk.description}</p>
            </div>
            <span className={`px-4 py-2 bg-gradient-to-r ${getSeverityColor(selectedRisk.severity)} text-white text-sm font-bold rounded-xl`}>
              {selectedRisk.severity} RISK
            </span>
          </div>

          {/* Risk Metrics */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
              <div className="text-sm text-gray-600 mb-1">Probability</div>
              <div className="text-3xl font-bold text-red-600">{Math.round(selectedRisk.probability * 100)}%</div>
              <div className="text-xs text-gray-500 mt-1">High confidence prediction</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
              <div className="text-sm text-gray-600 mb-1">Severity Level</div>
              <div className="text-2xl font-bold text-orange-600">{selectedRisk.severity}</div>
              <div className="text-xs text-gray-500 mt-1">Based on impact analysis</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
              <div className="text-sm text-gray-600 mb-1">Timeframe</div>
              <div className="text-2xl font-bold text-blue-600">{selectedRisk.timeframe}</div>
              <div className="text-xs text-gray-500 mt-1">Estimated occurrence</div>
            </div>
          </div>

          {/* Affected Areas */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-purple-600" size={24} />
              Affected Areas
            </h3>
            <div className="grid md:grid-cols-4 gap-3">
              {selectedRisk.affectedAreas.map((area: string, index: number) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 bg-purple-100 text-purple-800 rounded-lg text-center font-semibold"
                >
                  {area}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-600" size={24} />
              Recommended Actions
            </h3>
            <div className="space-y-3">
              {selectedRisk.actions.map((action: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border-2 border-green-200"
                >
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 flex-1">{action}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-4 px-6 bg-gradient-to-r ${getSeverityColor(selectedRisk.severity)} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
            >
              Deploy Emergency Response
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
            >
              View Details
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 bg-blue-100 text-blue-700 font-bold rounded-xl hover:bg-blue-200 transition-colors"
            >
              Alert Citizens
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* AI Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-6">AI Risk Analysis</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">Pattern Detection</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI has identified recurring patterns in historical data suggesting increased risk likelihood during monsoon season. 
              Machine learning models predict 75% probability of flooding events in low-lying zones within the next 48-72 hours.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-400">Preventive Measures</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              System recommends immediate deployment of water pumps in Zone-2 and Zone-4, evacuation drills in vulnerable areas, 
              and activation of emergency response teams. Historical data shows 60% risk reduction with early intervention.
            </p>
          </div>
        </div>

        {/* Confidence Metrics */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="p-4 bg-white/10 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Model Accuracy</div>
            <div className="text-2xl font-bold">87%</div>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Data Sources</div>
            <div className="text-2xl font-bold">18</div>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Predictions/Day</div>
            <div className="text-2xl font-bold">96</div>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">False Alarms</div>
            <div className="text-2xl font-bold text-green-400">8%</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
