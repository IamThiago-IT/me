"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MetadataSetter } from "@/components/MetadataSetter"
import { useI18n } from "@/lib/i18n"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function InviteMe() {
	const { t } = useI18n()
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		eventName: "",
		organizer: "",
		email: "",
		phone: "",
		eventDate: "",
		eventLocation: "",
		description: "",
		eventType: "workshop",
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			// Aqui você pode enviar para um endpoint ou serviço de email
			// Por enquanto, vamos simular com toast
			await new Promise((resolve) => setTimeout(resolve, 1500))

			toast.success(t.events.inviteSent || "Convite enviado com sucesso!")

			// Reset form
			setFormData({
				eventName: "",
				organizer: "",
				email: "",
				phone: "",
				eventDate: "",
				eventLocation: "",
				description: "",
				eventType: "workshop",
			})
		} catch (error) {
			toast.error(t.events.inviteError || "Erro ao enviar convite. Tente novamente.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<MetadataSetter title={t.events.inviteMe || "Me convide para um evento"} />
			<div className="max-w-2xl mx-auto">
				{/* Back Button */}
				<Link
					href="/event"
					className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
				>
					<ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
					{t.events.backToEvents || "Voltar aos Eventos"}
				</Link>

				{/* Header */}
				<div className="mb-8 sm:mb-12">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
						{t.events.inviteMe || "Me convide para um evento"}
					</h1>
					<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
						{t.events.inviteDescription || "Preencha os detalhes do seu evento e me convide para participar. Faço palestras, workshops e outras ações de engajamento."}
					</p>
				</div>

				{/* Form Card */}
				<Card>
					<CardHeader>
						<CardTitle>{t.events.eventDetails || "Detalhes do Evento"}</CardTitle>
						<CardDescription>
							{t.events.fillEventInfo || "Preencha as informações do seu evento"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Row 1: Event Name and Type */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
								<div className="space-y-2">
									<Label htmlFor="eventName" className="text-xs sm:text-sm">
										{t.events.eventName || "Nome do Evento"} *
									</Label>
									<Input
										id="eventName"
										name="eventName"
										placeholder="ex: Tech Conference 2026"
										value={formData.eventName}
										onChange={handleInputChange}
										required
										className="text-xs sm:text-sm"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="eventType" className="text-xs sm:text-sm">
										{t.events.eventType || "Tipo de Evento"} *
									</Label>
									<select
										id="eventType"
										name="eventType"
										value={formData.eventType}
										onChange={handleInputChange}
										className="w-full px-3 sm:px-4 py-2 rounded-md border border-input bg-background text-xs sm:text-sm"
										required
									>
										<option value="workshop">Workshop</option>
										<option value="palestra">Palestra</option>
										<option value="conferência">Conferência</option>
										<option value="webinar">Webinar</option>
										<option value="meetup">Meetup</option>
									</select>
								</div>
							</div>

							{/* Row 2: Organizer and Email */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
								<div className="space-y-2">
									<Label htmlFor="organizer" className="text-xs sm:text-sm">
										{t.events.organizer || "Responsável Pelo Evento"} *
									</Label>
									<Input
										id="organizer"
										name="organizer"
										placeholder="Seu nome"
										value={formData.organizer}
										onChange={handleInputChange}
										required
										className="text-xs sm:text-sm"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email" className="text-xs sm:text-sm">
										{t.events.email || "Email"} *
									</Label>
									<Input
										id="email"
										name="email"
										type="email"
										placeholder="seu@email.com"
										value={formData.email}
										onChange={handleInputChange}
										required
										className="text-xs sm:text-sm"
									/>
								</div>
							</div>

							{/* Row 3: Phone and Event Date */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
								<div className="space-y-2">
									<Label htmlFor="phone" className="text-xs sm:text-sm">
										{t.events.phone || "Telefone"} *
									</Label>
									<Input
										id="phone"
										name="phone"
										placeholder="(11) 99999-9999"
										value={formData.phone}
										onChange={handleInputChange}
										required
										className="text-xs sm:text-sm"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="eventDate" className="text-xs sm:text-sm">
										{t.events.eventDate || "Data do Evento"} *
									</Label>
									<Input
										id="eventDate"
										name="eventDate"
										type="date"
										value={formData.eventDate}
										onChange={handleInputChange}
										required
										className="text-xs sm:text-sm"
									/>
								</div>
							</div>

							{/* Location */}
							<div className="space-y-2">
								<Label htmlFor="eventLocation" className="text-xs sm:text-sm">
									{t.events.locationForm || "Local"} *
								</Label>
								<Input
									id="eventLocation"
									name="eventLocation"
									placeholder="São Paulo, SP ou Online"
									value={formData.eventLocation}
									onChange={handleInputChange}
									required
									className="text-xs sm:text-sm"
								/>
							</div>

							{/* Description */}
							<div className="space-y-2">
								<Label htmlFor="description" className="text-xs sm:text-sm">
									{t.events.descriptionForm || "Descrição e Detalhes"} *
								</Label>
								<Textarea
									id="description"
									name="description"
									placeholder="Descreva o evento, público-alvo, tema da palestra/workshop desejada, etc."
									value={formData.description}
									onChange={handleInputChange}
									rows={5}
									required
									className="text-xs sm:text-sm"
								/>
							</div>

							{/* Buttons */}
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
								<Button
									type="submit"
									disabled={loading}
									className="text-xs sm:text-sm flex-1"
								>
									{loading
										? (t.events.sending || "Enviando...")
										: (t.events.sendInvite || "Enviar Convite")
									}
								</Button>
								<Button
									type="button"
									variant="outline"
									asChild
									className="text-xs sm:text-sm"
								>
									<Link href="/event">{t.events.cancel || "Cancelar"}</Link>
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</>
	)
}
