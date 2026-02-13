/**
 * @file Contact page with API theme displaying email and LinkedIn.
 */
import React, { useState } from 'react';
import './Contact.css';

const EMAIL = 'carlssonellen@live.se';
const LINKEDIN = 'linkedin.com/in/ellen-carlsson-ab04451b4';

/** Contact page styled as API documentation with endpoints. */
function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);

  const handleCopy = (text, setCopied) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Fallback for mobile/older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }

    document.body.removeChild(textArea);
  };

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
                <span className="response-value-group">
                  <span className="response-value">{EMAIL}</span>
                  <button type="button" className="copy-button" onClick={handleCopy(EMAIL, setCopiedEmail)} title="Kopiera e-post">
                  {copiedEmail ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                  {copiedEmail && <span className="copy-tooltip">Kopierad!</span>}
                </button>
                </span>
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
                <span className="response-value">{LINKEDIN}</span>
                <button type="button" className="copy-button" onClick={handleCopy(LINKEDIN, setCopiedLinkedin)} title="Kopiera LinkedIn">
                  {copiedLinkedin ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                  {copiedLinkedin && <span className="copy-tooltip">Kopierad!</span>}
                </button>
              </div>
            </div>
            <div className="endpoint-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
          </a>

          <a href="mailto:carlssonellen@live.se?subject=Buggrapport%20-%20ellenengineer.se&body=Beskriv%20problemet:%0A%0A" className="endpoint endpoint-post">
            <div className="endpoint-method endpoint-method-post">POST</div>
            <div className="endpoint-content">
              <div className="endpoint-path">/report/bug</div>
              <div className="endpoint-description">Submit a bug report or feedback about the site</div>
              <div className="endpoint-response">
                <span className="response-label">Body:</span>
                <span className="response-value">{"{ description: string }"}</span>
              </div>
            </div>
            <div className="endpoint-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="8" y="6" width="8" height="14" rx="4"></rect>
                <path d="M8 10h8"></path>
                <path d="M8 14h8"></path>
                <path d="M5 8l3 2"></path>
                <path d="M19 8l-3 2"></path>
                <path d="M5 16l3-2"></path>
                <path d="M19 16l-3-2"></path>
                <circle cx="10" cy="8" r="1" fill="currentColor"></circle>
                <circle cx="14" cy="8" r="1" fill="currentColor"></circle>
                <path d="M10 3v3"></path>
                <path d="M14 3v3"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
