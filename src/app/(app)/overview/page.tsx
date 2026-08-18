'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Info, Lightbulb, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { ProductBriefDialog } from '@/components/product-brief-dialog'
import { TrendChart } from '@/components/trend-chart'
import { Badge } from '@/components/ui/badge'
import { Tooltip } from '@/components/ui/tooltip'
import { insights, issues, metrics } from '@/lib/data'
import { track } from '@/lib/analytics'

export default function OverviewPage() {
  useEffect(() => track('dashboard_viewed'), [])
  return (
    <>
      <PageHeader eyebrow="COMMAND CENTER" title="Good morning, Samarth" description="Here’s what changed across Nova Commerce customer conversations." />
      <section aria-label="Key performance indicators" className="surface mb-6 grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
        {metrics.map((metric) => <div key={metric.label} className="px-5 py-4 sm:px-6 sm:py-5"><div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">{metric.label}<Tooltip content={metric.description}><button aria-label={`About ${metric.label}`} className="text-slate-300 hover:text-slate-500"><Info size={13} /></button></Tooltip></div><div className="mt-2 flex items-end justify-between gap-2"><span className="font-mono text-2xl font-semibold tracking-tight text-slate-950">{metric.value}</span><span className={`mb-0.5 flex items-center text-[11px] font-semibold ${metric.positive ? 'text-emerald-700' : 'text-red-600'}`}>{metric.direction === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{metric.change}</span></div><p className="mt-1 text-[10px] text-slate-500">vs previous 7 days</p></div>)}
      </section>

      <section className="surface mb-6 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><div className="flex items-center gap-2"><h2 className="section-title">Emerging issues</h2><Badge className="border-red-100 bg-red-50 text-red-700">3 need attention</Badge></div><p className="mt-1 text-xs text-slate-500">Unusual changes detected against the previous 7-day baseline</p></div><Link href="/issues" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-950">View all issues <ArrowRight size={13} /></Link></div>
        <div className="divide-y divide-slate-100">
          {issues.slice(0, 3).map((issue, index) => <Link key={issue.id} href={`/issues/${issue.id}`} className="group grid gap-4 px-5 py-5 transition hover:bg-slate-50/80 sm:grid-cols-[minmax(220px,.8fr)_minmax(320px,1.4fr)_110px_24px] sm:items-center sm:px-6"><div><div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-amber-500' : 'bg-yellow-400'}`} /><h3 className="text-sm font-semibold text-slate-900">{issue.name}</h3></div><div className="mt-2 flex items-center gap-2 pl-4 text-xs"><span className="font-mono text-slate-500">{issue.conversations} conversations</span><span className="inline-flex items-center font-semibold text-red-600"><ArrowUpRight size={12} />{issue.change}%</span></div></div><p className="text-sm leading-6 text-slate-600">{issue.summary}</p><Badge className={index === 0 ? 'border-red-100 bg-red-50 text-red-700' : index === 1 ? 'border-orange-100 bg-orange-50 text-orange-700' : 'border-amber-100 bg-amber-50 text-amber-700'}>{issue.severity}</Badge><ArrowRight size={16} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-600" /></Link>)}
        </div>
      </section>

      <div className="mb-6 grid gap-6 xl:grid-cols-[1.45fr_.75fr]">
        <TrendChart />
        <section className="surface p-5 sm:p-6">
          <div className="flex items-start justify-between"><div><h2 className="section-title">Daily CX brief</h2><p className="mt-1 text-xs text-slate-500">Here’s what needs your attention today.</p></div><Sparkles size={18} className="text-emerald-600" /></div>
          <div className="mt-5 space-y-4">{insights.map((insight, index) => <div key={insight.id} className="flex gap-3"><span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-orange-400' : 'bg-emerald-500'}`} /><div><p className="text-sm font-semibold text-slate-800">{insight.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{insight.summary}</p></div></div>)}</div>
          <div className="mt-5 border-t border-slate-100 pt-5"><ProductBriefDialog compact /></div>
        </section>
      </div>

      <section className="flex flex-col gap-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div className="flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-emerald-700 shadow-sm"><Lightbulb size={18} /></span><div><p className="text-sm font-semibold text-emerald-950">Fast intervention: show refund ETA during cancellation</p><p className="mt-1 text-xs leading-5 text-emerald-800">Could prevent an estimated 38 contacts per week with low engineering effort.</p></div></div><Link href="/issues/refund-delays" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-800">Review evidence <ArrowRight size={13} /></Link></section>
    </>
  )
}
