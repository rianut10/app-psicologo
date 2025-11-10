'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { authService, premiumService } from '@/lib/database-service'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  isPremium: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, nome: string) => Promise<void>
  signOut: () => Promise<void>
  refreshPremiumStatus: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)

  // Verificar status premium
  const refreshPremiumStatus = async () => {
    if (user) {
      try {
        const premiumStatus = await premiumService.checkPremiumStatus(user.id)
        setIsPremium(premiumStatus)
      } catch (error) {
        console.error('Erro ao verificar status premium:', error)
        setIsPremium(false)
      }
    } else {
      setIsPremium(false)
    }
  }

  // Inicializar autenticação
  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Verificar status premium quando usuário muda
  useEffect(() => {
    if (user) {
      refreshPremiumStatus()
    }
  }, [user])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await authService.signIn(email, password)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, nome: string) => {
    setLoading(true)
    try {
      await authService.signUp(email, password, nome)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await authService.signOut()
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    isPremium,
    signIn,
    signUp,
    signOut,
    refreshPremiumStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}