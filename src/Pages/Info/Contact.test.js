import React from "react";
import { render } from "@testing-library/react";
import Contact from "./Contact";
import "@testing-library/jest-dom";
import { Routes } from "../../Constants/Environment";
import { MemoryRouter, Route } from "react-router-dom";
import { Text } from "../../Constants/Messages";

jest.mock("firebase/auth", () => {
	const obj = {
		createUserWithEmailAndPassword: jest.fn(),
		signInWithEmailAndPassword: jest.fn(),
		deleteUser: jest.fn(),
		getAuth: jest.fn(),
		signOut: jest.fn(),
		onAuthStateChanged: jest.fn(),
		updatePassword: jest.fn(),
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

test("Rendering Contact page", () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={[Routes.CONTACT]}>
			<Route path={Routes.CONTACT} component={Contact} />
		</MemoryRouter>
	);

	const element = getByText(Text.Send);
	expect(element).toBeInTheDocument();
});
