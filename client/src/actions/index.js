import axios from "axios";

const url = "https://dummyjson.com/products?limit=15";
const authServer = "http://localhost:3000/api/users/";

export async function getProducts() {
  try {
    const { data } = await axios.get(url);

    return data.products;
  } catch (error) {
    return { success: false, error };
  }
}

export async function authRequest(values, path) {
  path == "login" && delete values?.user_name;
  try {
    const { data } = await axios.post(`${authServer}${path}`, values, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return { message: error.response.data.message, success: false };
  }
}

export async function logOutFn() {
  try {
    const { data } = await axios.get("http://localhost:3000/api/users/logout", {
      withCredentials: true,
    });

    return data.success
  } catch (error) {
   return error 
  }
}
