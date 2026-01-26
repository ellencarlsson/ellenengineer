import React from 'react';
import '../styles/Projects.css';

function Projects() {
  const projectData = [
    {
      id: 1,
      title: "Projekt 1",
      description: "Beskrivning av projekt 1",
      tech: ["React", "Node.js"]
    },
    {
      id: 2,
      title: "Projekt 2",
      description: "Beskrivning av projekt 2",
      tech: ["Vue", "MongoDB"]
    },
    {
      id: 3,
      title: "Projekt 3",
      description: "Beskrivning av projekt 3",
      tech: ["Python", "Django"]
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h2>Mina Projekt</h2>
        <div className="projects-grid">
          {projectData.map(project => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
