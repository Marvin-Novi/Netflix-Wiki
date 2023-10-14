import "./MenuItems.css";
import { useState, useEffect, useRef } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { Listener, Types } from "../../Constants/Environment";
import { Class, Aria } from "../../Constants/Css";
import { handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";
import { LogTypes } from "../../Firebase/FirebaseEntities";
import { Bool } from "../../Constants/Data";

function MenuItems({ items, depthLevel }) {
	const [dropdown, setDropdown] = useState(false);

	let ref = useRef();

	useEffect(() => {
		const handler = (event) => {
			try {
				if (dropdown && ref.current && !ref.current.contains(event.target)) {
					setDropdown(false);
				}
			} catch (error) {
				handleErrorAsync(LogTypes.Error, error);
			}
		};

		try {
			document.addEventListener(Listener.MOUSEDOWN, handler);
			document.addEventListener(Listener.TOUCHSTART, handler);
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}

		return () => {
			// Cleanup the event listener
			document.removeEventListener(Listener.MOUSEDOWN, handler);
			document.removeEventListener(Listener.TOUCHSTART, handler);
		};
	}, [dropdown]);

	const onMouseEnter = () => {
		window.innerWidth > 960 && setDropdown(true);
	};

	const onMouseLeave = () => {
		window.innerWidth > 960 && setDropdown(false);
	};

	const closeDropdown = () => {
		dropdown && setDropdown(false);
	};

	return (
		<li className={Class.MENU_ITEMS} ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={closeDropdown}>
			{items.url && items.submenu ? (
				<>
					<button type={Types.BUTTON} aria-haspopup={Aria.MENU} aria-expanded={dropdown ? Bool.TRUE : Bool.FALSE} onClick={() => setDropdown((prev) => !prev)}>
						{window.innerWidth < 960 && depthLevel === 0 ? items.title : <Link to={items.url}>{items.title}</Link>}

						{depthLevel > 0 && window.innerWidth < 960 ? null : depthLevel > 0 && window.innerWidth > 960 ? <span>&raquo;</span> : <span className={Class.ARROW} />}
					</button>
					<Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
				</>
			) : !items.url && items.submenu ? (
				<>
					<button type={Types.BUTTON} aria-haspopup={Aria.MENU} aria-expanded={dropdown ? Bool.TRUE : Bool.FALSE} onClick={() => setDropdown((prev) => !prev)}>
						{items.title} {depthLevel > 0 ? <span>&raquo;</span> : <span className={Class.ARROW} />}
					</button>
					<Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
				</>
			) : (
				<Link to={items.url}>{items.title}</Link>
			)}
		</li>
	);
}

export default MenuItems;
