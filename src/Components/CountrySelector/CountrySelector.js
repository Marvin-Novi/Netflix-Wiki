import React, { useState, useEffect } from "react";
import { string } from "../../Constants/Data";
import { Id } from "../../Constants/Css";
import { handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";
import { LogTypes } from "../../Firebase/FirebaseEntities";

function CountrySelector(props) {
	const [selected, setSelected] = useState(string.Empty);

	useEffect(() => {
		try {
			if (props.Value && props.Items) {
				let country = props.Items.find((x) => x.id === props.Value.id);
				setSelected(JSON.stringify(country));
			}
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}
	}, [props]);

	return (
		<label htmlFor={props.Id}>
			{props.DisplayName}
			<select
				id={props.Id}
				value={selected}
				onChange={(e) => {
					setSelected(e.target.value);
					props.OnChange(JSON.parse(e.target.value));
				}}>
				<option value={null} disabled={selected}>
					Choose a country
				</option>
				{props.Items ? (
					props.Items.map((item, index) => {
						return (
							<option id={`${Id.opt_id}${index}`} key={`${Id.opt_key}${index}`} value={JSON.stringify(item)}>
								{string.Space}
								{item.country}
							</option>
						);
					})
				) : (
					<></>
				)}
			</select>
		</label>
	);
}

export default CountrySelector;
