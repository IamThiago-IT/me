"use server";

import { cookies } from "next/headers";

import { THEME_COOKIE_NAME } from "./constants";

export async function setThemePreference(themeId: string | null) {
	const cookieStore = await cookies();

	if (!themeId || themeId === "auto") {
		cookieStore.delete(THEME_COOKIE_NAME);
		return;
	}

	cookieStore.set(THEME_COOKIE_NAME, themeId, {
		path: "/",
		maxAge: 60 * 60 * 24 * 365,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});
}
