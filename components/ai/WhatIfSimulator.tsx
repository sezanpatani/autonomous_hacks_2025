'use client'

import { motion } from 'framer-motion'
import { Lightbulb, TrendingUp, DollarSign, Leaf, Droplets, Bus } from 'lucide-react'
import { useState } from 'react'
import { ScenarioSimulator } from '@/lib/aiEngine'
import { useESGMetrics } from '@/lib/hooks'
import { useAppStore } from '@/store/appStore'

export default function WhatIfSimulator() {
  const { cityName } = useAppStore()
  const { data: metricsData, loading } = useESGMetrics(cityName)
  const [activeScenario, setActiveScenario] = useState<'buses' | 'water' | 'waste'>('buses')
  
  // State for each scenario
  const [busCount, setBusCount] = useState(500)
  const [waterTax, setWaterTax] = useState(10)
  const [wasteImprovement, setWasteImprovement] = useState(15)
  
  if (loading) {
    return <div className="text-center py-20">Loading simulator...</div>
  }

  const ESG_DATA = metricsData || {}
  
  // Calculate results
  const busResult = ScenarioSimulator.simulateEVBuses(ESG_DATA.environment?.aqi || 156, busCount)
  const waterResult = ScenarioSimulator.simulateWaterTax(ESG_DATA.environment?.waterQuality || 75, waterTax)
  const wasteResult = ScenarioSimulator.simulateWasteSegregation(ESG_DATA.environment?.wasteRecycling || 45, wasteImprovement)

  const scenarios = {
    buses: {
      icon: Bus,
      title: 'Electric Bus Deployment',
      color: 'from-green-500 to-emerald-600',
      value: busCount,
      setValue: setBusCount,
      min: 0,
      max: 1000,
      step: 50,
      unit: 'buses',
      result: busResult
    },
    water: {
      icon: Droplets,
      title: 'Water Tax Adjustment',
      color: 'from-blue-500 to-cyan-600',
      value: waterTax,
      setValue: setWaterTax,
      min: 0,
      max: 30,
      step: 1,
      unit: '%',
      result: waterResult
    },
    waste: {
      icon: Leaf,
      title: 'Waste Segregation Campaign',
      color: 'from-purple-500 to-pink-600',
      value: wasteImprovement,
      setValue: setWasteImprovement,
      min: 0,
      max: 40,
      step: 5,
      unit: '% improvement',
      result: wasteResult
    }
  }

  const currentScenario = scenarios[activeScenario]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r ${currentScenario.color} rounded-3xl p-8 text-white shadow-xl`}
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">What-If Scenario Simulator</h1>
            <p className="text-white/90">AI-powered impact prediction & decision support</p>
          </div>
        </div>
      </motion.div>

      {/* Scenario Selector */}
      <div className="grid md:grid-cols-3 gap-4">
        {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => {
          const scenario = scenarios[key]
          const Icon = scenario.icon
          return (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveScenario(key)}
              className={`p-6 rounded-2xl text-left transition-all ${
                activeScenario === key
                  ? `bg-gradient-to-br ${scenario.color} text-white shadow-xl`
                  : 'bg-white text-gray-700 shadow-lg hover:shadow-xl'
              }`}
            >
              <Icon size={32} className="mb-3" />
              <div className="font-bold text-lg">{scenario.title}</div>
              <div className={`text-sm ${activeScenario === key ? 'text-white/80' : 'text-gray-500'}`}>
                Click to simulate
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Simulator Controls */}
      <motion.div
        key={activeScenario}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">{currentScenario.title}</h2>
        
        {/* Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <label className="text-lg font-semibold text-gray-700">
              Adjustment Value
            </label>
            <motion.div
              key={currentScenario.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`px-6 py-3 bg-gradient-to-r ${currentScenario.color} text-white rounded-xl font-bold text-2xl`}
            >
              {currentScenario.value} {currentScenario.unit}
            </motion.div>
          </div>
          
          <input
            type="range"
            min={currentScenario.min}
            max={currentScenario.max}
            step={currentScenario.step}
            value={currentScenario.value}
            onChange={(e) => currentScenario.setValue(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgb(34,197,94) 0%, rgb(34,197,94) ${(currentScenario.value / currentScenario.max) * 100}%, rgb(229,231,235) ${(currentScenario.value / currentScenario.max) * 100}%, rgb(229,231,235) 100%)`
            }}
          />
          
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{currentScenario.min}</span>
            <span>{currentScenario.max} {currentScenario.unit}</span>
          </div>
        </div>

        {/* Results */}
        <motion.div
          key={`result-${currentScenario.value}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="text-green-600" size={24} />
            Predicted Impact
          </h3>

          {activeScenario === 'buses' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <div className="text-sm text-gray-600 mb-1">AQI Reduction</div>
                <div className="text-3xl font-bold text-green-600">-{busResult.aqiReduction} points</div>
                <div className="text-xs text-gray-500 mt-1">New AQI: {busResult.newAQI}</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                <div className="text-sm text-gray-600 mb-1">ESG Score Change</div>
                <div className="text-3xl font-bold text-blue-600">+{busResult.esgScoreChange}</div>
                <div className="text-xs text-gray-500 mt-1">Confidence: {Math.round(busResult.confidence * 100)}%</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                <div className="text-sm text-gray-600 mb-1">Total Investment</div>
                <div className="text-2xl font-bold text-orange-600">₹{(busResult.totalCost / 10000000).toFixed(0)} Cr</div>
                <div className="text-xs text-gray-500 mt-1">Annual Savings: ₹{(busResult.annualSavings / 10000000).toFixed(1)} Cr</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <div className="text-sm text-gray-600 mb-1">CO₂ Reduction</div>
                <div className="text-3xl font-bold text-purple-600">{busResult.co2Reduction} tons/year</div>
                <div className="text-xs text-gray-500 mt-1">Payback: {busResult.paybackYears} years</div>
              </div>
            </div>
          )}

          {activeScenario === 'water' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                <div className="text-sm text-gray-600 mb-1">Usage Reduction</div>
                <div className="text-3xl font-bold text-blue-600">-{waterResult.usageReduction}%</div>
                <div className="text-xs text-gray-500 mt-1">New Usage: {waterResult.newUsage}%</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <div className="text-sm text-gray-600 mb-1">ESG Improvement</div>
                <div className="text-3xl font-bold text-green-600">+{waterResult.esgScoreChange.toFixed(1)}</div>
                <div className="text-xs text-gray-500 mt-1">Confidence: {Math.round(waterResult.confidence * 100)}%</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <div className="text-sm text-gray-600 mb-1">Additional Revenue</div>
                <div className="text-2xl font-bold text-purple-600">₹{(waterResult.additionalRevenue / 10000000).toFixed(1)} Cr</div>
                <div className="text-xs text-gray-500 mt-1">Per year</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
                <div className="text-sm text-gray-600 mb-1">Public Sentiment</div>
                <div className="text-2xl font-bold text-orange-600">{waterResult.publicSentiment}</div>
                <div className="text-xs text-gray-500 mt-1">Based on historical data</div>
              </div>
            </div>
          )}

          {activeScenario === 'waste' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <div className="text-sm text-gray-600 mb-1">New Recycling Rate</div>
                <div className="text-3xl font-bold text-green-600">{wasteResult.newRecyclingRate}%</div>
                <div className="text-xs text-gray-500 mt-1">Up from {ESG_DATA?.environment?.wasteRecycling || 0}%</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                <div className="text-sm text-gray-600 mb-1">ESG Score Boost</div>
                <div className="text-3xl font-bold text-blue-600">+{wasteResult.esgScoreChange}</div>
                <div className="text-xs text-gray-500 mt-1">Confidence: {Math.round(wasteResult.confidence * 100)}%</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <div className="text-sm text-gray-600 mb-1">Cost Savings</div>
                <div className="text-2xl font-bold text-purple-600">₹{(wasteResult.annualCostSavings / 10000000).toFixed(2)} Cr</div>
                <div className="text-xs text-gray-500 mt-1">Per year</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                <div className="text-sm text-gray-600 mb-1">Landfill Reduction</div>
                <div className="text-3xl font-bold text-orange-600">{wasteResult.landfillReduction} tons</div>
                <div className="text-xs text-gray-500 mt-1">Per year</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* AI Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <Lightbulb className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-indigo-900 mb-1">AI Recommendation</div>
              <p className="text-sm text-gray-700">
                {activeScenario === 'buses' && busCount >= 500 && 
                  `Deploying ${busCount} electric buses shows strong ROI with ${busResult.paybackYears}-year payback. Prioritize high-traffic zones (Zone-1, Zone-4) for maximum impact.`
                }
                {activeScenario === 'water' && waterTax > 15 && 
                  `High tax increase (${waterTax}%) may face public resistance. Consider phased implementation: 5% now, monitor for 6 months, then adjust.`
                }
                {activeScenario === 'water' && waterTax <= 15 && 
                  `Moderate tax increase (${waterTax}%) is optimal for balancing conservation and public acceptance. Combine with awareness campaigns.`
                }
                {activeScenario === 'waste' && wasteImprovement >= 20 && 
                  `Ambitious ${wasteImprovement}% improvement target. Recommend pilot in 2 wards first, then scale based on learnings.`
                }
                {activeScenario === 'waste' && wasteImprovement < 20 && 
                  `Conservative ${wasteImprovement}% target is achievable with community engagement and incentive programs.`
                }
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Confidence Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg"
      >
        <h3 className="font-bold mb-4">Prediction Confidence</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 bg-gray-300 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentScenario.result.confidence * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-green-500 to-blue-500"
            />
          </div>
          <span className="text-2xl font-bold text-gray-700">
            {Math.round(currentScenario.result.confidence * 100)}%
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Based on historical data, similar policy implementations, and validated ML models
        </p>
      </motion.div>
    </div>
  )
}
