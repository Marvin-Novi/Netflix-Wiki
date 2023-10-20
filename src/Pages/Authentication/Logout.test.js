import React from "react";
import { render } from "@testing-library/react";
import Logout from "./Logout";
import "@testing-library/jest-dom";
import { Routes } from "../../Constants/Environment";
import { MemoryRouter, Route } from "react-router-dom";
import { Text } from "../../Constants/Messages";

jest.mock("react", () => {
	return {
		...jest.requireActual("react"),
		useContext: () => ({
			logout: jest.fn(),
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

test("Rendering Logout page", () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={[Routes.LOGOUT]}>
			<Route path={Routes.LOGOUT} component={Logout} />
		</MemoryRouter>
	);

	const element = getByText(Text.Pending);
	expect(element).toBeInTheDocument();
});
