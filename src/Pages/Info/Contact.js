import "./Contact.css";
import { Class } from "../../Constants/Css";
import { useCallback, useState } from "react";
import { String} from "../../Constants/Data";
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

	const [firstname, setFirstname] = useState(String.Empty);
	const [surname, setSurname] = useState(String.Empty);
	const [email, setEmail] = useState(String.Empty);
	const [subject, setSubject] = useState(String.Empty);
	const [message, setMessage] = useState(String.Empty);
	const [errorMessage, setErrorMessage] = useState(String.Empty);

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

			if (response?.Status === StatusCode.SUCCESS) {
				alert(`${Text.Ticket_logged} ${response.Result}`);
				handleNavigation(Routes.BROWSE);
			} else {
				setErrorMessage(response?.Status);
			}
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}
	}

	return (
		<div className={Class.CONTACT}>
			<section className={Class.MAIN_CONTAINER}>
				<div>
					<h1>{Text.Contact}</h1>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							createTicketAsync();
						}}>
						<header className={Class.TXT_CENTER}></header>
						<EmailField DisplayName={Text.Emailaddress} Placeholder={Text.Emailaddress} OnInput={setEmail} />
						<TextField DisplayName={Text.Firstname} Placeholder={Text.Firstname} OnInput={setFirstname} />
						<TextField DisplayName={Text.Surname} Placeholder={Text.Surname} OnInput={setSurname} />
						<TextField DisplayName={Text.Subject} Placeholder={Text.Subject} OnInput={setSubject} />
						<TextArea DisplayName={Text.Message} Placeholder={Text.Message} OnInput={setMessage} />
						<ErrorField ErrorMessage={errorMessage} />
						<Button Class={Class.BTN_PRIMARY} Text={Text.Send} Type={Types.SUBMIT} />
					</form>
				</div>
			</section>
		</div>
	);
}

export default Contact;
