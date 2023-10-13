import "./Browse.css";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationStateContext } from "../../Contexts/AuthenticationStateProvider";
import { ScopedContext } from "../../Contexts/ScopedContextProvider";
import CategoryMenu from "../../Components/TopMenu/CategoryMenu";
import { Routes, StatusCode, Symbol } from "../../Constants/Environment";
import { getAllCountries, searchTitles } from "../../Data/RapidApi";
import { RapidApi, Text } from "../../Constants/Messages";
import { getCountry, handleErrorAsync } from "../../Firebase/FirebaseEntitiesContext";
import CountrySelector from "../../Components/CountrySelector/CountrySelector";
import ProductGallery from "../../Components/ProductComponents/ProductGallery";
import { Keys } from "../../Constants/Environment";
import { string } from "../../Constants/Data";
import { Class, Id } from "../../Constants/Css";
import { LogTypes } from "../../Firebase/FirebaseEntities";
import { Rapid_Keys } from "../../Data/RapidApiEntities";

function Browse() {
	const history = useHistory();
	const { ...authState } = useContext(AuthenticationStateContext);
	const { setSelectedCountry } = useContext(ScopedContext);
	let [country, setCountry] = useState(string.Empty);
	let [countries, setCountries] = useState([]);
	let [data, setData] = useState([]);
	let [movies, setMovies] = useState([]);
	let [series, setSeries] = useState([]);
	let [expiring, setExpiring] = useState([]);
	let [isLoading, setIsLoading] = useState(true);

	const handleNavigation = useCallback(
		(path) => {
			history.push(path);
			history.goForward();
		},
		[history]
	);

	const scrollToLocation = () => {
		const { hash } = window.location;
		if (hash !== string.Empty) {
			let retries = 0;
			const id = hash.replace(Symbol.Hash, string.Empty);
			const scroll = () => {
				retries += 0;
				if (retries > 50) return;
				const element = document.getElementById(id);
				if (element) {
					setTimeout(() => element.scrollIntoView(), 0);
				} else {
					setTimeout(scroll, 100);
				}
			};
			scroll();
		}
	};

	const switchDataAsync = useCallback(
		async (countryItem) => {
			try {
				setIsLoading(true);
				localStorage.setItem(Keys.countryId, countryItem.id);
				setSelectedCountry(countryItem);
				setCountry(countryItem);
				setData([]);
				setMovies([]);
				setExpiring([]);

				setData(await fetchDataAsync({ order_by: Rapid_Keys.date, country_list: [countryItem.id], limit: 20 }));
				setMovies(await fetchDataAsync({ order_by: Rapid_Keys.date, country_list: [countryItem.id], limit: 20, type: Rapid_Keys.movie }));
				setSeries(await fetchDataAsync({ order_by: Rapid_Keys.date, country_list: [countryItem.id], limit: 20, type: Rapid_Keys.series }));
				setExpiring(await fetchDataAsync({ order_by: Rapid_Keys.date, country_list: [countryItem.id], limit: 20, expiring: Rapid_Keys.true }));
				setIsLoading(false);
			} catch (error) {
				handleErrorAsync(LogTypes.Error, error);
			}
		},
		[setSelectedCountry, setIsLoading]
	);

	useEffect(() => {
		try {
			if (!authState.user) {
				handleNavigation(Routes.Login);
			} else {
				const fetchData = async () => {
					let countriesResult = await getAllCountries();

					if (countriesResult.Status === RapidApi.Success) {
						setCountries(countriesResult.Result);
					}

					try {
						//get cached country (id)
						let cachedCountryId = parseInt(localStorage.getItem(Keys.countryId));

						if (cachedCountryId) {
							let cachedCountry = countriesResult.Result.find((x) => x.id === cachedCountryId);
							//if id present then get data.
							if (cachedCountry) {
								switchDataAsync(cachedCountry);
								return;
							}
						}
					} catch (error) {
						handleErrorAsync(LogTypes.Error, error);
					}

					//Else get usercountry from db
					let countryResponse = await getCountry(authState.user.uid);

					if (countryResponse.Status === StatusCode.Success) {
						let countryValue = countriesResult.Result.find((x) => x.id === countryResponse.Result.id);
						switchDataAsync(countryValue);
					}
				};
				
				//If countries is filled then data is already filled
				if (countries.length === 0 && country === string.Empty) {
					
					fetchData();
					scrollToLocation();
				}
			}
		} catch (error) {
			handleErrorAsync(LogTypes.Error, error);
		}
	}, [setCountries, setCountry, setData, handleNavigation, switchDataAsync, authState, countries, country]);

	async function fetchDataAsync(params) {
		let titlesResult = await searchTitles(params);
		return titlesResult.Result;
	}

	return (
		<div className={Class.browse}>
			<CategoryMenu />
			<section className={Class.main_container}>
				<CountrySelector Id={Id.country} DisplayName={Text.Country} Value={country} Items={countries ?? [{}]} OnChange={async (value) => switchDataAsync(value)} />
				<ProductGallery
					Id={Id.all}
					Href={`${Routes.Search}?${Rapid_Keys.country_list}=${country?.id}&${Rapid_Keys.limit}=${country?.tvids}`}
					Title={!country?.country ? Text.Loading : `Available on Netflix in ${country?.country ?? 0}`}
					Count={country?.tvids ?? 0}
					Data={data}
					IsLoading={isLoading}
				/>
				<ProductGallery
					Id={Id.tmovs}
					Href={`${Routes.Search}?${Rapid_Keys.country_list}=${country?.id}&${Rapid_Keys.limit}=${country?.tmovs}&${Rapid_Keys.type}=${Rapid_Keys.movie}`}
					Title={!country?.country ? Text.Loading : `Movies in ${country?.country ?? 0}`}
					Count={country?.tmovs ?? 0}
					Data={movies}
					IsLoading={isLoading}
				/>
				<ProductGallery
					Id={Id.tseries}
					Href={`${Routes.Search}?${Rapid_Keys.country_list}=${country?.id}&${Rapid_Keys.limit}=${country?.tseries}&${Rapid_Keys.type}=${Rapid_Keys.series}`}
					Title={!country?.country ? Text.Loading : `Series in ${country?.country ?? 0}`}
					Count={country?.tseries ?? 0}
					Data={series}
					IsLoading={isLoading}
				/>
				<ProductGallery
					Id={Id.expiring}
					Href={`${Routes.Search}?${Rapid_Keys.country_list}=${country?.id}&${Rapid_Keys.limit}=${country?.expiring}&${Rapid_Keys.expiring}=${Rapid_Keys.true}`}
					Title={!country?.country ? Text.Loading : `Expiring in ${country?.country ?? 0}`}
					Count={country?.expiring ?? 0}
					Data={expiring}
					IsLoading={isLoading}
				/>
			</section>
		</div>
	);
}

export default Browse;
