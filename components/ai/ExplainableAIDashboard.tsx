'use client'

import { motion } from 'framer-motion'
import { Lightbulb, TrendingUp, Zap, AlertCircle, CheckCircle } from 'lucide-react'
import { ExplainableAI } from '@/lib/aiEngine'
import { useState } from 'react'

export default function ExplainableAIDashboard() {
  const [selectedPrediction, setSelectedPrediction] = useState('aqi')

  const predictions = {
    aqi: {
      title: 'AQI Prediction: 165',
      prediction: 165,
      type: 'Air Quality Index'
    },
    water: {
      title: 'Water Stress: High Risk',
      prediction: 0.78,
      type: 'Water Scarcity Probability'
    },
    budget: {
      title: 'Budget ROI: 240%',
      prediction: 240,
      type: 'Return on Investment'
    }
  }

  const currentPrediction = predictions[selectedPrediction as keyof typeof predictions]
  const explanation = ExplainableAI.explainPrediction(
    { value: currentPrediction.prediction },
    selectedPrediction
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">Explainable AI (XAI)</h1>
            <p className="text-white/90">Understand WHY AI made each prediction</p>
          </div>
        </div>
      </motion.div>

      {/* Prediction Selector */}
      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(predictions).map(([key, pred]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPrediction(key)}
            className={`p-6 rounded-2xl text-left transition-all ${
              selectedPrediction === key
                ? 'bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-xl'
                : 'bg-white text-gray-700 shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="text-2xl font-bold mb-2">{pred.title}</div>
            <div className={`text-sm ${selectedPrediction === key ? 'text-white/80' : 'text-gray-500'}`}>
              {pred.type}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Explanation Dashboard */}
      <motion.div
        key={selectedPrediction}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">AI Explanation for: {currentPrediction.title}</h2>

        {/* Confidence Score */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold">Model Confidence</span>
            <span className="text-3xl font-bold text-green-600">{Math.round(explanation.confidence * 100)}%</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${explanation.confidence * 100}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            High confidence means the model has strong evidence for this prediction
          </p>
        </div>

        {/* Data Sources */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="text-blue-600" size={24} />
            Data Sources Used
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {explanation.dataSource.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border-2 border-blue-200"
              >
                <CheckCircle className="text-blue-600" size={20} />
                <span className="font-semibold text-gray-700">{source}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contributing Factors */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="text-purple-600" size={24} />
            Contributing Factors
          </h3>
          <div className="space-y-4">
            {explanation.factors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="border-2 border-gray-200 rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-bold text-lg text-gray-800">{factor.name}</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 font-bold rounded-full text-sm">
                    {Math.round(factor.weight * 100)}% impact
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.weight * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-600"
                  />
                </div>
                <p className="text-sm text-gray-600">{factor.impact}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="text-yellow-600" size={24} />
            AI Reasoning Process
          </h3>
          <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
            <p className="text-gray-700 leading-relaxed">{explanation.reasoning}</p>
          </div>
        </div>

        {/* Limitations */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="text-red-600" size={24} />
            Model Limitations
          </h3>
          <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-600 mt-0.5" size={20} />
              <p className="text-gray-700">{explanation.limitations}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Why XAI Matters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-6">Why Explainable AI Matters</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2 text-blue-400">Trust Building</h3>
            <p className="text-sm text-gray-300">
              Government officials can verify AI decisions aren't a "black box". See exactly how predictions are made.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-green-400">Accountability</h3>
            <p className="text-sm text-gray-300">
              Track which data sources influenced decisions. Audit trail for policy decisions backed by AI.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-purple-400">Debugging</h3>
            <p className="text-sm text-gray-300">
              If AI makes wrong prediction, see which factors were weighted incorrectly and improve the model.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
