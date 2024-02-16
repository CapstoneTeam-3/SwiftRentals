import Page from "@/app/auth/login/page";
import User from "@testing-library/user-event";
import { render, screen, waitFor } from "../../test-utils";
import axios from "axios";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Login", () => {
  it("should render correctly", () => {
    render(<Page />);
    const headingElement = screen.getByRole("heading", {
      name: /log in swift/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  describe("Login Form", () => {
    User.setup();
    it("should throw validation error", async () => {
      render(<Page />);
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      User.type(emailInput, "test@gmail.com");

      const passwordInput = screen.getByPlaceholderText(/enter your password/i);
      User.type(passwordInput, "Test@123");

      const submitButton = screen.getByRole("button", {
        name: /log in/i,
      });
      await User.click(submitButton);

      const emailError = screen.getByText(/Invalid email address/i);
      expect(emailError).toBeInTheDocument();

      const passwordError = screen.getByText(/Password cannot be empty/i);
      expect(passwordError).toBeInTheDocument();
    });
    it("should submit form and post api call", async () => {
      render(<Page />);
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      User.type(emailInput, "test@gmail.com");

      const passwordInput = screen.getByPlaceholderText(/enter your password/i);
      User.type(passwordInput, "Test@123");

      const submitButton = screen.getByRole("button", {
        name: /log in/i,
      });
      await User.click(submitButton);

      const emailError = screen.getByText(/Invalid email address/i);
      expect(emailError).toBeInTheDocument();

      const passwordError = screen.getByText(/Password cannot be empty/i);
      expect(passwordError).toBeInTheDocument();
    });
  });
});
