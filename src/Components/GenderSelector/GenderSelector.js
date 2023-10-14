import React, { useState, useEffect } from "react";
import { GenderTypes, String } from "../../Constants/Data";

function GenderSelector(props) {
	const [selected, setSelected] = useState(props.Value);

	useEffect(() => {
		if (props?.Value) {
			setSelected(props.Value ?? String.Empty);
		}
	}, [props.Value]);

	return (
		<label htmlFor={props.Id}>
			{props.DisplayName}
			<select
				id={props.Id}
				value={selected ?? String.Empty}
				onChange={(e) => {
					setSelected(e.target.value);
					props.OnChange(e.target.value);
				}}>
				<option value={String.Empty}> Choose gender</option>
				<option value={GenderTypes.Male}> {GenderTypes.Male}</option>
				<option value={GenderTypes.Female}> {GenderTypes.Female}</option>
				<option value={GenderTypes.Other}> {GenderTypes.Other}</option>
			</select>
		</label>
	);
}

export default GenderSelector;
