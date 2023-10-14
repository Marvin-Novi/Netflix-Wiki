import ProductCard from "./ProductCard";
import LoadingSpinner from "../../Resources/Images/Loading-spinner.svg";
import { Class } from "../../Constants/Css";
import { Text } from "../../Constants/Messages";

function SearchGallery(props) {
	
	if (props.Data && props?.Data?.length === 0 && !props.IsLoading) {
		return (
			<div className={Class.LOCATION} id={props.Id}>
				<h1 id={props.Id}>
					{props.Title}
					<span>{` | ${Text.Results} (${props.Count})`}</span>
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
				{props.Title} <span>{` | ${Text.Results} (${props.Count})`}</span>
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

export default SearchGallery;
