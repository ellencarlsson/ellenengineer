import React from 'react';
import './CV.css';

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
        {/* SQL Query Annotation */}
        <div className="query-annotation">
          <div className="query-header">
            <span className="query-label">SQL Query</span>
          </div>
          <div className="query-code">
            <div className="query-line">
              <span className="keyword">SELECT</span> <span className="operator">*</span>
            </div>
            <div className="query-line">
              <span className="keyword-secondary">FROM</span> <span className="table">engineers</span>
            </div>
            <div className="query-line">
              <span className="keyword-neutral">WHERE</span> <span className="column">name</span> <span className="operator">=</span> <span className="string">'Ellen Carlsson'</span><span className="operator">;</span>
            </div>
          </div>
        </div>

        {/* Visual Connection */}
        <div className="query-connection">
          <div className="connection-line"></div>
          <span className="connection-text">Query result → resume.pdf</span>
          <div className="connection-arrow">↓</div>
        </div>

        {/* System Feedback */}
        <div className="system-feedback">
          <span className="feedback-success">✓ Query executed successfully</span>
          <span className="feedback-info">1 record loaded</span>
        </div>

        {/* CV Display Card */}
        <div className="cv-card">
          <img
            src="/assets/CV-image.png"
            alt="CV - Ellen Carlsson"
            className="cv-image-main"
          />

          {/* Action Links */}
          <div className="cv-links">
            <button onClick={handleOpenCV} className="cv-link">
              <span className="keyword">→</span> Öppna i ny flik
            </button>
            <button onClick={handleDownload} className="cv-link">
              <span className="keyword">→</span> Ladda ner CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CV;
