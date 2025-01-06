import React, { useContext, useState , useEffect } from "react";
import { authRequest } from "../../actions";
import { GlobalContext } from "../../context/GlobalContext";

const initialValues = {
  user_name: "",
  user_password: "",
  user_email: "",
};

export default function LoginForm() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");

  const { setIsAuth , setUser } = useContext(GlobalContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const path = isLoginPage ? "login" : "register";
      const result = await authRequest(values, path);
      if (result.success === false) return setError(result.message);
      
      path == "login" && setIsAuth(true)
      path == "login" && setUser(result)
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="w-full h-full flex justify-center items-center">
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 shadow-md w-1/5 rounded px-8 pt-6 pb-8 mb-4"
      >
        <h3 className="text-white text-center text-2xl">
          {isLoginPage ? "Login" : "Register"}
        </h3>
        {!isLoginPage && (
          <div className="mb-4">
            <label
              className="block text-white  text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              data-testid="inputAuth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="user_name"
              name="user_name"
              type="text"
              placeholder="Username"
              onChange={(e) => handleChange(e)}
              value={values.user_name}
            />
          </div>
        )}
        <div className="mb-4">
          <label
            className="block text-white  text-sm font-bold mb-2"
            htmlFor="useremail"
          >
            useremail
          </label>
          <input
            data-testid="inputAuth"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="user_email"
            name="user_email"
            type="text"
            placeholder="user_email"
            onChange={(e) => handleChange(e)}
            value={values.user_email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            data-testid="inputAuth"
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="user_password"
            name="user_password"
            type="password"
            placeholder="******************"
            onChange={(e) => handleChange(e)}
            value={values.user_password}
          />
          <p
            aria-label="error_result"
            id="error_result"
            className="text-red-500 text-lg font-semibold"
          >
            {error}
          </p>
          <p
            aria-label="changePage"
            onClick={() => setIsLoginPage((prev) => !prev)}
            className="text-xs text-blue-500 italic cursor-pointer"
          >
            You have Account?
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            aria-label="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLoginPage ? "Sign In" : "Sign Up"}
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;All rights reserved.
      </p>
    </div>
    </div>
  );
}
