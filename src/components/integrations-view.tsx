'use client'

import { useState } from 'react'
import { Check, ExternalLink, Mail, MessageCircle, TicketCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const integrations = [
  { name: 'WhatsApp Business', description: 'Sync customer conversations and delivery status.', icon: MessageCircle, color: 'bg-emerald-50 text-emerald-700', status: 'Connected' },
  { name: 'Zendesk', description: 'Import tickets, tags, agents, and resolution events.', icon: TicketCheck, color: 'bg-teal-50 text-teal-700', status: 'Connected' },
  { name: 'Intercom', description: 'Analyze support chat and messenger conversations.', icon: MessageCircle, color: 'bg-blue-50 text-blue-700', status: 'Available' },
  { name: 'Gmail', description: 'Ingest support emails from a shared inbox.', icon: Mail, color: 'bg-red-50 text-red-700', status: 'Available' },
]

export function IntegrationsView() {
  const [connected, setConnected] = useState<string[]>(['WhatsApp Business', 'Zendesk'])
  return <div className="grid gap-4 md:grid-cols-2">{integrations.map((integration) => { const active = connected.includes(integration.name); return <div key={integration.name} className="surface p-5"><div className="flex items-start gap-4"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${integration.color}`}><integration.icon size={19} /></span><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h2 className="text-sm font-semibold text-slate-900">{integration.name}</h2>{active && <Badge className="border-emerald-100 bg-emerald-50 text-emerald-700"><Check size={11} className="mr-1" />Connected</Badge>}</div><p className="mt-1 text-xs leading-5 text-slate-500">{integration.description}</p></div></div><div className="mt-5 flex items-center justify-between border-t pt-4"><span className="text-[10px] text-slate-500">{active ? 'Last synced 2 min ago' : '5 minute setup'}</span><Button size="sm" variant={active ? 'secondary' : 'default'} onClick={() => setConnected((items) => active ? items.filter((item) => item !== integration.name) : [...items, integration.name])}>{active ? 'Manage' : <>Connect<ExternalLink size={13} /></>}</Button></div></div> })}</div>
}
