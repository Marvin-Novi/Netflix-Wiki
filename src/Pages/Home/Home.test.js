import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { Text } from "../../Constants/Messages";


test("Rendering Home page", () => {
	render(<Home />);
	const element = screen.getByText(Text.Register);
	expect(element).toBeInTheDocument();
});