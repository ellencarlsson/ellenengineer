/**
 * @file CV page with SQL-animated text output and downloadable PDF.
 */
import React, { useState, useEffect } from 'react';
import './CV.css';

/** SQL lines typed out character by character on the page. */
const SQL_LINES = [
  { text: 'SELECT cv', type: 'keyword' },
  { text: 'FROM engineers', type: 'table' },
  { text: "WHERE name = 'Ellen Carlsson';", type: 'where' },
];

/** CV page with SQL query animation, CV image, and download buttons. */
function CV() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const [queryComplete, setQueryComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showCard, setShowCard] = useState(false);

  /** Skips the SQL animation and displays everything immediately. */
  const skipAnimation = () => {
    const fullText = SQL_LINES.map(line => line.text).join('\n');
    setDisplayedText(fullText);
    setCurrentLineIndex(SQL_LINES.length);
    setQueryComplete(true);
    setShowResult(true);
    setShowCard(true);
  };

  /** Listens for the Enter key to skip the animation. */
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !queryComplete) {
        skipAnimation();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [queryComplete]);


  /** Types out SQL text character by character and shows the result when complete. */
  useEffect(() => {
    if (currentLineIndex >= SQL_LINES.length) {
      if (!queryComplete) {
        setQueryComplete(true);
        setTimeout(() => setShowResult(true), 600);
        setTimeout(() => setShowCard(true), 1200);
      }
      return;
    }

    const currentLine = SQL_LINES[currentLineIndex];
    const delay = 70;

    if (currentCharIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentLine.text[currentCharIndex]);
        setCurrentCharIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + '\n');
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentLineIndex, queryComplete]);

  /**
   * Renders a SQL line with syntax highlighting.
   * @param {string} lineText - The text line to render.
   * @returns {React.ReactElement[]} Color-coded JSX elements.
   */
  const renderSqlLine = (lineText) => {
    if (!lineText) return <span>&nbsp;</span>;

    const tokens = [];
    const keywords = ['SELECT', 'FROM', 'WHERE'];
    const operators = ['='];
    let remaining = lineText;
    let key = 0;

    while (remaining.length > 0) {
      let matched = false;

      for (const kw of keywords) {
        if (remaining.startsWith(kw)) {
          tokens.push(<span key={key++} className="sql-keyword">{kw}</span>);
          remaining = remaining.slice(kw.length);
          matched = true;
          break;
        }
      }
      if (matched) continue;

      if (remaining.startsWith('*')) {
        tokens.push(<span key={key++} className="sql-wildcard">*</span>);
        remaining = remaining.slice(1);
        continue;
      }

      for (const op of operators) {
        if (remaining.startsWith(op)) {
          tokens.push(<span key={key++} className="sql-operator">{op}</span>);
          remaining = remaining.slice(op.length);
          matched = true;
          break;
        }
      }
      if (matched) continue;

      const stringMatch = remaining.match(/^'([^']*)'/);
      if (stringMatch) {
        tokens.push(<span key={key++} className="sql-string">'{stringMatch[1]}'</span>);
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      const identMatch = remaining.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      if (identMatch) {
        tokens.push(<span key={key++} className="sql-identifier">{identMatch[0]}</span>);
        remaining = remaining.slice(identMatch[0].length);
        continue;
      }

      tokens.push(<span key={key++} className="sql-plain">{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }

    return tokens;
  };

  const particles = Array.from({ length: 20 }, (_, i) => {
    const size = 1 + Math.random() * 3;
    const duration = 6 + Math.random() * 8;
    const delay = -(Math.random() * duration);
    const left = Math.random() * 100;
    const drift = -30 + Math.random() * 60;
    return (
      <div
        key={i}
        className="cv-particle"
        style={{
          width: size,
          height: size,
          left: `${left}%`,
          bottom: `${Math.random() * 40}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          '--drift': `${drift}px`,
        }}
      />
    );
  });

  return (
    <section className="cv-page">
      <div className="cv-particles">{particles}</div>

      <div className="cv-layout">
        {/* Left: SQL + buttons */}
        <div className="cv-left">
          <div className="sql-block">
            <div className="sql-prompt-label">ellen=#</div>
            <div className="sql-code">
              {displayedText.split('\n').map((line, index) => (
                <div key={index} className="sql-line">
                  {renderSqlLine(line)}
                </div>
              ))}
              {!queryComplete && (
                <span className="sql-cursor visible">|</span>
              )}
            </div>

            {showResult && (
              <div className="sql-result">
                <span className="sql-result-check">&#10003;</span>
                <span className="sql-result-text"> 1 record found — </span>
                <span className="sql-result-file">CV-Ellen-Carlsson.pdf</span>
              </div>
            )}
          </div>

          <div className={`cv-actions ${showCard ? 'visible' : ''}`}>
            <a
              href="/assets/CV-Ellen-Carlsson.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cv-button cv-button-open"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Öppna CV
            </a>
            <a
              href="/assets/CV-Ellen-Carlsson.pdf"
              download="CV-Ellen-Carlsson.pdf"
              className="cv-button cv-button-download"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Ladda ner
            </a>
          </div>
        </div>

        {/* Right: CV image with glitch effect */}
        <div className={`cv-right ${showCard ? 'visible' : ''}`}>

          <div className="cv-image-wrap">
            <div className="cv-glitch">
              <img
                src="/assets/CV-image.png"
                alt="CV - Ellen Carlsson"
                className="cv-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CV;
