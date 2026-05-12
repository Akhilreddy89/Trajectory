import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css';

const FOOTER_LINKS = {
  Product: ['Features', 'How it works', 'Roadmaps', 'Smart Search'],
  Domains: ['Full Stack Dev', 'Machine Learning', 'Cyber Security', 'Data Science'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
};

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thanks! We'll reach out to ${email} soon.`);
    setEmail('');
  };

  return (
    <>
      {/* ── CTA Section ──────────────────────── */}
      <section className="cta-section">
        <h2>
          Ready to build your <span>trajectory</span>?
        </h2>
        <p>
          Join thousands of students who replaced confusion with clarity.
          Free to start — no credit card needed.
        </p>
        <form className="cta-input-row" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Get started &rarr;</button>
        </form>
        <p className="cta-note">Free forever plan available. No spam, ever.</p>
      </section>

      {/* ── Footer ───────────────────────────── */}
      <footer className="footer">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="logo-row">
              <span className="logo-dot" />
              Trajectory
            </div>
            <p>
              An AI-powered personalized learning platform helping students go
              from confusion to career-ready.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div className="footer-col" key={heading}>
              <h4>{heading}</h4>
              {links.map((l) => (
                <a href="#" key={l}>{l}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Trajectory. Built for students, by students.</p>
          <div className="footer-socials">
            <div className="soc-btn" title="Twitter">𝕏</div>
            <div className="soc-btn" title="GitHub">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </div>
            <div className="soc-btn" title="LinkedIn">in</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
