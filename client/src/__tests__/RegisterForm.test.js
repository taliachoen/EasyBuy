import { render, screen } from "@testing-library/react";
import LoginForm from "../components/forms/LoginForm";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import GlobalProvider from "../context/GlobalContext";

const user = {
  user_name: "JohnDoe",
  user_email: "JohnDoe@gmail.com",
  user_password: "John123456",
};

const registerUrl = "http://localhost:3000/api/users/register";

jest.mock("axios");
describe("Test RegisterForm", () => {
  describe("Register Page Tests", () => {
    beforeEach(async () => {
      axios.get.mockRejectedValue({ success: false });
      render(<LoginForm />, { wrapper: GlobalProvider });
      //for Register Page
      const element = screen.getByRole("paragraph", { name: "changePage" });
      await userEvent.click(element);
    });
    test("test Register page When Type on Inputs forms", async () => {
      const elements = screen.getAllByTestId("inputAuth");

      for (let element of elements) {
        await userEvent.type(element, user[element.id]);
        expect(element.value).toBe(user[element.id]);
      }
    });

    test("test Register page When form submitted", async () => {
      const axiosObject = {
        data: { success: true },
      };
      axios.post.mockResolvedValue(axiosObject);

      const elements = screen.getAllByTestId("inputAuth");

      for (let element of elements) {
        await userEvent.type(element, user[element.id]);
        expect(element.value).toBe(user[element.id]);
      }

      const btn = screen.getByRole("button", { name: "submit" });

      await userEvent.click(btn);

      expect(axios.post).toHaveBeenCalledWith(registerUrl, user, {
        withCredentials: true,
      });
    });

    test("test Register page When form submitted rejected and error show on document", async () => {
      const axiosError = {
        response: {
          data: {
            message: "Account already exist",
          },
        },
      };

      axios.post.mockRejectedValue(axiosError);

      const elements = screen.getAllByTestId("inputAuth");

      for (let element of elements) {
        await userEvent.type(element, user[element.id]);
        expect(element.value).toBe(user[element.id]);
      }

      const btn = screen.getByRole("button", { name: "submit" });

      await userEvent.click(btn);

      const errorElement = screen.getByRole("paragraph", {
        name: "error_result",
      });

      expect(errorElement).toHaveTextContent(axiosError.response.data.message);
    });
  });
});
