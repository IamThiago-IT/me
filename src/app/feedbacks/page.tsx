"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MetadataSetter } from "@/components/MetadataSetter"
import { useI18n } from "@/lib/i18n"

const feedbacks = [
	{
		id: 1,
		name: "João Silva",
		company: "Tech Solutions",
		project: "E-commerce Platform",
		rating: 5,
		comment:
			"Excelente trabalho! Entregou o projeto antes do prazo e com qualidade excepcional.",
		image: "/placeholder.svg?height=80&width=80",
	},
	{
		id: 2,
		name: "Maria Santos",
		company: "Digital Agency",
		project: "Website Redesign",
		rating: 5,
		comment:
			"Muito profissional e atencioso. Compreendeu perfeitamente nossas necessidades.",
		image: "/placeholder.svg?height=80&width=80",
	},
	// Adicione mais feedbacks conforme necessário
]

export default function Feedbacks() {
	const { t } = useI18n()

	return (
		<div className="container mx-auto px-3 sm:px-4 md:px-6">
			<MetadataSetter title={t.feedbacks.title} />
			<div className="max-w-4xl mx-auto">
				<h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t.feedbacks.title}</h1>

				<div className="grid gap-4 sm:gap-5 md:gap-6">
					{feedbacks.map((feedback) => (
						<Card key={feedback.id} className="hover:shadow-md transition-shadow">
							<CardContent className="p-3 sm:p-4 md:p-6">
								<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
									<div className="flex-shrink-0">
										<Avatar className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24">
											<AvatarImage src={feedback.image} alt={feedback.name} />
											<AvatarFallback className="text-lg sm:text-xl md:text-2xl">
												{feedback.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
									</div>
									<div className="flex-1 space-y-3 sm:space-y-4">
										<div>
											<h3 className="text-base sm:text-lg font-semibold">
												{feedback.name}
											</h3>
											<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
												{feedback.company}
											</p>
										</div>
										<div className="flex items-center gap-1">
											{Array.from({ length: feedback.rating }).map((_, i) => (
												<Star
													key={i}
													className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400"
												/>
											))}
										</div>
										<div>
											<p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
												{t.feedbacks.project}: {feedback.project}
											</p>
											<p className="mt-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{feedback.comment}</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}
