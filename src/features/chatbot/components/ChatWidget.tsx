'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, Zap } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useLanguage } from '@/shared/i18n/LanguageContext'
import { Message } from '../types'
import { AGENT_PERSONALITY } from '../constants/knowledge-base'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  // Mensajes de bienvenida de VOLT
  const greetingMessage = AGENT_PERSONALITY.greetings

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          ? 'Lo siento, hubo un error de conexión. Por favor, intenta de nuevo en unos segundos.'
          : 'Sorry, there was a connection error. Please try again in a few seconds.',
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
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-2xl transition-transform hover:scale-110 hover:shadow-orange-500/50"
            aria-label="Open chat with VOLT"
          >
            <Zap className="h-7 w-7" />
            {/* Badge de notificación */}
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold animate-pulse">
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
            {/* Header con nuevo diseño VOLT */}
            <div className="flex items-center justify-between bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-4 text-white shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/40 backdrop-blur-sm">
                  <Zap className="h-6 w-6 text-yellow-200" />
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-wide">VOLT</h3>
                  <p className="text-xs text-white/90">
                    {language === 'es'
                      ? 'Asesor Técnico • NEC & ISO 50001'
                      : 'Technical Advisor • NEC & ISO 50001'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 transition-colors hover:bg-white/20"
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
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                        : 'bg-white text-slate-800 shadow-md border border-slate-100'
                    }`}
                  >
                    <div className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="my-1">{children}</p>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          ul: ({ children }) => <ul className="list-disc pl-4 my-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-4 my-2">{children}</ol>,
                          li: ({ children }) => <li className="my-0.5">{children}</li>,
                          code: ({ children }) => (
                            <code className="bg-slate-100 text-orange-600 rounded px-1.5 py-0.5 text-xs font-mono">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    <span className={`mt-2 block text-xs ${
                      message.role === 'user' ? 'text-white/70' : 'text-slate-400'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl bg-white px-4 py-3 shadow-md border border-slate-100">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-amber-500 animate-pulse" />
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-amber-500" style={{ animationDelay: '0ms' }} />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-orange-500" style={{ animationDelay: '150ms' }} />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-red-500" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input mejorado */}
            <div className="border-t border-slate-200 bg-white p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'es'
                    ? 'Pregunta sobre NEC, ISO 50001, diseño PV...'
                    : 'Ask about NEC, ISO 50001, PV design...'}
                  className="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-lg disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  {isTyping ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-center text-xs text-slate-400">
                {language === 'es'
                  ? 'VOLT • Experto en NEC 2020/2023/2026 & ISO 50001'
                  : 'VOLT • Expert in NEC 2020/2023/2026 & ISO 50001'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
