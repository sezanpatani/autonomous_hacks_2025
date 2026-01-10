'use client'

import { motion } from 'framer-motion'
import { Activity, Database, Zap, TrendingUp, CheckCircle, Clock, Brain, Target } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function AIMetricsDashboard() {
  // Model Accuracy Over Time
  const accuracyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Prediction Accuracy',
        data: [72, 76, 79, 82, 84, 86, 87, 89],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Model Confidence',
        data: [68, 71, 75, 78, 81, 84, 85, 87],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  }

  // Prediction Performance by Category
  const categoryMetrics = [
    { name: 'ESG Forecasting', accuracy: 89, predictions: 1247, confidence: 87 },
    { name: 'Pollution Prediction', accuracy: 85, predictions: 2156, confidence: 82 },
    { name: 'Risk Detection', accuracy: 92, predictions: 876, confidence: 90 },
    { name: 'Budget Optimization', accuracy: 78, predictions: 453, confidence: 75 },
    { name: 'Causal Analysis', accuracy: 81, predictions: 934, confidence: 79 },
  ]

  // Data Sources
  const dataSources = [
    { name: 'IoT Sensors', count: 2847, status: 'active', latency: '0.2s' },
    { name: 'Government APIs', count: 12, status: 'active', latency: '1.5s' },
    { name: 'Satellite Data', count: 3, status: 'active', latency: '4.2s' },
    { name: 'Citizen Reports', count: 1543, status: 'active', latency: '0.8s' },
    { name: 'Weather Stations', count: 28, status: 'active', latency: '0.5s' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Activity className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">AI Metrics & Performance</h1>
            <p className="text-white/90">Real-time model monitoring & system health</p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <Target size={28} />
            </div>
            <div>
              <div className="text-white/80 text-sm">Overall Accuracy</div>
              <div className="text-3xl font-bold">87.4%</div>
            </div>
          </div>
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '87%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-white"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <Brain size={28} />
            </div>
            <div>
              <div className="text-white/80 text-sm">Predictions Today</div>
              <div className="text-3xl font-bold">8,429</div>
            </div>
          </div>
          <div className="text-sm text-white/80">+12% from yesterday</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <Database size={28} />
            </div>
            <div>
              <div className="text-white/80 text-sm">Data Freshness</div>
              <div className="text-3xl font-bold">98.2%</div>
            </div>
          </div>
          <div className="text-sm text-white/80">Last updated: 2 min ago</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <Zap size={28} />
            </div>
            <div>
              <div className="text-white/80 text-sm">Avg Response Time</div>
              <div className="text-3xl font-bold">0.4s</div>
            </div>
          </div>
          <div className="text-sm text-white/80">Real-time processing</div>
        </motion.div>
      </div>

      {/* Accuracy Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">Model Learning Progress</h2>
        <div className="h-80">
          <Line 
            data={accuracyData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                title: { display: false }
              },
              scales: {
                y: {
                  min: 60,
                  max: 100,
                  ticks: {
                    callback: function(value) {
                      return value + '%'
                    }
                  }
                }
              }
            }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-4">
          📈 Models show consistent improvement through continuous learning. Accuracy increased by 17 percentage points over 8 weeks.
        </p>
      </motion.div>

      {/* Category Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">Performance by AI Module</h2>
        <div className="space-y-4">
          {categoryMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="border-2 border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">{metric.name}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                  Active
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Accuracy</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.accuracy}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-600"
                      />
                    </div>
                    <span className="text-lg font-bold text-blue-600">{metric.accuracy}%</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Predictions Made</div>
                  <div className="text-2xl font-bold text-gray-800">{metric.predictions.toLocaleString()}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Confidence</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.confidence}%` }}
                        transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                      />
                    </div>
                    <span className="text-lg font-bold text-green-600">{metric.confidence}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data Sources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-6">Data Source Health</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {dataSources.map((source, index) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="p-5 bg-white/10 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Database className="text-blue-400" size={24} />
                  <div>
                    <div className="font-bold">{source.name}</div>
                    <div className="text-sm text-gray-400">{source.count.toLocaleString()} data points</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  />
                  <span className="text-sm text-green-400 font-semibold">{source.status}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Avg Latency</span>
                <span className="font-bold text-yellow-400">{source.latency}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Stats */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="p-4 bg-white/10 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Total Data Points</div>
            <div className="text-2xl font-bold">4.4K+</div>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">API Uptime</div>
            <div className="text-2xl font-bold text-green-400">99.8%</div>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Cache Hit Rate</div>
            <div className="text-2xl font-bold text-blue-400">94.2%</div>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Errors Today</div>
            <div className="text-2xl font-bold text-yellow-400">3</div>
          </div>
        </div>
      </motion.div>

      {/* Model Status Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">AI Models Status</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'LSTM Forecaster', version: 'v2.4.1', status: 'deployed', lastTrained: '2 days ago' },
            { name: 'Causal Inference', version: 'v1.8.3', status: 'deployed', lastTrained: '5 days ago' },
            { name: 'Risk Classifier', version: 'v3.1.0', status: 'deployed', lastTrained: '1 day ago' },
            { name: 'Budget Optimizer', version: 'v1.5.2', status: 'deployed', lastTrained: '3 days ago' },
            { name: 'NLP Engine', version: 'v2.0.7', status: 'training', lastTrained: 'In progress' },
            { name: 'Image Analyzer', version: 'v1.2.0', status: 'deployed', lastTrained: '6 days ago' },
          ].map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.05 }}
              className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-gray-800">{model.name}</div>
                  <div className="text-sm text-gray-500">{model.version}</div>
                </div>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  model.status === 'deployed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {model.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={14} />
                <span>Trained: {model.lastTrained}</span>
              </div>

              {model.status === 'deployed' && (
                <div className="mt-3 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="text-xs text-green-700 font-semibold">Healthy</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Health Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl border-2 border-green-200"
      >
        <div className="flex items-start gap-3">
          <div className="p-3 bg-green-500 rounded-xl">
            <CheckCircle className="text-white" size={28} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">System Health: Excellent</h3>
            <p className="text-gray-700 mb-3">
              All AI models are performing optimally with 87.4% average accuracy. Data pipelines are healthy with 98.2% freshness. 
              No critical issues detected. System is ready for production workloads.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                ✓ Models Active
              </span>
              <span className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded-full">
                ✓ Data Fresh
              </span>
              <span className="px-3 py-1 bg-purple-500 text-white text-sm font-bold rounded-full">
                ✓ APIs Healthy
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
