export class Routes {
	static HOME = "/";
	static LOGIN = "/login";
	static LOGOUT = "/logout";
	static REGISTER = "/register";
	static REGISTER_PARAMS = "/register/:newemail?";
	static ACCOUNT_DELETE = "/accountdelete";
	static PROFILE = "/profile";
	static PASSWORD_UPDATE = "/passwordupdate";
	static SEARCH = "/search";
	static PRODUCT_DETAILS = "/productdetails/:netflix_id";
	static PRODUCT_DETAILS_PREFIX = "/productdetails/";
	static BROWSE = "/browse";
	static ABOUT_US = "/aboutus";
	static CONTACT = "/contact";
	static DEV_BASE = "localhost";
}

export class LocalStorageKeys {
	static COUNTRY_ID = "countryId";
	static THEME_ID = "themeId";
}

export class StatusCode {
	static PENDING = "Pending";
	static DONE = "Done";
	static FAILED = "Failed";
	static SUCCESS = "Success";
}

export class Types {
	static BUTTON = "button";
	static DATE = "date";
	static EMAIL = "email";
	static PASSWORD = "password";
	static CURRENT_PASSWORD = "current-password";
	static NEW_PASSWORD = "new-password";
	static SUBMIT = "submit";
	static TEXT = "text";
}

export class Listener {
	static MOUSEDOWN = "mousedown";
	static TOUCHSTART = "touchstart";
}

export const Symbol = {
	Apostrophe: {
		sign: "'",
		code: "&#39;",
	},
	Dash: "-",
	Hash: "#",
};
