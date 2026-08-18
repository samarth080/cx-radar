'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Radar, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState('')

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_10%,#10b981_0,transparent_26%),radial-gradient(circle_at_80%_80%,#0f766e_0,transparent_30%)]" />
        <div className="relative flex items-center gap-2.5 font-semibold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400 text-slate-950"><Radar size={20} /></span>CX Radar</div>
        <div className="relative max-w-xl">
          <p className="mb-5 text-sm font-semibold text-emerald-300">CONVERSATIONS → DECISIONS</p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.055em]">Find the problems customers keep contacting you about.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">Detect recurring issues, understand their root causes, and give product teams evidence they can act on.</p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[['1,284', 'Conversations'], ['4', 'Emerging issues'], ['23%', 'Preventable contacts']].map(([value, label]) => <div key={label} className="rounded-xl border border-white/10 bg-white/[.06] p-4"><p className="font-mono text-xl font-semibold">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>)}
          </div>
        </div>
        <div className="relative flex items-center gap-2 text-xs text-slate-500"><ShieldCheck size={15} /> Synthetic demo data · No customer data leaves this workspace</div>
      </section>

      <section className="flex items-center justify-center bg-[#fbfcfc] px-5 py-12">
        <div className="w-full max-w-[410px]">
          <div className="mb-10 flex items-center gap-2.5 font-semibold lg:hidden"><span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white"><Radar size={20} /></span>CX Radar</div>
          <div className="mb-8"><p className="label text-emerald-700">NOVA COMMERCE</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Welcome to CX Radar</h2><p className="mt-2 text-sm leading-6 text-slate-500">Turn customer conversations into decisions.</p></div>
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setNotice('Demo authentication only — use the workspace button below.') }}>
            <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Email</span><Input type="email" placeholder="you@company.com" /></label>
            <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Password</span><span className="relative block"><Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pr-11" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>
            {notice && <p role="status" className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">{notice}</p>}
            <Button type="submit" className="w-full">Sign in</Button>
          </form>
          <div className="my-6 flex items-center gap-3 text-xs text-slate-500"><span className="h-px flex-1 bg-slate-200" />or<span className="h-px flex-1 bg-slate-200" /></div>
          <Link href="/overview" className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-950"><Sparkles size={16} className="text-emerald-600" />Continue with demo workspace<ArrowRight size={16} className="ml-auto" /></Link>
          <p className="mt-5 text-center text-xs text-slate-500">No account or API key required</p>
        </div>
      </section>
    </main>
  )
}
