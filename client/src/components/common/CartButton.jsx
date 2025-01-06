import React, { useContext } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalContext";

export default function CartButton({ onClick }) {
  
  const { totalProduct } = useContext(GlobalContext);

  return (
    <button
      aria-label="CartBtn"
      onClick={onClick}
      className="flex items-center space-x-3 rtl:space-x-reverse relative"
    >
      <span className="bg-purple-100 absolute -top-2 -right-5 text-purple-800 text-xs font-medium me-2 px-2 py-0.2 rounded-full dark:bg-purple-900 dark:text-purple-300">
        {totalProduct}
      </span>

      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        <FaCartArrowDown size={30} color="white" />
      </span>
    </button>
  );
}
