import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import { render, screen } from "../test-utils";

import Hero from "@/app/components/Hero/Hero";
import DesktopNav from "@/app/components/nav/DesktopNav";
import MobileNav from "@/app/components/nav/MobileNav";
import Page from "@/app/page";

describe("Home", () => {
  it("should renders a heading", () => {
    render(<Page />);
    const heading = screen.getByRole("heading", {
      name: /discover the freedom of roads with swiftrentals stroke under swift rental/i,
    });
    expect(heading).toBeInTheDocument();
  });

  describe("Hero", () => {
    it("should render hero section", () => {
      render(<Hero className="" />);
      const imageElement = screen.getByRole("img", {
        name: /payment/i,
      });
      expect(imageElement).toBeInTheDocument();
    });
  });
  describe("NavBar", () => {
    const menuLinks: string[] = ["/", "/", "/admin", "/auth/login"];

    describe("DesktopNav", () => {
      it("should render login button", () => {
        let isLoggedIn = false;
        const menuItems: string[] = [
          "Browse",
          "Profile",
          "Admin",
          isLoggedIn ? "Logout" : "Login",
        ];
        render(
          <DesktopNav
            className=""
            isLoggedIn={isLoggedIn}
            menuItems={menuItems}
            menuLinks={menuLinks}
          />
        );
        const loginButton = screen.getByRole("link", { name: /login/i });
        expect(loginButton).toBeInTheDocument();
      });

      it("should change to  logout button", () => {
        let isLoggedIn = true;
        const menuItems: string[] = [
          "Browse",
          "Profile",
          "Admin",
          isLoggedIn ? "Logout" : "Login",
        ];
        render(
          <DesktopNav
            className=""
            isLoggedIn={isLoggedIn}
            menuItems={menuItems}
            menuLinks={menuLinks}
          />
        );
        const logoutButton = screen.getByRole("button", { name: /logout/i });
        expect(logoutButton).toBeInTheDocument();
      });
    });
    describe("MobileNav", () => {
      user;
      it("should render only hamburger icon", () => {
        let isLoggedIn = true;
        const menuItems: string[] = [
          "Browse",
          "Profile",
          "Admin",
          isLoggedIn ? "Logout" : "Login",
        ];
        render(
          <MobileNav
            className=""
            menuItems={menuItems}
            menuLinks={menuLinks}
            isLoggedIn={isLoggedIn}
          />
        );
        const hamburgerIcon = screen.getByTestId("hamburger-icon");
        expect(hamburgerIcon).toBeInTheDocument();
      });
      user;
      it("should change to close icon on user click", async () => {
        user.setup();
        let isLoggedIn = true;
        const menuItems: string[] = [
          "Browse",
          "Profile",
          "Admin",
          isLoggedIn ? "Logout" : "Login",
        ];
        render(
          <MobileNav
            className=""
            menuItems={menuItems}
            menuLinks={menuLinks}
            isLoggedIn={isLoggedIn}
          />
        );
        const hamburgerIcon = screen.getByTestId("hamburger-icon");

        await user.click(hamburgerIcon);

        const closeIcon = screen.getByTestId("close-icon");
        expect(closeIcon).toBeInTheDocument();
      });
    });
  });
});
