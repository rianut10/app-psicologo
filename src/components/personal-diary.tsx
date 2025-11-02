"use client"

import { useState, useEffect } from 'react'
import { BookOpen, Plus, Calendar, Search, Heart, Trash2, Edit3, Save, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface DiaryEntry {
  id: number
  date: string
  title: string
  content: string
  mood: string
  tags: string[]
  createdAt: Date
}

const moodOptions = [
  { value: "feliz", label: "😊 Feliz", color: "from-yellow-400 to-orange-400" },
  { value: "calmo", label: "😌 Calmo", color: "from-blue-400 to-cyan-400" },
  { value: "ansioso", label: "😰 Ansioso", color: "from-orange-400 to-red-400" },
  { value: "triste", label: "😢 Triste", color: "from-blue-500 to-indigo-500" },
  { value: "motivado", label: "💪 Motivado", color: "from-green-400 to-emerald-400" },
  { value: "reflexivo", label: "🤔 Reflexivo", color: "from-purple-400 to-pink-400" },
  { value: "grato", label: "🙏 Grato", color: "from-pink-400 to-rose-400" },
  { value: "confuso", label: "😕 Confuso", color: "from-gray-400 to-slate-400" }
]

export default function PersonalDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [isAddingEntry, setIsAddingEntry] = useState(false)
  const [editingEntry, setEditingEntry] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMood, setSelectedMood] = useState("todos")
  
  // Form states
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "feliz",
    tags: ""
  })

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries')
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        createdAt: new Date(entry.createdAt)
      }))
      setEntries(parsedEntries)
    }
  }, [])

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries))
  }, [entries])

  const handleAddEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return

    const entry: DiaryEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR'),
      title: newEntry.title.trim(),
      content: newEntry.content.trim(),
      mood: newEntry.mood,
      tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date()
    }

    setEntries(prev => [entry, ...prev])
    setNewEntry({ title: "", content: "", mood: "feliz", tags: "" })
    setIsAddingEntry(false)
  }

  const handleEditEntry = (id: number) => {
    const entry = entries.find(e => e.id === id)
    if (entry) {
      setNewEntry({
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        tags: entry.tags.join(', ')
      })
      setEditingEntry(id)
    }
  }

  const handleUpdateEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return

    setEntries(prev => prev.map(entry => 
      entry.id === editingEntry 
        ? {
            ...entry,
            title: newEntry.title.trim(),
            content: newEntry.content.trim(),
            mood: newEntry.mood,
            tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
          }
        : entry
    ))
    
    setNewEntry({ title: "", content: "", mood: "feliz", tags: "" })
    setEditingEntry(null)
  }

  const handleDeleteEntry = (id: number) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesMood = selectedMood === "todos" || entry.mood === selectedMood
    return matchesSearch && matchesMood
  })

  const getMoodOption = (mood: string) => moodOptions.find(option => option.value === mood) || moodOptions[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 border-0 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Diário Pessoal
          </CardTitle>
          <CardDescription className="text-white/90 text-lg font-medium">
            Registre seus pensamentos, sentimentos e reflexões diárias
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Add Entry Button */}
      <div className="flex justify-center">
        <Dialog open={isAddingEntry || editingEntry !== null} onOpenChange={(open) => {
          if (!open) {
            setIsAddingEntry(false)
            setEditingEntry(null)
            setNewEntry({ title: "", content: "", mood: "feliz", tags: "" })
          }
        }}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => setIsAddingEntry(true)}
              className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold px-8 py-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Entrada no Diário
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/20 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {editingEntry ? 'Editar Entrada' : 'Nova Entrada no Diário'}
              </DialogTitle>
              <DialogDescription className="text-white/70">
                {editingEntry ? 'Atualize sua entrada do diário' : 'Registre seus pensamentos e sentimentos do dia'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-6">
              {/* Title */}
              <div>
                <label className="text-sm font-semibold text-white/90 mb-2 block">Título</label>
                <Input
                  placeholder="Como foi seu dia?"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-emerald-400 focus:ring-emerald-400"
                />
              </div>

              {/* Mood */}
              <div>
                <label className="text-sm font-semibold text-white/90 mb-2 block">Como você se sente?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {moodOptions.map((mood) => (
                    <Button
                      key={mood.value}
                      variant={newEntry.mood === mood.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewEntry(prev => ({ ...prev, mood: mood.value }))}
                      className={newEntry.mood === mood.value 
                        ? `bg-gradient-to-r ${mood.color} text-white border-0 shadow-lg`
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }
                    >
                      {mood.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="text-sm font-semibold text-white/90 mb-2 block">Suas reflexões</label>
                <Textarea
                  placeholder="Escreva sobre seus pensamentos, sentimentos, experiências do dia..."
                  value={newEntry.content}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-emerald-400 focus:ring-emerald-400 min-h-[120px] resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-semibold text-white/90 mb-2 block">Tags (separadas por vírgula)</label>
                <Input
                  placeholder="trabalho, família, saúde, relacionamentos..."
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-emerald-400 focus:ring-emerald-400"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={editingEntry ? handleUpdateEntry : handleAddEntry}
                  className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                  disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingEntry ? 'Atualizar' : 'Salvar Entrada'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsAddingEntry(false)
                    setEditingEntry(null)
                    setNewEntry({ title: "", content: "", mood: "feliz", tags: "" })
                  }}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      {entries.length > 0 && (
        <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  placeholder="Buscar nas suas entradas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-emerald-400 focus:ring-emerald-400"
                />
              </div>

              {/* Mood Filter */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white/90">Filtrar por humor:</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedMood === "todos" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMood("todos")}
                    className={selectedMood === "todos" 
                      ? "bg-gradient-to-r from-emerald-400 to-cyan-500 text-white border-0 shadow-lg"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    }
                  >
                    Todos
                  </Button>
                  {moodOptions.map((mood) => (
                    <Button
                      key={mood.value}
                      variant={selectedMood === mood.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMood(mood.value)}
                      className={selectedMood === mood.value 
                        ? `bg-gradient-to-r ${mood.color} text-white border-0 shadow-lg`
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }
                    >
                      {mood.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => {
          const moodOption = getMoodOption(entry.mood)
          return (
            <Card key={entry.id} className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`bg-gradient-to-r ${moodOption.color} text-white border-0 shadow-lg`}>
                        {moodOption.label}
                      </Badge>
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Calendar className="w-3 h-3" />
                        {entry.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                      {entry.title}
                    </CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditEntry(entry.id)}
                      className="text-white/60 hover:text-white hover:bg-white/20 p-2"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-white/60 hover:text-red-400 hover:bg-red-500/20 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </p>
                
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-white/20 text-white/90 border-0 text-xs hover:bg-white/30 transition-all duration-300"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {entries.length === 0 && (
        <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Seu diário está vazio</h3>
            <p className="text-white/70 mb-6">
              Comece registrando seus pensamentos e sentimentos. É um ótimo hábito para o autoconhecimento!
            </p>
            <Button 
              onClick={() => setIsAddingEntry(true)}
              className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeira Entrada
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {entries.length > 0 && filteredEntries.length === 0 && (
        <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-12 text-center">
            <Search className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhuma entrada encontrada</h3>
            <p className="text-white/70">
              Tente ajustar os filtros ou termo de busca para encontrar suas entradas.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      {entries.length > 0 && (
        <Card className="bg-gradient-to-r from-violet-500 to-purple-500 border-0 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-white fill-current" />
                <div>
                  <h3 className="text-lg font-bold text-white">Sua Jornada</h3>
                  <p className="text-white/90">
                    {entries.length} entrada{entries.length !== 1 ? 's' : ''} registrada{entries.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/80">Continue escrevendo!</p>
                <p className="text-xs text-white/70">O autoconhecimento é uma jornada diária</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}