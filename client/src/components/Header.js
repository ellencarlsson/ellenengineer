import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Ellen Engineer</h1>
        <nav className="nav">
          <a href="#home">Hem</a>
          <a href="#about">Om mig</a>
          <a href="#projects">Projekt</a>
          <a href="#contact">Kontakt</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
