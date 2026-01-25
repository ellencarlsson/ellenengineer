import React from 'react';
import '../styles/pages/About.css';
import flowerSvg from '../assets/svg/flower.svg';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="page-title">Om mig</h1>
        <div className="about-content">
          <div className="about-text nature-card-decoration">
            <h2>Hej!</h2>
            <p>
              Jag är Ellen Carlsson, en passionerad mjukvaruutvecklare med fokus på
              webbutveckling och moderna teknologier.
            </p>
            <p>
              Här kan du lära dig mer om min bakgrund, mina färdigheter och vad jag
              arbetar med.
            </p>
          </div>

          <div className="section-divider">
            <img src={flowerSvg} alt="" />
          </div>

          <div className="skills-section nature-card-decoration">
            <h3>Teknologier & Färdigheter</h3>
            <div className="skills-grid">
              <div className="skill-item">React</div>
              <div className="skill-item">Node.js</div>
              <div className="skill-item">MongoDB</div>
              <div className="skill-item">Express</div>
              <div className="skill-item">JavaScript</div>
              <div className="skill-item">HTML & CSS</div>
              <div className="skill-item">Git</div>
              <div className="skill-item">REST APIs</div>
            </div>
          </div>

          <div className="section-divider">
            <img src={flowerSvg} alt="" />
          </div>

          <div className="education-section nature-card-decoration">
            <h3>Utbildning & Erfarenhet</h3>
            <p>Information om din utbildning och erfarenhet kommer här.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
