/**
 * @file Navigation menu that hides on scroll.
 */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Header.css';

/** Navigation menu that hides when the user scrolls past the top. */
function Header() {
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
                Projekt
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Om Mig
              </NavLink>
            </nav>
          </div>
        </div>

        <div className="header-center">
          <div className="header-title">
            <h1 className="name-first glitch" data-text="Ellen">Ellen</h1>
            <div className="title-row">
              <p className="header-subtitle glitch" data-text="Engineer">Engineer</p>
              <h1 className="name-last glitch" data-text="Carlsson">Carlsson</h1>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="header-right-pill">
            <NavLink to="/cv" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              CV
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Kontakta mig
            </NavLink>
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
            ./hem
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'mobile-menu-link active' : 'mobile-menu-link'} onClick={handleNavClick}>
            ./projekt
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'mobile-menu-link active' : 'mobile-menu-link'} onClick={handleNavClick}>
            ./om-mig
          </NavLink>
          <NavLink to="/cv" className={({ isActive }) => isActive ? 'mobile-menu-link active' : 'mobile-menu-link'} onClick={handleNavClick}>
            ./cv
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'mobile-menu-link active' : 'mobile-menu-link'} onClick={handleNavClick}>
            ./kontakt
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
