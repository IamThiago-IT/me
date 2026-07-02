export type ThemeSource = "cookie" | "schedule" | "fallback";

export type ThemeTokenName =
	| "background"
	| "foreground"
	| "card"
	| "cardForeground"
	| "popover"
	| "popoverForeground"
	| "primary"
	| "primaryForeground"
	| "secondary"
	| "secondaryForeground"
	| "muted"
	| "mutedForeground"
	| "accent"
	| "accentForeground"
	| "destructive"
	| "border"
	| "input"
	| "ring"
	| "chart1"
	| "chart2"
	| "chart3"
	| "chart4"
	| "chart5"
	| "sidebar"
	| "sidebarForeground"
	| "sidebarPrimary"
	| "sidebarPrimaryForeground"
	| "sidebarAccent"
	| "sidebarAccentForeground"
	| "sidebarBorder"
	| "sidebarRing";

export type ThemePalette = Record<ThemeTokenName, string>;

export type ThemeWindowEdge = {
	month: number;
	day: number;
};

export type ThemeSchedule = {
	start: ThemeWindowEdge;
	end: ThemeWindowEdge;
	timeZone?: string;
	priority?: number;
	locales?: string[];
	countries?: string[];
};

export type ThemeDefinition = {
	id: string;
	label: string;
	description?: string;
	schedule?: ThemeSchedule;
	palette: {
		light: ThemePalette;
		dark: ThemePalette;
	};
};

export type ThemeResolutionInput = {
	now?: Date;
	preferredThemeId?: string | null;
	locale?: string;
	country?: string;
	pathname?: string;
};

export type ThemeResolveHookContext = {
	input: ThemeResolutionInput;
	themes: ThemeDefinition[];
	currentTheme: ThemeDefinition;
	source: ThemeSource;
};

export type ThemeResolveHook = (
	context: ThemeResolveHookContext,
) => ThemeDefinition | null | Promise<ThemeDefinition | null>;

export type ThemeHooks = {
	beforeResolve?: ThemeResolveHook[];
	afterResolve?: ThemeResolveHook[];
};

export type ThemeConfig = {
	defaultThemeId: string;
	timeZone: string;
	themes: ThemeDefinition[];
	hooks?: ThemeHooks;
};

export type ThemeResolution = {
	theme: ThemeDefinition;
	source: ThemeSource;
};
