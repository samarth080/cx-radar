'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, CircleAlert, Lightbulb, Quote, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductBriefDialog } from '@/components/product-brief-dialog'
import type { Issue } from '@/lib/types'
import { conversations } from '@/lib/data'

export function IssueDetail({ issue }: { issue: Issue }) {
  const [created, setCreated] = useState<string[]>([])
  const evidence = conversations.filter((item) => item.category === (issue.id === 'payment-failures' ? 'Payments' : issue.id === 'refund-delays' ? 'Refunds' : issue.id === 'delivery-tracking' ? 'Delivery' : 'Account/Login')).slice(0, 4)

  return (
    <>
      <Link href="/issues" className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={14} />All issues</Link>
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-3 flex items-center gap-2"><Badge className={issue.severity === 'Critical' ? 'border-red-100 bg-red-50 text-red-700' : 'border-orange-100 bg-orange-50 text-orange-700'}>{issue.severity}</Badge><span className="text-xs text-slate-500">Detected 3 days ago · 94% confidence</span></div><h1 className="page-title">{issue.name}</h1><div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500"><span className="font-mono text-slate-700">{issue.conversations} conversations</span><span className="inline-flex items-center font-semibold text-red-600"><ArrowUpRight size={13} />{issue.change}% this week</span><span>·</span><span>{issue.resolutionRate}% resolved</span></div></div><ProductBriefDialog />
      </div>

      <section className="mb-6 rounded-xl border border-slate-800 bg-slate-950 p-5 text-white shadow-soft sm:p-7"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.08em] text-emerald-300"><Sparkles size={14} />AI root-cause summary</div><p className="mt-4 max-w-4xl text-lg leading-8 tracking-[-0.01em] text-slate-100">{issue.summary}</p><div className="mt-5 flex flex-wrap gap-2">{['High confidence', `${issue.conversations} conversations analyzed`, 'Updated 10:42 AM'].map((item) => <span key={item} className="rounded-md border border-white/10 bg-white/[.06] px-2 py-1 text-[10px] text-slate-300">{item}</span>)}</div></section>

      <div className="mb-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <section className="surface p-5 sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="section-title">Supporting evidence</h2><p className="mt-1 text-xs text-slate-500">Representative conversations from this cluster</p></div><Badge>{evidence.length} of {issue.conversations}</Badge></div><div className="divide-y divide-slate-100">{evidence.map((item) => <Link href="/conversations" key={item.id} className="group block py-4 first:pt-0 last:pb-0"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] font-medium text-slate-500">{item.id} · {item.channel}</span><span className="text-[10px] text-slate-500">{item.timestamp}</span></div><div className="mt-2 flex gap-2"><Quote size={14} className="mt-1 shrink-0 text-slate-300" /><p className="text-sm leading-6 text-slate-600 group-hover:text-slate-900">“{item.messages[0].body}”</p></div></Link>)}</div></section>
        <section className="surface p-5 sm:p-6"><h2 className="section-title">Detected patterns</h2><p className="mt-1 text-xs text-slate-500">Shared attributes across this issue cluster</p><div className="mt-5 grid grid-cols-2 gap-3">{issue.patterns.map((pattern) => <div key={pattern.label} className="rounded-lg bg-slate-50 p-4"><p className="font-mono text-xl font-semibold text-slate-950">{pattern.value}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{pattern.label}</p></div>)}</div><div className="mt-5 flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs leading-5 text-blue-800"><CircleAlert size={15} className="mt-0.5 shrink-0" />Patterns indicate correlation across this sample, not proven causation.</div></section>
      </div>

      <section className="surface mb-6 p-5 sm:p-6"><h2 className="section-title">Customer and operational impact</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[[issue.conversations.toString(), 'Affected customers', '+49 vs baseline'], [`${issue.resolutionRate}%`, 'Resolution rate', '-17 pts vs average'], ['18.4%', 'Escalation rate', '+14% this week'], ['31', 'Repeat contacts', '42% of cluster'], ['−11 pts', 'Potential CSAT impact', 'Model estimate']].map(([value, label, note]) => <div key={label} className="border-l-2 border-slate-100 pl-4"><p className="font-mono text-xl font-semibold text-slate-950">{value}</p><p className="mt-1 text-xs font-medium text-slate-600">{label}</p><p className="mt-1 text-[10px] text-slate-500">{note}</p></div>)}</div></section>

      <section className="surface p-5 sm:p-6"><div className="flex items-center gap-2"><Lightbulb size={17} className="text-emerald-600" /><h2 className="section-title">Recommended actions</h2></div><p className="mt-1 text-xs text-slate-500">Prioritized by customer impact, evidence strength, and implementation effort.</p><div className="mt-5 divide-y divide-slate-100">{issue.actions.map((action, index) => <div key={action.id} className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[28px_1fr_auto] sm:items-center"><span className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 font-mono text-xs font-semibold text-slate-600">{index + 1}</span><div><p className="text-sm font-semibold text-slate-800">{action.title}</p><div className="mt-1 flex flex-wrap gap-2 text-[10px] text-slate-500"><span>{action.owner}</span><span>·</span><span>{action.effort} effort</span><span>·</span><span>{action.impact}</span></div></div><Button size="sm" variant={created.includes(action.id) ? 'secondary' : 'default'} onClick={() => setCreated((items) => items.includes(action.id) ? items : [...items, action.id])}>{created.includes(action.id) ? <><Check size={13} />Task created</> : <>Create task<ChevronRight size={13} /></>}</Button></div>)}</div></section>
    </>
  )
}
