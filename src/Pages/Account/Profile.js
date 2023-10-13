import "./Account.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import TextField from "../../Components/TextFields/TextField";
import { Keys, Routes, StatusCode, Types } from "../../Constants/Environment";
import GenderSelector from "../../Components/GenderSelector/GenderSelector";
import DateSelector from "../../Components/DateSelector/DateSelector";
import Button from "../../Components/Button/Button";
import ErrorField from "../../Components/Errorhandlers/ErrorField";
import { updateAccountAsync, updateCountryAsync, getAccount, getCountry } from "../../Firebase/FirebaseEntitiesContext";
import { getAllCountries } from "../../Data/RapidApi";
import { Text } from "../../Constants/Messages";
import EditForm from "../../Components/EditForm/EditForm";
import CountrySelector from "../../Components/CountrySelector/CountrySelector";
import CustomLink from "../../Components/Base/CustomLink";
import { RapidApi } from "../../Constants/Messages";
import { string } from "../../Constants/Data";
import { Class, Id } from "../../Constants/Css";

function Profile() {
	const history = useHistory();
	const { logout, ...authState } = useContext(AuthenticationStateContext);

	let [firstname, setFirstname] = useState(string.Empty);
	let [surname, setSurname] = useState(string.Empty);
	let [gender, setGender] = useState(string.Empty);
	let [country, setCountry] = useState(string.Empty);
	let [birthdate, setBirthdate] = useState(string.Empty);
	let [errorMessage, setErrorMessage] = useState(string.Empty);
	let [countries, setCountries] = useState([]);

	const handleNavigation = useCallback(
		(path) => {
			history.push(path);
			history.goForward();
		},
		[history]
	);

	useEffect(() => {
		if (!authState?.user?.uid) {
			handleNavigation(Routes.Login);
		} else if (!firstname && !surname && !gender && !birthdate && !country) {
			getAccount(authState.user.uid).then((response) => {
				if (response?.Result && response?.Status === StatusCode.Success) {
					let account = response.Result;
					setFirstname(account.firstname);
					setSurname(account.surname);
					setGender(account.gender);
					setBirthdate(account.birthdate);
				}
			});

			getCountry(authState.user.uid).then((response) => {
				if (response?.Result && response?.Status === StatusCode.Success) {
					let countryItem = response.Result;
					setCountry(countryItem);
				}
			});

			Promise.resolve(getAllCountries()).then((data) => {
				if (data.Status === RapidApi.Success) {
					setCountries(data.Result);
				}
			});
		}
	}, [countries, authState, birthdate, country, firstname, gender, surname, handleNavigation]);

	async function handleUpdate() {
		if (window.confirm(Text.Proceed)) {
			let accountResult = await updateAccountAsync(authState?.user?.uid, firstname, surname, gender, birthdate);

			if (accountResult?.Status !== StatusCode.Success) {
				setErrorMessage(accountResult?.Status);
				return;
			}

			let countryResult = await updateCountryAsync(authState?.user?.uid, country.country, country.countrycode, country.id);

			if (countryResult?.Status !== StatusCode.Success) {
				setErrorMessage(countryResult?.Status);
				return;
			}
			localStorage.setItem(Keys.countryId, country.id);

			alert(Text.Profile_update);

			handleNavigation(Routes.Browse);
			window.location.reload();
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
					<TextField Id={Id.firstname} DisplayName={Text.Firstname} Placeholder={Text.Firstname} Value={firstname} OnInput={setFirstname} />
					<TextField Id={Id.surname} DisplayName={Text.Surname} Placeholder={Text.Surname} Value={surname} OnInput={setSurname} />
					<GenderSelector Id={Id.gender} DisplayName={Text.Gender} Value={gender} OnChange={setGender} />
					<DateSelector Id={Id.birthdate} DisplayName={Text.Birthdate} Value={birthdate} OnChange={setBirthdate} />
					<CountrySelector Id={Id.country} DisplayName={Text.Country} Value={country} Items={countries} OnChange={setCountry} />
					<Button Class={Class.btn_primary} Text={Text.Update} Type={Types.Submit} />
					<Button Class={Class.btn_secondary} Text={Text.Previous_page} Type={Types.Button} OnClick={() => history.goBack()} />
					<Button Class={Class.btn_secondary} Text={Text.Change_password} Type={Types.Button} OnClick={() => handleNavigation(Routes.PasswordUpdate)} />
					<CustomLink Title={Text.Delete_account} To={Routes.AccountDelete} />
					<ErrorField ErrorMessage={errorMessage} />
				</EditForm>
			</section>
		</div>
	);
}

export default Profile;
