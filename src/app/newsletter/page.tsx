"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import { useI18n } from "@/lib/i18n";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useState, useTransition } from "react";
import { subscribeNewsletter } from "../Actions/newsletterActions";

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export default function Newsletter() {
	const { t } = useI18n();
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("idle");

		const formData = new FormData();
		formData.append("email", email);

		startTransition(async () => {
			try {
				await subscribeNewsletter(formData);
				setStatus("success");
				setEmail("");

				window.gtag?.("event", "newsletter_signup", {
					event_category: "lead",
					event_label: "newsletter",
				});
			} catch {
				setStatus("error");
			}
		});
	};

	return (
		<main className="p-3 sm:p-4 md:p-6 flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
			<MetadataSetter title={t.newsletter.title} />
			<div className="w-full max-w-md text-center">
				<h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t.newsletter.title}</h1>
				<p className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t.newsletter.description}</p>
				{status === "success" ? (
					<div className="p-3 sm:p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm">
						Inscrição realizada com sucesso!
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
						<input
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder={t.newsletter.emailPlaceholder}
							className="w-full border p-2 sm:p-3 rounded text-sm dark:bg-gray-800 dark:border-gray-700"
							required
						/>
						<button
							type="submit"
							disabled={isPending}
							className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 sm:p-3 rounded disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base font-medium transition-colors"
						>
							{isPending ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									Inscrevendo...
								</>
							) : (
								t.newsletter.subscribe
							)}
						</button>
						{status === "error" && (
							<p className="text-red-500 text-sm">Erro ao realizar inscrição</p>
						)}
					</form>
				)}
			</div>
		</main>
	);
}
