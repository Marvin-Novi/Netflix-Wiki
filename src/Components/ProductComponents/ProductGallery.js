import ProductCard from "./ProductCard";
import LoadingSpinner from "../../Resources/Images/Loading-spinner.svg";
import { Link } from "react-router-dom";
import { Class } from "../../Constants/Css";
import { Text } from "../../Constants/Messages";

function ProductGallery(props) {
	if (props.Data && props.Data.length === 0 && !props.IsLoading) {
		return (
			<div className={Class.LOCATION} id={props.Id}>
				<h1 id={props.Id}>
					{props.Title}
					<Link to={props.Href}> {` | ${Text.Show_all} (${props.Count})`}</Link>
				</h1>
				<div className={Class.BOX}>
					<p>{Text.No_data_available}</p>
				</div>
			</div>
		);
	}

	return (
		<div className={Class.LOCATION} id={props.Id}>
			<h1 id={`p-${props.Id}`}>
				{props.Title}
				<Link to={props.Href}> {` | ${Text.Show_all} (${props.Count})`}</Link>
			</h1>
			<div className={Class.BOX}>
				{props.Data && !props.IsLoading ? (
					props.Data.map((item, index) => {
						return <ProductCard id={`${props.Id}-${index}`} Id={`${props.Id}-id-${index}`} key={`${props.Id}-key-${index}`} Value={item} />;
					})
				) : (
					<img className={Class.SPINNER} src={LoadingSpinner} alt={Text.Loading} />
				)}
			</div>
		</div>
	);
}

export default ProductGallery;
