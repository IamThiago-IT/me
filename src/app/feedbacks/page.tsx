import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
	return (
		<div className="container mx-auto px-4">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-6">Feedbacks e Avaliações</h1>

				<div className="grid gap-6">
					{feedbacks.map((feedback) => (
						<Card key={feedback.id}>
							<CardContent className="p-6">
								<div className="flex flex-col md:flex-row gap-6">
									<div className="flex-shrink-0">
										<Avatar className="w-24 h-24">
											<AvatarImage src={feedback.image} alt={feedback.name} />
											<AvatarFallback className="text-2xl">
												{feedback.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
									</div>
									<div className="flex-1 space-y-4">
										<div>
											<h3 className="text-lg font-semibold">
												{feedback.name}
											</h3>
											<p className="text-sm text-gray-500">
												{feedback.company}
											</p>
										</div>
										<div className="flex items-center gap-1">
											{Array.from({ length: feedback.rating }).map((_, i) => (
												<Star
													key={i}
													className="w-5 h-5 fill-yellow-400 text-yellow-400"
												/>
											))}
										</div>
										<div>
											<p className="text-sm font-medium text-gray-500">
												Projeto: {feedback.project}
											</p>
											<p className="mt-2">{feedback.comment}</p>
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
