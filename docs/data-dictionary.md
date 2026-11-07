# Dicionário de dados (proposta)

| Entidade | Campos essenciais | Sensibilidade |
|---|---|---|
| Lead | id, origem, serviço, etapa, responsável, timestamps | Alta |
| Customer | id interno, estado, serviço | Alta |
| Referral | indicador_id, referido_id, código, pagamento, activação, estado | Alta |
| Reward | grupo, tipo, aprovação, aplicação, auditoria | Alta |
| ContestParticipant | id, código público, consentimento | Média |
| VisitEvent | token pseudónimo, timestamp, sinais de abuso | Média/Alta |
| Content | data, canal, formato, estado, URL | Baixa |
| Expense | data, categoria, valor, aprovação | Média |
| Task | descrição, responsável, prazo, estado | Baixa/Média |

Aplicar minimização, controlo por função, retenção definida e registo de acesso.
