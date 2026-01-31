import React, { useState, useEffect, useRef } from 'react';
import './About.css';

const MILESTONES = [
  {
    year: 2002, label: 'Uppväxt', location: 'Öxnevalla',
    description: 'Här växte jag upp och gick hela min skolgång, med ett stort intresse för djur, särskilt hästar.',
    image: '/images/2002.jpg'
  },
  {
    year: 2021, label: 'Studier', location: 'Jönköping',
    description: 'Jag flyttade för att studera på Jönköpings Tekniska Högskola, på programmet Datateknik: Mjukvaruutveckling med Mobila Plattformar.',
    image: '/images/2021.jpg'
  },
  {
    year: 2022, label: 'Programmering', location: 'Jönköping',
    description: 'Under mitt första år av studierna lärde jag mig grundläggande programmering. Det innefattade Objektorienterad programmering samt hur databaser och bl.a SQL fungerar.'
  },
  {
    year: 2023, label: 'Projekt', location: 'Jönköping',
    description: 'Under andra året lärde jag mig hur man satte ihop alla delar, databas och programmering, och jag lärde mig att göra hela projekt. Det var Android app, iOS app, två webbsidor. Hade min praktik på SAAB, Training & Simulation.'
  },
  {
    year: 2024, label: 'Examen', location: 'Jönköping',
    description: 'Tog examen som Dataingenjör. Fick pris och stipendie av Science Park för mitt examensarbete om teckenspråksigenkänning.',
    image: '/images/2024.jpg'
  },
  {
    year: 2025, label: 'Värnplikt', location: 'Halmstad',
    description: 'I mars påbörjade 15 månaders värnplikt på Luftvärnsregementet Lv6 i Halmstad, som Luftvärnsplutonbefäl.',
    image: '/images/2025.jpg'
  },
  {
    year: 2026, label: 'Nästa steg', location: '?',
    description: 'I mitt nästa kapitel ser jag fram emot att fortsätta min karriär som Dataingenjör, gärna med inslag av Försvarsmakten.'
  }
];

function About() {
  const [active, setActive] = useState(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particles = [];
    const COUNT = 25;

    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      p.className = 'ambient-particle';
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * -14;
      const drift = (Math.random() - 0.5) * 60;

      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${x}%; top: ${y}%;
        --drift: ${drift}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;
      container.appendChild(p);
      particles.push(p);
    }

    return () => particles.forEach(p => p.remove());
  }, []);

  return (
    <section id="about" className="about-page">
      <div className="ambient-particles" ref={particlesRef}></div>
      {/* Content area */}
      <div className="about-main">
        {active !== null ? (
          <div className="card" key={MILESTONES[active].year}>
            <div className="card-top">
              <div className="card-info">
                <div className="card-eyebrow">
                  <span className="card-chip">{MILESTONES[active].label}</span>
                  <span className="card-loc">{MILESTONES[active].location}</span>
                </div>
                <h1 className="card-year">{MILESTONES[active].year}</h1>
                <p className="card-desc">{MILESTONES[active].description}</p>
              </div>
              {MILESTONES[active].image && (
                <div className="card-photo">
                  <img src={MILESTONES[active].image} alt={`${MILESTONES[active].year}`} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="about-idle">
            <h1 className="about-idle-name">Ellen Carlsson</h1>
            <p className="about-idle-sub">Dataingenjör</p>
            <p className="about-idle-hint">Välj en punkt på tidslinjen</p>
          </div>
        )}
      </div>

      {/* Timeline bar at bottom */}
      <div className="timeline">
        <div className="timeline-track">
          <div className="timeline-line"></div>
          {MILESTONES.map((m, i) => (
            <button
              key={m.year}
              className={`tl-node ${active === i ? 'active' : ''}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className="tl-dot"></div>
              <div className="tl-label">{m.year}</div>
              <div className="tl-sublabel">{m.label}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
