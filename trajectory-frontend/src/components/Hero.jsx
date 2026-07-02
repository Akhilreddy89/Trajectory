import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css';


const Hero = () => {
  return (
    <>
      <section className="hero" id="hero">
        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          AI-powered learning — built for students
        </div>

        {/* Headline */}
        <h1>
          Your personalized path<br />
          from <span>confused</span> to career-ready
        </h1>

        {/* Subtext */}
        <p className="hero-sub">
          Trajectory analyzes your skills, finds the gaps, and builds a step-by-step
          roadmap — with exactly the right resources for how you learn.
        </p>

        {/* CTAs */}
        <div className="hero-actions">
          <Link to="/register">
            <button className="btn-primary btn-lg">
              Start for free &rarr;
            </button>
          </Link>
          <Link to="/#how-it-works">
            <button className="btn-outline btn-lg">
              ▶&nbsp; See how it works
            </button>
          </Link>
        </div>

        {/* Social proof */}
        {/* <div className="hero-social">
          <div className="avatars">
            {AVATARS.map((av) => (
              <div
                key={av.initials}
                className="av"
                style={{ background: av.bg, color: av.color || '#fff' }}
              >
                {av.initials}
              </div>
            ))}
          </div>
          <span>
            Joined by <strong>12,400+</strong> students this month
          </span>
        </div> */}
      </section>

      {/* ── Trusted by ────────────────────────── */}
      {/* <div className="trusted">
        <p className="trusted-label">Students from these colleges use Trajectory</p>
        <div className="trusted-logos">
          {COLLEGES.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Hero;
