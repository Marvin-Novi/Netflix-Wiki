import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScopedContextProvider from "./Contexts/ScopedContextProvider";
import AuthenticationStateContext from "./Contexts/AuthenticationStateProvider";
import ThemeContextProvider from "./Contexts/ThemeContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthenticationStateContext>
			<ThemeContextProvider>
				<ScopedContextProvider>
					<App />
				</ScopedContextProvider>
			</ThemeContextProvider>
		</AuthenticationStateContext>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
