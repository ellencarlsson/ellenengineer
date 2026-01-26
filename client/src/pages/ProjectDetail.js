import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/pages/ProjectDetail.css';

function ProjectDetail() {
  const { projectId } = useParams();

  const projects = {
    'slr-2024': {
      id: 'slr-2024',
      model: 'SEAGATE ST3847',
      label: 'SIGN-LANGUAGE-2024',
      name: 'Sign Language Recognition',
      year: '2024',
      capacity: '847 MB',
      interface: 'SCSI',
      status: 'VERIFIED',
      description: 'AI-baserad teckenspråksigenkänning med deep learning. Examensarbete som fick pris och stipendium av Science Park och ställdes ut på JTH:s examensmässa.',
      techStack: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'NumPy'],
      github: 'https://github.com/ellencarlsson/sign-language-recognition',
      demo: null,
      image: null,
      hasWorkflow: true,
      workflow: [
        {
          step: 1,
          icon: '⌚',
          title: 'SENSOR INPUT',
          description: 'Apple Watch känner av handrörelser',
          details: 'Gyroskop + Accelerometer',
          ledColor: 'blue'
        },
        {
          step: 2,
          icon: '📊',
          title: 'DATA COLLECTION',
          description: 'Spelar in samma tecken många gånger',
          details: 'Träningsdata samlas in',
          ledColor: 'blue'
        },
        {
          step: 3,
          icon: '🤖',
          title: 'AI TRAINING',
          description: 'AI lär sig känna igen varje tecken',
          details: 'Modellen justeras och optimeras',
          ledColor: 'yellow'
        },
        {
          step: 4,
          icon: '⌚',
          title: 'LIVE CAPTURE',
          description: 'Gör ett tecken med klockan',
          details: 'Real-time rörelseinspelning',
          ledColor: 'green'
        },
        {
          step: 5,
          icon: '🤖',
          title: 'AI PREDICTION',
          description: 'AI identifierar vilket tecken det är',
          details: 'Returnerar predicted output',
          ledColor: 'green'
        },
        {
          step: 6,
          icon: '📱',
          title: 'OUTPUT',
          description: 'Telefonen säger ordet högt',
          details: 'Text-to-Speech',
          ledColor: 'green'
        }
      ],
      demoVideo: null
    },
    'portfolio-2026': {
      id: 'portfolio-2026',
      model: 'MAXTOR MX2026',
      label: 'PORTFOLIO-WEBSITE-2026',
      name: 'Portfolio Website',
      year: '2026',
      capacity: '2.6 GB',
      interface: 'IDE',
      status: 'OPERATIONAL',
      description: 'Interaktiv portfolio-hemsida med terminal-tema och 2D game mechanics. Byggt med React och kreativa animationer för att visa mitt arbete på ett unikt sätt.',
      techStack: ['React', 'JavaScript', 'CSS3', 'React Router'],
      github: 'https://github.com/ellencarlsson/ellenengineer',
      demo: 'https://ellenengineer.se',
      image: null
    }
  };

  const project = projects[projectId];

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="error-container">
          <h1>404 - Project Not Found</h1>
          <Link to="/projects" className="back-link">← Back to Storage Drives</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      <div className="project-detail-container">
        {/* Project Title Header - GitHub Style */}
        <div className="project-header-title">
          <Link to="/projects" className="back-link">
            ← Back to Storage Drives
          </Link>
          <h1 className="github-project-name">{project.name}</h1>
        </div>

        {/* Main Content - GitHub Style Layout */}
        <div className="github-layout">
          {/* Left Column - README */}
          <div className="main-column">
            <div className="readme-box">
              <div className="readme-header">
                <div className="readme-title-section">
                  <span className="readme-icon">📖</span>
                  <span className="readme-label">README</span>
                </div>
              </div>
              <div className="readme-accent-line"></div>
              <div className="readme-content">
                <p className="readme-description">{project.description}</p>

                <h2 className="readme-section-title">Tech Stack</h2>
                <div className="readme-divider"></div>
                <ul className="readme-tech-list">
                  {project.techStack.map((tech, idx) => (
                    <li key={idx} className="readme-tech-item">{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - About */}
          <div className="sidebar-column">
            <div className="about-section">
              <div className="about-header">
                <span className="about-title">ABOUT</span>
              </div>
              <div className="about-content">
                <div className="about-item">
                  <span className="about-label">TECH STACK:</span>
                </div>
                <div className="about-tech-list">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="about-tech-badge">{tech}</span>
                  ))}
                </div>
                <div className="about-divider"></div>
                <div className="about-item">
                  <span className="about-label">YEAR:</span>
                  <span className="about-value">{project.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DEMO-VIDEO.mp4 */}
        {project.demoVideo && (
          <div className="file-section fullwidth-section">
            <div className="file-header">
              <span className="file-icon">🎬</span>
              <span className="file-name">DEMO-VIDEO.mp4</span>
            </div>
            <div className="file-content">
              <div className="video-container">
                <video controls className="demo-video">
                  <source src={project.demoVideo} type="video/mp4" />
                  Din webbläsare stödjer inte video.
                </video>
              </div>
            </div>
          </div>
        )}

        {/* HOW-IT-WORKS.sys - Full Screen */}
        {project.hasWorkflow && (
          <div className="file-section workflow-section fullwidth-section">
            <div className="file-header">
              <span className="file-icon">⚙️</span>
              <span className="file-name">HOW-IT-WORKS.sys</span>
            </div>
            <div className="file-content">
              <div className="system-diagram">
                {project.workflow.map((step) => (
                  <div key={step.step} className="workflow-step">
                    <div className="step-card">
                      {/* LED Indicator */}
                      <div className="step-led-container">
                        <div className={`step-led ${step.ledColor}`}></div>
                      </div>

                      {/* Step Number */}
                      <div className="step-number">STEP {step.step}</div>

                      {/* Icon */}
                      <div className="step-icon">{step.icon}</div>

                      {/* Content */}
                      <div className="step-content">
                        <div className="step-title">{step.title}</div>
                        <div className="step-description">{step.description}</div>
                        <div className="step-details">{step.details}</div>
                      </div>

                      {/* Vintage Label */}
                      <div className="step-label">
                        <div className="label-barcode">|| ||| |||| ||| ||</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LINKS.txt */}
        <div className="file-section fullwidth-section">
          <div className="file-header">
            <span className="file-icon">📄</span>
            <span className="file-name">LINKS.txt</span>
          </div>
          <div className="file-content">
            <div className="links-container">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link github"
                >
                  <span className="link-icon">→</span>
                  <span className="link-text">View on GitHub</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link demo"
                >
                  <span className="link-icon">→</span>
                  <span className="link-text">Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
