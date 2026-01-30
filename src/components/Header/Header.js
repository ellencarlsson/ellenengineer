import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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

        <div className="header-center">
          <div className="header-title">
            <h1 className="name-first">Ellen</h1>
            <div className="title-row">
              <p className="header-subtitle">Engineer </p>
              <h1 className="name-last">Carlsson</h1>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="nav-pill">
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
