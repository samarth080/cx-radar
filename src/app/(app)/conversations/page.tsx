import { ConversationsView } from '@/components/conversations-view'
import { PageHeader } from '@/components/page-header'

export const metadata = { title: 'Conversations' }

export default function ConversationsPage() {
  return <><PageHeader eyebrow="VOICE OF CUSTOMER" title="Conversations" description="Review what customers are saying and inspect the AI classification behind each contact." /><ConversationsView /></>
}
