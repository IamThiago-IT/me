const ko = {
	// Navbar
	nav: {
		home: "홈",
		about: "소개",
		projects: "프로젝트",
		schedule: "예약",
		contracts: "계약",
		feedbacks: "후기",
		contact: "연락처",
		papers: "논문",
		changelog: "변경 기록",
		payments: "결제",
		openMenu: "메인 메뉴 열기",
	},

	// Home
	home: {
		greeting: "안녕하세요",
		badge: "개발자 & 크리에이터",
		intro: "안녕하세요, 저는",
		description:
			"복잡한 문제를 우아하고 확장 가능하며 사용자 경험에 중점을 둔 솔루션으로 바꾸는 것을 열정으로 하는 풀스택 개발자입니다.",
		viewWork: "작업 보기",
		talkToMe: "대화하기",
	},

	// About
	about: {
		title: "소개",
		description:
			"React, Node.js, TypeScript 경험이 있는 풀스택 개발자입니다. 고성능의 확장 가능한 웹 애플리케이션을 만드는 것이 저의 열정입니다.",
		skills: "기술",
		languages: "언어",
		certificates: "자격증",
		portuguese: "포르투갈어",
		english: "영어",
		spanish: "스페인어",
		native: "원어민",
		fluent: "유창함",
		intermediate: "중급",
		myJourney: "나의 여정",
		journeyDescription: "나의 직업 및 학업 여정에 대해 자세히 알아보세요.",
		certificatesDescription: "나의 여정을 보완하는 과정, 교육 및 자격증을 확인하세요.",
		viewCertificates: "자격증 보기",
		viewTimeline: "타임라인 보기",
		backToAbout: "소개로 돌아가기",
	},

	// Cover Letter
	coverLetter: {
		title: "자기소개서",
		copyText: "텍스트 복사",
		copied: "복사되었습니다!",
		copyError: "텍스트 복사 오류:",
	},

	// Contact
	contact: {
		title: "연락하기",
		description:
			"언제나 새로운 기회와 협업을 환영합니다. 직접 제안을 보내거나 소셜 미디어로 연락해 주세요.",
		socialTitle: "소셜 미디어",
		proposalCta: {
			title: "제안 보내기",
			description: "프로젝트 아이디어가 있으신가요? 세부 정보를 보내주시면 곧 답변드리겠습니다.",
			back: "연락처로 돌아가기",
		},
		form: {
			title: "제안 보내기",
			subtitle: "아래 양식을 작성하여 프로젝트 제안이나 직접 연락을 보내주세요.",
			name: "이름",
			namePlaceholder: "전체 이름",
			email: "이메일",
			emailPlaceholder: "your@email.com",
			subject: "제목",
			subjectPlaceholder: "예: 웹 프로젝트 제안",
			projectType: "프로젝트 유형",
			selectProjectType: "유형 선택...",
			projectTypes: {
				website: "웹사이트 / 랜딩 페이지",
				webapp: "웹 애플리케이션",
				mobile: "모바일 앱",
				api: "API / 백엔드",
				consulting: "컨설팅",
				other: "기타",
			},
			budget: "예상 예산",
			selectBudget: "범위 선택...",
			budgetRanges: {
				low: "$200 미만",
				mid: "$200 - $1,000",
				high: "$1,000 - $3,000",
				premium: "$3,000 이상",
				tbd: "미정",
			},
			message: "메시지",
			messagePlaceholder: "프로젝트, 요구사항 및 기대치를 설명해 주세요...",
			send: "제안 보내기",
			sending: "전송 중...",
			successMessage: "제안이 성공적으로 전송되었습니다! 곧 답변드리겠습니다.",
			errorMessage: "제안 전송 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.",
		},
	},

	// Projects
	projects: {
		title: "내 프로젝트",
		description: "도구와 라이브러리부터 완전한 애플리케이션까지, 제가 만든 프로젝트를 살펴보세요.",
		searchPlaceholder: "프로젝트 검색...",
		filters: "필터",
		sortBy: "정렬",
		mostStars: "별 많은 순",
		nameAZ: "이름 A-Z",
		mostRecent: "최신순",
		language: "언어",
		allLanguages: "전체",
		projectsFound: "개 찾음",
		for: "",
		in: "중",
		noDescription: "설명 없음",
		viewOnGithub: "GitHub에서 보기",
		loading: "로딩 중...",
		showMore: "더 보기",
		loadError: "프로젝트를 불러올 수 없습니다. 나중에 다시 시도해 주세요.",
		totalProjects: "프로젝트",
		totalStars: "별",
		totalLanguages: "언어",
		clearFilters: "필터 초기화",
		noProjectsFound: "현재 필터에 해당하는 프로젝트가 없습니다.",
		tryAgain: "다시 시도",
		featuredTitle: "주요 프로젝트",
		featuredDescription: "정성껏 만든 프로젝트 엄선 컬렉션입니다.",
		featured: "주요",
		viewProject: "프로젝트 보기",
		previous: "이전",
		next: "다음",
	},

	// Feedbacks
	feedbacks: {
		title: "후기 및 리뷰",
		description: "함께 일한 고객들의 경험을 확인해 보세요. 그들의 피드백은 제가 계속 발전하는 데 도움이 됩니다.",
		project: "프로젝트",
		avgRating: "평균 평점",
		totalFeedbacks: "총 고객 수",
		fiveStars: "별 다섯 개",
		filterByCategory: "카테고리별 필터",
		filterByRating: "평점별 필터",
		all: "전체",
		noResults: "이 필터에 해당하는 후기가 없습니다.",
		shareFeedback: "경험 공유하기",
		feedbackCTA: "함께 일하셨나요? 후기를 남겨 다른 사람들이 제 작업을 발견하도록 도와주세요!",
		sendFeedback: "후기 보내기",
	},

	// Services
	services: {
		title: "서비스",
		subtitle:
			"아이디어를 영향력 있는 디지털 제품으로 바꾸는 맞춤형 솔루션. 구상부터 출시까지, 성능, 확장성 및 실질적인 결과에 중점을 둡니다.",
		process: {
			title: "작업 방식",
		},
		faq: {
			title: "자주 묻는 질문",
		},
		cta: {
			title: "프로젝트를 시작할 준비가 되셨나요?",
			description: "당신의 아이디어에 대해 이야기해 봅시다. 첫 미팅은 무료이며 부담이 없습니다.",
			button: "무료 미팅 예약하기",
		},
	},

	// Payments
	payments: {
		title: "결제 방법",
		subtitle: "편의를 위해 다양한 결제 방법을 제공합니다. 가장 적합한 방법을 선택하세요.",
	},

	// Sponsors
	sponsors: {
		title: "스폰서",
		visit: "방문",
		discountCodes: "할인 코드",
		codeCopied: "코드 복사됨: ",
	},

	// Newsletter
	newsletter: {
		title: "뉴스레터 구독",
		description: "최고의 소식과 업데이트를 이메일로 직접 받아보세요.",
		emailPlaceholder: "이메일 주소",
		subscribe: "구독하기",
	},

	// Blog
	blog: {
		title: "블로그",
		description: "나의 TabNews 글 — 웹 개발과 기술에 대한 지식을 공유합니다.",
		searchPlaceholder: "글 검색...",
		dates: "날짜",
		last7days: "지난 7일",
		last30days: "지난 30일",
		thisYear: "올해",
		loading: "글 불러오는 중...",
		error: "TabNews 글 불러오기 오류",
		tryAgain: "다시 시도",
		noArticles: "글이 없습니다.",
		previous: "이전",
		next: "다음",
		page: "페이지",
		of: "/",
		backToBlog: "블로그로 돌아가기",
		viewOnTabNews: "TabNews에서 보기",
	},

	// Schedule
	schedule: {
		title: "미팅 예약",
		selectDateTime: "날짜 및 시간 선택",
		selectDescription: "Cal.com을 통해 미팅에 가장 적합한 시간을 선택하세요",
	},

	// Contracts
	contracts: {
		title: "계약",
		newContract: "새 계약",
		templates: "템플릿",
		signed: "서명됨",
		contractInfo: "계약 정보",
		contractInfoDescription: "계약을 생성하기 위한 세부 정보를 입력하세요",
		projectName: "프로젝트 이름",
		projectValue: "프로젝트 금액",
		projectDescription: "프로젝트 설명",
		previewAndSign: "미리보기 및 서명",
		previewDescription: "계약을 검토하고 서명하세요",
		serviceContract: "용역 계약",
		project: "프로젝트",
		value: "금액",
		description: "설명",
		signAndFinish: "서명하고 완료",
		contractTemplates: "계약 템플릿",
		selectTemplate: "시작할 템플릿을 선택하세요",
		useTemplate: "템플릿 사용",
		signedContracts: "서명된 계약",
		signedDescription: "완료 및 진행 중인 계약 기록",
		completed: "완료됨",
		inProgress: "진행 중",
		contract: "계약",
		signedOn: "서명일",
		viewContract: "계약 보기",
		downloadPdf: "PDF 다운로드",
		noContracts: "서명된 계약이 없습니다.",
		createFirst: '"새 계약" 탭에서 첫 계약을 만들어 보세요.',
		generateContract: "계약 생성",
		fillInfo: "새 계약을 생성하기 위한 정보를 입력하세요",
		mobileNotice: "모바일 기기에 맞게 최적화 중입니다. 최상의 경험을 위해 컴퓨터에서 접속해 주세요.",
		templateNames: ["웹 개발", "컨설팅", "유지보수", "소프트웨어 개발", "모바일 개발"],
	},

	// CV
	cv: {
		title: "이력서",
		chooseLanguage: "언어 선택 • Choose the language",
		note: "PDF 파일을 /public 에 배치하세요:",
	},

	// Setup
	setup: {
		title: "나의 셋업",
		hardware: "하드웨어",
		software: "소프트웨어",
		techStack: "기술 스택",
		notes: "메모",
	},

	// Not Found
	notFound: {
		title: "404",
		subtitle: "페이지를 찾을 수 없습니다",
		question: "길을 잃으셨나요?",
		devMessage:
			"개발자나 직장인 여러분께: 불확실한 순간은 누구에게나 찾아옵니다. 다시 조정하고, 오늘 새로운 것을 배우며 계속 만들어 나가세요.",
		jobMessage: '일을 찾고 "불합격"만 받는 분들께: 이해합니다.',
		attempts: '번의 지원과 많은 "불합격"이 있었지만, 그래도 포기하지 않았습니다.',
		encouragement:
			'끈기, 작은 배움, 그리고 정신 건강을 돌보는 것이 차이를 만듭니다. 오늘의 "불합격"이 내일의 더 큰 "합격"으로 가는 한 걸음이 될 수 있습니다.',
		backHome: "홈으로 돌아가기",
		getInTouch: "연락하기",
	},

	// Papers
	papers: {
		title: "학술 논문",
		description: "나의 학술 논문 및 출판물입니다.",
		searchPlaceholder: "논문 검색...",
		all: "전체",
		empty: "아직 게시된 논문이 없습니다.",
		noResults: "논문을 찾을 수 없습니다.",
		viewPaper: "논문 보기",
		of: "/",
		papersCount: "편",
	},

	// Command Dialog
	command: {
		searchPlaceholder: "페이지 검색...",
		noResults: "결과를 찾을 수 없습니다.",
		mainPages: "주요 페이지",
		about: "소개",
		interaction: "상호작용",
		others: "기타",
		theme: "테마",
		toggleTheme: "테마 전환",
		home: "홈",
		blog: "블로그",
		projects: "프로젝트",
		services: "서비스",
		aboutMe: "소개",
		resume: "이력서",
		timeline: "타임라인",
		coverLetter: "자기소개서",
		contact: "연락처",
		schedule: "예약",
		feedbacks: "후기",
		newsletter: "뉴스레터",
		contracts: "계약",
		supporters: "후원자",
		setup: "셋업",
		papers: "논문",
		payments: "결제",
	},

	// Timeline
	timeline: {
		title: "타임라인",
		mostRecent: "최신순",
		oldest: "오래된 순",
		all: "전체",
		education: "학력",
		work: "경력",
		skillsAcquired: "습득한 기술:",
		viewProject: "프로젝트 보기",
	},

	// Signature Pad
	signaturePad: {
		clear: "지우기",
		save: "서명 저장",
		saved: "서명 저장됨:",
	},

	// Events
	events: {
		title: "이벤트",
		description: "제가 주최하는 이벤트와 강연을 확인해 보세요.",
		learnMore: "자세히 보기",
		watchLive: "라이브 보기",
		register: "등록하기",
		date: "날짜",
		location: "장소",
		online: "온라인",
		type: "유형",
		noUpcoming: "현재 예정된 이벤트가 없습니다.",
		inviteMe: "이벤트에 초대하기",
		inviteDescription: "이벤트 세부 정보를 입력하고 참여를 요청해 주세요. 강연, 워크숍 등 다양한 활동을 합니다.",
		inviteSent: "초대가 성공적으로 전송되었습니다!",
		inviteError: "초대 전송 중 오류가 발생했습니다. 다시 시도해 주세요.",
		pleaseSelectDate: "이벤트 날짜를 선택해 주세요",
		eventDetails: "이벤트 세부 정보",
		fillEventInfo: "이벤트 정보를 입력해 주세요",
		eventName: "이벤트 이름",
		eventType: "이벤트 유형",
		organizer: "주최자",
		email: "이메일",
		phone: "전화",
		eventDate: "이벤트 날짜",
		locationForm: "장소",
		descriptionForm: "설명 및 세부 정보",
		sending: "전송 중...",
		sendInvite: "초대 보내기",
		cancel: "취소",
		backToEvents: "이벤트로 돌아가기",
	},

	// Changelog
	changelog: {
		title: "변경 기록",
		description: "프로젝트 업데이트 및 개선 기록",
		loading: "기록 불러오는 중...",
		error: "기록 불러오기 오류",
		tryAgain: "다시 시도",
		noCommits: "커밋을 찾을 수 없습니다",
		typeFeature: "새 기능",
		typeFix: "수정",
		typeDocs: "문서",
		typeStyle: "스타일",
		typeRefactor: "리팩터",
		typePerf: "성능",
		typeTest: "테스트",
		typeChore: "기타",
		filterAll: "전체",
		filterByType: "유형별 필터",
		viewOnGithub: "GitHub에서 보기",
		commitHash: "커밋",
		author: "작성자",
		date: "날짜",
	},

	// Common
	common: {
		press: "누르기",
	},
} as const;

export default ko;
