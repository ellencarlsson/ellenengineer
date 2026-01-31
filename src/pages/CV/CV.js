import React, { useState, useEffect } from 'react';
import './CV.css';

function CV() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [queryComplete, setQueryComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [skippedByUser, setSkippedByUser] = useState(false);

  const sqlLines = [
    { text: 'SELECT *', type: 'keyword' },
    { text: 'FROM engineers', type: 'table' },
    { text: "WHERE name = 'Ellen Carlsson';", type: 'where' },
  ];

  const skipAnimation = () => {
    const fullText = sqlLines.map(line => line.text).join('\n');
    setDisplayedText(fullText);
    setCurrentLineIndex(sqlLines.length);
    setQueryComplete(true);
    setSkippedByUser(true);
    setTimeout(() => setShowResult(true), 200);
    setTimeout(() => setShowCard(true), 500);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !queryComplete) {
        skipAnimation();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [queryComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLineIndex >= sqlLines.length) {
      if (!queryComplete) {
        setQueryComplete(true);
        setTimeout(() => setShowResult(true), 600);
        setTimeout(() => setShowCard(true), 1200);
      }
      return;
    }

    const currentLine = sqlLines[currentLineIndex];
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

  const renderSqlLine = (lineText, index) => {
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

  return (
    <section className="cv-page">
      <div className="cv-container">
        {/* SQL Terminal */}
        <div className="sql-terminal">
          <div className="sql-terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button close"></span>
              <span className="terminal-button minimize"></span>
              <span className="terminal-button maximize"></span>
            </div>
            <div className="sql-terminal-title">ellen_db — psql</div>
          </div>

          <div className="sql-terminal-body">
            <div className="sql-prompt">
              <span className="sql-prompt-label">ellen_db=#</span>
              <div className="sql-code">
                {displayedText.split('\n').map((line, index) => (
                  <div key={index} className="sql-line">
                    {renderSqlLine(line, index)}
                  </div>
                ))}
                {!queryComplete && (
                  <span className={`sql-cursor ${showCursor ? 'visible' : ''}`}>|</span>
                )}
              </div>
            </div>

            {showResult && (
              <div className={`sql-result ${showResult ? 'visible' : ''}`}>
                <span className="sql-result-check">&#10003;</span>
                <span className="sql-result-text"> Query executed — 1 record found</span>
              </div>
            )}
          </div>

          <div className={`terminal-hint ${queryComplete ? 'hidden' : ''} ${skippedByUser ? 'no-transition' : ''}`}>
            <span className="hint-key">Enter</span> för att hoppa över animationen
          </div>
        </div>

        {/* CV Card */}
        <div className={`cv-card ${showCard ? 'visible' : ''}`}>
          <div className="cv-image-wrapper">
            <img
              src="/assets/CV-image.png"
              alt="CV - Ellen Carlsson"
              className="cv-image"
            />
          </div>

          <div className="cv-actions">
            <a
              href="/assets/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cv-button cv-button-open"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Öppna i ny flik
            </a>
            <a
              href="/assets/CV.pdf"
              download="Ellen_Carlsson_CV.pdf"
              className="cv-button cv-button-download"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Ladda ner CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CV;
