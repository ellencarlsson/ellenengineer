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
      name: 'Sign Talker',
      year: '2024',
      capacity: '847 MB',
      interface: 'SCSI',
      status: 'VERIFIED',
      description: 'SignTalker är ett projekt där jag undersöker hur en Apple Watch kan användas för att tolka handrörelser och omvandla dem till ord med hjälp av AI. Genom att läsa av klockans rörelsesensorer kan applikationen känna igen specifika rörelsemönster och koppla dem till betydelse.\n\nNär en rörelse utförs skickas datan till en tränad AI-modell som försöker avgöra vilket ord som menas. Resultatet skickas sedan vidare till en iPhone, där det visas och kan läsas upp som tal. Flera rörelser kan utföras i följd, vilket gör det möjligt att bygga hela meningar.\n\nProjektet började som ett examensarbete, men efter examen valde jag att göra om det från grunden. Jag hade upptäckt många sätt att utveckla det bättre på och ville utforska dessa möjligheter vidare. Bland annat sättet som data samlades in på var en av grejerna jag insåg kunde göras mycket bättre.\n\nProjektet är ett experiment om hur teknik och AI kan användas för att lösa problem som teckenspråkstalande personer upplever i vardagen.',
      techStack: ['Swift', 'Create ML'],
      github: 'https://github.com/ellencarlsson/sign-language-recognition',
      demo: null,
      image: null,
      demoVideo: 'https://www.youtube.com/embed/RrvsNtiPFXo',
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
      ]
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
                  <svg className="readme-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6.5C10.5 4.5 8 3.5 5 3.5C4 3.5 3 3.7 2 4V18C3 17.5 4 17.5 5 17.5C8 17.5 10.5 18.5 12 20.5C13.5 18.5 16 17.5 19 17.5C20 17.5 21 17.5 22 18V4C21 3.7 20 3.5 19 3.5C16 3.5 13.5 4.5 12 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6.5V20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="readme-label">README</span>
                </div>
              </div>
              <div className="readme-accent-line"></div>
              <div className="readme-content">
                <p className="readme-description">{project.description}</p>
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
                  <span className="about-label">PLATFORMS:</span>
                </div>
                <div className="about-tech-list">
                  <span className="about-tech-badge">Apple Watch</span>
                  <span className="about-tech-badge">iPhone</span>
                </div>
                <div className="about-divider"></div>
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

        {/* DEMO */}
        {project.demoVideo && (
          <div className="file-section fullwidth-section">
            <div className="file-header">
              <span className="file-icon">🎬</span>
              <span className="file-name">DEMO</span>
            </div>
            <div className="file-content">
              <div className="video-container">
                <iframe
                  className="demo-video"
                  src={project.demoVideo}
                  title="Project Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
