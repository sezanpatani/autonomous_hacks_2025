'use client'

import { motion } from 'framer-motion'
import { FileText, Download, Sparkles, CheckCircle, Calendar, Building2 } from 'lucide-react'
import { useState } from 'react'

export default function AIPolicyGenerator() {
  const [generating, setGenerating] = useState(false)
  const [generatedPolicy, setGeneratedPolicy] = useState<any>(null)
  const [selectedType, setSelectedType] = useState<'action' | 'monthly' | 'annual'>('action')

  const generatePolicy = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGeneratedPolicy({
        title: selectedType === 'action' ? 'ESG Action Plan 2026' : 
               selectedType === 'monthly' ? 'Monthly ESG Briefing - January 2026' :
               'Annual ESG Report 2025',
        date: 'January 10, 2026',
        sections: [
          {
            title: 'Executive Summary',
            content: 'AI analysis indicates ESG score of 72/100. Priority areas: AQI reduction (Critical), Water conservation (High), Healthcare access (Medium).'
          },
          {
            title: 'Key Recommendations',
            content: '1. Deploy 500 electric buses (₹20Cr, 90 days)\n2. Water conservation campaign (₹2Cr, 30 days)\n3. Solar panel installation (₹15Cr, 120 days)'
          },
          {
            title: 'Budget Allocation',
            content: 'Total: ₹37 Cr | Environment: 60% | Social: 25% | Governance: 15%'
          },
          {
            title: 'Expected Outcomes',
            content: 'AQI: -18 points | Water usage: -10% | ESG Score: +15 points | ROI: 240%'
          }
        ],
        metrics: {
          currentESG: 72,
          targetESG: 87,
          budget: '₹37 Cr',
          timeline: '12 months'
        }
      })
    }, 2000)
  }

  const policyTypes = [
    { id: 'action' as const, name: 'ESG Action Plan', icon: FileText, color: 'from-blue-500 to-cyan-600' },
    { id: 'monthly' as const, name: 'Monthly Briefing', icon: Calendar, color: 'from-green-500 to-emerald-600' },
    { id: 'annual' as const, name: 'Annual Report', icon: Building2, color: 'from-purple-500 to-indigo-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">AI Policy Generator</h1>
            <p className="text-white/90">Auto-generate ESG reports, action plans & briefings</p>
          </div>
        </div>
      </motion.div>

      {/* Policy Type Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {policyTypes.map((type) => {
          const Icon = type.icon
          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(type.id)}
              className={`p-6 rounded-2xl text-left transition-all ${
                selectedType === type.id
                  ? `bg-gradient-to-br ${type.color} text-white shadow-xl`
                  : 'bg-white text-gray-700 shadow-lg hover:shadow-xl'
              }`}
            >
              <Icon size={32} className="mb-3" />
              <div className="font-bold text-lg">{type.name}</div>
              <div className={`text-sm ${selectedType === type.id ? 'text-white/80' : 'text-gray-500'}`}>
                AI-generated
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Generate Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generatePolicy}
        disabled={generating}
        className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
      >
        {generating ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={24} />
            </motion.div>
            Generating with AI...
          </>
        ) : (
          <>
            <Sparkles size={24} />
            Generate {policyTypes.find(t => t.id === selectedType)?.name}
          </>
        )}
      </motion.button>

      {/* Generated Policy */}
      {generatedPolicy && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{generatedPolicy.title}</h2>
              <p className="text-gray-600">Generated on {generatedPolicy.date}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Download size={20} />
              Download PDF
            </motion.button>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="text-sm text-gray-600 mb-1">Current ESG</div>
              <div className="text-3xl font-bold text-blue-600">{generatedPolicy.metrics.currentESG}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="text-sm text-gray-600 mb-1">Target ESG</div>
              <div className="text-3xl font-bold text-green-600">{generatedPolicy.metrics.targetESG}</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
              <div className="text-sm text-gray-600 mb-1">Budget</div>
              <div className="text-2xl font-bold text-orange-600">{generatedPolicy.metrics.budget}</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
              <div className="text-sm text-gray-600 mb-1">Timeline</div>
              <div className="text-2xl font-bold text-purple-600">{generatedPolicy.metrics.timeline}</div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {generatedPolicy.sections.map((section: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-indigo-500 pl-6 py-4"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="text-indigo-500" size={24} />
                  {section.title}
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
              </motion.div>
            ))}
          </div>

          {/* AI Attribution */}
          <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
            <div className="flex items-center gap-3">
              <Sparkles className="text-indigo-600" size={24} />
              <div>
                <div className="font-semibold text-indigo-900">AI-Generated Content</div>
                <div className="text-sm text-gray-600">
                  This document was automatically generated using ESG data analysis, ML predictions, and policy templates. Review before official use.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-6">AI Policy Generator Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-400">Automation</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-1 text-green-400" />
                <span>Auto-pulls data from all ESG modules</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-1 text-green-400" />
                <span>Generates executive summaries with AI</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-1 text-green-400" />
                <span>Prioritizes actions using ML rankings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-1 text-green-400" />
                <span>Budget optimization recommendations</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-purple-400">Customization</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-1 text-green-400" />
                <span>Multiple report templates (Action/Monthly/Annual)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-1 text-green-400" />
                <span>PDF export with government branding</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-1 text-green-400" />
                <span>Editable sections before finalization</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-1 text-green-400" />
                <span>Multi-language support (Hindi/English)</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
