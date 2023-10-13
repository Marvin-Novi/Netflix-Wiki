import "./Browse.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import CategoryMenu from "../../Components/TopMenu/CategoryMenu";
import { Routes, Symbol, Types } from "../../Constants/Environment";
import { getDetailsById } from "../../Data/RapidApi";
import { RapidApi, Text } from "../../Constants/Messages";
import Button from "../../Components/Button/Button";
import { string } from "../../Constants/Data";
import { handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";
import { LogTypes } from "../../Firebase/FirebaseEntities";
import { Class } from "../../Constants/Css";
import LoadingSpinner from "../../Resources/Images/Loading-spinner.svg";

function ProductDetails(props) {
	const { netflix_id } = useParams();
	const history = useHistory();
	const { ...authState } = useContext(AuthenticationStateContext);
	let [data, setData] = useState({});
	let [errorMessage, setErrorMessage] = useState(string.Empty);
	let [isLoading, setIsLoading] = useState(false);

	const handleNavigation = useCallback(
		(path) => {
			history.push(path);
			history.goForward();
		},
		[history]
	);

	useEffect(() => {
		try {
			if (isLoading) return;

			setIsLoading(true);

			if (!authState.user) {
				handleNavigation(Routes.Login);
			} else {
				const fetchData = async () => {
					try {
						let response = await getDetailsById(netflix_id);
						if (response.Status === RapidApi.Success) {
							setData(response.Result);
						} else {
							setErrorMessage(RapidApi.Default);
						}
					} catch (e) {
						setErrorMessage(RapidApi.Default);
					}
				};

				if (Object.keys(data).length === 0) {
					fetchData();
				}
			}
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		} finally {
			setIsLoading(false);
		}
	}, [handleNavigation, setIsLoading, isLoading, data, netflix_id, authState]);

	let title = data?.title?.replace(Symbol.Apostrophe.code, Symbol.Apostrophe.sign) ?? string.Empty;

	if (isLoading)
		return (
			<div className={Class.browse}>
				<CategoryMenu Prefix={Routes.Browse} />
				<section className={Class.main_container}>
					<div className={Class.card_container}>
						<img className={Class.spinner} src={LoadingSpinner} alt={Text.Loading} />
					</div>
				</section>
			</div>
		);

	return (
		<div className={Class.browse}>
			<section className={Class.main_container}>
				<div className={Class.card_container}>
					{Object.keys(data).length !== 0 && !errorMessage ? (
						<div className={Class.card}>
							<img className={Class.col} src={data.large_image} alt={Text.Cover} />
							<div className={`${Class.inner_container} ${Class.col}`}>
								<h2>
									<b>{title}</b>
								</h2>
								<p>{data.title_type}</p>
								<h3>{Text.Summary}</h3>
								<sub>{data.synopsis}</sub>
								<br />
								<p>{data.maturity_label}</p>
								<p>Latest date {data.latest_date}</p>
								<p>
									{data.alt_votes} {Text.Votes}
								</p>
								<Button Class={Class.btn_primary} Text={Text.Previous_page} Type={Types.Button} OnClick={() => history.goBack()} />
							</div>
						</div>
					) : Object.keys(data).length === 0 && errorMessage ? (
						<p className={Class.errorMessage}>{errorMessage}</p>
					) : (
						<p className={Class.errorMessage}>{Text.No_data_available}</p>
					)}
				</div>
			</section>
		</div>
	);
}

export default ProductDetails;
