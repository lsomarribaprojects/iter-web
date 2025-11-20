export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface Lead {
  name: string
  company?: string
  email: string
  phone: string
  position?: string
  monthlyEnergyCost?: string
  motivation?: string
  preferredDate?: string
  conversationHistory: Message[]
}

export interface ChatState {
  isOpen: boolean
  messages: Message[]
  isTyping: boolean
  lead: Partial<Lead> | null
  stage: 'greeting' | 'conversation' | 'lead_capture' | 'completed'
}
