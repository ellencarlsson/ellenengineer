/**
 * @file About page with interactive timeline and milestones.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ImageWithSkeleton from '../../components/Skeleton/ImageWithSkeleton';
import './About.css';

/** Milestones displayed on the timeline. */
const MILESTONES = [
  {
    year: 2002, label: 'Intro', location: 'Öxnevalla',
    description: 'Jag är född och uppvuxen på landet mellan Borås och Varberg, där jag gick hela min skolgång. Jag växte upp med mamma, pappa och min lillebror, omgiven av djur. När jag var mindre red jag mycket och spenderade stor del av tiden med hästar. Idag har vi 3 hästar, 4 får och 1 hund.\n\nUnder gymnasiet visste jag att jag ville plugga vidare, och teknik och data kändes spännande.',
    image: '/images/2002.jpg'
  },
  {
    year: 2021, label: 'Började studera', location: 'Jönköping',
    description: 'Jag flyttade till Jönköping för att studera på Jönköpings Tekniska Högskola, programmet Datateknik: Mjukvaruutveckling med Mobila Plattformar. Jag trivdes direkt och tyckte utbildningen var rolig. Det kändes som att jag hade hamnat rätt.',
    image: '/images/2021.jpg'
  },
  {
    year: 2022, label: 'Första året', location: 'Jönköping',
    description: 'Under första året lärde jag mig grunderna i programmering, bland annat objektorienterad programmering och databaser med SQL. Det var mycket nytt, men det var kul.'
  },
  {
    year: 2023, label: 'Andra året', location: 'Jönköping',
    description: 'Under andra året lärde jag mig hur man satte ihop alla delar, databas och programmering, och jag fick göra hela projekt. Det var Android-app, iOS-app och två webbsidor.\n\nJag hade min praktik på SAAB, Training & Simulation. Det var intressant att vara på ett riktigt företag och se hur det gick till i praktiken.'
  },
  {
    year: 2024, label: 'Examen', location: 'Jönköping',
    description: 'Jag tog examen som dataingenjör och fick pris och stipendium av Science Park för mitt examensarbete om teckenspråksigenkänning.\n\nEfter att ha hälsat på min bror på en hälsa-på-dag i militären kände jag att det kanske var något för mig också. Jag bestämde mig för att testa.',
    image: '/images/2024.jpg'
  },
  {
    year: 2025, label: 'Värnplikt', location: 'Halmstad',
    description: 'I mars påbörjade jag 15 månaders värnplikt på Luftvärnsregementet Lv6 i Halmstad, som Luftvärnsplutonbefäl. Det är kul att vara här och det känns bra att få vara del av något viktigt. Det roligaste är att jobba i grupp och lösa uppgifter gemensamt.',
    image: '/images/2025.jpg'
  },
  {
    year: 2026, label: 'Nästa steg', location: '?',
    description: 'Värnplikten avslutas sommaren 2026. Vad som händer sen vet jag inte riktigt ännu, inte heller var. Men jag ser fram emot att fortsätta min karriär som dataingenjör, gärna med inslag av Försvarsmakten.'
  }
];

/** About page with timeline, particle effects, and draggable navigation. */
function About() {
  const [active, setActive] = useState(MILESTONES.length - 1);
  const [isDragging, setIsDragging] = useState(false);
  const particlesRef = useRef(null);
  const timelineRef = useRef(null);
  const activeRef = useRef(active);
  const dotRefs = useRef([]);
  const blobRef = useRef(null);
  const prevActiveRef = useRef(null);

  /** Keeps activeRef in sync with the current state. */
  useEffect(() => { activeRef.current = active; }, [active]);

  /** Animates the energy blob along the timeline between milestones. */
  useEffect(() => {
    const blob = blobRef.current;
    const track = timelineRef.current;

    if (!blob || !track) {
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

  /** Listens for arrow keys to navigate between milestones. */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') {
        setActive(prev => Math.min(prev + 1, MILESTONES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setActive(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  /** Creates floating ambient particles in the background. */
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

  /**
   * Calculates which milestone is closest to a given x-position.
   * @param {number} clientX - The cursor's x-coordinate.
   * @returns {number|null} Index of the closest milestone.
   */
  const getClosestMilestone = useCallback((clientX) => {
    const track = timelineRef.current;
    if (!track) return null;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const index = Math.round(ratio * (MILESTONES.length - 1));
    return index;
  }, []);

  /** Handles mouse and touch drag along the timeline. */
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

  /** Selects the closest milestone when clicking on the timeline. */
  const handleTrackClick = (e) => {
    if (isDragging) return;
    if (e.target.closest('.tl-node')) return;
    const idx = getClosestMilestone(e.clientX);
    if (idx !== null) setActive(idx);
  };

  /** Starts drag mode when the user presses on the active dot. */
  const handleThumbDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const m = MILESTONES[active];

  return (
    <section id="about" className="about-page">
      <div className="ambient-particles" ref={particlesRef}></div>

      <div className="about-main">
        <div className={`card-layout${m.image ? ' has-image' : ''}`}>
          <div className="card-text">
            <div className="card-eyebrow">
              <span className="card-chip">{m.label}</span>
              <span className="card-loc">{m.location}</span>
            </div>
            <h1 className="card-year">{m.year}</h1>
            <div className="card-desc">
              {m.description.split('\n\n').map((paragraph, i) => (
                <p key={i}>
                  {i === 0 && <span className="card-prompt">&gt; </span>}
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          {m.image && (
            <div className="card-image">
              <div className="glitch-img">
                <ImageWithSkeleton src={m.image} alt={`${m.year}`} />
              </div>
            </div>
          )}
        </div>
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
              onClick={() => setActive(i)}
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
        <div className="timeline-hint">
          Använd <span className="timeline-hint-key">◀</span> <span className="timeline-hint-key">▶</span> för att navigera
        </div>
      </div>
    </section>
  );
}

export default About;
