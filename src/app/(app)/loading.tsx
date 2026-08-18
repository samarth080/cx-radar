export default function Loading() {
  return <div className="animate-pulse"><div className="h-4 w-28 rounded bg-slate-200" /><div className="mt-3 h-9 w-64 rounded bg-slate-200" /><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-28 rounded-xl bg-slate-200" />)}</div><div className="mt-6 h-80 rounded-xl bg-slate-200" /></div>
}
