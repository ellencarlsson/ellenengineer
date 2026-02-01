import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [skippedByUser, setSkippedByUser] = useState(false);

  const terminalLines = [
    { type: 'command', text: 'ellen@ellenengineer:~$ whoami' },
    { type: 'output', text: 'Ellen Carlsson - Engineer' },
    { type: 'output', text: '' },
    { type: 'command', text: 'ellen@ellenengineer:~$ cat about.txt' },
    { type: 'output', text: 'Studerat Datateknik med inriktning mjukvaruutveckling med mobila plattformar' },
    { type: 'output', text: 'Gillar att se lösningar i vardagsproblem' },
    { type: 'output', text: '' },
    { type: 'command', text: 'ellen@ellenengineer:~$ echo $CURRENT_STATUS' },
    { type: 'output', text: 'Genomför för närvarande 15 månaders värnplikt, som avslutas sommaren 2026 i Halmstad.' },
    { type: 'output', text: '' },
    { type: 'command', text: 'ellen@ellenengineer:~$ ./explore_projects.sh' },
    { type: 'link', text: '→ Klicka här för att se mina projekt' }
  ];

  const skipAnimation = () => {
    const fullText = terminalLines.map(line => line.text).join('\n');
    setDisplayedText(fullText);
    setCurrentLineIndex(terminalLines.length);
    setIsComplete(true);
    setSkippedByUser(true);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !isComplete) {
        skipAnimation();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCharIndex, currentLineIndex]);

  return (
    <section id="home" className="hero">
      <div className="hero-terminal">
        <div className="hero-terminal-header">
          <div className="hero-terminal-buttons">
            <span className="hero-terminal-btn hero-btn-close"></span>
            <span className="hero-terminal-btn hero-btn-minimize"></span>
            <span className="hero-terminal-btn hero-btn-maximize"></span>
          </div>
          <div className="hero-terminal-title">EllenEngineer — zsh</div>
        </div>

        <div className="hero-terminal-body">
          <div className="hero-terminal-content">
            <pre>
              {displayedText.split('\n').map((line, index) => {
                const lineData = terminalLines.find(l => l.text === line.trim());
                const lineType = lineData ? lineData.type : 'output';

                if (lineType === 'link') {
                  return (
                    <div key={index} className="hero-line link">
                      <Link to="/projects" className="hero-terminal-link">{line}</Link>
                    </div>
                  );
                }

                if (lineType === 'command' && line.includes('$')) {
                  const dollarIndex = line.indexOf('$');
                  const prompt = line.slice(0, dollarIndex + 1);
                  const cmd = line.slice(dollarIndex + 1);
                  return (
                    <div key={index} className="hero-line command">
                      <span className="hero-prompt">{prompt}</span>
                      <span className="hero-cmd">{cmd}</span>
                    </div>
                  );
                }

                return (
                  <div key={index} className={`hero-line ${lineType}`}>
                    {line || '\u00A0'}
                  </div>
                );
              })}
              <span className={`hero-cursor ${showCursor ? 'visible' : ''}`}>▋</span>
            </pre>
          </div>
        </div>

        <div className={`hero-terminal-hint ${isComplete ? 'hidden' : ''} ${skippedByUser ? 'no-transition' : ''}`}>
          <span className="hero-hint-key">Enter</span> för att hoppa över animationen
        </div>
      </div>
    </section>
  );
}

export default Hero;
