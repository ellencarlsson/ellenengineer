import React, { useState, useEffect, useRef } from 'react';
import '../styles/Hero.css';
import '../styles/About.css';

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
    const rightMargin = screenWidth * 0.2; // Use half the screen for spacing
    const availableWidth = screenWidth - leftMargin - rightMargin;
    const spacing = availableWidth / 4; // 5 milestones = 4 gaps

    return [
      {
        year: 2002,
        position: leftMargin,
        directory: '2002_born/',
        location: 'Öxnevalla',
        description: 'Född i Öxnevalla.',
        status: 'Completed'
      },
      {
        year: 2021,
        position: leftMargin + spacing,
        directory: '2021_studies/',
        location: 'Jönköping',
        description: 'Började studera datateknik vid Jönköping University.\nFokus på programmering och systemutveckling.',
        status: 'Completed'
      },
      {
        year: 2024,
        position: leftMargin + spacing * 2,
        directory: '2024_projects/',
        location: 'Jönköping',
        description: 'Studerade datateknik med inriktning mot mjukvaruutveckling\nför mobila plattformar. Utvecklade flera projekt inom iOS\noch Android med fokus på användarupplevelse och struktur.',
        status: 'Completed'
      },
      {
        year: 2025,
        position: leftMargin + spacing * 3,
        directory: '2025_military/',
        location: 'Halmstad',
        description: 'Påbörjade 15 månaders värnplikt i Halmstad.',
        status: 'In Progress'
      },
      {
        year: 2026,
        position: leftMargin + spacing * 4,
        directory: '2026_next/',
        location: '?',
        description: 'Nästa kapitel...',
        status: 'Upcoming'
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
      // Show README content
      lines.push({ type: 'command', text: `ellen@life:~$ cd ${nearestMilestone.year}` });
      lines.push({ type: 'command', text: `ellen@life:~/${nearestMilestone.year}$ cat README.md` });
      lines.push({ type: 'output', text: ' ' });
      lines.push({ type: 'output', text: `Year: ${nearestMilestone.year}` });
      lines.push({ type: 'output', text: `Location: ${nearestMilestone.location}` });
      lines.push({ type: 'output', text: ' ' });
      lines.push({ type: 'output', text: 'Description:' });
      lines.push({ type: 'output', text: nearestMilestone.description });
      lines.push({ type: 'output', text: ' ' });
      lines.push({ type: 'status', text: `Status: ${nearestMilestone.status || 'Completed'}`, status: nearestMilestone.status });
      lines.push({ type: 'output', text: ' ' });
      lines.push({ type: 'output', text: `ellen@life:~/${nearestMilestone.year}$` });
    } else {
      // Base directory
      lines.push({ type: 'output', text: '~/ellen-life$' });
    }

    return lines;
  };

  // Update terminal lines when state changes
  useEffect(() => {
    const newLines = getTerminalLines();
    terminalLinesRef.current = newLines;
    // Display text immediately without typewriter effect
    setDisplayedText(newLines.map(line => line.text).join('\n'));
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
      {/* Terminal Window - Fixed, always centered */}
      <div className="terminal-window terminal-window--game">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button close"></span>
                <span className="terminal-button minimize"></span>
                <span className="terminal-button maximize"></span>
              </div>
              <div className="terminal-title">ellen@life:~/ellen-life</div>
              <div className="terminal-tabs">
                <div className="terminal-tab active">
                  <span className="tab-icon">⚡</span>
                  <span>terminal</span>
                </div>
              </div>
            </div>

            <div className="terminal-body">
              <div className="line-numbers">
                {displayedText.split('\n').map((_, index) => (
                  <div key={index} className="line-number">{index + 1}</div>
                ))}
              </div>

              <div className="terminal-content">
                <pre>
                  {displayedText.split('\n').map((line, index) => {
                    const lineData = terminalLinesRef.current.find(l => l.text === line.trim());
                    const lineType = lineData ? lineData.type : 'output';
                    const statusValue = lineData?.status;

                    let statusClass = '';
                    if (lineType === 'status') {
                      if (statusValue === 'Completed') statusClass = 'status-completed';
                      else if (statusValue === 'In Progress') statusClass = 'status-progress';
                      else if (statusValue === 'Upcoming') statusClass = 'status-upcoming';
                    }

                    return (
                      <div key={index} className={`terminal-line ${lineType} ${statusClass}`}>
                        {line}
                      </div>
                    );
                  })}
                </pre>
              </div>
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
            className={`player ${isWalking ? 'walking' : ''}`}
            style={{
              left: `${playerPos.x}px`,
              bottom: `${60 + (400 - playerPos.y)}px`
            }}
          >
            <div className="player-head"></div>
            <div className="player-body">
              <div className="player-arm player-arm-left"></div>
              <div className="player-arm player-arm-right"></div>
            </div>
            <div className="player-legs">
              <div className="player-leg player-leg-left"></div>
              <div className="player-leg player-leg-right"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
