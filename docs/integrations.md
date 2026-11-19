# Integrações

## Resend

Usado para enviar propostas e mensagens dos formulários. A chave é lida por `src/lib/resend.ts` a partir de `RESEND_API_KEY`; configure também `CONTACT_EMAIL` para definir explicitamente o destinatário.

Os fluxos de e-mail têm entradas públicas, incluindo `POST /api/send-proposal` e Server Actions. Segurança, rate limiting e restrição de destinatário estão em acompanhamento na [Issue #9](https://github.com/IamThiago-IT/me/issues/9).

## `POST /api/send-proposal`

Implementação: `src/app/api/send-proposal/route.ts`.

**Corpo JSON:**

| Campo | Tipo | Obrigatório |
|---|---|---|
| `name` | string | Sim |
| `email` | string | Sim |
| `subject` | string | Sim |
| `message` | string | Sim |
| `projectType` | string | Não |
| `budget` | string | Não |

**Respostas atuais:** `200` no envio bem-sucedido, `400` quando a validação falha e `500` em erro interno ou do provedor. A resposta de sucesso contém `success` e, quando retornado pelo Resend, `id`.

## GitHub REST API

`src/lib/github.ts` consulta repositórios públicos do usuário `IamThiago-IT` e commits deste repositório. A chamada é feita sem token. A página `/projetos` ainda chama a integração a partir de um componente cliente; cache e limite de requisições estão registrados nas [Issues #6](https://github.com/IamThiago-IT/me/issues/6) e [#11](https://github.com/IamThiago-IT/me/issues/11).

Documentação: [GitHub REST API](https://docs.github.com/en/rest).

## TabNews API

`src/lib/tabnews-api.ts` fornece dados para o blog a partir dos conteúdos públicos do usuário `IamThiagoIT`. A listagem `/blog` atualmente carrega os artigos no cliente.

Documentação: [API do TabNews](https://www.tabnews.com.br/api/docs).

## Cal.com

A página `/agendar` usa `@calcom/embed-react` para exibir o agendamento `iamthiago/call`.

Documentação: [Cal.com Embed](https://cal.com/docs/enterprise-features/embed).
