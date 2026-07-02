import { getThemeCssVariableName } from "./palette";
import type { ThemeDefinition, ThemePalette, ThemeTokenName } from "./types";

function buildThemeBlock(selector: string, palette: ThemePalette, scheme: "light" | "dark") {
	const rules = Object.entries(palette)
		.map(([token, value]) => `${getThemeCssVariableName(token as ThemeTokenName)}:${value};`)
		.join("");

	return `${selector}{color-scheme:${scheme};${rules}}`;
}

export function buildThemeCss(theme: ThemeDefinition): string {
	return [
		buildThemeBlock(`html[data-theme="${theme.id}"]`, theme.palette.light, "light"),
		buildThemeBlock(`html.dark[data-theme="${theme.id}"]`, theme.palette.dark, "dark"),
	].join("\n");
}
