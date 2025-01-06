import React, { useContext } from "react";
import ContactForm from "../../forms/ContactForm";
import { GlobalContext } from "../../../context/GlobalContext";

export default function Contact() {
  const { isAuth } = useContext(GlobalContext);

  return (
    <div className="">
      <h1 className="text-3xl text-center my-5 font-semibold text-white">
        טופס השארת פרטים
      </h1>
      {isAuth ? (
        <ContactForm />
      ) : (
        <p aria-label="not_auth_message" className="text-center text-white text-3xl font-semibold">
          המשתמש אינו מורשה לבצע שליחת טופס!
        </p>
      )}
    </div>
  );
}
