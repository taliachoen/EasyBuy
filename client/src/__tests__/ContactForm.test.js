import { fireEvent, render, screen } from "@testing-library/react";
import ContactForm from "../components/forms/ContactForm";
import userEvent from "@testing-library/user-event";
import axios from "axios";

const userContact = {
  email: "yossi@gmail.com",
  name: "yossi",
  phone: "0525543821",
};

jest.mock("axios");


// test - check if form not submitted when the inputs value emtpy

describe("test ContactForm Component", () => {
  test("should change the state when we type on the inputs", async () => {
    render(<ContactForm />);

    const elements = screen.getAllByRole("textbox");

    elements.forEach((element) => {
      fireEvent.change(element, { target: { value: userContact[element.id] } });
      expect(element.value).toBe(userContact[element.id]);
    });
  });
  test("should send the request when user submitted", async () => {
    axios.post.mockResolvedValue({
      data: { message: "the request send succeesfully" },
    });

    const { container } = render(<ContactForm />);

    const elements = screen.getAllByRole("textbox");

    elements.forEach((element) => {
      fireEvent.change(element, { target: { value: userContact[element.id] } });
      expect(element.value).toBe(userContact[element.id]);
    });

    const btn = container.querySelector("#submitBtn");

    await userEvent.click(btn);

    expect(axios.post).toHaveBeenCalledWith("https://dummyjson.com/products/add",userContact);
  });
});
