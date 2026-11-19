# ADR 006: Biome e ESLint para qualidade de código

* **Status:** Em revisão
* **Data:** Novembro de 2026
* **Contexto Técnico:** Formatação, lint e verificações estáticas

## 1. Contexto e Problema

O projeto mantém Biome e ESLint como ferramentas de qualidade. O `package.json` declara Biome 1.9.4 e ESLint 9, além de scripts para ambas as ferramentas. A configuração existente precisa permanecer compatível com as versões instaladas e incluir os arquivos da aplicação nas verificações.

## 2. Decisão Arquitetural

Registrar a intenção atual de usar Biome para formatação/verificações compatíveis e ESLint para regras específicas do projeto/Next.js. Esta decisão está **Em revisão** até que os comandos, configurações e execução automatizada estejam validados; não presumir que as ferramentas já funcionem corretamente.

## 3. Alternativas Consideradas

* **Usar somente ESLint e uma ferramenta separada de formatação:** oferece composição familiar, mas mantém múltiplas ferramentas para responsabilidades potencialmente compartilhadas.
* **Usar somente Biome:** simplifica a cadeia de ferramentas, mas pode não substituir todas as regras e integrações ESLint requeridas pelo projeto.

## 4. Consequências e Métricas (Trade-offs)

* **Positivas:** separa formatação e regras específicas de lint sem exigir uma migração imediata para uma única ferramenta.
* **Negativas:** manter duas ferramentas requer delimitar responsabilidades para evitar regras conflitantes e duplicadas.
* **Condição de validade:** scripts e configurações devem executar sobre o código de aplicação, passar localmente e ser aplicados pela CI. A Issue [#12](https://github.com/IamThiago-IT/me/issues/12) acompanha a correção do tooling e da pipeline.
* **Métricas:** não há baseline de duração ou cobertura de lint validado; evitar afirmar ganhos de velocidade sem medição.

## Referências

* `package.json`
* `biome.json`
* `eslint.config.js`
* [Issue #12 — lint, Biome e CI](https://github.com/IamThiago-IT/me/issues/12)
