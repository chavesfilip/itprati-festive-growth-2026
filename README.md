# iTpraTi Festive Growth 2026

Repositório operacional da campanha de aquisição e retenção da iTpraTi.

> **Estado:** estrutura inicial e documentação. Regras comerciais, aplicação web e tracking devem ser validados antes de produção.

## Objectivos de planeamento
- Meta de aquisição: 150 novos clientes no total da campanha (editável).
- Orçamento de marketing: 200.000 Kz/mês.
- Serviços: Internet, TV Online, Box Android e Combo.
- Período proposto: 08/11/2026 a 05/01/2027.
- Fuso horário: Africa/Luanda.

Os valores acima são parâmetros de planeamento, não resultados alcançados. Não introduzir dados reais de clientes neste repositório.

## Estrutura
- `campaign/strategy`: estratégia, metas, orçamento e regras.
- `campaign/editorial-calendar`: calendário editorial.
- `campaign/referral`: programa de recomendação.
- `campaign/link-contest`: concurso de partilha.
- `campaign/ads`: briefings de anúncios.
- `assets/`: identidade visual e materiais aprovados.
- `production/`: guiões e fluxo de produção.
- `reports/`: modelos de relatórios.
- `templates/`: CSV para preenchimento.
- `docs/`: procedimentos e dicionário de dados.

## Regras de segurança
1. Nunca guardar nomes, telefones, emails, documentos, moradas, códigos de clientes ou dados de leads neste Git.
2. Não guardar palavras-passe, tokens, chaves API ou ficheiros `.env`.
3. Dados pessoais e métricas internas devem ficar numa base de dados privada com autenticação e permissões.
4. O ranking público só pode ser activado depois de aprovação do regulamento e aviso de privacidade.
5. Recompensas exigem validação humana e registo de auditoria.

## Como começar
1. Ler `docs/launch-checklist.md`.
2. Aprovar os regulamentos em `campaign/referral/` e `campaign/link-contest/`.
3. Confirmar calendário, responsáveis e orçamento.
4. Copiar os modelos CSV de `templates/` para o sistema interno; não preencher dados pessoais no Git.
5. Usar Issues/Projects do GitHub para tarefas de desenvolvimento e produção.

## Estado da aplicação
O repositório contém documentação e modelos operacionais. A existência deste repositório **não significa** que o dashboard, a base de dados, o domínio ou o tracking estejam publicados ou ligados.
