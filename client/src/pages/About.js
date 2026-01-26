import React, { useState, useEffect, useRef } from 'react';
import '../styles/Hero.css';
import '../styles/About.css';
import PlayerAvatar from '../components/PlayerAvatar';

function About() {
  const [playerPos, setPlayerPos] = useState({ x: 130, y: 400 });
  const [nearestMilestone, setNearestMilestone] = useState(null);
  const [leavingMilestone, setLeavingMilestone] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isWalking, setIsWalking] = useState(false);
  const keysRef = useRef({});
  const velocityRef = useRef({ x: 0, y: 0 });
  const isJumpingRef = useRef(false);
  const previousMilestoneRef = useRef(null);
  const terminalLinesRef = useRef([]);

  // Calculate positions dynamically based on screen width
  const getMilestones = () => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const leftMargin = 80;
    const rightMargin = screenWidth * 0.2;
    const availableWidth = screenWidth - leftMargin - rightMargin;
    const spacing = availableWidth / 6; // 7 milestones = 6 gaps

    return [
      {
        year: 2002,
        position: leftMargin,
        directory: '2002_born/',
        location: 'Öxnevalla',
        description: 'Här växte jag upp och gick hela min skolgång, med ett stort intresse för djur, särskilt hästar.',
        image: '/images/2002.jpg'
      },
      {
        year: 2021,
        position: leftMargin + spacing,
        directory: '2021_studies/',
        location: 'Jönköping',
        description: 'Jag flyttade för att studeta på Jönköpings Tekniska Högskola, på programmet Datateknik: Mjukvaruutveckling med Mobila Plattformar.',
        image: '/images/2021.jpg'
      },
      {
        year: 2022,
        position: leftMargin + spacing * 2,
        directory: '2022_programming/',
        location: 'Jönköping',
        description: 'Under mitt första år av studierna lärde jag mig grundläggande programmering. Det innefattade Objektorienterad programmering samt hur databaser och bl.a SQL fungerar.'
      },
      {
        year: 2023,
        position: leftMargin + spacing * 3,
        directory: '2023_projects/',
        location: 'Jönköping',
        description: 'Under andra året lärde jag mig hur man satte ihop alla delar, databas och programmering, och jag lärde mig att göra hela projekt. Det var Android app, iOS app, två webbsidor. Under tiden jag flyttade till en ny lägenhet, var jag hyresvärd under 2 år, för 2 olika gäster. Hade min praktik på SAAB, Training & Simulation, och arbetade även där som sommarjobbare.'
      },
      {
        year: 2024,
        position: leftMargin + spacing * 4,
        directory: '2024_projects/',
        location: 'Jönköping',
        description: 'Tog examen som Dataingenjör. Fick pris och stipendie av Science Park för mitt examensarbete, om teckenspråksigenkänning, som ställdes ut bland andra examensarbeterna på JTH:s examensmässa. Efter att ha varit på en "hälsa på dag" hos min bror på Försvarsmakten fick jag ett intresse militären. Därför sökte jag till att göra värnplikten.',
        image: '/images/2024.jpg'
      },
      {
        year: 2025,
        position: leftMargin + spacing * 5,
        directory: '2025_military/',
        location: 'Halmstad',
        description: 'I mars påbörjade 15 månaders värnplikt i på Luftvärnsregementet Lv6 i Halmstad, som Luftvärnsplutonbefäl.',
        image: '/images/2025.jpg'
      },
      {
        year: 2026,
        position: leftMargin + spacing * 6,
        directory: '2026_next/',
        location: '?',
        description: 'I mitt nästa kapitel ser jag fram emot att fortsätta min karriär som Dataingenjör, gärna med inslag av Försvarsmakten.'
      }
    ];
  };

  const milestones = getMilestones();

  const GROUND_Y = 400;
  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;
  const MOVE_SPEED = 5;

  // Generate terminal lines based on current state
  const getTerminalLines = () => {
    const lines = [];

    if (leavingMilestone && !nearestMilestone) {
      // Leaving a directory
      lines.push({ type: 'command', text: `cd ..` });
    } else if (nearestMilestone) {
      // Show year and location with bold values
      lines.push({
        type: 'info',
        text: `ellen@year:~$ `,
        boldText: nearestMilestone.year
      });
      lines.push({
        type: 'info',
        text: `ellen@location:~$ `,
        boldText: nearestMilestone.location
      });
      lines.push({ type: 'output', text: ' ' });
      lines.push({ type: 'title', text: 'README.md' });
      lines.push({ type: 'output', text: nearestMilestone.description });
    } else {
      // Base directory
      lines.push({ type: 'output', text: '' });
    }

    return lines;
  };

  // Update terminal lines when state changes
  useEffect(() => {
    const newLines = getTerminalLines();
    terminalLinesRef.current = newLines;
    // Don't use simple text join anymore, we'll render with JSX for bold support
    setDisplayedText('updated'); // Just trigger re-render
  }, [nearestMilestone, leavingMilestone]);

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
        let moving = false;

        // Horizontal movement
        if (keysRef.current['a'] || keysRef.current['arrowleft']) {
          newX -= MOVE_SPEED;
          moving = true;
        }
        if (keysRef.current['d'] || keysRef.current['arrowright']) {
          newX += MOVE_SPEED;
          moving = true;
        }

        setIsWalking(moving);

        // Keep player in bounds (within screen width)
        const screenWidth = window.innerWidth;
        newX = Math.max(50, Math.min(screenWidth - 50, newX));

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

      // Check nearest milestone with detection range
      // Player should be "inside" milestone when 50px behind or 50px ahead
      let foundMilestone = null;
      for (const milestone of milestones) {
        const distanceFromMilestone = playerPos.x - milestone.position;
        // Check if player is within range: -50 (behind) to +50 (ahead)
        if (distanceFromMilestone >= -50 && distanceFromMilestone <= 50) {
          foundMilestone = milestone;
          break;
        }
      }

      if (foundMilestone) {
        setNearestMilestone(foundMilestone);
        previousMilestoneRef.current = foundMilestone;
      } else {
        // Leaving a milestone - show cd .. notification
        if (previousMilestoneRef.current && nearestMilestone) {
          setLeavingMilestone(previousMilestoneRef.current);
          setTimeout(() => setLeavingMilestone(null), 2000);
          previousMilestoneRef.current = null;
        }
        setNearestMilestone(null);
      }
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [playerPos.x, milestones]);

  return (
    <section id="about" className="about-game">
      {/* Content Display - Top Left */}
      <div className="content-display">
        <div className="content-lines">
          {terminalLinesRef.current.map((lineData, index) => {
            return (
              <div key={index} className={`content-line ${lineData.type}`}>
                {lineData.text}
                {lineData.boldText && <strong>{lineData.boldText}</strong>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Game World - Static, full screen */}
      <div className="game-world-container">
        <div className="game-world">
          {/* Ground line */}
          <div className="ground"></div>

          {/* Milestones - Folder icons */}
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`milestone ${nearestMilestone === milestone ? 'active' : ''}`}
              style={{ left: `${milestone.position}px` }}
            >
              <div className="folder-icon">📁</div>
              <div className="folder-label">/{milestone.year}</div>
            </div>
          ))}

          {/* Player */}
          <div
            className="player"
            style={{
              left: `${playerPos.x}px`,
              bottom: `${41 + (400 - playerPos.y)}px`
            }}
          >
            <PlayerAvatar isWalking={isWalking} />
          </div>
        </div>
      </div>

      {/* Image Display - Slides in from right when milestone has image */}
      {nearestMilestone && nearestMilestone.image && (
        <div className="image-display">
          <img
            src={nearestMilestone.image}
            alt={`${nearestMilestone.year} - ${nearestMilestone.location}`}
            className="milestone-image"
          />
        </div>
      )}
    </section>
  );
}

export default About;
