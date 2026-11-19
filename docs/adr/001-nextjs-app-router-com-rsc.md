# ADR 001: Next.js App Router com React Server Components

* **Status:** Aceito
* **Data:** Novembro de 2026
* **Contexto Técnico:** Framework web, renderização e limites entre servidor e cliente

## 1. Contexto e Problema

O projeto usa Next.js 16 e React 19 com o App Router. A aplicação combina páginas de conteúdo, integrações externas e componentes interativos. É necessário definir onde buscar e renderizar dados e quais partes precisam executar no navegador.

O App Router usa Server Components por padrão, mas várias páginas atuais declaram `"use client"` e carregam dados após a renderização inicial. A decisão arquitetural está aceita, porém sua aplicação nas páginas existentes ainda é inconsistente.

## 2. Decisão Arquitetural

Manter o Next.js App Router e adotar Server Components como padrão para páginas e leitura de dados. Usar Client Components nas partes que dependem de estado, eventos, APIs do navegador ou hooks cliente.

As páginas existentes podem ser migradas incrementalmente, preservando a interatividade por meio de componentes cliente menores. Esta decisão não presume que toda rota possa ser estática; a estratégia de renderização e cache deve ser definida conforme os dados e o comportamento de cada rota.

## 3. Alternativas Consideradas

* **Manter páginas inteiras como Client Components:** preserva a implementação atual, mas leva ao navegador carregamento de dados e lógica que podem ser executados no servidor.
* **Substituir o App Router por uma aplicação client-side separada:** cria uma arquitetura adicional sem benefício demonstrado que justifique sua complexidade para o portfólio atual.

## 4. Consequências e Métricas (Trade-offs)

* **Positivas:** permite buscar dados próximos às fontes no servidor e manter a interatividade em componentes cliente delimitados.
* **Negativas:** exige separar estado/interatividade da composição de páginas e revisar a compatibilidade das dependências com renderização no servidor.
* **Métricas:** não há baseline validado registrado neste ADR. Mudanças de performance devem ser medidas antes e depois; não se presume redução específica de bundle ou tempo de renderização.
* **Divergência conhecida:** `/projetos` e `/blog` são Client Components e fazem carregamento de dados no cliente. A migração incremental e a estratégia de renderização/cache estão relacionadas às Issues [#6](https://github.com/IamThiago-IT/me/issues/6) e [#11](https://github.com/IamThiago-IT/me/issues/11).

## Referências

* [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
* [Next.js: Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)
* [Issue #11 — arquitetura, renderização e performance](https://github.com/IamThiago-IT/me/issues/11)
