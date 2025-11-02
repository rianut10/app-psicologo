"use client"

import { useState } from 'react'
import { Book, Star, ExternalLink, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface BookRecommendation {
  id: number
  title: string
  author: string
  description: string
  category: string
  rating: number
  keyTopics: string[]
  amazonLink?: string
}

const booksData: BookRecommendation[] = [
  {
    id: 1,
    title: "O Poder do Agora",
    author: "Eckhart Tolle",
    description: "Um guia para despertar espiritual e viver no presente, transformando sua relação com pensamentos e emoções.",
    category: "Autoconhecimento",
    rating: 4.8,
    keyTopics: ["Mindfulness", "Presença", "Despertar Espiritual", "Ansiedade"]
  },
  {
    id: 2,
    title: "Mindset: A Nova Psicologia do Sucesso",
    author: "Carol Dweck",
    description: "Descubra como a mentalidade de crescimento pode transformar sua vida pessoal e profissional.",
    category: "Desenvolvimento Pessoal",
    rating: 4.7,
    keyTopics: ["Mentalidade", "Crescimento", "Resiliência", "Sucesso"]
  },
  {
    id: 3,
    title: "A Coragem de Ser Imperfeito",
    author: "Brené Brown",
    description: "Explore a vulnerabilidade como caminho para coragem, compaixão e conexão autêntica.",
    category: "Autoestima",
    rating: 4.9,
    keyTopics: ["Vulnerabilidade", "Autoestima", "Coragem", "Autenticidade"]
  },
  {
    id: 4,
    title: "O Homem em Busca de Sentido",
    author: "Viktor Frankl",
    description: "Reflexões profundas sobre encontrar propósito e significado mesmo nas circunstâncias mais difíceis.",
    category: "Filosofia de Vida",
    rating: 4.8,
    keyTopics: ["Propósito", "Resiliência", "Significado", "Superação"]
  },
  {
    id: 5,
    title: "Inteligência Emocional",
    author: "Daniel Goleman",
    description: "Aprenda a reconhecer, compreender e gerenciar suas emoções para uma vida mais equilibrada.",
    category: "Inteligência Emocional",
    rating: 4.6,
    keyTopics: ["Emoções", "Autocontrole", "Empatia", "Relacionamentos"]
  },
  {
    id: 6,
    title: "Os Quatro Compromissos",
    author: "Don Miguel Ruiz",
    description: "Princípios toltecas para liberdade pessoal e transformação da qualidade de vida.",
    category: "Sabedoria Ancestral",
    rating: 4.7,
    keyTopics: ["Liberdade", "Autoconhecimento", "Transformação", "Sabedoria"]
  },
  {
    id: 7,
    title: "Atomic Habits",
    author: "James Clear",
    description: "Estratégias práticas para formar bons hábitos, quebrar os ruins e dominar pequenos comportamentos.",
    category: "Produtividade",
    rating: 4.8,
    keyTopics: ["Hábitos", "Mudança", "Disciplina", "Crescimento"]
  },
  {
    id: 8,
    title: "A Arte de Não Ligar",
    author: "Mark Manson",
    description: "Uma abordagem contraintuitiva para viver uma vida boa, focando no que realmente importa.",
    category: "Filosofia Prática",
    rating: 4.5,
    keyTopics: ["Prioridades", "Valores", "Simplicidade", "Autenticidade"]
  }
]

const categories = ["Todos", "Autoconhecimento", "Desenvolvimento Pessoal", "Autoestima", "Filosofia de Vida", "Inteligência Emocional", "Sabedoria Ancestral", "Produtividade", "Filosofia Prática"]

export default function BooksLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBooks = booksData.filter(book => {
    const matchesCategory = selectedCategory === "Todos" || book.category === selectedCategory
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.keyTopics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Book className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Biblioteca de Livros Motivadores
          </CardTitle>
          <CardDescription className="text-white/90 text-lg font-medium">
            Descubra livros transformadores para seu crescimento pessoal e autoconhecimento
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                placeholder="Buscar por título, autor ou tópico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white border-0 shadow-lg">
                  {book.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-bold text-white">{book.rating}</span>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                {book.title}
              </CardTitle>
              <CardDescription className="text-white/80 font-medium">
                por {book.author}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/90 text-sm leading-relaxed">
                {book.description}
              </p>
              
              {/* Key Topics */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white/90">Tópicos principais:</h4>
                <div className="flex flex-wrap gap-1">
                  {book.keyTopics.map((topic, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-white/20 text-white/90 border-0 text-xs hover:bg-white/30 transition-all duration-300"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                onClick={() => {
                  // Simulação de busca - em um app real, redirecionaria para loja online
                  window.open(`https://www.amazon.com.br/s?k=${encodeURIComponent(book.title + ' ' + book.author)}`, '_blank')
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Encontrar Livro
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-12 text-center">
            <Book className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhum livro encontrado</h3>
            <p className="text-white/70">
              Tente ajustar os filtros ou termo de busca para encontrar livros relevantes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}