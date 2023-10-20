import React from "react";
import { render } from "@testing-library/react";
import Search from "./Search";
import "@testing-library/jest-dom";
import { Text } from "../../Constants/Messages";
import { Routes } from "../../Constants/Environment";

import { MemoryRouter, Route } from "react-router-dom";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useHistory: () => ({
		push: jest.fn(),
		goForward: jest.fn(),
	}),
}));

jest.mock("firebase/auth", () => {
	const obj = {
		getAuth: jest.fn(),
		onAuthStateChanged: jest.fn(),
	};

	return obj;
});

jest.mock("firebase/app", () => {
	const obj = {
		initializeApp: jest.fn(),
	};

	return obj;
});

jest.mock("firebase/firestore", () => {
	const obj = {
		getFirestore: jest.fn(),
	};

	return obj;
});

jest.mock("../../Resources/Images/Loading-spinner.svg", () => {
	const obj = {
		LoadingSpinner: jest.fn(),
	};

	return obj;
});

test("Rendering Search page", () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={[Routes.SEARCH]}>
			<Route path={Routes.SEARCH} component={Search} />
		</MemoryRouter>
	);

	const element = getByText(Text.No_data_available);
	expect(element).toBeInTheDocument();
});
