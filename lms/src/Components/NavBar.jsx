import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { setLogout } from "../store/slices/auth";

import "../css/NavBar.css";
import authSlice from "../store/slices/auth";
import { fetcher } from "./Axios";

const links = [

  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

function NavBar() {
  const [clicked, setClicked] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const account = useSelector((state) => state.auth.account);

  useSWR(account?.id ? `/user/${account.id}/` : null, fetcher);

  const toggleMenu = () => {
    setClicked((prev) => !prev);
  };

 const handleLogout = () => {
  dispatch(setLogout());
  navigate("/login", { replace: true });
};

  return (
    <div className="navbar-container">
    <nav>
      <div className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <g>
            <path
              d="M20 0C25.3043 4.00466e-07 30.3919 2.10669 34.1426 5.85742C34.8157 6.53058 35.4354 7.24719 36 8H20C16.8174 8 13.7651 9.26421 11.5146 11.5146C9.26421 13.7651 8 16.8174 8 20H20L36.9102 9.31934C38.1656 11.3074 39.0611 13.5027 39.5547 15.8027L32 20H40L39.9941 20.4971C39.8669 25.6213 37.776 30.5092 34.1426 34.1426C30.3919 37.8933 25.3043 40 20 40C14.6957 40 9.60815 37.8933 5.85742 34.1426C5.18426 33.4694 4.56459 32.7528 4 32H20C23.1826 32 26.2349 30.7358 28.4854 28.4854C30.5952 26.3755 31.8383 23.5608 31.9854 20.5947L32 20H20L3.08984 30.6787C1.83452 28.6906 0.941002 26.4951 0.447266 24.1953L8 20H0C8.00931e-07 14.6957 2.1067 9.60815 5.85742 5.85742C9.60815 2.1067 14.6957 -5.79361e-10 20 0Z"
              fill="#0094F7"
            />
          </g>
        </svg>

        <h2>LMS</h2>
      </div>

      <ul className={clicked ? "navbar active" : "navbar"} id="navbar">
        {links.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          </li>
        ))}

        {account && (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>

      <div id="mobile" onClick={toggleMenu}>
        <i
          className={clicked ? "fas fa-times" : "fas fa-bars"}
          id="bar"
        />
      </div>
    </nav>
    </div>
  );
}

export default NavBar;