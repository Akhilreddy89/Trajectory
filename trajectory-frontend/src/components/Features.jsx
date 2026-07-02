import React, { useState } from 'react';
import '../style/Home.css';

const STEPS = [
  {
    num: '1',
    title: 'Build your profile',
    desc: 'Tell us your current skills, your career goal, and how you like to learn — video, docs, or hands-on projects.',
    color: 'var(--p)',
  },
  {
    num: '2',
    title: 'Discover your skill gaps',
    desc: 'Our engine compares your skills with what your target role actually requires — and shows exactly what is missing.',
    color: 'var(--t)',
  },
  {
    num: '3',
    title: 'Follow your roadmap',
    desc: 'Get a structured, ordered learning path with personalized resource recommendations in your preferred format.',
    color: 'var(--coral)',
  },
];

/* ── Features data ──────────────────────────────── */
const FEATURES = [
  {
    accent: true,
    iconClass: 'white',
    title: 'AI skill gap engine',
    desc: 'We compare your skills against real job requirements and surface exactly what to learn next — no guesswork.',
    tag: 'Core feature',
    tagClass: 'white',
  },
  {
    iconClass: 'purple',
    title: 'Personalized roadmaps',
    desc: 'A step-by-step, ordered learning path built around your goal — Full Stack, ML, Cyber Security, and more.',
    tag: 'Roadmap',
    tagClass: 'purple',
  },
  {
    iconClass: 'teal',
    title: 'Multi-source recommendations',
    desc: 'YouTube, Udemy, official docs, and project sites — all in one place, filtered by your learning style and level.',
    tag: 'Discovery',
    tagClass: 'purple',
  },
  {
    iconClass: 'amber',
    title: 'Smart search',
    desc: 'Search uses your profile to surface the most relevant resources for your level and goal — not just keywords.',
    tag: 'Search',
    tagClass: 'purple',
  },
];

const GAPS = [
  { skill: 'HTML & CSS',  pct: 100, label: '100% — complete',    status: 'done', fill: '#00B894' },
  { skill: 'JavaScript', pct: 100, label: '100% — complete',    status: 'done', fill: '#00B894' },
  { skill: 'React',       pct: 31,  label: '31% — in progress',  status: 'prog', fill: '#6C5CE7' },
  { skill: 'Node.js',     pct: 0,   label: '0% — not started',   status: 'none', fill: '#E8E6F5' },
  { skill: 'MongoDB',     pct: 0,   label: '0% — not started',   status: 'none', fill: '#E8E6F5' },
];

const STATS = [
  { num: '12K+', label: 'Active students' },
  { num: '340+', label: 'Curated resources' },
  { num: '18',   label: 'Career domains' },
  { num: '4.9★', label: 'Average rating' },
];

const Features = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <>
      <section className="how-it-works" id="how-it-works">
        <p className="section-label">How it works</p>
        <h2 className="section-title">From signup to roadmap in 3 minutes</h2>
        <p className="section-sub">
          No more searching endlessly. Trajectory guides you from day one.
        </p>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div className="step-card" key={s.num}>
              <div className="step-num" style={{ color: s.color, borderColor: s.color + '44', background: s.color + '18' }}>
                {s.num}
              </div>
              <span className="step-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section" id="features">
        <p className="section-label">Features</p>
        <h2 className="section-title">Everything a student needs — in one place</h2>
        <p className="section-sub">
          Not just another course platform. Trajectory is your intelligent learning co-pilot.
        </p>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className={`feat-card${f.accent ? ' accent' : ''}`} key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className={`feat-tag ${f.tagClass}`}>{f.tag}</span>
            </div>
          ))}
        </div>
        <div className="gap-preview">
          <div className="gap-preview-header">
            <h4>Skill gap analysis — live preview</h4>
            <span className="gap-domain-badge">Full Stack Dev</span>
          </div>
          {GAPS.map((g) => (
            <div className="gap-row" key={g.skill}>
              <div className="gap-row-top">
                <span className="gap-skill-name">{g.skill}</span>
                <span className={`gap-pct ${g.status}`}>{g.label}</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${Math.max(g.pct, g.pct === 0 ? 1.5 : g.pct)}%`, background: g.fill }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

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

    </>
  );
};

export default Features;
