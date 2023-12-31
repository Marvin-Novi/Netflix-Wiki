import React from "react";
import { Link } from "react-router-dom";
import { Class } from "../../Constants/Css";

function CustomLink(props) {
	return (
		<Link className={Class.LINK} to={props.To}>
			{props.Title}
		</Link>
	);
}

export default CustomLink;
