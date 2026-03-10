# ME — Portfolio

Portfólio pessoal full-stack. Combina apresentação profissional, showcase de projetos via GitHub API, blog via TabNews API, geração e assinatura de contratos, formulário de proposta com envio de e-mail e agendamento via Cal.com — tudo em um único Next.js App Router.

---

## Índice

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Stack Técnica](#2-stack-técnica)
3. [Estrutura de Pastas](#3-estrutura-de-pastas)
4. [Getting Started](#4-getting-started)
5. [Variáveis de Ambiente](#5-variáveis-de-ambiente)
6. [Workflow de Desenvolvimento](#6-workflow-de-desenvolvimento)
7. [Testes](#7-testes)
8. [Referência de API](#8-referência-de-api)
9. [Server Actions](#9-server-actions)
10. [Integrações Externas](#10-integrações-externas)
11. [Deployment](#11-deployment)
12. [Decisões de Arquitetura (ADRs)](#12-decisões-de-arquitetura-adrs)
13. [Limitações e Trabalho Futuro](#13-limitações-e-trabalho-futuro)

---

## 1. Visão Geral da Arquitetura

```
Browser
   │
   ▼
Next.js 15 (App Router — Vercel Edge / Node 22)
   │
   ├── React Server Components (RSC)  ← páginas estáticas/semi-estáticas
   ├── Client Components              ← interatividade (formulários, temas, i18n)
   ├── Server Actions                 ← mutações sem endpoint HTTP explícito
   └── API Route: /api/send-proposal  ← endpoint REST público
          │
          └── Resend API  ← transactional email

External Data Sources
   ├── GitHub REST API    ← lista de repositórios públicos
   ├── TabNews API        ← artigos do blog
   └── Cal.com embed      ← widget de agendamento

Infrastructure
   ├── Vercel             ← deploy primário (CI/CD automático via Git push)
   └── Cloudflare Pages   ← deploy alternativo (wrangler pages deploy)

Database (preparada, não utilizada em produção atualmente)
   └── SQLite (sqlite3)   ← schema de users criado, sem ORM
```

---

## 2. Stack Técnica

| Camada | Tecnologia | Versão | Razão da Escolha |
|---|---|---|---|
| Framework | Next.js | 15.3.8 | App Router, RSC, Server Actions, edge-ready |
| UI | React | 19.0.0 | Concurrent features, Server Components |
| Estilo | Tailwind CSS | v4 | Utility-first, DX rápido, PostCSS |
| Componentes | shadcn/ui + Radix UI | latest | Acessível, headless, sem lock-in |
| Animações | Framer Motion | latest | Animações declarativas com React |
| Tema | next-themes | latest | Dark/light sem flash (SSR-safe) |
| Ícones | Lucide React + React Icons | latest | Tree-shakeable |
| i18n | Custom Context API | — | Sem dependência externa; PT-BR + EN |
| Email | Resend | latest | API simples, HTML/React email |
| HTTP (client) | Axios | latest | Interceptors, tipagem, legibilidade |
| Markdown | react-markdown | latest | Renderização de blog posts |
| Agendamento | @calcom/embed-react | latest | Embed Cal.com in-page |
| Assinatura | react-signature-canvas | latest | Coleta de assinaturas em contratos |
| Banco de Dados | SQLite (sqlite3) | latest | Leve, sem servidor, schema preparado |
| Runtime | Node.js | 22.x | LTS atual, suportado pela Vercel |
| Package Manager | pnpm | — | Eficiência de disco, workspaces |
| Linting | Biome + ESLint | latest | Biome como formatter principal |
| Testes | Vitest + Playwright | v3.2.4 | Vite-native, browser testing integrado |
| Storybook | Storybook | v9.1.10 | Documentação e teste visual de componentes |
| Infra (primária) | Vercel | — | Zero-config para Next.js |
| Infra (alt.) | Cloudflare Pages | — | Wrangler deploy, edge global |
| TypeScript | TypeScript | v5 | Strict mode habilitado |

---

## 3. Estrutura de Pastas

```
.
├── src/
│   ├── app/                        # App Router — páginas e rotas
│   │   ├── Actions/                # Server Actions (mutações server-side)
│   │   │   ├── emailActions.ts     # Envio de e-mail (genérico + proposta)
│   │   │   ├── serverActions.ts    # Ações genéricas (ex: addService)
│   │   │   ├── newsletterActions.ts
│   │   │   └── feedbacksActions.ts
│   │   ├── api/
│   │   │   ├── auth/[...all]/      # Rota de auth (desativada — retorna 404)
│   │   │   └── send-proposal/      # POST — envia proposta via Resend
│   │   ├── about/                  # Sobre mim, cover letter, timeline
│   │   ├── blog/                   # Listagem + [id] detalhe (TabNews)
│   │   ├── projetos/               # Showcase de repositórios (GitHub API)
│   │   ├── contato/
│   │   │   └── proposta/           # Formulário de proposta
│   │   ├── contratos/              # Gestão de contratos + assinatura
│   │   ├── cv/                     # Download de CV (PT-BR + EN)
│   │   ├── feedbacks/              # Depoimentos
│   │   ├── newsletter/             # Inscrição na newsletter
│   │   ├── papers/                 # Artigos e pesquisas
│   │   ├── services/               # Serviços oferecidos
│   │   ├── sponsors/               # Patrocinadores
│   │   ├── agendar/                # Agendamento Cal.com
│   │   ├── setup/                  # Página de setup/onboarding
│   │   ├── layout.tsx              # Root layout (providers, fonte, tema)
│   │   ├── globals.css             # Estilos globais + variáveis Tailwind
│   │   ├── page.tsx                # Home / landing page
│   │   └── not-found.tsx           # 404 customizado
│   │
│   ├── components/
│   │   ├── ui/                     # Componentes shadcn/ui (Button, Card, Dialog…)
│   │   ├── Navbar.tsx
│   │   ├── SignaturePad.tsx        # Canvas para assinatura de contratos
│   │   ├── MetadataSetter.tsx      # Metadata dinâmica client-side
│   │   ├── LanguageSwitcher.tsx    # Toggle PT-BR / EN
│   │   ├── CommandDialogDemo.tsx   # Paleta de comandos (Ctrl+K)
│   │   ├── TimelineSection.tsx
│   │   └── BlogLanguageToggle.tsx
│   │
│   ├── lib/
│   │   ├── resend.ts               # Instância do cliente Resend
│   │   ├── auth.ts                 # Stub — lança erro (auth removida)
│   │   ├── github.ts               # Funções de busca de repos GitHub
│   │   ├── tabnews-api.ts          # Client para TabNews API
│   │   ├── blog-data.tsx           # Helpers de dados do blog
│   │   ├── blog-language-context.tsx
│   │   ├── utils.ts                # Utilitários gerais (cn, etc.)
│   │   └── i18n/
│   │       ├── index.tsx           # Provider + hook useTranslation
│   │       └── locales/
│   │           ├── pt-BR.ts
│   │           └── en.ts
│   │
│   ├── database/
│   │   ├── init.sql                # Schema DDL (tabela users)
│   │   └── sqlite.db               # Arquivo de banco (git-ignored em prod)
│   │
│   ├── domain/
│   │   └── cv/index.ts             # Definições de arquivos de CV para download
│   │
│   ├── hooks/
│   │   └── useMetadata.ts          # Hook para metadata de página
│   │
│   ├── interface/                  # Interfaces TypeScript (a expandir)
│   └── stories/                    # Storybook stories
│
├── public/                         # Assets estáticos
├── .storybook/                     # Configuração do Storybook
├── scripts/                        # Scripts auxiliares
├── next.config.ts                  # Configuração do Next.js
├── wrangler.jsonc                  # Cloudflare Pages deploy config
├── vitest.config.ts                # Configuração de testes
├── biome.json                      # Formatter/linter Biome
├── components.json                 # Config shadcn/ui CLI
├── tsconfig.json                   # TypeScript strict config
└── postcss.config.mjs              # PostCSS (Tailwind v4)
```

---

## 4. Getting Started

### Pré-requisitos

- **Node.js** ≥ 22.x
- **pnpm** ≥ 9.x (`npm install -g pnpm`)

### Instalação

```bash
git clone https://github.com/IamThiago-IT/me.git
cd me
pnpm install
```

### Ambiente local

Copie o arquivo de exemplo e preencha as variáveis:

```bash
cp .env.example .env.local
```

### Iniciar em desenvolvimento

```bash
pnpm dev        # Next.js com Turbopack em http://localhost:3000
```

---

## 5. Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `RESEND_API_KEY` | ✅ | Chave da API Resend para envio de e-mails transacionais |
| `CONTACT_EMAIL` | ✅ | E-mail de destino para propostas recebidas |

> Nenhuma variável de banco de dados é necessária em produção — o SQLite é local e o schema está preparado para uso futuro.

**`.env.example`:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=your-email@example.com
```

---

## 6. Workflow de Desenvolvimento

### Scripts disponíveis

```bash
pnpm dev              # Dev server com Turbopack (HMR rápido)
pnpm build            # Build de produção
pnpm start            # Serve o build de produção
pnpm lint             # ESLint
pnpm biome            # Biome check (format + lint)
pnpm test             # Vitest (modo watch)
pnpm test:ui          # Vitest com UI interativa
pnpm test:coverage    # Relatório de cobertura (v8)
pnpm test:watch       # Watch explícito
pnpm test:browser     # Testes com jsdom
pnpm playwright       # Testes E2E com Playwright
pnpm storybook        # Storybook em http://localhost:6006
pnpm build-storybook  # Build estático do Storybook
pnpm pages:deploy     # Deploy para Cloudflare Pages via Wrangler
```

### Convenções de código

- **Formatter:** Biome (substitui Prettier neste projeto)
- **Linter:** ESLint + regras do Next.js (`next lint`)
- **TypeScript:** Strict mode. Evite `any`; prefira tipos explícitos.
- **Componentes client-side:** Declare `"use client"` explicitamente no topo.
- **Server Actions:** Declare `"use server"` no topo do arquivo ou da função.
- **Imports:** Use aliases `@/` mapeado para `src/` (configurado em `tsconfig.json`).
- **Tradução:** Todo texto visível ao usuário deve usar o hook `useTranslation` do `src/lib/i18n`.

---

## 7. Testes

### Frameworks

| Ferramenta | Uso |
|---|---|
| **Vitest** | Testes unitários e de integração (runner principal) |
| **Playwright** | Testes E2E em browser real |
| **Storybook + Vitest addon** | Testes de componentes visuais |

### Executar

```bash
pnpm test                # Todos os testes (watch)
pnpm test:coverage       # Com relatório de cobertura
pnpm playwright          # E2E
pnpm storybook           # Visual component tests
```

### Estrutura de testes

Os arquivos de teste devem ficar ao lado do módulo testado (`*.test.ts` / `*.spec.ts`) ou na pasta `src/__tests__/`. Testes E2E ficam na raiz em `e2e/` (padrão Playwright).

> ⚠️ A infraestrutura de testes está configurada, mas a cobertura atual é baixa. Priorizar testes para Server Actions e componentes críticos (formulários, contratos).

---

## 8. Referência de API

### `POST /api/send-proposal`

Envia uma proposta comercial por e-mail via Resend.

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | `string` | ✅ | Nome do remetente |
| `email` | `string` | ✅ | E-mail do remetente |
| `subject` | `string` | ✅ | Assunto da proposta |
| `message` | `string` | ✅ | Corpo da mensagem |
| `projectType` | `string` | ❌ | Tipo de projeto |
| `budget` | `string` | ❌ | Faixa de orçamento |

**Respostas:**

| Status | Corpo | Descrição |
|---|---|---|
| `200` | `{ success: true, emailId: string }` | E-mail enviado com sucesso |
| `400` | `{ error: string }` | Validação falhou (Zod) |
| `500` | `{ error: string }` | Erro interno / falha no Resend |

**Exemplo:**
```bash
curl -X POST http://localhost:3000/api/send-proposal \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Lima",
    "email": "ana@empresa.com",
    "subject": "Proposta de site institucional",
    "message": "Olá, gostaria de discutir um projeto.",
    "projectType": "Landing Page",
    "budget": "R$ 3.000 – R$ 6.000"
  }'
```

---

## 9. Server Actions

Todas as actions ficam em `src/app/Actions/` e utilizam a diretiva `"use server"`.

| Action | Arquivo | Descrição |
|---|---|---|
| `sendEmail()` | `emailActions.ts` | Envio genérico de e-mail via Resend |
| `sendProposalEmail()` | `emailActions.ts` | E-mail de proposta formatado em HTML |
| `addService()` | `serverActions.ts` | Cria novo serviço (validado com Zod) |
| `subscribeNewsletter()` | `newsletterActions.ts` | Inscrição na newsletter |
| `createContract()` | `contratos/actions.ts` | Cria contrato com UUID e revalida cache |
| `finalizeContract()` | `contratos/actions.ts` | Assina contrato com timestamp |
| `getFeedbacks()` | `feedbacksActions.ts` | Retorna lista de depoimentos |

> Server Actions chamam diretamente serviços server-side sem precisar de um endpoint HTTP. Erros são propagados via `throw` e capturados no cliente com `try/catch` ou tratados pelo React error boundary.

---

## 10. Integrações Externas

### Resend (e-mail transacional)

- **Docs:** https://resend.com/docs
- **Client:** `src/lib/resend.ts`
- **Dependência:** `RESEND_API_KEY` no ambiente
- **Uso:** Proposta comercial, newsletter
- **E-mail de origem padrão:** `onboarding@resend.dev` (alterar para domínio próprio em produção)

### TabNews API (blog)

- **Docs:** https://www.tabnews.com.br/api/docs
- **Client:** `src/lib/tabnews-api.ts`
- **Sem autenticação** — acesso público
- **Usuário:** `IamThiagoIT`
- **Uso:** Listagem e detalhe de artigos em `/blog`

### GitHub REST API (projetos)

- **Docs:** https://docs.github.com/en/rest
- **Client:** `src/lib/github.ts`
- **Sem autenticação** (rate limit: 60 req/hora por IP)
- **Usuário:** `IamThiago-IT`
- **Uso:** Showcase de repositórios públicos em `/projetos`

### Cal.com (agendamento)

- **Docs:** https://cal.com/docs/enterprise-features/embed
- **Package:** `@calcom/embed-react`
- **Cal link:** `iamthiago/call`
- **Uso:** Widget embarcado na página `/agendar`

---

## 11. Deployment

### Vercel (primário)

O projeto está configurado para deploy automático na Vercel via Git push.

```bash
# Build local equivalente ao da Vercel
pnpm build
```

**Configuração:** `.vercel/project.json`
- **Project ID:** `prj_y61fsTcTAxwlFVdmu9zS4AYBddfv`
- **Node Version:** 22.x
- **Framework preset:** Next.js

As variáveis de ambiente `RESEND_API_KEY` e `CONTACT_EMAIL` devem ser configuradas no dashboard da Vercel (Settings → Environment Variables).

### Cloudflare Pages (alternativo)

```bash
pnpm build
pnpm pages:deploy        # wrangler pages deploy .next
```

**Configuração:** `wrangler.jsonc`

> ⚠️ Cloudflare Pages tem limitações com algumas APIs do Node.js. Testar compatibilidade antes de migrar definitivamente.

---

## 12. Decisões de Arquitetura (ADRs)

### ADR-001 — Next.js App Router com RSC

**Decisão:** Usar App Router e React Server Components como padrão.  
**Motivo:** Menor bundle client-side, streaming nativo, suporte a Server Actions sem boilerplate de API. Páginas predominantemente leitura (blog, projetos, about) se beneficiam de RSC.  
**Consequência:** A maioria das páginas usa `"use client"` para interatividade — revisitar e converter para RSC onde possível.

### ADR-002 — i18n customizado (sem next-intl / i18next)

**Decisão:** Context API + arquivos de locales em `src/lib/i18n/`.  
**Motivo:** Simplicidade. Apenas 2 idiomas (PT-BR, EN), sem necessidade de roteamento por locale ou carregamento lazy de traduções.  
**Consequência:** Escalabilidade limitada. Se o número de idiomas crescer, migrar para `next-intl`.

### ADR-003 — Remoção da autenticação (Better Auth)

**Decisão:** Autenticação foi removida. `src/lib/auth.ts` lança erro se chamado.  
**Motivo:** Não há área protegida no momento. O schema SQLite e o stub ficam como preparação para reintrodução futura.  
**Consequência:** Nenhuma rota é protegida. O SQLite está pronto para ativação quando necessário.

### ADR-004 — Server Actions para mutações

**Decisão:** Mutações (envio de e-mail, contratos, newsletter) usam Server Actions em vez de rotas de API dedicadas.  
**Motivo:** Menos boilerplate, colocação de lógica junto ao feature, integração nativa com formulários React.  
**Exceção:** `/api/send-proposal` mantido como REST endpoint para permitir chamadas externas (ex: integrações de terceiros, Postman, Zapier).

### ADR-005 — Sem gerenciador de estado global

**Decisão:** Apenas React hooks locais e Context API para estado compartilhado (tema, i18n, blog language).  
**Motivo:** Aplicação sem estado complexo entre features. Redux/Zustand seria over-engineering.

### ADR-006 — Biome como formatter principal

**Decisão:** Biome substitui Prettier; ESLint mantido para regras Next.js.  
**Motivo:** Biome é significativamente mais rápido, consolida formatação e linting em uma ferramenta.

---

## 13. Limitações e Trabalho Futuro

### Limitações conhecidas

| Item | Detalhe |
|---|---|
| **Dados hardcoded** | Conteúdo de skills, serviços, papers e feedbacks está em código, não em CMS/DB |
| **GitHub API sem auth** | Rate limit de 60 req/hora por IP; pode falhar sob carga |
| **Blog dependente do TabNews** | Qualquer downtime do TabNews derruba o blog |
| **Testes ausentes** | Infraestrutura configurada, mas sem testes escritos |
| **Auth removida** | Nenhuma área privada/administrativa disponível |
| **SQLite em disco** | Não persiste entre deployments serverless; adequado apenas para local |
| **E-mail de origem** | Usa `onboarding@resend.dev` (sandbox Resend); requer domínio próprio verificado para produção |

### Trabalho futuro sugerido

- [ ] Adicionar testes unitários para Server Actions e componentes críticos
- [ ] Migrar conteúdo estático (skills, services) para um CMS headless ou SQLite gerenciado
- [ ] Reativar autenticação para área administrativa (gestão de contratos, feedbacks)
- [ ] Verificar domínio próprio no Resend e remover sandbox
- [ ] Adicionar cache no GitHub API fetch (`revalidate` ou `unstable_cache`)
- [ ] Implementar CI/CD com GitHub Actions (lint + test + deploy preview)
- [ ] Converter páginas client-only para RSC onde não há interatividade necessária
- [ ] Adicionar OpenGraph / Twitter Card metadata dinâmica por página
