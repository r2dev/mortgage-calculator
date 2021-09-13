import { render, screen } from "@testing-library/react";
import Detail from "./Detail";

test("renders detail with correct month ", () => {
  render(<Detail totalDurationMonth={2} />);
  const element = screen.getByText(/2 month\(s\)/i);
  expect(element).toBeInTheDocument();
});

test("renders detail with correct year ", () => {
  render(<Detail totalDurationYear={14} />);
  const element = screen.getByText(/14 Year\(s\)/i);
  expect(element).toBeInTheDocument();
});

test("renders detail with correct year and month", () => {
  render(<Detail totalDurationYear={14} totalDurationMonth={3} />);
  const element = screen.getByText(/14 Year\(s\) and 3 month\(s\)/i);
  expect(element).toBeInTheDocument();
});

test("renders detail with correct amount and frequency", () => {
  render(<Detail eachAmount={100.23} frequency="Weekly" />);
  const element = screen.getByText(/CA\$100.23/i);
  const frequencyElement = screen.getByText(/Weekly/i);
  expect(element).toBeInTheDocument();
  expect(frequencyElement).toBeInTheDocument();
});
