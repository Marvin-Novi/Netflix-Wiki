import "./Login.css";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { Routes } from "../../Constants/Environment";
import { Class } from "../../Constants/Css";
import { Text } from "../../Constants/Messages";
import { LogTypes } from "../../Firebase/FirebaseEntities";
import { handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";

function Login() {
	let history = useHistory();
	const { logout } = useContext(AuthenticationStateContext);

	useEffect(() => {
		try {
			logout();
			handleNavigation(Routes.LOGIN);
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}
	});

	function handleNavigation(path) {
		history.push(path);
		history.goForward();
	}

	return (
		<div className={Class.AUTHENTICATION}>
			<header className={Class.TXT_CENTER}></header>
			<section>
				<p>{Text.Pending}</p>
			</section>
		</div>
	);
}

export default Login;
