'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Leaf, Users, Building2, Menu, X, Brain } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import AIAssistant from './AIAssistant'
import FloatingActionButton from './FloatingActionButton'

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'ai-hub', label: 'AI Intelligence', icon: Brain },
  { id: 'environment', label: 'Environment', icon: Leaf },
  { id: 'social', label: 'Social', icon: Users },
  { id: 'governance', label: 'Governance', icon: Building2 },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentModule, setCurrentModule, showAIAssistant } = useAppStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white shadow-xl flex-col z-40"
      >
        <div className="p-6 border-b">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full gradient-esg flex items-center justify-center">
              <Leaf className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl">ESG City</h1>
              <p className="text-xs text-gray-500">Smart Sustainability</p>
            </div>
          </motion.div>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setCurrentModule(item.id as any)}
              className={`w-full flex items-center gap-3 p-4 rounded-lg mb-2 transition-all ${
                currentModule === item.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                  : 'hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="text-xs text-gray-500 text-center">
            <p>🏆 Winning Design</p>
            <p className="font-semibold text-green-600">Hackathon Ready</p>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl flex flex-col z-50 lg:hidden"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-esg flex items-center justify-center">
                  <Leaf className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="font-bold text-lg">ESG City</h1>
                  <p className="text-xs text-gray-500">Smart Platform</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 p-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentModule(item.id as any)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg mb-2 transition-all ${
                    currentModule === item.id
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </motion.aside>
        </>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-white shadow-sm sticky top-0 z-30"
        >
          <div className="px-4 py-4 flex items-center justify-between">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold capitalize">
              {currentModule === 'home' ? 'Dashboard' : currentModule}
            </h2>
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 bg-green-100 rounded-full text-xs font-semibold text-green-700"
              >
                🌟 Level: Silver
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <main className="p-4 pb-24 lg:pb-8">{children}</main>

        {/* Bottom Navigation (Mobile) */}
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-30"
        >
          <div className="flex justify-around py-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentModule(item.id as any)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg ${
                  currentModule === item.id
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}
              >
                <item.icon size={24} />
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.nav>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* AI Assistant */}
      {showAIAssistant && <AIAssistant />}
    </div>
  )
}
