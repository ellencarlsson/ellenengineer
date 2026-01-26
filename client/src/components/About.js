import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <h2>Om mig</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Här kommer text om dig som utvecklare.
            </p>
          </div>
          <div className="skills">
            <h3>Skills & Teknologier</h3>
            <ul>
              <li>React</li>
              <li>Node.js</li>
              <li>MongoDB</li>
              <li>Express</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
