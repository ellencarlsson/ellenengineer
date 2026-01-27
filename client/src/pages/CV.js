import React from 'react';
import '../styles/pages/CV.css';

function CV() {
  const handleOpenCV = () => {
    window.open('/assets/CV.pdf', '_blank');
  };

  return (
    <div className="cv-page">
      <div className="newspaper-container">
        {/* Newspaper Spread */}
        <div className="newspaper-spread">
          {/* Center Fold Line */}
          <div className="center-fold"></div>

          {/* Left Page - Info/Introduction */}
          <div className="newspaper-page left-page">
            <div className="page-header">
              <h1 className="newspaper-title">DAGENS INGENJÖR</h1>
              <div className="newspaper-date">JANUARY 2026 • VOL. 1</div>
            </div>

            <div className="page-content">
              <div className="article-section">
                <h2 className="article-headline">ELLEN CARLSSON</h2>
                <div className="article-subheading">Software Engineer • AI Enthusiast</div>

                <div className="article-text">
                  <p>Dataingenjör med passion för AI och mobilapplikationer. Specialiserad på iOS-utveckling och maskininlärning. Examensarbete om teckenspråksigenkänning uppmärksammades av Science Park.</p>
                </div>

                <div className="contact-box">
                  <h3 className="contact-title">KONTAKT</h3>
                  <div className="contact-item">
                    <span className="contact-label">TELEFON:</span>
                    <span className="contact-value">070 065 84 85</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">EMAIL:</span>
                    <span className="contact-value">carlssonellen@live.se</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">PLATS:</span>
                    <span className="contact-value">Lv6, Jönköping</span>
                  </div>
                </div>

                <div className="action-box">
                  <button onClick={handleOpenCV} className="newspaper-button">
                    📄 Öppna i ny flik
                  </button>
                  <a
                    href="/assets/CV.pdf"
                    download="Ellen_Carlsson_CV.pdf"
                    className="newspaper-button"
                  >
                    💾 Ladda ner CV
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Page - CV Image */}
          <div className="newspaper-page right-page">
            <div className="cv-embed">
              <div className="cv-photo-frame">
                <img
                  src="/assets/CV-image.png"
                  alt="CV - Ellen Carlsson"
                  className="cv-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CV;
