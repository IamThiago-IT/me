const es = {
	// Navbar
	nav: {
		home: "Inicio",
		about: "Sobre mí",
		projects: "Proyectos",
		schedule: "Agendar",
		contracts: "Contratos",
		feedbacks: "Comentarios",
		contact: "Contacto",
		papers: "Artículos",
		changelog: "Cambios",
		payments: "Pagos",
		openMenu: "Abrir menú principal",
	},

	// Home
	home: {
		greeting: "Hola",
		badge: "Desarrollador & Creador",
		intro: "Hola, soy",
		description:
			"Soy un desarrollador Fullstack apasionado por transformar desafíos complejos en soluciones elegantes, escalables y centradas en la experiencia del usuario.",
		viewWork: "Ver mi trabajo",
		talkToMe: "Habla conmigo",
	},

	// About
	about: {
		title: "Sobre Mí",
		description:
			"Soy un desarrollador full-stack con experiencia en React, Node.js y TypeScript. Mi pasión es crear aplicaciones web de alto rendimiento y escalables.",
		skills: "Habilidades",
		languages: "Idiomas",
		certificates: "Certificados",
		portuguese: "Portugués",
		english: "Inglés",
		spanish: "Español",
		native: "Nativo",
		fluent: "Fluido",
		intermediate: "Intermedio",
		myJourney: "Mi Trayectoria",
		journeyDescription:
			"Conoce más sobre mi trayectoria profesional y académica en detalle.",
		certificatesDescription:
			"Ve cursos, formaciones y certificaciones que complementan mi trayectoria.",
		viewCertificates: "Ver Certificados",
		viewTimeline: "Ver Línea de Tiempo",
		backToAbout: "Volver a Sobre Mí",
	},

	// Cover Letter
	coverLetter: {
		title: "Carta de Presentación",
		copyText: "Copiar texto",
		copied: "¡Texto copiado!",
		copyError: "Error al copiar el texto:",
	},

	// Contact
	contact: {
		title: "Ponte en Contacto",
		description:
			"Siempre estoy abierto a nuevas oportunidades y colaboraciones. Envía una propuesta directamente o contáctame por redes sociales.",
		socialTitle: "Redes Sociales",
		proposalCta: {
			title: "Enviar una Propuesta",
			description:
				"Tienes un proyecto en mente? Envíame los detalles y te responderé pronto.",
			back: "Volver a Contacto",
		},
		form: {
			title: "Enviar una Propuesta",
			subtitle:
				"Completa el formulario a continuación para enviarme una propuesta de proyecto o contacto directo.",
			name: "Nombre",
			namePlaceholder: "Tu nombre completo",
			email: "Email",
			emailPlaceholder: "tu@email.com",
			subject: "Asunto",
			subjectPlaceholder: "Ej: Propuesta de proyecto web",
			projectType: "Tipo de Proyecto",
			selectProjectType: "Selecciona el tipo...",
			projectTypes: {
				website: "Sitio Web / Landing Page",
				webapp: "Aplicación Web",
				mobile: "Aplicación Móvil",
				api: "API / Backend",
				consulting: "Consultoría",
				other: "Otro",
			},
			budget: "Presupuesto Estimado",
			selectBudget: "Selecciona el rango...",
			budgetRanges: {
				low: "Menos de $200",
				mid: "$200 - $1.000",
				high: "$1.000 - $3.000",
				premium: "Más de $3.000",
				tbd: "A definir",
			},
			message: "Mensaje",
			messagePlaceholder: "Describe tu proyecto, necesidades y expectativas...",
			send: "Enviar Propuesta",
			sending: "Enviando...",
			successMessage: "¡Propuesta enviada con éxito! Te responderé pronto.",
			errorMessage: "Error al enviar la propuesta. Inténtalo de nuevo más tarde.",
		},
	},

	// Projects
	projects: {
		title: "Mis Proyectos",
		description:
			"Explora los proyectos que he desarrollado, desde herramientas y bibliotecas hasta aplicaciones completas.",
		searchPlaceholder: "Buscar proyectos...",
		filters: "Filtros",
		sortBy: "Ordenar por",
		mostStars: "Más estrellas",
		nameAZ: "Nombre A-Z",
		mostRecent: "Más recientes",
		language: "Lenguaje",
		allLanguages: "Todos",
		projectsFound: "proyecto(s) encontrado(s)",
		for: "para",
		in: "en",
		noDescription: "Sin descripción",
		viewOnGithub: "Ver en GitHub",
		loading: "Cargando...",
		showMore: "Mostrar más",
		loadError:
			"No se pudieron cargar los proyectos. Por favor, inténtalo de nuevo más tarde.",
		totalProjects: "Proyectos",
		totalStars: "Estrellas",
		totalLanguages: "Lenguajes",
		clearFilters: "Limpiar filtros",
		noProjectsFound: "No se encontraron proyectos con los filtros actuales.",
		tryAgain: "Intentar de nuevo",
		featuredTitle: "Proyectos Destacados",
		featuredDescription: "Una selección curada de proyectos que he construido.",
		featured: "Destacado",
		viewProject: "Ver proyecto",
		previous: "Anterior",
		next: "Siguiente",
	},

	// Feedbacks
	feedbacks: {
		title: "Comentarios y Reseñas",
		description:
			"Conoce las experiencias de clientes con los que he trabajado. Sus comentarios me ayudan a mejorar continuamente.",
		project: "Proyecto",
		avgRating: "Calificación Promedio",
		totalFeedbacks: "Total de Clientes",
		fiveStars: "Cinco Estrellas",
		filterByCategory: "Filtrar por Categoría",
		filterByRating: "Filtrar por Calificación",
		all: "Todos",
		noResults: "No se encontraron comentarios con estos filtros.",
		shareFeedback: "Comparte Tu Experiencia",
		feedbackCTA:
			"¿Trabajaste conmigo? ¡Deja tu comentario y ayuda a otros a descubrir mi trabajo!",
		sendFeedback: "Enviar Comentario",
	},

	// Services
	services: {
		title: "Servicios",
		subtitle:
			"Soluciones a medida para transformar ideas en productos digitales de alto impacto. Desde el concepto hasta el lanzamiento, con enfoque en rendimiento, escalabilidad y resultados reales.",
		process: {
			title: "Cómo Trabajo",
		},
		faq: {
			title: "Preguntas Frecuentes",
		},
		cta: {
			title: "¿Listo para empezar tu proyecto?",
			description:
				"Hablemos sobre tu idea. La primera reunión es gratuita y sin compromiso.",
			button: "Agendar Reunión Gratuita",
		},
	},

	// Payments
	payments: {
		title: "Métodos de Pago",
		subtitle:
			"Aceptamos varios métodos de pago para tu comodidad. Elige el que mejor te funcione.",
	},

	// Sponsors
	sponsors: {
		title: "Patrocinadores",
		visit: "Visitar",
		discountCodes: "Códigos de Descuento",
		codeCopied: "Código copiado: ",
	},

	// Newsletter
	newsletter: {
		title: "Suscríbete al Boletín",
		description:
			"Recibe las mejores noticias y actualizaciones directamente en tu email.",
		emailPlaceholder: "Tu email",
		subscribe: "Suscribirse",
	},

	// Blog
	blog: {
		title: "Blog",
		description:
			"Artículos de mi TabNews - compartiendo conocimiento sobre desarrollo web y tecnología.",
		searchPlaceholder: "Buscar artículos...",
		dates: "Fechas",
		last7days: "Últimos 7 Días",
		last30days: "Últimos 30 Días",
		thisYear: "Este Año",
		loading: "Cargando artículos...",
		error: "Error al cargar artículos de TabNews",
		tryAgain: "Intentar de nuevo",
		noArticles: "No se encontraron artículos.",
		previous: "Anterior",
		next: "Siguiente",
		page: "Página",
		of: "de",
		backToBlog: "Volver al blog",
		viewOnTabNews: "Ver en TabNews",
	},

	// Schedule
	schedule: {
		title: "Agendar una Reunión",
		selectDateTime: "Selecciona Fecha y Hora",
		selectDescription: "Elige el mejor momento para nuestra reunión vía Cal.com",
	},

	// Contracts
	contracts: {
		title: "Contratos",
		newContract: "Nuevo Contrato",
		templates: "Plantillas",
		signed: "Firmados",
		contractInfo: "Información del Contrato",
		contractInfoDescription: "Completa los detalles para generar el contrato",
		projectName: "Nombre del Proyecto",
		projectValue: "Valor del Proyecto",
		projectDescription: "Descripción del Proyecto",
		previewAndSign: "Vista Previa y Firma",
		previewDescription: "Revisa y firma el contrato",
		serviceContract: "Contrato de Servicios",
		project: "Proyecto",
		value: "Valor",
		description: "Descripción",
		signAndFinish: "Firmar y Finalizar",
		contractTemplates: "Plantillas de Contrato",
		selectTemplate: "Selecciona una plantilla para comenzar",
		useTemplate: "Usar Plantilla",
		signedContracts: "Contratos Firmados",
		signedDescription: "Historial de contratos completados y en progreso",
		completed: "Completado",
		inProgress: "En Progreso",
		contract: "Contrato",
		signedOn: "Firmado el",
		viewContract: "Ver Contrato",
		downloadPdf: "Descargar PDF",
		noContracts: "No se encontraron contratos firmados.",
		createFirst: 'Crea tu primer contrato en la pestaña "Nuevo Contrato".',
		generateContract: "Generar Contrato",
		fillInfo: "Completa la información para generar un nuevo contrato",
		mobileNotice:
			"Estamos trabajando para adaptar esta página a dispositivos móviles. Por ahora, accede desde tu computadora para la mejor experiencia.",
		templateNames: [
			"Desarrollo Web",
			"Consultoría",
			"Mantenimiento",
			"Desarrollo de Software",
			"Desarrollo Móvil",
		],
	},

	// CV
	cv: {
		title: "Currículum Vitae",
		chooseLanguage: "Elige el idioma • Choose the language",
		note: "Coloca los archivos PDF en /public como",
	},

	// Setup
	setup: {
		title: "Mi Setup",
		hardware: "Hardware",
		software: "Software",
		techStack: "Stack Tecnológico",
		notes: "Notas",
	},

	// Not Found
	notFound: {
		title: "404",
		subtitle: "Página No Encontrada",
		question: "¿Estás un poco perdido?",
		devMessage:
			"Si eres desarrollador o trabajador: los momentos de incertidumbre ocurren. Recalibra, aprende algo nuevo hoy y sigue construyendo.",
		jobMessage:
			'Para quienes buscan trabajo y solo reciben "no": te entiendo. Han sido',
		attempts: 'intentos de candidatura y muchos "no" — y aun así nunca me rendí.',
		encouragement:
			'La persistencia, los pequeños aprendizajes y cuidar la salud mental marcan la diferencia. Un "no" hoy puede ser el paso hacia un "sí" más grande mañana.',
		backHome: "Volver al Inicio",
		getInTouch: "Ponerse en Contacto",
	},

	// Papers
	papers: {
		title: "Artículos Científicos",
		description: "Mis artículos académicos y publicaciones.",
		searchPlaceholder: "Buscar artículos...",
		all: "Todos",
		empty: "Aún no hay artículos publicados.",
		noResults: "No se encontraron artículos.",
		viewPaper: "Ver artículo",
		of: "de",
		papersCount: "artículos",
	},

	// Command Dialog
	command: {
		searchPlaceholder: "Escribe para buscar páginas...",
		noResults: "No se encontraron resultados.",
		mainPages: "Páginas Principales",
		about: "Sobre",
		interaction: "Interacción",
		others: "Otros",
		theme: "Tema",
		toggleTheme: "Cambiar Tema",
		home: "Inicio",
		blog: "Blog",
		projects: "Proyectos",
		services: "Servicios",
		aboutMe: "Sobre Mí",
		resume: "Currículum",
		timeline: "Línea de Tiempo",
		coverLetter: "Carta de Presentación",
		contact: "Contacto",
		schedule: "Agendar",
		feedbacks: "Comentarios",
		newsletter: "Boletín",
		contracts: "Contratos",
		supporters: "Patrocinadores",
		setup: "Setup",
		papers: "Artículos Científicos",
		payments: "Pagos",
	},

	// Timeline
	timeline: {
		title: "Línea de Tiempo",
		mostRecent: "Más Recientes",
		oldest: "Más Antiguos",
		all: "Todos",
		education: "Educación",
		work: "Trabajo",
		skillsAcquired: "Habilidades Adquiridas:",
		viewProject: "Ver Proyecto",
	},

	// Signature Pad
	signaturePad: {
		clear: "Limpiar",
		save: "Guardar Firma",
		saved: "Firma guardada:",
	},

	// Events
	events: {
		title: "Eventos",
		description: "Descubre los eventos y charlas que estoy organizando.",
		learnMore: "Saber Más",
		watchLive: "Ver en Vivo",
		register: "Registrarse",
		date: "Fecha",
		location: "Ubicación",
		online: "En línea",
		type: "Tipo",
		noUpcoming: "No hay eventos próximos por el momento.",
		inviteMe: "Invítame a un Evento",
		inviteDescription:
			"Completa los detalles de tu evento e invítame a participar. Hago charlas, talleres y otras actividades.",
		inviteSent: "¡Invitación enviada con éxito!",
		inviteError: "Error al enviar la invitación. Inténtalo de nuevo.",
		pleaseSelectDate: "Por favor, selecciona una fecha para el evento",
		eventDetails: "Detalles del Evento",
		fillEventInfo: "Completa la información de tu evento",
		eventName: "Nombre del Evento",
		eventType: "Tipo de Evento",
		organizer: "Organizador del Evento",
		email: "Email",
		phone: "Teléfono",
		eventDate: "Fecha del Evento",
		locationForm: "Ubicación",
		descriptionForm: "Descripción y Detalles",
		sending: "Enviando...",
		sendInvite: "Enviar Invitación",
		cancel: "Cancelar",
		backToEvents: "Volver a Eventos",
	},

	// Changelog
	changelog: {
		title: "Registro de Cambios",
		description: "Historial de actualizaciones y mejoras del proyecto",
		loading: "Cargando historial...",
		error: "Error al cargar el historial",
		tryAgain: "Intentar de nuevo",
		noCommits: "No se encontraron commits",
		typeFeature: "Nuevo",
		typeFix: "Corrección",
		typeDocs: "Documentación",
		typeStyle: "Estilo",
		typeRefactor: "Refactorización",
		typePerf: "Rendimiento",
		typeTest: "Pruebas",
		typeChore: "Mantenimiento",
		filterAll: "Todos",
		filterByType: "Filtrar por tipo",
		viewOnGithub: "Ver en GitHub",
		commitHash: "Commit",
		author: "Autor",
		date: "Fecha",
	},

	// Common
	common: {
		press: "Presiona",
	},
} as const;

export default es;
