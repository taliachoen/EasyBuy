import { render, screen } from "@testing-library/react";
import Contact from "../components/pages/privateRoutes/Contact";
import { GlobalContext } from "../context/GlobalContext";

describe("Contact Page Testing", () => {
  test("test when user not authorized send Contact Form", () => {
    render(
      <GlobalContext.Provider value={{ isAuth: false }}>
        <Contact />
      </GlobalContext.Provider>
    );

    const element = screen.getByRole("paragraph", { name: "not_auth_message" });

    expect(element).toBeInTheDocument();
  });

  test("test when user authorized send Contact Form", () => {
    render(
      <GlobalContext.Provider value={{ isAuth: true }}>
        <Contact />
      </GlobalContext.Provider>
    );

    const element = screen.queryByRole("paragraph", { name: "not_auth_message" });

    expect(element).toBeNull();
  });
});
