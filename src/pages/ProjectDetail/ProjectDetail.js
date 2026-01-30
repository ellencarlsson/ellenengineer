import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetail.css';

function ProjectDetail() {
  const { projectId } = useParams();
  const [flippedCards, setFlippedCards] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSchemaIndex, setCurrentSchemaIndex] = useState(0);

  const handleCardFlip = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const screenshots = [
    '/assets/postschema-1.png',
    '/assets/postschema-2.png',
    '/assets/postschema-3.png',
    '/assets/postschema-4.png',
    '/assets/postschema-5.png'
  ];

  const schemaScreenshots = [
    '/assets/schema-ea.jpg',
    '/assets/schema-isac.jpg',
    '/assets/schema-pluton.jpg'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const nextSchema = () => {
    setCurrentSchemaIndex((prev) => (prev + 1) % schemaScreenshots.length);
  };

  const prevSchema = () => {
    setCurrentSchemaIndex((prev) => (prev - 1 + schemaScreenshots.length) % schemaScreenshots.length);
  };

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
      ledColor: 'brown',
      tagline: 'AI-powered sign language recognition using Apple Watch motion sensors',
      platforms: ['Apple Watch', 'iPhone'],
      description: 'SignTalker är ett projekt där jag undersöker hur en Apple Watch kan användas för att tolka handrörelser och omvandla dem till ord med hjälp av AI. Genom att läsa av klockans rörelsesensorer kan applikationen känna igen specifika rörelsemönster och koppla dem till betydelse.\n\nNär en rörelse utförs skickas datan till en tränad AI-modell som försöker avgöra vilket ord som menas. Resultatet skickas sedan vidare till en iPhone, där det visas och kan läsas upp som tal. Flera rörelser kan utföras i följd, vilket gör det möjligt att bygga hela meningar.\n\nProjektet började som ett examensarbete, men efter examen valde jag att göra om det från grunden. Jag hade upptäckt många sätt att utveckla det bättre på och ville utforska dessa möjligheter vidare. Bland annat sättet som data samlades in på var en av grejerna jag insåg kunde göras mycket bättre.\n\nProjektet är ett experiment om hur teknik och AI kan användas för att lösa problem som teckenspråkstalande personer upplever i vardagen.',
      techStack: ['Swift', 'Create ML'],
      github: 'https://github.com/ellencarlsson/sign-language-recognition',
      demo: null,
      thesis: 'https://www.diva-portal.org/smash/get/diva2:1880636/FULLTEXT01.pdf',
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
      ledColor: 'medium',
      tagline: 'Interactive portfolio with vintage IT theme and creative animations',
      platforms: ['Web'],
      description: 'Interaktiv portfolio-hemsida med terminal-tema och 2D game mechanics. Byggt med React och kreativa animationer för att visa mitt arbete på ett unikt sätt.',
      techStack: ['React', 'JavaScript', 'CSS3', 'React Router'],
      github: 'https://github.com/ellencarlsson/ellenengineer',
      demo: 'https://ellenengineer.se',
      image: null
    },
    'postschema-2025': {
      id: 'postschema-2025',
      model: 'SAMSUNG PS2025',
      label: 'POSTSCHEMA-2025',
      name: 'PostSchema',
      year: '2025',
      capacity: '1.5 GB',
      interface: 'SATA',
      status: 'OPERATIONAL',
      ledColor: 'burgundy',
      tagline: 'iOS-app för postpass baserat på soldaters kvalifikationer och stridsvärde.',
      platforms: ['iPhone'],
      description: 'Schemaläggning av militära arbetspass är en komplex och tidskrävande manuell process. Ansvariga måste samtidigt hålla reda på vilka soldater som har rätt kvalifikationer för varje typ av post, säkerställa att arbetsrättsliga regler följs (max arbetstid, vilotider, pauser), och försöka fördela belastningen rättvist. Detta blir snabbt överväldigande när man hanterar flera grupper, olika posttyper och många soldater.\n\nPostSchema utvecklades för att automatisera denna process, med kravet att fungera helt offline eftersom tillgång till nätverk inte alltid kan garanteras i militära miljöer. Projektet föddes ur ett intresse för Swift-programmering och iOS-utveckling, kombinerat med behovet av en praktisk lösning på ett verkligt problem. Genom att använda Core Data som lokal databas kan hela systemet – från datalagring till schemaoptimering – köras direkt på enheten utan externa beroenden.\n\nProblemet är bara att mobilen inte kan medtas i fält, därför är en version 2 av PostSchema på gång, som ni kan se här (länk till ett annat projekt som ännu inte finns).',
      techStack: ['Swift', 'Core Data'],
      github: 'https://github.com/ellencarlsson/postschema',
      demo: null,
      image: null,
      hasScoreSystem: true,
      scoreSystem: {
        intro: 'Systemet prioriterar utvilade och balanserade soldater. Varje soldat får en score (0-1) baserat på tre faktorer som väger nästan lika:',
        factors: [
          {
            name: 'Rest Time',
            icon: '💤',
            title: 'Vila',
            description: 'Återhämtningstid sedan senaste passet',
            subtitle: 'Straffar kort vila hårt',
            details: [
              'Target: 420 min (7h)',
              '0 min → 0.0 poäng',
              '210 min → 0.7 poäng',
              '420 min → 1.0 poäng',
              'Mest dynamisk faktor'
            ]
          },
          {
            name: 'Workload',
            icon: '⚡',
            title: 'Belastning',
            description: 'Total arbetstid det senaste dygnet',
            subtitle: 'Mild straff tidigt, hård sent',
            details: [
              'Max: 960 min (16h/48h)',
              '0 min → 1.0 poäng',
              '480 min → 0.75 poäng',
              '960 min → 0.0 poäng',
              'Långsiktig rättvisa'
            ]
          },
          {
            name: 'Consecutive',
            icon: '🔄',
            title: 'Konsekutivitet',
            description: 'Kontinuerlig arbetstid utan paus',
            subtitle: 'Straffar hårt',
            details: [
              'Max: 240 min (4h - LAGKRAV)',
              '0 min → 1.0 poäng',
              '120 min → 0.7 poäng',
              '240 min → 0.0 poäng',
              'Kräver 1h rast efter 4h'
            ]
          }
        ],
        conclusion: {
          formula: 'finalScore = (vila × 0.33) + (belastning × 0.33) + (konsekutivitet × 0.34)',
          range: '0.0 - 1.0 där 1.0 = perfekt (fullständigt utvilad, minimal belastning)',
          selection: 'Systemet väljer: Soldat med högst score',
          rotation: 'Efter tilldelning: Score sjunker → automatisk rotation'
        },
        workflow: [
          {
            step: 1,
            icon: '🔍',
            title: 'FILTRERA',
            description: 'Sortera bort omöjliga kandidater',
            details: 'Rätt befattning + Inte upptagen + Följer regler',
            ledColor: 'blue'
          },
          {
            step: 2,
            icon: '📊',
            title: 'POÄNGSÄTT',
            description: 'Beräkna score för varje kandidat',
            details: '3 faktorer: Vila 33% + Belastning 33% + Konsekutivitet 34% = Total score (0-1)',
            ledColor: 'yellow'
          },
          {
            step: 3,
            icon: '✅',
            title: 'VÄLJ BÄST',
            description: 'Sortera och välj högsta poäng',
            details: 'Soldat med bäst välmående får passet',
            ledColor: 'green'
          },
          {
            step: 4,
            icon: '🔧',
            title: 'OPTIMERA',
            description: 'Local search efter tilldelning',
            details: 'Byta soldater mellan pass för bättre total score',
            ledColor: 'green'
          }
        ]
      }
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
            ← Back
          </Link>
          <div className="project-title-row">
            <h1 className="github-project-name">{project.name}</h1>
            <p className="project-tagline">{project.tagline}</p>
          </div>
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
                {project.id === 'postschema-2025' && (
                  <p className="readme-score-info">
                    <strong>HÖG poäng = BRA kandidat</strong> • Väljer soldaten med högst score för passet • Hög score betyder: utvilad, obelastad, redo att arbeta
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - About */}
          <div className="sidebar-column">
            <div className={`about-section led-${project.ledColor}`}>
              <div className="about-header">
                <span className="about-title">PROJECT DETAILS</span>
              </div>
              <div className="about-content">
                <div className="about-item">
                  <span className="about-label">PLATFORMS:</span>
                </div>
                <div className="about-tech-list">
                  {project.platforms && project.platforms.map((platform, index) => (
                    <div key={index} className="about-tech-badge">
                      <svg className="tech-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M7 5H17" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M7 19H17" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="12" cy="20" r="0.5" fill="currentColor"/>
                      </svg>
                      {platform}
                    </div>
                  ))}
                </div>
                <div className="about-divider"></div>
                <div className="about-item">
                  <span className="about-label">TECH STACK:</span>
                </div>
                <div className="about-tech-list">
                  {project.techStack && project.techStack.map((tech, index) => (
                    <div key={index} className="about-tech-badge">
                      <svg className="tech-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 12H10" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M14 12H16" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 8V10" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 14V16" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      {tech}
                    </div>
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
              <span className="file-icon">📼</span>
              <span className="file-name">DEMO.broadcast</span>
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
                <div className="tv-controls">
                  <div className="tv-knob"></div>
                  <div className="tv-knob"></div>
                </div>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCORE-SYSTEM.algo - Score System */}
        {project.hasScoreSystem && (
          <div className="file-section score-system-section fullwidth-section">
            <div className="file-content">
              {/* RESULTAT Section Header */}
              <div className="file-header">
                <span className="file-icon">📱</span>
                <span className="file-name">RESULTAT</span>
              </div>

              {/* Multiple iPhones Showcase */}
              <div className="score-phones-showcase">
                <div className="phones-container">
                  {/* Phone 1 - Carousel */}
                  <div className="phone-mockup phone-carousel">
                    <div className="phone-device">
                      <div className="phone-notch"></div>
                      <div className="phone-screen">
                        <div className="phone-content carousel-content">
                          <img
                            src={screenshots[currentImageIndex]}
                            alt={`PostSchema screenshot ${currentImageIndex + 1}`}
                            className="phone-screenshot"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="screenshot-placeholder" style={{display: 'none', fontSize: '40px', textAlign: 'center', color: '#8b6f47', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                            📱<br/>
                            <span style={{fontSize: '14px', fontFamily: 'Courier New', marginTop: '10px'}}>Screenshot {currentImageIndex + 1}</span>
                          </div>
                        </div>
                      </div>
                      {/* Carousel Navigation */}
                      <button className="carousel-btn carousel-btn-prev" onClick={prevImage}>‹</button>
                      <button className="carousel-btn carousel-btn-next" onClick={nextImage}>›</button>
                      {/* Carousel Dots */}
                      <div className="carousel-dots">
                        {screenshots.map((_, index) => (
                          <button
                            key={index}
                            className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phone 2 - Schema Carousel */}
                  <div className="phone-mockup phone-carousel">
                    <div className="phone-device">
                      <div className="phone-notch"></div>
                      <div className="phone-screen">
                        <div className="phone-content carousel-content">
                          <img
                            src={schemaScreenshots[currentSchemaIndex]}
                            alt={`Schema screenshot ${currentSchemaIndex + 1}`}
                            className="phone-screenshot"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="screenshot-placeholder" style={{display: 'none', fontSize: '40px', textAlign: 'center', color: '#8b6f47', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                            📋<br/>
                            <span style={{fontSize: '14px', fontFamily: 'Courier New', marginTop: '10px'}}>Schema {currentSchemaIndex + 1}</span>
                          </div>
                        </div>
                      </div>
                      {/* Carousel Navigation */}
                      <button className="carousel-btn carousel-btn-prev" onClick={prevSchema}>‹</button>
                      <button className="carousel-btn carousel-btn-next" onClick={nextSchema}>›</button>
                      {/* Carousel Dots */}
                      <div className="carousel-dots">
                        {schemaScreenshots.map((_, index) => (
                          <button
                            key={index}
                            className={`carousel-dot ${index === currentSchemaIndex ? 'active' : ''}`}
                            onClick={() => setCurrentSchemaIndex(index)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Factors Cards */}
              <div className="score-factors-section">
                <div className="file-header">
                  <span className="file-icon">🎯</span>
                  <span className="file-name">POÄNGSYSTEM</span>
                </div>

                {/* Intro text */}
                <p className="score-intro-text">{project.scoreSystem.intro}</p>

                <div className="factors-grid-main">
                  {project.scoreSystem.factors.map((factor, index) => (
                    <div
                      key={index}
                      className={`factor-card-main ${flippedCards[`factor-${index}`] ? 'flipped' : ''}`}
                      onClick={() => handleCardFlip(`factor-${index}`)}
                    >
                      <div className="factor-card-inner">
                        {/* Front Side */}
                        <div className="factor-card-front">
                          <div className="factor-icon">{factor.icon}</div>
                          <div className="factor-title">{factor.title}</div>
                          <div className="factor-description">{factor.description}</div>
                          <div className="factor-subtitle">{factor.subtitle}</div>
                          <div className="factor-hint">Klicka för detaljer →</div>
                        </div>

                        {/* Back Side */}
                        <div className="factor-card-back">
                          <div className="factor-back-title">{factor.icon} {factor.title}</div>
                          <div className="factor-details-list">
                            {factor.details.map((detail, idx) => (
                              <div key={idx} className="factor-detail-item">
                                <span className="detail-bullet">•</span>
                                <span className="detail-text">{detail}</span>
                              </div>
                            ))}
                          </div>
                          <div className="factor-hint">Klicka för att stänga ←</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Conclusion */}
                <div className="score-conclusion">
                  <h3 className="conclusion-title">Slutpoäng</h3>
                  <div className="conclusion-formula">{project.scoreSystem.conclusion.formula}</div>
                  <div className="conclusion-details">
                    <p><strong>Range:</strong> {project.scoreSystem.conclusion.range}</p>
                    <p><strong>{project.scoreSystem.conclusion.selection}</strong></p>
                    <p><strong>{project.scoreSystem.conclusion.rotation}</strong></p>
                  </div>
                </div>
              </div>

              {/* Workflow */}
              <div className="score-workflow">
                <div className="file-header">
                  <span className="file-icon">🔄</span>
                  <span className="file-name">KOMPLETT WORKFLOW</span>
                </div>
                <div className="workflow-flow-horizontal">
                  {project.scoreSystem.workflow.map((step, index) => (
                    <React.Fragment key={step.step}>
                      <div className="workflow-node-container">
                        <div className={`workflow-node led-${step.ledColor}`}>
                          <div className="node-led-indicator"></div>
                          <div className="node-icon">{step.icon}</div>
                          <div className="node-number">STEG {step.step}</div>
                          <div className="node-title">{step.title}</div>
                          <div className="node-description">{step.description}</div>
                          <div className="node-details">{step.details}</div>
                        </div>
                      </div>
                      {index < project.scoreSystem.workflow.length - 1 && (
                        <div className="workflow-connector">
                          <div className="connector-line"></div>
                          <div className="connector-arrow">→</div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Learnings */}
              <div className="learnings-box">
                <div className="readme-header">
                  <div className="readme-title-section">
                    <span className="readme-icon">💡</span>
                    <span className="readme-label">LÄRDOMMAR</span>
                  </div>
                </div>
                <div className="readme-accent-line"></div>
                <div className="readme-content">
                  <p className="readme-description">
                    Den största utmaningen var att få till hierarkin mellan plutoner, grupper och soldater, tillsammans med alla regler för olika befattningar och deras specifika begränsningar. Mycket av utvecklingstiden gick till att bygga upp denna grundstruktur innan själva schemaläggningen kunde börja.
                  </p>
                  <p className="readme-description">
                    Ursprungstanken var att plutonchefen skulle kunna skapa scheman för alla grupper med ett klick, men komplexiteten blev överväldigande. I praktiken används appen nu bara av gruppchefer för sina egna grupper, vilket fungerar mycket bättre. En viktig lärdom är att börja enkelt – fokusera på att göra ett riktigt bra system för en nivå istället för att försöka täcka hela organisationshierarkin från början.
                  </p>
                  <p className="readme-description">
                    Att utveckla utan visuell feedback av databasen och poängsystemet var extremt utmanande. Jag kunde bara skriva tester och manuellt granska resultaten för att bedöma om schemaläggningen blev rättvis. En datavisualiseringskomponent hade varit ovärderlig för att kunna debugga och förstå systemets beteende.
                  </p>
                  <p className="readme-description">
                    När komplexiteten växte med olika befattningars unika prioriteringar blev det lockande att fokusera på UI-utveckling istället, eftersom den delen kändes mer hanterbar och gav synliga resultat. Detta är en viktig reflektion om vikten av att ta itu med kärnfunktionaliteten först, även när den känns svårare.
                  </p>
                </div>
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
              {project.thesis && (
                <a
                  href={project.thesis}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link thesis"
                >
                  <span className="link-icon">→</span>
                  <span className="link-text">Thesis Paper</span>
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
