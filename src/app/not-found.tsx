import Link from 'next/link'
import { Radar } from 'lucide-react'

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4"><div className="text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-emerald-500 text-white"><Radar /></span><p className="label mt-5">404</p><h1 className="mt-2 text-2xl font-semibold">This signal isn’t on the radar</h1><p className="mt-2 text-sm text-slate-500">The page or issue could not be found.</p><Link href="/overview" className="mt-5 inline-flex h-10 items-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white">Return to overview</Link></div></main>
}
