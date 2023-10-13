import "./MenuItems.css";
import { useState, useEffect, useRef } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { Listener, Types } from "../../Constants/Environment";
import { Class, Aria } from "../../Constants/Css";
import { handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";
import { LogTypes } from "../../Firebase/FirebaseEntities";

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
			document.addEventListener(Listener.MouseDown, handler);
			document.addEventListener(Listener.TouchStart, handler);
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}

		return () => {
			// Cleanup the event listener
			document.removeEventListener(Listener.MouseDown, handler);
			document.removeEventListener(Listener.TouchStart, handler);
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
		<li className={Class.menu_items} ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={closeDropdown}>
			{items.url && items.submenu ? (
				<>
					<button type={Types.Button} aria-haspopup={Aria.menu} aria-expanded={dropdown ? Aria.true : Aria.false} onClick={() => setDropdown((prev) => !prev)}>
						{window.innerWidth < 960 && depthLevel === 0 ? items.title : <Link to={items.url}>{items.title}</Link>}

						{depthLevel > 0 && window.innerWidth < 960 ? null : depthLevel > 0 && window.innerWidth > 960 ? <span>&raquo;</span> : <span className={Class.arrow} />}
					</button>
					<Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
				</>
			) : !items.url && items.submenu ? (
				<>
					<button type={Types.Button} aria-haspopup={Aria.menu} aria-expanded={dropdown ? Aria.true : Aria.false} onClick={() => setDropdown((prev) => !prev)}>
						{items.title} {depthLevel > 0 ? <span>&raquo;</span> : <span className={Class.arrow} />}
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
