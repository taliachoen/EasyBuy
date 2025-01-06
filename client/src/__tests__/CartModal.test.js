import { render, screen } from "@testing-library/react";
import CartModal from "../components/modal/CartModal";
import { GlobalContext } from "../context/GlobalContext";
import { MemoryRouter } from "react-router-dom";

const mockDeleteFn = jest.fn();
const mockAddToCartFn = jest.fn();
const mockRemoveFn = jest.fn();

const value = {
  cart: [
    {
      id: 1,
      title: "Essence Mascara Lash Princess",
      price: 9.99,
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    },
  ],
  totalProduct: 1,
  totalPrice: 9.99,
  deleteFromCart: mockDeleteFn,
  addToCart: mockAddToCartFn,
  removeFromCart: mockRemoveFn,
};

describe("Test CartModal component", () => {
  beforeEach(() => {
    render(
      <GlobalContext.Provider value={value}>
        <MemoryRouter>
        <CartModal />
        </MemoryRouter>
      </GlobalContext.Provider>
    );
  });

  test("Test CardModal shows the cart items", async () => {
    const element = screen.getByText("Essence Mascara Lash Princess");

    expect(element).toBeInTheDocument();
  });

  //  Test All Buttons
});
