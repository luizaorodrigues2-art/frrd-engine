# AURYX MEDIA AI Studio — Guia de Configuração

## 1. Configurar o Supabase

### 1.1 Executar o Schema SQL

1. Acesse: https://suzriwlqievvqfrzzpru.supabase.co
2. Vá em **SQL Editor**
3. Cole o conteúdo do arquivo `src/lib/supabase/schema.sql`
4. Clique em **Run**

### 1.2 Obter a Anon Key

1. No Supabase, vá em **Settings → API**
2. Copie o valor de **anon public**
3. Cole no arquivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=cole_aqui_a_chave
```

### 1.3 Criar Buckets de Storage

No Supabase, vá em **Storage** e crie os buckets:
- `studio-assets` (private)
- `brand-kits` (private)
- `avatars` (public)
- `templates` (public)

### 1.4 Configurar Autenticação OAuth (opcional)

No Supabase, vá em **Authentication → Providers**:
- **Google:** Ativar e adicionar Client ID/Secret do Google Cloud Console
- **Facebook:** Ativar e adicionar App ID/Secret do Meta Developers
- **Azure (Microsoft):** Ativar para Microsoft Login
- **Apple:** Ativar para Apple Sign In

## 2. Configurar API de IA

No arquivo `.env.local`, adicione sua chave de API:

```
# Opção 1: Claude (recomendado)
ANTHROPIC_API_KEY=sk-ant-...

# Opção 2: OpenAI
OPENAI_API_KEY=sk-...
```

Se nenhuma chave estiver configurada, o sistema roda em **modo demo** com conteúdo de exemplo.

## 3. Iniciar o sistema

```bash
npm run dev
```

Acesse:
- **Studio:** http://localhost:3000/studio
- **Login:** http://localhost:3000/studio/login

## 4. Sua conta de administrador

Ao fazer cadastro com `luizaorodrigues2@gmail.com`, o sistema automaticamente:
- Cria sua conta com **Super Admin** 
- Atribui o **Plano Master** (todos os recursos)
- Dá acesso ao **Painel Admin** em `/studio/admin`

## 5. URLs importantes

| Página | URL |
|--------|-----|
| Dashboard | /studio/dashboard |
| Criar com IA | /studio/create |
| Editor | /studio/editor |
| Campanhas | /studio/campaigns |
| Calendário | /studio/calendar |
| Analytics | /studio/analytics |
| Redes Sociais | /studio/social |
| Biblioteca | /studio/library |
| Agentes IA | /studio/agents |
| Banco de Ideias | /studio/ideas |
| Equipe | /studio/team |
| Configurações | /studio/settings |
| Admin Panel | /studio/admin |
