import "./Account.css";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import PasswordField from "../../Components/TextFields/PasswordField";
import { Routes, StatusCode, Types } from "../../Constants/Environment";
import Button from "../../Components/Button/Button";
import ErrorField from "../../Components/Errorhandlers/ErrorField";
import { changePassword, handleErrorAsync, login } from "../../Firebase/FirebaseEntitiesContext";
import { Text } from "../../Constants/Messages";
import EditForm from "../../Components/EditForm/EditForm";
import EmailField from "../../Components/TextFields/EmailField";
import { string } from "../../Constants/Data";
import { Class, Id } from "../../Constants/Css";
import { LogTypes } from "../../Firebase/FirebaseEntities";

function PasswordUpdate() {
	const history = useHistory();
	const { logout, ...authState } = useContext(AuthenticationStateContext);

	let [currentPassword, setCurrentPassword] = useState(string.Empty);
	let [newPassword, setNewPassword] = useState(string.Empty);
	let [confirmedPassword, setConfirmedPassword] = useState(string.Empty);
	let [errorMessage, setErrorMessage] = useState(string.Empty);

	useEffect(() => {
		try {
			if (!authState.user) {
				handleNavigation(Routes.Login);
			}
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}
	});

	function handleNavigation(path) {
		history.push(path);
		history.goForward();
	}

	async function handleUpdate() {
		try {
			setErrorMessage(null);
			if (window.confirm(Text.Proceed)) {
				login(authState.user.email, currentPassword).then(async (response) => {
					if (response.Result && response.Status === StatusCode.Success) {
						await changePassword(authState.user, newPassword, confirmedPassword)
							.then((result) => {
								if (result?.Status === StatusCode.Success) {
									alert(Text.Password_updated);
									handleNavigation(Routes.Browse);
								} else {
									setErrorMessage(result?.Status);
								}
							})
							.catch((error) => {
								handleErrorAsync(LogTypes.Error, error);
							});
					} else {
						setErrorMessage(response?.Status);
					}
				});
			}
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}
	}

	return (
		<div className={Class.account}>
			<header className={Class.txt_center}></header>

			<section>
				<EditForm
					OnSubmit={(e) => {
						e.preventDefault();
						handleUpdate();
					}}>
					<EmailField Id={Id.emailadres} Value={authState?.user?.email} DisplayName={Text.Emailaddress} Disabled={true} />
					<PasswordField
						Id={Id.current_password}
						AutoComplete={Types.Current_password}
						DisplayName={Text.Current_password}
						Placeholder={Text.Current_password}
						OnInput={setCurrentPassword}
					/>
					<PasswordField Id={Id.new_password} AutoComplete={Types.New_password} DisplayName={Text.Password} Placeholder={Text.Password} OnInput={setNewPassword} />
					<PasswordField
						Id={Id.confirmed_password}
						AutoComplete={Types.New_password}
						DisplayName={Text.Confirm_password}
						Placeholder={Text.Confirm_password}
						OnInput={setConfirmedPassword}
					/>
					<ErrorField ErrorMessage={errorMessage} />

					<Button Class={Class.btn_primary} Text={Text.Update} Type={Types.Submit} />
					<Button Class={Class.btn_secondary} Text={Text.Previous_page} Type={Types.Button} OnClick={() => history.goBack()} />
				</EditForm>
			</section>
		</div>
	);
}

export default PasswordUpdate;
