import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-title">
            Från <span className="highlight">militär disciplin</span>
            <br />
            till <span className="highlight glitch" data-text="kodprecision">kodprecision</span>
          </h2>
          <p className="hero-subtitle">
            Dataingenjör med passion för mobil utveckling och problemlösning
          </p>
          <div className="hero-tags">
            <span className="tag">React Native</span>
            <span className="tag">Swift</span>
            <span className="tag">Kotlin</span>
            <span className="tag">Problemlösning</span>
          </div>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">Utforska projekt</Link>
            <Link to="/contact" className="btn btn-secondary">Kontakta mig</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
