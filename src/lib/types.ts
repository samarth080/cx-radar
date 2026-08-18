export type Channel = 'WhatsApp' | 'Live Chat' | 'Email' | 'Support Ticket'
export type Sentiment = 'Frustrated' | 'Negative' | 'Neutral' | 'Positive'
export type Urgency = 'High' | 'Medium' | 'Low'
export type ConversationStatus = 'Escalated' | 'Resolved' | 'Open' | 'Pending'
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low'

export interface Customer {
  id: string
  name: string
  location: string
  plan: 'Plus' | 'Standard' | 'Guest'
}

export interface ConversationMessage {
  sender: 'customer' | 'agent'
  body: string
  time: string
}

export interface Conversation {
  id: string
  customer: Customer
  channel: Channel
  issue: string
  category: string
  sentiment: Sentiment
  sentimentScore: number
  urgency: Urgency
  status: ConversationStatus
  timestamp: string
  preview: string
  intent: string
  rootCause: string
  confidence: number
  risk: string
  messages: ConversationMessage[]
}

export interface RecommendedAction {
  id: string
  title: string
  owner: 'Product' | 'Engineering' | 'Operations' | 'Support'
  effort: 'Low' | 'Medium' | 'High'
  impact: string
}

export interface Issue {
  id: string
  name: string
  conversations: number
  change: number
  severity: Severity
  sentiment: number
  resolutionRate: number
  trend: number[]
  summary: string
  patterns: { label: string; value: string }[]
  actions: RecommendedAction[]
}

export interface Insight {
  id: string
  title: string
  summary: string
  severity: Severity
  citations: string[]
}

export interface Metric {
  label: string
  value: string
  change: string
  direction: 'up' | 'down'
  positive: boolean
  description: string
}
