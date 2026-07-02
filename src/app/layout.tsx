import { CommandDialogDemo } from "@/components/CommandDialogDemo";
import { Navbar } from "@/components/Navbar";
import { I18nProvider } from "@/lib/i18n";
import {
	buildThemeCss,
	resolveTheme,
	THEME_COOKIE_NAME,
	themeConfig,
} from "@/lib/themes";
import { ThemeProvider } from "next-themes";
import { Inter, JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import type React from "react";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

export const metadata = {
	title: "IamThiago",
	description: "Portfólio minimalista de um desenvolvedor",
};

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();
	const preferredThemeId = cookieStore.get(THEME_COOKIE_NAME)?.value ?? null;
	const resolvedTheme = await resolveTheme(
		{
			now: new Date(),
			preferredThemeId,
			locale: "pt-BR",
		},
		themeConfig,
	);
	const themeCss = buildThemeCss(resolvedTheme.theme);

	return (
		<html
			lang="pt-BR"
			suppressHydrationWarning
			className="custom-scrollbar"
			data-theme={resolvedTheme.theme.id}
		>
			<head>
				<style dangerouslySetInnerHTML={{ __html: themeCss }} />
			</head>
			<body
				className={`${inter.className} ${jetbrainsMono.variable} custom-scrollbar`}
			>
				<I18nProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<Navbar />
						<main className="pt-16 min-h-screen">
							<div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
								{children}
							</div>
						</main>
						<Toaster
							position="top-right"
							richColors
							toastOptions={{
								className:
									"text-sm sm:text-base max-w-xs sm:max-w-sm md:max-w-md",
							}}
						/>
						<CommandDialogDemo />
					</ThemeProvider>
				</I18nProvider>
			</body>
		</html>
	);
}
