'use client'

import { motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

export default function FloatingActionButton() {
  const { toggleAIAssistant, showAIAssistant } = useAppStore()

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleAIAssistant}
      className="fixed bottom-24 lg:bottom-8 right-6 w-16 h-16 rounded-full gradient-esg shadow-2xl flex items-center justify-center z-40"
    >
      <motion.div
        animate={{ rotate: showAIAssistant ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {showAIAssistant ? (
          <X className="text-white" size={28} />
        ) : (
          <MessageCircle className="text-white" size={28} />
        )}
      </motion.div>
    </motion.button>
  )
}
