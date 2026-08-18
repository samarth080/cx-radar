'use client'

import { useState } from 'react'
import { Check, Clipboard, Download, Send } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { downloadText } from '@/lib/utils'
import { track } from '@/lib/analytics'

const briefText = `CX Radar Product Brief — Payment failures

Customer problem
Customers completing UPI authentication are returning to a payment failure state.

Evidence
• 74 conversations this week
• +62% week-over-week
• 68% involve UPI
• 42% resulted in repeat contact

Customer impact
Failed orders, uncertainty about charges, and increased support contacts.

Recommended intervention
Investigate gateway callback failures, preserve carts, and provide a safe payment retry path.

Expected outcome
Reduce payment-related support contacts and improve checkout completion.`

export function ProductBriefDialog({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  function generated() { track('product_brief_generated', { issue: 'payment-failures' }) }

  return (
    <Dialog onOpenChange={(open) => { if (open) generated() }}>
      <DialogTrigger asChild><Button size={compact ? 'sm' : 'default'}><Clipboard size={15} />Generate product brief</Button></DialogTrigger>
      <DialogContent className="max-w-2xl">
        <p className="label text-emerald-700">AI-GENERATED · 4 CITATIONS</p>
        <DialogTitle className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Payment failures after UPI authentication</DialogTitle>
        <DialogDescription className="mt-2 text-sm text-slate-500">Prepared for Product & Payments · Updated 18 Aug, 10:42 AM</DialogDescription>
        <div className="mt-6 space-y-5 text-sm leading-6 text-slate-700">
          <BriefSection title="Customer problem">Customers completing UPI authentication are returning to a payment failure state.</BriefSection>
          <BriefSection title="Evidence"><ul className="grid gap-1 sm:grid-cols-2"><li>74 conversations this week</li><li>+62% week-over-week</li><li>68% involve UPI</li><li>42% resulted in repeat contact</li></ul></BriefSection>
          <BriefSection title="Customer impact">Failed orders, uncertainty about charges, and increased support contacts. Escalations are 14% higher for this issue.</BriefSection>
          <BriefSection title="Recommended intervention">Investigate gateway callback failures, preserve carts, and provide a safe payment retry path.</BriefSection>
          <BriefSection title="Expected outcome">Reduce payment-related support contacts and improve checkout completion.</BriefSection>
        </div>
        {shared && <div role="status" className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">Share link copied to clipboard.</div>}
        <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
          <Button variant="secondary" onClick={async () => { await navigator.clipboard.writeText(briefText); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }}>{copied ? <Check size={15} /> : <Clipboard size={15} />}{copied ? 'Copied' : 'Copy brief'}</Button>
          <Button variant="secondary" onClick={() => downloadText('cx-radar-payment-failures-brief.txt', briefText)}><Download size={15} />Export</Button>
          <Button onClick={async () => { await navigator.clipboard.writeText('https://demo.cxradar.app/briefs/payment-failures'); setShared(true) }}><Send size={15} />Share</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function BriefSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h3 className="mb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{title}</h3><div>{children}</div></section>
}
