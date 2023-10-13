import "./Account.css";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { Routes, Types } from "../../Constants/Environment";
import { deleteAsync, handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";
import { Text } from "../../Constants/Messages";
import { Class } from "../../Constants/Css";
import { LogTypes } from "../../Firebase/FirebaseEntities";

function AccountDelete() {
	const history = useHistory();
	const { logout, ...authState } = useContext(AuthenticationStateContext);

	function handleDelete() {
		deleteAsync(authState.user)
			.then((isSuccess) => {
				if (isSuccess) {
					logout();
					handleNavigation(Routes.Home);
				}
			})
			.catch((error) => {
				handleErrorAsync(LogTypes.Error, error);
			});
	}

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

	return (
		<div className={Class.account}>
			<header className={Class.txt_center}></header>

			<section>
				<div className={Class.editform}>
					<label>{Text.Delete_account}?</label>
					<Button Class={Class.btn_primary} Text={Text.Delete} OnClick={() => handleDelete()} Type={Types.Button} />
					<Button Class={Class.btn_secondary} Text={Text.Previous_page} Type={Types.Button} OnClick={() => history.goBack()} />
				</div>
			</section>
		</div>
	);
}

export default AccountDelete;
