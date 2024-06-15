import React from "react";
import { render, screen } from "@testing-library/jest-dom";

import App from "./App";

test('it should render learn react link with iFrame', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react iFrame/i);
    expect(linkElement).toBeInTheDocument();
});
