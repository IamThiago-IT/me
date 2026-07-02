import { defaultThemeHooks } from "./hooks";
import { themeRegistry } from "./registry";
import type {
	ThemeConfig,
	ThemeDefinition,
	ThemeHooks,
	ThemeResolution,
	ThemeResolutionInput,
} from "./types";

function isWithinWindow(
	now: Date,
	start: { month: number; day: number },
	end: { month: number; day: number },
	timeZone: string,
) {
	const formatter = new Intl.DateTimeFormat("en-US", {
		timeZone,
		month: "numeric",
		day: "numeric",
	});
	const parts = formatter.formatToParts(now);
	const month = Number(parts.find((part) => part.type === "month")?.value);
	const day = Number(parts.find((part) => part.type === "day")?.value);

	if (Number.isNaN(month) || Number.isNaN(day)) {
		return false;
	}

	const current = month * 100 + day;
	const rangeStart = start.month * 100 + start.day;
	const rangeEnd = end.month * 100 + end.day;

	if (rangeStart <= rangeEnd) {
		return current >= rangeStart && current <= rangeEnd;
	}

	return current >= rangeStart || current <= rangeEnd;
}

function matchesThemeFilters(
	theme: ThemeDefinition,
	input: ThemeResolutionInput,
	defaultTimeZone: string,
) {
	if (!theme.schedule) {
		return false;
	}

	if (theme.schedule.locales?.length && input.locale) {
		if (!theme.schedule.locales.includes(input.locale)) {
			return false;
		}
	}

	if (theme.schedule.countries?.length && input.country) {
		if (!theme.schedule.countries.includes(input.country)) {
			return false;
		}
	}

	const timeZone = theme.schedule.timeZone ?? defaultTimeZone;
	return isWithinWindow(input.now ?? new Date(), theme.schedule.start, theme.schedule.end, timeZone);
}

async function runHooks(
	hooks: NonNullable<ThemeHooks["beforeResolve"]>,
	context: {
		input: ThemeResolutionInput;
		themes: ThemeDefinition[];
		currentTheme: ThemeDefinition;
		source: ThemeResolution["source"];
	},
) {
	let nextTheme = context.currentTheme;

	for (const hook of hooks) {
		const result = await hook({
			input: context.input,
			themes: context.themes,
			currentTheme: nextTheme,
			source: context.source,
		});

		if (result) {
			nextTheme = result;
		}
	}

	return nextTheme;
}

export function createThemeConfig(config: Partial<ThemeConfig> = {}): ThemeConfig {
	return {
		defaultThemeId: config.defaultThemeId ?? "default",
		timeZone: config.timeZone ?? "America/Sao_Paulo",
		themes: config.themes ?? themeRegistry,
		hooks: {
			beforeResolve: config.hooks?.beforeResolve ?? defaultThemeHooks.beforeResolve ?? [],
			afterResolve: config.hooks?.afterResolve ?? defaultThemeHooks.afterResolve ?? [],
		},
	};
}

export async function resolveTheme(
	input: ThemeResolutionInput,
	config: ThemeConfig = createThemeConfig(),
): Promise<ThemeResolution> {
	const now = input.now ?? new Date();
	const themes = config.themes;
	const fallbackTheme =
		themes.find((theme) => theme.id === config.defaultThemeId) ?? themes[0];

	if (!fallbackTheme) {
		throw new Error("No themes configured.");
	}

	const themeById = new Map(themes.map((theme) => [theme.id, theme]));
	const requestedTheme = input.preferredThemeId ? themeById.get(input.preferredThemeId) : undefined;

	let source: ThemeResolution["source"] = "fallback";
	let currentTheme = fallbackTheme;

	if (requestedTheme) {
		currentTheme = requestedTheme;
		source = "cookie";
	} else {
		const scheduledThemes = themes
			.filter((theme) => matchesThemeFilters(theme, { ...input, now }, config.timeZone))
			.sort((left, right) => (right.schedule?.priority ?? 0) - (left.schedule?.priority ?? 0));

		if (scheduledThemes[0]) {
			currentTheme = scheduledThemes[0];
			source = "schedule";
		}
	}

	const beforeResolve = config.hooks?.beforeResolve ?? [];
	const afterResolve = config.hooks?.afterResolve ?? [];

	currentTheme = await runHooks(beforeResolve, {
		input: { ...input, now },
		themes,
		currentTheme,
		source,
	});

	currentTheme = await runHooks(afterResolve, {
		input: { ...input, now },
		themes,
		currentTheme,
		source,
	});

	return {
		theme: currentTheme,
		source,
	};
}
