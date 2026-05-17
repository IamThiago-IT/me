const ptBR = {
	// Navbar
	nav: {
		home: "Início",
		about: "Sobre",
		projects: "Projetos",
		schedule: "Agendar",
		contracts: "Contratos",
		feedbacks: "Feedbacks",
		contact: "Contato",
		papers: "Papers",
		changelog: "Changelog",
		payments: "Pagamentos",
		openMenu: "Abrir menu principal",
	},

	// Home
	home: {
		greeting: "Hello",
		badge: "Desenvolvedor & Criador",
		intro: "Oi, eu sou",
		description:
			"Sou um desenvolvedor Fullstack apaixonado por transformar desafios complexos em soluções elegantes, escaláveis e focadas na experiência do usuário.",
		viewWork: "Ver meu trabalho",
		talkToMe: "Fale comigo",
	},

	// About
	about: {
		title: "Sobre Mim",
		description:
			"Sou um desenvolvedor full-stack com experiência em React, Node.js e TypeScript. Minha paixão é criar aplicações web performáticas e escaláveis.",
		skills: "Habilidades",
		languages: "Idiomas",
		portuguese: "Português",
		english: "Inglês",
		spanish: "Espanhol",
		native: "Nativo",
		fluent: "Fluente",
		intermediate: "Intermediário",
		myJourney: "Minha Trajetória",
		journeyDescription:
			"Conheça mais sobre minha jornada profissional e acadêmica em detalhes.",
		viewTimeline: "Ver Linha do Tempo",
		backToAbout: "Voltar para Sobre Mim",
	},

	// Cover Letter
	coverLetter: {
		title: "Carta de Apresentação",
		copyText: "Copiar texto",
		copied: "Texto copiado!",
		copyError: "Erro ao copiar o texto:",
		content: `Prezado(a) recrutador(a),

Estou escrevendo para expressar meu interesse na vaga anunciada e para apresentar meu currículo. Tenho experiência em desenvolvimento de software, com forte ênfase em qualidade de código e prazos de entrega.

Estou à disposição para discutir como minhas habilidades podem contribuir para o sucesso da empresa.

Atenciosamente,
[Seu Nome]
`,
	},

	// Contact
	contact: {
		title: "Entre em Contato",
		description:
			"Estou sempre aberto a novas oportunidades e colaborações. Envie uma proposta diretamente ou entre em contato pelas redes sociais.",
		socialTitle: "Redes Sociais",
		proposalCta: {
			title: "Enviar uma Proposta",
			description:
				"Tem um projeto em mente? Me envie os detalhes e eu retorno em breve.",
			back: "Voltar para Contato",
		},
		form: {
			title: "Envie uma Proposta",
			subtitle:
				"Preencha o formulário abaixo para me enviar uma proposta de projeto ou contato direto.",
			name: "Nome",
			namePlaceholder: "Seu nome completo",
			email: "Email",
			emailPlaceholder: "seu@email.com",
			subject: "Assunto",
			subjectPlaceholder: "Ex: Proposta de projeto web",
			projectType: "Tipo de Projeto",
			selectProjectType: "Selecione o tipo...",
			projectTypes: {
				website: "Website / Landing Page",
				webapp: "Aplicação Web",
				mobile: "Aplicativo Mobile",
				api: "API / Backend",
				consulting: "Consultoria",
				other: "Outro",
			},
			budget: "Orçamento Estimado",
			selectBudget: "Selecione a faixa...",
			budgetRanges: {
				low: "Menos de R$ 1.000",
				mid: "R$ 1.000 - R$ 5.000",
				high: "R$ 5.000 - R$ 15.000",
				premium: "Acima de R$ 15.000",
				tbd: "A definir",
			},
			message: "Mensagem",
			messagePlaceholder:
				"Descreva seu projeto, necessidades e expectativas...",
			send: "Enviar Proposta",
			sending: "Enviando...",
			successMessage: "Proposta enviada com sucesso! Responderei em breve.",
			errorMessage: "Erro ao enviar a proposta. Tente novamente mais tarde.",
		},
	},

	// Projects
	projects: {
		title: "Meus Projetos",
		searchPlaceholder: "Buscar projetos...",
		filters: "Filtros",
		sortBy: "Ordenar por",
		mostStars: "Mais estrelas",
		nameAZ: "Nome A-Z",
		mostRecent: "Mais recentes",
		language: "Linguagem",
		allLanguages: "Todas as linguagens",
		projectsFound: "projeto(s) encontrado(s)",
		for: "para",
		in: "em",
		noDescription: "Sem descrição",
		viewOnGithub: "Ver no GitHub",
		loading: "Carregando...",
		showMore: "Mostrar mais",
		loadError:
			"Não foi possível carregar os projetos. Por favor, tente novamente mais tarde.",
	},

	// Feedbacks
	feedbacks: {
		title: "Feedbacks e Avaliações",
		description:
			"Conheça as experiências de clientes que trabalharam comigo. Seus feedbacks me ajudam a melhorar continuamente.",
		project: "Projeto",
		avgRating: "Avaliação Média",
		totalFeedbacks: "Total de Clientes",
		fiveStars: "Cinco Estrelas",
		filterByCategory: "Filtrar por Categoria",
		filterByRating: "Filtrar por Avaliação",
		all: "Todos",
		noResults: "Nenhum feedback encontrado com esses filtros.",
		shareFeedback: "Compartilhe sua Experiência",
		feedbackCTA:
			"Trabalhou comigo? Deixe seu feedback e ajude outras pessoas a conhecer meu trabalho!",
		sendFeedback: "Enviar Feedback",
	},

	// Services
	services: {
		title: "Serviços",
		subtitle:
			"Soluções sob medida para transformar ideias em produtos digitais de alto impacto. Do conceito ao lançamento, com foco em performance, escalabilidade e resultados reais.",
		process: {
			title: "Como Trabalho",
			steps: [
				{
					title: "Discovery",
					description:
						"Entendo seu negócio, objetivos e público-alvo para definir a melhor estratégia.",
				},
				{
					title: "Design & Prototipação",
					description:
						"Crio wireframes e protótipos interativos para validar a experiência antes do desenvolvimento.",
				},
				{
					title: "Desenvolvimento",
					description:
						"Construo a solução com código limpo, boas práticas e tecnologias modernas.",
				},
				{
					title: "Lançamento",
					description:
						"Deploy, testes finais e otimização de performance para garantir uma entrega impecável.",
				},
				{
					title: "Suporte Contínuo",
					description:
						"Acompanhamento pós-lançamento, manutenção e melhorias iterativas.",
				},
			],
		},
		faq: {
			title: "Perguntas Frequentes",
			items: [
				{
					question: "Qual o prazo médio de entrega?",
					answer:
						"Depende da complexidade do projeto. Landing pages levam de 1 a 2 semanas. Aplicações web completas podem levar de 4 a 12 semanas. Sempre defino prazos claros no início do projeto.",
				},
				{
					question: "Como funciona o pagamento?",
					answer:
						"Trabalho com 40% na aprovação do projeto e 60% na entrega final. Aceito Pix, transferência bancária, cartão de crédito (via plataforma) e criptomoedas. Para projetos maiores, posso parcelar.",
				},
				{
					question: "O que está incluído no orçamento?",
					answer:
						"Design responsivo, desenvolvimento completo, testes, deploy inicial, otimização de SEO e performance, e 30 dias de suporte pós-lançamento. Hospedagem e domínios são contratados separadamente.",
				},
				{
					question: "Vocês trabalham com contratos de manutenção?",
					answer:
						"Sim! Ofereço planos mensais de manutenção que incluem atualizações de segurança, backups, monitoramento de uptime e horas dedicadas para melhorias. Valores a partir de R$ 500/mês.",
				},
				{
					question: "Posso solicitar alterações durante o projeto?",
					answer:
						"Claro! Trabalho com metodologia ágil e incluo rodadas de revisão em cada fase. Alterações fora do escopo original são orçadas separadamente com transparência.",
				},
				{
					question: "Vocês atendem clientes internacionais?",
					answer:
						"Sim! Atendo clientes do Brasil e do exterior. Para projetos internacionais, os valores são cotados em USD e o pagamento pode ser via PayPal, Wise ou criptomoedas.",
				},
			],
		},
		cta: {
			title: "Pronto para começar seu projeto?",
			description:
				"Vamos conversar sobre sua ideia. A primeira reunião é gratuita e sem compromisso.",
			button: "Agendar Reunião Gratuita",
		},
		items: [
			{
				name: "Landing Pages & Sites Institucionais",
				description:
					"Páginas de alta conversão que transformam visitantes em clientes. Design estratégico, copywriting orientado a resultados e performance otimizada para SEO.",
				priceFrom: "R$ 1.500",
				priceTo: "R$ 4.000",
				features:
					"Design responsivo e moderno | Otimização SEO avançada | Carregamento em menos de 2s | Integração com analytics e CRM | Formulários inteligentes com validação",
				cta: "Solicitar Orçamento",
				delivery: "1-2 semanas",
			},
			{
				name: "Aplicações Web (SaaS & Dashboards)",
				description:
					"Plataformas robustas e escaláveis para gerenciar operações, automatizar processos e gerar insights. Arquitetura moderna com Next.js, autenticação segura e banco de dados otimizado.",
				priceFrom: "R$ 8.000",
				priceTo: "R$ 25.000",
				features:
					"Arquitetura escalável e segura | Painéis administrativos completos | Integração com APIs externas | Autenticação e controle de acesso | Relatórios e dashboards em tempo real",
				cta: "Solicitar Orçamento",
				delivery: "4-12 semanas",
			},
			{
				name: "E-commerce & Lojas Virtuais",
				description:
					"Lojas online completas com checkout otimizado, gestão de estoque e integração com gateways de pagamento. Foco em conversão e experiência de compra fluida.",
				priceFrom: "R$ 5.000",
				priceTo: "R$ 15.000",
				features:
					"Checkout otimizado para conversão | Integração com Stripe, Mercado Pago e Pix | Gestão de produtos e estoque | Cupons e regras de desconto | Painel administrativo intuitivo",
				cta: "Solicitar Orçamento",
				delivery: "3-6 semanas",
			},
			{
				name: "APIs & Backend",
				description:
					"APIs RESTful e GraphQL robustas, microsserviços e integrações com sistemas legados. Documentação completa, testes automatizados e deploy em cloud.",
				priceFrom: "R$ 4.000",
				priceTo: "R$ 12.000",
				features:
					"APIs RESTful e GraphQL | Documentação com Swagger/OpenAPI | Testes automatizados | Deploy em AWS, Vercel ou Cloudflare | Monitoramento e logs em tempo real",
				cta: "Solicitar Orçamento",
				delivery: "2-6 semanas",
			},
			{
				name: "Automação & Inteligência Artificial",
				description:
					"Chatbots inteligentes, automação de workflows, integração com LLMs e agentes de IA. Reduza custos operacionais e escale seu atendimento com tecnologia de ponta.",
				priceFrom: "R$ 3.000",
				priceTo: "R$ 10.000",
				features:
					"Chatbots com IA generativa | Automação de workflows (n8n, Make) | Integração com OpenAI, Claude e Gemini | Agentes de IA personalizados | Dashboards de métricas e analytics",
				cta: "Solicitar Orçamento",
				delivery: "2-4 semanas",
			},
			{
				name: "Consultoria Técnica & Mentoring",
				description:
					"Code review, arquitetura de software, mentoring para devs e assessoria técnica para startups. Acelere seu time e tome decisões técnicas mais inteligentes.",
				priceFrom: "R$ 250/hora",
				priceTo: "",
				features:
					"Code review detalhado | Arquitetura e design de sistemas | Mentoring individual ou em grupo | Assessoria para startups | Workshops e treinamentos sob medida",
				cta: "Agendar Sessão",
				delivery: "Sob demanda",
			},
		],
	},

	// Payments
	payments: {
		title: "Métodos de Pagamento",
		subtitle:
			"Aceitamos diversas formas de pagamento para sua comodidade. Escolha a que melhor se encaixa para você.",
		items: [
			{
				name: "Pix",
				description:
					"Transferências instantâneas disponíveis 24 horas por dia, 7 dias por semana. O método mais rápido e prático do Brasil.",
				benefits:
					"Pagamento instantâneo | Disponível 24/7 | Sem taxas adicionais | Confirmação na hora",
			},
			{
				name: "Cartão de Crédito/Débito",
				description:
					"Parcelamento em até 12x com as principais bandeiras. Processamento seguro e rápido.",
				benefits:
					"Parcelamento em até 12x | Bandeiras: Visa, Mastercard, Elo, Amex | Ambiente seguro | Aprovação rápida",
			},
			{
				name: "Boleto Bancário",
				description:
					"Pagamento seguro e tradicional com vencimento em até 3 dias úteis. Processamos seu pedido após a confirmação.",
				benefits:
					"Vencimento em até 3 dias úteis | Sem necessidade de cadastro | Pagamento em qualquer banco | Segurança tradicional",
			},
			{
				name: "Transferência Bancária",
				description:
					"Transferência direta para nossa conta. Processamento rápido para TED e transferências entre contas.",
				benefits:
					"Transferência direta | Processamento ágil | Ideal para grandes valores | Comprovante imediato",
			},
			{
				name: "PayPal",
				description:
					"Pagamento internacional seguro com proteção ao comprador. Aceito em mais de 200 países.",
				benefits:
					"Proteção ao comprador | Aceito mundialmente | Pagamento em diversas moedas | Segurança reforçada",
			},
			{
				name: "Criptomoedas",
				description:
					"Pagamento descentralizado e seguro. Aceitamos Bitcoin, Ethereum e USDT.",
				benefits:
					"Descentralizado e seguro | Bitcoin, Ethereum e USDT | Transações internacionais | Taxas reduzidas",
			},
		],
	},

	// Sponsors
	sponsors: {
		title: "Patrocinadores",
		visit: "Visitar",
		discountCodes: "Códigos de Descontos",
		codeCopied: "Código copiado: ",
	},

	// Newsletter
	newsletter: {
		title: "Inscreva-se na Newsletter",
		description:
			"Receba as melhores novidades e atualizações diretamente no seu e-mail.",
		emailPlaceholder: "Seu e-mail",
		subscribe: "Inscrever",
	},

	// Blog
	blog: {
		title: "Blog",
		description:
			"Artigos do meu TabNews - compartilhando conhecimento sobre desenvolvimento web e tecnologia.",
		searchPlaceholder: "Buscar artigos...",
		dates: "Datas",
		last7days: "Últimos 7 Dias",
		last30days: "Últimos 30 Dias",
		thisYear: "Este Ano",
		loading: "Carregando artigos...",
		error: "Erro ao carregar artigos do TabNews",
		tryAgain: "Tentar novamente",
		noArticles: "Nenhum artigo encontrado.",
		previous: "Anterior",
		next: "Próxima",
		page: "Página",
		of: "de",
		backToBlog: "Voltar para o blog",
		viewOnTabNews: "Ver no TabNews",
	},

	// Schedule
	schedule: {
		title: "Agendar Reunião",
		selectDateTime: "Selecione Data e Horário",
		selectDescription:
			"Escolha o melhor momento para nossa reunião através do Cal.com",
	},

	// Contracts
	contracts: {
		title: "Contratos",
		newContract: "Novo Contrato",
		templates: "Modelos",
		signed: "Assinados",
		contractInfo: "Informações do Contrato",
		contractInfoDescription: "Preencha os dados para gerar o contrato",
		projectName: "Nome do Projeto",
		projectValue: "Valor do Projeto",
		projectDescription: "Descrição do Projeto",
		previewAndSign: "Visualização e Assinatura",
		previewDescription: "Revise e assine o contrato",
		serviceContract: "Contrato de Prestação de Serviços",
		project: "Projeto",
		value: "Valor",
		description: "Descrição",
		signAndFinish: "Assinar e Finalizar",
		contractTemplates: "Modelos de Contrato",
		selectTemplate: "Selecione um modelo para começar",
		useTemplate: "Usar Modelo",
		signedContracts: "Contratos Assinados",
		signedDescription: "Histórico de contratos finalizados e em andamento",
		completed: "Finalizado",
		inProgress: "Em Andamento",
		contract: "Contrato",
		signedOn: "Assinado em",
		viewContract: "Ver Contrato",
		downloadPdf: "Download PDF",
		noContracts: "Nenhum contrato assinado encontrado.",
		createFirst: 'Crie seu primeiro contrato na aba "Novo Contrato".',
		generateContract: "Gerar Contrato",
		fillInfo: "Preencha as informações para gerar um novo contrato",
		mobileNotice:
			"Estamos trabalhando para adaptar esta página para dispositivos móveis. Por enquanto, acesse pelo seu computador para melhor experiência.",
		templateNames: [
			"Desenvolvimento Web",
			"Consultoria",
			"Manutenção",
			"Desenvolvimento de Software",
			"Desenvolvimento Mobile",
		],
	},

	// CV
	cv: {
		title: "Currículo / Résumé",
		chooseLanguage: "Escolha o idioma • Choose the language",
		note: "Coloque os arquivos PDF em /public como",
	},

	// Setup
	setup: {
		title: "Meu Setup",
		asJson: "Como JSON",
		hardware: "Hardware",
		software: "Software",
	},

	// Not Found
	notFound: {
		title: "404",
		subtitle: "Página Não Encontrada",
		question: "Você está um pouco perdido?",
		devMessage:
			"Se você é um desenvolvedor ou trabalhador: momentos de incerteza acontecem. Recalibre, aprenda algo novo hoje e continue construindo.",
		jobMessage:
			'Para quem busca trabalho e só recebe "não": eu entendo. Já foram',
		attempts:
			'tentativas de candidatura e muitos "nãos" — e ainda assim nunca desisti.',
		encouragement:
			'Persistência, pequenos aprendizados e cuidar da saúde mental fazem a diferença. Um "não" hoje pode ser o passo para um "sim" maior amanhã.',
		backHome: "Voltar para a Home",
		getInTouch: "Entrar em Contato",
	},

	// Papers
	papers: {
		title: "Artigos Científicos",
		description: "Meus artigos e publicações acadêmicas.",
		searchPlaceholder: "Buscar artigos...",
		all: "Todos",
		empty: "Nenhum artigo publicado ainda.",
		noResults: "Nenhum artigo encontrado.",
		viewPaper: "Ver artigo",
		of: "de",
		papersCount: "artigos",
	},

	// Command Dialog
	command: {
		searchPlaceholder: "Digite para buscar páginas...",
		noResults: "Nenhum resultado encontrado.",
		mainPages: "Páginas Principais",
		about: "Sobre",
		interaction: "Interação",
		others: "Outros",
		theme: "Tema",
		toggleTheme: "Alternar Tema",
		home: "Início",
		blog: "Blog",
		projects: "Projetos",
		services: "Serviços",
		aboutMe: "Sobre Mim",
		resume: "Currículo",
		timeline: "Linha do Tempo",
		coverLetter: "Carta de Apresentação",
		contact: "Contato",
		schedule: "Agendar",
		feedbacks: "Feedbacks",
		newsletter: "Newsletter",
		contracts: "Contratos",
		supporters: "Apoiadores",
		setup: "Setup",
		papers: "Artigos Científicos",
		payments: "Pagamentos",
	},

	// Timeline
	timeline: {
		title: "Linha do Tempo",
		mostRecent: "Mais Recentes",
		oldest: "Mais Antigos",
		all: "Todos",
		education: "Escolaridade",
		work: "Trabalho",
		skillsAcquired: "Habilidades Adquiridas:",
		viewProject: "Ver Projeto",
	},

	// Signature Pad
	signaturePad: {
		clear: "Limpar",
		save: "Salvar Assinatura",
		saved: "Assinatura salva:",
	},

	// Events
	events: {
		title: "Eventos",
		description: "Confira os eventos e palestras que estou realizando.",
		learnMore: "Saiba Mais",
		watchLive: "Assistir Ao Vivo",
		register: "Se Registrar",
		date: "Data",
		location: "Local",
		online: "Online",
		type: "Tipo",
		noUpcoming: "Nenhum evento agendado no momento.",
		inviteMe: "Me convide para um evento",
		inviteDescription:
			"Preencha os detalhes do seu evento e me convide para participar. Faço palestras, workshops e outras ações de engajamento.",
		inviteSent: "Convite enviado com sucesso!",
		inviteError: "Erro ao enviar convite. Tente novamente.",
		pleaseSelectDate: "Por favor, selecione uma data para o evento",
		eventDetails: "Detalhes do Evento",
		fillEventInfo: "Preencha as informações do seu evento",
		eventName: "Nome do Evento",
		eventType: "Tipo de Evento",
		organizer: "Responsável Pelo Evento",
		email: "Email",
		phone: "Telefone",
		eventDate: "Data do Evento",
		locationForm: "Local",
		descriptionForm: "Descrição e Detalhes",
		sending: "Enviando...",
		sendInvite: "Enviar Convite",
		cancel: "Cancelar",
		backToEvents: "Voltar aos Eventos",
	},

	// Changelog
	changelog: {
		title: "Changelog",
		description: "Histórico de atualizações e melhorias do projeto",
		loading: "Carregando histórico...",
		error: "Erro ao carregar changelog",
		tryAgain: "Tentar novamente",
		noCommits: "Nenhum commit encontrado",
		typeFeature: "Novo",
		typeFix: "Correção",
		typeDocs: "Documentação",
		typeStyle: "Estilo",
		typeRefactor: "Refatoração",
		typePerf: "Performance",
		typeTest: "Testes",
		typeChore: "Manutenção",
		filterAll: "Todos",
		filterByType: "Filtrar por tipo",
		viewOnGithub: "Ver no GitHub",
		commitHash: "Commit",
		author: "Autor",
		date: "Data",
	},

	// Common
	common: {
		press: "Aperte",
	},
} as const;

export default ptBR;
