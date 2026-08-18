'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { Bot, CircleAlert, CornerDownLeft, Lightbulb, MessageSquareText, Search, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductBriefDialog } from '@/components/product-brief-dialog'
import { track } from '@/lib/analytics'

const prompts = ['What changed this week?', 'Why are refund complaints increasing?', 'What is causing repeat contacts?', 'Which issue should Product prioritize?']

export function InsightsView() {
  const [question, setQuestion] = useState('')
  const [asked, setAsked] = useState('What changed this week?')
  const [loading, setLoading] = useState(false)

  function ask(value = question) {
    if (!value.trim()) return
    setQuestion(value)
    setLoading(true)
    track('ai_question_asked', { question: value })
    window.setTimeout(() => { setAsked(value); setLoading(false) }, 700)
  }

  return (
    <>
      <section className="mb-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white shadow-soft sm:p-7">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300"><Bot size={16} />ASK CX RADAR</div>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Ask a question about your customers</h2>
        <p className="mt-2 text-sm text-slate-400">Answers use 1,284 conversations from Nova Commerce and cite the underlying evidence.</p>
        <form onSubmit={(event: FormEvent) => { event.preventDefault(); ask() }} className="mt-6 flex rounded-xl border border-white/10 bg-white p-1.5 shadow-xl"><Search size={17} className="ml-3 mt-2.5 shrink-0 text-slate-500" /><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question about your customers…" className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-500" /><Button type="submit" size="sm" disabled={!question.trim()} className="mt-1 bg-emerald-600 hover:bg-emerald-700">Ask <CornerDownLeft size={13} /></Button></form>
        <div className="mt-4 flex flex-wrap gap-2">{prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)} className="rounded-lg border border-white/10 bg-white/[.05] px-3 py-2 text-left text-xs text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white">{prompt}</button>)}</div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <section className="surface min-h-[480px] p-5 sm:p-7">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5"><span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700"><Sparkles size={17} /></span><div><p className="label">YOUR QUESTION</p><h2 className="mt-1 text-sm font-semibold text-slate-900">“{loading ? question : asked}”</h2></div></div>
          {loading ? <AnswerSkeleton /> : <div className="pt-6"><p className="text-[15px] leading-7 text-slate-700">Payment-related complaints increased <strong className="text-slate-950">62% this week</strong>, driven primarily by UPI failures after customers complete bank authentication. The issue is concentrated between 8 PM and 11 PM and has raised escalations by 14%.</p><Citation ids={['CV-2841', 'CV-2849', 'CV-2865']} />
            <p className="mt-5 text-[15px] leading-7 text-slate-700">Refund complaints also increased 31%, but 76% are still within the promised processing window. The driver is unclear expectations: cancellation confirmations do not show a payment-specific credit date.</p><Citation ids={['CV-2842', 'CV-2850', 'CV-2866']} />
            <div className="mt-6 rounded-xl bg-slate-50 p-5"><p className="label mb-4">RECOMMENDED PRIORITY</p><ol className="space-y-4">{[
              ['1', 'Payment failures', 'Technical issue · high severity', 'Investigate gateway callbacks'],
              ['2', 'Refund communication', 'High volume · low engineering effort', 'Show refund ETA at cancellation'],
              ['3', 'Delivery tracking', 'Moderate impact', 'Provide revised delivery ETA'],
            ].map(([number, title, meta, action]) => <li key={number} className="grid grid-cols-[26px_1fr] gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-white font-mono text-[10px] font-semibold text-slate-600 shadow-sm">{number}</span><div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-slate-800">{title}</p><p className="mt-0.5 text-xs text-slate-500">{meta}</p></div><span className="text-xs font-medium text-emerald-700">{action}</span></div></li>)}</ol></div>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><Lightbulb size={16} className="mt-0.5 shrink-0 text-emerald-700" /><div><p className="text-sm font-semibold text-emerald-950">Decision: prioritize payment reliability, then refund communication</p><p className="mt-1 text-xs leading-5 text-emerald-800">This sequence addresses the largest customer harm first, then captures a fast reduction in avoidable support volume.</p></div></div>
          </div>}
        </section>

        <aside className="space-y-6">
          <section className="surface p-5"><div className="flex items-start justify-between"><div><h2 className="section-title">Daily CX brief</h2><p className="mt-1 text-xs text-slate-500">18 August · 10:42 AM</p></div><Badge className="border-emerald-100 bg-emerald-50 text-emerald-700">Live</Badge></div><div className="mt-5 space-y-4">{[
            ['bg-red-500', 'Payment failures increased 62%', '74 conversations'],
            ['bg-orange-400', 'Refund complaints increased 31%', '51 conversations'],
            ['bg-amber-400', 'Delivery questions remain elevated', '43 conversations'],
            ['bg-emerald-500', '23% of contacts may be preventable', '295 contacts / month'],
          ].map(([color, title, detail]) => <div key={title} className="flex gap-3"><span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${color}`} /><div><p className="text-xs font-semibold leading-5 text-slate-800">{title}</p><p className="text-[10px] text-slate-500">{detail}</p></div></div>)}</div><div className="mt-5 border-t pt-5"><ProductBriefDialog compact /></div></section>
          <section className="surface p-5"><div className="flex items-center gap-2"><MessageSquareText size={16} className="text-slate-500" /><h2 className="section-title">How answers are built</h2></div><div className="mt-4 space-y-3 text-xs leading-5 text-slate-500">{['Classify each conversation', 'Group shared root causes', 'Compare against the prior period', 'Cite representative evidence'].map((step, index) => <div key={step} className="flex gap-3"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-slate-100 font-mono text-[9px] font-semibold text-slate-700">{index + 1}</span>{step}</div>)}</div><div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-[11px] leading-5 text-amber-800"><CircleAlert size={14} className="mt-0.5 shrink-0" />AI findings should be validated before operational changes.</div></section>
        </aside>
      </div>
    </>
  )
}

function Citation({ ids }: { ids: string[] }) { return <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500"><span>Evidence:</span>{ids.map((id) => <Link href="/conversations" key={id} className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-slate-500 hover:border-emerald-300 hover:text-emerald-700">{id}</Link>)}</div> }
function AnswerSkeleton() { return <div className="animate-pulse space-y-4 pt-7"><div className="h-3 w-full rounded bg-slate-100" /><div className="h-3 w-[92%] rounded bg-slate-100" /><div className="h-3 w-[70%] rounded bg-slate-100" /><div className="mt-8 h-3 w-full rounded bg-slate-100" /><div className="h-3 w-[85%] rounded bg-slate-100" /><div className="mt-8 h-48 rounded-xl bg-slate-100" /></div> }
