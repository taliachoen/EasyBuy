import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function ProfileForm() {
  const { user } = useContext(GlobalContext);
  return (
    <form className="max-w-sm mx-auto">
      <h1 className="text-center text-3xl font-semibold mb-5">Edit Profile</h1>
      <input
        type="text"
        id="user_name"
        name="user_name"
        className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={user?.user_name}
      />
      <input
        type="email"
        id="user_email"
        name="user_email"
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={user?.user_email}
      />
      <input
        type="text"
        id="user_password"
        name="user_password"
        className="my-5 bg-gray-100 border border-gray-300
         text-gray-900 text-sm rounded-lg focus:ring-blue-500
          focus:border-blue-500 block w-full p-2.5 
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value="New Password"
      />
      <input
        type="text"
        id="confirmPassword"
        name="confirmPassword"
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value="Confirm Password"
      />

      <div className="mt-5 flex justify-center items-center gap-5">
        <button type="submit" className="btn btn-outline btn-primary">
          EDIT
        </button>
        <button
          onClick={() => profileModal.close()}
          type="button"
          className="btn btn-outline btn-error"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}
