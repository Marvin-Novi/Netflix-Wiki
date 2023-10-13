import "./TopMenu.css";
import { menuItems } from "../../Resources/Configurations/NavConfig";
import MenuItems from "../MenuItems/MenuItems";
import Button from "../Button/Button";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { Routes, StatusCode, Types } from "../../Constants/Environment";
import Searhbar from "./Searchbar";
import { getAccount, handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";
import { Text } from "../../Constants/Messages";
import { Class, Id, Theme } from "../../Constants/Css";
import { LogTypes } from "../../Firebase/FirebaseEntities";
import {  ThemeContext } from "../../Contexts/ThemeContextProvider.js";
import Dark from "../../Resources/Images/Dark-mode.svg";
import Light from "../../Resources/Images/Light-mode.svg";

function Navbar() {
	const history = useHistory();
	const { ...authState } = useContext(AuthenticationStateContext);
	const location = useLocation();
	const [account, SetAccount] = useState({});
	const {theme, toggleTheme } = useContext(ThemeContext);

	const handleNavigation = useCallback(
		(path) => {
			history.push(path);
			history.goForward();
		},
		[history]
	);

	useEffect(() => {
		try {
			if (authState?.user?.uid) {
				let fetchData = () => {
					getAccount(authState.user.uid)
						.then((response) => {
							if (response.Status === StatusCode.Success) {
								SetAccount(response.Result);
							}
						})
						.catch(async (error) => {
							handleErrorAsync(LogTypes.Error, error);
						});
				};

				if (Object.keys(account).length === 0) fetchData();
			}
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}
	}, [account, authState, handleNavigation]);

	return (
		<nav id={Id.navigation_area}>
			<ul className={Class.menus}>
				{authState.user ? (
					<>
						<Searhbar />
						{menuItems.map((menu, index) => {
							const depthLevel = 0;
							return <MenuItems items={menu} key={`menu-${index}`} depthLevel={depthLevel} />;
						})}
						<li id={Id.userlnk} className={Class.userlnk} onClick={() => handleNavigation(Routes.Profile)}>
							{account ? `${Text.Greet} ${account?.firstname} ${account?.surname}` : Text.Loading_account}
						</li>
					</>
				) : location.pathname === Routes.Login ? (
					<>
						<Button Class={Class.btn_secondary} Text={Text.About_us} OnClick={() => handleNavigation(Routes.AboutUs)} Type={Types.Button} />
						<Button Class={Class.btn_secondary} Text={Text.Contact} OnClick={() => handleNavigation(Routes.Contact)} Type={Types.Button} />
						<Button Class={Class.btn_primary} Text={Text.Register} OnClick={() => handleNavigation(Routes.Register)} Type={Types.Button} />
					</>
				) : location.pathname === Routes.Register ? (
					<>
						<Button Class={Class.btn_secondary} Text={Text.About_us} OnClick={() => handleNavigation(Routes.AboutUs)} Type={Types.Button} />
						<Button Class={Class.btn_secondary} Text={Text.Contact} OnClick={() => handleNavigation(Routes.Contact)} Type={Types.Button} />
						<Button Class={Class.btn_primary} Text={Text.Login} OnClick={() => handleNavigation(Routes.Login)} Type={Types.Button} />
					</>
				) : (
					<>
						<Button Class={Class.btn_secondary} Text={Text.About_us} OnClick={() => handleNavigation(Routes.AboutUs)} Type={Types.Button} />
						<Button Class={Class.btn_secondary} Text={Text.Contact} OnClick={() => handleNavigation(Routes.Contact)} Type={Types.Button} />
						<Button Class={Class.btn_primary} Text={Text.Register} OnClick={() => handleNavigation(Routes.Register)} Type={Types.Button} />
						<Button Class={Class.btn_primary} Text={Text.Login} OnClick={() => handleNavigation(Routes.Login)} Type={Types.Button} />
					</>
				)}
				<Button Class={Class.btn_primary} Image={theme === Theme.dark ? Light: Dark} Text={theme === Theme.dark ? Text.Light: Text.Dark} OnClick={toggleTheme} Type={Types.Button} />
			</ul>
		</nav>
	);
}

export default Navbar;
