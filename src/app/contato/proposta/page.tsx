"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import { useI18n } from "@/lib/i18n";
import {
	AlertCircle,
	ArrowLeft,
	CheckCircle2,
	Loader2,
	Send,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Proposta() {
	const { t } = useI18n();
	const [formStatus, setFormStatus] = useState<FormStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		window.gtag?.("event", "proposal_page_view", {
			event_category: "engagement",
			event_label: "proposal_form",
		});
	}, []);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		projectType: "",
		budget: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormStatus("loading");
		setErrorMessage("");

		try {
			const res = await fetch("/api/send-proposal", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const result = await res.json();

			if (!res.ok || result.error) {
				setFormStatus("error");
				setErrorMessage(result.error || t.contact.form.errorMessage);
				return;
			}

			setFormStatus("success");
			setFormData({
				name: "",
				email: "",
				subject: "",
				projectType: "",
				budget: "",
				message: "",
			});

			window.gtag?.("event", "proposal_submit", {
				event_category: "conversion",
				event_label: "proposal_form",
			});

			setTimeout(() => setFormStatus("idle"), 5000);
		} catch {
			setFormStatus("error");
			setErrorMessage(t.contact.form.errorMessage);
		}
	};

	return (
		<div>
			<MetadataSetter title={t.contact.form.title} />

			{/* Voltar */}
			<Link
				href="/contato"
				className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-6"
			>
				<ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
				{t.contact.proposalCta.back}
			</Link>

			<h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{t.contact.form.title}</h1>
			<p className="text-xs sm:text-base text-muted-foreground mb-6 sm:mb-8">
				{t.contact.form.subtitle}
			</p>

			<div className="max-w-2xl">
				<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
					<div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
						<div>
							<label
								htmlFor="name"
								className="block text-xs sm:text-sm font-medium mb-1.5"
							>
								{t.contact.form.name} *
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								value={formData.name}
								onChange={handleChange}
								placeholder={t.contact.form.namePlaceholder}
								className="w-full rounded-lg border border-input bg-background px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-gray-900 dark:border-gray-700"
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-xs sm:text-sm font-medium mb-1.5"
							>
								{t.contact.form.email} *
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={formData.email}
								onChange={handleChange}
								placeholder={t.contact.form.emailPlaceholder}
								className="w-full rounded-lg border border-input bg-background px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-gray-900 dark:border-gray-700"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="subject"
							className="block text-xs sm:text-sm font-medium mb-1.5"
						>
							{t.contact.form.subject} *
						</label>
						<input
							id="subject"
							name="subject"
							type="text"
							required
							value={formData.subject}
							onChange={handleChange}
							placeholder={t.contact.form.subjectPlaceholder}
							className="w-full rounded-lg border border-input bg-background px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-gray-900 dark:border-gray-700"
						/>
					</div>

					<div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
						<div>
							<label
								htmlFor="projectType"
								className="block text-xs sm:text-sm font-medium mb-1.5"
							>
								{t.contact.form.projectType}
							</label>
							<select
								id="projectType"
								name="projectType"
								value={formData.projectType}
								onChange={handleChange}
								className="w-full rounded-lg border border-input bg-background px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-gray-900 dark:border-gray-700"
							>
								<option value="">{t.contact.form.selectProjectType}</option>
								<option value="website">
									{t.contact.form.projectTypes.website}
								</option>
								<option value="webapp">
									{t.contact.form.projectTypes.webapp}
								</option>
								<option value="mobile">
									{t.contact.form.projectTypes.mobile}
								</option>
								<option value="api">{t.contact.form.projectTypes.api}</option>
								<option value="consulting">
									{t.contact.form.projectTypes.consulting}
								</option>
								<option value="other">
									{t.contact.form.projectTypes.other}
								</option>
							</select>
						</div>
						<div>
							<label
								htmlFor="budget"
								className="block text-xs sm:text-sm font-medium mb-1.5"
							>
								{t.contact.form.budget}
							</label>
							<select
								id="budget"
								name="budget"
								value={formData.budget}
								onChange={handleChange}
								className="w-full rounded-lg border border-input bg-background px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-gray-900 dark:border-gray-700"
							>
								<option value="">{t.contact.form.selectBudget}</option>
								<option value="< R$ 1.000">
									{t.contact.form.budgetRanges.low}
								</option>
								<option value="R$ 1.000 - R$ 5.000">
									{t.contact.form.budgetRanges.mid}
								</option>
								<option value="R$ 5.000 - R$ 15.000">
									{t.contact.form.budgetRanges.high}
								</option>
								<option value="R$ 15.000+">
									{t.contact.form.budgetRanges.premium}
								</option>
								<option value="A definir">
									{t.contact.form.budgetRanges.tbd}
								</option>
							</select>
						</div>
					</div>

					<div>
						<label
							htmlFor="message"
							className="block text-xs sm:text-sm font-medium mb-1.5"
						>
							{t.contact.form.message} *
						</label>
						<textarea
							id="message"
							name="message"
							required
							rows={6}
							value={formData.message}
							onChange={handleChange}
							placeholder={t.contact.form.messagePlaceholder}
							className="w-full rounded-lg border border-input bg-background px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y dark:bg-gray-900 dark:border-gray-700"
						/>
					</div>

					{/* Status messages */}
					{formStatus === "success" && (
						<div className="flex items-start gap-2 p-3 sm:p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs sm:text-sm">
							<CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
							<span>{t.contact.form.successMessage}</span>
						</div>
					)}

					{formStatus === "error" && (
						<div className="flex items-start gap-2 p-3 sm:p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs sm:text-sm">
							<AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
							<span>{errorMessage || t.contact.form.errorMessage}</span>
						</div>
					)}

					<button
						type="submit"
						disabled={formStatus === "loading"}
						className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{formStatus === "loading" ? (
							<>
								<Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
								<span className="hidden sm:inline">{t.contact.form.sending}</span>
								<span className="sm:hidden">Enviando...</span>
							</>
						) : (
							<>
								<Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
								{t.contact.form.send}
							</>
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
