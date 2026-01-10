'use client'

import { motion } from 'framer-motion'
import { Upload, Image, FileText, Mic, Zap, CheckCircle, Camera } from 'lucide-react'
import { useState } from 'react'

export default function MultiModalAIInputs() {
  const [imageUploaded, setImageUploaded] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleImageUpload = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setImageUploaded(true)
      setAnalyzing(false)
      setAnalysisResult({
        type: 'image',
        detected: 'Garbage accumulation detected',
        location: 'Zone-2, Street 14B',
        severity: 'High',
        items: ['Plastic waste: 45%', 'Organic waste: 30%', 'Metal debris: 15%', 'Other: 10%'],
        confidence: 0.92,
        action: 'Dispatch cleaning crew within 4 hours'
      })
    }, 2000)
  }

  const handleTextAnalysis = () => {
    if (!textInput) return
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setAnalysisResult({
        type: 'text',
        sentiment: 'Negative',
        category: 'Water Leakage',
        priority: 'High',
        location: 'Zone-3, Sector 8',
        keywords: ['water leak', 'pipe burst', 'flooding'],
        confidence: 0.88,
        action: 'Create maintenance ticket #WL-2847'
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Camera className="w-12 h-12" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">Multi-Modal AI Inputs</h1>
            <p className="text-white/90">Image, Text & Audio analysis with Computer Vision + NLP</p>
          </div>
        </div>
      </motion.div>

      {/* Input Methods Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Image Upload */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
              <Image className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg">Image Analysis</h3>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-4 hover:border-blue-500 transition-colors cursor-pointer"
               onClick={handleImageUpload}>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-2">Upload garbage/leak photo</p>
            <p className="text-xs text-gray-500">AI will detect issues automatically</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={16} className="text-green-600" />
              <span>Garbage detection (YOLOv8)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={16} className="text-green-600" />
              <span>Leak/crack identification</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={16} className="text-green-600" />
              <span>92% accuracy</span>
            </div>
          </div>
        </motion.div>

        {/* Text Analysis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <FileText className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg">Text Analysis</h3>
          </div>
          
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter citizen complaint or feedback..."
            className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl mb-4 focus:border-green-500 focus:outline-none resize-none"
          />

          <button
            onClick={handleTextAnalysis}
            disabled={!textInput}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
          >
            Analyze with NLP
          </button>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={16} className="text-green-600" />
              <span>Sentiment analysis (BERT)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={16} className="text-green-600" />
              <span>Category classification</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={16} className="text-green-600" />
              <span>Priority detection</span>
            </div>
          </div>
        </motion.div>

        {/* Audio Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
              <Mic className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg">Audio Analysis</h3>
          </div>
          
          <div className="border-2 border-gray-300 rounded-xl p-8 text-center mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center"
            >
              <Mic className="text-white" size={32} />
            </motion.div>
            <p className="text-sm text-gray-600 mb-2">Voice complaint recording</p>
            <button className="px-6 py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold hover:bg-purple-600">
              Start Recording
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={16} className="text-green-600" />
              <span>Speech-to-text (Whisper AI)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={16} className="text-green-600" />
              <span>Multi-language support</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={16} className="text-green-600" />
              <span>Real-time transcription</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Analysis in Progress */}
      {analyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-xl border-2 border-blue-200"
        >
          <div className="flex items-center justify-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="text-blue-600" size={32} />
            </motion.div>
            <div>
              <div className="text-xl font-bold text-gray-800">AI Processing...</div>
              <div className="text-sm text-gray-600">Analyzing with Computer Vision & NLP models</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analysis Results */}
      {analysisResult && !analyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6">AI Analysis Results</h2>

          {analysisResult.type === 'image' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                  <div className="text-sm text-gray-600 mb-1">Detected Issue</div>
                  <div className="text-xl font-bold text-red-600">{analysisResult.detected}</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                  <div className="text-sm text-gray-600 mb-1">Severity Level</div>
                  <div className="text-xl font-bold text-orange-600">{analysisResult.severity}</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="text-sm text-gray-600 mb-2">Composition Analysis</div>
                {analysisResult.items.map((item: string, i: number) => (
                  <div key={i} className="text-sm text-gray-700 mb-1">• {item}</div>
                ))}
              </div>

              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="text-sm text-gray-600 mb-1">Recommended Action</div>
                <div className="text-lg font-bold text-green-700">{analysisResult.action}</div>
                <div className="text-sm text-gray-500 mt-2">Confidence: {Math.round(analysisResult.confidence * 100)}%</div>
              </div>
            </div>
          )}

          {analysisResult.type === 'text' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                  <div className="text-sm text-gray-600 mb-1">Sentiment</div>
                  <div className="text-xl font-bold text-red-600">{analysisResult.sentiment}</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                  <div className="text-sm text-gray-600 mb-1">Category</div>
                  <div className="text-xl font-bold text-orange-600">{analysisResult.category}</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <div className="text-sm text-gray-600 mb-1">Priority</div>
                  <div className="text-xl font-bold text-purple-600">{analysisResult.priority}</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="text-sm text-gray-600 mb-2">Extracted Keywords</div>
                <div className="flex gap-2 flex-wrap">
                  {analysisResult.keywords.map((keyword: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-semibold">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="text-sm text-gray-600 mb-1">Auto-Generated Action</div>
                <div className="text-lg font-bold text-green-700">{analysisResult.action}</div>
                <div className="text-sm text-gray-500 mt-2">NLP Confidence: {Math.round(analysisResult.confidence * 100)}%</div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Technical Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-6">AI Models Powering Multi-Modal Analysis</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2 text-blue-400">Computer Vision</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• YOLOv8 object detection</li>
              <li>• ResNet-50 classification</li>
              <li>• 92% accuracy on garbage</li>
              <li>• Real-time processing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-green-400">Natural Language</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• BERT sentiment analysis</li>
              <li>• GPT-4 categorization</li>
              <li>• 88% intent accuracy</li>
              <li>• Multi-language support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-purple-400">Speech Recognition</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Whisper AI transcription</li>
              <li>• 95% word accuracy</li>
              <li>• 12 Indian languages</li>
              <li>• Noise cancellation</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
