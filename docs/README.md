# Documentação

Guias técnicos do projeto. O [README principal](../README.md) contém a apresentação e o início rápido.

## Guias

| Documento | Para quem / quando |
|---|---|
| [Arquitetura](architecture.md) | Entender stack, limites entre cliente e servidor e organização |
| [Desenvolvimento](development.md) | Configurar o ambiente, executar scripts e conhecer o estado dos testes |
| [Integrações](integrations.md) | Consultar APIs externas e o endpoint de propostas |
| [Deploy](deployment.md) | Gerar o build e revisar as opções de publicação |
| [ADRs](adr/) | Consultar decisões, alternativas e trade-offs arquiteturais |

## Decisões arquiteturais

| ADR | Assunto | Status |
|---|---|---|
| [001](adr/001-nextjs-app-router-com-rsc.md) | Next.js App Router e React Server Components | Aceito |
| [002](adr/002-i18n-com-context-api.md) | Internacionalização com Context API | Aceito |
| [003](adr/003-autenticacao-removida.md) | Autenticação removida | Em revisão |
| [004](adr/004-server-actions-para-mutacoes.md) | Server Actions para mutações | Aceito |
| [005](adr/005-estado-compartilhado-com-hooks-e-context.md) | Hooks e Context API para estado | Aceito |
| [006](adr/006-biome-e-eslint-para-qualidade-de-codigo.md) | Biome e ESLint | Em revisão |
