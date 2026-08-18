import { InsightsView } from '@/components/insights-view'
import { PageHeader } from '@/components/page-header'

export const metadata = { title: 'AI Insights' }

export default function InsightsPage() {
  return <><PageHeader eyebrow="AI ANALYST" title="Insights" description="Ask what changed, understand why, and move from customer evidence to a prioritized decision." /><InsightsView /></>
}
