import React from "react";
import "./TextArea.css";
import { Class } from "../../Constants/Css";

function TextArea(props) {
	return (
		<label htmlFor={props.Id}>
			{props.DisplayName}
			<textarea
				id={props.Id}
				className={Class.TEXTAREA}
				placeholder={props.Placeholder}
				value={props.Value}
				onInput={(e) => props.OnInput(e.target.value)}
				name={props.DisplayName}
			/>
		</label>
	);
}

export default TextArea;
