import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import About from "./components/pages/privateRoutes/About";
import Store from "./components/pages/privateRoutes/Store";
import Contact from "./components/pages/privateRoutes/Contact";
import Home from "./components/pages/privateRoutes/Home";
import Nav from "./components/section/Nav";
import ProductPage from "./components/pages/privateRoutes/ProductPage";
import Login from "./components/pages/publicRoutes/Login";
import CartModal from "./components/modal/CartModal";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Profile from "./components/pages/privateRoutes/Profile";
import ProfileModal from "./components/modal/ProfileModal";
import OrderPage from "./components/pages/privateRoutes/OrderPage";
import MyOrders from "./components/pages/privateRoutes/MyOrders";

function Root() {
  return (
    <div style={{minHeight:"100vh"}} className="bg-[#111827]">
      <Nav />
      <Outlet />
      <CartModal />
      <ProfileModal />
    </div>
  );
}

function App() {
  const { isAuth } = useContext(GlobalContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="login" element={<Login />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="store" element={<Store />} />
        <Route path="store/:id" element={<ProductPage />} />
        <Route path="order" element={<OrderPage />} />
        {/* Private Routes */}
        <Route element={isAuth ? <Outlet /> : <Navigate to={"/login"} />}>
          <Route path="profile" element={<Profile />} />
          <Route path="myOrders" element={<MyOrders />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
