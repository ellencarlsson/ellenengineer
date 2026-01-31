import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [active, setActive] = useState(MILESTONES.length - 1);
  const [isDragging, setIsDragging] = useState(false);
  const particlesRef = useRef(null);
  const timelineRef = useRef(null);
  const activeRef = useRef(active);
  const dotRefs = useRef([]);
  const blobRef = useRef(null);
  const prevActiveRef = useRef(null);

  useEffect(() => { activeRef.current = active; }, [active]);

  // Energy blob travel animation
  useEffect(() => {
    const blob = blobRef.current;
    const track = timelineRef.current;

    if (!blob || !track) {
      prevActiveRef.current = active;
      return;
    }

    if (active === null) {
      blob.style.opacity = '0';
      prevActiveRef.current = active;
      return;
    }

    const prev = prevActiveRef.current;
    const trackRect = track.getBoundingClientRect();

    if (prev !== null && prev !== active && dotRefs.current[prev] && dotRefs.current[active]) {
      const fromDot = dotRefs.current[prev];
      const toDot = dotRefs.current[active];
      const fromX = fromDot.getBoundingClientRect().left + fromDot.getBoundingClientRect().width / 2 - trackRect.left;
      const toX = toDot.getBoundingClientRect().left + toDot.getBoundingClientRect().width / 2 - trackRect.left;

      blob.style.transition = 'none';
      blob.style.left = fromX + 'px';
      blob.style.opacity = '1';
      void blob.offsetHeight;

      const dist = Math.abs(toX - fromX);
      const duration = Math.min(0.6, Math.max(0.25, dist / 600));
      blob.style.transition = `left ${duration}s ease, opacity 0.2s ease ${duration}s`;
      blob.style.left = toX + 'px';
      blob.style.opacity = '0';
    }

    prevActiveRef.current = active;
  }, [active]);

  // Arrow key navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') {
        setActive(prev => {
          if (prev === null) return 0;
          return Math.min(prev + 1, MILESTONES.length - 1);
        });
      } else if (e.key === 'ArrowLeft') {
        setActive(prev => {
          if (prev === null) return MILESTONES.length - 1;
          if (prev === 0) return null;
          return prev - 1;
        });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Particle effect
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

  const getClosestMilestone = useCallback((clientX) => {
    const track = timelineRef.current;
    if (!track) return null;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const index = Math.round(ratio * (MILESTONES.length - 1));
    return index;
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const idx = getClosestMilestone(clientX);
      if (idx !== null && idx !== activeRef.current) {
        setActive(idx);
      }
    };

    const handleUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, getClosestMilestone]);

  const handleTrackClick = (e) => {
    if (isDragging) return;
    if (e.target.closest('.tl-node')) return;
    const idx = getClosestMilestone(e.clientX);
    if (idx !== null) setActive(idx);
  };

  const handleThumbDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const m = active !== null ? MILESTONES[active] : null;

  return (
    <section id="about" className="about-page">
      <div className="ambient-particles" ref={particlesRef}></div>

      <div className="about-main">
        {m ? (
          <div className={`card-layout${m.image ? ' has-image' : ''}`} key={active}>
            <div className="card-text">
              <div className="card-eyebrow">
                <span className="card-chip">{m.label}</span>
                <span className="card-loc">{m.location}</span>
              </div>
              <h1 className="card-year">{m.year}</h1>
              <p className="card-desc">
                <span className="card-prompt">&gt; </span>
                {m.description}
              </p>
            </div>
            {m.image && (
              <div className="card-image">
                <div className="glitch-img">
                  <img src={m.image} alt={`${m.year}`} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="about-idle">
            <h1 className="about-idle-name">Ellen Carlsson</h1>
            <p className="about-idle-sub">Dataingenjör</p>
            <p className="about-idle-hint">Välj en punkt på tidslinjen</p>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="timeline">
        <div
          className="timeline-track"
          ref={timelineRef}
          onClick={handleTrackClick}
        >
          <div className="timeline-line">
            <span className="tl-spark" style={{ animationDuration: '2.8s', animationDelay: '0s' }} />
            <span className="tl-spark" style={{ animationDuration: '3.4s', animationDelay: '-1.2s' }} />
            <span className="tl-spark" style={{ animationDuration: '2.2s', animationDelay: '-0.6s' }} />
            <span className="tl-spark" style={{ animationDuration: '4s', animationDelay: '-2.5s' }} />
          </div>
          <div className="tl-energy-blob" ref={blobRef} />
          {MILESTONES.map((ms, i) => (
            <button
              key={ms.year}
              className={`tl-node ${active === i ? 'active' : ''}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div
                className={`tl-dot${active === i && isDragging ? ' dragging' : ''}`}
                ref={el => { dotRefs.current[i] = el; }}
                onMouseDown={active === i ? handleThumbDown : undefined}
                onTouchStart={active === i ? handleThumbDown : undefined}
              ></div>
              <div className="tl-label">{ms.year}</div>
              <div className="tl-sublabel">{ms.label}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
