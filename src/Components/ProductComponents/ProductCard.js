import { Link } from "react-router-dom";
import "./ProductComponents.css";
import { Routes, Symbol } from "../../Constants/Environment";
import { Class } from "../../Constants/Css";

function ProductCard(props) {
	let title = props?.Value?.title?.replace(Symbol.Apostrophe.code, Symbol.Apostrophe.sign);

	return (
		<Link id={props.Id} to={`${Routes.ProductDetails_Prefix}${props.Value.netflix_id}`} className={Class.productcard}>
			<img src={props.Value.img} alt={title} />
			<label>{title} </label>
		</Link>
	);
}

export default ProductCard;
