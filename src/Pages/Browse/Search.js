import "./Browse.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { Routes } from "../../Constants/Environment";
import SearchGallery from "../../Components/ProductComponents/SearchGallery";
import { searchTitles } from "../../Data/RapidApi";
import { Rapid_Keys } from "../../Data/RapidApiEntities";
import { Class, Id } from "../../Constants/Css";
import { Text } from "../../Constants/Messages";
import { LogTypes } from "../../Firebase/FirebaseEntities";
import { handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";

function Search() {
	let queryParams = new URLSearchParams(window.location.search);
	let country_list = queryParams.get(Rapid_Keys.country_list);
	let limit = queryParams.get(Rapid_Keys.limit);
	let expiring = queryParams.get(Rapid_Keys.expiring);
	let type = queryParams.get(Rapid_Keys.type);
	let title = queryParams.get(Rapid_Keys.title);

	const history = useHistory();
	const { ...authState } = useContext(AuthenticationStateContext);

	let [data, setData] = useState([]);
	let [isLoading, setIsLoading] = useState(false);

	const handleNavigation = useCallback(
		(path) => {
			history.push(path);
			history.goForward();
		},
		[history]
	);

	const fetchData = useCallback(() => {
		setData([]);

		let params = {
			order_by: Rapid_Keys.date,
		};

		if (country_list) params[Rapid_Keys.country_list] = [country_list];

		if (limit) params[Rapid_Keys.limit] = limit;

		if (expiring) params[Rapid_Keys.expiring] = expiring;

		if (type) params[Rapid_Keys.type] = type;

		if (title) params[Rapid_Keys.title] = title;

		fetchDataAsync(params)
			.then((result) => {
				setData(result);
				setIsLoading(false);
			})
			.catch((error) => {
				handleErrorAsync(LogTypes.Error, error);
			});
	}, [setData, setIsLoading, country_list, expiring, limit, title, type]);

	useEffect(() => {
		if (!authState.user) {
			handleNavigation(Routes.LOGIN);
		} else {
			if (data.length === 0 && !isLoading) {
			
				setIsLoading(true);
				fetchData();
			}
		}
	}, [setData, handleNavigation, fetchData, setIsLoading, isLoading, data, authState]);

	async function fetchDataAsync(params) {
		return await searchTitles(params).then((titlesResult) => {
			return titlesResult.Result;
		});
	}

	return (
		<div className={Class.BROWSE}>
			<section className={Class.MAIN_CONTAINER}>
				<SearchGallery Id={Id.SEARCH_ALL} Title={`${Text.Searchresults} `} Count={data?.length ?? 0} Data={data} IsLoading={isLoading} />
			</section>
		</div>
	);
}

export default Search;
