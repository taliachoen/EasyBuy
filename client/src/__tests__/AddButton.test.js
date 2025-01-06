import { render, screen } from "@testing-library/react";
import AddButton from "../components/common/AddButton";
import { GlobalContext } from "../context/GlobalContext";
import userEvent from "@testing-library/user-event";

const product = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  category: "beauty",
  price: 9.99,
  rating: 4.94,
  stock: 5,
  thumbnail:
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
};

describe("test AddButton Component", () => {
  const mockAddToCart = jest.fn();
  beforeEach(() => {
    render(
      <GlobalContext.Provider value={{ addToCart: mockAddToCart }}>
        <AddButton product={product} />
      </GlobalContext.Provider>
    );
  });
  test("test Click Button Event work expected", async () => {
    const btn = screen.getByRole("button", { name: "AddBtn" });

    await userEvent.click(btn);

    expect(mockAddToCart).toHaveBeenCalledWith(product);
  });
});
