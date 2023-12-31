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
import { ThemeContext } from "../../Contexts/ThemeContextProvider.js";
import Dark from "../../Resources/Images/Dark-mode.svg";
import Light from "../../Resources/Images/Light-mode.svg";

function Navbar() {
	const history = useHistory();
	const { ...authState } = useContext(AuthenticationStateContext);
	const location = useLocation();
	const [account, SetAccount] = useState({});
	const { theme, toggleTheme } = useContext(ThemeContext);

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
							if (response.Status === StatusCode.SUCCESS) {
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
		<nav id={Id.NAVIGATION_AREA}>
			<ul className={Class.MENUS}>
				{authState.user ? (
					<>
						<Searhbar />
						{menuItems.map((menu, index) => {
							const depthLevel = 0;
							return <MenuItems items={menu} key={`menu-${index}`} depthLevel={depthLevel} />;
						})}
						<li id={Id.USERLNK} className={Class.USERLNK} onClick={() => handleNavigation(Routes.PROFILE)}>
							{account ? `${Text.Greet} ${account?.firstname} ${account?.surname}` : Text.Loading_account}
						</li>
					</>
				) : location.pathname === Routes.LOGIN ? (
					<>
						<Button Class={Class.BTN_SECONDARY} Text={Text.About_us} OnClick={() => handleNavigation(Routes.ABOUT_US)} Type={Types.BUTTON} />
						<Button Class={Class.BTN_SECONDARY} Text={Text.Contact} OnClick={() => handleNavigation(Routes.CONTACT)} Type={Types.BUTTON} />
						<Button Class={Class.BTN_PRIMARY} Text={Text.Register} OnClick={() => handleNavigation(Routes.REGISTER)} Type={Types.BUTTON} />
					</>
				) : location.pathname === Routes.REGISTER ? (
					<>
						<Button Class={Class.BTN_SECONDARY} Text={Text.About_us} OnClick={() => handleNavigation(Routes.ABOUT_US)} Type={Types.BUTTON} />
						<Button Class={Class.BTN_SECONDARY} Text={Text.Contact} OnClick={() => handleNavigation(Routes.CONTACT)} Type={Types.BUTTON} />
						<Button Class={Class.BTN_PRIMARY} Text={Text.Login} OnClick={() => handleNavigation(Routes.LOGIN)} Type={Types.BUTTON} />
					</>
				) : (
					<>
						<Button Class={Class.BTN_SECONDARY} Text={Text.About_us} OnClick={() => handleNavigation(Routes.ABOUT_US)} Type={Types.BUTTON} />
						<Button Class={Class.BTN_SECONDARY} Text={Text.Contact} OnClick={() => handleNavigation(Routes.CONTACT)} Type={Types.BUTTON} />
						<Button Class={Class.BTN_PRIMARY} Text={Text.Register} OnClick={() => handleNavigation(Routes.REGISTER)} Type={Types.BUTTON} />
						<Button Class={Class.BTN_PRIMARY} Text={Text.Login} OnClick={() => handleNavigation(Routes.LOGIN)} Type={Types.BUTTON} />
					</>
				)}
				<Button
					Class={Class.BTN_PRIMARY}
					Image={theme !== Theme.DARK_BACKGROUND ? Light : Dark}
					Text={theme !== Theme.DARK_BACKGROUND ? Text.Light : Text.Dark}
					OnClick={toggleTheme}
					Type={Types.BUTTON}
				/>
			</ul>
		</nav>
	);
}

export default Navbar;
