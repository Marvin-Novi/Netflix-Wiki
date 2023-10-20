import React from "react";
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
				autoComplete={Types.EMAIL}
				className={`${Class.TEXTFIELD} ${props.Class}`}
				type={Types.EMAIL}
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
