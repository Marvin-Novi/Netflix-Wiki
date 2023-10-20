import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "./Register";
import { Text } from "../../Constants/Messages";
import { MemoryRouter, Route } from "react-router-dom";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: jest.fn(() => ({ newemail: "johndoe@example.com" })),
}));

// Mock Firebase getAuth
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



test("Rendering Register page", () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={["/register/johndoe@example.com"]}>
			<Route path="/register/:newemail?" component={Register} />
		</MemoryRouter>
	);

	const element = getByText(Text.Register);
	expect(element).toBeInTheDocument();
});
