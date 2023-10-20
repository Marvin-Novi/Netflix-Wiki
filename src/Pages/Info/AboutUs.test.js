import React from "react";
import { render } from "@testing-library/react";
import AboutUs from "./AboutUs";
import "@testing-library/jest-dom";
import { Routes } from "../../Constants/Environment";
import { MemoryRouter, Route } from "react-router-dom";

test("Rendering AboutUs page", () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={[Routes.ABOUT_US]}>
			<Route path={Routes.ABOUT_US} component={AboutUs} />
		</MemoryRouter>
	);

	const element = getByText("Welcome to Netflix Wiki");
	expect(element).toBeInTheDocument();
});
