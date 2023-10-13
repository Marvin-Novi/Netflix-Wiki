import { Class } from "../../Constants/Css";

function ErrorField(props) {
	if (props.ErrorMessage) return <div className={Class.errorMessage}>{props.ErrorMessage}</div>;
	else return <></>;
}

export default ErrorField;
