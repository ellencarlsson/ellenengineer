import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">

        <div className="api-header">
          <div className="api-title">API Reference</div>
          <div className="api-version">v1.0</div>
        </div>

        <div className="api-description">
          Available endpoints for contact information
        </div>

        <div className="api-endpoints">
          <a href="mailto:carlssonellen@live.se" className="endpoint">
            <div className="endpoint-method">GET</div>
            <div className="endpoint-content">
              <div className="endpoint-path">/contact/email</div>
              <div className="endpoint-description">Returns email address for direct communication</div>
              <div className="endpoint-response">
                <span className="response-label">Response:</span>
                <span className="response-value">carlssonellen@live.se</span>
              </div>
            </div>
            <div className="endpoint-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/ellen-carlsson-ab04451b4" target="_blank" rel="noopener noreferrer" className="endpoint">
            <div className="endpoint-method">GET</div>
            <div className="endpoint-content">
              <div className="endpoint-path">/contact/linkedin</div>
              <div className="endpoint-description">Returns LinkedIn profile for professional networking</div>
              <div className="endpoint-response">
                <span className="response-label">Response:</span>
                <span className="response-value">linkedin.com/in/ellen-carlsson-ab04451b4</span>
              </div>
            </div>
            <div className="endpoint-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
