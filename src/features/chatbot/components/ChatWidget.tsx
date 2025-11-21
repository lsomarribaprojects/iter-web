'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, Zap } from 'lucide-react'
import { useLanguage } from '@/shared/i18n/LanguageContext'
import { Message } from '../types'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language, t } = useLanguage()

  const greetingMessage: Record<'es' | 'en', string> = {
    es: '¡Hola! Soy Marcus Blake, Consultor Senior en Gestión Energética de ITER. Con más de 10 años de experiencia, ayudo a empresas a reducir costos energéticos hasta un 20% mediante ISO 50001 y sistemas fotovoltaicos. ¿En qué puedo ayudarte hoy?',
    en: 'Hello! I\'m Marcus Blake, Senior Energy Management Consultant at ITER. With over 10 years of experience, I help companies reduce energy costs by up to 20% through ISO 50001 and photovoltaic systems. How can I help you today?',
  }

  // Agregar mensaje de bienvenida cuando se abre el chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: greetingMessage[language as 'es' | 'en'],
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, language])

  // Scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      // Preparar historial para la API
      const apiMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      apiMessages.push({
        role: 'user',
        content: userMessage.content,
      })

      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          language,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error en la respuesta')
      }

      // Simular escritura realista palabra por palabra
      const fullMessage = data.message
      const words = fullMessage.split(' ')
      let currentText = ''

      // Crear mensaje vacío inicial
      const assistantMessageId = (Date.now() + 1).toString()
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)

      // Escribir palabra por palabra
      for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? ' ' : '') + words[i]

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: currentText }
              : msg
          )
        )

        // Delay variable: más largo en puntos finales de párrafo
        const word = words[i]
        let delay = 40 + Math.random() * 30 // 40-70ms por palabra

        if (word.includes('.') || word.includes('?') || word.includes('!')) {
          delay += 400 + Math.random() * 300 // 400-700ms extra para pausas naturales
        } else if (word.includes(',') || word.includes(':')) {
          delay += 150 + Math.random() * 100 // 150-250ms para comas
        }

        if (word.includes('\n')) {
          delay += 600 + Math.random() * 400 // 600-1000ms para saltos de línea
        }

        await new Promise(resolve => setTimeout(resolve, delay))
      }
    } catch (error) {
      console.error('Error sending message:', error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'es'
          ? 'Lo siento, hubo un error. Por favor, verifica que la API key de OpenAI esté configurada correctamente en las variables de entorno (.env.local).'
          : 'Sorry, there was an error. Please verify that the OpenAI API key is correctly configured in the environment variables (.env.local).',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-2xl transition-transform hover:scale-110 hover:shadow-blue-500/50"
            aria-label="Open chat"
          >
            <MessageCircle className="h-7 w-7" />
            {/* Badge de notificación */}
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] max-w-[90vw] max-h-[80vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/30">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Marcus Blake</h3>
                  <p className="text-xs text-white/90">
                    {language === 'es' ? 'Consultor Senior • En línea' : 'Senior Consultant • Online'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 transition-colors hover:bg-white/20"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-800 shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className={`mt-1 block text-xs ${
                      message.role === 'user' ? 'text-white/70' : 'text-slate-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-electric-500" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-electric-500" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-electric-500" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 bg-white p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                  className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  {isTyping ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">
                {language === 'es'
                  ? 'Powered by OpenAI GPT-4'
                  : 'Powered by OpenAI GPT-4'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
