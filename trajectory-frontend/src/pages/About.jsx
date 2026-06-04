import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import '../style/About.css';

function About() {
  return (
    <div className="about-page">
      <Navbar />

      <section className="about-hero">
        <span className="section-label">About Trajectory</span>
        <h1>Helping learners build career-ready skills with clarity and confidence.</h1>
        <p>
          Trajectory is an AI-driven learning platform built for students and professionals who want a
          clear path toward their dream career. We connect your goals, interests, and learning style
          to curated courses, roadmaps, and progress tools.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn-primary">Get started</Link>
          <Link to="/about" className="btn-outline">Learn more</Link>
        </div>
      </section>

      <section className="about-grid">
        <article className="about-card">
          <h3>Personalized learning</h3>
          <p>
            We tailor course recommendations based on your skills, interests, and career objectives so
            every step on your learning journey feels purposeful.
          </p>
        </article>

        <article className="about-card">
          <h3>Guided roadmap</h3>
          <p>
            Build a custom roadmap that shows you what to learn next, when to practice, and how to stay
            on track toward a meaningful outcome.
          </p>
        </article>

        <article className="about-card">
          <h3>Progress and momentum</h3>
          <p>
            Track your progress with simple metrics, stay motivated with milestones, and discover new
            opportunities that match your growing skill set.
          </p>
        </article>
      </section>

      <section className="about-values">
        <div className="value-row">
          <div>
            <span className="section-label">Our mission</span>
            <h2>Make career learning simple and intentional.</h2>
            <p>
              Too many learners feel lost chasing random courses. Trajectory brings structure, relevance,
              and confidence to the process so users can move from confusion to career-ready faster.
            </p>
          </div>
          <ul>
            <li>Goal-based course recommendations.</li>
            <li>Interest-driven pathway creation.</li>
            <li>Easy-to-use learning progress tools.</li>
          </ul>
        </div>

        <div className="value-row">
          <div>
            <span className="section-label">What we believe</span>
            <h2>Learning should be useful, motivating, and accessible.</h2>
            <p>
              Every learner deserves a clear plan that fits their preferences, schedule, and future goals.
              Our platform is designed to keep learning meaningful and progress measurable.
            </p>
          </div>
          <ul>
            <li>A simple path beats a long to-do list.</li>
            <li>Context matters more than content alone.</li>
            <li>Small wins build lasting momentum.</li>
          </ul>
        </div>
      </section>

      <section className="about-owner">
        <h2>Founder</h2>
        <p>
          Trajectory was created by Manda Akhil Reddy to help students find the right courses and build
          a learning plan that supports real career goals.
        </p>
        <p>
          If you have suggestions, questions, or would like to collaborate, reach out at{' '}
          <a href="mailto:contact@trajectory.com">contact@trajectory.com</a>.
        </p>
      </section>

      <Footer />
    </div>
  );
}

export default About;
