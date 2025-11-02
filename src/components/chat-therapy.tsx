"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

const therapeuticResponses = {
  greeting: [
    "Olá! Sou seu assistente de bem-estar mental. Como você está se sentindo hoje?",
    "Oi! É bom ter você aqui. O que gostaria de conversar hoje?",
    "Olá! Estou aqui para te ouvir. Como posso te ajudar hoje?"
  ],
  anxiety: [
    "Entendo que você está se sentindo ansioso. Vamos tentar uma técnica de respiração? Inspire por 4 segundos, segure por 4, expire por 6.",
    "A ansiedade pode ser muito desconfortável. Que tal tentarmos identificar o que está causando essa sensação?",
    "Percebo sua ansiedade. Lembre-se: você já passou por momentos difíceis antes e conseguiu. Você é mais forte do que imagina."
  ],
  sadness: [
    "Sinto muito que você esteja passando por um momento difícil. Seus sentimentos são válidos e é normal se sentir assim às vezes.",
    "A tristeza faz parte da experiência humana. Você gostaria de me contar o que está acontecendo?",
    "Obrigado por compartilhar isso comigo. É corajoso reconhecer e expressar nossos sentimentos."
  ],
  stress: [
    "O estresse pode ser muito pesado. Que tal tentarmos quebrar seus problemas em partes menores e mais manejáveis?",
    "Quando nos sentimos sobrecarregados, é importante lembrar que não precisamos resolver tudo de uma vez.",
    "Vamos focar no que você pode controlar agora. O que seria uma pequena ação que você poderia tomar hoje?"
  ],
  default: [
    "Entendo. Pode me contar mais sobre isso?",
    "Isso parece importante para você. Como isso te faz sentir?",
    "Obrigado por compartilhar. O que você acha que poderia te ajudar nesta situação?",
    "Percebo que isso está te afetando. Você já passou por algo similar antes?"
  ]
}

export default function ChatTherapy() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Olá! Sou seu assistente de bem-estar mental. Como você está se sentindo hoje?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getTherapeuticResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('ansioso') || message.includes('ansiedade') || message.includes('nervoso')) {
      return therapeuticResponses.anxiety[Math.floor(Math.random() * therapeuticResponses.anxiety.length)]
    }
    
    if (message.includes('triste') || message.includes('tristeza') || message.includes('deprimido') || message.includes('down')) {
      return therapeuticResponses.sadness[Math.floor(Math.random() * therapeuticResponses.sadness.length)]
    }
    
    if (message.includes('estresse') || message.includes('estressado') || message.includes('sobrecarregado') || message.includes('pressão')) {
      return therapeuticResponses.stress[Math.floor(Math.random() * therapeuticResponses.stress.length)]
    }
    
    return therapeuticResponses.default[Math.floor(Math.random() * therapeuticResponses.default.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simular tempo de resposta
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getTherapeuticResponse(inputValue),
        sender: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-[600px] flex flex-col bg-white/10 dark:bg-black/20 backdrop-blur-md border-0 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-xl">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">Chat Terapêutico</span>
        </CardTitle>
        <div className="flex gap-2">
          <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300">
            Confidencial
          </Badge>
          <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 hover:shadow-lg transition-all duration-300">
            Disponível 24/7
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'assistant' && (
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-auto'
                      : 'bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 backdrop-blur-sm'
                  }`}
                >
                  <p className="text-sm font-medium">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Digitando...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 bg-white/10 dark:bg-black/20 backdrop-blur-md">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg focus:shadow-xl transition-all duration-300 rounded-xl"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-white/70 mt-3 text-center font-medium">
            Suas conversas são privadas e não são armazenadas permanentemente
          </p>
        </div>
      </CardContent>
    </Card>
  )
}