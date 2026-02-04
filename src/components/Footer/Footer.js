/**
 * @file Footer with navigation links and contact info.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/** Footer displayed on all pages. */
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
            <Link to="/">Hem</Link>
            <Link to="/about">Om mig</Link>
            <Link to="/projects">Projekt</Link>
            <Link to="/contact">Kontakt</Link>
          </div>
          <div className="footer-section">
            <h4>Sociala medier</h4>
            <a href="https://github.com/ellencarlsson" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/ellen-carlsson-ab04451b4" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:carlssonellen@live.se">Email</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Ellen Carlsson. Alla rättigheter reserverade.</p>
          <p className="footer-credits">
            Font: <a href="https://hackedfont.com" target="_blank" rel="noopener noreferrer">Hacked</a> av David Libeau (CC BY 4.0)
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
