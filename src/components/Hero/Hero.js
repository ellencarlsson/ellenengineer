/**
 * @file Terminal window on the home page with typing animation.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Hero.css';

/** Animated terminal that types out commands and output line by line. */
function Hero() {
  const { language, t } = useLanguage();
  const [completedLines, setCompletedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [skippedByUser, setSkippedByUser] = useState(false);

  const terminalLines = useMemo(() => [
    { type: 'command', prompt: 'ellen@ellenengineer:~$ ', text: t('hero.whoami') },
    { type: 'output', text: t('hero.name') },
    { type: 'output', text: '' },
    { type: 'command', prompt: 'ellen@ellenengineer:~$ ', text: t('hero.aboutCmd') },
    { type: 'output', text: t('hero.aboutLine1') },
    { type: 'output', text: t('hero.aboutLine2') },
    { type: 'output', text: '' },
    { type: 'command', prompt: 'ellen@ellenengineer:~$ ', text: t('hero.statusCmd') },
    { type: 'output', text: t('hero.status') },
    { type: 'output', text: '' },
    { type: 'command', prompt: 'ellen@ellenengineer:~$ ', text: t('hero.projectsCmd') },
    { type: 'link', to: '/projects', text: '→ ' + t('hero.projectsLink') },
    { type: 'output', text: '' },
    { type: 'command', prompt: 'ellen@ellenengineer:~$ ', text: t('hero.aboutPageCmd') },
    { type: 'link', to: '/about', text: '→ ' + t('hero.aboutPageLink') },
    { type: 'output', text: '' },
    { type: 'command', prompt: 'ellen@ellenengineer:~$ ', text: t('hero.contactCmd') },
    { type: 'link', to: '/contact', text: '→ ' + t('hero.contactLink') }
  ], [t]);

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

  /** Resets the animation when language changes. */
  useEffect(() => {
    setCompletedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsComplete(false);
    setSkippedByUser(false);
  }, [language]);

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
              {terminalLines.map((line, index) => {
                const isCompleted = index < currentLineIndex;
                const isCurrent = index === currentLineIndex;
                const isHidden = index > currentLineIndex;

                if (line.type === 'link') {
                  return (
                    <div key={index} className="hero-line link" style={isHidden ? { visibility: 'hidden' } : undefined}>
                      <Link to={line.to} className="hero-terminal-link">{line.text}</Link>
                    </div>
                  );
                }
                if (line.type === 'command') {
                  return (
                    <div key={index} className="hero-line command" style={isHidden ? { visibility: 'hidden' } : undefined}>
                      <span className="hero-prompt">{line.prompt}</span>
                      <span className="hero-cmd">{isCompleted ? line.text : (isCurrent ? currentTypedText : line.text)}</span>
                    </div>
                  );
                }
                return (
                  <div key={index} className={`hero-line ${line.type}`} style={isHidden ? { visibility: 'hidden' } : undefined}>
                    {isCompleted ? (line.text || '\u00A0') : (isCurrent ? (currentTypedText || '\u00A0') : (line.text || '\u00A0'))}
                  </div>
                );
              })}
              <span className={`hero-cursor ${showCursor ? 'visible' : ''}`}>▋</span>
            </pre>
          </div>
        </div>

        <div className={`hero-terminal-hint ${isComplete ? 'hidden' : ''} ${skippedByUser ? 'no-transition' : ''}`} onClick={() => !isComplete && skipAnimation()}>
          <span className="hero-hint-key hint-desktop">{t('hero.skipKey')}</span>
          <span className="hero-hint-key hint-mobile">{t('hero.skipMobile')}</span>
          {' '}{t('hero.skipHint')}
        </div>
      </div>
    </section>
  );
}

export default Hero;
