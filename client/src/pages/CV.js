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
      <div className="cv-container">
        {/* SQL Query on Background */}
        <div className="query-text">
          <div className="query-line">
            <span className="keyword">SELECT</span> <span className="operator">*</span>
          </div>
          <div className="query-line">
            <span className="keyword">FROM</span> <span className="table">engineers</span>
          </div>
          <div className="query-line">
            <span className="keyword">WHERE</span> <span className="column">name</span> <span className="operator">=</span> <span className="string">'Ellen Carlsson'</span><span className="operator">;</span>
          </div>
        </div>

        {/* CV Display */}
        <div className="cv-main">
          <img
            src="/assets/CV-image.png"
            alt="CV - Ellen Carlsson"
            className="cv-image-main"
          />

          {/* Action Links */}
          <div className="cv-links">
            <button onClick={handleOpenCV} className="cv-link">
              → Öppna i ny flik
            </button>
            <button onClick={handleDownload} className="cv-link">
              → Ladda ner CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CV;
