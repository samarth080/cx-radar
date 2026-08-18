import { IntegrationsView } from '@/components/integrations-view'
import { PageHeader } from '@/components/page-header'

export const metadata = { title: 'Integrations' }
export default function IntegrationsPage() { return <><PageHeader eyebrow="DATA SOURCES" title="Integrations" description="Bring customer conversations into one evidence layer. Demo connections are simulated locally." /><IntegrationsView /></> }
