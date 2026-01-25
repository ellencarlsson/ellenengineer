import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Ellen Engineer</h3>
            <p>Software Engineer & Developer</p>
          </div>
          <div className="footer-section">
            <h4>Länkar</h4>
            <a href="#home">Hem</a>
            <a href="#about">Om mig</a>
            <a href="#projects">Projekt</a>
            <a href="#contact">Kontakt</a>
          </div>
          <div className="footer-section">
            <h4>Sociala medier</h4>
            <a href="https://github.com/ellencarlsson" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="#linkedin">LinkedIn</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Ellen Carlsson. Alla rättigheter reserverade.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
