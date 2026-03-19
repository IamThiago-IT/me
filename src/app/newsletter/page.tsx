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
		<main className="p-6 flex items-center justify-center min-h-screen">
			<MetadataSetter title={t.newsletter.title} />
			<div className="w-full max-w-md text-center">
				<h1 className="text-3xl font-bold mb-4">{t.newsletter.title}</h1>
				<p className="mb-6 text-gray-600">{t.newsletter.description}</p>
				{status === "success" ? (
					<div className="p-4 bg-green-100 text-green-800 rounded">
						Inscrição realizada com sucesso!
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder={t.newsletter.emailPlaceholder}
							className="w-full border p-2"
							required
						/>
						<button
							type="submit"
							disabled={isPending}
							className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50 flex items-center justify-center gap-2"
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
