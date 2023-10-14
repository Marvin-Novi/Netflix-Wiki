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
import { String} from "../../Constants/Data";
import { Class, Id } from "../../Constants/Css";
import { LogTypes } from "../../Firebase/FirebaseEntities";

function PasswordUpdate() {
	const history = useHistory();
	const { logout, ...authState } = useContext(AuthenticationStateContext);

	let [currentPassword, setCurrentPassword] = useState(String.Empty);
	let [newPassword, setNewPassword] = useState(String.Empty);
	let [confirmedPassword, setConfirmedPassword] = useState(String.Empty);
	let [errorMessage, setErrorMessage] = useState(String.Empty);

	useEffect(() => {
		try {
			if (!authState.user) {
				handleNavigation(Routes.LOGIN);
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
					if (response.Result && response.Status === StatusCode.SUCCESS) {
						await changePassword(authState.user, newPassword, confirmedPassword)
							.then((result) => {
								if (result?.Status === StatusCode.SUCCESS) {
									alert(Text.Password_updated);
									handleNavigation(Routes.BROWSE);
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
		<div className={Class.ACCOUNT}>
			<header className={Class.TXT_CENTER}></header>

			<section>
				<EditForm
					OnSubmit={(e) => {
						e.preventDefault();
						handleUpdate();
					}}>
					<EmailField Id={Id.EMAILADRESS} Value={authState?.user?.email} DisplayName={Text.Emailaddress} Disabled={true} />
					<PasswordField
						Id={Id.CURRENT_PASSWORD}
						AutoComplete={Types.CURRENT_PASSWORD}
						DisplayName={Text.Current_password}
						Placeholder={Text.Current_password}
						OnInput={setCurrentPassword}
					/>
					<PasswordField Id={Id.new_password} AutoComplete={Types.NEW_PASSWORD} DisplayName={Text.Password} Placeholder={Text.Password} OnInput={setNewPassword} />
					<PasswordField
						Id={Id.CONFIRMED_PASSWORD}
						AutoComplete={Types.NEW_PASSWORD}
						DisplayName={Text.Confirm_password}
						Placeholder={Text.Confirm_password}
						OnInput={setConfirmedPassword}
					/>
					<ErrorField ErrorMessage={errorMessage} />

					<Button Class={Class.BTN_PRIMARY} Text={Text.Update} Type={Types.SUBMIT} />
					<Button Class={Class.BTN_SECONDARY} Text={Text.Previous_page} Type={Types.BUTTON} OnClick={() => history.goBack()} />
				</EditForm>
			</section>
		</div>
	);
}

export default PasswordUpdate;
