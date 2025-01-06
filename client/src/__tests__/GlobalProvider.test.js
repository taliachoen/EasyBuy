import { fireEvent, render, screen } from "@testing-library/react";
import GlobalProvider, { GlobalContext } from "../context/GlobalContext";

const product = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  category: "beauty",
  price: 9.99,
};

describe("test globalprovider", () => {
  test("test demo", () => {
    const { getByText , getByTestId } = render(
      <GlobalProvider>
        <GlobalContext.Consumer>
          {(value) => (
            <>
              <button onClick={() => value.addToCart(product)}>Add</button>
              <p data-testid="testid" >{JSON.stringify(value.cart)}</p>
            </>
          )}
        </GlobalContext.Consumer>
      </GlobalProvider>
    );

    fireEvent.click(getByText("Add"));

    product.quantity = 1

    expect(getByTestId("testid")).toHaveTextContent(JSON.stringify([product]));
  });
});
