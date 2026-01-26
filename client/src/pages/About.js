import React, { useState, useEffect, useRef } from 'react';
import '../styles/About.css';

function About() {
  const [playerPos, setPlayerPos] = useState({ x: 2500, y: 400 });
  const [cameraX, setCameraX] = useState(2500);
  const [showInstructions, setShowInstructions] = useState(true);
  const [nearestMilestone, setNearestMilestone] = useState(null);
  const keysRef = useRef({});
  const velocityRef = useRef({ x: 0, y: 0 });
  const isJumpingRef = useRef(false);
  const lastMoveTimeRef = useRef(Date.now());
  const initialFadeTimerRef = useRef(null);

  const milestones = [
    { year: 2002, position: 500, directory: '2002_born/', location: 'öxnevalla' },
    { year: 2021, position: 1000, directory: '2021_studies/', location: 'jönköping' },
    { year: 2024, position: 1500, directory: '2024_projects/', location: 'jönköping' },
    { year: 2025, position: 2000, directory: '2025_military/', location: 'halmstad' },
    { year: 2026, position: 2500, directory: '2026_next/', location: '?' }
  ];

  const GROUND_Y = 400;
  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;
  const MOVE_SPEED = 5;
  // Timeline game

  // Initial fade out after 3 seconds
  useEffect(() => {
    initialFadeTimerRef.current = setTimeout(() => {
      setShowInstructions(false);
    }, 3000);

    return () => {
      if (initialFadeTimerRef.current) {
        clearTimeout(initialFadeTimerRef.current);
      }
    };
  }, []);

  // Check for inactivity and show instructions again
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const timeSinceLastMove = Date.now() - lastMoveTimeRef.current;
      if (timeSinceLastMove > 5000 && !showInstructions) {
        setShowInstructions(true);
        // Auto hide again after 3 seconds
        setTimeout(() => setShowInstructions(false), 3000);
      }
    }, 1000);

    return () => clearInterval(checkInactivity);
  }, [showInstructions]);

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
        let hasMoved = false;

        // Horizontal movement
        if (keysRef.current['a'] || keysRef.current['arrowleft']) {
          newX -= MOVE_SPEED;
          hasMoved = true;
        }
        if (keysRef.current['d'] || keysRef.current['arrowright']) {
          newX += MOVE_SPEED;
          hasMoved = true;
        }

        // Track movement for instruction visibility
        if (hasMoved || keysRef.current[' ']) {
          lastMoveTimeRef.current = Date.now();
          if (showInstructions && initialFadeTimerRef.current) {
            clearTimeout(initialFadeTimerRef.current);
            setShowInstructions(false);
          }
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

      // Check nearest milestone
      const closest = milestones.reduce((nearest, milestone) => {
        const distance = Math.abs(playerPos.x - milestone.position);
        if (!nearest || distance < nearest.distance) {
          return { milestone, distance };
        }
        return nearest;
      }, null);

      if (closest && closest.distance < 150) {
        setNearestMilestone(closest.milestone);
      } else {
        setNearestMilestone(null);
      }
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [playerPos.x, milestones]);

  return (
    <section id="about" className="about-game">
      <div className="game-container">
        <div className={`game-instructions ${showInstructions ? 'visible' : 'hidden'}`}>
          <p>navigate --wasd --arrows | jump --space</p>
        </div>

        {/* Terminal Overlay */}
        {nearestMilestone && (
          <div className="info-panel">
            <div className="panel-terminal">
              <div className="panel-header">
                <span className="panel-prompt">$</span>
                <span className="panel-command">cat {nearestMilestone.directory}README.md</span>
              </div>
              <div className="panel-content">
                <div className="panel-line">
                  <span className="line-key">year</span>
                  <span className="line-value">{nearestMilestone.year}</span>
                </div>
                <div className="panel-line">
                  <span className="line-key">location</span>
                  <span className="line-value">{nearestMilestone.location}</span>
                </div>
                <div className="panel-line">
                  <span className="line-key">path</span>
                  <span className="line-value">~/life/{nearestMilestone.directory}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="game-world" style={{ transform: `translateX(-${cameraX}px)` }}>
          {/* Ground */}
          <div className="ground"></div>

          {/* Milestones - small markers */}
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`milestone ${nearestMilestone === milestone ? 'active' : ''}`}
              style={{ left: `${milestone.position}px` }}
            >
              <div className="milestone-marker">
                <div className="marker-icon">📁</div>
                <div className="marker-year">{milestone.year}</div>
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
