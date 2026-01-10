'use client'

import { motion } from 'framer-motion'
import { Brain, TrendingUp, Lightbulb, DollarSign, AlertTriangle, Activity, Bot, Camera, FileText, Sparkles } from 'lucide-react'
import { useState } from 'react'
import PredictiveForecastingEngine from './PredictiveForecastingEngine'
import WhatIfSimulator from './WhatIfSimulator'
import CausalAnalysisDashboard from './CausalAnalysisDashboard'
import RecommendationAgentUI from './RecommendationAgent'
import BudgetOptimizerEngine from './BudgetOptimizerEngine'
import EarlyWarningDashboard from './EarlyWarningDashboard'
import AIMetricsDashboard from './AIMetricsDashboard'
import MultiModalAIInputs from './MultiModalAIInputs'
import AIPolicyGenerator from './AIPolicyGenerator'
import ExplainableAIDashboard from './ExplainableAIDashboard'

type AIModule = 'overview' | 'forecasting' | 'simulator' | 'causal' | 'agent' | 'budget' | 'warnings' | 'metrics' | 'multimodal' | 'policy' | 'xai'

export default function AIHub() {
  const [activeModule, setActiveModule] = useState<AIModule>('overview')

  const modules = [
    {
      id: 'forecasting' as AIModule,
      name: 'Predictive Forecasting',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-600',
      description: 'ML-powered ESG predictions',
      badge: 'LSTM'
    },
    {
      id: 'simulator' as AIModule,
      name: 'What-If Simulator',
      icon: Lightbulb,
      color: 'from-green-500 to-emerald-600',
      description: 'Impact scenario analysis',
      badge: 'Simulation'
    },
    {
      id: 'causal' as AIModule,
      name: 'Causal Analysis',
      icon: Brain,
      color: 'from-purple-500 to-indigo-600',
      description: 'Root cause identification',
      badge: 'Bayesian'
    },
    {
      id: 'agent' as AIModule,
      name: 'Recommendation Agent',
      icon: Bot,
      color: 'from-cyan-500 to-blue-600',
      description: 'Autonomous action suggestions',
      badge: 'Auto'
    },
    {
      id: 'budget' as AIModule,
      name: 'Budget Optimizer',
      icon: DollarSign,
      color: 'from-orange-500 to-red-600',
      description: 'ROI-driven allocation',
      badge: 'NPV'
    },
    {
      id: 'warnings' as AIModule,
      name: 'Early Warnings',
      icon: AlertTriangle,
      color: 'from-red-500 to-rose-600',
      description: 'Risk detection system',
      badge: 'Real-time'
    },
    {
      id: 'multimodal' as AIModule,
      name: 'Multi-Modal AI',
      icon: Camera,
      color: 'from-pink-500 to-purple-600',
      description: 'Image/Text/Audio analysis',
      badge: 'CV+NLP'
    },
    {
      id: 'policy' as AIModule,
      name: 'AI Policy Generator',
      icon: FileText,
      color: 'from-indigo-500 to-blue-600',
      description: 'Auto-generate reports',
      badge: 'GPT'
    },
    {
      id: 'xai' as AIModule,
      name: 'Explainable AI',
      icon: Sparkles,
      color: 'from-yellow-500 to-orange-600',
      description: 'AI decision transparency',
      badge: 'XAI'
    },
    {
      id: 'metrics' as AIModule,
      name: 'AI Metrics',
      icon: Activity,
      color: 'from-teal-500 to-green-600',
      description: 'Model performance',
      badge: '87% ACC'
    },
  ]

  const renderModule = () => {
    switch (activeModule) {
      case 'forecasting':
        return <PredictiveForecastingEngine />
      case 'simulator':
        return <WhatIfSimulator />
      case 'causal':
        return <CausalAnalysisDashboard />
      case 'agent':
        return <RecommendationAgentUI />
      case 'budget':
        return <BudgetOptimizerEngine />
      case 'warnings':
        return <EarlyWarningDashboard />
      case 'multimodal':
        return <MultiModalAIInputs />
      case 'policy':
        return <AIPolicyGenerator />
      case 'xai':
        return <ExplainableAIDashboard />
      case 'metrics':
        return <AIMetricsDashboard />
      default:
        return null
    }
  }

  if (activeModule !== 'overview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveModule('overview')}
          className="mb-6 px-6 py-3 bg-white text-gray-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          ← Back to AI Hub
        </motion.button>
        {renderModule()}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl mb-8 overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl"
        />
        
        <div className="relative z-10">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-6"
          >
            <Brain className="w-20 h-20" />
          </motion.div>
          
          <h1 className="text-5xl font-bold mb-4">AI Intelligence Hub</h1>
          <p className="text-2xl text-white/90 mb-6">
            Where AI drives decisions, ML predicts outcomes, and humans supervise
          </p>
          
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-white/80 text-sm mb-1">AI Models Active</div>
              <div className="text-3xl font-bold">10</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-white/80 text-sm mb-1">Predictions Today</div>
              <div className="text-3xl font-bold">8.4K</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-white/80 text-sm mb-1">Accuracy</div>
              <div className="text-3xl font-bold">87%</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-white/80 text-sm mb-1">ROI Savings</div>
              <div className="text-3xl font-bold">₹12Cr</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Module Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {modules.map((module, index) => {
          const Icon = module.icon
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModule(module.id)}
              className="relative bg-white rounded-2xl p-8 shadow-xl cursor-pointer overflow-hidden group"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`p-4 bg-gradient-to-br ${module.color} rounded-xl shadow-lg`}
                  >
                    <Icon className="text-white" size={32} />
                  </motion.div>
                  <span className={`px-3 py-1 bg-gradient-to-r ${module.color} text-white text-xs font-bold rounded-full`}>
                    {module.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">{module.name}</h3>
                <p className="text-gray-600 mb-4">{module.description}</p>

                <motion.button
                  whileHover={{ x: 5 }}
                  className={`inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${module.color} bg-clip-text text-transparent`}
                >
                  Launch Module →
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Feature Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 text-white shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">What Makes This AI-First?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block p-6 bg-blue-500/20 rounded-2xl mb-4"
            >
              <TrendingUp size={48} className="text-blue-400" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Predictive Intelligence</h3>
            <p className="text-gray-400 text-sm">
              LSTM models forecast ESG metrics 3-12 months ahead with 85%+ accuracy
            </p>
          </div>

          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block p-6 bg-purple-500/20 rounded-2xl mb-4"
            >
              <Brain size={48} className="text-purple-400" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Causal Reasoning</h3>
            <p className="text-gray-400 text-sm">
              Bayesian inference identifies root causes, not just correlations
            </p>
          </div>

          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="inline-block p-6 bg-green-500/20 rounded-2xl mb-4"
            >
              <Bot size={48} className="text-green-400" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Autonomous Actions</h3>
            <p className="text-gray-400 text-sm">
              AI agent suggests prioritized actions with ROI calculations
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white/10 rounded-2xl border-2 border-white/20">
          <p className="text-center text-lg">
            <span className="font-bold text-yellow-400">This is not an ESG dashboard.</span>{' '}
            <span className="text-white">This is an AI-driven decision-making brain for cities.</span>
          </p>
        </div>
      </motion.div>

      {/* Technical Specs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 bg-white rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">Technical Capabilities</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-indigo-600">ML Algorithms</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                LSTM Networks for time-series forecasting
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                Bayesian Inference for causal analysis
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                Ensemble models (Random Forest + XGBoost)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                Linear Programming for budget optimization
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3 text-purple-600">AI Features</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                Real-time risk detection (floods, heatwaves, AQI)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                What-if scenario simulation with confidence scores
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                Autonomous recommendation with priority ranking
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                Explainable AI with confidence & reasoning
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
