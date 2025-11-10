"use client"

import { useState } from 'react'
import { Brain, ArrowRight, ArrowLeft, CheckCircle, Heart, Users, Clock, Target, Star, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

interface Question {
  id: number
  question: string
  options: {
    text: string
    value: string
    points: { basic: number; premium: number; family: number }
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual é o seu principal objetivo com o bem-estar mental?",
    options: [
      {
        text: "Reduzir ansiedade e estresse do dia a dia",
        value: "anxiety",
        points: { basic: 1, premium: 3, family: 2 }
      },
      {
        text: "Melhorar meu humor e autoestima",
        value: "mood",
        points: { basic: 2, premium: 3, family: 1 }
      },
      {
        text: "Desenvolver hábitos saudáveis de mindfulness",
        value: "mindfulness",
        points: { basic: 1, premium: 3, family: 2 }
      },
      {
        text: "Ajudar minha família toda a ter mais bem-estar",
        value: "family",
        points: { basic: 0, premium: 1, family: 4 }
      }
    ]
  },
  {
    id: 2,
    question: "Com que frequência você sente necessidade de apoio emocional?",
    options: [
      {
        text: "Raramente, só em momentos específicos",
        value: "rarely",
        points: { basic: 3, premium: 1, family: 1 }
      },
      {
        text: "Algumas vezes por semana",
        value: "sometimes",
        points: { basic: 2, premium: 3, family: 2 }
      },
      {
        text: "Diariamente, preciso de suporte constante",
        value: "daily",
        points: { basic: 1, premium: 4, family: 2 }
      },
      {
        text: "Varia muito, depende da situação",
        value: "varies",
        points: { basic: 2, premium: 3, family: 2 }
      }
    ]
  },
  {
    id: 3,
    question: "Qual ferramenta seria mais útil para você?",
    options: [
      {
        text: "Chat com IA para conversas rápidas",
        value: "chat",
        points: { basic: 3, premium: 2, family: 1 }
      },
      {
        text: "Exercícios guiados de respiração e meditação",
        value: "exercises",
        points: { basic: 2, premium: 4, family: 2 }
      },
      {
        text: "Relatórios detalhados do meu progresso",
        value: "reports",
        points: { basic: 1, premium: 4, family: 3 }
      },
      {
        text: "Acesso a especialistas em saúde mental",
        value: "specialists",
        points: { basic: 0, premium: 4, family: 3 }
      }
    ]
  },
  {
    id: 4,
    question: "Quantas pessoas se beneficiariam do aplicativo?",
    options: [
      {
        text: "Apenas eu",
        value: "solo",
        points: { basic: 3, premium: 4, family: 0 }
      },
      {
        text: "Eu e meu(minha) parceiro(a)",
        value: "couple",
        points: { basic: 2, premium: 3, family: 3 }
      },
      {
        text: "Minha família (3-4 pessoas)",
        value: "family",
        points: { basic: 1, premium: 2, family: 5 }
      },
      {
        text: "Não tenho certeza ainda",
        value: "unsure",
        points: { basic: 2, premium: 3, family: 2 }
      }
    ]
  },
  {
    id: 5,
    question: "Qual é o seu orçamento mensal para bem-estar mental?",
    options: [
      {
        text: "Prefiro começar gratuitamente",
        value: "free",
        points: { basic: 5, premium: 1, family: 0 }
      },
      {
        text: "Até R$ 30 por mês",
        value: "low",
        points: { basic: 2, premium: 4, family: 2 }
      },
      {
        text: "Até R$ 50 por mês",
        value: "medium",
        points: { basic: 1, premium: 3, family: 4 }
      },
      {
        text: "Investiria mais se o valor fosse justificado",
        value: "high",
        points: { basic: 0, premium: 4, family: 4 }
      }
    ]
  }
]

const planRecommendations = {
  basic: {
    name: "Plano Básico",
    price: "Grátis",
    description: "Perfeito para começar sua jornada de bem-estar",
    features: [
      "Chat básico com IA",
      "Rastreamento de humor",
      "3 exercícios por dia",
      "Suporte por email"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  premium: {
    name: "Plano Premium",
    price: "R$ 29,90/mês",
    description: "Acesso completo para transformação real",
    features: [
      "Chat ilimitado com IA",
      "Todos os exercícios",
      "Relatórios detalhados",
      "Música relaxante premium",
      "Diário com backup",
      "Suporte prioritário",
      "Sessões com especialistas"
    ],
    color: "from-purple-500 to-pink-500"
  },
  family: {
    name: "Plano Família",
    price: "R$ 49,90/mês",
    description: "Bem-estar para toda a família",
    features: [
      "Tudo do Premium",
      "4 contas familiares",
      "Dashboard familiar",
      "Controle parental",
      "Relatórios compartilhados"
    ],
    color: "from-emerald-500 to-teal-500"
  }
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [recommendedPlan, setRecommendedPlan] = useState<'basic' | 'premium' | 'family'>('basic')

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateRecommendation()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateRecommendation = () => {
    const scores = { basic: 0, premium: 0, family: 0 }
    
    questions.forEach(question => {
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find(opt => opt.value === answer)
        if (option) {
          scores.basic += option.points.basic
          scores.premium += option.points.premium
          scores.family += option.points.family
        }
      }
    })

    const maxScore = Math.max(scores.basic, scores.premium, scores.family)
    if (scores.family === maxScore) {
      setRecommendedPlan('family')
    } else if (scores.premium === maxScore) {
      setRecommendedPlan('premium')
    } else {
      setRecommendedPlan('basic')
    }

    setShowResult(true)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResult) {
    const plan = planRecommendations[recommendedPlan]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        {/* Header */}
        <header className="border-b bg-white/10 backdrop-blur-md sticky top-0 z-50 shadow-2xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    MindCare
                  </h1>
                  <p className="text-sm text-white/80 font-medium">
                    Resultado do Quiz
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Perfeito! Encontramos o plano ideal para você
            </h2>

            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Com base nas suas respostas, recomendamos o plano que melhor atende às suas necessidades de bem-estar mental.
            </p>

            {/* Recommended Plan */}
            <Card className={`max-w-2xl mx-auto bg-gradient-to-br ${plan.color} border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 mb-12`}>
              <CardHeader className="text-center text-white">
                <Badge className="mx-auto mb-4 bg-white/20 text-white border-0 text-lg px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  Recomendado para você
                </Badge>
                <CardTitle className="text-3xl font-bold mb-2">{plan.name}</CardTitle>
                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                <CardDescription className="text-white/90 text-lg">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="text-white">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-lg">
                      <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-4">
                  <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    {plan.price === 'Grátis' ? 'Começar Grátis Agora' : 'Iniciar Teste Grátis (7 dias)'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <p className="text-white/80 text-sm">
                    {plan.price === 'Grátis' 
                      ? '✨ Sem cartão de crédito • Acesso imediato'
                      : '✨ Sem compromisso • Cancele quando quiser • Acesso completo'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Why This Plan */}
            <Card className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md border-white/20 mb-12">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center justify-center gap-2">
                  <Target className="w-6 h-6" />
                  Por que este plano é perfeito para você?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendedPlan === 'basic' && (
                    <>
                      <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Começar sem pressão</h4>
                          <p className="text-sm text-white/70">Você prefere testar antes de investir, e isso é inteligente!</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Suporte ocasional</h4>
                          <p className="text-sm text-white/70">Você busca apoio em momentos específicos, não diariamente.</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {recommendedPlan === 'premium' && (
                    <>
                      <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Transformação real</h4>
                          <p className="text-sm text-white/70">Você quer resultados consistentes e ferramentas avançadas.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Suporte completo</h4>
                          <p className="text-sm text-white/70">Você valoriza acesso a especialistas e relatórios detalhados.</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {recommendedPlan === 'family' && (
                    <>
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Bem-estar familiar</h4>
                          <p className="text-sm text-white/70">Você quer cuidar do bem-estar de toda sua família.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Economia inteligente</h4>
                          <p className="text-sm text-white/70">Melhor custo-benefício para múltiplos usuários.</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Other Plans */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                Ou explore outros planos
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {Object.entries(planRecommendations).map(([key, planData]) => (
                  <Card key={key} className={`${key === recommendedPlan ? 'opacity-50' : 'hover:scale-105'} bg-white/20 backdrop-blur-md border-white/20 transition-all duration-300`}>
                    <CardHeader className="text-center">
                      <CardTitle className="text-white text-xl">{planData.name}</CardTitle>
                      <div className="text-2xl font-bold text-white">{planData.price}</div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        className="w-full border-white/30 text-white hover:bg-white hover:text-gray-900"
                        disabled={key === recommendedPlan}
                      >
                        {key === recommendedPlan ? 'Recomendado' : 'Ver Plano'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-12">
              <Link href="/">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-purple-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const selectedAnswer = answers[currentQ.id]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Header */}
      <header className="border-b bg-white/10 backdrop-blur-md sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  MindCare
                </h1>
                <p className="text-sm text-white/80 font-medium">
                  Quiz Personalizado
                </p>
              </div>
            </Link>
            
            <Badge className="bg-white/20 text-white border-0">
              Pergunta {currentQuestion + 1} de {questions.length}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80 text-sm font-medium">Progresso</span>
              <span className="text-white/80 text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3 bg-white/20" />
          </div>

          {/* Question Card */}
          <Card className="bg-white/20 backdrop-blur-md border-white/20 shadow-2xl mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                {currentQ.question}
              </CardTitle>
              <CardDescription className="text-white/80 text-lg">
                Escolha a opção que mais se identifica com você
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full p-6 text-left justify-start h-auto border-2 transition-all duration-300 ${
                    selectedAnswer === option.value
                      ? 'border-yellow-400 bg-yellow-400/20 text-white shadow-lg scale-105'
                      : 'border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 hover:scale-102'
                  }`}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === option.value
                        ? 'border-yellow-400 bg-yellow-400'
                        : 'border-white/50'
                    }`}>
                      {selectedAnswer === option.value && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-lg font-medium">{option.text}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="border-white/30 text-white hover:bg-white hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <div className="flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentQuestion
                      ? 'bg-yellow-400 shadow-lg'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextQuestion}
              disabled={!selectedAnswer}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center mt-8">
            <p className="text-white/70 text-sm">
              ✨ Suas respostas nos ajudam a recomendar o plano perfeito para você
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}