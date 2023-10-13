import "./TopMenu.css";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../Resources/Images/Logo.svg";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { Routes } from "../../Constants/Environment";
import Navbar from "./Navbar";
import { Class, Id } from "../../Constants/Css";
import { Text } from "../../Constants/Messages";
import { handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";
import { LogTypes } from "../../Firebase/FirebaseEntities";

function TopMenu() {
	const history = useHistory();
	const { ...authState } = useContext(AuthenticationStateContext);

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

	return (
		<div className={Class.topmenu}>
			<div id={Id.logo_area} onClick={() => handleNavigation(authState.user ? Routes.Browse : Routes.Home)}>
				<img src={Logo} className={Class.App_logo} alt={Text.Logo} />
			</div>
			<Navbar />
		</div>
	);
}

export default TopMenu;
