import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  // const themeSwitcherElement = screen.getByText(/bright mode/i);
  // expect(themeSwitcherElement).toBeInTheDocument();
});
