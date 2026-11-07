# Guia de publicação e ambientes

## Ambientes
- Desenvolvimento: alterações e testes.
- Staging: validação com dados fictícios.
- Produção: dados reais, acesso restrito e backups.

## Antes de publicar
1. Configurar variáveis secretas no gestor de segredos.
2. Aplicar migrações da base de dados.
3. Rever políticas RLS e permissões.
4. Configurar autenticação e recuperação de conta.
5. Configurar domínio e HTTPS.
6. Testar backup/restauro.
7. Fazer revisão de segurança e privacidade.
8. Aprovar o lançamento.

O domínio growth.itprati.ao é apenas uma proposta e não está confirmado como configurado. Nunca colocar chaves, passwords ou tokens no Git.
