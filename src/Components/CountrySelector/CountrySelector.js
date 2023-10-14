import React, { useState, useEffect } from "react";
import { String } from "../../Constants/Data";
import { Id } from "../../Constants/Css";
import { handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";
import { LogTypes } from "../../Firebase/FirebaseEntities";

function CountrySelector(props) {
	const [selected, setSelected] = useState(String.Empty);

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
							<option id={`${Id.OPT_ID}${index}`} key={`${Id.OPT_KEY}${index}`} value={JSON.stringify(item)}>
								{String.Space}
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
