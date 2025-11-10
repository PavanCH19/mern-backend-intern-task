import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav style={styles.navbar}>
        <div style={styles.brand}>TaskManager</div>
        <div style={styles.links}>
          <NavLink
            to="/login"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.activeLink } : styles.link
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.activeLink } : styles.link
            }
          >
            Register
          </NavLink>
          <NavLink
            to="/dashboard"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.activeLink } : styles.link
            }
          >
            Dashboard
          </NavLink>
        </div>
      </nav>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(135deg, #5563DE, #74ABE2)",
    padding: "15px 30px",
    color: "#fff",
    flexWrap: "wrap",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "22px",
    letterSpacing: "1px",
  },
  links: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px",
    transition: "0.3s ease",
    padding: "8px 14px",
    borderRadius: "8px",
  },
  activeLink: {
    background: "#fff",
    color: "#5563DE",
    fontWeight: "bold",
  },
  main: {
    padding: "20px",
  },
};
