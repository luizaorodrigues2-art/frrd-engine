import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import StudioAppShell from '@/components/studio/AppShell'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/studio/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, tenants(*)')
    .eq('id', user.id)
    .single()

  return <StudioAppShell user={user} profile={profile}>{children}</StudioAppShell>
}
