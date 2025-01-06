import { render, screen } from "@testing-library/react";
import Profile from "../components/pages/privateRoutes/Profile";
import { GlobalContext } from "../context/GlobalContext";

const value = {
    user: {
        user_email:"bob@gmail.com",
        user_name: "bobibob",
        premission: "Regular",
        verified: true,
      },
}

describe("TEST PROFILE PAGE", () => {
  beforeEach(() => {
    render(
      <GlobalContext.Provider value={value}>
        <Profile />
      </GlobalContext.Provider>
    );
  });
  test("test user Details apper in document", () => {

   const elementName = screen.getByTestId("user_name");


   expect(elementName).toBeInTheDocument()
  });
});
