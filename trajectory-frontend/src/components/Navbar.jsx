import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const publicLinks = [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "About", href: "/about" },
  ];

  return (
    <header
      className={`navbar public-nav ${
        scrolled ? "navbar-scrolled" : ""
      }`}
      style={{
        boxShadow: scrolled
          ? "0 1px 20px rgba(108,92,231,0.08)"
          : "none",
      }}
    >
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <svg viewBox="0 0 16 16">
              <polyline points="1,13 5,7 9,10 13,3 15,5" />
            </svg>
          </div>
          Trajectory
        </Link>
      </div>

      <nav className="navbar-center-nav">
        <ul className="navbar-links">
          {publicLinks.map((l) => (
            <li key={l.label}>
              <Link
                to={l.href}
                className={
                  location.pathname === l.href ? "active" : ""
                }
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="navbar-right">
        <Link to="/login">
          <button className="btn-ghost">Log in</button>
        </Link>

        <Link to="/register">
          <button className="btn-primary">
            Get started free
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;