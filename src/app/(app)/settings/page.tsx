import { PageHeader } from '@/components/page-header'
import { SettingsView } from '@/components/settings-view'

export const metadata = { title: 'Settings' }
export default function SettingsPage() { return <><PageHeader eyebrow="WORKSPACE" title="Settings" description="Configure how CX Radar monitors Nova Commerce and routes emerging signals." /><SettingsView /></> }
