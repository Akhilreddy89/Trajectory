import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import "../style/Home.css";
import {useAuth} from "../context/AuthContext.jsx";

const Home = () => {
  const {isAuthenticated, loading} = useAuth();

  return (
    <div style={{ minHeight: "100vh" }}>
      
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default Home;