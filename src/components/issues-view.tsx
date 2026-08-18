'use client'

import Link from 'next/link'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tooltip } from '@/components/ui/tooltip'
import { issues } from '@/lib/data'
import { track } from '@/lib/analytics'

export function IssuesView() {
  return (
    <div className="surface overflow-hidden">
      <div className="grid grid-cols-[minmax(180px,1.4fr)_100px_90px_90px_100px_130px_24px] items-center gap-3 border-b border-slate-100 bg-slate-50/60 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.08em] text-slate-500 max-lg:hidden"><span>Issue</span><span>Volume</span><span>Change</span><span>Severity</span><span>Sentiment</span><span>Resolution</span><span /></div>
      <div className="divide-y divide-slate-100">{issues.map((issue) => <Link href={`/issues/${issue.id}`} onClick={() => track('issue_opened', { issue_id: issue.id })} key={issue.id} className="group grid gap-3 px-5 py-5 transition hover:bg-slate-50 lg:grid-cols-[minmax(180px,1.4fr)_100px_90px_90px_100px_130px_24px] lg:items-center"><div><div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${issue.severity === 'Critical' ? 'bg-red-500' : issue.severity === 'High' ? 'bg-orange-400' : 'bg-amber-400'}`} /><span className="text-sm font-semibold text-slate-900">{issue.name}</span></div><p className="mt-1.5 line-clamp-2 max-w-xl pl-4 text-xs leading-5 text-slate-500 lg:hidden">{issue.summary}</p><MiniTrend data={issue.trend} /></div><Data label="Volume"><span className="font-mono font-semibold text-slate-800">{issue.conversations}</span> <span className="text-[10px] text-slate-500">conversations</span></Data><Data label="Change"><span className={`inline-flex items-center text-xs font-semibold ${issue.change > 0 ? 'text-red-600' : 'text-emerald-700'}`}>{issue.change > 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{Math.abs(issue.change)}%</span></Data><Data label="Severity"><SeverityBadge severity={issue.severity} /></Data><Data label="Sentiment"><span className="font-mono text-xs font-medium text-slate-600">{issue.sentiment.toFixed(2)}</span></Data><Data label="Resolution"><div className="flex items-center gap-2"><span className="font-mono text-xs font-medium text-slate-700">{issue.resolutionRate}%</span><span className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-emerald-500" style={{ width: `${issue.resolutionRate}%` }} /></span></div></Data><ArrowRight size={16} className="hidden text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-600 lg:block" /></Link>)}</div>
      <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3 text-xs text-slate-500"><Info size={13} />Issues are clustered by shared intent and root cause, not keywords alone.<Tooltip content="Clusters require at least 8 similar conversations and 80% model confidence."><button className="font-semibold text-slate-600 underline decoration-dotted underline-offset-2">How detection works</button></Tooltip></div>
    </div>
  )
}

function Data({ label, children }: { label: string; children: React.ReactNode }) { return <div className="flex items-center justify-between lg:block"><span className="label lg:hidden">{label}</span><div>{children}</div></div> }
function SeverityBadge({ severity }: { severity: string }) { const style = severity === 'Critical' ? 'border-red-100 bg-red-50 text-red-700' : severity === 'High' ? 'border-orange-100 bg-orange-50 text-orange-700' : 'border-amber-100 bg-amber-50 text-amber-700'; return <Badge className={style}>{severity}</Badge> }
function MiniTrend({ data }: { data: number[] }) { const max = Math.max(...data); const min = Math.min(...data); const points = data.map((value, index) => `${index * 12},${22 - ((value - min) / Math.max(1, max - min)) * 18}`).join(' '); return <svg aria-label="Seven day trend" className="mt-2 ml-4 hidden h-6 w-[76px] lg:block" viewBox="0 0 76 24" role="img"><polyline points={points} fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> }
