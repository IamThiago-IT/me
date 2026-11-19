# ADR 005: Estado compartilhado com hooks locais e Context API

* **Status:** Aceito
* **Data:** Novembro de 2026
* **Contexto Técnico:** Estado de interface em componentes React

## 1. Contexto e Problema

As páginas e componentes precisam manter estado local de interface e compartilhar algumas preferências entre componentes. O projeto não declara uma biblioteca dedicada de gerenciamento global de estado.

## 2. Decisão Arquitetural

Usar hooks React para estado local e Context API apenas quando o estado precisar ser compartilhado entre uma parte da árvore de componentes, como idioma ou contexto de leitura do blog.

## 3. Alternativas Consideradas

* **Adicionar Redux ou Zustand como padrão global:** introduziria dependência e um modelo adicional de estado sem requisito de sincronização global complexa demonstrado no projeto atual.
* **Manter todo estado em um contexto único:** aumentaria o acoplamento entre funcionalidades e poderia propagar atualizações além dos consumidores necessários.

## 4. Consequências e Métricas (Trade-offs)

* **Positivas:** mantém estado próximo dos componentes que o utilizam e evita uma dependência global enquanto o escopo do estado compartilhado for pequeno.
* **Negativas:** cada contexto deve ter limites claros; Context não substitui estado de servidor, cache de dados ou uma estratégia de sincronização entre múltiplas funcionalidades.
* **Métricas:** não há medições de re-renderização ou complexidade registradas; reavaliar se surgirem necessidades de sincronização e cache transversais.

## Referências

* `src/lib/i18n/index.tsx`
* `src/lib/blog-language-context.tsx`
* `package.json`
