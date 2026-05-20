import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Dashboard from './Dashboard';
import { useAuth } from '../context/authContext';
import '../style/Home.css';



const Home = () => {
  const { isAuthenticated } = useAuth();
  
    return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <main>
          <Hero />
          <Features />
          <Testimonials />
        </main>
      )}
      <Footer />
    </div>
  );
}
export default Home;
