import { defaultThemeHooks } from "./hooks";
import { themeRegistry } from "./registry";
import type { ThemeConfig } from "./types";

export const themeConfig: ThemeConfig = {
	defaultThemeId: "default",
	timeZone: "America/Sao_Paulo",
	themes: themeRegistry,
	hooks: defaultThemeHooks,
};
