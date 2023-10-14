import React, { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { handleErrorAsync, login, logout } from "../Firebase/FirebaseEntitiesContext";
import { Text } from "../Constants/Messages";
import { LocalStorageKeys, StatusCode } from "../Constants/Environment";
import { LogTypes } from "../Firebase/FirebaseEntities";

export const AuthenticationStateContext = createContext(null);

function AuthenticationStateProvider({ children }) {
	const [authState, setAuthState] = useState({
		user: null,
		status: StatusCode.PENDING,
	});

	useEffect(() => {
		try {
			const auth = getAuth();

			onAuthStateChanged(auth, (user) => {
				if (user) {
					setAuthState({
						user: user,
						status: StatusCode.DONE,
					});
				} else {
					setAuthState({
						user: null,
						status: StatusCode.DONE,
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
			status: StatusCode.PENDING,
		});

		await login(email, password).then((result) => {
			if (result?.Status === StatusCode.SUCCESS) {
				setAuthState({
					user: result.Result,
					status: result.Status,
				});
				return true;
			}

			setAuthState({
				user: null,
				status: StatusCode.DONE,
			});
			return false;
		});
	}

	function handleLogout() {
		localStorage.removeItem(LocalStorageKeys.COUNTRY_ID);
		let result = logout();

		if (result) {
			setAuthState({
				user: null,
				status: StatusCode.DONE,
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

	return <AuthenticationStateContext.Provider value={data}>{authState.status === StatusCode.PENDING ? <p>{Text.Loading}</p> : children}</AuthenticationStateContext.Provider>;
}

export default AuthenticationStateProvider;
