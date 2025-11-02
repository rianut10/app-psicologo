"use client"

import { useState, useEffect } from 'react'
import { Calendar, TrendingUp, Smile, Frown, Meh, Heart, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface MoodEntry {
  id: string
  date: string
  mood: number
  energy: number
  note: string
  timestamp: Date
}

const moodEmojis = [
  { value: 1, emoji: '😢', label: 'Muito triste', color: 'text-red-500' },
  { value: 2, emoji: '😔', label: 'Triste', color: 'text-orange-500' },
  { value: 3, emoji: '😐', label: 'Neutro', color: 'text-yellow-500' },
  { value: 4, emoji: '🙂', label: 'Bem', color: 'text-green-500' },
  { value: 5, emoji: '😊', label: 'Muito bem', color: 'text-blue-500' }
]

const energyLevels = [
  { value: 1, label: 'Muito baixa', color: 'bg-red-500' },
  { value: 2, label: 'Baixa', color: 'bg-orange-500' },
  { value: 3, label: 'Média', color: 'bg-yellow-500' },
  { value: 4, label: 'Alta', color: 'bg-green-500' },
  { value: 5, label: 'Muito alta', color: 'bg-blue-500' }
]

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Carregar entradas do localStorage
    const saved = localStorage.getItem('moodEntries')
    if (saved) {
      setMoodEntries(JSON.parse(saved))
    }
  }, [])

  const saveMoodEntry = () => {
    if (selectedMood === null || selectedEnergy === null) return

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      energy: selectedEnergy,
      note: note,
      timestamp: new Date()
    }

    const updatedEntries = [newEntry, ...moodEntries]
    setMoodEntries(updatedEntries)
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries))

    // Reset form
    setSelectedMood(null)
    setSelectedEnergy(null)
    setNote('')
    setShowSuccess(true)

    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0
    const sum = moodEntries.reduce((acc, entry) => acc + entry.mood, 0)
    return sum / moodEntries.length
  }

  const getAverageEnergy = () => {
    if (moodEntries.length === 0) return 0
    const sum = moodEntries.reduce((acc, entry) => acc + entry.energy, 0)
    return sum / moodEntries.length
  }

  const getRecentTrend = () => {
    if (moodEntries.length < 2) return 'neutral'
    const recent = moodEntries.slice(0, 3)
    const older = moodEntries.slice(3, 6)
    
    if (recent.length === 0 || older.length === 0) return 'neutral'
    
    const recentAvg = recent.reduce((acc, entry) => acc + entry.mood, 0) / recent.length
    const olderAvg = older.reduce((acc, entry) => acc + entry.mood, 0) / older.length
    
    if (recentAvg > olderAvg + 0.5) return 'improving'
    if (recentAvg < olderAvg - 0.5) return 'declining'
    return 'stable'
  }

  const getTrendIcon = () => {
    const trend = getRecentTrend()
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'declining': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      default: return <Meh className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendText = () => {
    const trend = getRecentTrend()
    switch (trend) {
      case 'improving': return 'Melhorando'
      case 'declining': return 'Precisando de atenção'
      default: return 'Estável'
    }
  }

  return (
    <div className="space-y-6">
      {/* Registro de Humor */}
      <Card className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Como você está se sentindo hoje?</span>
          </CardTitle>
          <CardDescription className="text-white/90 font-medium">
            Registre seu humor e nível de energia para acompanhar seu bem-estar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {showSuccess && (
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 border-0 rounded-2xl p-4 shadow-lg">
              <p className="text-white text-sm font-bold flex items-center gap-2">
                ✅ Humor registrado com sucesso!
              </p>
            </div>
          )}

          {/* Seleção de Humor */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Humor</h3>
            <div className="flex gap-3 flex-wrap">
              {moodEmojis.map((mood) => (
                <Button
                  key={mood.value}
                  variant={selectedMood === mood.value ? "default" : "outline"}
                  className={`flex flex-col h-auto p-4 min-w-[90px] transition-all duration-300 hover:scale-105 rounded-2xl shadow-lg ${
                    selectedMood === mood.value 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-xl' 
                      : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <span className="text-3xl mb-2">{mood.emoji}</span>
                  <span className="text-xs font-semibold">{mood.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Seleção de Energia */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Nível de Energia</h3>
            <div className="flex gap-3 flex-wrap">
              {energyLevels.map((energy) => (
                <Button
                  key={energy.value}
                  variant={selectedEnergy === energy.value ? "default" : "outline"}
                  className={`flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105 rounded-2xl shadow-lg ${
                    selectedEnergy === energy.value 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-xl' 
                      : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedEnergy(energy.value)}
                >
                  <Zap className={`w-4 h-4 ${selectedEnergy === energy.value ? 'text-white' : 'text-yellow-500'}`} />
                  <span className="font-semibold">{energy.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Nota */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Notas (opcional)</h3>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="O que aconteceu hoje? Como você se sente?"
              className="min-h-[120px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg focus:shadow-xl transition-all duration-300 rounded-2xl"
            />
          </div>

          <Button 
            onClick={saveMoodEntry}
            disabled={selectedMood === null || selectedEnergy === null}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl py-4 text-lg font-bold"
          >
            Salvar Registro
          </Button>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      {moodEntries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Humor Médio</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {getAverageMood().toFixed(1)}/5
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl shadow-lg">
                  <Smile className="w-8 h-8 text-white" />
                </div>
              </div>
              <Progress value={getAverageMood() * 20} className="mt-4 h-3 bg-gray-200 dark:bg-gray-700" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Energia Média</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    {getAverageEnergy().toFixed(1)}/5
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <Progress value={getAverageEnergy() * 20} className="mt-4 h-3 bg-gray-200 dark:bg-gray-700" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Tendência</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{getTrendText()}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl shadow-lg">
                  {getTrendIcon()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Histórico Recente */}
      {moodEntries.length > 0 && (
        <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-md border-0 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Histórico Recente</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {moodEntries.slice(0, 5).map((entry) => {
                const moodData = moodEmojis.find(m => m.value === entry.mood)
                const energyData = energyLevels.find(e => e.value === entry.energy)
                
                return (
                  <div key={entry.id} className="flex items-start gap-4 p-6 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl p-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl shadow-lg">
                      {moodData?.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </span>
                        <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-0 shadow-lg">
                          Energia: {energyData?.label}
                        </Badge>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium bg-white/50 dark:bg-gray-800/50 p-3 rounded-xl">
                          {entry.note}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}