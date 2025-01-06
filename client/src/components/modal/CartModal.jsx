import React, { useContext } from "react";
import { MdOutlineCancel, MdDeleteForever } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function CartModal() {
  const { cart, totalProduct, totalPrice, deleteFromCart , addToCart , removeFromCart } =
    useContext(GlobalContext);

    const navigate = useNavigate();

  return (
    <dialog
      id="cartModal"
      className="modal fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
    >
      {/* Header */}
      <div className="modal-box w-full max-w-lg bg-white shadow-lg rounded-3xl p-6 relative">
        <MdOutlineCancel
          size={25}
          onClick={() => cartModal.close()}
          className=" cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
        />

        <h4 className="text-base font-bold text-gray-800 mt-6">
          {totalProduct} Items
        </h4>

        {/* Main */}
        <div className="space-y-4 mt-6">
          {cart.map((product) => (
            <div key={product.id} className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <img
                  src={product.thumbnail}
                  className="w-16 h-16 p-2 shrink-0 bg-gray-200 rounded-md"
                />
                <div className="ml-4">
                  <p className="text-sm text-gray-800">{product.title}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                    onClick={() => addToCart(product)}
                      type="button"
                      className="w-5 h-5 text-sm focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      +
                    </button>

                    <p className="text-gray-500 text-xs mt-1">
                      {product.quantity}
                    </p>
                    <button
                    onClick={() => removeFromCart(product.id)}
                      type="button"
                      className="w-5 h-5 text-sm focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-base font-bold text-gray-800 mr-4">
                  ${product.price}
                </span>
                <MdDeleteForever
                  size={25}
                  onClick={() => deleteFromCart(product.id)}
                  className=" fill-red-500 inline cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Before Footer */}
        <div className="flex mt-6">
          <span className="text-base font-bold text-gray-800 flex-1">
            Total
          </span>
          <span className="text-base font-bold text-gray-800">
            ${totalPrice}
          </span>
        </div>

        {/* Footer */}
        <div className="flex max-sm:flex-col gap-4 mt-6">
          <button
            type="button"
            className="text-sm px-5 py-2.5 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md tracking-wide"
          >
            Continue shopping
          </button>
          <button
          onClick={() => {
            navigate("/order")
            cartModal.close();
          }}
            type="button"
            className="text-sm px-5 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md tracking-wide"
          >
            Pay
          </button>
        </div>
      </div>
    </dialog>
  );
}
