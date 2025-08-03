"use client"

export interface Article {
  id: string
  title: {
    pt: string
    en: string
  }
  excerpt: {
    pt: string
    en: string
  }
  content: {
    pt: string
    en: string
  }
  date: string
  author: {
    pt: string
    en: string
  }
  coverImage: string
  tags: {
    pt: string[]
    en: string[]
  }
}

export const articles: Article[] = [
  {
    id: "introducao-nextjs",
    title: {
      pt: "Introdução ao Next.js: O Framework React para Produção",
      en: "Introduction to Next.js: The React Framework for Production",
    },
    excerpt: {
      pt: "Descubra como o Next.js pode melhorar sua experiência de desenvolvimento React com recursos como renderização do lado do servidor, geração de sites estáticos e muito mais.",
      en: "Discover how Next.js can improve your React development experience with features like server-side rendering, static site generation and much more.",
    },
    content: {
      pt: `
# Introdução ao Next.js: O Framework React para Produção

Next.js é um framework React que oferece uma experiência de desenvolvimento excepcional com todos os recursos que você precisa para produção: renderização híbrida estática e de servidor, suporte a TypeScript, smart bundling, prefetching de rotas e muito mais.

## Por que usar Next.js?

- **Renderização do lado do servidor (SSR)**: Melhora o desempenho e o SEO.
- **Geração de sites estáticos (SSG)**: Cria páginas HTML no momento da compilação para um carregamento mais rápido.
- **Rotas baseadas em arquivos**: Sistema de roteamento intuitivo baseado no sistema de arquivos.
- **Suporte a API Routes**: Crie facilmente endpoints de API dentro do seu aplicativo Next.js.
- **Otimização de imagens**: Componente Image integrado para otimização automática de imagens.

## Começando com Next.js

Para começar um novo projeto Next.js, você pode usar o seguinte comando:

\`\`\`bash
npx create-next-app@latest meu-projeto
cd meu-projeto
npm run dev
\`\`\`

Isso criará um novo projeto Next.js com uma estrutura básica e iniciará o servidor de desenvolvimento.

## Conclusão

Next.js é uma excelente escolha para desenvolvedores React que desejam criar aplicativos web modernos e de alto desempenho. Com sua combinação de recursos poderosos e experiência de desenvolvimento simplificada, não é de admirar que tantas empresas estejam adotando o Next.js para seus projetos.
      `,
      en: `
# Introduction to Next.js: The React Framework for Production

Next.js is a React framework that provides an exceptional development experience with all the features you need for production: hybrid static and server rendering, TypeScript support, smart bundling, route prefetching, and much more.

## Why use Next.js?

- **Server-side rendering (SSR)**: Improves performance and SEO.
- **Static site generation (SSG)**: Creates HTML pages at build time for faster loading.
- **File-based routing**: Intuitive routing system based on the file system.
- **API Routes support**: Easily create API endpoints within your Next.js application.
- **Image optimization**: Built-in Image component for automatic image optimization.

## Getting Started with Next.js

To start a new Next.js project, you can use the following command:

\`\`\`bash
npx create-next-app@latest my-project
cd my-project
npm run dev
\`\`\`

This will create a new Next.js project with a basic structure and start the development server.

## Conclusion

Next.js is an excellent choice for React developers who want to create modern, high-performance web applications. With its combination of powerful features and simplified development experience, it's no wonder so many companies are adopting Next.js for their projects.
      `,
    },
    date: "2023-05-15",
    author: {
      pt: "Thiago Desenvolvedor",
      en: "Thiago Developer",
    },
    coverImage: "/placeholder.svg?height=400&width=800",
    tags: {
      pt: ["Next.js", "React", "JavaScript", "Frontend"],
      en: ["Next.js", "React", "JavaScript", "Frontend"],
    },
  },
  {
    id: "typescript-vs-javascript",
    title: {
      pt: "TypeScript vs JavaScript: Quando e Por Que Usar TypeScript",
      en: "TypeScript vs JavaScript: When and Why to Use TypeScript",
    },
    excerpt: {
      pt: "Uma análise comparativa entre TypeScript e JavaScript, explorando os benefícios da tipagem estática e quando faz sentido adotar TypeScript em seus projetos.",
      en: "A comparative analysis between TypeScript and JavaScript, exploring the benefits of static typing and when it makes sense to adopt TypeScript in your projects.",
    },
    content: {
      pt: `
# TypeScript vs JavaScript: Quando e Por Que Usar TypeScript

TypeScript é um superset de JavaScript que adiciona tipagem estática opcional e outros recursos à linguagem. Neste artigo, vamos explorar as diferenças entre TypeScript e JavaScript e discutir quando faz sentido usar cada um.

## O que é TypeScript?

TypeScript é uma linguagem de programação desenvolvida pela Microsoft que estende JavaScript adicionando tipos estáticos. Isso significa que você pode especificar o tipo de variáveis, parâmetros de função e valores de retorno, o que pode ajudar a capturar erros durante o desenvolvimento, antes mesmo de executar o código.

## Vantagens do TypeScript

### 1. Detecção de erros em tempo de compilação

Com TypeScript, muitos erros que normalmente só seriam descobertos durante a execução em JavaScript podem ser identificados durante a compilação.

### 2. Melhor suporte de IDE

TypeScript oferece um excelente suporte de IDE com recursos como autocompletar mais preciso, refatoração mais segura e navegação de código aprimorada.

## Conclusão

TypeScript não é uma bala de prata, mas oferece benefícios significativos para muitos projetos, especialmente aqueles que crescem em tamanho e complexidade.
      `,
      en: `
# TypeScript vs JavaScript: When and Why to Use TypeScript

TypeScript is a superset of JavaScript that adds optional static typing and other features to the language. In this article, we'll explore the differences between TypeScript and JavaScript and discuss when it makes sense to use each one.

## What is TypeScript?

TypeScript is a programming language developed by Microsoft that extends JavaScript by adding static types. This means you can specify the type of variables, function parameters, and return values, which can help catch errors during development, even before running the code.

## Advantages of TypeScript

### 1. Compile-time error detection

With TypeScript, many errors that would normally only be discovered during runtime in JavaScript can be identified during compilation.

### 2. Better IDE support

TypeScript offers excellent IDE support with features like more accurate autocompletion, safer refactoring, and enhanced code navigation.

## Conclusion

TypeScript is not a silver bullet, but it offers significant benefits for many projects, especially those that grow in size and complexity.
      `,
    },
    date: "2023-06-22",
    author: {
      pt: "Thiago Desenvolvedor",
      en: "Thiago Developer",
    },
    coverImage: "/placeholder.svg?height=400&width=800",
    tags: {
      pt: ["TypeScript", "JavaScript", "Programação", "Frontend"],
      en: ["TypeScript", "JavaScript", "Programming", "Frontend"],
    },
  },
]

export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id)
}

export function getAllArticles(): Article[] {
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
