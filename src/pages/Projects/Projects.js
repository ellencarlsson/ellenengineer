import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

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

function Projects() {
  const navigate = useNavigate();
  const [hoveredNode, setHoveredNode] = useState(null);

  const projects = [
    {
      id: 'signtalker',
      name: 'SignTalker',
      year: '2024',
      platform: 'Apple Watch',
      tech: 'AI',
      description: 'SignTalker är ett projekt där jag undersöker hur en Apple Watch kan användas för att tolka handrörelser och omvandla dem till ord med hjälp av AI.',
      shortDescription: 'AI-driven teckenspråksigenkänning som använder Apple Watch för att tolka handrörelser och omvandla dem till tal.',
      techStack: ['Swift', 'Create ML'],
      github: 'https://github.com/ellencarlsson/sign-language-recognition',
      connectedTo: ['portfolio-2026']
    },
    {
      id: 'portfolio-2026',
      name: 'Portfolio Website',
      year: '2026',
      platform: 'Webbutveckling',
      tech: 'React',
      description: 'Interaktiv portfolio-hemsida med terminal-tema och 2D game mechanics. Byggt med React och kreativa animationer.',
      shortDescription: 'Interaktiv portfolio med vintage IT-tema, flytande projekt-noder och kreativa animationer byggt i React.',
      techStack: ['React', 'JavaScript', 'CSS3', 'React Router'],
      github: 'https://github.com/ellencarlsson/ellenengineer',
      demo: 'https://ellenengineer.se',
      connectedTo: []
    }
  ];

  const handleNodeClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="projects-page">
      <div className="projects-network-container">
        <svg className="connections-svg" xmlns="http://www.w3.org/2000/svg">
          {projects.map((project, index) => {
            if (!project.connectedTo || project.connectedTo.length === 0) return null;
            const pos = SCATTER_POSITIONS[index];
            return project.connectedTo.map((targetId) => {
              const targetIndex = projects.findIndex(p => p.id === targetId);
              const targetProject = projects[targetIndex];
              if (!targetProject) return null;
              const targetPos = SCATTER_POSITIONS[targetIndex];

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
                  {/* Data packet */}
                  <circle
                    className={`data-packet ${hoveredNode === project.id || hoveredNode === targetId ? 'paused' : ''}`}
                    data-from={project.id}
                    r="3"
                  >
                    <animateMotion
                      dur={`${8 + Math.random() * 4}s`}
                      repeatCount="indefinite"
                      path={`M ${pos.x}% ${pos.y}% L ${targetPos.x}% ${targetPos.y}%`}
                    />
                  </circle>
                </g>
              );
            });
          })}
        </svg>

        <div className="nodes-container">
          {projects.map((project, index) => {
            const pos = SCATTER_POSITIONS[index];
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

              {hoveredNode === project.id && (
                <div className="node-info-card">
                  <div className="terminal-header">
                    <span className="terminal-title">Project Details</span>
                  </div>
                  <div className="info-card-content">
                    <p className="info-description">{project.shortDescription}</p>
                  </div>
                </div>
              )}
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Projects;
