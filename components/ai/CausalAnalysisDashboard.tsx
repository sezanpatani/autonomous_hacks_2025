'use client'

import { motion } from 'framer-motion'
import { Brain, GitBranch, AlertCircle, TrendingDown, Factory, Car, Building2, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { CausalAI } from '@/lib/aiEngine'
import { useESGMetrics } from '@/lib/hooks'
import { useAppStore } from '@/store/appStore'

export default function CausalAnalysisDashboard() {
  const { cityName } = useAppStore()
  const { data: metricsData, loading } = useESGMetrics(cityName)
  const [selectedZone, setSelectedZone] = useState('Zone-1')
  const [causalData, setCausalData] = useState<any>(null)

  useEffect(() => {
    if (!metricsData) return
    const data = CausalAI.analyzePollutionCauses(selectedZone, metricsData.environment?.aqi || 156)
    setCausalData(data)
  }, [selectedZone, metricsData])

  if (loading) {
    return <div className="text-center py-20">Loading causal analysis...</div>
  }

  const zones = ['Zone-1', 'Zone-2', 'Zone-3', 'Zone-4']

  const factorIcons: Record<string, any> = {
    'Traffic Congestion': Car,
    'Industrial Emissions': Factory,
    'Construction Activity': Building2,
    'Energy Production': Zap,
  }

  const getStrengthColor = (strength: number) => {
    if (strength >= 0.7) return 'from-red-500 to-orange-500'
    if (strength >= 0.4) return 'from-orange-400 to-yellow-500'
    return 'from-yellow-400 to-green-500'
  }

  const getStrengthLabel = (strength: number) => {
    if (strength >= 0.7) return 'High Impact'
    if (strength >= 0.4) return 'Moderate Impact'
    return 'Low Impact'
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
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Brain className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">Causal AI Analysis</h1>
            <p className="text-white/90">Root cause identification & Bayesian inference</p>
          </div>
        </div>
      </motion.div>

      {/* Zone Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {zones.map((zone) => (
          <motion.button
            key={zone}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedZone(zone)}
            className={`p-4 rounded-xl font-bold transition-all ${
              selectedZone === zone
                ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xl'
                : 'bg-white text-gray-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {zone}
          </motion.button>
        ))}
      </div>

      {causalData && (
        <>
          {/* Main Pollution Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 shadow-xl border-2 border-red-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-red-600" size={32} />
                <div>
                  <div className="text-sm text-gray-600">Current AQI - {selectedZone}</div>
                  <div className="text-4xl font-bold text-red-600">{causalData.currentAQI}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Expected AQI</div>
                <div className="text-2xl font-bold text-orange-600">{causalData.expectedAQI}</div>
              </div>
            </div>
            <div className="p-3 bg-white/70 rounded-lg">
              <div className="text-sm font-semibold text-gray-700 mb-1">Deviation Analysis</div>
              <div className="text-xs text-gray-600">
                AQI is <span className="font-bold text-red-600">{causalData.deviation} points higher</span> than expected. 
                AI has identified {causalData.causalFactors.length} root causes.
              </div>
            </div>
          </motion.div>

          {/* Causal Factors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <GitBranch className="text-purple-600" size={28} />
              Root Cause Analysis
            </h2>

            <div className="space-y-4">
              {causalData.causalFactors.map((factor: any, index: number) => {
                const Icon = factorIcons[factor.factor] || AlertCircle
                return (
                  <motion.div
                    key={factor.factor}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-gradient-to-br ${getStrengthColor(factor.causalStrength)} rounded-xl`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{factor.factor}</h3>
                          <span className={`px-3 py-1 bg-gradient-to-r ${getStrengthColor(factor.causalStrength)} text-white text-xs font-bold rounded-full`}>
                            {getStrengthLabel(factor.causalStrength)}
                          </span>
                        </div>

                        {/* Causal Strength Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Causal Strength</span>
                            <span className="font-bold">{Math.round(factor.causalStrength * 100)}%</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${factor.causalStrength * 100}%` }}
                              transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
                              className={`h-full bg-gradient-to-r ${getStrengthColor(factor.causalStrength)}`}
                            />
                          </div>
                        </div>

                        {/* Contribution */}
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-600">AQI Contribution</div>
                            <div className="text-xl font-bold text-gray-800">+{factor.contribution}</div>
                          </div>
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-600">Confidence</div>
                            <div className="text-xl font-bold text-gray-800">{Math.round(factor.confidence * 100)}%</div>
                          </div>
                        </div>

                        {/* Evidence */}
                        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                          <span className="font-semibold text-blue-900">Evidence: </span>
                          {factor.evidence}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Risk Inference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Bayesian Risk Inference</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {causalData.causalFactors.slice(0, 3).map((factor: any, index: number) => {
                const riskInference = CausalAI.inferRiskFactors(
                  factor.factor,
                  factor.confidence,
                  causalData.currentAQI
                )
                
                return (
                  <motion.div
                    key={factor.factor}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200"
                  >
                    <div className="text-sm text-gray-600 mb-1">{factor.factor}</div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {Math.round(riskInference.riskProbability * 100)}%
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Risk Probability</div>
                    
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${riskInference.riskProbability * 100}%` }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                    
                    <div className="text-xs text-gray-700">
                      <span className="font-semibold">Mitigation: </span>
                      {riskInference.mitigation}
                    </div>
                    
                    <div className="mt-2 text-xs text-purple-700 font-semibold">
                      Expected Reduction: {riskInference.expectedReduction}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Causal Graph Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl text-white"
          >
            <h2 className="text-2xl font-bold mb-6">Causal Dependency Graph</h2>
            
            <div className="relative h-64 flex items-center justify-center">
              {/* Center Node (AQI) */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="absolute z-10 w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">{causalData.currentAQI}</div>
                  <div className="text-xs">AQI</div>
                </div>
              </motion.div>

              {/* Surrounding Nodes (Factors) */}
              {causalData.causalFactors.map((factor: any, index: number) => {
                const angle = (index * 360) / causalData.causalFactors.length
                const radius = 120
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius
                
                return (
                  <motion.div
                    key={factor.factor}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{ scale: 1, x, y }}
                    transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                    className="absolute w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-center shadow-xl text-xs font-bold p-2"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    {factor.factor.split(' ')[0]}
                    <div className="absolute -bottom-6 text-yellow-400 text-xs">
                      {Math.round(factor.causalStrength * 100)}%
                    </div>
                  </motion.div>
                )
              })}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {causalData.causalFactors.map((factor: any, index: number) => {
                  const angle = (index * 360) / causalData.causalFactors.length
                  const radius = 120
                  const x = Math.cos((angle * Math.PI) / 180) * radius
                  const y = Math.sin((angle * Math.PI) / 180) * radius
                  
                  return (
                    <motion.line
                      key={index}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${x}px)`}
                      y2={`calc(50% + ${y}px)`}
                      stroke="#fff"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  )
                })}
              </svg>
            </div>

            <p className="text-center text-sm text-gray-400 mt-8">
              Node size represents causal strength • Lines show direct dependencies • Percentages indicate contribution to AQI
            </p>
          </motion.div>
        </>
      )}
    </div>
  )
}
