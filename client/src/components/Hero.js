import React from 'react';
import { Link } from 'react-router-dom';
import Robot from './Robot';
import '../styles/Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-left">
            <Robot />
          </div>

          <div className="hero-right">
            <div className="speech-bubble">
              <p>Ellen har studerat datateknik med inriktning mot mjukvaruutveckling för mobila plattformar.</p>
              <p>Hon är bra på att se problem i vardagen och tycker om att hitta genomtänkta lösningar.</p>
              <p>I juni avslutar hon 15 månaders värnplikt vid Luftvärnsregementet i Halmstad.</p>
              <p className="speech-highlight">Här kan du ta del av hennes projekt och lära känna henne bättre som utvecklare.</p>
            </div>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">Utforska projekt</Link>
              <Link to="/contact" className="btn btn-secondary">Kontakta mig</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
