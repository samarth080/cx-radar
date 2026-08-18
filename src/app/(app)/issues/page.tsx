import { IssuesView } from '@/components/issues-view'
import { PageHeader } from '@/components/page-header'

export const metadata = { title: 'Issues & root causes' }

export default function IssuesPage() {
  return <><PageHeader eyebrow="RECURRING PROBLEMS" title="Issues & root causes" description="See where contact volume is clustering, what changed, and which problems need intervention." /><IssuesView /></>
}
