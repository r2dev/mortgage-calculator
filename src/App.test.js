import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders empty", () => {
  render(<App />);
  const textElement = screen.getByText(
    /Find out how much you are signing up for your dream house/i
  );
  expect(textElement).toBeInTheDocument();
});

test("renders result after click", () => {
  render(<App />);

  const button = screen.getByText("Calculate");
  expect(button).toBeInTheDocument();
  const textElement = screen.getByText(/25 year/i);
  fireEvent(
    button,
    new MouseEvent("click", { bubbles: true, cancelable: true })
  );
  

  expect(textElement).toBeInTheDocument();
});
