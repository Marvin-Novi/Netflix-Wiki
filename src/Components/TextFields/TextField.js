import React from "react";
import "./TextField.css";
import { Class } from "../../Constants/Css";
import { Types } from "../../Constants/Environment";

function TextField(props) {
	return (
		<label htmlFor={props.Id}>
			{props.DisplayName}
			<input
				id={props.Id}
				className={Class.TEXTFIELD}
				type={Types.TEXT}
				placeholder={props.Placeholder}
				value={props.Value}
				onInput={(e) => props.OnInput(e.target.value)}
				name={props.DisplayName}
			/>
		</label>
	);
}

export default TextField;
