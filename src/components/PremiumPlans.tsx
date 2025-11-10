'use client'

import React, { useState, useEffect } from 'react'
import { Crown, Check, Sparkles, Brain, TrendingUp, MessageCircle, BookOpen, Library, Music, Cloud } from 'lucide-react'
import { useAuth } from '@/contexts/AuthProvider'
import { premiumService, PremiumBenefit } from '@/lib/database-service'

const iconMap = {
  Brain,
  TrendingUp,
  MessageCircle,
  BookOpen,
  Sparkles,
  Library,
  Music,
  Cloud
}

export default function PremiumPlans() {
  const { user, isPremium, refreshPremiumStatus } = useAuth()
  const [benefits, setBenefits] = useState<PremiumBenefit[]>([])
  const [loading, setLoading] = useState(true)
  const [activating, setActivating] = useState(false)

  useEffect(() => {
    loadBenefits()
  }, [])

  const loadBenefits = async () => {
    try {
      const data = await premiumService.getPremiumBenefits()
      setBenefits(data)
    } catch (error) {
      console.error('Erro ao carregar benefícios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleActivatePremium = async () => {
    if (!user) return

    setActivating(true)
    try {
      await premiumService.activatePremium(user.id, 1)
      await refreshPremiumStatus()
      alert('🎉 Plano Premium ativado com sucesso!')
    } catch (error) {
      console.error('Erro ao ativar premium:', error)
      alert('Erro ao ativar plano premium. Tente novamente.')
    } finally {
      setActivating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-12 w-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Plano Premium
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Desbloqueie todo o potencial do seu bem-estar mental com recursos exclusivos e suporte especializado
          </p>
        </div>

        {/* Status Atual */}
        {user && (
          <div className="mb-8 text-center">
            <div className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium ${
              isPremium 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-gray-100 text-gray-800 border border-gray-200'
            }`}>
              {isPremium ? (
                <>
                  <Crown className="h-4 w-4 mr-2 text-yellow-500" />
                  Você é Premium! 🎉
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Plano Gratuito
                </>
              )}
            </div>
          </div>
        )}

        {/* Planos */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Plano Gratuito */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Plano Gratuito</h3>
              <div className="text-3xl font-bold text-gray-600 mb-2">R$ 0</div>
              <p className="text-gray-500">Para sempre</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Acesso básico aos exercícios</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Diário pessoal limitado</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Biblioteca básica de livros</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Músicas relaxantes básicas</span>
              </li>
            </ul>

            <button 
              disabled 
              className="w-full py-3 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed"
            >
              Plano Atual
            </button>
          </div>

          {/* Plano Premium */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Crown className="h-8 w-8 text-yellow-300" />
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Plano Premium</h3>
              <div className="text-3xl font-bold mb-2">R$ 9,90</div>
              <p className="text-purple-100">por mês</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-300 mr-3" />
                <span>Tudo do plano gratuito</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-300 mr-3" />
                <span>Acesso ilimitado a todos os recursos</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-300 mr-3" />
                <span>Relatórios de progresso detalhados</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-300 mr-3" />
                <span>Chat com especialistas</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-300 mr-3" />
                <span>Conteúdos exclusivos</span>
              </li>
            </ul>

            {user ? (
              <button 
                onClick={handleActivatePremium}
                disabled={activating || isPremium}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  isPremium 
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-white text-purple-600 hover:bg-gray-50 hover:scale-105'
                }`}
              >
                {activating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600 mr-2"></div>
                    Ativando...
                  </div>
                ) : isPremium ? (
                  'Plano Ativo ✓'
                ) : (
                  'Ativar Premium'
                )}
              </button>
            ) : (
              <button className="w-full py-3 px-4 bg-white text-purple-600 rounded-lg font-medium">
                Faça Login para Assinar
              </button>
            )}
          </div>
        </div>

        {/* Benefícios Detalhados */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Vantagens Exclusivas do Premium
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const IconComponent = iconMap[benefit.icone as keyof typeof iconMap] || Sparkles
              
              return (
                <div key={benefit.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.titulo}</h3>
                    <p className="text-gray-600 text-sm">{benefit.descricao}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        {!isPremium && user && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Pronto para transformar seu bem-estar?
              </h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Junte-se a milhares de pessoas que já descobriram o poder do cuidado mental premium
              </p>
              <button 
                onClick={handleActivatePremium}
                disabled={activating}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 hover:scale-105 transition-all"
              >
                {activating ? 'Ativando...' : 'Começar Agora - R$ 9,90/mês'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}