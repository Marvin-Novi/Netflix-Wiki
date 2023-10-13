export const RapidApi = {
	Key: process.env.REACT_APP_RAPID_API_KEY,
	Host: process.env.REACT_APP_RAPID_API_HOST,
};

export const Rapid_Keys = {
	country_list: "country_list",
	expiring: "expiring",
	type: "type",
	title: "title",
	limit: "limit",
	movies: "movies",
	movie: "movie",
	series: "series",
	date: "date",
	true: "true",
};

export const Endpoints = {
	Countries: {
		method: "GET",
		url: "https://unogs-unogs-v1.p.rapidapi.com/static/countries",
		headers: {
			"X-RapidAPI-Key": RapidApi.Key,
			"X-RapidAPI-Host": RapidApi.Host,
		},
	},
	Genres: {
		method: "GET",
		url: "https://unogs-unogs-v1.p.rapidapi.com/static/genres",
		headers: {
			"X-RapidAPI-Key": RapidApi.Key,
			"X-RapidAPI-Host": RapidApi.Host,
		},
	},
	SearchTitles: {
		method: "GET",
		url: "https://unogs-unogs-v1.p.rapidapi.com/search/titles",
		params: { order_by: "date", type: "movie" },
		headers: {
			"X-RapidAPI-Key": RapidApi.Key,
			"X-RapidAPI-Host": RapidApi.Host,
		},
	},
	SearchPeople: {
		method: "GET",
		url: "https://unogs-unogs-v1.p.rapidapi.com/search/people",
		params: { person_type: "Actor" },
		headers: {
			"X-RapidAPI-Key": RapidApi.Key,
			"X-RapidAPI-Host": RapidApi.Host,
		},
	},
	Details: {
		method: "GET",
		url: "https://unogs-unogs-v1.p.rapidapi.com/title/details",
		headers: {
			"X-RapidAPI-Key": RapidApi.Key,
			"X-RapidAPI-Host": RapidApi.Host,
		},
	},
	Images: {
		method: "GET",
		url: "https://unogs-unogs-v1.p.rapidapi.com/title/images",
		params: { netflix_id: "<REQUIRED>" },
		headers: {
			"X-RapidAPI-Key": RapidApi.Key,
			"X-RapidAPI-Host": RapidApi.Host,
		},
	},
};

export class Result {
	constructor(result, status) {
		this.Result = result;
		this.Status = status;
	}
}
