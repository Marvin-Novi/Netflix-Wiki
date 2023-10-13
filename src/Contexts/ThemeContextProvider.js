import React, { useState, createContext } from "react";
import { Keys, Theme } from "../Constants/Css";
import { Keys as EnvironmentKeys } from "../Constants/Environment";

export const ThemeContext = createContext({});

function ThemeContextProvider({ children }) {
	const [theme, setTheme] = useState(localStorage.getItem(EnvironmentKeys.themeId) ?? Theme.dark_background);

    if (theme === Theme.light_background) {
      
        document.body.style.setProperty(Keys.background, Theme.dark_background);
        document.body.style.setProperty(Keys.text, Theme.light_text);
        localStorage.setItem(EnvironmentKeys.themeId, Theme.dark_background);
    } else {

        document.body.style.setProperty(Keys.background, Theme.light_background);
        document.body.style.setProperty(Keys.text, Theme.dark_text);
        localStorage.setItem(EnvironmentKeys.themeId, Theme.light_background);
    }

	function toggleTheme() {
		if (theme === Theme.light_background) {
			setTheme(Theme.dark_background);
			document.body.style.setProperty(Keys.background, Theme.dark_background);
			document.body.style.setProperty(Keys.background, Theme.light_text);
            
			localStorage.setItem(EnvironmentKeys.themeId, Theme.dark_background);
		} else {
			setTheme(Theme.light_background);
            document.body.style.setProperty(Keys.background, Theme.light_background);
            document.body.style.setProperty(Keys.text, Theme.dark_text);

			localStorage.setItem(EnvironmentKeys.themeId, Theme.dark_text);
		}
	}

	const contextData = {
		theme: theme,
		toggleTheme: toggleTheme,
	};

	return <ThemeContext.Provider value={contextData}>{children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;
