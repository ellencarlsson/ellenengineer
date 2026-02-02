/**
 * @file Navigation menu that hides on scroll.
 */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

/** Navigation menu that hides when the user scrolls past the top. */
function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  /** Hides the header when the user scrolls past 100px. */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        // Past threshold, hide header
        setIsHidden(true);
      } else {
        // Near top, show header
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${isHidden ? 'header-hidden' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <div className="header-left-pill">
            <NavLink to="/" className="nav-link">EC</NavLink>
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
      </div>
    </header>
  );
}

export default Header;
