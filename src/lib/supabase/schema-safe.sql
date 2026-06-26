-- ============================================================
-- AURYX MEDIA AI STUDIO - SCHEMA SEGURO (IF NOT EXISTS)
-- Execute este arquivo no Supabase SQL Editor
-- Pode rodar múltiplas vezes sem erro
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS (só cria se não existir)
-- ============================================================
DO $$ BEGIN
  CREATE TYPE plan_type AS ENUM ('basic', 'plus', 'master', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('owner', 'admin', 'editor', 'viewer', 'super_admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE content_type AS ENUM ('post', 'video', 'reel', 'story', 'carousel', 'banner', 'flyer', 'logo', 'thumbnail', 'email', 'ad', 'presentation', 'landing_page', 'other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE content_status AS ENUM ('draft', 'review', 'approved', 'scheduled', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE social_platform AS ENUM ('instagram', 'facebook', 'tiktok', 'linkedin', 'pinterest', 'threads', 'youtube', 'google_business', 'twitter', 'discord', 'telegram', 'whatsapp');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'paused', 'completed', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('active', 'trialing', 'past_due', 'canceled', 'incomplete');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'view', 'export', 'publish', 'login', 'logout');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- TABELAS
-- ============================================================

CREATE TABLE IF NOT EXISTS tenants (
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
  storage_limit_bytes BIGINT DEFAULT 53687091200,
  max_users INT DEFAULT 1,
  settings JSONB DEFAULT '{}',
  brand_kit JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS profiles (
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

CREATE TABLE IF NOT EXISTS tenant_members (
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

CREATE TABLE IF NOT EXISTS workspaces (
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

CREATE TABLE IF NOT EXISTS projects (
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

CREATE TABLE IF NOT EXISTS brand_kits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Minha Marca',
  logo_url TEXT,
  primary_color TEXT DEFAULT '#7C3AED',
  secondary_color TEXT DEFAULT '#A855F7',
  accent_color TEXT DEFAULT '#F59E0B',
  colors JSONB DEFAULT '[]',
  fonts JSONB DEFAULT '[]',
  typography JSONB DEFAULT '{}',
  voice_tone TEXT,
  target_audience TEXT,
  brand_values TEXT[],
  keywords TEXT[],
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campaigns (
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

CREATE TABLE IF NOT EXISTS content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
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

CREATE TABLE IF NOT EXISTS social_accounts (
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

CREATE TABLE IF NOT EXISTS scheduled_posts (
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

CREATE TABLE IF NOT EXISTS ai_generations (
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

CREATE TABLE IF NOT EXISTS analytics_snapshots (
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS library_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
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

CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type content_type NOT NULL,
  thumbnail_url TEXT,
  canvas_data JSONB NOT NULL DEFAULT '{}',
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

CREATE TABLE IF NOT EXISTS calendar_events (
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

CREATE TABLE IF NOT EXISTS notifications (
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

CREATE TABLE IF NOT EXISTS audit_logs (
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

CREATE TABLE IF NOT EXISTS trash_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  entity_data JSONB NOT NULL,
  deleted_by UUID REFERENCES auth.users(id),
  deleted_at TIMESTAMPTZ DEFAULT NOW(),
  restore_before TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

CREATE TABLE IF NOT EXISTS ideas (
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

CREATE TABLE IF NOT EXISTS agent_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_type TEXT NOT NULL,
  title TEXT,
  messages JSONB DEFAULT '[]',
  context JSONB DEFAULT '{}',
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES (IF NOT EXISTS)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_profiles_tenant ON profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_members_tenant ON tenant_members(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_members_user ON tenant_members(user_id);
CREATE INDEX IF NOT EXISTS idx_content_items_tenant ON content_items(tenant_id);
CREATE INDEX IF NOT EXISTS idx_content_items_status ON content_items(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_tenant ON campaigns(tenant_id);
CREATE INDEX IF NOT EXISTS idx_social_accounts_tenant ON social_accounts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_analytics_tenant_date ON analytics_snapshots(tenant_id, snapshot_date);
CREATE INDEX IF NOT EXISTS idx_library_assets_tenant ON library_assets(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant ON audit_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_ai_generations_tenant ON ai_generations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read_at);

-- ============================================================
-- FUNÇÕES E TRIGGERS (CREATE OR REPLACE)
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- Triggers updated_at (drop e recria para evitar duplicata)
DO $$ BEGIN
  DROP TRIGGER IF EXISTS trg_tenants_updated ON tenants;
  CREATE TRIGGER trg_tenants_updated BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  DROP TRIGGER IF EXISTS trg_profiles_updated ON profiles;
  CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  DROP TRIGGER IF EXISTS trg_workspaces_updated ON workspaces;
  CREATE TRIGGER trg_workspaces_updated BEFORE UPDATE ON workspaces FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  DROP TRIGGER IF EXISTS trg_projects_updated ON projects;
  CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  DROP TRIGGER IF EXISTS trg_content_items_updated ON content_items;
  CREATE TRIGGER trg_content_items_updated BEFORE UPDATE ON content_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  DROP TRIGGER IF EXISTS trg_campaigns_updated ON campaigns;
  CREATE TRIGGER trg_campaigns_updated BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  DROP TRIGGER IF EXISTS trg_social_accounts_updated ON social_accounts;
  CREATE TRIGGER trg_social_accounts_updated BEFORE UPDATE ON social_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  DROP TRIGGER IF EXISTS trg_library_assets_updated ON library_assets;
  CREATE TRIGGER trg_library_assets_updated BEFORE UPDATE ON library_assets FOR EACH ROW EXECUTE FUNCTION update_updated_at();
END $$;

-- Auto-criar profile + tenant ao cadastrar
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_tenant_id UUID;
  v_tenant_slug TEXT;
BEGIN
  v_tenant_slug := lower(regexp_replace(
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    '[^a-z0-9]', '-', 'g'
  )) || '-' || substr(NEW.id::text, 1, 8);

  INSERT INTO tenants (name, slug, plan)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'company', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    v_tenant_slug,
    'basic'
  )
  RETURNING id INTO v_tenant_id;

  INSERT INTO profiles (id, tenant_id, role, full_name, avatar_url, company, is_super_admin)
  VALUES (
    NEW.id,
    v_tenant_id,
    'owner',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'company',
    CASE WHEN NEW.email = 'luizaorodrigues2@gmail.com' THEN TRUE ELSE FALSE END
  );

  INSERT INTO tenant_members (tenant_id, user_id, role, accepted_at)
  VALUES (v_tenant_id, NEW.id, 'owner', NOW());

  INSERT INTO workspaces (tenant_id, name, created_by)
  VALUES (v_tenant_id, 'Workspace Principal', NEW.id);

  IF NEW.email = 'luizaorodrigues2@gmail.com' THEN
    UPDATE profiles SET role = 'super_admin', is_super_admin = TRUE WHERE id = NEW.id;
    UPDATE tenants SET plan = 'master', storage_limit_bytes = 107374182400 WHERE id = v_tenant_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Funções helpers RLS
CREATE OR REPLACE FUNCTION my_tenant_id() RETURNS UUID AS $$
  SELECT tenant_id FROM profiles WHERE id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_super_admin() RETURNS BOOLEAN AS $$
  SELECT COALESCE(is_super_admin, FALSE) FROM profiles WHERE id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;

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

-- Drop e recria policies para evitar conflito
DO $$ BEGIN

  DROP POLICY IF EXISTS "tenant_select" ON tenants;
  CREATE POLICY "tenant_select" ON tenants FOR SELECT USING (id = my_tenant_id() OR is_super_admin());
  DROP POLICY IF EXISTS "tenant_update" ON tenants;
  CREATE POLICY "tenant_update" ON tenants FOR UPDATE USING (id = my_tenant_id());

  DROP POLICY IF EXISTS "profile_select" ON profiles;
  CREATE POLICY "profile_select" ON profiles FOR SELECT USING (id = auth.uid() OR tenant_id = my_tenant_id() OR is_super_admin());
  DROP POLICY IF EXISTS "profile_update" ON profiles;
  CREATE POLICY "profile_update" ON profiles FOR UPDATE USING (id = auth.uid());
  DROP POLICY IF EXISTS "profile_insert" ON profiles;
  CREATE POLICY "profile_insert" ON profiles FOR INSERT WITH CHECK (id = auth.uid());

  DROP POLICY IF EXISTS "members_all" ON tenant_members;
  CREATE POLICY "members_all" ON tenant_members FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "workspaces_all" ON workspaces;
  CREATE POLICY "workspaces_all" ON workspaces FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "projects_all" ON projects;
  CREATE POLICY "projects_all" ON projects FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "brand_kits_all" ON brand_kits;
  CREATE POLICY "brand_kits_all" ON brand_kits FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "content_all" ON content_items;
  CREATE POLICY "content_all" ON content_items FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "campaigns_all" ON campaigns;
  CREATE POLICY "campaigns_all" ON campaigns FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "social_all" ON social_accounts;
  CREATE POLICY "social_all" ON social_accounts FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "scheduled_all" ON scheduled_posts;
  CREATE POLICY "scheduled_all" ON scheduled_posts FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "analytics_all" ON analytics_snapshots;
  CREATE POLICY "analytics_all" ON analytics_snapshots FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "library_all" ON library_assets;
  CREATE POLICY "library_all" ON library_assets FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "templates_select" ON templates;
  CREATE POLICY "templates_select" ON templates FOR SELECT USING (is_public = TRUE OR tenant_id = my_tenant_id() OR is_super_admin());
  DROP POLICY IF EXISTS "templates_manage" ON templates;
  CREATE POLICY "templates_manage" ON templates FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "calendar_all" ON calendar_events;
  CREATE POLICY "calendar_all" ON calendar_events FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "notifications_own" ON notifications;
  CREATE POLICY "notifications_own" ON notifications FOR ALL USING (user_id = auth.uid());

  DROP POLICY IF EXISTS "audit_select" ON audit_logs;
  CREATE POLICY "audit_select" ON audit_logs FOR SELECT USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "trash_all" ON trash_items;
  CREATE POLICY "trash_all" ON trash_items FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "ideas_all" ON ideas;
  CREATE POLICY "ideas_all" ON ideas FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "agents_all" ON agent_conversations;
  CREATE POLICY "agents_all" ON agent_conversations FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

  DROP POLICY IF EXISTS "ai_gen_all" ON ai_generations;
  CREATE POLICY "ai_gen_all" ON ai_generations FOR ALL USING (tenant_id = my_tenant_id() OR is_super_admin());

END $$;

-- ============================================================
-- Content versioning trigger
-- ============================================================
CREATE OR REPLACE FUNCTION save_content_version()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.canvas_data IS DISTINCT FROM NEW.canvas_data OR OLD.body IS DISTINCT FROM NEW.body THEN
    NEW.versions = COALESCE(OLD.versions, '[]'::jsonb) || jsonb_build_object(
      'version', OLD.version_number,
      'canvas_data', OLD.canvas_data,
      'body', OLD.body,
      'saved_at', NOW()
    );
    NEW.version_number = OLD.version_number + 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_content_versioning ON content_items;
CREATE TRIGGER trg_content_versioning BEFORE UPDATE ON content_items FOR EACH ROW EXECUTE FUNCTION save_content_version();

-- ============================================================
-- CONCLUÍDO
-- ============================================================
SELECT 'Schema AURYX Studio instalado com sucesso!' as status;
