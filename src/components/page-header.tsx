'use client'

import { useState } from 'react'
import { CalendarDays, ChevronDown } from 'lucide-react'

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: React.ReactNode }) {
  const [rangeOpen, setRangeOpen] = useState(false)
  const [range, setRange] = useState('Last 7 days')
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>{eyebrow && <p className="label mb-2 text-emerald-700">{eyebrow}</p>}<h1 className="page-title">{title}</h1><p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">{description}</p></div>
      <div className="flex items-center gap-2 self-start sm:self-auto">
        {action}
        <div className="relative">
          <button onClick={() => setRangeOpen(!rangeOpen)} className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-white px-3 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50"><CalendarDays size={14} />{range}<ChevronDown size={13} /></button>
          {rangeOpen && <div className="absolute right-0 top-11 z-20 w-36 rounded-lg border bg-white p-1.5 shadow-float">{['Last 7 days', 'Last 30 days', 'Last 90 days'].map((item) => <button key={item} onClick={() => { setRange(item); setRangeOpen(false) }} className={`w-full rounded-md px-2.5 py-2 text-left text-xs ${item === range ? 'bg-emerald-50 font-semibold text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}`}>{item}</button>)}</div>}
        </div>
      </div>
    </div>
  )
}
