import React from 'react';
import '../style/Home.css';

const TESTIMONIALS = [
  {
    initials: 'RS',
    bg: '#6C5CE7',
    name: 'Rahul S.',
    role: 'CS Student · IIT Bombay',
    text: '"I was overwhelmed by how many tutorials exist. Trajectory told me exactly what to learn and in what order. Game changer."',
  },
  {
    initials: 'MP',
    bg: '#00B894',
    name: 'Meera P.',
    role: 'Aspiring ML Engineer · VIT',
    text: '"The skill gap feature is incredible. It showed me I needed TypeScript before Next.js — I had no idea."',
  },
  {
    initials: 'AK',
    bg: '#E17055',
    name: 'Aryan K.',
    role: 'Full Stack Intern · Bangalore',
    text: '"Got my first internship after 3 months of following my Trajectory roadmap. The structure made all the difference."',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <p className="section-label">Testimonials</p>
      <h2 className="section-title">What students say</h2>
      <p className="section-sub">
        Real stories from people who stopped searching and started building.
      </p>

      <div className="testi-grid">
        {TESTIMONIALS.map((t) => (
          <div className="testi-card" key={t.name}>
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">{t.text}</p>
            <div className="testi-user">
              <div className="testi-av" style={{ background: t.bg }}>
                {t.initials}
              </div>
              <div>
                <div className="name">{t.name}</div>
                <div className="role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
