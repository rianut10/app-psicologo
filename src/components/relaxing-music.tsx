"use client"

import { useState } from 'react'
import { Music, Play, Pause, Volume2, Clock, Heart, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'

interface MusicRecommendation {
  id: number
  title: string
  artist: string
  genre: string
  duration: string
  description: string
  benefits: string[]
  spotifyUrl?: string
  youtubeUrl?: string
  mood: string
}

const musicData: MusicRecommendation[] = [
  {
    id: 1,
    title: "Weightless",
    artist: "Marconi Union",
    genre: "Ambient",
    duration: "8:08",
    description: "Cientificamente projetada para reduzir ansiedade em até 65%. Uma das músicas mais relaxantes já criadas.",
    benefits: ["Reduz ansiedade", "Diminui batimentos cardíacos", "Induz relaxamento profundo"],
    mood: "Relaxamento Profundo",
    youtubeUrl: "https://www.youtube.com/watch?v=UfcAVejslrU"
  },
  {
    id: 2,
    title: "Aqueous Transmission",
    artist: "Incubus",
    genre: "Alternative Rock",
    duration: "7:49",
    description: "Uma jornada sonora contemplativa que combina elementos eletrônicos com instrumentos tradicionais.",
    benefits: ["Promove introspecção", "Alivia estresse", "Estimula criatividade"],
    mood: "Contemplativo"
  },
  {
    id: 3,
    title: "Spiegel im Spiegel",
    artist: "Arvo Pärt",
    genre: "Clássica Minimalista",
    duration: "8:00",
    description: "Uma peça minimalista para piano e violino que evoca paz interior e serenidade.",
    benefits: ["Acalma a mente", "Melhora concentração", "Reduz tensão muscular"],
    mood: "Serenidade"
  },
  {
    id: 4,
    title: "Gymnopédie No. 1",
    artist: "Erik Satie",
    genre: "Clássica",
    duration: "3:33",
    description: "Uma melodia suave e melancólica que transporta para um estado de tranquilidade.",
    benefits: ["Diminui cortisol", "Melhora humor", "Facilita meditação"],
    mood: "Tranquilidade"
  },
  {
    id: 5,
    title: "Svefn-g-englar",
    artist: "Sigur Rós",
    genre: "Post-Rock",
    duration: "10:04",
    description: "Paisagem sonora etérea que evoca sensações de flutuação e paz celestial.",
    benefits: ["Induz estado meditativo", "Alivia tensão", "Estimula imaginação"],
    mood: "Etéreo"
  },
  {
    id: 6,
    title: "Clair de Lune",
    artist: "Claude Debussy",
    genre: "Clássica Impressionista",
    duration: "4:30",
    description: "Uma das peças mais belas do repertório clássico, evocando a luz suave da lua.",
    benefits: ["Reduz estresse", "Melhora qualidade do sono", "Promove bem-estar"],
    mood: "Romântico"
  },
  {
    id: 7,
    title: "Porcelain",
    artist: "Moby",
    genre: "Electronic/Ambient",
    duration: "4:01",
    description: "Melodia eletrônica suave que combina elementos melancólicos com esperança.",
    benefits: ["Equilibra emoções", "Reduz ansiedade", "Melhora foco"],
    mood: "Melancólico"
  },
  {
    id: 8,
    title: "River",
    artist: "Max Richter",
    genre: "Neo-Clássica",
    duration: "5:12",
    description: "Composição minimalista que flui como um rio calmo, trazendo paz interior.",
    benefits: ["Promove mindfulness", "Reduz agitação mental", "Facilita relaxamento"],
    mood: "Fluido"
  },
  {
    id: 9,
    title: "Metamorphosis Two",
    artist: "Philip Glass",
    genre: "Minimalista",
    duration: "5:31",
    description: "Padrões repetitivos hipnóticos que induzem um estado de calma e concentração.",
    benefits: ["Melhora concentração", "Reduz pensamentos acelerados", "Promove clareza mental"],
    mood: "Hipnótico"
  },
  {
    id: 10,
    title: "Nuvole Bianche",
    artist: "Ludovico Einaudi",
    genre: "Neo-Clássica",
    duration: "5:57",
    description: "Piano solo emotivo que evoca imagens de nuvens brancas flutuando no céu.",
    benefits: ["Eleva o humor", "Reduz tensão", "Inspira otimismo"],
    mood: "Inspirador"
  }
]

const moods = ["Todos", "Relaxamento Profundo", "Contemplativo", "Serenidade", "Tranquilidade", "Etéreo", "Romântico", "Melancólico", "Fluido", "Hipnótico", "Inspirador"]

export default function RelaxingMusic() {
  const [selectedMood, setSelectedMood] = useState("Todos")
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredMusic = musicData.filter(music => 
    selectedMood === "Todos" || music.mood === selectedMood
  )

  const toggleFavorite = (musicId: number) => {
    setFavorites(prev => 
      prev.includes(musicId) 
        ? prev.filter(id => id !== musicId)
        : [...prev, musicId]
    )
  }

  const handlePlayPause = (musicId: number) => {
    if (currentPlaying === musicId) {
      setCurrentPlaying(null)
    } else {
      setCurrentPlaying(musicId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 border-0 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Music className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Músicas Relaxantes
          </CardTitle>
          <CardDescription className="text-white/90 text-lg font-medium">
            Playlist cientificamente selecionada para relaxamento e bem-estar mental
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Mood Filters */}
      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-3">Filtrar por estado de espírito:</h3>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <Button
                  key={mood}
                  variant={selectedMood === mood ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMood(mood)}
                  className={selectedMood === mood 
                    ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  }
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Music List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMusic.map((music) => (
          <Card key={music.id} className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-2">
                  <Badge className="bg-gradient-to-r from-teal-400 to-cyan-400 text-white border-0 shadow-lg">
                    {music.genre}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white border-0 shadow-lg">
                    {music.mood}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(music.id)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <Heart 
                    className={`w-4 h-4 ${favorites.includes(music.id) ? 'fill-red-400 text-red-400' : 'text-white/60'} transition-colors duration-300`} 
                  />
                </Button>
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                {music.title}
              </CardTitle>
              <CardDescription className="text-white/80 font-medium flex items-center gap-2">
                <span>por {music.artist}</span>
                <span className="flex items-center gap-1 text-white/60">
                  <Clock className="w-3 h-3" />
                  {music.duration}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/90 text-sm leading-relaxed">
                {music.description}
              </p>
              
              {/* Benefits */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white/90">Benefícios:</h4>
                <div className="flex flex-wrap gap-1">
                  {music.benefits.map((benefit, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-white/20 text-white/90 border-0 text-xs hover:bg-white/30 transition-all duration-300"
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                <Button
                  size="sm"
                  onClick={() => handlePlayPause(music.id)}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {currentPlaying === music.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                
                <div className="flex-1 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-white/60" />
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300 ${
                        currentPlaying === music.id ? 'w-3/4' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* External Links */}
              <div className="flex gap-2">
                {music.youtubeUrl && (
                  <Button 
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-red-500/20 hover:border-red-400 transition-all duration-300"
                    onClick={() => window.open(music.youtubeUrl, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    YouTube
                  </Button>
                )}
                <Button 
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-green-500/20 hover:border-green-400 transition-all duration-300"
                  onClick={() => window.open(`https://open.spotify.com/search/${encodeURIComponent(music.title + ' ' + music.artist)}`, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Spotify
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMusic.length === 0 && (
        <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-12 text-center">
            <Music className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhuma música encontrada</h3>
            <p className="text-white/70">
              Tente selecionar um estado de espírito diferente para descobrir novas músicas.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Favorites Summary */}
      {favorites.length > 0 && (
        <Card className="bg-gradient-to-r from-pink-500 to-rose-500 border-0 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-white fill-current" />
              <div>
                <h3 className="text-lg font-bold text-white">Suas Favoritas</h3>
                <p className="text-white/90">
                  Você tem {favorites.length} música{favorites.length !== 1 ? 's' : ''} favorita{favorites.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}