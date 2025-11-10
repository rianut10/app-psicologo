"use client"

import { useState } from 'react'
import { Brain, MessageCircle, Heart, TrendingUp, BookOpen, Shield, Music, PenTool, Star, Check, ArrowRight, Users, Award, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function SalesPage() {
  const [showTestimonials, setShowTestimonials] = useState(false)

  const features = [
    {
      icon: MessageCircle,
      title: "Chat Terapêutico IA",
      description: "Conversas inteligentes 24/7 para apoio emocional"
    },
    {
      icon: Heart,
      title: "Rastreamento de Humor",
      description: "Monitore suas emoções e identifique padrões"
    },
    {
      icon: BookOpen,
      title: "Exercícios de Mindfulness",
      description: "Técnicas comprovadas para reduzir ansiedade"
    },
    {
      icon: TrendingUp,
      title: "Dashboard de Progresso",
      description: "Visualize sua jornada de bem-estar mental"
    },
    {
      icon: Music,
      title: "Música Relaxante",
      description: "Sons e melodias para acalmar a mente"
    },
    {
      icon: PenTool,
      title: "Diário Pessoal",
      description: "Registre pensamentos e reflexões diárias"
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empresária",
      content: "O MindCare mudou minha vida! Consegui controlar minha ansiedade e melhorar meu bem-estar geral.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Estudante",
      content: "Incrível como um app pode fazer tanta diferença. Uso todos os dias e me sinto muito melhor.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Professora",
      content: "Recomendo para todos! É como ter um psicólogo no bolso. Muito útil nos momentos difíceis.",
      rating: 5
    }
  ]

  const pricingPlans = [
    {
      name: "Básico",
      price: "Grátis",
      description: "Para começar sua jornada",
      features: [
        "Chat básico com IA",
        "Rastreamento de humor",
        "3 exercícios por dia",
        "Suporte por email"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "R$ 29,90/mês",
      description: "Acesso completo",
      features: [
        "Chat ilimitado com IA",
        "Todos os exercícios",
        "Relatórios detalhados",
        "Música relaxante premium",
        "Diário com backup",
        "Suporte prioritário",
        "Sessões com especialistas"
      ],
      popular: true
    },
    {
      name: "Família",
      price: "R$ 49,90/mês",
      description: "Para até 4 pessoas",
      features: [
        "Tudo do Premium",
        "4 contas familiares",
        "Dashboard familiar",
        "Controle parental",
        "Relatórios compartilhados"
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Header */}
      <header className="border-b bg-white/10 backdrop-blur-md sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  MindCare
                </h1>
                <p className="text-sm text-white/80 font-medium">
                  Seu assistente de bem-estar mental
                </p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-0 shadow-lg">
              <Shield className="w-3 h-3 mr-1" />
              Apoio profissional
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg text-lg px-6 py-2">
              <Users className="w-4 h-4 mr-2" />
              Mais de 50.000 usuários transformaram suas vidas
            </Badge>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transforme sua
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent block">
                Saúde Mental
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Descubra o poder de cuidar da sua mente com tecnologia de ponta. 
              Chat terapêutico, exercícios personalizados e acompanhamento profissional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/quiz">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform">
                  <Zap className="w-5 h-5 mr-2" />
                  Fazer Quiz Personalizado
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold text-lg px-8 py-4 rounded-2xl backdrop-blur-sm bg-white/10">
                Ver Demonstração
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Teste grátis 7 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Tudo que você precisa para cuidar da sua mente
            </h3>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Ferramentas cientificamente comprovadas para melhorar seu bem-estar mental
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/20 backdrop-blur-md border-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl w-fit">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/80 text-center text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-white/80">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">Suporte</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-white/80">Avaliação</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-12">
              O que nossos usuários dizem
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/20 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-white/90 mb-4 italic">"{testimonial.content}"</p>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Escolha o plano ideal para você
            </h3>
            <p className="text-xl text-white/80">
              Comece grátis e evolua conforme suas necessidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'bg-gradient-to-b from-yellow-400/20 to-orange-400/20 border-yellow-400 scale-105' : 'bg-white/20'} backdrop-blur-md border-white/20 hover:scale-105 transition-all duration-300`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-0">
                    <Award className="w-3 h-3 mr-1" />
                    Mais Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-white mb-2">{plan.price}</div>
                  <CardDescription className="text-white/80">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-white/90">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/quiz" className="block">
                    <Button className={`w-full mt-6 ${plan.popular ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black' : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'} font-semibold py-3 rounded-xl transition-all duration-300`}>
                      {plan.price === 'Grátis' ? 'Começar Grátis' : 'Fazer Quiz Primeiro'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para transformar sua vida?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Faça nosso quiz personalizado e descubra qual plano é perfeito para suas necessidades
            </p>
            
            <Link href="/quiz">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform">
                <Clock className="w-6 h-6 mr-3" />
                Fazer Quiz (2 minutos)
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
            
            <p className="text-white/70 mt-4">
              ✨ Quiz gratuito • Resultado instantâneo • Sem compromisso
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-xl">MindCare</span>
            </div>
            
            <div className="text-white/60 text-center">
              <p className="mb-2">© 2024 MindCare. Todos os direitos reservados.</p>
              <p className="text-sm flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                Ferramenta de apoio - não substitui profissionais de saúde mental
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Emergency Contact */}
      <div className="fixed bottom-4 right-4">
        <Card className="bg-gradient-to-r from-red-500 to-pink-500 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-4">
            <p className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Emergência?
            </p>
            <div className="space-y-1 text-xs text-white/90 font-medium">
              <p>CVV: 188 (24h)</p>
              <p>SAMU: 192</p>
              <p>Bombeiros: 193</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}