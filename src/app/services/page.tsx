"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import {
	ArrowRight,
	Bot,
	CheckCircle2,
	ChevronDown,
	Clock,
	Code2,
	Headphones,
	Laptop,
	Layers,
	MessageSquareCode,
	PencilRuler,
	Rocket,
	Search,
	Server,
	ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const serviceIcons = [
	Laptop,
	Layers,
	ShoppingCart,
	Server,
	Bot,
	MessageSquareCode,
];

const processIcons = [Search, PencilRuler, Code2, Rocket, Headphones];

export default function Services() {
	const { t } = useI18n();
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	return (
		<div className="flex flex-col">
			<MetadataSetter title={t.services.title} />

			{/* Hero */}
			<div className="mb-12 sm:mb-16">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
					{t.services.title}
				</h1>
				<p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
					{t.services.subtitle}
				</p>
			</div>

			{/* Services Grid */}
			<div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16 sm:mb-24">
				{t.services.items.map((service, index) => {
					const Icon = serviceIcons[index];
					const features = service.features.split(" | ");

					return (
						<Card
							key={service.name}
							className="group flex flex-col hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300"
						>
							<CardHeader className="pb-3">
								<div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
									<Icon className="w-6 h-6 text-indigo-500" />
								</div>
								<CardTitle className="text-lg sm:text-xl">
									{service.name}
								</CardTitle>
								<CardDescription className="text-sm leading-relaxed mt-2">
									{service.description}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col flex-1">
								<div className="space-y-2 mb-6">
									{features.map((feature) => (
										<div
											key={feature}
											className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
										>
											<CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mt-0.5 shrink-0" />
											<span>{feature}</span>
										</div>
									))}
								</div>

								<div className="mt-auto pt-4 border-t">
									<div className="flex items-center justify-between mb-4">
										<div>
											{service.priceTo ? (
												<div className="flex items-baseline gap-1">
													<span className="text-xs text-muted-foreground">
														a partir de
													</span>
													<span className="text-xl font-bold text-green-600 dark:text-green-400">
														{service.priceFrom}
													</span>
													<span className="text-xs text-muted-foreground">
														até
													</span>
													<span className="text-xl font-bold text-green-600 dark:text-green-400">
														{service.priceTo}
													</span>
												</div>
											) : (
												<div className="flex items-baseline gap-1">
													<span className="text-xl font-bold text-green-600 dark:text-green-400">
														{service.priceFrom}
													</span>
												</div>
											)}
										</div>
										<Badge variant="secondary" className="text-xs">
											<Clock className="w-3 h-3 mr-1" />
											{service.delivery}
										</Badge>
									</div>
									<Button asChild className="w-full font-medium">
										<Link href="/contato">
											{service.cta}
											<ArrowRight className="ml-2 h-4 w-4" />
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Process Section */}
			<div className="mb-16 sm:mb-24">
				<h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
					{t.services.process.title}
				</h2>
				<div className="relative">
					<div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-border" />
					<div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8">
					{t.services.process.steps.map((step, index) => {
						const Icon = processIcons[index];
							return (
								<div
									key={step.title}
									className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0"
								>
									<div className="relative z-10 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg">
										<Icon className="w-6 h-6" />
									</div>
									<div className="md:text-center md:mt-4">
										<div className="flex items-center md:justify-center gap-2 mb-1">
											<span className="text-xs font-mono text-muted-foreground">
												{String(index + 1).padStart(2, "0")}
											</span>
											<h3 className="font-semibold">{step.title}</h3>
										</div>
										<p className="text-sm text-muted-foreground">
											{step.description}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* FAQ Section */}
			<div className="mb-16 sm:mb-24 max-w-3xl">
				<h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
					{t.services.faq.title}
				</h2>
				<div className="space-y-3">
					{t.services.faq.items.map((item, index) => (
						<div
							key={item.question}
							className="border rounded-lg overflow-hidden transition-all"
						>
							<button
								type="button"
								onClick={() => setOpenFaq(openFaq === index ? null : index)}
								className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-muted/50 transition-colors"
							>
								<span className="font-medium text-sm sm:text-base pr-4">
									{item.question}
								</span>
								<ChevronDown
									className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
										openFaq === index ? "rotate-180" : ""
									}`}
								/>
							</button>
							<div
								className={`overflow-hidden transition-all duration-300 ${
									openFaq === index ? "max-h-96" : "max-h-0"
								}`}
							>
								<p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-muted-foreground leading-relaxed">
									{item.answer}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* CTA Section */}
			<div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200 dark:border-indigo-800">
				<h2 className="text-2xl sm:text-3xl font-bold mb-4">
					{t.services.cta.title}
				</h2>
				<p className="text-muted-foreground mb-8 max-w-xl mx-auto">
					{t.services.cta.description}
				</p>
				<Button asChild size="lg" className="font-medium">
					<Link href="/agendar">
						{t.services.cta.button}
						<ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</Button>
			</div>
		</div>
	);
}
