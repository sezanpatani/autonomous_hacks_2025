'use client'

import { motion } from 'framer-motion'
import { Leaf, Users, Building2, TrendingUp } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const modules = [
  {
    id: 'environment',
    title: 'Environment',
    icon: Leaf,
    color: 'from-green-400 to-emerald-600',
    bgColor: 'bg-green-50',
    description: 'Air, Water, Energy & Waste',
    stats: { value: '68', label: 'Score', trend: '+3%' },
  },
  {
    id: 'social',
    title: 'Social',
    icon: Users,
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Health, Education & Safety',
    stats: { value: '75', label: 'Score', trend: '+5%' },
  },
  {
    id: 'governance',
    title: 'Governance',
    icon: Building2,
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Transparency & Compliance',
    stats: { value: '73', label: 'Score', trend: '+2%' },
  },
]

export default function ESGModuleCards() {
  const { setCurrentModule } = useAppStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {modules.map((module, index) => (
        <motion.div
          key={module.id}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ y: -8, scale: 1.02 }}
          onClick={() => setCurrentModule(module.id as any)}
          className="cursor-pointer"
        >
          <div
            className={`relative ${module.bgColor} rounded-2xl p-6 shadow-lg overflow-hidden group transition-all`}
          >
            {/* Animated Background */}
            <motion.div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${module.color} rounded-full blur-2xl opacity-20`}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 shadow-lg`}
            >
              <module.icon className="text-white" size={32} />
            </motion.div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-2">{module.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{module.description}</p>

            {/* Stats */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r {module.color} bg-clip-text">
                  {module.stats.value}
                </div>
                <div className="text-xs text-gray-500">{module.stats.label}</div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-1 text-green-600 text-sm font-semibold"
              >
                <TrendingUp size={16} />
                {module.stats.trend}
              </motion.div>
            </div>

            {/* Hover Arrow */}
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              className="absolute bottom-4 right-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              →
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
