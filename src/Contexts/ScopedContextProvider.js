import React, { createContext, useState } from "react";
import { string } from "../Constants/Data";

export const ScopedContext = createContext(null);

function ScopedContextProvider({ children }) {
	let [selectedCountry, setSelectedCountry] = useState(string.Empty);

	const data = {
		setSelectedCountry: setSelectedCountry,
		selectedCountry: selectedCountry,
	};

	return <ScopedContext.Provider value={data}>{children}</ScopedContext.Provider>;
}

export default ScopedContextProvider;
