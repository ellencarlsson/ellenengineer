import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const terminalLines = [
    { type: 'command', text: '$ whoami' },
    { type: 'output', text: 'Ellen Carlsson - Full Stack Developer' },
    { type: 'command', text: '$ cat about.txt' },
    { type: 'output', text: 'Studerar datateknik med inriktning mot mjukvaruutveckling.' },
    { type: 'output', text: 'Passionerad om att lösa problem och bygga genomtänkta lösningar.' },
    { type: 'command', text: '$ ls skills/' },
    { type: 'output', text: 'React.js    Node.js    MongoDB    Express    Git' },
    { type: 'command', text: '$ echo $CURRENT_STATUS' },
    { type: 'output', text: 'Avslutar värnplikt juni 2026 → Söker utvecklarroll' },
    { type: 'command', text: '$ ./explore_projects.sh' },
    { type: 'link', text: '→ Klicka här för att se mina projekt' }
  ];

  // Skip animation and show all text
  const skipAnimation = () => {
    const fullText = terminalLines.map(line => line.text).join('\n');
    setDisplayedText(fullText);
    setCurrentLineIndex(terminalLines.length);
    setIsComplete(true);
  };

  // Listen for Enter key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !isComplete) {
        skipAnimation();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = terminalLines[currentLineIndex];
    const delay = currentLine.type === 'command' ? 80 : 40;

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
      }, currentLine.type === 'command' ? 200 : 500);

      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentLineIndex]);

  return (
    <section id="home" className="hero">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">ellen@portfolio:~</div>
          <div className="terminal-tabs">
            <div className="terminal-tab active">
              <span className="tab-icon">⚡</span>
              <span>terminal</span>
            </div>
          </div>
        </div>

        <div className="terminal-body">
          <div className="line-numbers">
            {displayedText.split('\n').map((_, index) => (
              <div key={index} className="line-number">{index + 1}</div>
            ))}
          </div>

          <div className="terminal-content">
            <pre>
              {displayedText.split('\n').map((line, index) => {
                const lineData = terminalLines.find(l => l.text === line.trim());
                const lineType = lineData ? lineData.type : 'output';

                return (
                  <div key={index} className={`terminal-line ${lineType}`}>
                    {lineType === 'link' ? (
                      <Link to="/projects" className="terminal-link">{line}</Link>
                    ) : (
                      line
                    )}
                  </div>
                );
              })}
              <span className={`cursor ${showCursor ? 'visible' : ''}`}>▋</span>
            </pre>
          </div>
        </div>

        {!isComplete && (
          <div className="terminal-hint">
            <span className="hint-key">Enter</span> för att hoppa över animationen
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
