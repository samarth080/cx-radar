'use client'

import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { trendData } from '@/lib/data'

const series = [
  { key: 'Payments', color: '#059669' },
  { key: 'Refunds', color: '#f59e0b' },
  { key: 'Delivery', color: '#6366f1' },
  { key: 'Account', color: '#94a3b8' },
]

export function TrendChart() {
  const [period, setPeriod] = useState('7D')
  return (
    <div className="surface h-full p-5 sm:p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div><h2 className="section-title">Conversation trends</h2><p className="mt-1 text-xs text-slate-500">Volume by detected issue category</p></div>
        <div className="flex rounded-lg bg-slate-100 p-1">{['7D', '30D', '90D'].map((item) => <button key={item} onClick={() => setPeriod(item)} className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${period === item ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>{item}</button>)}</div>
      </div>
      <div className="h-[245px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#eef2f5" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 12px 30px rgba(15,23,42,.1)', fontSize: 12 }} />
            {series.map((item) => <Line key={item.key} type="monotone" dataKey={item.key} stroke={item.color} strokeWidth={item.key === 'Payments' ? 2.5 : 1.8} dot={false} activeDot={{ r: 4 }} />)}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">{series.map((item) => <span key={item.key} className="flex items-center gap-1.5 text-[11px] text-slate-500"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />{item.key}</span>)}</div>
    </div>
  )
}
