import React from "react";
import { Link } from "react-router-dom";

export default function Avatar({ logout }) {
  return (
    <div data-testid="avatar-element" className="dropdown dropdown-bottom">
      <div tabIndex={0} role="button" className="avatar">
        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <Link to={"/profile"}>profile</Link>
        </li>
        <li>
          <Link to={"/myOrders"}>Orders</Link>
        </li>
        <li>
          <button aria-label="logout" onClick={logout}>logOut</button>
        </li>
      </ul>
    </div>
  );
}
