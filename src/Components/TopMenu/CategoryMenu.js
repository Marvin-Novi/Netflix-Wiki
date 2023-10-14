import { Link } from "react-router-dom";
import "./TopMenu.css";
import { Class, Id } from "../../Constants/Css";
import { String} from "../../Constants/Data";
import { Symbol } from "../../Constants/Environment";
function CategoryMenu(props) {
	if (!props.Prefix)
		return (
			<nav className={Class.GENRES}>
				<a href={`${Symbol.Hash}${Id.ALL}`} className={Class.GENRE}>
					All
				</a>
				<a href={`${Symbol.Hash}${Id.TMOVS}`} className={Class.GENRE}>
					Movies
				</a>
				<a href={`${Symbol.Hash}${Id.TSERIES}`} className={Class.GENRE}>
					Series
				</a>
				<a href={`${Symbol.Hash}${Id.EXPIRING}`} className={Class.GENRE}>
					Expiring
				</a>
			</nav>
		);
	else
		return (
			<nav className={Class.GENRES}>
				<Link to={`${props.Prefix ?? String.Empty}${Symbol.Hash}${Id.ALL}`} className={Class.GENRE}>
					All
				</Link>
				<Link to={`${props.Prefix ?? String.Empty}${Symbol.Hash}${Id.TMOVS}`} className={Class.GENRE}>
					Movies
				</Link>
				<Link to={`${props.Prefix ?? String.Empty}${Symbol.Hash}${Id.TSERIES}`} className={Class.GENRE}>
					Series
				</Link>
				<Link to={`${props.Prefix ?? String.Empty}${Symbol.Hash}${Id.EXPIRING}`} className={Class.GENRE}>
					Expiring
				</Link>
			</nav>
		);
}

export default CategoryMenu;
