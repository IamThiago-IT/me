# ME — Portfólio

Portfólio pessoal com projetos do GitHub, artigos do TabNews, formulário de contato e agendamento pelo Cal.com.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Prisma 7

## Início rápido

```bash
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000). Para variáveis de ambiente e pré-requisitos, consulte [Desenvolvimento](docs/development.md).

## Documentação

| Guia | Conteúdo |
|---|---|
| [Visão geral da documentação](docs/README.md) | Índice dos guias e decisões |
| [Arquitetura](docs/architecture.md) | Stack, componentes e integrações |
| [Desenvolvimento](docs/development.md) | Setup, ambiente, scripts e testes |
| [Integrações](docs/integrations.md) | Resend, GitHub, TabNews e Cal.com |
| [Deploy](docs/deployment.md) | Build e provedores de deploy |
| [ADRs](docs/adr/) | Decisões arquiteturais numeradas |

## Scripts principais

| Comando | Uso |
|---|---|
| `pnpm dev` | Desenvolvimento local |
| `pnpm build` | Build de produção |
| `pnpm start` | Servir o build |

Consulte [Desenvolvimento](docs/development.md) para os demais scripts e o estado atual das verificações automatizadas.

## Atenção

Os fluxos públicos de e-mail e sua proteção contra abuso estão em revisão na [Issue #9](https://github.com/IamThiago-IT/me/issues/9). Não presuma que uma Server Action seja privada por ser executada no servidor.
