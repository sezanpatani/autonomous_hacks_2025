'use client'

import { motion } from 'framer-motion'
import { PieChart, DollarSign, TrendingUp, Target, Percent, Calculator } from 'lucide-react'
import { useState } from 'react'
import { BudgetOptimizer } from '@/lib/aiEngine'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Project {
  id: string
  name: string
  cost: number
  impact: number
  category: 'environment' | 'social' | 'governance'
  selected: boolean
}

export default function BudgetOptimizerEngine() {
  const [totalBudget, setTotalBudget] = useState(100)
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Solar Panel Installation', cost: 30, impact: 8, category: 'environment', selected: true },
    { id: '2', name: 'EV Bus Fleet Upgrade', cost: 50, impact: 12, category: 'environment', selected: true },
    { id: '3', name: 'Skills Training Program', cost: 15, impact: 6, category: 'social', selected: false },
    { id: '4', name: 'Healthcare Centers', cost: 40, impact: 10, category: 'social', selected: false },
    { id: '5', name: 'Digital Governance Portal', cost: 20, impact: 7, category: 'governance', selected: true },
    { id: '6', name: 'Water Treatment Plant', cost: 45, impact: 11, category: 'environment', selected: false },
    { id: '7', name: 'Public Housing Project', cost: 60, impact: 9, category: 'social', selected: false },
    { id: '8', name: 'Transparency Dashboard', cost: 12, impact: 5, category: 'governance', selected: false },
  ])

  const toggleProject = (id: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, selected: !p.selected } : p))
  }

  const selectedProjects = projects.filter(p => p.selected)
  const optimizedBudget = BudgetOptimizer.optimizeBudget(selectedProjects, totalBudget)

  const categoryColors = {
    environment: 'from-green-500 to-emerald-600',
    social: 'from-blue-500 to-cyan-600',
    governance: 'from-purple-500 to-indigo-600',
  }

  const pieData = {
    labels: optimizedBudget.allocation.map(a => a.projectName),
    datasets: [{
      data: optimizedBudget.allocation.map(a => a.allocatedBudget),
      backgroundColor: optimizedBudget.allocation.map(a => {
        const project = projects.find(p => p.name === a.projectName)
        if (!project) return '#gray'
        return project.category === 'environment' ? '#10b981' :
               project.category === 'social' ? '#3b82f6' : '#8b5cf6'
      }),
      borderWidth: 2,
      borderColor: '#fff',
    }]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Calculator className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">Budget Optimization Engine</h1>
            <p className="text-white/90">AI-powered resource allocation with ROI maximization</p>
          </div>
        </div>
      </motion.div>

      {/* Budget Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <label className="text-xl font-bold text-gray-800">Total Available Budget</label>
          <motion.div
            key={totalBudget}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-3xl"
          >
            ₹{totalBudget} Cr
          </motion.div>
        </div>

        <input
          type="range"
          min="50"
          max="200"
          step="10"
          value={totalBudget}
          onChange={(e) => setTotalBudget(Number(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgb(249,115,22) 0%, rgb(249,115,22) ${((totalBudget - 50) / 150) * 100}%, rgb(229,231,235) ${((totalBudget - 50) / 150) * 100}%, rgb(229,231,235) 100%)`
          }}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>₹50 Cr</span>
          <span>₹200 Cr</span>
        </div>
      </motion.div>

      {/* Project Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">Select Projects to Fund</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleProject(project.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                project.selected
                  ? `border-transparent bg-gradient-to-br ${categoryColors[project.category]} text-white shadow-lg`
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-1 ${project.selected ? 'text-white' : 'text-gray-800'}`}>
                    {project.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.selected 
                      ? 'bg-white/30 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {project.category}
                  </span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  project.selected 
                    ? 'bg-white border-white' 
                    : 'bg-white border-gray-300'
                }`}>
                  {project.selected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-3 h-3 rounded-full bg-gradient-to-br ${categoryColors[project.category]}`}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className={`p-2 rounded-lg ${project.selected ? 'bg-white/20' : 'bg-white'}`}>
                  <div className={`text-xs ${project.selected ? 'text-white/80' : 'text-gray-600'}`}>Cost</div>
                  <div className={`text-xl font-bold ${project.selected ? 'text-white' : 'text-gray-800'}`}>
                    ₹{project.cost} Cr
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${project.selected ? 'bg-white/20' : 'bg-white'}`}>
                  <div className={`text-xs ${project.selected ? 'text-white/80' : 'text-gray-600'}`}>Impact</div>
                  <div className={`text-xl font-bold ${project.selected ? 'text-white' : 'text-gray-800'}`}>
                    +{project.impact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Optimization Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-6">AI Optimization Results</h2>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-yellow-400" size={20} />
              <span className="text-sm text-gray-300">Total Allocated</span>
            </div>
            <div className="text-3xl font-bold">₹{optimizedBudget.totalAllocated} Cr</div>
            <div className="text-xs text-gray-400 mt-1">
              {optimizedBudget.remainingBudget > 0 && `₹${optimizedBudget.remainingBudget} Cr remaining`}
            </div>
          </div>

          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-green-400" size={20} />
              <span className="text-sm text-gray-300">Total Impact</span>
            </div>
            <div className="text-3xl font-bold text-green-400">+{optimizedBudget.totalImpact}</div>
            <div className="text-xs text-gray-400 mt-1">ESG Score Points</div>
          </div>

          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-blue-400" size={20} />
              <span className="text-sm text-gray-300">Efficiency</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">
              {optimizedBudget.efficiency.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">Impact per Crore</div>
          </div>

          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="text-purple-400" size={20} />
              <span className="text-sm text-gray-300">Projects</span>
            </div>
            <div className="text-3xl font-bold text-purple-400">{optimizedBudget.allocation.length}</div>
            <div className="text-xs text-gray-400 mt-1">Selected & Funded</div>
          </div>
        </div>

        {/* Allocation Table */}
        <div className="bg-white/5 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Budget Allocation Breakdown</h3>
          <div className="space-y-3">
            {optimizedBudget.allocation.map((allocation, index) => {
              const project = projects.find(p => p.name === allocation.projectName)
              return (
                <motion.div
                  key={allocation.projectName}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/10 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${
                      project ? categoryColors[project.category] : 'from-gray-500 to-gray-600'
                    }`} />
                    <span className="font-semibold">{allocation.projectName}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Budget</div>
                      <div className="text-lg font-bold">₹{allocation.allocatedBudget} Cr</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Impact</div>
                      <div className="text-lg font-bold text-green-400">+{allocation.expectedImpact}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">ROI</div>
                      <div className="text-lg font-bold text-blue-400">{allocation.impactPerCrore.toFixed(2)}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Budget Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          {/* ROI Analysis */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">ROI Analysis</h3>
            <div className="space-y-4">
              {optimizedBudget.allocation.slice(0, 3).map((allocation, index) => {
                const roiData = BudgetOptimizer.calculateROI(
                  allocation.allocatedBudget * 10000000,
                  allocation.expectedImpact * 5000000,
                  5
                )
                return (
                  <div key={allocation.projectName} className="p-4 bg-white/10 rounded-lg">
                    <div className="font-semibold mb-2">{allocation.projectName}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-400">ROI</div>
                        <div className="text-lg font-bold text-green-400">{roiData.totalROI}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Payback</div>
                        <div className="text-lg font-bold text-blue-400">{roiData.paybackYears}y</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Recommendation */}
      {optimizedBudget.remainingBudget > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-xl border-2 border-yellow-300"
        >
          <div className="flex items-start gap-3">
            <div className="p-3 bg-yellow-500 rounded-xl">
              <Target className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">AI Optimization Suggestion</h3>
              <p className="text-gray-700">
                You have <span className="font-bold text-orange-600">₹{optimizedBudget.remainingBudget} Cr</span> remaining budget. 
                Consider adding more projects to maximize impact. Based on ROI analysis, we recommend:
              </p>
              <ul className="mt-3 space-y-2">
                {projects
                  .filter(p => !p.selected)
                  .sort((a, b) => (b.impact / b.cost) - (a.impact / a.cost))
                  .slice(0, 2)
                  .map(p => (
                    <li key={p.id} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-sm text-gray-600">
                        (₹{p.cost} Cr • Impact +{p.impact} • ROI {(p.impact / p.cost).toFixed(2)})
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
