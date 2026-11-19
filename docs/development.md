# Desenvolvimento

## Pré-requisitos

- Node.js 22.x
- pnpm 9 ou superior

## Instalação e execução

```bash
pnpm install
pnpm dev
```

O servidor local fica disponível em [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

O arquivo `.env.example` ainda não existe. Não copie um arquivo inexistente; configure apenas as variáveis necessárias para os serviços que for executar. A criação do exemplo está acompanhada pela [Issue #16](https://github.com/IamThiago-IT/me/issues/16).

| Variável | Uso |
|---|---|
| `RESEND_API_KEY` | Chave do Resend, usada pelos fluxos de e-mail |
| `CONTACT_EMAIL` | Destinatário de propostas e notificações; configure explicitamente no ambiente |
| `DATABASE_URL` | Conexão PostgreSQL lida pela configuração do Prisma para operações de banco |

`RESEND_API_KEY` não deve ser compartilhada ou adicionada ao Git. O cliente atual usa uma chave fictícia como fallback; isso não substitui uma chave válida no ambiente. Para desenvolvimento Next.js, use `.env.local`; operações Prisma também carregam `dotenv/config`, então confirme que o CLI recebe `DATABASE_URL`.

## Scripts

| Comando | Descrição |
|---|---|
| `pnpm dev` | Next.js em desenvolvimento com Turbopack |
| `pnpm build` | Build de produção |
| `pnpm start` | Executa o build local |
| `pnpm storybook` | Abre o Storybook |
| `pnpm build-storybook` | Gera o Storybook estático |
| `pnpm db:generate` | Gera os clients Prisma |
| `pnpm db:migrate` | Executa migrações do schema principal |
| `pnpm db:migrate:services` | Executa migrações do schema de serviços |

Os scripts `lint`, `biome`, `test` e `playwright` estão declarados, mas as configurações atuais precisam de revisão antes de serem consideradas verificações confiáveis. Consulte a [Issue #12](https://github.com/IamThiago-IT/me/issues/12).

## Convenções

- Mantenha `"use client"` apenas nos módulos que precisam de estado, eventos ou APIs do navegador.
- Valide entradas no servidor; valores enviados pelo cliente não são confiáveis.
- Use os arquivos em `src/lib/i18n/locales/` para textos traduzidos.
- Registre decisões arquiteturais duradouras em [ADRs](adr/).
