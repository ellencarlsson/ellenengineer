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
        {/* Back Button */}
        <Link to="/projects" className="back-button">
          ← Back to Storage Drives
        </Link>

        {/* Mounted Drive Header */}
        <div className="mounted-header">
          <div className="mount-status">
            <div className={`status-led ${project.status === 'VERIFIED' ? 'green' : 'blue'}`}></div>
            <span className="status-text">DRIVE MOUNTED</span>
          </div>
          <div className="mount-info">
            <div className="mount-path">/mnt/{project.id}/</div>
            <div className="mount-label">{project.label}</div>
          </div>
        </div>

        {/* Drive Specs Card */}
        <div className="specs-card">
          <div className="specs-header">
            <div className="specs-icon">💾</div>
            <div className="specs-title">
              <div className="brand-name">{project.model.split(' ')[0]}</div>
              <div className="model-number">{project.model}</div>
            </div>
          </div>
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">CAPACITY:</span>
              <span className="spec-value">{project.capacity}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">INTERFACE:</span>
              <span className="spec-value">{project.interface}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">YEAR:</span>
              <span className="spec-value">{project.year}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">STATUS:</span>
              <span className="spec-value">{project.status}</span>
            </div>
          </div>
        </div>

        {/* Project Preview */}
        {project.image && (
          <div className="project-preview">
            <img src={project.image} alt={project.name} className="preview-image" />
          </div>
        )}

        {/* File System View */}
        <div className="filesystem-container">
          {/* README.txt */}
          <div className="file-section">
            <div className="file-header">
              <span className="file-icon">📄</span>
              <span className="file-name">README.txt</span>
            </div>
            <div className="file-content">
              <h2 className="project-title">{project.name}</h2>
              <p className="project-description">{project.description}</p>
            </div>
          </div>

          {/* TECH-STACK.txt */}
          <div className="file-section">
            <div className="file-header">
              <span className="file-icon">📄</span>
              <span className="file-name">TECH-STACK.txt</span>
            </div>
            <div className="file-content">
              <div className="tech-grid">
                {project.techStack.map((tech, idx) => (
                  <div key={idx} className="tech-badge">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* HOW-IT-WORKS.sys */}
          {project.hasWorkflow && (
            <div className="file-section workflow-section">
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

          {/* DEMO-VIDEO.mp4 */}
          {project.demoVideo && (
            <div className="file-section">
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

          {/* LINKS.txt */}
          <div className="file-section">
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
    </div>
  );
}

export default ProjectDetail;
