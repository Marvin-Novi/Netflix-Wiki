import "./Account.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import EmailField from "../../Components/TextFields/EmailField";
import TextField from "../../Components/TextFields/TextField";
import PasswordField from "../../Components/TextFields/PasswordField";
import { Routes, StatusCode, Types } from "../../Constants/Environment";
import GenderSelector from "../../Components/GenderSelector/GenderSelector";
import DateSelector from "../../Components/DateSelector/DateSelector";
import Button from "../../Components/Button/Button";
import ErrorField from "../../Components/Errorhandlers/ErrorField";
import { handleRegistrationAsync } from "../../Firebase/FirebaseEntitiesContext";
import { RapidApi, Text } from "../../Constants/Messages";
import EditForm from "../../Components/EditForm/EditForm";
import CountrySelector from "../../Components/CountrySelector/CountrySelector";
import { getAllCountries } from "../../Data/RapidApi";
import { String } from "../../Constants/Data";
import { Class, Id } from "../../Constants/Css";

function Register() {
	const { newemail } = useParams();
	const history = useHistory();
	const { ...authState } = useContext(AuthenticationStateContext);

	let [email, setEmail] = useState(newemail);
	let [password, setPassword] = useState(String.Empty);
	let [confirmedPassword, setConfirmedPassword] = useState(String.Empty);
	let [firstname, setFirstname] = useState(String.Empty);
	let [surname, setSurname] = useState(String.Empty);
	let [gender, setGender] = useState(String.Empty);
	let [country, setCountry] = useState(String.Empty);
	let [birthdate, setBirthdate] = useState(new Date().toISOString().slice(0, 10));
	let [errorMessage, setErrorMessage] = useState(String.Empty);
	let [countries, setCountries] = useState([]);

	const handleNavigation = useCallback(
		(path) => {
			history.push(path);
			history.goForward();
		},
		[history]
	);

	useEffect(() => {
		if (authState.user) {
			handleNavigation(Routes.BROWSE);
		} else {
			getAllCountries().then((data) => {
				if (data?.Status === RapidApi.Success) {
					setCountries(data.Result);
				}
			});
		}
	}, [setCountries, handleNavigation, authState.user]);

	async function handleNewRegistration() {
		let result = await Promise.resolve(
			handleRegistrationAsync(email, password, firstname, surname, confirmedPassword, gender, birthdate, country.country, country.countrycode, country.id)
		);

		if (result?.Status === StatusCode.SUCCESS) {
			handleNavigation(Routes.BROWSE);
		} else {
			setErrorMessage(result?.Status);
		}
	}

	return (
		<div className={Class.REGISTER}>
			<header className={Class.TXT_CENTER}></header>

			<section>
				<EditForm
					OnSubmit={(e) => {
						e.preventDefault();
						handleNewRegistration();
					}}>
					<EmailField Id="emailadres" Value={email} DisplayName={Text.Emailaddress} OnInput={setEmail} />
					<PasswordField AutoComplete={Types.NEW_PASSWORD} Id={Id.PASSWORD} DisplayName={Text.Password} Placeholder={Text.Password} OnInput={setPassword} />
					<PasswordField
						AutoComplete={Types.NEW_PASSWORD}
						Id={Id.CONFIRMED_PASSWORD}
						DisplayName={Text.Confirm_password}
						Placeholder={Text.Confirm_password}
						OnInput={setConfirmedPassword}
					/>
					<TextField Id={Id.FIRSTNAME} DisplayName={Text.Firstname} Placeholder={Text.Firstname} OnInput={setFirstname} />
					<TextField Id={Id.SURNAME} DisplayName={Text.Surname} Placeholder={Text.Surname} OnInput={setSurname} />
					<GenderSelector Id={Id.GENDER} DisplayName={Text.Gender} OnChange={setGender} />
					<DateSelector Id={Id.BIRTHDATE} DisplayName={Text.Birthdate} Value={birthdate} OnChange={setBirthdate} />
					<CountrySelector Id={Id.COUNTRY} DisplayName={Text.Country} Value={country} Items={countries ?? [{}]} OnChange={setCountry} />
					<ErrorField ErrorMessage={errorMessage} />

					<Button Class={Class.BTN_PRIMARY} Text={Text.Register} Type={Types.SUBMIT} />
				</EditForm>
			</section>
		</div>
	);
}

export default Register;
