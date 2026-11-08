# Arquitectura técnica — Growth Control Center

## Decisão aprovada
- Código e versionamento: GitHub.
- Aplicação: Next.js App Router + TypeScript.
- Base de dados e autenticação: Supabase (PostgreSQL + Auth + RLS).
- Alojamento e CI/CD: Vercel ligado ao GitHub.

## Estrutura
- src/app: páginas e layout Next.js.
- src/lib/supabase: clientes Supabase para browser e servidor.
- supabase/migrations: alterações versionadas ao esquema SQL.
- campaign, production, reports e templates: materiais operacionais existentes, preservados.

## Segurança
- Nunca guardar segredos, tokens, credenciais ou dados reais de clientes no Git.
- Usar .env.local localmente e variáveis de ambiente na Vercel.
- A chave service_role é exclusivamente server-side e nunca deve ter prefixo NEXT_PUBLIC_.
- RLS activa nas tabelas desde a migração inicial; não há políticas de acesso público.
- Recompensas e visitas do concurso exigem validação administrativa.
- Regras do concurso e avisos de privacidade carecem de aprovação antes da recolha de dados.

## Configuração local
1. Instalar Node.js LTS compatível com Next.js 15.
2. Clonar o repositório e executar npm install.
3. Copiar .env.example para .env.local e preencher URL e chave anon do Supabase.
4. Aplicar a migração SQL no projecto Supabase após revisão.
5. Executar npm run dev; validar com npm run typecheck e npm run build.

## Publicação
Importar o repositório na Vercel, definir variáveis de ambiente e fazer deploy. A publicação só estará concluída após build e teste de produção bem-sucedidos.

## Supabase existente — iTpraTi-site
O projecto Supabase existente será reutilizado: Project ID `yfoxvgyqekneckqowvip`.
A tabela `public.leads` pertence ao formulário/site iTpraTi e não deve ser recriada, renomeada ou alterada por esta campanha.
A campanha usa `public.campaign_leads` para manter o pipeline comercial separado.
A migração inicial foi ajustada para respeitar esta separação. Não executar versões anteriores desta migração.
O URL e a publishable key devem ser configurados como variáveis de ambiente na Vercel e localmente; não guardar valores reais no Git.
