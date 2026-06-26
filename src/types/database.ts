export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type PlanType = 'basic' | 'plus' | 'master' | 'admin'
export type UserRole = 'owner' | 'admin' | 'editor' | 'viewer' | 'super_admin'
export type ContentType = 'post' | 'video' | 'reel' | 'story' | 'carousel' | 'banner' | 'flyer' | 'logo' | 'thumbnail' | 'email' | 'ad' | 'presentation' | 'landing_page' | 'other'
export type ContentStatus = 'draft' | 'review' | 'approved' | 'scheduled' | 'published' | 'archived'
export type SocialPlatform = 'instagram' | 'facebook' | 'tiktok' | 'linkedin' | 'pinterest' | 'threads' | 'youtube' | 'google_business' | 'twitter' | 'discord' | 'telegram' | 'whatsapp'
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived'
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          website: string | null
          industry: string | null
          description: string | null
          plan: PlanType
          subscription_status: SubscriptionStatus | null
          subscription_id: string | null
          trial_ends_at: string | null
          subscription_ends_at: string | null
          storage_used_bytes: number
          storage_limit_bytes: number
          max_users: number
          settings: Json
          brand_kit: Json
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['tenants']['Row']> & { name: string; slug: string }
        Update: Partial<Database['public']['Tables']['tenants']['Row']>
      }
      profiles: {
        Row: {
          id: string
          tenant_id: string | null
          role: UserRole
          full_name: string | null
          avatar_url: string | null
          company: string | null
          phone: string | null
          job_title: string | null
          bio: string | null
          website: string | null
          social_links: Json
          preferences: Json
          two_factor_enabled: boolean
          two_factor_secret: string | null
          api_keys: Json
          is_super_admin: boolean
          last_seen_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string }
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
      }
      content_items: {
        Row: {
          id: string
          tenant_id: string
          project_id: string | null
          workspace_id: string | null
          campaign_id: string | null
          type: ContentType
          status: ContentStatus
          title: string
          description: string | null
          body: string | null
          canvas_data: Json | null
          thumbnail_url: string | null
          file_url: string | null
          file_size_bytes: number
          file_format: string | null
          dimensions: Json | null
          platform: SocialPlatform[] | null
          hashtags: string[] | null
          tags: string[] | null
          ai_prompt: string | null
          ai_metadata: Json
          scheduled_at: string | null
          published_at: string | null
          versions: Json
          version_number: number
          parent_id: string | null
          created_by: string | null
          approved_by: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['content_items']['Row']> & { tenant_id: string; title: string }
        Update: Partial<Database['public']['Tables']['content_items']['Row']>
      }
      campaigns: {
        Row: {
          id: string
          tenant_id: string
          workspace_id: string | null
          name: string
          description: string | null
          objective: string | null
          status: CampaignStatus
          platforms: SocialPlatform[] | null
          start_date: string | null
          end_date: string | null
          budget: number | null
          target_audience: Json
          content_ids: string[] | null
          metrics: Json
          settings: Json
          created_by: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['campaigns']['Row']> & { tenant_id: string; name: string }
        Update: Partial<Database['public']['Tables']['campaigns']['Row']>
      }
      social_accounts: {
        Row: {
          id: string
          tenant_id: string
          platform: SocialPlatform
          account_id: string
          account_name: string | null
          account_username: string | null
          account_avatar: string | null
          is_active: boolean
          connected_at: string
          last_sync_at: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['social_accounts']['Row']> & { tenant_id: string; platform: SocialPlatform; account_id: string }
        Update: Partial<Database['public']['Tables']['social_accounts']['Row']>
      }
      library_assets: {
        Row: {
          id: string
          tenant_id: string
          name: string
          type: string
          url: string
          thumbnail_url: string | null
          size_bytes: number
          format: string | null
          dimensions: Json | null
          duration_seconds: number | null
          tags: string[] | null
          folder: string
          is_favorite: boolean
          metadata: Json
          uploaded_by: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['library_assets']['Row']> & { tenant_id: string; name: string; type: string; url: string }
        Update: Partial<Database['public']['Tables']['library_assets']['Row']>
      }
      analytics_snapshots: {
        Row: {
          id: string
          tenant_id: string
          social_account_id: string | null
          content_id: string | null
          platform: SocialPlatform | null
          snapshot_date: string
          followers: number
          following: number
          reach: number
          impressions: number
          engagements: number
          likes: number
          comments: number
          shares: number
          saves: number
          clicks: number
          metadata: Json
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['analytics_snapshots']['Row']> & { tenant_id: string }
        Update: Partial<Database['public']['Tables']['analytics_snapshots']['Row']>
      }
    }
    Functions: {
      my_tenant_id: { Args: Record<never, never>; Returns: string }
      is_super_admin: { Args: Record<never, never>; Returns: boolean }
      get_plan_limits: { Args: { p_plan: PlanType }; Returns: Json }
    }
    Enums: {
      plan_type: PlanType
      user_role: UserRole
      content_type: ContentType
      content_status: ContentStatus
      social_platform: SocialPlatform
      campaign_status: CampaignStatus
    }
  }
}
