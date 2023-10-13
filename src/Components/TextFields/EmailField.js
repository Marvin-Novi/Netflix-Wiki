import { Class } from "../../Constants/Css";
import { Types } from "../../Constants/Environment";
import { Text } from "../../Constants/Messages";
import "./TextField.css";

function EmailField(props) {
	return (
		<label htmlFor={props.Id}>
			{props.DisplayName}
			<input
				id={props.Id}
				autoComplete={Types.Email}
				className={`${Class.textfield} ${props.Class}`}
				type={Types.Email}
				placeholder={Text.Emailaddress}
				value={props.Value}
				onInput={(e) => props.OnInput(e.target.value)}
				name={props.DisplayName}
				disabled={props.Disabled}
				required
			/>
		</label>
	);
}

export default EmailField;
