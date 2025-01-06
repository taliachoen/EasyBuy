import { render, screen  } from "@testing-library/react";
import LoginForm from "../components/forms/LoginForm";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import GlobalProvider from "../context/GlobalContext";

const user = {
  user_name: "JohnDoe",
  user_email: "JohnDoe@gmail.com",
  user_password: "John123456",
};

const loginUrl = "http://localhost:3000/api/users/login";

jest.mock("axios");
describe("Test LoginForm", () => {

  describe("Login Page Tests When user unAuthenticate", () => {

    beforeEach(() => {
      axios.get.mockRejectedValue({ success: false });
    })

    test("test Login page When Type on Inputs forms", async () => {
      render(<LoginForm />, { wrapper : GlobalProvider });

      const elements = screen.getAllByTestId("inputAuth");

      for (let element of elements) {
        await userEvent.type(element, user[element.id]);
        expect(element.value).toBe(user[element.id]);
      }

      expect(elements.length).toBe(2);
    });

    test("test Login page When form submitted", async () => {
      axios.post.mockResolvedValue({data: { success: true }});
      render(<LoginForm />, { wrapper : GlobalProvider });

      const elements = screen.getAllByTestId("inputAuth");

      for (let element of elements) {
        await userEvent.type(element, user[element.id]);
        expect(element.value).toBe(user[element.id]);
      }

      //  Btn click
      const btn = screen.getByRole("button", { name: "submit" });
      await userEvent.click(btn);

      delete user.user_name;

      expect(axios.post).toHaveBeenCalledWith(loginUrl, user, {withCredentials: true});
    });

    test("test Login page When form submitted rejected and error show on document", async () => {
      const axiosError = {
        response: {
          data: {
            message: "user not exists",
          },
        },
      };

      axios.post.mockRejectedValue(axiosError);
      const { container } = render(<LoginForm />, { wrapper : GlobalProvider });

      const elements = screen.getAllByTestId("inputAuth");

      for (let element of elements) {
        await userEvent.type(element, user[element.id]);
        expect(element.value).toBe(user[element.id]);
      }

      //  Btn click
      const btn = screen.getByRole("button", { name: "submit" });
      await userEvent.click(btn);

      delete user.user_name;

      expect(axios.post).toHaveBeenCalledWith(loginUrl, user, {withCredentials: true});

      const errorElement = container.querySelector("#error_result");

      expect(errorElement.innerHTML).toBe("user not exists");
    });
  });

  describe("Login Page Tests When user Authenticate",() => {
    
  })
});

