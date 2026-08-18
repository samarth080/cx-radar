import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { IssueDetail } from '@/components/issue-detail'
import { issues } from '@/lib/data'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const issue = issues.find((item) => item.id === id)
  return { title: issue?.name ?? 'Issue' }
}

export default async function IssuePage({ params }: Props) {
  const { id } = await params
  const issue = issues.find((item) => item.id === id)
  if (!issue) notFound()
  return <IssueDetail issue={issue} />
}
