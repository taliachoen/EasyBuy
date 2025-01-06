import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { logOutFn } from "../actions";

export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);
  // Auth Actions

  async function authUser() {
    try {
      const { data } = await axios.get("http://localhost:3000/api/users/auth", {
        withCredentials: true,
      });
      if (data.success) {
        setIsAuth(true);
        setUser(data.user);
      }
    } catch (error) {
      return error;
    }
  }

  async function logOut() {
    const isSuccess = await logOutFn();
    if (isSuccess) {
      setIsAuth(false);
      setUser(null);
    }
  }

  useEffect(() => {
    authUser();
  }, []);

  // Cart Actions
  function addToCart(product) {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === product.id
      );
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === id
      );
      if (cart[existingItemIndex].quantity == 1) {
        return prevCart.filter(
          (item) => item.id !== cart[existingItemIndex].id
        );
      } else {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity -= 1;
        return newCart;
      }
    });
  }

  function deleteFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  useEffect(() => {
    setTotalProduct(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  useEffect(() => {
    setTotalPrice(
      cart.reduce((total, item) => total + item.quantity * item.price, 0)
    );
  }, [cart]);

  // Save Order For unAuth Users
  useEffect(() => {
    if (!cart.length) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if(!localStorage.getItem("cart")) return;
    setCart(JSON.parse(localStorage.getItem("cart")))
  },[]);

  

  const value = {
    isAuth,
    setIsAuth,
    addToCart,
    cart,
    totalProduct,
    totalPrice,
    deleteFromCart,
    removeFromCart,
    user,
    logOut,
    setUser,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalProvider;
