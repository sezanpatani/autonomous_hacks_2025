'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import ESGScoreMeter from './dashboard/ESGScoreMeter'
import ESGModuleCards from './dashboard/ESGModuleCards'
import CityMap from './dashboard/CityMap'
import AIInsights from './dashboard/AIInsights'
import QuickStats from './dashboard/QuickStats'
import EnvironmentModule from './modules/EnvironmentModule'
import SocialModule from './modules/SocialModule'
import GovernanceModule from './modules/GovernanceModule'
import GamificationPanel from './GamificationPanel'
import AIHub from './ai/AIHub'

export default function Dashboard() {
  const { cityName, currentModule } = useAppStore()

  // Render module-specific views
  if (currentModule === 'ai-hub') return <AIHub />
  if (currentModule === 'environment') return <EnvironmentModule />
  if (currentModule === 'social') return <SocialModule />
  if (currentModule === 'governance') return <GovernanceModule />

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center lg:text-left"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-3xl lg:text-4xl font-bold gradient-esg bg-clip-text text-transparent"
        >
          Welcome to {cityName}
        </motion.h1>
        <p className="text-gray-600 mt-2">
          Real-time sustainability insights powered by AI
        </p>
      </motion.div>

      {/* ESG Score Meter - Hero Section */}
      <ESGScoreMeter />

      {/* Quick Stats */}
      <QuickStats />

      {/* ESG Module Cards */}
      <ESGModuleCards />

      {/* Gamification Panel */}
      <GamificationPanel />

      {/* Interactive City Map */}
      <CityMap />

      {/* AI Insights */}
      <AIInsights />
    </div>
  )
}
