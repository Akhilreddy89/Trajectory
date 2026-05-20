import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../style/Home.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > 12);

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  const publicLinks = [
    {
      label: "Features",
      href: "/#features",
    },
    {
      label: "How it works",
      href: "/#how-it-works",
    },
    {
      label: "About",
      href: "/about",
    },
  ];

  const privateLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Bookmarks",
      href: "/bookmarks",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Roadmap",
      href: "/roadmap",
    }
  ];

  const links = isAuthenticated
    ? privateLinks
    : publicLinks;

  return (
    <header
      className="navbar"
      style={{
        boxShadow: scrolled
          ? "0 1px 20px rgba(108,92,231,0.08)"
          : "none",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="navbar-logo"
      >
        <div className="navbar-logo-icon">
          <svg viewBox="0 0 16 16">
            <polyline points="1,13 5,7 9,10 13,3 15,5" />
          </svg>
        </div>

        Tra<span>ject</span>ory
      </Link>

      {/* Navigation Links */}
      <nav>
        <ul className="navbar-links">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.href}
                className={
                  location.pathname === l.href
                    ? "active"
                    : ""
                }
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Side Buttons */}
      <div className="navbar-right">
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="btn-ghost">
                Log in
              </button>
            </Link>

            <Link to="/register">
              <button className="btn-primary">
                Get started free
              </button>
            </Link>
          </>
        ) : (
          <>
            <button
              className="btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;