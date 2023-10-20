import React from "react";
import { Link } from "react-router-dom";
import "./TopMenu.css";
import { Class, Id } from "../../Constants/Css";
import { String } from "../../Constants/Data";
import { Symbol } from "../../Constants/Environment";
import { Text } from "../../Constants/Messages";
function CategoryMenu(props) {
	if (!props.Prefix)
		return (
			<nav className={Class.GENRES}>
				<a href={`${Symbol.Hash}${Id.ALL}`} className={Class.GENRE}>
					{Text.All}
				</a>
				<a href={`${Symbol.Hash}${Id.TMOVS}`} className={Class.GENRE}>
					{Text.Movies}
				</a>
				<a href={`${Symbol.Hash}${Id.TSERIES}`} className={Class.GENRE}>
					{Text.Series}
				</a>
				<a href={`${Symbol.Hash}${Id.EXPIRING}`} className={Class.GENRE}>
					{Text.Expiring}
				</a>
			</nav>
		);
	else
		return (
			<nav className={Class.GENRES}>
				<Link to={`${props.Prefix ?? String.Empty}${Symbol.Hash}${Id.ALL}`} className={Class.GENRE}>
					{Text.All}
				</Link>
				<Link to={`${props.Prefix ?? String.Empty}${Symbol.Hash}${Id.TMOVS}`} className={Class.GENRE}>
					{Text.Movies}
				</Link>
				<Link to={`${props.Prefix ?? String.Empty}${Symbol.Hash}${Id.TSERIES}`} className={Class.GENRE}>
					{Text.Series}
				</Link>
				<Link to={`${props.Prefix ?? String.Empty}${Symbol.Hash}${Id.EXPIRING}`} className={Class.GENRE}>
					{Text.Expriring}
				</Link>
			</nav>
		);
}

export default CategoryMenu;
