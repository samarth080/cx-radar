'use client'

import { useRef, useState } from 'react'
import { Check, FileJson, FileSpreadsheet, Upload, WandSparkles } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { track } from '@/lib/analytics'

const steps = ['Uploading conversations', 'Analyzing customer intent', 'Detecting sentiment', 'Grouping recurring issues', 'Identifying root causes', 'Generating insights']

export function UploadDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [fileName, setFileName] = useState('')
  const [activeStep, setActiveStep] = useState(-1)
  const [complete, setComplete] = useState(false)
  const timerRef = useRef<number | null>(null)

  function reset() {
    setFileName('')
    setActiveStep(-1)
    setComplete(false)
    if (timerRef.current) window.clearInterval(timerRef.current)
  }

  function processFile() {
    if (!fileName || activeStep >= 0) return
    track('conversation_upload_started', { file_name: fileName })
    setActiveStep(0)
    let current = 0
    timerRef.current = window.setInterval(() => {
      current += 1
      if (current >= steps.length) {
        if (timerRef.current) window.clearInterval(timerRef.current)
        setComplete(true)
        track('conversation_upload_completed', { conversations: 128 })
      } else setActiveStep(current)
    }, 650)
  }

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) reset(); onOpenChange(next) }}>
      <DialogContent className="max-w-lg">
        {!complete ? (
          <>
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><Upload size={20} /></div>
            <DialogTitle className="text-xl font-semibold tracking-tight">Upload conversations</DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-6 text-slate-500">Add a CSV or JSON export. CX Radar will simulate classification and root-cause detection locally.</DialogDescription>
            {activeStep < 0 ? (
              <div className="mt-6">
                <label className="group flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-9 text-center transition hover:border-emerald-400 hover:bg-emerald-50/30">
                  <input type="file" accept=".csv,.json" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')} />
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-slate-500 shadow-sm group-hover:text-emerald-700"><FileSpreadsheet size={19} /></span>
                  <span className="mt-3 text-sm font-semibold text-slate-800">{fileName || 'Choose a CSV or JSON file'}</span>
                  <span className="mt-1 text-xs text-slate-500">Up to 10 MB · customer, message, channel, timestamp</span>
                </label>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5 text-xs text-slate-500"><FileJson size={15} /> For this prototype, file contents are not uploaded to a server.</div>
                <Button onClick={processFile} disabled={!fileName} className="mt-5 w-full"><WandSparkles size={16} />Analyze conversations</Button>
              </div>
            ) : (
              <div className="mt-6">
                <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-1/3 rounded-full bg-emerald-500 animate-indeterminate" /></div>
                <div className="space-y-2.5">
                  {steps.map((step, index) => <div key={step} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${index === activeStep ? 'bg-emerald-50 font-medium text-emerald-900' : index < activeStep ? 'text-slate-500' : 'text-slate-300'}`}><span className={`grid h-5 w-5 place-items-center rounded-full border ${index < activeStep ? 'border-emerald-500 bg-emerald-500 text-white' : index === activeStep ? 'border-emerald-500' : 'border-slate-200'}`}>{index < activeStep ? <Check size={12} /> : <span className={`h-1.5 w-1.5 rounded-full ${index === activeStep ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`} />}</span>{step}{index === activeStep && <span className="ml-auto text-xs text-emerald-700">Processing</span>}</div>)}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check size={26} /></div>
            <DialogTitle className="mt-5 text-2xl font-semibold tracking-tight">128 conversations analyzed</DialogTitle>
            <DialogDescription className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">We found 8 issue groups, 3 emerging patterns, and 29 potentially preventable contacts.</DialogDescription>
            <div className="mt-6 grid grid-cols-3 gap-2 text-left">{[['8', 'Issue groups'], ['3', 'Emerging'], ['92%', 'Avg. confidence']].map(([value, label]) => <div key={label} className="rounded-lg bg-slate-50 p-3"><p className="font-mono text-lg font-semibold text-slate-950">{value}</p><p className="mt-1 text-[11px] text-slate-500">{label}</p></div>)}</div>
            <Button onClick={() => { reset(); onOpenChange(false) }} className="mt-6 w-full">View updated dashboard</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
