/**
 * @file Projects page displaying projects as interactive nodes with connections.
 */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Projects.css';

/** Generate random particle properties for electronic look */
const generateParticles = (nodeIndex, count = 4) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const seed = nodeIndex * 100 + i;
    const random = (min, max) => {
      const x = Math.sin(seed * (i + 1) * 9999) * 10000;
      return min + (x - Math.floor(x)) * (max - min);
    };
    particles.push({
      size: random(3, 6),
      opacity: random(0.5, 0.8),
      duration: random(8, 14),
      startAngle: random(0, 360),
      radius: random(100, 115),
      delay: random(0, 6),
      direction: 1,
    });
  }
  return particles;
};

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
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  /** Gets localized text from an object with sv/en keys. */
  const loc = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object' && (value.sv || value.en)) {
      return value[language] || value.sv || value.en || '';
    }
    return value;
  };

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
      description: {
        sv: 'SignTalker är ett projekt där jag undersöker hur en Apple Watch kan användas för att tolka handrörelser och omvandla dem till ord med hjälp av AI.',
        en: 'SignTalker is a project where I explore how an Apple Watch can be used to interpret hand movements and convert them into words using AI.'
      },
      techStack: ['Swift', 'Create ML'],
      github: null,
      connectedTo: ['ellenengineer', 'nordpunkt']
    },
    {
      id: 'ellenengineer',
      name: 'EllenEngineer',
      year: '2026',
      platform: { sv: 'Webbutveckling', en: 'Web Development' },
      tech: 'React',
      description: {
        sv: 'Portfolio-hemsida med teknisk design och Telegram-notiser vid besök och buggrapporter.',
        en: 'Portfolio website with technical design and Telegram notifications on visits and bug reports.'
      },
      techStack: ['React', 'JavaScript', 'CSS3', 'React Router'],
      github: null,
      demo: 'https://ellenengineer.se',
      connectedTo: ['nordpunkt']
    },
    {
      id: 'nordpunkt',
      name: 'NordPunkt',
      year: { sv: 'Under utveckling', en: 'In development' },
      platform: 'Raspberry Pi',
      tech: 'Python',
      description: {
        sv: 'Militär applikation för MGRS-koordinater och schemaläggning med Raspberry Pi.',
        en: 'Military application for MGRS coordinates and scheduling with Raspberry Pi.'
      },
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
                {generateParticles(index, isMobile ? 2 : 4).map((p, i) => (
                  <div
                    key={i}
                    className="particle"
                    style={{
                      '--size': `${p.size}px`,
                      '--opacity': p.opacity,
                      '--duration': `${p.duration}s`,
                      '--start-angle': `${p.startAngle}deg`,
                      '--radius': `${p.radius}px`,
                      '--delay': `-${p.delay}s`,
                      '--direction': p.direction,
                    }}
                  />
                ))}
              </div>

              <div className="node-circle">
                <div className="node-inner">
                  <div className="node-name">{project.name}</div>
                  <div className="node-tag">{loc(project.platform)}</div>
                  <div className="node-year">{loc(project.year)}</div>
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
