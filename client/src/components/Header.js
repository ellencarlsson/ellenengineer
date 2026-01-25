import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
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
            <h1 className="glitch name-first" data-text="Ellen">Ellen</h1>
            <div className="title-row">
              <p className="glitch header-subtitle" data-text="Dataingenjör">Dataingenjör </p>
              <h1 className="glitch name-last" data-text="Carlsson">Carlsson</h1>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="nav-pill">
            <a href="/resume.pdf" className="nav-link" target="_blank" rel="noopener noreferrer">
              CV
            </a>
          </div>
          <div className="nav-pill">
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
