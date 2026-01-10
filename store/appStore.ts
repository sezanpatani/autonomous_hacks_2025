import { create } from 'zustand'

export type UserRole = 'admin' | 'official' | 'public'

interface AppState {
  userRole: UserRole
  cityName: string
  esgScore: number
  showAIAssistant: boolean
  currentModule: 'home' | 'ai-hub' | 'environment' | 'social' | 'governance'
  setUserRole: (role: UserRole) => void
  setCurrentModule: (module: 'home' | 'ai-hub' | 'environment' | 'social' | 'governance') => void
  toggleAIAssistant: () => void
}

export const useAppStore = create<AppState>((set) => ({
  userRole: 'admin',
  cityName: 'Mumbai',
  esgScore: 72,
  showAIAssistant: false,
  currentModule: 'home',
  setUserRole: (role) => set({ userRole: role }),
  setCurrentModule: (module) => set({ currentModule: module }),
  toggleAIAssistant: () => set((state) => ({ showAIAssistant: !state.showAIAssistant })),
}))
