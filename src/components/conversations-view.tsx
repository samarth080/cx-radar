'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, Check, ChevronRight, Clipboard, Filter, MessageSquareText, RefreshCw, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { conversations } from '@/lib/data'
import type { Conversation } from '@/lib/types'
import { track } from '@/lib/analytics'

const suggestedResponses = [
  "Hi Priya, I understand the concern. Your refund was initiated on August 14 and should reach your account by August 20. I’m sorry this timeline wasn’t made clear during cancellation. I’ve included the transaction reference below so you can track it.",
  "Hi there, I’m sorry you had to follow up. I’ve checked the transaction and can confirm the refund is in progress, with an expected credit by August 20. I’ll also stay on this case until the amount reaches you.",
]

export function ConversationsView() {
  const [search, setSearch] = useState('')
  const [channel, setChannel] = useState('All channels')
  const [sentiment, setSentiment] = useState('All sentiment')
  const [status, setStatus] = useState('All statuses')
  const [urgency, setUrgency] = useState('All urgency')
  const [selected, setSelected] = useState<Conversation | null>(null)

  const filtered = useMemo(() => conversations.filter((item) => {
    const query = search.toLowerCase()
    return (!query || [item.id, item.customer.name, item.issue, item.preview].some((value) => value.toLowerCase().includes(query)))
      && (channel === 'All channels' || item.channel === channel)
      && (sentiment === 'All sentiment' || item.sentiment === sentiment)
      && (status === 'All statuses' || item.status === status)
      && (urgency === 'All urgency' || item.urgency === urgency)
  }), [search, channel, sentiment, status, urgency])

  function updateFilter(setter: (value: string) => void, value: string, name: string) { setter(value); track('filter_applied', { filter: name, value }) }
  function openConversation(item: Conversation) { setSelected(item); track('conversation_opened', { conversation_id: item.id, issue: item.issue }) }

  return (
    <>
      <div className="surface overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1 lg:max-w-sm"><Search size={16} className="absolute left-3 top-3 text-slate-500" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customer, issue, or ID…" className="pl-9" /></div>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:ml-auto lg:pb-0">
            <FilterSelect label="Channel" value={channel} options={['All channels', 'WhatsApp', 'Live Chat', 'Email', 'Support Ticket']} onChange={(value) => updateFilter(setChannel, value, 'channel')} />
            <FilterSelect label="Sentiment" value={sentiment} options={['All sentiment', 'Frustrated', 'Negative', 'Neutral', 'Positive']} onChange={(value) => updateFilter(setSentiment, value, 'sentiment')} />
            <FilterSelect label="Urgency" value={urgency} options={['All urgency', 'High', 'Medium', 'Low']} onChange={(value) => updateFilter(setUrgency, value, 'urgency')} />
            <FilterSelect label="Status" value={status} options={['All statuses', 'Escalated', 'Resolved', 'Open', 'Pending']} onChange={(value) => updateFilter(setStatus, value, 'status')} />
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-500"><span>{filtered.length} conversations</span><span className="hidden sm:inline">Sorted by newest activity</span></div>

        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[940px] border-collapse text-left">
              <thead><tr className="border-b border-slate-100 text-[10px] font-semibold uppercase tracking-[.08em] text-slate-500"><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Channel</th><th className="px-4 py-3">Issue</th><th className="px-4 py-3">Sentiment</th><th className="px-4 py-3">Urgency</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Updated</th><th /></tr></thead>
              <tbody className="divide-y divide-slate-100">{filtered.slice(0, 28).map((item) => <tr key={item.id} onClick={() => openConversation(item)} className="cursor-pointer transition hover:bg-slate-50"><td className="data-cell"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600">{item.customer.name.split(' ').map((part) => part[0]).join('')}</span><span><span className="block font-medium text-slate-900">{item.customer.name}</span><span className="mt-0.5 block font-mono text-[10px] text-slate-500">{item.id}</span></span></div></td><td className="data-cell"><ChannelPill channel={item.channel} /></td><td className="data-cell"><span className="font-medium text-slate-700">{item.issue}</span><span className="mt-0.5 block max-w-[230px] truncate text-xs text-slate-500">{item.preview}</span></td><td className="data-cell"><Sentiment sentiment={item.sentiment} /></td><td className="data-cell"><span className={item.urgency === 'High' ? 'font-medium text-red-600' : 'text-slate-600'}>{item.urgency}</span></td><td className="data-cell"><Status status={item.status} /></td><td className="data-cell whitespace-nowrap font-mono text-xs text-slate-500">{item.timestamp}</td><td className="pr-4 text-slate-300"><ChevronRight size={16} /></td></tr>)}</tbody>
            </table>
          </div>
        ) : <EmptyFilters onReset={() => { setSearch(''); setChannel('All channels'); setSentiment('All sentiment'); setUrgency('All urgency'); setStatus('All statuses') }} />}
      </div>
      {selected && <ConversationDetail conversation={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="relative shrink-0"><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 appearance-none rounded-lg border border-border bg-white pl-3 pr-8 text-xs font-medium text-slate-600 outline-none hover:bg-slate-50 focus:ring-2 focus:ring-slate-200">{options.map((option) => <option key={option}>{option}</option>)}</select><SlidersHorizontal size={12} className="pointer-events-none absolute right-2.5 top-3.5 text-slate-500" /></label>
}

function ConversationDetail({ conversation, onClose }: { conversation: Conversation; onClose: () => void }) {
  const [responseIndex, setResponseIndex] = useState(0)
  const [response, setResponse] = useState(suggestedResponses[0])
  const [editing, setEditing] = useState(false)
  const [copied, setCopied] = useState(false)
  const intervention = conversation.category === 'Refunds' ? 'Add the refund ETA to the cancellation confirmation screen and message.' : conversation.category === 'Payments' ? 'Add a safe payment retry path and show the gateway reference to support agents.' : `Address “${conversation.rootCause.toLowerCase()}” in the customer journey.`

  async function copy() { await navigator.clipboard.writeText(response); setCopied(true); window.setTimeout(() => setCopied(false), 1400) }
  function regenerate() { const next = (responseIndex + 1) % suggestedResponses.length; setResponseIndex(next); setResponse(suggestedResponses[next]) }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/25 backdrop-blur-[1px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="h-full w-full max-w-[960px] overflow-y-auto bg-[#f8fafb] shadow-float">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6"><div className="flex items-center gap-3"><button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Close conversation"><ArrowLeft size={18} /></button><div><p className="text-sm font-semibold text-slate-900">{conversation.customer.name}</p><p className="font-mono text-[10px] text-slate-500">{conversation.id} · {conversation.channel}</p></div></div><Status status={conversation.status} /></header>
        <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_1fr]">
          <section className="border-b border-slate-200 bg-white p-4 sm:p-6 lg:border-b-0 lg:border-r"><div className="mb-6 flex items-center justify-between"><div><p className="label">Conversation</p><p className="mt-1 text-xs text-slate-500">Started {conversation.timestamp}</p></div><ChannelPill channel={conversation.channel} /></div><div className="space-y-5">{conversation.messages.map((message, index) => <div key={`${message.time}-${index}`} className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.sender === 'agent' ? 'rounded-br-md bg-slate-950 text-white' : 'rounded-bl-md bg-slate-100 text-slate-700'}`}><p>{message.body}</p><p className={`mt-1.5 text-right font-mono text-[9px] ${message.sender === 'agent' ? 'text-slate-500' : 'text-slate-500'}`}>{message.time}</p></div></div>)}</div><div className="mt-8 border-t pt-4"><p className="text-xs text-slate-500">Customer <span className="font-mono">{conversation.customer.id}</span> · {conversation.customer.location} · {conversation.customer.plan} plan</p></div></section>
          <section className="p-4 sm:p-6"><div className="mb-4 flex items-center gap-2"><Sparkles size={16} className="text-emerald-600" /><h2 className="section-title">AI analysis</h2><Badge className="ml-auto border-emerald-100 bg-emerald-50 text-emerald-700">{conversation.confidence}% confidence</Badge></div><div className="surface divide-y divide-slate-100 shadow-none">{[['Intent', conversation.intent], ['Sentiment', conversation.sentiment], ['Urgency', conversation.urgency], ['Issue category', conversation.category], ['Root cause', conversation.rootCause], ['Resolution status', conversation.status], ['Risk', conversation.risk]].map(([label, value]) => <div key={label} className="grid grid-cols-[120px_1fr] gap-3 px-4 py-3 text-sm"><span className="text-slate-500">{label}</span><span className="font-medium leading-5 text-slate-700">{value}</span></div>)}</div>
            <div className="mt-5 surface p-4 shadow-none"><div className="flex items-center gap-2"><MessageSquareText size={15} className="text-emerald-600" /><h3 className="text-sm font-semibold">Suggested agent response</h3></div>{editing ? <textarea value={response} onChange={(event) => setResponse(event.target.value)} className="mt-3 min-h-32 w-full resize-none rounded-lg border p-3 text-sm leading-6 outline-none focus:ring-2 focus:ring-emerald-100" /> : <p className="mt-3 text-sm leading-6 text-slate-600">{response}</p>}<div className="mt-4 flex flex-wrap gap-2"><Button size="sm" onClick={copy}>{copied ? <Check size={13} /> : <Clipboard size={13} />}{copied ? 'Copied' : 'Copy response'}</Button><Button size="sm" variant="secondary" onClick={regenerate}><RefreshCw size={13} />Regenerate</Button><Button size="sm" variant="ghost" onClick={() => setEditing(!editing)}>{editing ? 'Save edit' : 'Edit'}</Button></div></div>
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="label text-emerald-700">Recommended CX intervention</p><p className="mt-2 text-sm font-semibold leading-6 text-emerald-950">{intervention}</p><p className="mt-2 text-xs leading-5 text-emerald-800">Why: this addresses the root cause across future contacts, not only this reply.</p></div>
          </section>
        </div>
      </aside>
    </div>
  )
}

function ChannelPill({ channel }: { channel: Conversation['channel'] }) { const colors = channel === 'WhatsApp' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : channel === 'Email' ? 'bg-blue-50 text-blue-700 border-blue-100' : channel === 'Live Chat' ? 'bg-violet-50 text-violet-700 border-violet-100' : 'bg-slate-50 text-slate-600'; return <Badge className={colors}>{channel}</Badge> }
function Sentiment({ sentiment }: { sentiment: Conversation['sentiment'] }) { const color = sentiment === 'Neutral' ? 'bg-slate-400' : sentiment === 'Positive' ? 'bg-emerald-500' : sentiment === 'Negative' ? 'bg-red-500' : 'bg-orange-400'; return <span className="flex items-center gap-2 text-sm text-slate-600"><span className={`h-1.5 w-1.5 rounded-full ${color}`} />{sentiment}</span> }
function Status({ status }: { status: Conversation['status'] }) { const style = status === 'Resolved' ? 'border-emerald-100 bg-emerald-50 text-emerald-700' : status === 'Escalated' ? 'border-red-100 bg-red-50 text-red-700' : status === 'Open' ? 'border-blue-100 bg-blue-50 text-blue-700' : 'border-amber-100 bg-amber-50 text-amber-700'; return <Badge className={style}>{status}</Badge> }
function EmptyFilters({ onReset }: { onReset: () => void }) { return <div className="px-5 py-20 text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-500"><Filter size={18} /></span><h3 className="mt-4 text-sm font-semibold text-slate-900">No conversations match these filters</h3><p className="mt-1 text-xs text-slate-500">Try a different channel, status, or search term.</p><Button variant="secondary" size="sm" onClick={onReset} className="mt-4"><X size={13} />Clear filters</Button></div> }
