import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
  return (
    <nav id="mainNav">
      <ul class="navGroup navBrand">
        <li>
          <Link to="/">OfficePlace</Link>
        </li>
      </ul>
      <ul class="navGroup">
        <li>
          <Link to="/users">USERS</Link>
        </li>
        <li>
          <Link to="/items">ITEMS</Link>
        </li>
        <li>
          <Link to="/login">
            <button>LOGIN</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
