import { render, act } from "@testing-library/react";
import ProductPage from "../components/pages/privateRoutes/ProductPage";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import GlobalProvider from "../context/GlobalContext";

jest.mock("axios");
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: 1 }),
  useNavigate: () => mockedNavigate,
}));

const product = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.94,
  stock: 5,
  thumbnail:
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
};

describe("Test Prodcut Page", () => {
  test("test Prodcut Page send axios request in mounting", async () => {
    axios.get.mockResolvedValue({ data: product });

    await act(async () =>
      render(
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>,
        { wrapper: GlobalProvider }
      )
    );

    expect(axios.get).toHaveBeenCalledWith("https://dummyjson.com/products/1");
  });

  test("test Prodcut Page send axios request in mounting", async () => {
    const { container } = await act(async () =>
      render(
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>,
        { wrapper: GlobalProvider }
      )
    );

    const element = container.querySelector("#backButton");

    await userEvent.click(element);

    expect(mockedNavigate).toHaveBeenCalledWith("/store");
  });
});
