import { createClient } from '@/lib/supabase/server'
import DashboardClient from './DashboardClient'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [profileResult, contentResult, campaignResult, socialResult] = await Promise.all([
    supabase.from('profiles').select('*, tenants(*)').eq('id', user!.id).single(),
    supabase.from('content_items').select('id, type, status, created_at, title').order('created_at', { ascending: false }).limit(10),
    supabase.from('campaigns').select('id, name, status, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('social_accounts').select('id, platform, account_name, is_active'),
  ])

  const profileData = profileResult.data as any
  const stats = {
    totalContent: contentResult.data?.length || 0,
    totalCampaigns: campaignResult.data?.length || 0,
    connectedAccounts: socialResult.data?.length || 0,
    storageUsed: profileData?.tenants?.storage_used_bytes || 0,
    storageLimit: profileData?.tenants?.storage_limit_bytes || 53687091200,
  }

  return (
    <DashboardClient
      user={user}
      profile={profileResult.data}
      recentContent={contentResult.data || []}
      recentCampaigns={campaignResult.data || []}
      socialAccounts={socialResult.data || []}
      stats={stats}
    />
  )
}
