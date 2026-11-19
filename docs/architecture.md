# Arquitetura

## Visão geral

O projeto é uma aplicação Next.js com App Router. As páginas compõem a interface; Server Actions e Route Handlers tratam operações no servidor; dados editoriais e projetos vêm de serviços externos.

```text
Navegador
   │
   ▼
Next.js App Router
   ├── páginas e componentes React
   ├── Server Actions
   └── Route Handler: /api/send-proposal
          └── Resend

Fontes externas
   ├── GitHub REST API ── projetos e changelog
   ├── TabNews API ────── artigos
   └── Cal.com embed ──── agendamento
```

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.2.1 |
| UI | React 19.2.4 |
| Linguagem | TypeScript 5 |
| Estilos | Tailwind CSS 4 |
| Banco/tooling | Prisma 7.8, PostgreSQL |
| E-mail | Resend 6 |
| Testes/componentes | Vitest 3, Storybook 9, Playwright declarado |

As versões refletem os manifests do projeto; dependências com intervalos `^` podem resolver para versões posteriores.

## Organização do código

```text
src/
├── app/          # Rotas, páginas, Server Actions e Route Handlers
├── components/   # Componentes compartilhados e UI
├── lib/          # Integrações, i18n e utilitários
├── hooks/        # Hooks React
└── domain/       # Tipos e lógica por domínio
prisma/
├── schema/       # Schemas Prisma
└── migrations/   # Migrações versionadas
docs/
└── adr/          # Registros de decisões arquiteturais
```

## Limites e estado atual

- O App Router usa Server Components por padrão, mas algumas páginas de dados, como `/projetos` e `/blog`, ainda buscam dados no cliente. A migração e a estratégia de cache estão em acompanhamento nas [Issues #6](https://github.com/IamThiago-IT/me/issues/6) e [#11](https://github.com/IamThiago-IT/me/issues/11).
- `src/lib/i18n/` mantém os catálogos PT-BR/EN e a preferência de idioma no navegador.
- Os schemas Prisma descrevem PostgreSQL, mas não foram encontrados usos de `PrismaClient` em `src/`. A presença dos schemas não significa que essas rotas persistam dados por Prisma.
- A autenticação está desativada; consulte o [ADR 003](adr/003-autenticacao-removida.md) e confirme os requisitos de acesso antes de adicionar funcionalidades com dados sensíveis.
- As Server Actions são pontos de entrada do servidor: ainda precisam validar e proteger operações. Consulte o [ADR 004](adr/004-server-actions-para-mutacoes.md) e a [Issue #9](https://github.com/IamThiago-IT/me/issues/9).

## Decisões

Os motivos, alternativas e trade-offs estão registrados em [ADRs](adr/).
