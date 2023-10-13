export const Routes = {
	Home: "/",
	Login: "/login",
	Logout: "/logout",
	Register: "/register",
	RegisterParams: "/register/:newemail?",
	AccountDelete: "/accountdelete",
	Profile: "/profile",
	PasswordUpdate: "/passwordupdate",
	Search: "/search",
	ProductDetails: "/productdetails/:netflix_id",
	ProductDetails_Prefix: "/productdetails/",
	Browse: "/browse",
	AboutUs: "/aboutus",
	Contact: "/contact",
	Dev_base: "localhost"
};

export const Keys = {
	countryId: "countryId",
	themeId:"themeId"
};

export const StatusCode = {
	Pending: "Pending",
	Done: "Done",
	Failed: "Failed",
	Success: "Success",
};

export const Types = {
	Button: "button",
	Date: "date",
	Email: "email",
	Password: "password",
	Current_password: "current-password",
	New_password: "new-password",
	Submit: "submit",
	Text: "text",
};

export const Listener = {
	MouseDown: "mousedown",
	TouchStart: "touchstart",
};

export const Symbol = {
	Apostrophe: {
		sign: "'",
		code: "&#39;",
	},
	Dash: "-",
	Hash: "#",
};
