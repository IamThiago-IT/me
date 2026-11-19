# ADR 002: Internacionalização com Context API customizada

* **Status:** Aceito
* **Data:** Novembro de 2026
* **Contexto Técnico:** Internacionalização do cliente e seleção de idioma

## 1. Contexto e Problema

O portfólio apresenta conteúdo em português brasileiro e inglês. O projeto mantém traduções em arquivos locais e oferece troca de idioma pela interface; não há necessidade atualmente documentada de rotas por idioma.

## 2. Decisão Arquitetural

Manter a solução de i18n baseada em React Context e dicionários TypeScript em `src/lib/i18n/locales/`. O idioma inicial é `pt-BR`; a preferência selecionada é persistida no `localStorage` do navegador.

## 3. Alternativas Consideradas

* **Adotar uma biblioteca de i18n:** poderia oferecer recursos integrados para roteamento, carregamento de catálogos e pluralização, mas adicionaria dependência e migração sem requisito atual que as exija.
* **Duplicar páginas ou conteúdo por idioma:** aumenta a manutenção e pode deixar as traduções inconsistentes.

## 4. Consequências e Métricas (Trade-offs)

* **Positivas:** mantém os catálogos junto ao código, com tipos derivados e uma interface de tradução compartilhada.
* **Negativas:** a preferência está no navegador, então não determina a língua da URL e não está disponível na renderização inicial do servidor; novos idiomas exigem atualizar os catálogos e tipos.
* **Métricas:** não há metas quantitativas associadas à escolha.
* **Revisão:** reavaliar esta decisão se o projeto precisar de URLs indexáveis por idioma, resolução server-side do locale, pluralização avançada ou carregamento seletivo de catálogos.

## Referências

* `src/lib/i18n/index.tsx`
* `src/lib/i18n/locales/pt-BR.ts`
* `src/lib/i18n/locales/en.ts`
