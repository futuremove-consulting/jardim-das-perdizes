import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home identity page", () => {
  it("renders the site brand as a heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /jardim das perdizes/i })
    ).toBeInTheDocument();
  });
});
