type DemoEvent =
  | 'dashboard_viewed'
  | 'conversation_opened'
  | 'issue_opened'
  | 'ai_question_asked'
  | 'product_brief_generated'
  | 'filter_applied'
  | 'conversation_upload_started'
  | 'conversation_upload_completed'

export function track(event: DemoEvent, properties: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  const payload = { event, properties, timestamp: new Date().toISOString() }
  const previous = JSON.parse(localStorage.getItem('cx-radar-events') ?? '[]') as { event?: string; timestamp?: string }[]
  const last = previous.at(-1)
  if (last?.event === event && last.timestamp && Date.now() - new Date(last.timestamp).getTime() < 500) return
  localStorage.setItem('cx-radar-events', JSON.stringify([...previous.slice(-49), payload]))
  console.info('[CX Radar analytics]', payload)
}
