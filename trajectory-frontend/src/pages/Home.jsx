import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import "../style/Home.css";
import {useAuth} from "../context/AuthContext.jsx";

const Home = () => {
  const {isAuthenticated, loading} = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace(/^#/, "");
    const section = document.getElementById(id);

    if (section) {
      requestAnimationFrame(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.hash]);

  return (
    <div style={{ minHeight: "100vh" }}>
      
      <Navbar />

      <main>
        <Hero />
        <Features />
        {/* <Testimonials /> */}
      </main>

      <Footer />
    </div>
  );
};

export default Home;