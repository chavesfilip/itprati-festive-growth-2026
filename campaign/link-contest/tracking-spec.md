# Especificação de tracking

## Evento
Cada visita elegível gera um evento com:
- participant_code;
- campaign_id;
- timestamp UTC e timestamp local;
- visitor_token pseudónimo first-party;
- landing_path e referrer (quando disponível);
- user_agent reduzido/normalizado, se necessário;
- flags de rate limit e suspeita;
- decisão de validação e motivo.

## Deduplicação
Definir janela de unicidade nas definições da campanha. Um visitante não deve aumentar repetidamente a pontuação dentro dessa janela. Usar token first-party e sinais adicionais; IP pode ser um sinal de risco, nunca a única prova de identidade.

## Protecção
- Minimizar dados recolhidos.
- Não recolher fingerprinting invasivo.
- Definir retenção e eliminação.
- Limitar acessos à equipa autorizada.
- Guardar alterações de pontuação em audit log.
- Permitir revisão e contestação conforme regulamento.

## Testes antes de lançar
1. Dois participantes têm links distintos.
2. A mesma sessão repetida não soma visitas ilimitadas.
3. Bots e rajadas de tráfego são sinalizados.
4. Alterações manuais ficam auditadas.
5. Ranking público não expõe dados pessoais.
6. Eventos de teste estão identificados e excluídos da pontuação real.
