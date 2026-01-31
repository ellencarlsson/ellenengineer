import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

function Projects() {
  const navigate = useNavigate();
  const [hoveredNode, setHoveredNode] = useState(null);

  const projects = [
    {
      id: 'slr-2024',
      name: 'SignTalker',
      year: '2024',
      platform: 'Apple Watch',
      tech: 'AI',
      description: 'SignTalker är ett projekt där jag undersöker hur en Apple Watch kan användas för att tolka handrörelser och omvandla dem till ord med hjälp av AI.',
      shortDescription: 'AI-driven teckenspråksigenkänning som använder Apple Watch för att tolka handrörelser och omvandla dem till tal.',
      techStack: ['Swift', 'Create ML'],
      github: 'https://github.com/ellencarlsson/sign-language-recognition',
      position: { x: 20, y: 18 },
      connectedTo: 'portfolio-2026'
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
      position: { x: 60, y: 48 },
      connectedTo: 'postschema-2025'
    },
    {
      id: 'postschema-2025',
      name: 'PostSchema',
      year: '2025',
      platform: 'Web Application',
      tech: 'Full Stack',
      description: 'En schemaläggningsapp för PostNord-anställda med fokus på användarupplevelse och effektiv schemahantering.',
      shortDescription: 'En full-stack schemaläggningsapp för PostNord-anställda med fokus på användarupplevelse och effektiv hantering.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/ellencarlsson/postschema',
      position: { x: 35, y: 68 },
      connectedTo: null
    }
  ];

  const handleNodeClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="projects-page">
      <div className="projects-network-container">
        <svg className="connections-svg" xmlns="http://www.w3.org/2000/svg">
          {projects.map((project) => {
            if (!project.connectedTo) return null;
            const targetProject = projects.find(p => p.id === project.connectedTo);
            if (!targetProject) return null;

            return (
              <g key={`connection-${project.id}`}>
                <line
                  className={`connection-line ${hoveredNode === project.id || hoveredNode === project.connectedTo ? 'active' : ''}`}
                  data-from={project.id}
                  data-to={project.connectedTo}
                  x1={`${project.position.x}%`}
                  y1={`${project.position.y}%`}
                  x2={`${targetProject.position.x}%`}
                  y2={`${targetProject.position.y}%`}
                />
                {/* Data packet */}
                <circle
                  className={`data-packet ${hoveredNode === project.id || hoveredNode === project.connectedTo ? 'paused' : ''}`}
                  data-from={project.id}
                  r="3"
                >
                  <animateMotion
                    dur={`${8 + Math.random() * 4}s`}
                    repeatCount="indefinite"
                    path={`M ${project.position.x}% ${project.position.y}% L ${targetProject.position.x}% ${targetProject.position.y}%`}
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        <div className="nodes-container">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-node"
              style={{
                left: `${project.position.x}%`,
                top: `${project.position.y}%`,
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
