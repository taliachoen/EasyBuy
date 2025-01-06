import React, { useContext } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalContext";

export default function AddButton({ product }) {
  const { addToCart } = useContext(GlobalContext);
  return (
    <button
      aria-label="AddBtn"
      onClick={() => addToCart(product)}
      type="button"
      className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-yellow-500 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-bg-yellow-500 hover:bg-yellow-700"
    >
      Add To Cart
      <FaLongArrowAltRight className="ml-3" size={20} />
    </button>
  );
}
