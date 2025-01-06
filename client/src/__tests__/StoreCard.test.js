import StoreCard from "../components/component/Store/StoreCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import GlobalProvider from "../context/GlobalContext";
import axios from "axios";

jest.mock("axios");

describe("Test StoreCard Component", () => {
  test("Test Link in StoreCard Component should navigate new location and save it in history",async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });

    axios.get.mockRejectedValue({ success: false });

    render(
      <Router location={history.location} navigator={history}>
        <StoreCard id={2} />
      </Router>
    , { wrapper: GlobalProvider });

    const element = screen.getByTestId("link-element");

    // expect(element).toHaveAttribute("href","/2");

     await userEvent.click(element);

     expect(history.location.pathname).toBe("/2");
  });
});
