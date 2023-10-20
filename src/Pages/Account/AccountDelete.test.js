import React from "react";
import { render } from "@testing-library/react";
import AccountDelete from "./AccountDelete";
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

test("Rendering AccountDelete page", () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={[Routes.ACCOUNT_DELETE]}>
			<Route path={Routes.ACCOUNT_DELETE} component={AccountDelete} />
		</MemoryRouter>
	);

	const element = getByText(Text.Delete);
	expect(element).toBeInTheDocument();
});
