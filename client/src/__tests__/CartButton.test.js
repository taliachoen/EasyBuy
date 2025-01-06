import { render, screen } from "@testing-library/react";
import CartButton from "../components/common/CartButton";
import { GlobalContext } from "../context/GlobalContext";
import userEvent from "@testing-library/user-event";

describe("Test CartButton", () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    render(
      <GlobalContext.Provider value={{ totalProduct: "5" }}>
        <CartButton onClick={mockFn} />
      </GlobalContext.Provider>
    );
  });

  afterEach(() => jest.clearAllMocks());

  test("Test CartButton work like expected and fireEvent", async () => {
    const btn = screen.getByRole("button", { name: "CartBtn" });
    await userEvent.click(btn);

    expect(mockFn).toHaveBeenCalled();
  });

  test("test TotalProduct State show inTheDocument", () => {
    const element = screen.getByText("5");
    expect(element).toBeInTheDocument();
  });
});
