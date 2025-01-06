import { findByRole, render, screen } from "@testing-library/react";
import Store from "../components/pages/privateRoutes/Store";
import axios from "axios";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import GlobalProvider from "../context/GlobalContext";

const axiosDummyObject = {
  data: {
    products: [
      {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        category: "beauty",
        price: 9.99,
        discountPercentage: 7.17,
        rating: 4.94,
        stock: 5,
        tags: [],
        brand: "Essence",
        sku: "RCH45Q1A",
        weight: 2,
        dimensions: {},
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 1 month",
        availabilityStatus: "Low Stock",
        reviews: [],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 24,
        meta: {},
        images: [
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
      },
    ],
  },
};

const errorAxios = {
  response:{
    data:{
      message:"axios request failed"
    }
  }
}

// when we change the state in the component we need wrapped component with act for wait all the operations done.

jest.mock("axios");

describe("Test Store Component", () => {
  test("Test if Store Component send Axios request in Mounting", async () => {
    axios.get.mockResolvedValue(axiosDummyObject);

    await act(() =>
      render(
        <MemoryRouter>
          <Store />
        </MemoryRouter>
      ,{wrapper:GlobalProvider})
    );

    expect(axios.get).toHaveBeenCalled();
  });
  test("Test if Store Component send Axios request in Mounting Failed", async () => {
    axios.get.mockRejectedValue(errorAxios);

    const { container  } = await act(() =>
      render(
        <MemoryRouter>
          <Store />
        </MemoryRouter>
      )
    );

    // ref to error element when request failed
    const errorElement = container.querySelector("#error_result");

    expect(axios.get).toHaveBeenCalled();
    expect(errorElement).toBeInTheDocument()
  });
  test("Test components shows StoreCard with Api Details", async () => {
    axios.get.mockResolvedValue(axiosDummyObject);

    await act(() =>
      render(
        <MemoryRouter>
          <Store />
        </MemoryRouter>
      ,{wrapper:GlobalProvider})
    );
    const title = axiosDummyObject.data.products[0].title;
    const element = await screen.findByText(title);

    expect(element).toBeInTheDocument();
  });
});
