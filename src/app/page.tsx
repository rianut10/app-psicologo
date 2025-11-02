"use client"

import { useState, useEffect } from 'react'
import { Brain, MessageCircle, Heart, TrendingUp, BookOpen, Shield, Music, PenTool, Star, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import ChatTherapy from '@/components/chat-therapy'
import MoodTracker from '@/components/mood-tracker'
import ExercisesLibrary from '@/components/exercises-library'
import ProgressDashboard from '@/components/progress-dashboard'
import BooksLibrary from '@/components/books-library'
import RelaxingMusic from '@/components/relaxing-music'
import PersonalDiary from '@/components/personal-diary'

// Versículos bíblicos motivadores
const biblicalVerses = [
  {
    verse: "Posso todas as coisas naquele que me fortalece.",
    reference: "Filipenses 4:13"
  },
  {
    verse: "O Senhor é meu pastor; nada me faltará.",
    reference: "Salmos 23:1"
  },
  {
    verse: "Entrega o teu caminho ao Senhor; confia nele, e ele o fará.",
    reference: "Salmos 37:5"
  },
  {
    verse: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
    reference: "Jeremias 29:11"
  },
  {
    verse: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.",
    reference: "Isaías 41:10"
  },
  {
    verse: "Lança sobre o Senhor a tua ansiedade, e ele te susterá; nunca permitirá que o justo seja abalado.",
    reference: "Salmos 55:22"
  },
  {
    verse: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    reference: "Mateus 11:28"
  },
  {
    verse: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.",
    reference: "Romanos 8:28"
  },
  {
    verse: "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?",
    reference: "Salmos 27:1"
  },
  {
    verse: "Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos.",
    reference: "Filipenses 4:4"
  },
  {
    verse: "Porque o seu jugo é suave e o seu fardo é leve.",
    reference: "Mateus 11:30"
  },
  {
    verse: "Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.",
    reference: "Isaías 40:31"
  },
  {
    verse: "A paz vos deixo, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
    reference: "João 14:27"
  },
  {
    verse: "Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, que, segundo a sua grande misericórdia, nos gerou de novo para uma viva esperança.",
    reference: "1 Pedro 1:3"
  },
  {
    verse: "Confiai no Senhor perpetuamente; porque em Deus, o Senhor, há uma rocha eterna.",
    reference: "Isaías 26:4"
  },
  {
    verse: "O Senhor te abençoará e te guardará; o Senhor fará resplandecer o seu rosto sobre ti, e terá misericórdia de ti.",
    reference: "Números 6:24-25"
  },
  {
    verse: "Porque onde estiver o vosso tesouro, aí estará também o vosso coração.",
    reference: "Mateus 6:21"
  },
  {
    verse: "Sede fortes e corajosos; não temais, nem vos espanteis, porque o Senhor vosso Deus é convosco, por onde quer que andardes.",
    reference: "Josué 1:9"
  },
  {
    verse: "O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece.",
    reference: "1 Coríntios 13:4"
  },
  {
    verse: "Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.",
    reference: "2 Timóteo 1:7"
  },
  {
    verse: "Buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.",
    reference: "Mateus 6:33"
  },
  {
    verse: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.",
    reference: "Salmos 23:4"
  },
  {
    verse: "Porque o Senhor, teu Deus, te abençoará em toda a obra das tuas mãos.",
    reference: "Deuteronômio 15:10"
  },
  {
    verse: "Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra.",
    reference: "Salmos 46:10"
  },
  {
    verse: "Porque a minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.",
    reference: "2 Coríntios 12:9"
  },
  {
    verse: "Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu.",
    reference: "Eclesiastes 3:1"
  },
  {
    verse: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.",
    reference: "Filipenses 4:7"
  },
  {
    verse: "Porque ele dará aos seus anjos ordem a teu respeito, para te guardarem em todos os teus caminhos.",
    reference: "Salmos 91:11"
  },
  {
    verse: "Bem-aventurados os que choram, porque eles serão consolados.",
    reference: "Mateus 5:4"
  },
  {
    verse: "O Senhor é bom, uma fortaleza no dia da angústia; e conhece os que confiam nele.",
    reference: "Naum 1:7"
  }
]

function getDailyVerse() {
  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
  const verseIndex = dayOfYear % biblicalVerses.length
  return biblicalVerses[verseIndex]
}

export default function MentalHealthApp() {
  const [activeTab, setActiveTab] = useState('chat')
  const [showDailyVerse, setShowDailyVerse] = useState(false)
  const [dailyVerse, setDailyVerse] = useState(null)

  useEffect(() => {
    // Verificar se já mostrou o versículo hoje
    const today = new Date().toDateString()
    const lastShown = localStorage.getItem('lastVerseShown')
    
    if (lastShown !== today) {
      setDailyVerse(getDailyVerse())
      setShowDailyVerse(true)
      localStorage.setItem('lastVerseShown', today)
    }
  }, [])

  const closeDailyVerse = () => {
    setShowDailyVerse(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 dark:from-purple-900 dark:via-pink-900 dark:to-orange-900">
      {/* Daily Bible Verse Modal */}
      {showDailyVerse && dailyVerse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 border-2 border-yellow-300 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
            <CardHeader className="text-center relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={closeDailyVerse}
                className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-yellow-200 dark:hover:bg-yellow-800"
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Mensagem do Dia
              </CardTitle>
              <CardDescription className="text-yellow-700 dark:text-yellow-300 font-medium">
                Uma palavra de esperança para você
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <blockquote className="text-lg font-medium text-gray-800 dark:text-gray-200 italic leading-relaxed">
                "{dailyVerse.verse}"
              </blockquote>
              <cite className="text-sm font-bold text-yellow-600 dark:text-yellow-400 block">
                — {dailyVerse.reference}
              </cite>
              <Button
                onClick={closeDailyVerse}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Começar o Dia
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="border-b bg-white/10 dark:bg-black/20 backdrop-blur-md sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
                  MindCare
                </h1>
                <p className="text-sm text-white/80 font-medium">
                  Seu assistente de bem-estar mental
                </p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Shield className="w-3 h-3 mr-1" />
              Apoio, não substitui profissionais
            </Badge>
          </div>
        </div>
      </header>

      {/* Disclaimer */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 border-l-4 border-red-400 p-4 m-4 rounded-r-2xl shadow-xl">
        <div className="flex items-start">
          <Shield className="w-6 h-6 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-bold text-red-800 mb-1 text-base">
              Importante: Este aplicativo é uma ferramenta de apoio
            </p>
            <p className="text-red-700 font-medium">
              Não substitui o acompanhamento de profissionais de saúde mental qualificados. 
              Em caso de crise ou pensamentos de autolesão, procure ajuda profissional imediatamente.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8 bg-white/20 dark:bg-black/30 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20">
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Chat</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mood" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Humor</span>
            </TabsTrigger>
            <TabsTrigger 
              value="exercises" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Exercícios</span>
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Progresso</span>
            </TabsTrigger>
            <TabsTrigger 
              value="books" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-400 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Livros</span>
            </TabsTrigger>
            <TabsTrigger 
              value="music" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Música</span>
            </TabsTrigger>
            <TabsTrigger 
              value="diary" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <PenTool className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Diário</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <ChatTherapy />
          </TabsContent>

          <TabsContent value="mood" className="space-y-6">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="exercises" className="space-y-6">
            <ExercisesLibrary />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressDashboard />
          </TabsContent>

          <TabsContent value="books" className="space-y-6">
            <BooksLibrary />
          </TabsContent>

          <TabsContent value="music" className="space-y-6">
            <RelaxingMusic />
          </TabsContent>

          <TabsContent value="diary" className="space-y-6">
            <PersonalDiary />
          </TabsContent>
        </Tabs>
      </main>

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