import { CommandDialogDemo } from "@/components/CommandDialogDemo";
import { Navbar } from "@/components/Navbar";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Script from "next/script";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "IamThiago",
	description: "Portfólio minimalista de um desenvolvedor",
};

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={inter.className}>
				<I18nProvider>
					<ThemeProvider attribute="class" defaultTheme="system">
						<Navbar />
						<main className="pt-16 min-h-screen">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
								{children}
							</div>
						</main>
					</ThemeProvider>
					<CommandDialogDemo />
				</I18nProvider>
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`}
				</Script>
			</body>
		</html>
	);
}
