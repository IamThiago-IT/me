import { createThemePalette } from "./palette";
import type { ThemeDefinition } from "./types";

const baseLight = createThemePalette({});
const baseDark = createThemePalette({}, "dark");

export const themeRegistry: ThemeDefinition[] = [
	{
		id: "default",
		label: "Padrão",
		description: "Tema base do site.",
		palette: {
			light: baseLight,
			dark: baseDark,
		},
	},
	{
		id: "natal",
		label: "Natal",
		description: "Tema sazonal para dezembro.",
		schedule: {
			start: { month: 12, day: 24 },
			end: { month: 12, day: 26 },
			timeZone: "America/Sao_Paulo",
			priority: 100,
		},
		palette: {
			light: createThemePalette(
				{
					background: "oklch(0.985 0.01 145)",
					foreground: "oklch(0.21 0.04 145)",
					primary: "oklch(0.6 0.2 25)",
					primaryForeground: "oklch(0.985 0 0)",
					accent: "oklch(0.93 0.08 145)",
					accentForeground: "oklch(0.21 0.04 145)",
					border: "oklch(0.88 0.03 145)",
					ring: "oklch(0.7 0.17 25)",
				},
				"light",
			),
			dark: createThemePalette(
				{
					background: "oklch(0.16 0.03 145)",
					foreground: "oklch(0.98 0.01 145)",
					card: "oklch(0.21 0.03 145)",
					primary: "oklch(0.74 0.16 25)",
					primaryForeground: "oklch(0.16 0.03 145)",
					accent: "oklch(0.25 0.04 145)",
					accentForeground: "oklch(0.98 0.01 145)",
					border: "oklch(1 0 0 / 12%)",
					ring: "oklch(0.74 0.16 25)",
				},
				"dark",
			),
		},
	},
	{
		id: "halloween",
		label: "Halloween",
		description: "Tema sazonal para o fim de outubro.",
		schedule: {
			start: { month: 10, day: 30 },
			end: { month: 11, day: 1 },
			timeZone: "America/Sao_Paulo",
			priority: 90,
		},
		palette: {
			light: createThemePalette(
				{
					background: "oklch(0.985 0.01 75)",
					foreground: "oklch(0.22 0.03 75)",
					primary: "oklch(0.58 0.19 40)",
					accent: "oklch(0.92 0.07 75)",
					accentForeground: "oklch(0.22 0.03 75)",
					ring: "oklch(0.58 0.19 40)",
				},
				"light",
			),
			dark: createThemePalette(
				{
					background: "oklch(0.15 0.03 75)",
					foreground: "oklch(0.97 0.01 75)",
					primary: "oklch(0.72 0.18 40)",
					accent: "oklch(0.24 0.04 75)",
					accentForeground: "oklch(0.97 0.01 75)",
					ring: "oklch(0.72 0.18 40)",
				},
				"dark",
			),
		},
	},
	{
		id: "sao-joao",
		label: "São João",
		description: "Tema sazonal de junho.",
		schedule: {
			start: { month: 6, day: 20 },
			end: { month: 6, day: 30 },
			timeZone: "America/Sao_Paulo",
			priority: 80,
		},
		palette: {
			light: createThemePalette(
				{
					background: "oklch(0.985 0.02 98)",
					foreground: "oklch(0.22 0.04 98)",
					primary: "oklch(0.7 0.16 55)",
					accent: "oklch(0.92 0.08 98)",
					accentForeground: "oklch(0.22 0.04 98)",
					ring: "oklch(0.7 0.16 55)",
				},
				"light",
			),
			dark: createThemePalette(
				{
					background: "oklch(0.16 0.03 98)",
					foreground: "oklch(0.98 0.01 98)",
					primary: "oklch(0.77 0.14 55)",
					accent: "oklch(0.24 0.04 98)",
					accentForeground: "oklch(0.98 0.01 98)",
					ring: "oklch(0.77 0.14 55)",
				},
				"dark",
			),
		},
	},
];
