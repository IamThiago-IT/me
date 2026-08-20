import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // ─── Timeline Entries ────────────────────────────────────────
  const entry1 = await prisma.timelineEntry.create({
    data: {
      type: "education",
      title: "Técnico em Informática para Internet",
      company: "SENAI",
      companyUrl: "https://www.portaldaindustria.com.br/senai/",
      period: "2019 - 2020",
      description: "Curso técnico focado em desenvolvimento de aplicações web e manutenção de sistemas.",
      skills: JSON.stringify(["HTML", "CSS", "JavaScript", "PHP", "MySQL"]),
      order: 0,
      projects: {
        create: [
          {
            name: "Cella - Sistema de Gerenciamento de Almoxarifado",
            description: "Desenvolvimento de um sistema completo para gerenciamento de almoxarifado, incluindo cadastro de produtos, controle de estoque e geração de relatórios.",
            link: "https://github.com/IamThiago-IT/cella",
          },
        ],
      },
    },
  });

  const entry2 = await prisma.timelineEntry.create({
    data: {
      type: "education",
      title: "Análise e Desenvolvimento de Sistemas",
      company: "Universidade Federal do Paraná (UFPR)",
      companyUrl: "https://universidadetech.edu",
      period: "2021 - 2024",
      description: "Foco em desenvolvimento de software, algoritmos e estruturas de dados.",
      skills: JSON.stringify(["Algoritmos", "Java", "Estruturas de Dados", "Banco de Dados"]),
      order: 1,
      projects: {
        create: [
          {
            name: "Sistema de Recomendação de Filmes",
            description: "Projeto de conclusão de curso utilizando aprendizado de máquina para recomendações personalizadas.",
            link: "https://github.com/IamThiago-IT/movie-recommender",
          },
        ],
      },
    },
  });

  const entry3 = await prisma.timelineEntry.create({
    data: {
      type: "experience",
      title: "Desenvolvedor Front-end",
      company: "WebSolutions",
      companyUrl: "https://websolutions.com",
      period: "Mar 2020 - Dez 2021",
      description: "Criação de interfaces responsivas e acessíveis para aplicações web de alto tráfego.",
      skills: JSON.stringify(["JavaScript", "React", "CSS", "Acessibilidade Web"]),
      order: 2,
      projects: {
        create: [
          {
            name: "Redesign do Portal de Notícias",
            description: "Liderou o redesign completo do portal, melhorando o tempo de carregamento em 60%.",
            link: "https://github.com/IamThiago-IT/news-portal-redesign",
          },
        ],
      },
    },
  });

  const entry4 = await prisma.timelineEntry.create({
    data: {
      type: "experience",
      title: "Desenvolvedor Full Stack Senior",
      company: "TechCorp",
      companyUrl: "https://techcorp.com",
      period: "Jan 2022 - Presente",
      description: "Liderando o desenvolvimento de aplicações web escaláveis, implementando arquiteturas modernas e mentorando desenvolvedores juniores.",
      skills: JSON.stringify(["React", "Node.js", "AWS", "GraphQL", "Liderança Técnica"]),
      order: 3,
      projects: {
        create: [
          {
            name: "Sistema de Gerenciamento de Clientes",
            description: "Desenvolveu um sistema completo para gerenciamento de clientes, aumentando a eficiência em 40%.",
            link: "https://github.com/IamThiago-IT/customer-management",
          },
        ],
      },
    },
  });

  const entry5 = await prisma.timelineEntry.create({
    data: {
      type: "education",
      title: "Mestrado em Computação Aplicada",
      company: "Universidade Tecnológica Federal do Paraná (UTFPR)",
      companyUrl: "https://utfpr.edu.br",
      period: "2024 - 2026",
      description: "Pesquisa em inteligência artificial e aprendizado de máquina.",
      skills: JSON.stringify(["Inteligência Artificial", "Aprendizado de Máquina", "Python", "Pesquisa"]),
      order: 4,
      projects: {
        create: [
          {
            name: "Sistema de Diagnóstico Médico",
            description: "Desenvolvimento de um sistema de diagnóstico médico utilizando redes neurais.",
            link: "https://github.com/IamThiago-IT/medical-diagnosis-system",
          },
        ],
      },
    },
  });

  const entry6 = await prisma.timelineEntry.create({
    data: {
      type: "education",
      title: "Doutorado em Ciência da Computação",
      company: "Universidade Federal do Paraná (UFPR)",
      companyUrl: "https://universidadetech.edu",
      period: "2026 - 2030",
      description: "Pesquisa avançada em inteligência artificial e aprendizado profundo.",
      skills: JSON.stringify(["Inteligência Artificial", "Aprendizado Profundo", "Python", "Pesquisa Avançada"]),
      order: 5,
      projects: {
        create: [
          {
            name: "Sistema de Previsão de Doenças",
            description: "Desenvolvimento de um sistema de previsão de doenças utilizando aprendizado profundo.",
            link: "https://github.com/IamThiago-IT/disease-prediction-system",
          },
        ],
      },
    },
  });

  // ─── Feedbacks ───────────────────────────────────────────────
  await prisma.feedback.createMany({
    data: [
      { name: "João Silva", company: "Tech Solutions", project: "E-commerce Platform", category: "Web Development", rating: 5, comment: "Excelente trabalho! Entregou o projeto antes do prazo e com qualidade excepcional. A comunicação foi clara durante todo o processo.", image: "/placeholder.svg?height=80&width=80", date: "Março 2026" },
      { name: "Maria Santos", company: "Digital Agency", project: "Website Redesign", category: "Design", rating: 5, comment: "Muito profissional e atencioso. Compreendeu perfeitamente nossas necessidades e superou as expectativas.", image: "/placeholder.svg?height=80&width=80", date: "Fevereiro 2026" },
      { name: "Carlos Oliveira", company: "StartUp XY", project: "Mobile App", category: "Mobile", rating: 5, comment: "Desenvolvimento impecável. O aplicativo ficou exatamente como imaginávamos, com performance excelente.", image: "/placeholder.svg?height=80&width=80", date: "Janeiro 2026" },
      { name: "Ana Costa", company: "E-commerce Hub", project: "API Integration", category: "Backend", rating: 5, comment: "Resolveu nosso problema de integração em tempo recorde. Muito competente e dedicado ao projeto.", image: "/placeholder.svg?height=80&width=80", date: "Dezembro 2025" },
      { name: "Roberto Martins", company: "Corporate Finance", project: "Dashboard Analytics", category: "Data Visualization", rating: 4, comment: "Ótimo dashboard interativo. Atendeu bem aos requisitos, com bom design e funcionalidade.", image: "/placeholder.svg?height=80&width=80", date: "Novembro 2025" },
    ],
  });

  // ─── Events ──────────────────────────────────────────────────
  await prisma.event.createMany({
    data: [
      { title: "React Performance Optimization Workshop", description: "Learn advanced techniques to optimize React applications for production. We'll cover code splitting, lazy loading, memoization, and profiling tools.", date: "2024-04-15", time: "18:00", location: "São Paulo, Brazil", type: "workshop", tags: JSON.stringify(["react", "performance", "frontend"]), url: "#", isUpcoming: true },
      { title: "Full-Stack Development Talk", description: "Deep dive into modern full-stack development with Next.js and TypeScript. Discover best practices for building scalable applications.", date: "2024-05-20", time: "19:30", location: "Online", type: "palestra", tags: JSON.stringify(["nextjs", "typescript", "fullstack"]), url: "#", isUpcoming: true },
      { title: "Web Performance & Core Web Vitals", description: "Understand Google's Core Web Vitals and learn how to measure and improve your website's performance metrics effectively.", date: "2024-06-10", time: "14:00", location: "Virtual Event", type: "webinar", tags: JSON.stringify(["performance", "seo", "web"]), url: "#", isUpcoming: true },
      { title: "TypeScript Advanced Patterns", description: "Master advanced TypeScript patterns including generics, utility types, and type guards. Build more robust and maintainable applications.", date: "2025-02-10", time: "20:00", location: "Online", type: "workshop", tags: JSON.stringify(["typescript", "backend", "advanced"]), url: "#", isUpcoming: true },
      { title: "Node.js Security Best Practices", description: "Learn how to secure your Node.js applications against common vulnerabilities. We'll cover authentication, authorization, and data protection.", date: "2025-03-15", time: "19:00", location: "São Paulo, Brazil", type: "palestra", tags: JSON.stringify(["nodejs", "security", "backend"]), url: "#", isUpcoming: true },
      { title: "Database Design & Optimization", description: "Learn how to design efficient databases and optimize queries. Cover relational and NoSQL databases with real-world examples.", date: "2025-04-20", time: "18:30", location: "Online", type: "conferência", tags: JSON.stringify(["database", "sql", "backend"]), url: "#", isUpcoming: true },
      { title: "React 19 & Server Components Deep Dive", description: "Explore the new features in React 19 and server components. Learn how to build more efficient and interactive applications.", date: "2026-01-25", time: "19:30", location: "São Paulo, Brazil", type: "workshop", tags: JSON.stringify(["react", "frontend", "nextjs"]), url: "#", isUpcoming: true },
      { title: "Microservices Architecture", description: "Build scalable applications using microservices architecture. Learn about service discovery, load balancing, and communication patterns.", date: "2026-03-10", time: "20:00", location: "Virtual Event", type: "conferência", tags: JSON.stringify(["architecture", "backend", "devops"]), url: "#", isUpcoming: true },
    ],
  });

  // ─── Sponsors ────────────────────────────────────────────────
  const sponsor1 = await prisma.sponsor.create({
    data: {
      name: "Empresa X", description: "Líder em soluções tecnológicas para empresas de todos os portes.", logo: "/public/globe.svg", tag: "Tecnologia", link: "https://empresax.com",
    },
  });
  const sponsor2 = await prisma.sponsor.create({
    data: {
      name: "Empresa Y", description: "Especialista em marketing digital e estratégias de crescimento.", logo: "/public/next.svg", tag: "Marketing", link: "https://empresay.com",
    },
  });
  await prisma.sponsor.create({
    data: {
      name: "Empresa Z", description: "Inovação em produtos sustentáveis para um futuro melhor.", logo: null, tag: "Sustentabilidade", link: "https://empresaz.com",
    },
  });

  await prisma.discountCode.createMany({
    data: [
      { code: "DESCONTO10", description: "10% off em compras acima de R$100", sponsorId: sponsor1.id },
      { code: "FRETEGRATIS", description: "Frete grátis no primeiro pedido", sponsorId: sponsor2.id },
    ],
  });

  // ─── Contract Templates ──────────────────────────────────────
  await prisma.contractTemplate.createMany({
    data: [
      { name: "Desenvolvimento Web", projectName: "Desenvolvimento de Aplicação Web", projectDescription: "Desenvolvimento completo de aplicação web com front-end reativo (React/Vue), back-end robusto (Node.js/Python), banco de dados otimizado (PostgreSQL), testes automatizados, documentação técnica e deploy em ambiente de produção.", value: "5000", paymentTerms: "50% entrada, 50% na entrega", warranty: "30", supportMonths: "3" },
      { name: "Aplicativo Mobile", projectName: "Desenvolvimento de Aplicativo Mobile", projectDescription: "Desenvolvimento de aplicativo mobile nativo para iOS e Android com integração de APIs REST, notificações push, sincronização em tempo real, sistema de autenticação seguro, mapas e geolocalização.", value: "8000", paymentTerms: "30% entrada, 30% meio do projeto, 40% conclusão", warranty: "30", supportMonths: "6" },
      { name: "Consultoria Tech", projectName: "Consultoria de Arquitetura de Software", projectDescription: "Consultoria especializada em arquitetura de software, otimização de performance, segurança, escalabilidade de sistemas, code review, setup de CI/CD e melhorias de infraestrutura.", value: "3000", paymentTerms: "100% à vista", warranty: "0", supportMonths: "1" },
    ],
  });

  // ─── Payment Methods ─────────────────────────────────────────
  await prisma.paymentMethod.createMany({
    data: [
      { namePt: "Pix", nameEn: "Pix", descriptionPt: "Transferências instantâneas disponíveis 24 horas por dia, 7 dias por semana. O método mais rápido e prático do Brasil.", descriptionEn: "Instant transfers available 24 hours a day, 7 days a week. The fastest and most practical payment method in Brazil.", benefitsPt: "Pagamento instantâneo | Disponível 24/7 | Sem taxas adicionais | Confirmação na hora", benefitsEn: "Instant payment | Available 24/7 | No additional fees | Real-time confirmation", order: 0 },
      { namePt: "Cartão de Crédito/Débito", nameEn: "Credit/Debit Card", descriptionPt: "Parcelamento em até 12x com as principais bandeiras. Processamento seguro e rápido.", descriptionEn: "Installments up to 12x with major card brands. Secure and fast processing.", benefitsPt: "Parcelamento em até 12x | Bandeiras: Visa, Mastercard, Elo, Amex | Ambiente seguro | Aprovação rápida", benefitsEn: "Up to 12 installments | Visa, Mastercard, Elo, Amex | Secure environment | Quick approval", order: 1 },
      { namePt: "Boleto Bancário", nameEn: "Boleto Bancário", descriptionPt: "Pagamento seguro e tradicional com vencimento em até 3 dias úteis. Processamos seu pedido após a confirmação.", descriptionEn: "Secure traditional payment with up to 3 business days maturity. We process your order after confirmation.", benefitsPt: "Vencimento em até 3 dias úteis | Sem necessidade de cadastro | Pagamento em qualquer banco | Segurança tradicional", benefitsEn: "Up to 3 business days to pay | No registration needed | Pay at any bank | Traditional security", order: 2 },
      { namePt: "Transferência Bancária", nameEn: "Bank Transfer", descriptionPt: "Transferência direta para nossa conta. Processamento rápido para TED e transferências entre contas.", descriptionEn: "Direct transfer to our account. Fast processing for TED and interbank transfers.", benefitsPt: "Transferência direta | Processamento ágil | Ideal para grandes valores | Comprovante imediato", benefitsEn: "Direct transfer | Fast processing | Ideal for large amounts | Instant receipt", order: 3 },
      { namePt: "PayPal", nameEn: "PayPal", descriptionPt: "Pagamento internacional seguro com proteção ao comprador. Aceito em mais de 200 países.", descriptionEn: "Secure international payment with buyer protection. Accepted in over 200 countries.", benefitsPt: "Proteção ao comprador | Aceito mundialmente | Pagamento em diversas moedas | Segurança reforçada", benefitsEn: "Buyer protection | Accepted worldwide | Multi-currency payments | Enhanced security", order: 4 },
      { namePt: "Criptomoedas", nameEn: "Cryptocurrencies", descriptionPt: "Pagamento descentralizado e seguro. Aceitamos Bitcoin, Ethereum e USDT.", descriptionEn: "Decentralized and secure payment. We accept Bitcoin, Ethereum, and USDT.", benefitsPt: "Descentralizado e seguro | Bitcoin, Ethereum e USDT | Transações internacionais | Taxas reduzidas", benefitsEn: "Decentralized & secure | Bitcoin, Ethereum, USDT | International transactions | Low fees", order: 5 },
    ],
  });

  // ─── Skills ──────────────────────────────────────────────────
  await prisma.skill.createMany({
    data: [
      { name: "React", icon: "SiReact", order: 0 },
      { name: "Next.js", icon: "SiNextdotjs", order: 1 },
      { name: "Node.js", icon: "SiNodedotjs", order: 2 },
      { name: "TypeScript", icon: "SiTypescript", order: 3 },
      { name: "GraphQL", icon: "SiGraphql", order: 4 },
      { name: "MongoDB", icon: "SiMongodb", order: 5 },
      { name: "PostgreSQL", icon: "SiPostgresql", order: 6 },
    ],
  });

  // ─── Languages ───────────────────────────────────────────────
  await prisma.language.createMany({
    data: [
      { namePt: "Português", nameEn: "Portuguese", levelPt: "Nativo", levelEn: "Native", cefr: "C2", order: 0 },
      { nameEn: "English", namePt: "Inglês", levelEn: "Fluent", levelPt: "Fluente", cefr: "C1", order: 1 },
      { nameEn: "Spanish", namePt: "Espanhol", levelEn: "Intermediate", levelPt: "Intermediário", cefr: "B1", order: 2 },
    ],
  });

  // ─── Cover Letter ────────────────────────────────────────────
  await prisma.coverLetter.create({
    data: {
      contentPt: `Prezado(a) recrutador(a),

Estou escrevendo para expressar meu interesse na vaga anunciada e para apresentar meu currículo. Tenho experiência em desenvolvimento de software, com forte ênfase em qualidade de código e prazos de entrega.

Estou à disposição para discutir como minhas habilidades podem contribuir para o sucesso da empresa.

Atenciosamente,
[Seu Nome]`,
      contentEn: `Dear Recruiter,

I am writing to express my interest in the advertised position and to present my resume. I have experience in software development, with a strong emphasis on code quality and delivery deadlines.

I am available to discuss how my skills can contribute to the company's success.

Best regards,
[Your Name]`,
    },
  });

  // ─── Featured Projects ───────────────────────────────────────
  await prisma.featuredProject.createMany({
    data: [
      {
        name: "Cella - Sistema de Almoxarifado",
        description:
          "Sistema completo de gerenciamento de almoxarifado com controle de estoque, cadastro de produtos e geração de relatórios.",
        link: "https://github.com/IamThiago-IT/cella",
        imageUrl: "/window.svg",
        tags: JSON.stringify(["Sistema Web", "Estoque", "PHP"]),
        order: 0,
      },
      {
        name: "Movie Recommender",
        description:
          "Sistema de recomendação de filmes com aprendizado de máquina e sugestões personalizadas.",
        link: "https://github.com/IamThiago-IT/movie-recommender",
        imageUrl: "/globe.svg",
        tags: JSON.stringify(["Machine Learning", "Python"]),
        order: 1,
      },
      {
        name: "News Portal Redesign",
        description:
          "Redesign completo de portal de notícias com melhoria de 60% no tempo de carregamento.",
        link: "https://github.com/IamThiago-IT/news-portal-redesign",
        imageUrl: "/file.svg",
        tags: JSON.stringify(["Frontend", "Performance"]),
        order: 2,
      },
    ],
  });

  // ─── Services Schema (services) ──────────────────────────────
  const { PrismaClient: ServicesPrismaClient } = await import("./generated/services/client.js");
  const servicesAdapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const servicesPrisma = new ServicesPrismaClient({ adapter: servicesAdapter });

  // Services
  const svcWeb = await servicesPrisma.service.create({
    data: {
      slug: "landing-pages", iconKey: "Laptop", order: 0,
      namePt: "Landing Pages & Sites Institucionais", nameEn: "Landing Pages & Institutional Sites",
      descPt: "Páginas de alta conversão que transformam visitantes em clientes. Design estratégico, copywriting orientado a resultados e performance otimizada para SEO.",
      descEn: "High-conversion pages that turn visitors into customers. Strategic design, results-driven copywriting, and SEO-optimized performance.",
      ctaPt: "Solicitar Orçamento", ctaEn: "Get a Quote",
      deliveryPt: "1-2 semanas", deliveryEn: "1-2 weeks",
      priceFromBrl: "R$ 1.500", priceToBrl: "R$ 4.000",
      priceFromUsd: "$300", priceToUsd: "$800",
      features: {
        create: [
          { order: 0, textPt: "Design responsivo e moderno", textEn: "Responsive & modern design" },
          { order: 1, textPt: "Otimização SEO avançada", textEn: "Advanced SEO optimization" },
          { order: 2, textPt: "Carregamento em menos de 2s", textEn: "Load time under 2s" },
          { order: 3, textPt: "Integração com analytics e CRM", textEn: "Analytics & CRM integration" },
          { order: 4, textPt: "Formulários inteligentes com validação", textEn: "Smart forms with validation" },
        ],
      },
    },
  });

  const svcWebApp = await servicesPrisma.service.create({
    data: {
      slug: "web-applications", iconKey: "Layers", order: 1,
      namePt: "Aplicações Web (SaaS & Dashboards)", nameEn: "Web Applications (SaaS & Dashboards)",
      descPt: "Plataformas robustas e escaláveis para gerenciar operações, automatizar processos e gerar insights. Arquitetura moderna com Next.js, autenticação segura e banco de dados otimizado.",
      descEn: "Robust and scalable platforms to manage operations, automate processes, and generate insights. Modern architecture with Next.js, secure authentication, and optimized databases.",
      ctaPt: "Solicitar Orçamento", ctaEn: "Get a Quote",
      deliveryPt: "4-12 semanas", deliveryEn: "4-12 weeks",
      priceFromBrl: "R$ 8.000", priceToBrl: "R$ 25.000",
      priceFromUsd: "$1,500", priceToUsd: "$5,000",
      features: {
        create: [
          { order: 0, textPt: "Arquitetura escalável e segura", textEn: "Scalable & secure architecture" },
          { order: 1, textPt: "Painéis administrativos completos", textEn: "Complete admin panels" },
          { order: 2, textPt: "Integração com APIs externas", textEn: "External API integrations" },
          { order: 3, textPt: "Autenticação e controle de acesso", textEn: "Authentication & access control" },
          { order: 4, textPt: "Relatórios e dashboards em tempo real", textEn: "Real-time reports & dashboards" },
        ],
      },
    },
  });

  await servicesPrisma.service.create({
    data: {
      slug: "ecommerce", iconKey: "ShoppingCart", order: 2,
      namePt: "E-commerce & Lojas Virtuais", nameEn: "E-commerce & Online Stores",
      descPt: "Lojas online completas com checkout otimizado, gestão de estoque e integração com gateways de pagamento. Foco em conversão e experiência de compra fluida.",
      descEn: "Complete online stores with optimized checkout, inventory management, and payment gateway integration. Focus on conversion and seamless shopping experience.",
      ctaPt: "Solicitar Orçamento", ctaEn: "Get a Quote",
      deliveryPt: "3-6 semanas", deliveryEn: "3-6 weeks",
      priceFromBrl: "R$ 5.000", priceToBrl: "R$ 15.000",
      priceFromUsd: "$1,000", priceToUsd: "$3,000",
      features: {
        create: [
          { order: 0, textPt: "Checkout otimizado para conversão", textEn: "Conversion-optimized checkout" },
          { order: 1, textPt: "Integração com Stripe, Mercado Pago e Pix", textEn: "Stripe, PayPal & crypto integration" },
          { order: 2, textPt: "Gestão de produtos e estoque", textEn: "Product & inventory management" },
          { order: 3, textPt: "Cupons e regras de desconto", textEn: "Coupons & discount rules" },
          { order: 4, textPt: "Painel administrativo intuitivo", textEn: "Intuitive admin dashboard" },
        ],
      },
    },
  });

  await servicesPrisma.service.create({
    data: {
      slug: "apis-backend", iconKey: "Server", order: 3,
      namePt: "APIs & Backend", nameEn: "APIs & Backend",
      descPt: "APIs RESTful e GraphQL robustas, microsserviços e integrações com sistemas legados. Documentação completa, testes automatizados e deploy em cloud.",
      descEn: "Robust RESTful and GraphQL APIs, microservices, and legacy system integrations. Complete documentation, automated testing, and cloud deployment.",
      ctaPt: "Solicitar Orçamento", ctaEn: "Get a Quote",
      deliveryPt: "2-6 semanas", deliveryEn: "2-6 weeks",
      priceFromBrl: "R$ 4.000", priceToBrl: "R$ 12.000",
      priceFromUsd: "$800", priceToUsd: "$2,500",
      features: {
        create: [
          { order: 0, textPt: "APIs RESTful e GraphQL", textEn: "RESTful & GraphQL APIs" },
          { order: 1, textPt: "Documentação com Swagger/OpenAPI", textEn: "Swagger/OpenAPI documentation" },
          { order: 2, textPt: "Testes automatizados", textEn: "Automated testing" },
          { order: 3, textPt: "Deploy em AWS, Vercel ou Cloudflare", textEn: "AWS, Vercel or Cloudflare deployment" },
          { order: 4, textPt: "Monitoramento e logs em tempo real", textEn: "Real-time monitoring & logging" },
        ],
      },
    },
  });

  await servicesPrisma.service.create({
    data: {
      slug: "automation-ai", iconKey: "Bot", order: 4,
      namePt: "Automação & Inteligência Artificial", nameEn: "Automation & Artificial Intelligence",
      descPt: "Chatbots inteligentes, automação de workflows, integração com LLMs e agentes de IA. Reduza custos operacionais e escale seu atendimento com tecnologia de ponta.",
      descEn: "Smart chatbots, workflow automation, LLM integrations, and AI agents. Reduce operational costs and scale your support with cutting-edge technology.",
      ctaPt: "Solicitar Orçamento", ctaEn: "Get a Quote",
      deliveryPt: "2-4 semanas", deliveryEn: "2-4 weeks",
      priceFromBrl: "R$ 3.000", priceToBrl: "R$ 10.000",
      priceFromUsd: "$600", priceToUsd: "$2,000",
      features: {
        create: [
          { order: 0, textPt: "Chatbots com IA generativa", textEn: "Generative AI chatbots" },
          { order: 1, textPt: "Automação de workflows (n8n, Make)", textEn: "Workflow automation (n8n, Make)" },
          { order: 2, textPt: "Integração com OpenAI, Claude e Gemini", textEn: "OpenAI, Claude & Gemini integration" },
          { order: 3, textPt: "Agentes de IA personalizados", textEn: "Custom AI agents" },
          { order: 4, textPt: "Dashboards de métricas e analytics", textEn: "Metrics & analytics dashboards" },
        ],
      },
    },
  });

  await servicesPrisma.service.create({
    data: {
      slug: "consulting", iconKey: "MessageSquareCode", order: 5,
      namePt: "Consultoria Técnica & Mentoring", nameEn: "Technical Consulting & Mentoring",
      descPt: "Code review, arquitetura de software, mentoring para devs e assessoria técnica para startups. Acelere seu time e tome decisões técnicas mais inteligentes.",
      descEn: "Code review, software architecture, mentoring for devs, and technical advisory for startups. Accelerate your team and make smarter technical decisions.",
      ctaPt: "Agendar Sessão", ctaEn: "Book a Session",
      deliveryPt: "Sob demanda", deliveryEn: "On demand",
      priceFromBrl: "R$ 250/hora", priceToBrl: null,
      priceFromUsd: "$50/hour", priceToUsd: null,
      features: {
        create: [
          { order: 0, textPt: "Code review detalhado", textEn: "Detailed code review" },
          { order: 1, textPt: "Arquitetura e design de sistemas", textEn: "Architecture & system design" },
          { order: 2, textPt: "Mentoring individual ou em grupo", textEn: "Individual or group mentoring" },
          { order: 3, textPt: "Assessoria para startups", textEn: "Startup advisory" },
          { order: 4, textPt: "Workshops e treinamentos sob medida", textEn: "Custom workshops & training" },
        ],
      },
    },
  });

  // Process Steps
  await servicesPrisma.processStep.createMany({
    data: [
      { order: 0, iconKey: "Search", titlePt: "Discovery", titleEn: "Discovery", descPt: "Entendo seu negócio, objetivos e público-alvo para definir a melhor estratégia.", descEn: "I understand your business, goals, and target audience to define the best strategy." },
      { order: 1, iconKey: "PencilRuler", titlePt: "Design & Prototipação", titleEn: "Design & Prototyping", descPt: "Crio wireframes e protótipos interativos para validar a experiência antes do desenvolvimento.", descEn: "I create wireframes and interactive prototypes to validate the experience before development." },
      { order: 2, iconKey: "Code2", titlePt: "Desenvolvimento", titleEn: "Development", descPt: "Construo a solução com código limpo, boas práticas e tecnologias modernas.", descEn: "I build the solution with clean code, best practices, and modern technologies." },
      { order: 3, iconKey: "Rocket", titlePt: "Lançamento", titleEn: "Launch", descPt: "Deploy, testes finais e otimização de performance para garantir uma entrega impecável.", descEn: "Deployment, final testing, and performance optimization to ensure a flawless delivery." },
      { order: 4, iconKey: "Headphones", titlePt: "Suporte Contínuo", titleEn: "Ongoing Support", descPt: "Acompanhamento pós-lançamento, manutenção e melhorias iterativas.", descEn: "Post-launch monitoring, maintenance, and iterative improvements." },
    ],
  });

  // FAQ Items
  await servicesPrisma.faqItem.createMany({
    data: [
      { order: 0, questionPt: "Qual o prazo médio de entrega?", questionEn: "What is the average delivery time?", answerPt: "Depende da complexidade do projeto. Landing pages levam de 1 a 2 semanas. Aplicações web completas podem levar de 4 a 12 semanas. Sempre defino prazos claros no início do projeto.", answerEn: "It depends on the project complexity. Landing pages take 1-2 weeks. Full web applications can take 4-12 weeks. I always define clear timelines at the start of the project." },
      { order: 1, questionPt: "Como funciona o pagamento?", questionEn: "How does payment work?", answerPt: "Trabalho com 40% na aprovação do projeto e 60% na entrega final. Aceito Pix, transferência bancária, cartão de crédito (via plataforma) e criptomoedas. Para projetos maiores, posso parcelar.", answerEn: "I work with 40% upfront upon project approval and 60% upon final delivery. I accept Pix, bank transfer, credit card (via platform), and cryptocurrencies. For larger projects, installment plans are available." },
      { order: 2, questionPt: "O que está incluído no orçamento?", questionEn: "What is included in the quote?", answerPt: "Design responsivo, desenvolvimento completo, testes, deploy inicial, otimização de SEO e performance, e 30 dias de suporte pós-lançamento. Hospedagem e domínios são contratados separadamente.", answerEn: "Responsive design, full development, testing, initial deployment, SEO and performance optimization, and 30 days of post-launch support. Hosting and domains are contracted separately." },
      { order: 3, questionPt: "Vocês trabalham com contratos de manutenção?", questionEn: "Do you offer maintenance contracts?", answerPt: "Sim! Ofereço planos mensais de manutenção que incluem atualizações de segurança, backups, monitoramento de uptime e horas dedicadas para melhorias. Valores a partir de R$ 500/mês.", answerEn: "Yes! I offer monthly maintenance plans that include security updates, backups, uptime monitoring, and dedicated hours for improvements. Plans starting at $100/month." },
      { order: 4, questionPt: "Posso solicitar alterações durante o projeto?", questionEn: "Can I request changes during the project?", answerPt: "Claro! Trabalho com metodologia ágil e incluo rodadas de revisão em cada fase. Alterações fora do escopo original são orçadas separadamente com transparência.", answerEn: "Absolutely! I work with agile methodology and include review rounds at each phase. Changes outside the original scope are quoted separately with full transparency." },
      { order: 5, questionPt: "Vocês atendem clientes internacionais?", questionEn: "Do you work with international clients?", answerPt: "Sim! Atendo clientes do Brasil e do exterior. Para projetos internacionais, os valores são cotados em USD e o pagamento pode ser via PayPal, Wise ou criptomoedas.", answerEn: "Yes! I serve clients from Brazil and abroad. For international projects, values are quoted in USD and payment can be via PayPal, Wise, or cryptocurrencies." },
    ],
  });

  await servicesPrisma.$disconnect();

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
