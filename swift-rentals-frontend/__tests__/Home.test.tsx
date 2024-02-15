import Page from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
describe("Page", () => {
    
  it("renders a heading", () => {
    render(<Page />);
    const heading = screen.getByRole("heading", {
      name: /discover the freedom of roads with swiftrentals stroke under swift rental/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
