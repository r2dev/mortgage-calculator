import { act, render, screen } from "@testing-library/react";
import App from "./App";

test("renders empty", () => {
  render(<App />);
  const textElement = screen.getByText(
    /Find out how much you are signing up for your dream house/i
  );
  expect(textElement).toBeInTheDocument();
});

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test("renders result after click", () => {
  render(<App />, container);

  const button = container.querySelector('[type="submit"]');
  expect(button).toBeInTheDocument();
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  const textElement = screen.getByText(/Monthly/i);

  expect(textElement).toBeInTheDocument();
});
