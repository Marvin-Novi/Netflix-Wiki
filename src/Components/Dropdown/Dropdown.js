import "./Dropdown.css";
import MenuItems from "../MenuItems/MenuItems";
import { Class } from "../../Constants/Css";
import { string } from "../../Constants/Data";

function Dropdown({ submenus, dropdown, depthLevel }) {
	depthLevel = depthLevel + 1;
	const dropdownClass = depthLevel > 1 ? Class.dropdown_Submenu : string.Empty;
	return (
		<ul className={`${Class.dropdown} ${dropdownClass} ${dropdown ? Class.show : string.Empty}`}>
			{submenus.map((submenu, index) => (
				<MenuItems items={submenu} key={index} depthLevel={depthLevel} />
			))}
		</ul>
	);
}

export default Dropdown;
