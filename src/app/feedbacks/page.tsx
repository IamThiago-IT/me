"use client"

import { Star, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MetadataSetter } from "@/components/MetadataSetter"
import { useI18n } from "@/lib/i18n"
import { useState } from "react"

const feedbacks = [
	{
		id: 1,
		name: "João Silva",
		company: "Tech Solutions",
		project: "E-commerce Platform",
		category: "Web Development",
		rating: 5,
		comment:
			"Excelente trabalho! Entregou o projeto antes do prazo e com qualidade excepcional. A comunicação foi clara durante todo o processo.",
		image: "/placeholder.svg?height=80&width=80",
		date: "Março 2026",
	},
	{
		id: 2,
		name: "Maria Santos",
		company: "Digital Agency",
		project: "Website Redesign",
		category: "Design",
		rating: 5,
		comment:
			"Muito profissional e atencioso. Compreendeu perfeitamente nossas necessidades e superou as expectativas.",
		image: "/placeholder.svg?height=80&width=80",
		date: "Fevereiro 2026",
	},
	{
		id: 3,
		name: "Carlos Oliveira",
		company: "StartUp XY",
		project: "Mobile App",
		category: "Mobile",
		rating: 5,
		comment:
			"Desenvolvimento impecável. O aplicativo ficou exatamente como imaginávamos, com performance excelente.",
		image: "/placeholder.svg?height=80&width=80",
		date: "Janeiro 2026",
	},
	{
		id: 4,
		name: "Ana Costa",
		company: "E-commerce Hub",
		project: "API Integration",
		category: "Backend",
		rating: 5,
		comment:
			"Resolveu nosso problema de integração em tempo recorde. Muito competente e dedicado ao projeto.",
		image: "/placeholder.svg?height=80&width=80",
		date: "Dezembro 2025",
	},
	{
		id: 5,
		name: "Roberto Martins",
		company: "Corporate Finance",
		project: "Dashboard Analytics",
		category: "Data Visualization",
		rating: 4,
		comment:
			"Ótimo dashboard interativo. Atendeu bem aos requisitos, com bom design e funcionalidade.",
		image: "/placeholder.svg?height=80&width=80",
		date: "Novembro 2025",
	},
]

const categories = ["Todos", "Web Development", "Mobile", "Design", "Backend", "Data Visualization"]

export default function Feedbacks() {
	const { t } = useI18n()
	const [selectedCategory, setSelectedCategory] = useState("Todos")
	const [selectedRating, setSelectedRating] = useState(0)

	const filteredFeedbacks = feedbacks.filter((feedback) => {
		const categoryMatch = selectedCategory === "Todos" || feedback.category === selectedCategory
		const ratingMatch = selectedRating === 0 || feedback.rating === selectedRating
		return categoryMatch && ratingMatch
	})

	const averageRating = (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
	const fiveStarCount = feedbacks.filter((f) => f.rating === 5).length
	const fourStarCount = feedbacks.filter((f) => f.rating === 4).length

	return (
		<div className="container mx-auto px-3 sm:px-4 md:px-6">
			<MetadataSetter title={t.feedbacks.title} />
			<div className="max-w-5xl mx-auto">
				{/* Header Section */}
				<div className="mb-8 sm:mb-12">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">{t.feedbacks.title}</h1>
					<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
						{t.feedbacks.description || "Conheça as experiências de clientes que trabalharam comigo. Seus feedbacks me ajudam a melhorar continuamente."}
					</p>
				</div>

				{/* Stats Section */}
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
					<Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
						<CardContent className="p-3 sm:p-4 text-center">
							<div className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400">{averageRating}</div>
							<p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 mt-1">{t.feedbacks.avgRating || "Avaliação Média"}</p>
						</CardContent>
					</Card>
					<Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
						<CardContent className="p-3 sm:p-4 text-center">
							<div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{feedbacks.length}</div>
							<p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 mt-1">{t.feedbacks.totalFeedbacks || "Total de Clientes"}</p>
						</CardContent>
					</Card>
					<Card className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
						<CardContent className="p-3 sm:p-4 text-center">
							<div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{fiveStarCount}</div>
							<p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mt-1">{t.feedbacks.fiveStars || "Cinco Estrelas"}</p>
						</CardContent>
					</Card>
				</div>

				{/* Filters */}
				<div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
					{/* Category Filter */}
					<div>
						<p className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-gray-600 dark:text-gray-400">{t.feedbacks.filterByCategory || "Filtrar por Categoria"}</p>
						<div className="flex flex-wrap gap-2">
							{categories.map((category) => (
								<Badge
									key={category}
									variant={selectedCategory === category ? "default" : "outline"}
									className="cursor-pointer text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-3 transition-all hover:bg-primary hover:text-primary-foreground"
									onClick={() => setSelectedCategory(category)}
								>
									{category}
								</Badge>
							))}
						</div>
					</div>

					{/* Rating Filter */}
					<div>
						<p className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-gray-600 dark:text-gray-400">{t.feedbacks.filterByRating || "Filtrar por Avaliação"}</p>
						<div className="flex flex-wrap gap-2">
							{[0, 5, 4].map((rating) => (
								<button
									key={rating}
									type="button"
									onClick={() => setSelectedRating(rating)}
									className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs sm:text-sm transition-all ${
										selectedRating === rating
											? "bg-primary text-primary-foreground"
											: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
									}`}
								>
									{rating === 0 ? (
										t.feedbacks.all || "Todos"
									) : (
										<>
											{[...Array(rating)].map((_, i) => (
												<Star key={`star-${i * rating}`} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
											))}
											{rating === 4 && "+"}
										</>
									)}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Feedbacks Grid */}
				<div className="grid gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16">
					{filteredFeedbacks.length > 0 ? (
						filteredFeedbacks.map((feedback) => (
							<Card key={feedback.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-yellow-400">
								<CardContent className="p-4 sm:p-5 md:p-6">
									<div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6">
										{/* Avatar */}
										<div className="flex-shrink-0">
											<Avatar className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 ring-2 ring-yellow-200 dark:ring-yellow-800">
												<AvatarImage src={feedback.image} alt={feedback.name} />
												<AvatarFallback className="text-lg sm:text-xl md:text-2xl bg-gradient-to-br from-blue-400 to-purple-500 text-white">
													{feedback.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
										</div>

										{/* Content */}
										<div className="flex-1 min-w-0">
											{/* Header */}
											<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3">
												<div>
													<h3 className="text-base sm:text-lg font-semibold">{feedback.name}</h3>
													<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
														{feedback.company} • {feedback.date}
													</p>
												</div>
												<div className="flex items-center gap-1 flex-shrink-0">
													{Array.from({ length: feedback.rating }).map((_, i) => (
														<Star
														key={`feedback-${feedback.id}-star-${i}`}
															className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
														/>
													))}
												</div>
											</div>

											{/* Badges */}
											<div className="flex flex-wrap gap-2 mb-3">
												<Badge variant="secondary" className="text-xs">{feedback.category}</Badge>
												<Badge variant="outline" className="text-xs">{feedback.project}</Badge>
											</div>

											{/* Comment */}
											<p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
												{feedback.comment}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))
					) : (
						<Card className="text-center py-8 sm:py-12">
							<CardContent className="space-y-3">
								<MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-300 dark:text-gray-700" />
								<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
									{t.feedbacks.noResults || "Nenhum feedback encontrado com esses filtros."}
								</p>
							</CardContent>
						</Card>
					)}
				</div>

				{/* CTA Section */}
				<div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 border border-blue-200 dark:border-blue-800 text-center">
					<MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-blue-600 dark:text-blue-400" />
					<h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">{t.feedbacks.shareFeedback || "Compartilhe sua Experiência"}</h2>
					<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 max-w-xl mx-auto">
						{t.feedbacks.feedbackCTA || "Trabalhou comigo? Deixe seu feedback e ajude outras pessoas a conhecer meu trabalho!"}
					</p>
					<Button className="text-xs sm:text-sm" asChild>
						<a href="/contato">{t.feedbacks.sendFeedback || "Enviar Feedback"}</a>
					</Button>
				</div>
			</div>
		</div>
	)
}
