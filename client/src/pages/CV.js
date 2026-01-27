import React from 'react';
import '../styles/pages/CV.css';

function CV() {
  const handleOpenCV = () => {
    window.open('/assets/CV.pdf', '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/CV.pdf';
    link.download = 'Ellen_Carlsson_CV.pdf';
    link.click();
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
            {/* Top Lines */}
            <div className="line-top-3"></div>
            <div className="line-top-4"></div>

            <div className="page-header">
              <h1 className="newspaper-title">DAGENS INGENJÖR</h1>
              <div className="line-under-title"></div>
              <div className="date-with-lines">
                <div className="date-side-line"></div>
                <div className="newspaper-date">JANUARY 2026 * VOL.1</div>
                <div className="date-side-line"></div>
              </div>
            </div>

            {/* Lines after header */}
            <div className="line-header-1"></div>

            <div className="page-content">
              <div className="article-section">
                <h2 className="article-headline">ELLEN CARLSSON</h2>
                <div className="article-subheading">Data Ingenjör</div>

                {/* Line after title */}
                <div className="line-title"></div>

                <div className="content-grid">
                  {/* Left column - text */}
                  <div className="text-column">
                    <p className="article-text">
                      Dataingenjör med passion för AI och mobilapplikationer. Specialiserad på iOS-utveckling och maskininlärning.
                    </p>

                    <h3 className="interview-title">EN INTERVJU MED INGENJÖREN</h3>

                    <div className="interview-qa">
                      <div className="interview-question">Vad gör du på fritiden?</div>
                      <p className="interview-answer">
                        "Jag gillar att gå på promenader och lyssna på ljudböcker, och baka".
                      </p>
                    </div>

                    <div className="interview-qa">
                      <div className="interview-question">Om du inte hade blivit dataingenjör</div>
                      <p className="interview-answer">
                        "Då hade jag viljat ha ett eget cafe."
                      </p>
                    </div>
                  </div>

                  {/* Right column - photo */}
                  <div className="photo-column">
                    <img src="/assets/ellen-photo.jpg" alt="Ellen Carlsson" className="portrait-photo" />
                  </div>
                </div>

                {/* Lines before buttons */}
                <div className="line-before-buttons-1"></div>
                <div className="line-before-buttons-2"></div>

                <div className="action-buttons">
                  <button onClick={handleOpenCV} className="cv-button">
                    ÖPPNA I NY FLIK
                  </button>
                  <button onClick={handleDownload} className="cv-button">
                    LADDA NER CV
                  </button>
                </div>

                {/* Bottom lines */}
                <div className="line-bottom-1"></div>
                <div className="line-bottom-2"></div>
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
