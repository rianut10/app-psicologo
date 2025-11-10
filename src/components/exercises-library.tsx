"use client"

import { useState } from 'react'
import { Play, Pause, RotateCcw, BookOpen, Wind, Brain, Heart, Zap, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Exercise {
  id: string
  title: string
  description: string
  category: 'breathing' | 'mindfulness' | 'cognitive' | 'relaxation'
  duration: number
  difficulty: 'easy' | 'medium' | 'hard'
  instructions: string[]
  benefits: string[]
}

const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Respiração 4-7-8',
    description: 'Técnica de respiração para reduzir ansiedade e promover relaxamento',
    category: 'breathing',
    duration: 5,
    difficulty: 'easy',
    instructions: [
      'Sente-se confortavelmente com as costas retas',
      'Expire completamente pela boca',
      'Inspire pelo nariz contando até 4',
      'Segure a respiração contando até 7',
      'Expire pela boca contando até 8',
      'Repita o ciclo 4 vezes'
    ],
    benefits: ['Reduz ansiedade', 'Melhora o sono', 'Diminui o estresse']
  },
  {
    id: '2',
    title: 'Mindfulness dos 5 Sentidos',
    description: 'Exercício de atenção plena para se conectar com o momento presente',
    category: 'mindfulness',
    duration: 10,
    difficulty: 'easy',
    instructions: [
      'Encontre um local confortável para sentar',
      'Identifique 5 coisas que você pode VER',
      'Identifique 4 coisas que você pode TOCAR',
      'Identifique 3 coisas que você pode OUVIR',
      'Identifique 2 coisas que você pode CHEIRAR',
      'Identifique 1 coisa que você pode SABOREAR',
      'Respire profundamente e observe como se sente'
    ],
    benefits: ['Reduz ansiedade', 'Aumenta a consciência', 'Promove calma']
  },
  {
    id: '3',
    title: 'Reestruturação Cognitiva',
    description: 'Técnica para identificar e modificar pensamentos negativos',
    category: 'cognitive',
    duration: 15,
    difficulty: 'medium',
    instructions: [
      'Identifique um pensamento negativo que está te incomodando',
      'Escreva esse pensamento em uma folha',
      'Pergunte-se: "Este pensamento é realista?"',
      'Pergunte-se: "Que evidências eu tenho a favor e contra?"',
      'Pergunte-se: "Como eu aconselharia um amigo nesta situação?"',
      'Reformule o pensamento de forma mais equilibrada',
      'Pratique o novo pensamento'
    ],
    benefits: ['Melhora o humor', 'Reduz pensamentos negativos', 'Aumenta autoestima']
  },
  {
    id: '4',
    title: 'Relaxamento Muscular Progressivo',
    description: 'Técnica para relaxar o corpo e a mente através da tensão e relaxamento muscular',
    category: 'relaxation',
    duration: 20,
    difficulty: 'medium',
    instructions: [
      'Deite-se confortavelmente',
      'Comece pelos pés: contraia por 5 segundos, depois relaxe',
      'Suba para as panturrilhas: contraia e relaxe',
      'Continue com coxas, glúteos, abdômen',
      'Prossiga com mãos, braços, ombros',
      'Finalize com pescoço e rosto',
      'Observe a sensação de relaxamento total'
    ],
    benefits: ['Reduz tensão muscular', 'Melhora o sono', 'Diminui estresse físico']
  },
  {
    id: '5',
    title: 'Meditação da Bondade Amorosa',
    description: 'Prática para cultivar compaixão por si mesmo e outros',
    category: 'mindfulness',
    duration: 12,
    difficulty: 'medium',
    instructions: [
      'Sente-se confortavelmente e feche os olhos',
      'Comece enviando bondade para si mesmo: "Que eu seja feliz, que eu seja saudável"',
      'Visualize alguém que você ama e envie os mesmos desejos',
      'Pense em uma pessoa neutra e envie bondade',
      'Pense em alguém difícil e tente enviar bondade',
      'Estenda para todos os seres: "Que todos sejam felizes"',
      'Termine voltando a atenção para si mesmo'
    ],
    benefits: ['Aumenta compaixão', 'Melhora relacionamentos', 'Reduz raiva']
  },
  {
    id: '6',
    title: 'Respiração Quadrada',
    description: 'Técnica de respiração rítmica para equilibrar o sistema nervoso',
    category: 'breathing',
    duration: 8,
    difficulty: 'easy',
    instructions: [
      'Sente-se com a coluna ereta',
      'Expire completamente',
      'Inspire contando até 4',
      'Segure a respiração contando até 4',
      'Expire contando até 4',
      'Pause contando até 4',
      'Repita por 8 ciclos completos'
    ],
    benefits: ['Equilibra sistema nervoso', 'Melhora concentração', 'Reduz estresse']
  }
]

const categoryIcons = {
  breathing: Wind,
  mindfulness: Brain,
  cognitive: Zap,
  relaxation: Heart
}

const categoryColors = {
  breathing: 'text-blue-500',
  mindfulness: 'text-purple-500',
  cognitive: 'text-yellow-500',
  relaxation: 'text-green-500'
}

const difficultyColors = {
  easy: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0',
  medium: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0',
  hard: 'bg-gradient-to-r from-red-400 to-pink-500 text-white border-0'
}

export default function ExercisesLibrary() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setCurrentStep(0)
    setTimeRemaining(exercise.duration * 60) // Convert to seconds
    setIsActive(false)
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetExercise = () => {
    setIsActive(false)
    setCurrentStep(0)
    if (selectedExercise) {
      setTimeRemaining(selectedExercise.duration * 60)
    }
  }

  const nextStep = () => {
    if (selectedExercise && currentStep < selectedExercise.instructions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const filteredExercises = activeCategory === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.category === activeCategory)

  const categories = [
    { id: 'all', label: 'Todos', icon: BookOpen },
    { id: 'breathing', label: 'Respiração', icon: Wind },
    { id: 'mindfulness', label: 'Mindfulness', icon: Brain },
    { id: 'cognitive', label: 'Cognitivo', icon: Zap },
    { id: 'relaxation', label: 'Relaxamento', icon: Heart }
  ]

  if (selectedExercise) {
    return (
      <Card className="h-[600px] flex flex-col bg-white/10 dark:bg-black/20 backdrop-blur-md border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const Icon = categoryIcons[selectedExercise.category]
                  return (
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  )
                })()}
                <span className="text-xl font-bold">{selectedExercise.title}</span>
              </CardTitle>
              <CardDescription className="text-white/90 font-medium">
                {selectedExercise.description}
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setSelectedExercise(null)}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              Voltar
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-6">
          {/* Timer */}
          <div className="text-center mb-6">
            <div className="text-5xl font-mono font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {formatTime(timeRemaining)}
            </div>
            <div className="flex justify-center gap-3 mb-4">
              <Button 
                onClick={toggleTimer} 
                className={`px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                } text-white border-0`}
              >
                {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                <span className="font-bold">{isActive ? 'Pausar' : 'Iniciar'}</span>
              </Button>
              <Button 
                onClick={resetExercise} 
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                <span className="font-bold">Reiniciar</span>
              </Button>
            </div>
            <Progress 
              value={((selectedExercise.duration * 60 - timeRemaining) / (selectedExercise.duration * 60)) * 100} 
              className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden"
            />
          </div>

          {/* Instructions */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">
              Passo {currentStep + 1} de {selectedExercise.instructions.length}
            </h3>
            <div className="bg-gradient-to-r from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm p-6 rounded-2xl mb-6 shadow-lg">
              <p className="text-lg leading-relaxed font-medium text-gray-800 dark:text-gray-200">
                {selectedExercise.instructions[currentStep]}
              </p>
            </div>
            
            <div className="flex justify-between">
              <Button 
                onClick={prevStep} 
                disabled={currentStep === 0}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </Button>
              <Button 
                onClick={nextStep} 
                disabled={currentStep === selectedExercise.instructions.length - 1}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-6">
            <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">Benefícios:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedExercise.benefits.map((benefit, index) => (
                <Badge key={index} className="bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0 shadow-lg px-3 py-1">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div 
      className="space-y-6 min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&crop=center')`
      }}
    >
      {/* Overlay para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
      
      {/* Conteúdo com z-index para ficar acima do overlay */}
      <div className="relative z-10">
        <Card className="bg-gradient-to-br from-indigo-50/95 to-purple-50/95 dark:from-indigo-900/90 dark:to-purple-900/90 backdrop-blur-md border-0 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Biblioteca de Exercícios</span>
            </CardTitle>
            <CardDescription className="text-white/90 font-medium">
              Exercícios práticos para melhorar seu bem-estar mental
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-md ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0'
                    : 'bg-white/90 dark:bg-gray-800/90 hover:bg-white/95 border-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-semibold">{category.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => {
            const Icon = categoryIcons[exercise.category]
            return (
              <Card key={exercise.id} className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/95 dark:bg-black/90 backdrop-blur-md border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl shadow-lg ${
                        exercise.category === 'breathing' ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                        exercise.category === 'mindfulness' ? 'bg-gradient-to-r from-purple-400 to-indigo-500' :
                        exercise.category === 'cognitive' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        'bg-gradient-to-r from-green-400 to-emerald-500'
                      }`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {exercise.title}
                      </CardTitle>
                    </div>
                    <Badge className={`${difficultyColors[exercise.difficulty]} shadow-lg`}>
                      {exercise.difficulty === 'easy' ? 'Fácil' : 
                       exercise.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2 font-medium text-gray-600 dark:text-gray-400">
                    {exercise.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-semibold">
                      <div className="p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl shadow-lg">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      {exercise.duration} min
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm font-bold mb-3 text-gray-800 dark:text-gray-200">Benefícios:</p>
                    <div className="flex flex-wrap gap-2">
                      {exercise.benefits.slice(0, 2).map((benefit, index) => (
                        <Badge key={index} className="bg-gradient-to-r from-pink-400 to-red-500 text-white border-0 text-xs shadow-lg">
                          {benefit}
                        </Badge>
                      ))}
                      {exercise.benefits.length > 2 && (
                        <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0 text-xs shadow-lg">
                          +{exercise.benefits.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => startExercise(exercise)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl py-3 font-bold"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Começar Exercício
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}