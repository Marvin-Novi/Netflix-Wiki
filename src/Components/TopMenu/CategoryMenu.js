import { Link } from "react-router-dom";
import "./TopMenu.css";
import { Class, Id } from "../../Constants/Css";
import { string } from "../../Constants/Data";
import { Symbol } from "../../Constants/Environment";
function CategoryMenu(props) {
	if (!props.Prefix)
		return (
			<nav className={Class.genres}>
				<a href={`${Symbol.Hash}${Id.all}`} className={Class.genre}>
					All
				</a>
				<a href={`${Symbol.Hash}${Id.tmovs}`} className={Class.genre}>
					Movies
				</a>
				<a href={`${Symbol.Hash}${Id.tseries}`} className={Class.genre}>
					Series
				</a>
				<a href={`${Symbol.Hash}${Id.expiring}`} className={Class.genre}>
					Expiring
				</a>
			</nav>
		);
	else
		return (
			<nav className={Class.genres}>
				<Link to={`${props.Prefix ?? string.Empty}${Symbol.Hash}${Id.all}`} className={Class.genre}>
					All
				</Link>
				<Link to={`${props.Prefix ?? string.Empty}${Symbol.Hash}${Id.tmovs}`} className={Class.genre}>
					Movies
				</Link>
				<Link to={`${props.Prefix ?? string.Empty}${Symbol.Hash}${Id.tseries}`} className={Class.genre}>
					Series
				</Link>
				<Link to={`${props.Prefix ?? string.Empty}${Symbol.Hash}${Id.expiring}`} className={Class.genre}>
					Expiring
				</Link>
			</nav>
		);
}

export default CategoryMenu;
