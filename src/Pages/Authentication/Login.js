import "./Login.css";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EmailField from "../../Components/TextFields/EmailField";
import PasswordField from "../../Components/TextFields/PasswordField";
import Button from "../../Components/Button/Button";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import EditForm from "../../Components/EditForm/EditForm";
import { Routes, Types } from "../../Constants/Environment";
import { string } from "../../Constants/Data";
import { Class } from "../../Constants/Css";
import { Text } from "../../Constants/Messages";
import ErrorField from "../../Components/Errorhandlers/ErrorField";
import { handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";
import { LogTypes } from "../../Firebase/FirebaseEntities";

function Login() {
	let history = useHistory();
	const [email, setEmail] = useState(string.Empty);
	const [password, setPassword] = useState(string.Empty);
	const [errorMessage, setErrorMessage] = useState(string.Empty);
	const { login, ...authState } = useContext(AuthenticationStateContext);

	useEffect(() => {
		try {
			if (authState.user) {
				handleNavigation(Routes.Browse);
			}
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}
	});

	function handleNavigation(path) {
		history.push(path);
		history.goForward();
	}

	function handleLogin() {
		if (email && password && login(email, password)) {
			handleNavigation(Routes.Browse);
		} else {
			setErrorMessage(Text.Credentials);
		}
	}

	return (
		<div className={Class.authentication}>
			<header className={Class.txt_center}></header>

			<section>
				<EditForm
					OnSubmit={(e) => {
						e.preventDefault();
						handleLogin();
					}}>
					<label>{Text.Emailaddress}</label>
					<EmailField Placeholder={Text.Emailaddress} OnInput={setEmail} />

					<label>{Text.Password}</label>
					<PasswordField AutoComplete={Types.Current_password} Placeholder={Text.Password} OnInput={setPassword} />

					<ErrorField ErrorMessage={errorMessage} />
					<Button Class={Class.btn_primary} Text={Text.Login} Type={Types.Submit} />
				</EditForm>
			</section>
		</div>
	);
}

export default Login;
