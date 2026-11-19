# ADR 003: Autenticação removida da aplicação

* **Status:** Em revisão
* **Data:** Novembro de 2026
* **Contexto Técnico:** Autenticação, autorização e rotas com dados sensíveis

## 1. Contexto e Problema

O README registra a decisão histórica de remover Better Auth por não haver, naquele momento, uma área protegida. A configuração atual confirma que a autenticação não está ativa: `src/lib/auth.ts` lança erro e `src/app/api/auth/[...all]/route.ts` responde `404`.

Essa situação não equivale a uma decisão de que futuras operações sensíveis devam ser públicas. A aplicação contém fluxos de formulário e uma interface de contratos; qualquer leitura ou mutação de dados sensíveis deve ter requisitos próprios de autenticação e autorização antes de ser habilitada.

## 2. Decisão Arquitetural

Manter a autenticação desativada somente enquanto não houver requisito aprovado para identidade ou área protegida. O status deste ADR é **Em revisão**: antes de adicionar persistência de dados sensíveis, operações administrativas ou acesso restrito, reavaliar a decisão e definir autenticação e autorização para o caso concreto.

Não tratar a remoção de autenticação como controle de acesso. Não confiar em validação ou ocultação feita apenas no cliente para proteger dados ou operações.

## 3. Alternativas Consideradas

* **Reintroduzir autenticação imediatamente:** não há requisito confirmado neste ADR que permita selecionar um provedor ou modelo de identidade sem especulação.
* **Deixar rotas e mutações futuras públicas:** não fornece controle de acesso e não é aceitável para operações ou dados que exijam restrição.

## 4. Consequências e Métricas (Trade-offs)

* **Positivas:** não manter uma configuração de autenticação sem uso atual confirmado.
* **Negativas:** não há sessão ou mecanismo de autorização disponível; novas funcionalidades não podem presumir a existência desses controles.
* **Risco de escopo:** a Issue [#8](https://github.com/IamThiago-IT/me/issues/8) afirma exposição de PII e escrita sem autenticação, mas as evidências descritas nela não foram confirmadas na branch analisada. Verificar os fluxos reais antes de classificar o risco como vulnerabilidade confirmada ou iniciar uma migração.
* **Métricas:** não há baseline ou SLA de autenticação definido.

## Referências

* `src/lib/auth.ts`
* `src/app/api/auth/[...all]/route.ts`
* [Issue #8 — revisar alegações sobre contratos e dados pessoais](https://github.com/IamThiago-IT/me/issues/8)
* [Next.js: Data Security](https://nextjs.org/docs/app/guides/data-security)
