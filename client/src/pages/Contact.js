import React from 'react';
import '../styles/pages/Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="page-title">Kontakta mig</h1>

        <div className="code-editor">
          <div className="editor-header">
            <div className="editor-tabs">
              <div className="editor-tab active">
                <span className="file-icon">📄</span>
                <span>contact.js</span>
              </div>
            </div>
          </div>

          <div className="code-content">
            <div className="line-numbers">
              <div className="line-number">1</div>
              <div className="line-number">2</div>
              <div className="line-number">3</div>
              <div className="line-number">4</div>
              <div className="line-number">5</div>
              <div className="line-number">6</div>
              <div className="line-number">7</div>
            </div>

            <div className="code-lines">
              <div className="code-line">
                <span className="keyword">const</span>{' '}
                <span className="variable">contact</span>{' '}
                <span className="operator">=</span>{' '}
                <span className="punctuation">{'{'}</span>
              </div>
              <div className="code-line indent-1">
                <span className="property">email</span>
                <span className="operator">:</span>{' '}
                <a href="mailto:ellen.carlsson@example.com" className="string">
                  "ellen.carlsson@example.com"
                </a>
                <span className="punctuation">,</span>
              </div>
              <div className="code-line indent-1">
                <span className="property">linkedin</span>
                <span className="operator">:</span>{' '}
                <a href="https://linkedin.com/in/ellen-carlsson" target="_blank" rel="noopener noreferrer" className="string">
                  "linkedin.com/in/ellen-carlsson"
                </a>
              </div>
              <div className="code-line">
                <span className="punctuation">{'}'}</span>
                <span className="punctuation">;</span>
              </div>
              <div className="code-line"></div>
              <div className="code-line">
                <span className="comment">// Hör gärna av dig! 👋</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
