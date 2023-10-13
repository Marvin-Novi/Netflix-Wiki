import React, { useState, useEffect } from "react";
import { genderTypes, string } from "../../Constants/Data";

function GenderSelector(props) {
	const [selected, setSelected] = useState(props.Value);

	useEffect(() => {
		if (props?.Value) {
			setSelected(props.Value ?? string.Empty);
		}
	}, [props.Value]);

	return (
		<label htmlFor={props.Id}>
			{props.DisplayName}
			<select
				id={props.Id}
				value={selected ?? string.Empty}
				onChange={(e) => {
					setSelected(e.target.value);
					props.OnChange(e.target.value);
				}}>
				<option value={string.Empty}> Choose gender</option>
				<option value={genderTypes.Male}> {genderTypes.Male}</option>
				<option value={genderTypes.Female}> {genderTypes.Female}</option>
				<option value={genderTypes.Other}> {genderTypes.Other}</option>
			</select>
		</label>
	);
}

export default GenderSelector;
