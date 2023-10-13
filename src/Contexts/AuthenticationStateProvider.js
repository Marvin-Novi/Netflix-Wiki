import React, { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { handleErrorAsync, login, logout } from "../Firebase/FirebaseEntitiesContext";
import { Text } from "../Constants/Messages";
import { Keys, StatusCode } from "../Constants/Environment";
import { LogTypes } from "../Firebase/FirebaseEntities";

export const AuthenticationStateContext = createContext(null);

function AuthenticationStateProvider({ children }) {
	const [authState, setAuthState] = useState({
		user: null,
		status: StatusCode.Pending,
	});

	useEffect(() => {
		try {
			const auth = getAuth();

			onAuthStateChanged(auth, (user) => {
				if (user) {
					setAuthState({
						user: user,
						status: StatusCode.Done,
					});
				} else {
					setAuthState({
						user: null,
						status: StatusCode.Done,
					});
				}
			});
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}
	}, []);

	async function handleLogin(email, password) {
		setAuthState({
			user: null,
			status: StatusCode.Pending,
		});

		await login(email, password).then((result) => {
			if (result?.Status === StatusCode.Success) {
				setAuthState({
					user: result.Result,
					status: result.Status,
				});
				return true;
			}

			setAuthState({
				user: null,
				status: StatusCode.Done,
			});
			return false;
		});
	}

	function handleLogout() {
		localStorage.removeItem(Keys.countryId);
		let result = logout();

		if (result) {
			setAuthState({
				user: null,
				status: StatusCode.Done,
			});
			return true;
		} else {
			return false;
		}
	}

	const data = {
		...authState,
		login: handleLogin,
		logout: handleLogout,
	};

	return <AuthenticationStateContext.Provider value={data}>{authState.status === StatusCode.Pending ? <p>{Text.Loading}</p> : children}</AuthenticationStateContext.Provider>;
}

export default AuthenticationStateProvider;
