'use client'

import { CircleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ErrorState({ reset }: { reset: () => void }) {
  return <div className="surface mx-auto mt-20 max-w-lg p-8 text-center"><CircleAlert className="mx-auto text-red-500" /><h1 className="mt-4 text-xl font-semibold">We couldn’t load this view</h1><p className="mt-2 text-sm text-slate-500">Your demo data is safe. Try loading the view again.</p><Button onClick={reset} className="mt-5">Try again</Button></div>
}
