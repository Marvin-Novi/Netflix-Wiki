import "./Contact.css";
import { Class } from "../../Constants/Css";
import { useCallback, useState } from "react";
import { string } from "../../Constants/Data";
import { Text } from "../../Constants/Messages";
import TextField from "../../Components/TextFields/TextField";
import ErrorField from "../../Components/Errorhandlers/ErrorField";
import Button from "../../Components/Button/Button";
import TextArea from "../../Components/TextFields/TextArea";
import EmailField from "../../Components/TextFields/EmailField";
import { Routes, StatusCode, Types } from "../../Constants/Environment";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { handleErrorAsync, handleTicketAsync } from "../../Firebase/FirebaseEntitiesContext";
import { LogTypes } from "../../Firebase/FirebaseEntities";

function Contact() {
	const history = useHistory();

	const [firstname, setFirstname] = useState(string.Empty);
	const [surname, setSurname] = useState(string.Empty);
	const [email, setEmail] = useState(string.Empty);
	const [subject, setSubject] = useState(string.Empty);
	const [message, setMessage] = useState(string.Empty);
	const [errorMessage, setErrorMessage] = useState(string.Empty);

	const handleNavigation = useCallback(
		(path) => {
			history.push(path);
			history.goForward();
		},
		[history]
	);

	async function createTicketAsync() {
		try {
			let response = await handleTicketAsync(email, firstname, surname, subject, message);

			if (response?.Status === StatusCode.Success) {
				alert(`${Text.Ticket_logged} ${response.Result}`);
				handleNavigation(Routes.Browse);
			} else {
				setErrorMessage(response?.Status);
			}
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}
	}

	return (
		<div className={Class.contact}>
			<section className={Class.main_container}>
				<div>
					<h1>{Text.Contact}</h1>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							createTicketAsync();
						}}>
						<header className={Class.txt_center}></header>
						<EmailField DisplayName={Text.Emailaddress} Placeholder={Text.Emailaddress} OnInput={setEmail} />
						<TextField DisplayName={Text.Firstname} Placeholder={Text.Firstname} OnInput={setFirstname} />
						<TextField DisplayName={Text.Surname} Placeholder={Text.Surname} OnInput={setSurname} />
						<TextField DisplayName={Text.Subject} Placeholder={Text.Subject} OnInput={setSubject} />
						<TextArea DisplayName={Text.Message} Placeholder={Text.Message} OnInput={setMessage} />
						<ErrorField ErrorMessage={errorMessage} />
						<Button Class={Class.btn_primary} Text={Text.Send} Type={Types.Submit} />
					</form>
				</div>
			</section>
		</div>
	);
}

export default Contact;
