import React, { useState, createContext } from "react";
import { CssCustomVariables, Theme } from "../Constants/Css";
import { LocalStorageKeys } from "../Constants/Environment";

export const ThemeContext = createContext({});

function ThemeContextProvider({ children }) {
	const [theme, setTheme] = useState(localStorage.getItem(LocalStorageKeys.THEME_ID) ?? Theme.DARK_BACKGROUND);

	if (theme === Theme.LIGHT_BACKGROUND) {
		document.body.style.setProperty(CssCustomVariables.BACKGROUND, Theme.DARK_BACKGROUND);
		document.body.style.setProperty(CssCustomVariables.TEXT, Theme.LIGHT_TEXT);
		localStorage.setItem(LocalStorageKeys.THEME_ID, Theme.DARK_BACKGROUND);
	} else {
		document.body.style.setProperty(CssCustomVariables.BACKGROUND, Theme.LIGHT_BACKGROUND);
		document.body.style.setProperty(CssCustomVariables.TEXT, Theme.DARK_TEXT);
		localStorage.setItem(LocalStorageKeys.THEME_ID, Theme.LIGHT_BACKGROUND);
	}

	function toggleTheme() {
		if (theme === Theme.LIGHT_BACKGROUND) {
			setTheme(Theme.DARK_BACKGROUND);
			document.body.style.setProperty(CssCustomVariables.BACKGROUND, Theme.DARK_BACKGROUND);
			document.body.style.setProperty(CssCustomVariables.BACKGROUND, Theme.LIGHT_TEXT);

			localStorage.setItem(LocalStorageKeys.THEME_ID, Theme.DARK_BACKGROUND);
		} else {
			setTheme(Theme.LIGHT_BACKGROUND);
			document.body.style.setProperty(CssCustomVariables.BACKGROUND, Theme.LIGHT_BACKGROUND);
			document.body.style.setProperty(CssCustomVariables.TEXT, Theme.DARK_TEXT);

			localStorage.setItem(LocalStorageKeys.THEME_ID, Theme.DARK_TEXT);
		}
	}

	const contextData = {
		theme: theme,
		toggleTheme: toggleTheme,
	};

	return <ThemeContext.Provider value={contextData}>{children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;
