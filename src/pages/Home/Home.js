/**
 * @file Home page that renders the Hero terminal.
 */
import React from 'react';
import Hero from '../../components/Hero/Hero';
import './Home.css';

/** Home page with the animated terminal. */
function Home() {
  return (
    <div className="home-page">
      <Hero />
    </div>
  );
}

export default Home;
