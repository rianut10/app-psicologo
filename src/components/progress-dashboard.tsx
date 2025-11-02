"use client"

import { useState, useEffect } from 'react'
import { TrendingUp, Calendar, Target, Award, BarChart3, Activity, Smile, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ProgressData {
  totalSessions: number
  weeklyGoal: number
  currentStreak: number
  longestStreak: number
  averageMood: number
  averageEnergy: number
  exercisesCompleted: number
  favoriteCategory: string
  weeklyMoodData: Array<{ day: string; mood: number; energy: number }>
  achievements: Array<{ id: string; title: string; description: string; earned: boolean; date?: string }>
}

const achievements = [
  {
    id: 'first-session',
    title: 'Primeiro Passo',
    description: 'Complete sua primeira sessão de bem-estar',
    earned: false
  },
  {
    id: 'week-streak',
    title: 'Semana Consistente',
    description: 'Mantenha uma sequência de 7 dias',
    earned: false
  },
  {
    id: 'mood-tracker',
    title: 'Observador de Humor',
    description: 'Registre seu humor por 10 dias',
    earned: false
  },
  {
    id: 'exercise-master',
    title: 'Mestre dos Exercícios',
    description: 'Complete 20 exercícios diferentes',
    earned: false
  },
  {
    id: 'mindful-month',
    title: 'Mês Mindful',
    description: 'Pratique por 30 dias consecutivos',
    earned: false
  },
  {
    id: 'positive-trend',
    title: 'Tendência Positiva',
    description: 'Mantenha humor acima de 3.5 por uma semana',
    earned: false
  }
]

export default function ProgressDashboard() {
  const [progressData, setProgressData] = useState<ProgressData>({
    totalSessions: 0,
    weeklyGoal: 5,
    currentStreak: 0,
    longestStreak: 0,
    averageMood: 0,
    averageEnergy: 0,
    exercisesCompleted: 0,
    favoriteCategory: 'breathing',
    weeklyMoodData: [],
    achievements: achievements
  })

  useEffect(() => {
    // Simular carregamento de dados do localStorage
    const loadProgressData = () => {
      const moodEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]')
      const exerciseHistory = JSON.parse(localStorage.getItem('exerciseHistory') || '[]')
      
      // Calcular estatísticas
      const totalSessions = moodEntries.length + exerciseHistory.length
      const averageMood = moodEntries.length > 0 
        ? moodEntries.reduce((acc: number, entry: any) => acc + entry.mood, 0) / moodEntries.length 
        : 0
      const averageEnergy = moodEntries.length > 0
        ? moodEntries.reduce((acc: number, entry: any) => acc + entry.energy, 0) / moodEntries.length
        : 0

      // Calcular sequência atual
      const currentStreak = calculateCurrentStreak(moodEntries)
      const longestStreak = calculateLongestStreak(moodEntries)

      // Atualizar conquistas
      const updatedAchievements = achievements.map(achievement => {
        let earned = false
        let date = undefined

        switch (achievement.id) {
          case 'first-session':
            earned = totalSessions > 0
            break
          case 'week-streak':
            earned = currentStreak >= 7
            break
          case 'mood-tracker':
            earned = moodEntries.length >= 10
            break
          case 'exercise-master':
            earned = exerciseHistory.length >= 20
            break
          case 'mindful-month':
            earned = currentStreak >= 30
            break
          case 'positive-trend':
            earned = averageMood >= 3.5 && moodEntries.length >= 7
            break
        }

        if (earned && !achievement.earned) {
          date = new Date().toISOString()
        }

        return { ...achievement, earned, date }
      })

      setProgressData({
        totalSessions,
        weeklyGoal: 5,
        currentStreak,
        longestStreak,
        averageMood,
        averageEnergy,
        exercisesCompleted: exerciseHistory.length,
        favoriteCategory: 'breathing',
        weeklyMoodData: generateWeeklyMoodData(moodEntries),
        achievements: updatedAchievements
      })
    }

    loadProgressData()
  }, [])

  const calculateCurrentStreak = (entries: any[]) => {
    if (entries.length === 0) return 0
    
    const today = new Date()
    let streak = 0
    let currentDate = new Date(today)

    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0]
      const hasEntry = entries.some(entry => entry.date === dateStr)
      
      if (hasEntry) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  }

  const calculateLongestStreak = (entries: any[]) => {
    if (entries.length === 0) return 0
    
    const sortedEntries = entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    let longestStreak = 1
    let currentStreak = 1
    
    for (let i = 1; i < sortedEntries.length; i++) {
      const prevDate = new Date(sortedEntries[i - 1].date)
      const currentDate = new Date(sortedEntries[i].date)
      const diffTime = currentDate.getTime() - prevDate.getTime()
      const diffDays = diffTime / (1000 * 60 * 60 * 24)
      
      if (diffDays === 1) {
        currentStreak++
        longestStreak = Math.max(longestStreak, currentStreak)
      } else {
        currentStreak = 1
      }
    }
    
    return longestStreak
  }

  const generateWeeklyMoodData = (entries: any[]) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const weekData = []
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const dayEntries = entries.filter(entry => entry.date === dateStr)
      const avgMood = dayEntries.length > 0 
        ? dayEntries.reduce((acc, entry) => acc + entry.mood, 0) / dayEntries.length 
        : 0
      const avgEnergy = dayEntries.length > 0
        ? dayEntries.reduce((acc, entry) => acc + entry.energy, 0) / dayEntries.length
        : 0
      
      weekData.push({
        day: days[date.getDay()],
        mood: avgMood,
        energy: avgEnergy
      })
    }
    
    return weekData
  }

  const getWeeklyProgress = () => {
    const thisWeekSessions = progressData.weeklyMoodData.filter(day => day.mood > 0).length
    return (thisWeekSessions / progressData.weeklyGoal) * 100
  }

  const earnedAchievements = progressData.achievements.filter(a => a.earned)
  const nextAchievement = progressData.achievements.find(a => !a.earned)

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sessões Totais</p>
                <p className="text-2xl font-bold">{progressData.totalSessions}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sequência Atual</p>
                <p className="text-2xl font-bold">{progressData.currentStreak} dias</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Humor Médio</p>
                <p className="text-2xl font-bold">{progressData.averageMood.toFixed(1)}/5</p>
              </div>
              <Smile className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Energia Média</p>
                <p className="text-2xl font-bold">{progressData.averageEnergy.toFixed(1)}/5</p>
              </div>
              <Zap className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Weekly Goal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                Meta Semanal
              </CardTitle>
              <CardDescription>
                Progresso em direção à sua meta de {progressData.weeklyGoal} sessões por semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso desta semana</span>
                  <span>{Math.min(progressData.weeklyMoodData.filter(d => d.mood > 0).length, progressData.weeklyGoal)}/{progressData.weeklyGoal}</span>
                </div>
                <Progress value={getWeeklyProgress()} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Weekly Mood Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                Humor da Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.weeklyMoodData.map((day, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Progress value={day.mood * 20} className="h-2" />
                        </div>
                        <span className="text-sm w-8">{day.mood > 0 ? day.mood.toFixed(1) : '-'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gold-500" />
                Suas Conquistas
              </CardTitle>
              <CardDescription>
                {earnedAchievements.length} de {progressData.achievements.length} conquistas desbloqueadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {progressData.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.earned
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        achievement.earned ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {achievement.description}
                        </p>
                        {achievement.earned ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Conquistado!
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            Em progresso
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {nextAchievement && (
            <Card>
              <CardHeader>
                <CardTitle>Próxima Conquista</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">{nextAchievement.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {nextAchievement.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Estatísticas Gerais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Sequências</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Sequência atual:</span>
                      <span className="font-medium">{progressData.currentStreak} dias</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Maior sequência:</span>
                      <span className="font-medium">{progressData.longestStreak} dias</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Atividades</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Exercícios completados:</span>
                      <span className="font-medium">{progressData.exercisesCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Categoria favorita:</span>
                      <span className="font-medium capitalize">{progressData.favoriteCategory}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {progressData.totalSessions === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium mb-2">Comece sua jornada!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Registre seu primeiro humor ou complete um exercício para ver suas estatísticas aqui.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}