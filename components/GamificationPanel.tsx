'use client'

import { motion } from 'framer-motion'
import { Trophy, Award, Flame, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function GamificationPanel() {
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  // Static gamification data (can be moved to API later)
  const GAMIFICATION_DATA = {
    currentLevel: 'Silver City',
    points: 7250,
    streak: 12,
    badges: [
      { id: 1, name: 'Green Pioneer', icon: '🌱', earned: true },
      { id: 2, name: 'Water Savior', icon: '💧', earned: true },
      { id: 3, name: 'Clean Air Champion', icon: '🌬️', earned: false },
      { id: 4, name: 'Waste Warrior', icon: '♻️', earned: true },
    ],
    leaderboard: [
      { ward: 'Ward-A', score: 85, rank: 1 },
      { ward: 'Ward-B', score: 78, rank: 2 },
      { ward: 'Ward-C', score: 72, rank: 3 },
      { ward: 'Ward-D', score: 69, rank: 4 },
      { ward: 'Ward-E', score: 65, rank: 5 },
    ]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-2xl p-6 shadow-xl border-2 border-yellow-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="text-yellow-600" size={32} />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold">City Progress</h2>
            <p className="text-sm text-gray-600">Level up your sustainability!</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow-lg"
        >
          {showLeaderboard ? 'Hide' : 'Leaderboard'}
        </motion.button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Current Level */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
              <Award className="text-white" size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500">Current Level</div>
              <div className="text-lg font-bold text-yellow-600">
                {GAMIFICATION_DATA.currentLevel}
              </div>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">72% to Gold City</div>
        </motion.div>

        {/* Points */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500">Total Points</div>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-lg font-bold text-green-600"
              >
                {GAMIFICATION_DATA.points.toLocaleString()}
              </motion.div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
            <TrendingUp size={14} />
            +250 this week
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="p-3 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg"
            >
              <Flame className="text-white" size={24} />
            </motion.div>
            <div>
              <div className="text-xs text-gray-500">Day Streak</div>
              <div className="text-lg font-bold text-orange-600">
                {GAMIFICATION_DATA.streak} days 🔥
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600">Keep monitoring daily!</p>
        </motion.div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-xl p-4 shadow-lg mb-6">
        <h3 className="font-bold mb-4 text-gray-800">Achievement Badges</h3>
        <div className="grid grid-cols-4 gap-4">
          {GAMIFICATION_DATA.badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.2, y: -5 }}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center p-3 ${
                badge.earned
                  ? 'bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg'
                  : 'bg-gray-200 opacity-50'
              }`}
            >
              <motion.span
                animate={badge.earned ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-1"
              >
                {badge.icon}
              </motion.span>
              <span className={`text-xs font-semibold text-center ${
                badge.earned ? 'text-white' : 'text-gray-600'
              }`}>
                {badge.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      {showLeaderboard && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <h3 className="font-bold mb-4 text-gray-800 flex items-center gap-2">
            <Trophy className="text-yellow-500" size={20} />
            Ward-wise Leaderboard
          </h3>
          <div className="space-y-2">
            {GAMIFICATION_DATA.leaderboard.map((ward, index) => (
              <motion.div
                key={ward.ward}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index === 0
                    ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400'
                    : index === 1
                    ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300'
                    : index === 2
                    ? 'bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-300'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={index < 3 ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0
                        ? 'bg-yellow-500 text-white'
                        : index === 1
                        ? 'bg-gray-400 text-white'
                        : index === 2
                        ? 'bg-orange-400 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {ward.rank}
                  </motion.div>
                  <span className="font-semibold">{ward.ward}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {ward.score}
                    </div>
                    <div className="text-xs text-gray-500">ESG Score</div>
                  </div>
                  {index === 0 && <span className="text-2xl">🏆</span>}
                  {index === 1 && <span className="text-2xl">🥈</span>}
                  {index === 2 && <span className="text-2xl">🥉</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Monthly Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white"
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl"
          >
            🎯
          </motion.span>
          <div>
            <div className="font-bold">Monthly Green Challenge</div>
            <div className="text-sm opacity-90">Reduce AQI by 10% city-wide</div>
          </div>
        </div>
        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="h-full bg-white rounded-full"
          />
        </div>
        <div className="text-xs mt-2 opacity-90">65% complete • 10 days left</div>
      </motion.div>
    </motion.div>
  )
}
