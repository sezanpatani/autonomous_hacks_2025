'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { ESG_DATA } from '@/data/mockData'
import { useState } from 'react'

export default function CityMap() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Interactive City Map</h2>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <MapPin className="text-green-600" size={24} />
        </motion.div>
      </div>

      {/* City Grid Map */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 min-h-[400px]">
        {/* Grid Layout */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {ESG_DATA.environment.zones.map((zone, index) => (
            <motion.div
              key={zone.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              onClick={() => setSelectedZone(zone.id)}
              className="relative cursor-pointer"
            >
              {/* Zone Card */}
              <div
                className="relative rounded-xl p-4 backdrop-blur-sm border-2 transition-all"
                style={{
                  backgroundColor: `${zone.color}20`,
                  borderColor: selectedZone === zone.id ? zone.color : 'transparent',
                }}
              >
                {/* Pollution Cloud Animation */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 rounded-xl blur-xl"
                  style={{ backgroundColor: zone.color }}
                />

                <div className="relative z-10">
                  <div className="text-xs font-semibold text-gray-700 mb-2">
                    {zone.name}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className="text-2xl font-bold"
                        style={{ color: zone.color }}
                      >
                        {zone.aqi}
                      </div>
                      <div className="text-xs text-gray-500">AQI</div>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: zone.color }}
                    />
                  </div>
                </div>

                {/* Hover Details */}
                {selectedZone === zone.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-20 left-0 right-0 bg-white rounded-lg shadow-xl p-3 z-20"
                  >
                    <div className="text-xs space-y-1">
                      <p className="font-semibold">Status: {zone.pollution}</p>
                      <p className="text-gray-600">
                        AI Suggestion: Increase green cover by 15%
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3"
        >
          <div className="text-xs font-semibold mb-2">Pollution Level</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs">High (150+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-xs">Moderate (100-150)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-xs">Fair (50-100)</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
      >
        <p className="text-sm">
          <span className="font-semibold">🤖 AI Insight:</span> Zone-1 shows
          highest pollution. Implementing electric buses can reduce AQI by 12%
          in 3 months.
        </p>
      </motion.div>
    </motion.div>
  )
}
