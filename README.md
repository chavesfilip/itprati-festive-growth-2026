# iTpraTi Festive Growth 2026

Repositório operacional da campanha de aquisição e retenção da iTpraTi.

> **Estado:** documentação e estrutura técnica inicial. Regras comerciais, aplicação web e tracking devem ser validados antes de produção.

## Objectivos de planeamento
- Meta de aquisição: 150 novos clientes no total da campanha (editável).
- Orçamento de marketing: 200.000 Kz/mês.
- Serviços: Internet, TV Online, Box Android e Combo.
- Período proposto: 08/11/2026 a 05/01/2027.
- Fuso horário: Africa/Luanda.

Os valores acima são parâmetros de planeamento, não resultados alcançados. Não introduzir dados reais de clientes neste repositório.

## Estrutura
- campaign/: estratégia, calendário, indicações, concurso e anúncios.
- assets/: identidade visual e materiais aprovados.
- production/: guiões e fluxo de produção.
- reports/: modelos de relatórios.
- templates/: CSV para preenchimento.
- docs/: procedimentos, arquitectura e dicionário de dados.
- src/app/: aplicação Next.js App Router.
- src/lib/supabase/: clientes Supabase para browser e servidor.
- supabase/migrations/: migrações SQL versionadas.

## Arquitectura aprovada
- **GitHub:** código e controlo de versões.
- **Next.js + TypeScript:** aplicação web.
- **Supabase:** PostgreSQL, autenticação e Row Level Security.
- **Vercel:** alojamento e deployments ligados ao GitHub.

Consultar docs/architecture.md e docs/next-setup.md.

## Desenvolvimento local
1. Instalar Node.js LTS compatível com Next.js 15.
2. Executar npm install.
3. Copiar .env.example para .env.local e preencher as variáveis do Supabase.
4. Executar npm run dev.
5. Validar com npm run typecheck, npm run lint e npm run build.

## Regras de segurança
1. Nunca guardar nomes, telefones, emails, documentos, moradas, códigos de clientes ou dados de leads neste Git.
2. Não guardar palavras-passe, tokens, chaves API ou ficheiros .env.
3. Dados pessoais e métricas internas devem ficar numa base de dados privada com autenticação e permissões.
4. RLS deve permanecer activa; não criar acesso público às tabelas operacionais.
5. O ranking público só pode ser activado depois de aprovação do regulamento e aviso de privacidade.
6. Recompensas exigem validação humana e registo de auditoria.

## Estado da aplicação
Foi adicionada a fundação Next.js e a migração SQL inicial. A página inicial é um esqueleto visual; autenticação, políticas completas por função, módulos operacionais e consultas reais ainda não estão implementados. O projecto Supabase não está ligado e não existe deployment Vercel confirmado.
