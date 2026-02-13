/**
 * @file Terminal window on the home page with typing animation.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

/** Animated terminal that types out commands and output line by line. */
function Hero() {
  const [completedLines, setCompletedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [skippedByUser, setSkippedByUser] = useState(false);

  const terminalLines = [
    { type: 'command', prompt: 'ellen@ellenengineer:~$ ', text: 'whoami' },
    { type: 'output', text: 'Ellen Carlsson - Engineer' },
    { type: 'output', text: '' },
    { type: 'command', prompt: 'ellen@ellenengineer:~$ ', text: 'cat about.txt' },
    { type: 'output', text: 'Jag gillar att lösa vardagsproblem med hjälp av teknik.' },
    { type: 'output', text: 'Jag har gjort denna hemsida för att lägga upp utvalda projekt.' },
    { type: 'output', text: '' },
    { type: 'command', prompt: 'ellen@ellenengineer:~$ ', text: 'echo $CURRENT_STATUS' },
    { type: 'output', text: 'Just nu är jag på Luftvärnsregementet i Halmstad och kommer vara här till sommaren 2026.' },
    { type: 'output', text: '' },
    { type: 'command', prompt: 'ellen@ellenengineer:~$ ', text: './explore_projects.sh' },
    { type: 'link', text: '→ Klicka här för att se mina projekt' }
  ];

  /** Skips the animation and displays all text immediately. */
  const skipAnimation = () => {
    setCompletedLines([...terminalLines]);
    setCurrentLineIndex(terminalLines.length);
    setIsComplete(true);
    setSkippedByUser(true);
  };

  /** Listens for the Enter key to skip the animation. */
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

  /** Blinking cursor that toggles every 530 milliseconds. */
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  /** Types out text character by character with different speeds for commands and output. */
  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = terminalLines[currentLineIndex];
    const typingSpeed = currentLine.type === 'command' ? 40 : 15;

    if (currentCharIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      let lineDelay;
      if (currentLine.type === 'command') {
        lineDelay = 300;
      } else if (currentLine.text === '') {
        lineDelay = 50;
      } else {
        lineDelay = 100;
      }

      const timeout = setTimeout(() => {
        setCompletedLines(prev => [...prev, currentLine]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, lineDelay);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCharIndex, currentLineIndex]);

  const currentLine = currentLineIndex < terminalLines.length ? terminalLines[currentLineIndex] : null;
  const currentTypedText = currentLine ? currentLine.text.slice(0, currentCharIndex) : '';

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

        <div className="hero-terminal-body" onClick={() => !isComplete && skipAnimation()}>
          <div className="hero-terminal-content">
            <pre>
              {completedLines.map((line, index) => {
                if (line.type === 'link') {
                  return (
                    <div key={index} className="hero-line link">
                      <Link to="/projects" className="hero-terminal-link">{line.text}</Link>
                    </div>
                  );
                }
                if (line.type === 'command') {
                  return (
                    <div key={index} className="hero-line command">
                      <span className="hero-prompt">{line.prompt}</span>
                      <span className="hero-cmd">{line.text}</span>
                    </div>
                  );
                }
                return (
                  <div key={index} className={`hero-line ${line.type}`}>
                    {line.text || '\u00A0'}
                  </div>
                );
              })}
              {currentLine && (
                currentLine.type === 'command' ? (
                  <div className="hero-line command">
                    <span className="hero-prompt">{currentLine.prompt}</span>
                    <span className="hero-cmd">{currentTypedText}</span>
                  </div>
                ) : (
                  <div className={`hero-line ${currentLine.type}`}>
                    {currentTypedText || '\u00A0'}
                  </div>
                )
              )}
              <span className={`hero-cursor ${showCursor ? 'visible' : ''}`}>▋</span>
            </pre>
          </div>
        </div>

        <div className={`hero-terminal-hint ${isComplete ? 'hidden' : ''} ${skippedByUser ? 'no-transition' : ''}`} onClick={() => !isComplete && skipAnimation()}>
          <span className="hero-hint-key hint-desktop">Enter</span>
          <span className="hero-hint-key hint-mobile">Tryck</span>
          {' '}för att hoppa över animationen
        </div>
      </div>
    </section>
  );
}

export default Hero;
