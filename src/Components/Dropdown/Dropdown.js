import "./Dropdown.css";
import MenuItems from "../MenuItems/MenuItems";
import { Class } from "../../Constants/Css";
import { String } from "../../Constants/Data";

function Dropdown({ submenus, dropdown, depthLevel }) {
	depthLevel = depthLevel + 1;
	const dropdownClass = depthLevel > 1 ? Class.DROPDOWN_SUBMENU : String.Empty;
	return (
		<ul className={`${Class.DROPDOWN} ${dropdownClass} ${dropdown ? Class.SHOW : String.Empty}`}>
			{submenus.map((submenu, index) => (
				<MenuItems items={submenu} key={index} depthLevel={depthLevel} />
			))}
		</ul>
	);
}

export default Dropdown;
