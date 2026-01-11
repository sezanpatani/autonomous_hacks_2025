'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useAppStore } from '@/store/appStore'

export default function AIAssistant() {
  const { toggleAIAssistant, cityName } = useAppStore()
  const [messages, setMessages] = useState<Array<{ role: string; content: string; id: string }>>([
    { 
      id: 'welcome', 
      role: 'assistant', 
      content: `👋 Hi! I'm your AI sustainability assistant powered by GPT-4. I have real-time access to ${cityName}'s ESG data. Ask me anything!` 
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { id: Date.now().toString(), role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          cityName 
        })
      })

      if (!response.ok) throw new Error('API request failed')
      
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let aiResponse = ''

      if (reader) {
        const assistantId = 'streaming'
        setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value)
          aiResponse += chunk
          
          setMessages(prev => {
            const newMessages = [...prev]
            const lastMsg = newMessages[newMessages.length - 1]
            if (lastMsg?.id === assistantId) {
              lastMsg.content = aiResponse
            }
            return newMessages
          })
        }

        setMessages(prev => {
          const newMessages = [...prev]
          const lastMsg = newMessages[newMessages.length - 1]
          if (lastMsg?.id === assistantId) {
            lastMsg.id = Date.now().toString()
          }
          return newMessages
        })
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const quickQuestions = [
    "What's the current AQI status?",
    "How can we improve water quality?",
    "Show social metrics insights",
    "Suggest governance improvements"
  ]

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    setTimeout(() => {
      const form = document.querySelector('#chat-form') as HTMLFormElement
      form?.requestSubmit()
    }, 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      className="fixed bottom-24 lg:bottom-8 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="text-white" size={16} />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <p className="text-white/80 text-xs">GPT-4 Powered</p>
          </div>
        </div>
        <button onClick={toggleAIAssistant} className="text-white hover:bg-white/20 p-2 rounded-lg">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((message: any) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 p-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleQuickQuestion(q)}
                className="text-xs p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form id="chat-form" onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about ESG metrics..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </form>
    </motion.div>
  )
}
