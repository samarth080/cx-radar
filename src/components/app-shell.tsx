'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Bell, Bot, ChevronDown, CircleHelp, Download, FileText, Inbox, LayoutDashboard, Plug, Radar, Settings, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { UploadDialog } from '@/components/upload-dialog'
import { conversations } from '@/lib/data'
import { cn, downloadText } from '@/lib/utils'

const nav = [
  { label: 'Overview', href: '/overview', icon: LayoutDashboard },
  { label: 'Conversations', href: '/conversations', icon: Inbox, count: '1,284' },
  { label: 'Issues', href: '/issues', icon: FileText, count: '4' },
  { label: 'AI Insights', href: '/insights', icon: Bot },
]
const utilityNav = [{ label: 'Integrations', href: '/integrations', icon: Plug }, { label: 'Settings', href: '/settings', icon: Settings }]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [uploadOpen, setUploadOpen] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [workspaceOpen, setWorkspaceOpen] = useState(false)

  function exportCsv() {
    const header = 'id,customer,channel,issue,sentiment,urgency,status,timestamp'
    const rows = conversations.map((item) => [item.id, item.customer.name, item.channel, item.issue, item.sentiment, item.urgency, item.status, item.timestamp].map((value) => `"${value}"`).join(','))
    downloadText('nova-commerce-conversations.csv', [header, ...rows].join('\n'), 'text/csv')
  }

  return (
    <div className="min-h-screen bg-[#f8fafb]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[236px] flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center gap-2.5 px-5 text-[15px] font-semibold"><span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-white"><Radar size={18} /></span>CX Radar</div>
        <div className="relative mx-3">
          <button onClick={() => setWorkspaceOpen(!workspaceOpen)} className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-left transition hover:bg-slate-100">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-slate-950 text-[10px] font-bold text-white">NC</span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-slate-800">Nova Commerce</span><span className="block text-[10px] text-slate-500">Demo workspace</span></span><ChevronDown size={14} className="text-slate-500" />
          </button>
          {workspaceOpen && <div className="absolute left-0 right-0 top-12 z-20 rounded-lg border bg-white p-1.5 shadow-float"><button onClick={() => setWorkspaceOpen(false)} className="w-full rounded-md bg-slate-50 px-2.5 py-2 text-left text-xs font-medium">Nova Commerce <span className="float-right text-emerald-600">✓</span></button><button onClick={() => setWorkspaceOpen(false)} className="mt-1 w-full rounded-md px-2.5 py-2 text-left text-xs text-slate-500 hover:bg-slate-50">+ Add workspace</button></div>}
        </div>
        <nav className="mt-5 flex-1 px-3">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[.1em] text-slate-500">Monitor</p>
          {nav.map((item) => <NavItem key={item.href} item={item} active={pathname === item.href || (item.href === '/issues' && pathname.startsWith('/issues/'))} />)}
          <div className="my-4 h-px bg-slate-100" />
          {utilityNav.map((item) => <NavItem key={item.href} item={item} active={pathname === item.href} />)}
        </nav>
        <div className="border-t border-slate-100 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-slate-50"><span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800">SC</span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-slate-800">Samarth</span><span className="block truncate text-[10px] text-slate-500">CX Operations</span></span><ChevronDown size={13} className="text-slate-500" /></button>
        </div>
      </aside>

      <div className="lg:pl-[236px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 lg:hidden"><span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-white"><Radar size={18} /></span><span className="text-sm font-semibold">CX Radar</span></div>
          <div className="hidden items-center gap-2 text-xs text-slate-500 lg:flex"><span className="h-2 w-2 rounded-full bg-emerald-500" />Last updated 2 min ago</div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex" onClick={exportCsv}><Download size={14} />Export CSV</Button>
            <Button size="sm" onClick={() => setUploadOpen(true)}><Upload size={14} /><span className="hidden sm:inline">Upload conversations</span><span className="sm:hidden">Upload</span></Button>
            <div className="relative">
              <Tooltip content="Notifications"><Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => setNotifications(!notifications)} className="relative h-9 w-9"><Bell size={17} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white" /></Button></Tooltip>
              {notifications && <div className="absolute right-0 top-11 w-[min(340px,calc(100vw-2rem))] rounded-xl border bg-white p-2 shadow-float"><div className="flex items-center justify-between px-2 py-2"><p className="text-sm font-semibold">Notifications</p><button aria-label="Close notifications" onClick={() => setNotifications(false)}><X size={15} className="text-slate-500" /></button></div><div className="rounded-lg bg-red-50 p-3"><p className="text-xs font-semibold text-red-900">Payment failures crossed alert threshold</p><p className="mt-1 text-xs leading-5 text-red-700">+62% week-over-week · 74 conversations</p><Link href="/issues/payment-failures" onClick={() => setNotifications(false)} className="mt-2 inline-block text-xs font-semibold text-red-800 underline">Review root cause</Link></div></div>}
            </div>
            <Tooltip content="Help & product tour"><Button variant="ghost" size="icon" aria-label="Help" className="hidden h-9 w-9 sm:inline-flex"><CircleHelp size={17} /></Button></Tooltip>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1440px] px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:py-8 lg:pb-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[70px] items-center justify-around border-t border-slate-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] lg:hidden">
        {nav.map((item) => { const active = pathname === item.href || (item.href === '/issues' && pathname.startsWith('/issues/')); return <Link key={item.href} href={item.href} className={cn('flex min-w-16 flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium', active ? 'text-emerald-700' : 'text-slate-500')}><item.icon size={19} strokeWidth={active ? 2.4 : 1.9} />{item.label.replace('AI ', '')}</Link> })}
      </nav>
      <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  )
}

function NavItem({ item, active }: { item: { label: string; href: string; icon: typeof LayoutDashboard; count?: string }; active: boolean }) {
  return <Link href={item.href} className={cn('mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition', active ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950')}><item.icon size={17} strokeWidth={active ? 2.3 : 1.8} />{item.label}{item.count && <span className={cn('ml-auto font-mono text-[10px]', active ? 'text-emerald-700' : 'text-slate-500')}>{item.count}</span>}</Link>
}
