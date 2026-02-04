/**
 * @file 404 page displayed when no route matches.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <span className="not-found-code">404</span>
        <p className="not-found-message">Sidan kunde inte hittas</p>
        <Link to="/" className="not-found-link">← Tillbaka till startsidan</Link>
      </div>
    </div>
  );
}

export default NotFound;
