/**
 * @file Navigation menu that hides on scroll.
 */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import logo from '../../assets/logo.svg';
import './Header.css';

/** Navigation menu that hides when the user scrolls past the top. */
function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** Hides the header when the user scrolls past 100px. */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  /** Closes the menu when device orientation changes. */
  useEffect(() => {
    const handleOrientationChange = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  /** Locks body scroll while the mobile menu is open. */
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      if (top) {
        window.scrollTo(0, parseInt(top, 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, [isMenuOpen]);

  /** Closes mobile menu on navigation. */
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isHidden ? 'header-hidden' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <div className="header-left-pill">
            <NavLink to="/" className="nav-link nav-logo-link"><img src={logo} alt="EE" className="nav-logo" /></NavLink>
            <nav className="nav">
              <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                {t('nav.projects')}
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                {t('nav.about')}
              </NavLink>
            </nav>
          </div>
        </div>

        <div className="header-center">
          <NavLink to="/" className="header-title-link">
            <div className="header-title">
              <h1 className="name-first glitch" data-text="Ellen">Ellen</h1>
              <div className="title-row">
                <p className="header-subtitle glitch" data-text="Engineer">Engineer</p>
                <h1 className="name-last glitch" data-text="Carlsson">Carlsson</h1>
              </div>
            </div>
          </NavLink>
        </div>

        <div className="header-right">
          <div className="header-right-pill">
            <NavLink to="/cv" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.cv')}
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.contact')}
            </NavLink>
            <button
              className="lang-toggle"
              onClick={() => setLanguage(language === 'sv' ? 'en' : 'sv')}
              aria-label={language === 'sv' ? 'Switch to English' : 'Byt till svenska'}
            >
              {language === 'sv' ? 'SE' : 'EN'}
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />}

      {/* Mobile menu - terminal window */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-dots">
            <span className="mobile-menu-dot dot-close"></span>
            <span className="mobile-menu-dot dot-minimize"></span>
            <span className="mobile-menu-dot dot-maximize"></span>
          </div>
          <span className="mobile-menu-title">nav.sh</span>
        </div>
        <nav className="mobile-menu-body">
          <NavLink to="/" className={({ isActive }) => isActive ? 'mobile-menu-link active' : 'mobile-menu-link'} onClick={handleNavClick}>
            {t('mobile.home')}
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'mobile-menu-link active' : 'mobile-menu-link'} onClick={handleNavClick}>
            {t('mobile.projects')}
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'mobile-menu-link active' : 'mobile-menu-link'} onClick={handleNavClick}>
            {t('mobile.about')}
          </NavLink>
          <NavLink to="/cv" className={({ isActive }) => isActive ? 'mobile-menu-link active' : 'mobile-menu-link'} onClick={handleNavClick}>
            {t('mobile.cv')}
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'mobile-menu-link active' : 'mobile-menu-link'} onClick={handleNavClick}>
            {t('mobile.contact')}
          </NavLink>
          <button
            className="mobile-lang-toggle"
            onClick={() => setLanguage(language === 'sv' ? 'en' : 'sv')}
            aria-label={language === 'sv' ? 'Switch to English' : 'Byt till svenska'}
          >
            {language === 'sv' ? 'SE' : 'EN'}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
