import { render, screen } from "@testing-library/react";
import Avatar from "../components/common/Avatar";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { logOutFn } from "../actions";
import axios from "axios";

const mockLogout = jest.fn();

jest.mock("axios");
describe("Test Avatar component", () => {
  test("logout Button work like expected with mockFn", async () => {
    render(
      <MemoryRouter>
        <Avatar logout={mockLogout} />
      </MemoryRouter>
    );

    const btn = screen.getByRole("button", { name: "logout" });

    await userEvent.click(btn);

    expect(mockLogout).toHaveBeenCalled();
  });

  test("logout Function work like expected axios request", async () => {
    axios.get.mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter>
        <Avatar logout={logOutFn} />
      </MemoryRouter>
    );

    const btn = screen.getByRole("button", { name: "logout" });

    await userEvent.click(btn);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3000/api/users/logout",
      { withCredentials: true }
    );
  });

});
