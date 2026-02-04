/**
 * @file Projects page displaying projects as interactive nodes with connections.
 */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

/** Predefined positions for the project nodes in the network. */
const SCATTER_POSITIONS = [
  { x: 25, y: 30 },
  { x: 65, y: 25 },
  { x: 45, y: 60 },
  { x: 20, y: 70 },
  { x: 75, y: 65 },
  { x: 50, y: 35 },
  { x: 35, y: 85 },
  { x: 80, y: 40 },
];

/** Mobile override: move EllenEngineer node higher. */
const MOBILE_POSITIONS = SCATTER_POSITIONS.map((pos, i) =>
  i === 1 ? { ...pos, y: 17 } : pos
);

/** Projects page showing all projects as clickable nodes with SVG connections. */
function Projects() {
  const navigate = useNavigate();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const svgRef = useRef(null);

  const positions = isMobile ? MOBILE_POSITIONS : SCATTER_POSITIONS;

  const projects = [
    {
      id: 'signtalker',
      name: 'SignTalker',
      year: '2024',
      platform: 'Apple Watch',
      tech: 'AI',
      description: 'SignTalker är ett projekt där jag undersöker hur en Apple Watch kan användas för att tolka handrörelser och omvandla dem till ord med hjälp av AI.',
      techStack: ['Swift', 'Create ML'],
      github: null,
      connectedTo: ['ellenengineer', 'nordpunkt']
    },
    {
      id: 'ellenengineer',
      name: 'EllenEngineer',
      year: '2026',
      platform: 'Webbutveckling',
      tech: 'React',
      description: 'Interaktiv portfolio-hemsida med terminal-tema och 2D game mechanics. Byggt med React och kreativa animationer.',
      techStack: ['React', 'JavaScript', 'CSS3', 'React Router'],
      github: null,
      demo: 'https://ellenengineer.se',
      connectedTo: ['nordpunkt']
    },
    {
      id: 'nordpunkt',
      name: 'NordPunkt',
      year: 'Under utveckling',
      platform: 'Raspberry Pi',
      tech: 'Python',
      description: 'Applikation som tar fram MGRS-koordinater med hjälp av en Raspberry Pi.',
      techStack: ['Python'],
      github: null,
      connectedTo: ['ellenengineer']
    }
  ];

  /** Navigates to the project detail page. */
  const handleNodeClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="projects-page">
      <div className="projects-network-container">
        <svg className="connections-svg" xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
          {projects.map((project, index) => {
            if (!project.connectedTo || project.connectedTo.length === 0) return null;
            const pos = positions[index];
            return project.connectedTo.map((targetId) => {
              const targetIndex = projects.findIndex(p => p.id === targetId);
              const targetProject = projects[targetIndex];
              if (!targetProject) return null;
              const targetPos = positions[targetIndex];

              return (
                <g key={`connection-${project.id}-${targetId}`}>
                  <line
                    className={`connection-line ${hoveredNode === project.id || hoveredNode === targetId ? 'active' : ''}`}
                    data-from={project.id}
                    data-to={targetId}
                    x1={`${pos.x}%`}
                    y1={`${pos.y}%`}
                    x2={`${targetPos.x}%`}
                    y2={`${targetPos.y}%`}
                  />
                </g>
              );
            });
          })}
        </svg>

        <div className="nodes-container">
          {projects.map((project, index) => {
            const pos = positions[index];
            return (
            <div
              key={project.id}
              className="project-node"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                animationDelay: `${index * 0.5}s`,
                zIndex: 3 - index
              }}
              onMouseEnter={() => setHoveredNode(project.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(project.id)}
            >
              {/* Orbiting particles */}
              <div className="particle-orbit">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
              </div>

              <div className="node-circle">
                {/* LED Indicator */}
                <div className="node-led"></div>

                <div className="node-inner">
                  <div className="node-name">{project.name}</div>
                  <div className="node-tag">{project.platform}</div>
                  <div className="node-year">{project.year}</div>
                </div>
              </div>

            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Projects;
