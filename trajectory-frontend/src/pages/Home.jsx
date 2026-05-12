import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import '../style/Home.css';

/*
  Home page — pre-login landing page for Trajectory
  Structure:
    <Navbar />
    <Hero />          ← hero + trusted-by bar
    <Features />      ← how-it-works + features grid + skill gap preview + stats bar
    <Testimonials />
    <Footer />        ← CTA section + full footer
*/

const Home = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
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
