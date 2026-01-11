'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Activity, CheckCircle, Clock, AlertCircle, Users, MessageSquare, Play, Zap } from 'lucide-react'
import { useMultiAgentActivity } from '@/lib/hooks'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default function MultiAgentOrchestrator() {
  const { activities, loading } = useMultiAgentActivity()
  const [agents, setAgents] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [summary, setSummary] = useState<any>({})
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [isOrchestrating, setIsOrchestrating] = useState(false)

  const handleOrchestrate = async (workflowType: string) => {
    setIsOrchestrating(true)
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'orchestrate_workflow', workflowType })
      })
      const result = await response.json()
      console.log('Workflow result:', result)
    } catch (error) {
      console.error('Orchestration error:', error)
    } finally {
      setTimeout(() => setIsOrchestrating(false), 8000)
    }
  }

  const getAgentColor = (role: string) => {
    const colors: Record<string, string> = {
      data_analyst: 'from-blue-500 to-cyan-500',
      policy_advisor: 'from-purple-500 to-pink-500',
      action_executor: 'from-green-500 to-emerald-500',
      monitor: 'from-orange-500 to-red-500'
    }
    return colors[role] || 'from-gray-500 to-gray-600'
  }

  const getStatusIcon = (status: string) => {
    if (status === 'busy') return <Activity className="animate-pulse" size={20} />
    if (status === 'idle') return <CheckCircle size={20} />
    return <AlertCircle size={20} />
  }

  if (loading) {
    return <div className="text-center py-20">Loading Multi-Agent Orchestrator...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header with Summary */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl"
            >
              <Users className="w-10 h-10" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold">Multi-Agent Orchestrator</h1>
              <p className="text-indigo-100">Coordinating specialized AI agents for complex ESG tasks</p>
            </div>
          </div>
          
          {summary && (
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{summary.busyAgents}/{summary.totalAgents}</div>
                <div className="text-sm text-indigo-200">Active Agents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{summary.completedTasks}</div>
                <div className="text-sm text-indigo-200">Tasks Done</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{summary.pendingTasks}</div>
                <div className="text-sm text-indigo-200">In Queue</div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOrchestrate('pollution_analysis')}
            disabled={isOrchestrating}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
          >
            <Play size={18} />
            Pollution Analysis Workflow
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOrchestrate('policy_implementation')}
            disabled={isOrchestrating}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
          >
            <Zap size={18} />
            Policy Implementation
          </motion.button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Agent Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Brain className="text-purple-600" />
            Agent Status
          </h2>
          
          <div className="space-y-4">
            {agents.map((agent: any, index: number) => (
              <motion.div
                key={agent.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => setSelectedAgent(agent.role)}
                className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  selectedAgent === agent.role
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-transparent bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getAgentColor(agent.role)}`}>
                      {getStatusIcon(agent.status)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{agent.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {agent.status} • {agent.tasksCompleted} tasks completed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">
                      {(agent.successRate * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">Success Rate</div>
                  </div>
                </div>

                {/* Current Task */}
                {agent.currentTask && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 p-3 bg-white rounded-lg border border-purple-200"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={14} className="text-purple-600" />
                      <span className="font-semibold">Current:</span>
                      <span className="text-gray-700">{agent.currentTask.title}</span>
                    </div>
                  </motion.div>
                )}

                {/* Capabilities (show when selected) */}
                {selectedAgent === agent.role && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 space-y-1"
                  >
                    <p className="text-xs font-semibold text-gray-600 mb-2">Capabilities:</p>
                    {agent.capabilities?.map((cap: string, i: number) => (
                      <div key={i} className="text-xs text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {cap}
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Communication Log */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="text-blue-600" />
            Communication Log
          </h2>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            <AnimatePresence>
              {messages.slice().reverse().map((msg: any, index: number) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg ${
                    msg.type === 'alert'
                      ? 'bg-red-50 border border-red-200'
                      : msg.type === 'request'
                      ? 'bg-yellow-50 border border-yellow-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        msg.type === 'alert' ? 'bg-red-500' :
                        msg.type === 'request' ? 'bg-yellow-500' :
                        msg.type === 'response' ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <span className="text-xs font-semibold text-gray-700 capitalize">
                        {msg.from.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-400">→</span>
                      <span className="text-xs text-gray-600 capitalize">
                        {msg.to === 'all' ? 'All Agents' : msg.to.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{msg.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Task Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Activity className="text-green-600" />
          Task Execution Timeline
        </h2>

        <div className="space-y-3">
          {tasks.slice(-10).reverse().map((task: any, index: number) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {/* Status Indicator */}
              <div className="flex-shrink-0">
                {task.status === 'completed' && (
                  <CheckCircle className="text-green-500" size={24} />
                )}
                {task.status === 'in_progress' && (
                  <Activity className="text-blue-500 animate-pulse" size={24} />
                )}
                {task.status === 'pending' && (
                  <Clock className="text-gray-400" size={24} />
                )}
                {task.status === 'failed' && (
                  <AlertCircle className="text-red-500" size={24} />
                )}
              </div>

              {/* Task Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-gray-800">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.priority === 'critical' ? 'bg-red-100 text-red-700' :
                    task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="capitalize">{task.assignedTo.replace('_', ' ')}</span>
                  <span>•</span>
                  <span className="capitalize">{task.status.replace('_', ' ')}</span>
                  {task.completedAt && (
                    <>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(task.completedAt), { addSuffix: true })}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Duration */}
              {task.startedAt && task.completedAt && (
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-700">
                    {((new Date(task.completedAt).getTime() - new Date(task.startedAt).getTime()) / 1000).toFixed(1)}s
                  </div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Orchestration in Progress */}
      <AnimatePresence>
        {isOrchestrating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Zap size={24} />
              </motion.div>
              <div>
                <div className="font-bold">Workflow in Progress</div>
                <div className="text-sm text-purple-100">Agents collaborating...</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
