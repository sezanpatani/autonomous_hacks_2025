'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mic, Volume2 } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '@/store/appStore'

const AI_RESPONSES = [
  "I've analyzed Zone-1's pollution data. The AQI spike is due to increased vehicle traffic during peak hours. I recommend implementing a congestion charge or promoting public transport.",
  "Your city's water usage increased by 8% this month. The main issue is in Zone-3 where old pipelines are causing leakage. Fixing these could save 2 million liters per day.",
  "Great news! Your waste recycling rate improved by 5% this quarter. To reach 60%, focus on educational campaigns in residential areas.",
  "Healthcare access in Zone-5 is below target. I've identified 3 optimal locations for new health centers based on population density and travel distance.",
]

export default function AIAssistant() {
  const { toggleAIAssistant } = useAppStore()
  const [messages, setMessages] = useState([
    { role: 'ai', text: "👋 Hi! I'm your AI sustainability assistant. Ask me anything about your city's ESG performance!" },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: 'user', text: input }
    setMessages([...messages, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'ai',
        text: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      className="fixed bottom-24 lg:bottom-8 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="gradient-esg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
          >
            <span className="text-2xl">🤖</span>
          </motion.div>
          <div>
            <h3 className="text-white font-bold">AI Assistant</h3>
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-green-300 rounded-full"
              />
              <span className="text-xs text-white/80">Online</span>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAIAssistant}
          className="text-white"
        >
          <X size={24} />
        </motion.button>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'bg-white shadow-md'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white rounded-2xl p-3 shadow-md">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex gap-1"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Mic size={20} className="text-gray-600" />
          </motion.button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about ESG insights..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={sendMessage}
            className="p-2 rounded-full gradient-esg"
          >
            <Send size={20} className="text-white" />
          </motion.button>
        </div>

        {/* Voice Support Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-500"
        >
          <Volume2 size={12} />
          <span>Voice & text support available</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
