-- ============================================================
-- AURYX MEDIA AI STUDIO - COMPLETE DATABASE SCHEMA
-- Execute this in Supabase SQL Editor
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE plan_type AS ENUM ('basic', 'plus', 'master', 'admin');
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'editor', 'viewer', 'super_admin');
CREATE TYPE content_type AS ENUM ('post', 'video', 'reel', 'story', 'carousel', 'banner', 'flyer', 'logo', 'thumbnail', 'email', 'ad', 'presentation', 'landing_page', 'other');
CREATE TYPE content_status AS ENUM ('draft', 'review', 'approved', 'scheduled', 'published', 'archived');
CREATE TYPE social_platform AS ENUM ('instagram', 'facebook', 'tiktok', 'linkedin', 'pinterest', 'threads', 'youtube', 'google_business', 'twitter', 'discord', 'telegram', 'whatsapp');
CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'paused', 'completed', 'archived');
CREATE TYPE subscription_status AS ENUM ('active', 'trialing', 'past_due', 'canceled', 'incomplete');
CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'view', 'export', 'publish', 'login', 'logout');

-- ============================================================
-- TENANTS (Organizations / Workspaces)
-- ============================================================
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  website TEXT,
  industry TEXT,
  description TEXT,
  plan plan_type NOT NULL DEFAULT 'basic',
  subscription_status subscription_status DEFAULT 'trialing',
  subscription_id TEXT,
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  subscription_ends_at TIMESTAMPTZ,
  storage_used_bytes BIGINT DEFAULT 0,
  storage_limit_bytes BIGINT DEFAULT 53687091200, -- 50 GB basic
  max_users INT DEFAULT 1,
  settings JSONB DEFAULT '{}',
  brand_kit JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  role user_role DEFAULT 'viewer',
  full_name TEXT,
  avatar_url TEXT,
  company TEXT,
  phone TEXT,
  job_title TEXT,
  bio TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{"language": "pt-BR", "theme": "dark", "notifications": true}',
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret TEXT,
  api_keys JSONB DEFAULT '[]',
  is_super_admin BOOLEAN DEFAULT FALSE,
  last_seen_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TENANT MEMBERS (many users per tenant)
-- ============================================================
CREATE TABLE tenant_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role DEFAULT 'editor',
  invited_by UUID REFERENCES auth.users(id),
  invited_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, user_id)
);

-- ============================================================
-- WORKSPACES (sub-organization per tenant)
-- ============================================================
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#7C3AED',
  icon TEXT DEFAULT 'folder',
  settings JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROJECTS
-- ============================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#7C3AED',
  thumbnail_url TEXT,
  settings JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- ============================================================
-- BRAND KITS
-- ============================================================
CREATE TABLE brand_kits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Minha Marca',
  logo_url TEXT,
  logo_dark_url TEXT,
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#7C3AED',
  secondary_color TEXT DEFAULT '#A855F7',
  accent_color TEXT DEFAULT '#F59E0B',
  background_color TEXT DEFAULT '#0A0A0A',
  text_color TEXT DEFAULT '#FFFFFF',
  colors JSONB DEFAULT '[]',
  fonts JSONB DEFAULT '[]',
  typography JSONB DEFAULT '{}',
  voice_tone TEXT,
  target_audience TEXT,
  brand_values TEXT[],
  keywords TEXT[],
  assets JSONB DEFAULT '[]',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTENT / ASSETS
-- ============================================================
CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
  campaign_id UUID,
  type content_type NOT NULL DEFAULT 'post',
  status content_status DEFAULT 'draft',
  title TEXT NOT NULL,
  description TEXT,
  body TEXT,
  canvas_data JSONB,
  thumbnail_url TEXT,
  file_url TEXT,
  file_size_bytes BIGINT DEFAULT 0,
  file_format TEXT,
  dimensions JSONB,
  platform social_platform[],
  hashtags TEXT[],
  tags TEXT[],
  ai_prompt TEXT,
  ai_metadata JSONB DEFAULT '{}',
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  versions JSONB DEFAULT '[]',
  version_number INT DEFAULT 1,
  parent_id UUID REFERENCES content_items(id),
  created_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- ============================================================
-- CAMPAIGNS
-- ============================================================
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  objective TEXT,
  status campaign_status DEFAULT 'draft',
  platforms social_platform[],
  start_date DATE,
  end_date DATE,
  budget DECIMAL(12,2),
  target_audience JSONB DEFAULT '{}',
  content_ids UUID[],
  metrics JSONB DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Add foreign key after campaigns table
ALTER TABLE content_items ADD CONSTRAINT fk_campaign FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL;

-- ============================================================
-- SOCIAL ACCOUNTS
-- ============================================================
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,
  account_id TEXT NOT NULL,
  account_name TEXT,
  account_username TEXT,
  account_avatar TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  permissions TEXT[],
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  connected_by UUID REFERENCES auth.users(id),
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, platform, account_id)
);

-- ============================================================
-- SCHEDULED POSTS
-- ============================================================
CREATE TABLE scheduled_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  published_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending',
  post_id TEXT,
  post_url TEXT,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AI GENERATIONS LOG
-- ============================================================
CREATE TABLE ai_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  content_id UUID REFERENCES content_items(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  result JSONB,
  model TEXT,
  tokens_used INT DEFAULT 0,
  cost_cents INT DEFAULT 0,
  duration_ms INT,
  status TEXT DEFAULT 'completed',
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ANALYTICS
-- ============================================================
CREATE TABLE analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  social_account_id UUID REFERENCES social_accounts(id) ON DELETE CASCADE,
  content_id UUID REFERENCES content_items(id) ON DELETE SET NULL,
  platform social_platform,
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
  followers INT DEFAULT 0,
  following INT DEFAULT 0,
  posts_count INT DEFAULT 0,
  reach INT DEFAULT 0,
  impressions INT DEFAULT 0,
  engagements INT DEFAULT 0,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  shares INT DEFAULT 0,
  saves INT DEFAULT 0,
  clicks INT DEFAULT 0,
  profile_views INT DEFAULT 0,
  website_clicks INT DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, social_account_id, content_id, snapshot_date)
);

-- ============================================================
-- LIBRARY (shared assets)
-- ============================================================
CREATE TABLE library_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- image, video, audio, font, template, icon
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  size_bytes BIGINT DEFAULT 0,
  format TEXT,
  dimensions JSONB,
  duration_seconds NUMERIC,
  tags TEXT[],
  folder TEXT DEFAULT '/',
  is_favorite BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- ============================================================
-- TEMPLATES
-- ============================================================
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- null = global template
  name TEXT NOT NULL,
  description TEXT,
  type content_type NOT NULL,
  thumbnail_url TEXT,
  canvas_data JSONB NOT NULL,
  category TEXT,
  tags TEXT[],
  platform social_platform[],
  dimensions JSONB,
  is_premium BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT FALSE,
  use_count INT DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CALENDAR EVENTS
-- ============================================================
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  content_id UUID REFERENCES content_items(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  platforms social_platform[],
  color TEXT DEFAULT '#7C3AED',
  status TEXT DEFAULT 'planned',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  data JSONB DEFAULT '{}',
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOG
-- ============================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action audit_action NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRASH / SOFT DELETE
-- ============================================================
CREATE TABLE trash_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  entity_data JSONB NOT NULL,
  deleted_by UUID REFERENCES auth.users(id),
  deleted_at TIMESTAMPTZ DEFAULT NOW(),
  restore_before TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- ============================================================
-- IDEA BANK
-- ============================================================
CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type content_type,
  platforms social_platform[],
  tags TEXT[],
  status TEXT DEFAULT 'new',
  priority TEXT DEFAULT 'medium',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AGENT CONVERSATIONS (AI Agents)
-- ============================================================
CREATE TABLE agent_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_type TEXT NOT NULL, -- marketing, commercial, social_media, copywriter, designer, etc.
  title TEXT,
  messages JSONB DEFAULT '[]',
  context JSONB DEFAULT '{}',
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_profiles_tenant ON profiles(tenant_id);
CREATE INDEX idx_tenant_members_tenant ON tenant_members(tenant_id);
CREATE INDEX idx_tenant_members_user ON tenant_members(user_id);
CREATE INDEX idx_content_items_tenant ON content_items(tenant_id);
CREATE INDEX idx_content_items_status ON content_items(status);
CREATE INDEX idx_content_items_type ON content_items(type);
CREATE INDEX idx_content_items_scheduled ON content_items(scheduled_at) WHERE scheduled_at IS NOT NULL;
CREATE INDEX idx_campaigns_tenant ON campaigns(tenant_id);
CREATE INDEX idx_social_accounts_tenant ON social_accounts(tenant_id);
CREATE INDEX idx_analytics_tenant_date ON analytics_snapshots(tenant_id, snapshot_date);
CREATE INDEX idx_library_assets_tenant ON library_assets(tenant_id);
CREATE INDEX idx_audit_logs_tenant ON audit_logs(tenant_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_ai_generations_tenant ON ai_generations(tenant_id);
CREATE INDEX idx_calendar_events_tenant_date ON calendar_events(tenant_id, event_date);
CREATE INDEX idx_notifications_user ON notifications(user_id, read_at);

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tenants_updated BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_workspaces_updated BEFORE UPDATE ON workspaces FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_brand_kits_updated BEFORE UPDATE ON brand_kits FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_content_items_updated BEFORE UPDATE ON content_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_campaigns_updated BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_social_accounts_updated BEFORE UPDATE ON social_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_library_assets_updated BEFORE UPDATE ON library_assets FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_templates_updated BEFORE UPDATE ON templates FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_ideas_updated BEFORE UPDATE ON ideas FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_agent_conversations_updated BEFORE UPDATE ON agent_conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  tenant_id UUID;
  tenant_slug TEXT;
BEGIN
  -- Create a tenant for the new user
  tenant_slug := lower(regexp_replace(
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    '[^a-z0-9]', '-', 'g'
  )) || '-' || substr(NEW.id::text, 1, 8);

  INSERT INTO tenants (name, slug, plan)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'company', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    tenant_slug,
    'basic'
  )
  RETURNING id INTO tenant_id;

  -- Create the user profile
  INSERT INTO profiles (id, tenant_id, role, full_name, avatar_url, company, is_super_admin)
  VALUES (
    NEW.id,
    tenant_id,
    'owner',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'company',
    CASE WHEN NEW.email = 'luizaorodrigues2@gmail.com' THEN TRUE ELSE FALSE END
  );

  -- Add as tenant member
  INSERT INTO tenant_members (tenant_id, user_id, role, accepted_at)
  VALUES (tenant_id, NEW.id, 'owner', NOW());

  -- Create default workspace
  INSERT INTO workspaces (tenant_id, name, created_by)
  VALUES (tenant_id, 'Workspace Principal', NEW.id);

  -- Set super_admin role if this is the admin email
  IF NEW.email = 'luizaorodrigues2@gmail.com' THEN
    UPDATE profiles SET role = 'super_admin', is_super_admin = TRUE WHERE id = NEW.id;
    UPDATE tenants SET plan = 'master' WHERE id = tenant_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- SOFT DELETE TRIGGER (moves to trash)
-- ============================================================
CREATE OR REPLACE FUNCTION handle_soft_delete()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL THEN
    INSERT INTO trash_items (tenant_id, entity_type, entity_id, entity_data, deleted_by)
    VALUES (NEW.tenant_id, TG_TABLE_NAME, NEW.id, row_to_json(OLD)::jsonb, auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_content_soft_delete BEFORE UPDATE ON content_items FOR EACH ROW EXECUTE FUNCTION handle_soft_delete();
CREATE TRIGGER trg_projects_soft_delete BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION handle_soft_delete();
CREATE TRIGGER trg_campaigns_soft_delete BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION handle_soft_delete();

-- ============================================================
-- STORAGE TRACKING TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_tenant_storage()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tenants SET storage_used_bytes = storage_used_bytes + COALESCE(NEW.size_bytes, 0) WHERE id = NEW.tenant_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tenants SET storage_used_bytes = GREATEST(0, storage_used_bytes - COALESCE(OLD.size_bytes, 0)) WHERE id = OLD.tenant_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_library_storage_insert AFTER INSERT ON library_assets FOR EACH ROW EXECUTE FUNCTION update_tenant_storage();
CREATE TRIGGER trg_library_storage_delete AFTER DELETE ON library_assets FOR EACH ROW EXECUTE FUNCTION update_tenant_storage();

-- ============================================================
-- AUDIT LOG FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION log_audit(
  p_action audit_action,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_old_data JSONB DEFAULT NULL,
  p_new_data JSONB DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
  INSERT INTO audit_logs (tenant_id, user_id, action, entity_type, entity_id, old_data, new_data)
  SELECT
    p.tenant_id,
    auth.uid(),
    p_action,
    p_entity_type,
    p_entity_id,
    p_old_data,
    p_new_data
  FROM profiles p WHERE p.id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE trash_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;

-- Helper: get current user's tenant_id
CREATE OR REPLACE FUNCTION my_tenant_id() RETURNS UUID AS $$
  SELECT tenant_id FROM profiles WHERE id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Helper: check if super admin
CREATE OR REPLACE FUNCTION is_super_admin() RETURNS BOOLEAN AS $$
  SELECT COALESCE(is_super_admin, FALSE) FROM profiles WHERE id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Helper: check tenant membership
CREATE OR REPLACE FUNCTION is_tenant_member(p_tenant_id UUID) RETURNS BOOLEAN AS $$
  SELECT EXISTS(
    SELECT 1 FROM tenant_members
    WHERE tenant_id = p_tenant_id AND user_id = auth.uid()
  )
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- TENANTS POLICIES
CREATE POLICY "Users can view their own tenant" ON tenants FOR SELECT
  USING (id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Super admin can manage all tenants" ON tenants FOR ALL
  USING (is_super_admin());
CREATE POLICY "Owners can update their tenant" ON tenants FOR UPDATE
  USING (id = my_tenant_id() AND EXISTS(SELECT 1 FROM tenant_members WHERE tenant_id = id AND user_id = auth.uid() AND role IN ('owner', 'admin')));

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (id = auth.uid() OR is_super_admin());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Tenant members can view each other" ON profiles FOR SELECT
  USING (tenant_id = my_tenant_id());

-- TENANT_MEMBERS POLICIES
CREATE POLICY "Members can view their tenant's members" ON tenant_members FOR SELECT
  USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Owners and admins can manage members" ON tenant_members FOR ALL
  USING (is_super_admin() OR (tenant_id = my_tenant_id() AND EXISTS(
    SELECT 1 FROM tenant_members tm WHERE tm.tenant_id = my_tenant_id() AND tm.user_id = auth.uid() AND tm.role IN ('owner', 'admin')
  )));

-- GENERIC TENANT-SCOPED POLICIES (workspaces, projects, content, etc.)
CREATE POLICY "Tenant scoped: workspaces" ON workspaces FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: projects" ON projects FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: brand_kits" ON brand_kits FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: content_items" ON content_items FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: campaigns" ON campaigns FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: social_accounts" ON social_accounts FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: scheduled_posts" ON scheduled_posts FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: analytics" ON analytics_snapshots FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: library" ON library_assets FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: calendar" ON calendar_events FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: trash" ON trash_items FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: ideas" ON ideas FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: agent_conversations" ON agent_conversations FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: ai_generations" ON ai_generations FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Tenant scoped: audit_logs" ON audit_logs FOR SELECT USING (tenant_id = my_tenant_id() OR is_super_admin());

-- TEMPLATES: public templates visible to all, private only to owner
CREATE POLICY "Templates: public visible to all" ON templates FOR SELECT USING (is_public = TRUE OR tenant_id = my_tenant_id() OR is_super_admin());
CREATE POLICY "Templates: manage own" ON templates FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

-- NOTIFICATIONS: own only
CREATE POLICY "Notifications: own only" ON notifications FOR ALL USING (user_id = auth.uid());

-- ============================================================
-- STORAGE BUCKETS (run in Supabase Dashboard)
-- ============================================================
-- CREATE STORAGE BUCKET 'studio-assets' (public: false)
-- CREATE STORAGE BUCKET 'brand-kits' (public: false)
-- CREATE STORAGE BUCKET 'avatars' (public: true)
-- CREATE STORAGE BUCKET 'templates' (public: true)

-- ============================================================
-- PLAN LIMITS FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION get_plan_limits(p_plan plan_type)
RETURNS JSONB AS $$
BEGIN
  RETURN CASE p_plan
    WHEN 'basic' THEN '{"storage_gb": 50, "max_users": 1, "max_workspaces": 1, "social_accounts": 0, "ai_generations_monthly": 500}'::jsonb
    WHEN 'plus' THEN '{"storage_gb": 200, "max_users": 5, "max_workspaces": 5, "social_accounts": 8, "ai_generations_monthly": 5000}'::jsonb
    WHEN 'master' THEN '{"storage_gb": 10000, "max_users": -1, "max_workspaces": -1, "social_accounts": -1, "ai_generations_monthly": -1}'::jsonb
    WHEN 'admin' THEN '{"storage_gb": -1, "max_users": -1, "max_workspaces": -1, "social_accounts": -1, "ai_generations_monthly": -1}'::jsonb
    ELSE '{"storage_gb": 50, "max_users": 1, "max_workspaces": 1, "social_accounts": 0, "ai_generations_monthly": 500}'::jsonb
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================
-- CONTENT VERSIONING FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION save_content_version()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.canvas_data IS DISTINCT FROM NEW.canvas_data OR OLD.body IS DISTINCT FROM NEW.body THEN
    NEW.versions = COALESCE(OLD.versions, '[]'::jsonb) || jsonb_build_object(
      'version', OLD.version_number,
      'canvas_data', OLD.canvas_data,
      'body', OLD.body,
      'saved_at', NOW(),
      'saved_by', auth.uid()
    );
    NEW.version_number = OLD.version_number + 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_content_versioning BEFORE UPDATE ON content_items FOR EACH ROW EXECUTE FUNCTION save_content_version();
