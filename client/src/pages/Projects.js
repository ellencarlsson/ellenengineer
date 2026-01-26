import React, { useState } from 'react';
import '../styles/pages/Projects.css';

function Projects() {
  const [mountedDrive, setMountedDrive] = useState(null);

  const drives = [
    {
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
      image: null
    },
    {
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
  ];

  const toggleMount = (driveId) => {
    setMountedDrive(mountedDrive === driveId ? null : driveId);
  };

  return (
    <div className="projects-page">
      <div className="drives-container">
        <div className="page-header">
          <h1 className="drives-title">STORAGE DRIVES</h1>
          <div className="drives-subtitle">Click drive to mount and view contents</div>
        </div>

        <div className="drives-grid">
          {drives.map((drive) => (
            <div key={drive.id} className="drive-wrapper">
              <div
                className={`hard-drive ${mountedDrive === drive.id ? 'mounted' : ''}`}
                onClick={() => toggleMount(drive.id)}
              >
                {/* Drive Top Panel */}
                <div className="drive-top">
                  <div className="drive-screws">
                    <div className="screw"></div>
                    <div className="screw"></div>
                    <div className="screw"></div>
                    <div className="screw"></div>
                  </div>

                  <div className="drive-brand">
                    <div className="brand-name">{drive.model.split(' ')[0]}</div>
                    <div className="model-number">{drive.model}</div>
                  </div>

                  <div className="drive-led">
                    <div className={`led ${drive.status === 'VERIFIED' ? 'green' : 'blue'}`}></div>
                    <div className="led-label">{drive.status}</div>
                  </div>
                </div>

                {/* Drive Middle - Preview */}
                <div className="drive-preview">
                  {drive.image ? (
                    <img src={drive.image} alt={drive.name} className="drive-image" />
                  ) : (
                    <div className="drive-placeholder">
                      <div className="placeholder-icon">💾</div>
                      <div className="placeholder-text">{drive.year}</div>
                    </div>
                  )}
                </div>

                {/* Drive Label */}
                <div className="drive-label">
                  <div className="label-text">{drive.label}</div>
                  <div className="label-barcode">|||||| |||| ||||| ||| ||||</div>
                </div>

                {/* Drive Specs */}
                <div className="drive-specs">
                  <div className="spec-item">
                    <span className="spec-label">CAPACITY:</span>
                    <span className="spec-value">{drive.capacity}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">INTERFACE:</span>
                    <span className="spec-value">{drive.interface}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">YEAR:</span>
                    <span className="spec-value">{drive.year}</span>
                  </div>
                </div>

                {/* Mount Indicator */}
                <div className="drive-mount-hint">
                  {mountedDrive === drive.id ? '▼ MOUNTED' : '▶ CLICK TO MOUNT'}
                </div>
              </div>

              {/* Mounted Contents */}
              {mountedDrive === drive.id && (
                <div className="drive-contents">
                  <div className="contents-header">
                    <div className="contents-title">📁 {drive.label}</div>
                    <div className="contents-path">/mnt/{drive.id}/</div>
                  </div>

                  <div className="contents-body">
                    <div className="content-section">
                      <div className="content-file">📄 README.txt</div>
                      <div className="content-text">
                        <strong>{drive.name}</strong>
                        <p>{drive.description}</p>
                      </div>
                    </div>

                    <div className="content-section">
                      <div className="content-file">📄 TECH-STACK.txt</div>
                      <div className="content-tags">
                        {drive.techStack.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div className="content-section">
                      <div className="content-file">📄 LINKS.txt</div>
                      <div className="content-links">
                        {drive.github && (
                          <a
                            href={drive.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="content-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            → View on GitHub
                          </a>
                        )}
                        {drive.demo && (
                          <a
                            href={drive.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="content-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            → Live Demo
                          </a>
                        )}
                      </div>
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
