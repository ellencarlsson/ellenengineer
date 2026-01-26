import React, { useState, useEffect, useRef } from 'react';
import '../styles/About.css';

function About() {
  const [playerPos, setPlayerPos] = useState({ x: 2500, y: 400 });
  const [cameraX, setCameraX] = useState(2500);
  const keysRef = useRef({});
  const velocityRef = useRef({ x: 0, y: 0 });
  const isJumpingRef = useRef(false);

  const milestones = [
    { year: 2002, position: 500, city: 'Öxnevalla' },
    { year: 2021, position: 1000, city: 'Jönköping' },
    { year: 2024, position: 1500, city: 'Jönköping' },
    { year: 2025, position: 2000, city: 'Halmstad' },
    { year: 2026, position: 2500, city: '?' }
  ];

  const GROUND_Y = 400;
  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;
  const MOVE_SPEED = 5;
  // Timeline game

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      keysRef.current[key] = true;

      // Jump on space
      if ((key === ' ' || key === 'spacebar') && !isJumpingRef.current) {
        velocityRef.current.y = JUMP_FORCE;
        isJumpingRef.current = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      keysRef.current[key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      setPlayerPos(prev => {
        let newX = prev.x;
        let newY = prev.y;

        // Horizontal movement
        if (keysRef.current['a'] || keysRef.current['arrowleft']) {
          newX -= MOVE_SPEED;
        }
        if (keysRef.current['d'] || keysRef.current['arrowright']) {
          newX += MOVE_SPEED;
        }

        // Keep player in bounds
        newX = Math.max(100, Math.min(3000, newX));

        // Apply gravity
        velocityRef.current.y += GRAVITY;

        // Update Y position
        newY += velocityRef.current.y;

        // Ground collision
        if (newY >= GROUND_Y) {
          newY = GROUND_Y;
          velocityRef.current.y = 0;
          isJumpingRef.current = false;
        }

        return { x: newX, y: newY };
      });

      // Smooth camera follow
      setCameraX(prev => {
        const targetX = playerPos.x - 400;
        return prev + (targetX - prev) * 0.1;
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [playerPos.x]);

  return (
    <section id="about" className="about-game">
      <div className="game-container">
        <div className="game-instructions">
          <p>Använd WASD eller piltangenter för att röra dig • Space för att hoppa</p>
        </div>

        <div className="game-world" style={{ transform: `translateX(-${cameraX}px)` }}>
          {/* Ground */}
          <div className="ground"></div>

          {/* Milestones */}
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="milestone"
              style={{ left: `${milestone.position}px` }}
            >
              <div className="milestone-pole"></div>
              <div className="milestone-sign">
                <div className="milestone-year">{milestone.year}</div>
                <div className="milestone-city">{milestone.city}</div>
              </div>
            </div>
          ))}

          {/* Player */}
          <div
            className="player"
            style={{
              left: `${playerPos.x}px`,
              bottom: `${600 - playerPos.y}px`
            }}
          >
            <div className="player-head"></div>
            <div className="player-body"></div>
            <div className="player-legs"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
