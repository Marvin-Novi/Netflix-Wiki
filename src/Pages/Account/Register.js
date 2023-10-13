import "./Account.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router';
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import EmailField from "../../Components/TextFields/EmailField";
import TextField from "../../Components/TextFields/TextField";
import PasswordField from "../../Components/TextFields/PasswordField";
import { Routes, StatusCode, Types } from '../../Constants/Environment';
import GenderSelector from "../../Components/GenderSelector/GenderSelector";
import DateSelector from "../../Components/DateSelector/DateSelector";
import Button from "../../Components/Button/Button";
import ErrorField from "../../Components/Errorhandlers/ErrorField";
import { handleRegistrationAsync } from '../../Firebase/FirebaseEntitiesContext';
import {  RapidApi, Text } from '../../Constants/Messages';
import EditForm from '../../Components/EditForm/EditForm';
import CountrySelector from '../../Components/CountrySelector/CountrySelector';
import { getAllCountries } from '../../Data/RapidApi';
import {string} from  "../../Constants/Data";
import { Class, Id } from "../../Constants/Css";

function Register() {
  const { newemail } = useParams();
  const history = useHistory();
  const { ...authState } = useContext(AuthenticationStateContext);

  let [email, setEmail] = useState(newemail);
  let [password, setPassword] = useState(string.Empty);
  let [confirmedPassword, setConfirmedPassword] = useState(string.Empty);
  let [firstname, setFirstname] = useState(string.Empty);
  let [surname, setSurname] = useState(string.Empty);
  let [gender, setGender] = useState(string.Empty);
  let [country, setCountry] = useState(string.Empty);
  let [birthdate, setBirthdate] = useState(new Date().toISOString().slice(0, 10));
  let [errorMessage, setErrorMessage] = useState(string.Empty);
  let [countries, setCountries] = useState([]);

  const handleNavigation = useCallback((path) => {
    history.push(path);
    history.goForward();
  }, [history]);

  useEffect(() => {
    if (authState.user) {
      handleNavigation(Routes.Browse);
    } else {
      getAllCountries().then((data) => {

        if (data?.Status === RapidApi.Success) {
          setCountries(data.Result);
        }
      })
    }
  }, [setCountries, handleNavigation, authState.user]);

  async function handleNewRegistration() {

    let result = await Promise.resolve(handleRegistrationAsync(email, password, firstname, surname, confirmedPassword, gender, birthdate, country.country, country.countrycode, country.id));

    if (result?.Status === StatusCode.Success) {
      handleNavigation(Routes.Browse);
    }
    else {
      setErrorMessage(result?.Status);
    }
  }

  return (
    <div className={Class.register}>
      <header className={Class.txt_center}></header>

      <section>
        <EditForm OnSubmit={e => { e.preventDefault(); handleNewRegistration(); }}>
          <EmailField Id="emailadres" Value={email} DisplayName={Text.Emailaddress} OnInput={setEmail} />
          <PasswordField AutoComplete={Types.New_password} Id={Id.password} DisplayName={Text.Password} Placeholder={Text.Password} OnInput={setPassword} />
          <PasswordField AutoComplete={Types.New_password} Id={Id.confirmed_password} DisplayName={Text.Confirm_password} Placeholder={Text.Confirm_password} OnInput={setConfirmedPassword} />
          <TextField Id={Id.firstname} DisplayName={Text.Firstname} Placeholder={Text.Firstname} OnInput={setFirstname} />
          <TextField Id={Id.surname} DisplayName={Text.Surname} Placeholder={Text.Surname} OnInput={setSurname} />
          <GenderSelector Id={Id.gender} DisplayName={Text.Gender} OnChange={setGender} />
          <DateSelector Id={Id.birthdate} DisplayName={Text.Birthdate} Value={birthdate} OnChange={setBirthdate} />
          <CountrySelector Id={Id.country} DisplayName={Text.Country} Value={country} Items={countries ?? [{}]} OnChange={setCountry} />
          <ErrorField ErrorMessage={errorMessage} />

          <Button Class={Class.btn_primary} Text={Text.Register} Type={Types.Submit} />
        </EditForm>
      </section>
    </div>
  );
}

export default Register;
