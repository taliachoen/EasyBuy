import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ProfileForm from "../forms/ProfileForm";

export default function ProfileModal() {
  const { user } = useContext(GlobalContext);

  return (
    <dialog
      id="profileModal"
      className="modal fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
    >
      {/* Header */}
      <div className="modal-box w-full max-w-lg bg-dark shadow-lg rounded-3xl p-6 relative">
       <ProfileForm />
      </div>
    </dialog>
  );
}
