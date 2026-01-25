import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <NavLink to="/" className="logo-initials">EC</NavLink>
          <nav className="nav">
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Projects
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              About
            </NavLink>
          </nav>
        </div>

        <div className="header-center">
          <div className="header-title">
            <h1 className="glitch name-first" data-text="Ellen">Ellen</h1>
            <div className="title-row">
              <p className="header-subtitle">Dataingenjör </p>
              <h1 className=" name-last" data-text="Carlsson">Carlsson</h1>
            </div>
          </div>
        </div>

        <div className="header-right">
          <a href="/resume.pdf" className="resume-link" target="_blank" rel="noopener noreferrer">
            RESUME
          </a>
          <NavLink to="/contact" className="mail-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
