import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Browse from "./Browse";
import { Text } from "../../Constants/Messages";
import { Routes } from "../../Constants/Environment";
import { MemoryRouter, Route } from "react-router-dom";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: jest.fn(() => ({ newemail: "johndoe@example.com" })),
}));

jest.mock("react", () => {
	return {
		...jest.requireActual("react"),
		useContext: () => ({
			setSelectedCountry: jest.fn(),
		}),
	};
});

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

test("Rendering Browse page", () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={[Routes.BROWSE]}>
			<Route path={Routes.BROWSE} component={Browse} />
		</MemoryRouter>
	);

	const element = getByText(Text.All);
	expect(element).toBeInTheDocument();
});
