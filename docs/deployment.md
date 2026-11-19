# Deploy

## Build local

```bash
pnpm build
pnpm start
```

O build de produção usa `next build`. O script `vercel-build` também gera os clients Prisma, executa `prisma migrate deploy` para os schemas configurados e então constrói a aplicação; portanto, ele depende de uma `DATABASE_URL` válida para executar migrações.

## Vercel

O repositório inclui o script `vercel-build` em `package.json`. Configure no ambiente de deploy as variáveis necessárias aos serviços ativados, como `RESEND_API_KEY`, `CONTACT_EMAIL` e, se as migrações forem executadas, `DATABASE_URL`.

Confirme o comando de build e as variáveis no projeto Vercel antes do deploy. Não há neste guia garantia sobre a configuração externa da conta.

## Cloudflare Pages

O script disponível é:

```bash
pnpm pages:deploy
```

Ele executa `wrangler pages deploy .next`. A configuração ativa versionada está em `wrangler.toml` e habilita `nodejs_compat`; `wrangler.jsonc` está marcado como obsoleto no próprio arquivo.

Valide a compatibilidade do build Next.js e das APIs Node utilizadas no ambiente Cloudflare antes de usar este caminho em produção.
