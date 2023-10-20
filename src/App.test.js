import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Components/Button/Button";
import TextField from "./Components/TextFields/TextField";
import EmailField from "./Components/TextFields/EmailField";
import PasswordField from "./Components/TextFields/PasswordField";
import { Class, Id } from "./Constants/Css";
import { Text } from "./Constants/Messages";
import { Types } from "./Constants/Environment";
import CountrySelector from "./Components/CountrySelector/CountrySelector";

test("Rendering <Button /> element", () => {
	const { getByText } = render(<Button Class={Class.BTN_SECONDARY} Text={Text.Loading} OnClick={() => {}} Type={Types.BUTTON} />);
	const buttonElement = getByText(Text.Loading);
	expect(buttonElement).toBeInTheDocument();
});

test("Rendering <TextField /> element", () => {
	const { getByText } = render(<TextField Id={Id.FIRSTNAME} DisplayName={Text.Firstname} Placeholder={Text.Firstname} Value={Text.Firstname} OnInput={() => {}} />);
	const buttonElement = getByText(Text.Firstname);
	expect(buttonElement).toBeInTheDocument();
});

test("Rendering <EmailField /> element", () => {
	const { getByPlaceholderText } = render(<EmailField Id={Id.EMAILADRESS} Value={Text.Emailaddress} DisplayName={Text.Emailaddress} />);
	const buttonElement = getByPlaceholderText(Text.Emailaddress);
	expect(buttonElement).toBeInTheDocument();
});

test("Rendering <CountrySelector /> element", () => {
	const nl = {
		id: 67,
		country: "Netherlands ",
		countrycode: "NL",
		expiring: 53,
		nl7: 94,
		tvids: 6309,
		tmovs: 4305,
		tseries: 2004,
	};

	const countries = [nl];

	const { getByLabelText } = render(<CountrySelector Id={Id.COUNTRY} DisplayName={Text.Country} Value={nl} Items={countries} OnChange={() => {}} />);
	const buttonElement = getByLabelText(Text.Country);
	expect(buttonElement).toBeInTheDocument();
});

test("Rendering <PasswordField /> element", () => {
	const { getByPlaceholderText } = render(<PasswordField Id={Id.new_password} AutoComplete={Types.NEW_PASSWORD} DisplayName={Text.Password} Placeholder={Text.Password} OnInput={()=>{}} />);
	const buttonElement = getByPlaceholderText(Text.Password);
	expect(buttonElement).toBeInTheDocument();
});