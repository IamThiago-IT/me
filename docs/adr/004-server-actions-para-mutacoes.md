# ADR 004: Server Actions para mutações da aplicação

* **Status:** Aceito
* **Data:** Novembro de 2026
* **Contexto Técnico:** Formulários, operações server-side e invalidação de rotas

## 1. Contexto e Problema

O projeto possui operações acionadas por formulários e componentes React. Algumas são exportadas de módulos com `"use server"`; há também um Route Handler HTTP para envio de propostas. É necessário registrar o papel de cada mecanismo sem presumir que uma Server Action seja privada por não ter uma URL de API escrita no código.

## 2. Decisão Arquitetural

Usar Server Actions para mutações iniciadas pela interface React quando a integração com o fluxo da página for apropriada. Manter Route Handlers quando uma interface HTTP explícita for necessária.

Toda action e todo endpoint devem tratar os argumentos recebidos como entrada não confiável. Validação, autorização aplicável, proteção contra abuso e tratamento de erros precisam ocorrer no servidor, independentemente do mecanismo de chamada.

## 3. Alternativas Consideradas

* **Usar Route Handlers para todas as mutações:** oferece uma interface HTTP explícita, mas exige manter endpoints e chamadas cliente para operações que podem integrar-se diretamente a formulários React.
* **Usar Server Actions para todas as integrações externas:** não atende casos que exigem um contrato HTTP explícito ou consumidores fora da interface React.

## 4. Consequências e Métricas (Trade-offs)

* **Positivas:** permite associar mutações a formulários/ações React e usar os mecanismos de revalidação do App Router quando apropriado.
* **Negativas:** handlers e actions continuam sendo pontos de entrada do servidor; entradas e permissões devem ser verificadas em cada operação. Misturar mecanismos sem critérios claros pode duplicar validação e lógica de negócio.
* **Segurança:** `src/app/Actions/emailActions.ts` exporta `sendEmail(to, ...)`, que aceita destinatário fornecido pelo chamador. A Issue [#9](https://github.com/IamThiago-IT/me/issues/9) acompanha o fechamento desse relay e a proteção contra abuso nos fluxos de e-mail.
* **Métricas:** não há métricas comparativas de desempenho ou custo entre Actions e Route Handlers.

## Referências

* `src/app/Actions/`
* `src/app/contratos/actions.ts`
* `src/app/api/send-proposal/route.ts`
* [Next.js: Server Actions and Mutations](https://nextjs.org/docs/app/guides/server-actions)
* [Next.js: Data Security](https://nextjs.org/docs/app/guides/data-security)
* [Issue #9 — segurança dos fluxos de e-mail](https://github.com/IamThiago-IT/me/issues/9)
