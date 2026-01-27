import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Projects.css';

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
      techStack: ['Swift', 'Create ML'],
      github: 'https://github.com/ellencarlsson/sign-language-recognition',
      position: { x: 20, y: 25 },
      connectedTo: 'portfolio-2026'
    },
    {
      id: 'portfolio-2026',
      name: 'Portfolio Website',
      year: '2026',
      platform: 'Webbutveckling',
      tech: 'React',
      description: 'Interaktiv portfolio-hemsida med terminal-tema och 2D game mechanics. Byggt med React och kreativa animationer.',
      techStack: ['React', 'JavaScript', 'CSS3', 'React Router'],
      github: 'https://github.com/ellencarlsson/ellenengineer',
      demo: 'https://ellenengineer.se',
      position: { x: 60, y: 55 },
      connectedTo: 'postschema-2025'
    },
    {
      id: 'postschema-2025',
      name: 'PostSchema',
      year: '2025',
      platform: 'Web Application',
      tech: 'Full Stack',
      description: 'En schemaläggningsapp för PostNord-anställda med fokus på användarupplevelse och effektiv schemahantering.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/ellencarlsson/postschema',
      position: { x: 35, y: 75 },
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
              <line
                key={`line-${project.id}`}
                className={`connection-line ${hoveredNode === project.id || hoveredNode === project.connectedTo ? 'active' : ''}`}
                data-from={project.id}
                data-to={project.connectedTo}
                x1={`${project.position.x}%`}
                y1={`${project.position.y}%`}
                x2={`${targetProject.position.x}%`}
                y2={`${targetProject.position.y}%`}
              />
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
                <div className="node-led">
                  <div className="led-light"></div>
                </div>

                <div className="node-inner">
                  <div className="node-name">{project.name}</div>
                  <div className="node-year">{project.year}</div>
                </div>
              </div>

              {hoveredNode === project.id && (
                <div className="node-info-card">
                  <div className="info-card-content">
                    <div className="info-item">
                      <span className="info-label">platform:</span>
                      <span className="info-value">{project.platform}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">tech:</span>
                      <span className="info-value">{project.tech}</span>
                    </div>
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
