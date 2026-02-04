/**
 * @file 404 page displayed when no route matches.
 */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') navigate('/');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="not-found-page">
      <div className="not-found-terminal">
        <div className="not-found-header">
          <span className="not-found-dot red" />
          <span className="not-found-dot yellow" />
          <span className="not-found-dot green" />
          <span className="not-found-header-title">error.log</span>
        </div>
        <div className="not-found-body">
          <p className="not-found-line"><span className="not-found-prompt">$</span> cd /requested-page</p>
          <p className="not-found-line error">bash: cd: /requested-page: No such file or directory</p>
          <p className="not-found-line"><span className="not-found-prompt">$</span> echo $?</p>
          <p className="not-found-line error-code">404</p>
          <p className="not-found-line"><span className="not-found-prompt">$</span> <Link to="/" className="not-found-link">cd /home</Link><span className="not-found-cursor">_</span></p>
          <p className="not-found-hint">tryck enter</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
