import { render, screen } from "@testing-library/react";
import Nav from "../components/section/Nav";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as router from "react-router";
import GlobalProvider, { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
// Nav => click to link => change react-router => mock react router Hook => and check if and with value is called
//* we need render component forEach all tests

jest.mock("axios");

describe("test Nav bar component", () => {
  const mockedNavigation = jest.fn();

  beforeAll(() => {
    jest
      .spyOn(router, "useNavigate")
      .mockImplementation(() => mockedNavigation);
  });

  beforeEach(() => {
    axios.get.mockRejectedValue({ success: false });

    render(
      <GlobalContext.Provider value={{ isAuth: false }}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </GlobalContext.Provider>
    );
  });

  test("test if About Tab Navigate", async () => {
    const aboutLink = screen.getByRole("link", { name: "About" });
    await userEvent.click(aboutLink);

    // Assertion
    expect(mockedNavigation).toHaveBeenCalled();
    expect(mockedNavigation).toHaveBeenCalledWith("/about", expect.anything());
  });
  test("test if Store Tab Navigate", async () => {
    const storeLink = screen.getByRole("link", { name: "Store" });
    await userEvent.click(storeLink);

    // Assertion
    expect(mockedNavigation).toHaveBeenCalled();
    expect(mockedNavigation).toHaveBeenCalledWith("/store", expect.anything());
  });
  test("test if Contact Tab Navigate", async () => {
    const contactLink = screen.getByRole("link", { name: "Contact" });
    await userEvent.click(contactLink);

    // Assertion
    expect(mockedNavigation).toHaveBeenCalled();
    expect(mockedNavigation).toHaveBeenCalledWith(
      "/contact",
      expect.anything()
    );
  });
  test("test if Home Tab Navigate", async () => {
    const homeLink = screen.getByRole("link", { name: "Home" });
    await userEvent.click(homeLink);

    // Assertion
    expect(mockedNavigation).toHaveBeenCalled();
    expect(mockedNavigation).toHaveBeenCalledWith("/", expect.anything());
  });


});

describe("check Nav When user Authenticate",() => {

  beforeEach(() => {
   render(
      <GlobalContext.Provider value={{ isAuth: true }}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </GlobalContext.Provider>
    );

  })

  test("test Avatar apper in the document when user Authenticate",() => {

   const element = screen.getByTestId("avatar-element");

   expect(element).toBeInTheDocument()
  })
})