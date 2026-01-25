import React from 'react';
import '../styles/Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <h1>Hej, jag är Ellen!</h1>
        <p className="hero-subtitle">Software Engineer</p>
        <p className="hero-description">
          Välkommen till min portfolio. Här kan du se mina projekt och lära känna mig lite bättre.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">Se projekt</a>
          <a href="#contact" className="btn btn-secondary">Kontakta mig</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
