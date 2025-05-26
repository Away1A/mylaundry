import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import logoImage from "../assets/laundry.png";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSide}>
        <img
          src={logoImage}
          alt="Login Illustration"
          className={styles.logoImage}
        />
      </div>{" "}
      <ul>
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            <span className="icon">🏠</span>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/customers"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            <span className="icon">👥</span>
            <span>Customers</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            <span className="icon">🛒</span>
            <span>Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            <span className="icon">👤</span>
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              window.location.href = "/login";
            }}
          >
            <span className="icon">🚪</span>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
