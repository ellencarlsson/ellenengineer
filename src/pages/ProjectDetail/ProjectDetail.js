import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetail.css';

const techIcons = {
  'Apple Watch': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="12" height="14" rx="3"/><path d="M6 7H18M6 15H18"/><circle cx="12" cy="11" r="1" fill="currentColor"/><path d="M8 18V20C8 20.55 8.45 21 9 21H15C15.55 21 16 20.55 16 20V18"/></svg>,
  'iPhone': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="1" width="14" height="22" rx="3"/><path d="M10 1.5h4" strokeWidth="2"/><path d="M9.5 20h5"/></svg>,
  'iOS': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="1" width="14" height="22" rx="3"/><path d="M10 1.5h4" strokeWidth="2"/><path d="M9.5 20h5"/></svg>,
  'Web': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  'Swift': <svg className="tech-icon" viewBox="0 0 56 56" fill="currentColor"><path d="M47.06 36.66l-.004-.004c.066-.224.134-.446.191-.675 2.465-9.821-3.55-21.432-13.731-27.546 4.461 6.048 6.434 13.374 4.681 19.78-.156.571-.344 1.12-.552 1.653-.225-.148-.51-.316-.89-.527 0 0-10.127-6.252-21.103-17.312-.288-.29 5.852 8.777 12.822 16.14-3.284-1.843-12.434-8.5-18.227-13.802.712 1.187 1.558 2.33 2.489 3.43C17.573 23.932 23.882 31.5 31.44 37.314c-5.31 3.25-12.814 3.502-20.285.003a30.646 30.646 0 0 1-5.193-3.098c3.162 5.058 8.033 9.423 13.96 11.97 7.07 3.039 14.1 2.833 19.336.05l-.004.007c.024-.016.055-.032.08-.047.214-.116.428-.234.636-.358 2.516-1.306 7.485-2.63 10.152 2.559.654 1.27 2.041-5.46-3.061-11.74z"/></svg>,
  'Core ML': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="4"/><text x="12" y="15" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="400" fontFamily="system-ui, sans-serif">ML</text></svg>,
  'SwiftUI': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 7v10M12 10v7M16 8v9"/></svg>,
  'Core Data': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>,
  'MVVM': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="7" height="5" rx="1"/><rect x="15" y="3" width="7" height="5" rx="1"/><rect x="8.5" y="16" width="7" height="5" rx="1"/><path d="M5.5 8v3h13V8M12 11v5"/></svg>,
  'React': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>,
  'JavaScript': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">JS</text></svg>,
  'CSS3': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z"/><path d="M7 7h10l-.5 5H9.5l.25 3L12 16l2.25-1"/></svg>,
  'React Router': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="12" cy="6" r="3"/><path d="M12 9v3M9 15l-1.5 1.5M15 15l1.5 1.5"/></svg>,
};

const defaultIcon = <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>;

function SvgLabel({ x, y, anchor, fill, fontSize, children }) {
  const lines = String(children).split('\n');
  if (lines.length === 1) {
    return (
      <text x={x} y={y} textAnchor={anchor} dominantBaseline="middle"
        fill={fill} fontSize={fontSize} fontFamily="'Courier New', monospace"
      >{children}</text>
    );
  }
  return (
    <text x={x} y={y} textAnchor={anchor} dominantBaseline="middle"
      fill={fill} fontSize={fontSize} fontFamily="'Courier New', monospace"
    >
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : fontSize * 1.2}>{line}</tspan>
      ))}
    </text>
  );
}

function ArchitectureDiagram({ architecture }) {
  const { nodes, connections, groups } = architecture;
  const maxCol = Math.max(...nodes.map(n => n.col));
  const maxRow = Math.max(...nodes.map(n => n.row));

  const nodeWidth = 480;
  const nodeHeight = 140;
  const gapX = 350;
  const gapY = 180;
  const padding = 80;
  const groupPad = 35;

  const svgWidth = (maxCol + 1) * (nodeWidth + gapX) - gapX + padding * 2;
  const svgHeight = (maxRow + 1) * (nodeHeight + gapY) - gapY + padding * 2 + (groups ? 30 : 0);

  const getNodePos = (id) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return { x: 0, y: 0, cx: 0, cy: 0, w: nodeWidth };
    const x = padding + node.col * (nodeWidth + gapX);
    const y = (groups ? 30 : 0) + padding + node.row * (nodeHeight + gapY);
    const w = node.colSpan ? nodeWidth * node.colSpan + gapX * (node.colSpan - 1) : nodeWidth;
    return { x, y, cx: x + w / 2, cy: y + nodeHeight / 2, w };
  };

  // Find bidirectional pairs to merge them
  const biKeys = new Set();
  connections.forEach((c, i) => {
    connections.forEach((d, j) => {
      if (i < j && c.from === d.to && c.to === d.from) {
        biKeys.add(`${c.from}-${c.to}`);
        biKeys.add(`${d.from}-${d.to}`);
      }
    });
  });

  const rendered = new Set();

  return (
    <div className="arch-diagram-wrapper">
      <svg className="arch-diagram" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow" markerWidth="14" markerHeight="10" refX="14" refY="5" orient="auto">
            <polygon points="0 0, 14 5, 0 10" fill="rgba(255,255,255,0.5)" />
          </marker>
          <marker id="arrow-reverse" markerWidth="14" markerHeight="10" refX="0" refY="5" orient="auto">
            <polygon points="14 0, 0 5, 14 10" fill="rgba(255,255,255,0.5)" />
          </marker>
        </defs>

        {groups && groups.map((group, i) => {
          const groupNodes = nodes.filter(n => group.nodeIds.includes(n.id));
          const positions = groupNodes.map(n => getNodePos(n.id));
          const minX = Math.min(...positions.map(p => p.x)) - groupPad;
          const minY = Math.min(...positions.map(p => p.y)) - groupPad - 60;
          const maxX = Math.max(...positions.map(p => p.x)) + nodeWidth + groupPad;
          const maxY = Math.max(...positions.map(p => p.y)) + nodeHeight + groupPad;
          return (
            <g key={`group-${i}`}>
              <rect
                x={minX} y={minY}
                width={maxX - minX} height={maxY - minY}
                rx="10"
                fill="none"
                stroke="rgba(212, 165, 116, 0.4)"
                strokeWidth="2"
                strokeDasharray="8 4"
              />
              <text
                x={minX + 15} y={minY + 38}
                fill="rgba(212, 165, 116, 0.6)"
                fontSize="30"
                fontFamily="'Courier New', monospace"
                fontWeight="600"
                letterSpacing="2"
              >{group.label}</text>
            </g>
          );
        })}

        {connections.map((conn, i) => {
          const key = `${conn.from}-${conn.to}`;
          const reverseKey = `${conn.to}-${conn.from}`;
          const isBi = biKeys.has(key);

          // Skip if we already rendered the reverse
          if (isBi && rendered.has(reverseKey)) return null;
          rendered.add(key);

          const from = getNodePos(conn.from);
          const to = getNodePos(conn.to);
          const reverse = isBi ? connections.find(c => c.from === conn.to && c.to === conn.from) : null;

          const dx = to.cx - from.cx;
          const dy = to.cy - from.cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const nx = dx / dist;
          const ny = dy / dist;

          const fromHalfW = (from.w || nodeWidth) / 2;
          const toHalfW = (to.w || nodeWidth) / 2;
          const startX = from.cx + nx * (fromHalfW + 8);
          const startY = from.cy + ny * (nodeHeight / 2 + 8);
          const endX = to.cx - nx * (toHalfW + 8);
          const endY = to.cy - ny * (nodeHeight / 2 + 8);

          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;

          // Perpendicular offset for label
          const perpX = -ny;
          const perpY = nx;

          if (isBi) {
            const isVertical = Math.abs(ny) > Math.abs(nx);
            const offset = 28;
            const labelOffset = offset + 50;
            const anchor1 = isVertical ? (perpX < 0 ? 'start' : 'end') : 'middle';
            const anchor2 = isVertical ? (perpX < 0 ? 'end' : 'start') : 'middle';
            return (
              <g key={i}>
                <line
                  x1={startX - perpX * offset} y1={startY - perpY * offset}
                  x2={endX - perpX * offset} y2={endY - perpY * offset}
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
                <SvgLabel
                  x={midX - perpX * labelOffset} y={midY - perpY * labelOffset}
                  anchor={anchor1} fill="rgba(255,255,255,0.45)" fontSize={28}
                >{conn.label}</SvgLabel>
                {reverse && (
                  <>
                    <line
                      x1={endX + perpX * offset} y1={endY + perpY * offset}
                      x2={startX + perpX * offset} y2={startY + perpY * offset}
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                    <SvgLabel
                      x={midX + perpX * labelOffset} y={midY + perpY * labelOffset}
                      anchor={anchor2} fill="rgba(255,255,255,0.45)" fontSize={28}
                    >{reverse.label}</SvgLabel>
                  </>
                )}
              </g>
            );
          }

          return (
            <g key={i}>
              <line
                x1={startX} y1={startY} x2={endX} y2={endY}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
              {conn.label && (
                <SvgLabel
                  x={midX + perpX * 30} y={midY + perpY * 30}
                  anchor={Math.abs(perpX) > 0.5 ? (perpX > 0 ? 'start' : 'end') : 'middle'}
                  fill="rgba(255,255,255,0.45)" fontSize={28}
                >{conn.label}</SvgLabel>
              )}
            </g>
          );
        })}

        {nodes.map((node) => {
          const { x, y } = getNodePos(node.id);
          const w = node.colSpan ? nodeWidth * node.colSpan + gapX * (node.colSpan - 1) : nodeWidth;
          return (
            <g key={node.id}>
              <rect
                x={x} y={y}
                width={w} height={nodeHeight}
                rx="10"
                fill="rgba(0,0,0,0.4)"
                stroke="rgba(212, 165, 116, 0.25)"
                strokeWidth="2"
              />
              <text
                x={x + w / 2}
                y={y + nodeHeight / 2 + 7}
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="40"
                fontFamily="'Courier New', monospace"
                fontWeight="400"
                letterSpacing="0.5"
              >{node.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ProjectDetail() {
  const { projectId } = useParams();
  const [playingVideos, setPlayingVideos] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    result: false,
    architecture: false,
    components: false,
    insights: false,
    links: false
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const projects = {
    'signtalker': {
      id: 'signtalker',
      model: 'SEAGATE ST3847',
      label: 'SIGN-LANGUAGE-2024',
      name: 'Sign Talker',
      year: '2024 – 2025',
      capacity: '847 MB',
      interface: 'SCSI',
      status: 'VERIFIED',
      ledColor: 'brown',
      accentColor: 'terracotta',
      tagline: 'AI-driven teckenspråksigenkänning med Apple Watch rörelsesensorer',
      description: 'Personer som talar teckenspråk har ofta svårt att kommunicera med människor som inte förstår teckenspråk, vilket skapar en barriär i vardagen, på jobbet, i affären, hos läkaren. SignTalker är en app där man har en vanlig Apple Watch på handleden och gör teckenspråkstecken. Klockan känner av handrörelserna och skickar dem till en AI som har lärt sig vad varje rörelse betyder. Resultatet skickas till en iPhone som säger ordet högt. Man kan göra flera tecken i rad och bygga hela meningar. Klockan tolkar, telefonen pratar.\n\nDet enda man behöver är en Apple Watch och en iPhone. Ingen kamera, ingen dator, ingen internetuppkoppling. Allt fungerar i realtid, direkt på enheten. Projektet började som mitt examensarbete, och jag fick pris och stipendium av Science Park för det. Efter examen byggde jag om det från grunden för att göra det ännu bättre.',
      platforms: ['Apple Watch', 'iPhone'],
      techStack: ['Swift', 'Core ML'],
      architecture: {
        nodes: [
          // iPhone — UI layer
          { id: 'iphone-view', label: 'iPhone View', col: 0, row: 0 },
          // iPhone — Logic layer
          { id: 'iphone-vm', label: 'ViewModel', col: 0, row: 1 },
          // iPhone — Services
          { id: 'tts', label: 'AVSpeech', col: 0, row: 2 },
          // Bridge (between devices)
          { id: 'wc', label: 'WatchConnectivity', col: 1, row: 1 },
          // Watch — UI layer
          { id: 'watch-view', label: 'Watch View', col: 2, row: 0 },
          // Watch — Logic layer
          { id: 'watch-vm', label: 'ViewModel', col: 2, row: 1 },
          // Watch — Services
          { id: 'motion', label: 'CMMotionManager', col: 2, row: 2 },
          { id: 'datahelper', label: 'DataHelper', col: 3, row: 2 },
          { id: 'mlmodel', label: 'Core ML', col: 3, row: 1 },
        ],
        connections: [
          // Watch: UI ↔ Logic
          { from: 'watch-vm', to: 'watch-view', label: 'Detecting or not' },
          // Watch: Logic → Services (straight down, right, up)
          { from: 'watch-vm', to: 'motion', label: 'Start/Stop\ndetecting' },
          { from: 'motion', to: 'datahelper', label: 'Raw data' },
          { from: 'datahelper', to: 'mlmodel', label: '60 samples' },
          { from: 'mlmodel', to: 'watch-vm', label: 'Prediction' },
          // iPhone ↔ WatchConnectivity ↔ Watch (bidirectional)
          { from: 'iphone-vm', to: 'wc', label: 'Send detect\nsignal' },
          { from: 'wc', to: 'iphone-vm', label: 'Detected word' },
          { from: 'wc', to: 'watch-vm', label: 'Send detect\nsignal' },
          { from: 'watch-vm', to: 'wc', label: 'Detected word' },
          // iPhone: View ↔ Logic
          { from: 'iphone-view', to: 'iphone-vm', label: 'Tap to\ndetect' },
          { from: 'iphone-vm', to: 'iphone-view', label: 'Display\nwords' },
          { from: 'iphone-vm', to: 'tts', label: 'Speak\nwords' },
        ],
        groups: [
          { label: 'APPLE WATCH', nodeIds: ['watch-view', 'watch-vm', 'motion', 'datahelper', 'mlmodel'] },
          { label: 'IPHONE', nodeIds: ['iphone-view', 'iphone-vm', 'tts'] },
        ],
        subtitle: 'Appen är uppbyggd enligt MVVM-mönstret, där vyer och logik hålls separata. Både klockan och telefonen följer samma struktur med egna vyer och ViewModels. Att de delar samma arkitektur gör det enklare för dem att kommunicera med varandra, och gör det möjligt att testa och bygga vidare på varje del för sig.\n\nHela AI-modellen körs lokalt på klockan. Det är klockan som samlar in sensordata och tolkar tecknen, telefonen fungerar bara som en skärm för att visa resultatet och en fjärrkontroll för att starta detektionen. Eftersom all logik redan ligger på klockan innebär det att den i framtiden skulle kunna fungera helt självständigt.'
      },
      github: 'https://github.com/ellencarlsson/sign-language-recognition',
      demo: null,
      thesis: 'https://www.diva-portal.org/smash/get/diva2:1880636/FULLTEXT01.pdf',
      image: null,
      demoVideos: [
        { title: 'Introduktion', url: 'https://www.youtube.com/embed/RrvsNtiPFXo' },
        { title: 'Beställa i drive in', url: 'https://www.youtube.com/embed/RrvsNtiPFXo' },
        { title: 'Dog mode', url: 'https://www.youtube.com/embed/RrvsNtiPFXo' },
      ],
      resultText: 'Användaren startar inspelningen från telefonen, som skickar en signal till klockan att börja läsa av rörelsesensorerna. Utöver vanliga tecken kan man även koppla egna handtecken till inspelningar av sin egen röst.',
      techDetails: [
        {
          label: 'Träningsfas',
          text: 'Man spelar in samma tecken upprepade gånger med klockan. Sensordata sparas som CSV-filer som sedan manuellt läggs in i Create ML, Apples verktyg för att skapa AI-modeller. Create ML konverterar datan till en färdig Core ML-fil, som är själva AI-modellen som sedan manuellt exporteras till appen. Ju fler inspelningar med olika vinklar och hastigheter, desto bättre blir modellen.'
        },
        {
          label: '50 Hz motion sampling',
          text: 'Klockan har inbyggda sensorer, en accelerometer som mäter hur handen förflyttas och ett gyroskop som mäter hur den vrids. Dessa sensorer fångar de aktuella värdena var 0.02:e sekund, vilket ger en väldigt detaljerad bild av hela rörelsen.'
        },
        {
          label: 'Fixed-window segmentering (60 samples)',
          text: 'Varje inspelning samlar in exakt 60 data samples och motsvarar ett ord. Den fasta storleken gör att modellen alltid får samma mängd data att jobba med, oavsett vilket tecken som görs.'
        },
        {
          label: 'Haptisk feedback',
          text: 'När klockan har samlat in 60 data samples efter ca 1.2 sekunderär ett tecken färdigtolkat och klockan vibrerar. Man har sedan 1 sekund på sig att förbereda nästa tecken, och då vibrerar klockan igen som signal att den börjat lyssna på en ny rörelse.'
        },
        {
          label: 'Avsluta en mening',
          text: 'För att markera att en mening är klar gör man ett speciellt stopptecken, man håller handen uppochner. Klockan känner igen det som en avslutningssignal, slutar lyssna efter fler tecken och den färdiga meningen hörs och syns från telefonen.'
        }
      ],
      insights: [
        {
          title: 'Begränsningar',
          items: [
            {
              label: 'Manuell träning',
              text: 'Att lägga till nya ord kräver manuellt arbete. Träningsdata exporteras som CSV-filer som sedan används för att bygga om modellen. Det finns ingen automatisk pipeline, varje nytt tecken kräver ny träning och en ny modellversion.'
            },
            {
              label: 'Fast fönsterstorlek',
              text: 'Alla inputs till modellen måste ha samma storlek, 60 samples. Det innebär att snabba tecken måste göras långsammare och långsamma tecken snabbare för att passa fönstret. Fler samples ger mer precis data, men ökar också latensen, och högre samplingsfrekvens förstärker samma avvägning.'
            }
          ]
        },
        {
          title: 'Fortsatt utveckling',
          items: [
            {
              label: 'Fler sensorer',
              text: 'Med en klocka på varje hand hade modellen kunnat fånga hela teckenspråksrörelser, inte bara ena handens.'
            }
          ]
        }
      ],
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
      componentsText: 'Varje komponent i appen har en specifik uppgift och tillhör antingen iPhone- eller Apple Watch-sidan. Här är en översikt av de viktigaste delarna och vad de ansvarar för.',
      components: [
        {
          group: 'iPhone',
          items: [
            {
              name: 'IPhoneViewModel',
              type: 'ViewModel',
              responsibility: 'Skickar kommandon till klockan och tar emot detekterade ord. Bygger upp en ordlista som sedan kan omvandlas till en mening.'
            },
            {
              name: 'SentenceConverter',
              type: 'Model',
              responsibility: 'Tar en lista av detekterade ord och sätter ihop dem till en grammatiskt korrekt svensk mening.'
            }
          ]
        },
        {
          group: 'Apple Watch',
          items: [
            {
              name: 'WatchViewModel',
              type: 'ViewModel',
              responsibility: 'Tar emot kommandon från telefonen och bestämmer vad klockan ska göra. Skickar tillbaka detekterade ord.'
            },
            {
              name: 'PredictionViewModel',
              type: 'ViewModel',
              responsibility: 'Startar sensorerna, samlar in rörelsedata och skickar den vidare till AI-modellen.'
            },
            {
              name: 'TrainingViewModel',
              type: 'ViewModel',
              responsibility: 'Samlar in träningsdata för nya tecken och exporterar den som CSV-filer till en träningsserver.'
            },
            {
              name: 'PredictionModel',
              type: 'Model',
              responsibility: 'Kör Core ML-modellen som tolkar rörelsedata till ord. Sparar tillstånd mellan prediktioner.'
            },
            {
              name: 'DataHelper',
              type: 'Helper',
              responsibility: 'Definierar samplingsfrekvens (50 Hz) och fönsterstorlek (60 samples). Strukturerar rå sensorvärden.'
            }
          ]
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
      accentColor: 'rose',
      tagline: 'Interaktiv portfolio med terminal-tema och kreativa animationer',
      description: 'Interaktiv portfolio-hemsida med terminal-tema och 2D game mechanics. Byggt med React och kreativa animationer för att visa mitt arbete på ett unikt sätt.',
      platforms: ['Web'],
      techStack: ['React', 'JavaScript', 'CSS3', 'React Router'],
      architecture: {
        nodes: [
          { id: 'browser', label: 'Browser', col: 0, row: 0 },
          { id: 'router', label: 'React Router', col: 1, row: 0 },
          { id: 'pages', label: 'Pages', col: 2, row: 0 },
          { id: 'components', label: 'Components', col: 2, row: 1 },
          { id: 'css', label: 'CSS Modules', col: 3, row: 1 },
          { id: 'state', label: 'useState', col: 1, row: 1 },
        ],
        connections: [
          { from: 'browser', to: 'router', label: 'URL' },
          { from: 'router', to: 'pages', label: 'Route match' },
          { from: 'pages', to: 'components', label: 'Render' },
          { from: 'components', to: 'css', label: 'Styling' },
          { from: 'state', to: 'pages', label: 'State' },
          { from: 'pages', to: 'state', label: 'Updates' },
        ]
      },
      github: 'https://github.com/ellencarlsson/ellenengineer',
      demo: 'https://ellenengineer.se',
      image: null,
      demoVideo: null,
      resultText: 'Hemsidan är live på ellenengineer.se med en interaktiv terminal-landningssida, nätverksbaserad projektnavigering och detaljerade projektsidor med expanderbara sektioner.',
      insights: 'Det här projektet blev mitt labb för att testa idéer. Varje ny teknik jag ville prova byggde jag in i portfolion istället för att göra ett separat testprojekt. Det tvingade mig att förstå saker på riktigt, för allting behövde fungera ihop.\n\nJag lärde mig också hur mycket design spelar roll. Kod som fungerar tekniskt men ser tråkig ut ger inget intryck. Att hitta balansen mellan kreativitet och användbarhet var en av de svåraste delarna.',
      hasWorkflow: true,
      workflow: [
        {
          step: 1,
          icon: '💻',
          title: 'TERMINAL HERO',
          description: 'macOS-terminal med skrivanimation',
          details: 'React + useState + useEffect',
          ledColor: 'green'
        },
        {
          step: 2,
          icon: '🗺️',
          title: 'REACT ROUTER',
          description: 'Klient-navigering mellan sidor',
          details: 'SPA med React Router',
          ledColor: 'green'
        },
        {
          step: 3,
          icon: '🕸️',
          title: 'PROJEKT-NÄTVERK',
          description: 'Interaktiva noder med SVG-linjer',
          details: 'Animerade datapaket',
          ledColor: 'blue'
        },
        {
          step: 4,
          icon: '📄',
          title: 'PROJEKTSIDOR',
          description: 'Expanderbara sektioner med chevrons',
          details: 'Dynamiskt innehåll per projekt',
          ledColor: 'green'
        }
      ]
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
      accentColor: 'sand',
      tagline: 'iOS-app för automatisk schemaläggning av militära arbetspass',
      description: 'PostSchema är en iOS-app som automatiserar schemaläggning av militära arbetspass baserat på kvalifikationer och arbetsregler. Appen löser ett komplext problem där ansvariga måste hålla reda på vilka soldater som har rätt kvalifikationer för varje posttyp, säkerställa att arbetsrättsliga regler följs och fördela belastningen rättvist.\n\nAppen är byggd offline-first med Core Data som lokal databas, eftersom tillgång till nätverk inte alltid kan garanteras i militära miljöer. Hela systemet körs direkt på enheten utan externa beroenden.\n\nSchemaläggaren använder en två-fas-algoritm: först en greedy assignment som filtrerar kandidater baserat på kvalifikationer, tillgänglighet och regelefterlevnad, sedan en local search optimization som förbättrar den globala lösningen genom att testa byten mellan passpar.',
      platforms: ['iOS'],
      techStack: ['Swift', 'SwiftUI', 'Core Data', 'MVVM'],
      architecture: {
        nodes: [
          { id: 'view', label: 'SwiftUI View', col: 0, row: 0 },
          { id: 'vm', label: 'ViewModel', col: 1, row: 0 },
          { id: 'repo', label: 'Repository', col: 2, row: 0 },
          { id: 'core', label: 'Core Data', col: 3, row: 0 },
          { id: 'scheduler', label: 'Scheduler', col: 2, row: 1 },
        ],
        connections: [
          { from: 'view', to: 'vm', label: 'Actions' },
          { from: 'vm', to: 'view', label: 'State' },
          { from: 'vm', to: 'repo', label: 'Fetch / Save' },
          { from: 'repo', to: 'core', label: 'Persist' },
          { from: 'vm', to: 'scheduler', label: 'Generate' },
          { from: 'scheduler', to: 'repo', label: 'Result' },
        ]
      },
      github: 'https://github.com/ellencarlsson/postschema',
      demo: null,
      image: null,
      demoVideo: null,
      resultText: 'En fullt fungerande offline iOS-app som automatiskt skapar optimerade arbetsscheman. Appen respekterar arbetsrättsliga regler (max 4h utan rast, minst 7h vila, max 32h per 48h) och fördelar pass rättvist med ett poängsystem.',
      insights: 'Den största utmaningen var att bygga en schemaläggare som respekterar alla regler samtidigt. Det räcker inte att bara hitta en lösning som fungerar, den måste också vara rättvis. Jag upptäckte att en enkel tilldelning ofta gav ojämn fördelning, så jag la till ett optimeringssteg som testar byten mellan soldater för att jämna ut belastningen.\n\nAtt bygga appen helt offline var ett medvetet val. I militära miljöer kan man inte räkna med internet, så allt måste fungera lokalt. Det begränsade valen av teknik men tvingade fram en robust lösning.',
      hasWorkflow: true,
      workflow: [
        {
          step: 1,
          icon: '🏗️',
          title: 'ORGANISATION',
          description: 'Pluton → Grupp → Soldat',
          details: 'Hierarkisk struktur i Core Data',
          ledColor: 'blue'
        },
        {
          step: 2,
          icon: '📊',
          title: 'GRUPPFÖRDELNING',
          description: 'Tid fördelas proportionellt',
          details: 'Baserat på kvalificerade soldater',
          ledColor: 'blue'
        },
        {
          step: 3,
          icon: '🎯',
          title: 'GREEDY ASSIGNMENT',
          description: 'Tilldelar soldater med scoring',
          details: 'Vila, belastning, kvalifikationer',
          ledColor: 'yellow'
        },
        {
          step: 4,
          icon: '🔄',
          title: 'LOCAL SEARCH',
          description: 'Optimerar genom att byta passpar',
          details: 'Förbättrar global lösning',
          ledColor: 'green'
        },
        {
          step: 5,
          icon: '✅',
          title: 'SCHEMA',
          description: 'Komplett schema med regelefterlevnad',
          details: 'Max 4h arbete, min 7h vila',
          ledColor: 'green'
        }
      ]
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
    <div className={`project-detail-page accent-${project.accentColor}`}>
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
              </div>
            </div>
          </div>

          {/* Right Column - About */}
          <div className="sidebar-column">
            <div className={`about-section led-${project.ledColor}`}>
              <div className="about-header">
                <span className="about-title">PROJEKTDETALJER</span>
              </div>
              <div className="about-content">
                <div className="about-item">
                  <span className="about-label">PLATFORMS:</span>
                </div>
                <div className="about-tech-list">
                  {project.platforms.map((platform, i) => (
                    <div key={i} className="about-tech-badge">
                      {techIcons[platform] || defaultIcon}
                      {platform}
                    </div>
                  ))}
                </div>
                <div className="about-divider"></div>
                <div className="about-item">
                  <span className="about-label">TECH STACK:</span>
                </div>
                <div className="about-tech-list">
                  {project.techStack.map((tech, i) => (
                    <div key={i} className="about-tech-badge">
                      {techIcons[tech] || defaultIcon}
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

        {/* RESULT */}
        <div className="file-section fullwidth-section">
          <div className="file-header clickable section-result" onClick={() => toggleSection('result')}>
            <span className="file-icon result-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg></span>
            <span className="file-name result-name">result.log</span>
            <svg className={`section-chevron ${expandedSections.result ? 'rotated' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={`section-body ${expandedSections.result ? 'expanded' : ''}`}>
            <div className="section-content">
              {project.resultText && (
                <p className="result-description">{project.resultText}</p>
              )}
              {project.demoVideos && (
                <div className="video-grid">
                  {project.demoVideos.map((video, i) => (
                    <div key={i} className="video-item">
                      <span className="video-title">{video.title}</span>
                      <div className="video-container">
                      <div className="video-wrapper">
                        {playingVideos[i] ? (
                          <iframe
                            className="demo-video"
                            src={`${video.url}?autoplay=1`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div className="video-overlay" onClick={() => setPlayingVideos(prev => ({ ...prev, [i]: true }))}>
                            <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          </div>
                        )}
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {project.features && (
                <div className="feature-commits">
                  {project.features.map((feature, i) => (
                    <div key={i} className="feature-commit">
                      <div className="feature-commit-dot"></div>
                      <div className="feature-commit-content">
                        <span className="feature-commit-label">{feature.label}</span>
                        <p className="feature-commit-text">{feature.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {project.techDetails && (
                <div className="feature-commits">
                  {project.techDetails.map((detail, i) => (
                    <div key={i} className="feature-commit">
                      <div className="feature-commit-dot"></div>
                      <div className="feature-commit-content">
                        <span className="feature-commit-label">{detail.label}</span>
                        <p className="feature-commit-text">{detail.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ARCHITECTURE */}
        <div className="file-section fullwidth-section">
          <div className="file-header clickable section-architecture" onClick={() => toggleSection('architecture')}>
            <span className="file-icon arch-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M8 5h8M5 8v6l7 2M19 8v6l-7 2"/></svg></span>
            <span className="file-name arch-name">architecture.sys</span>
            <svg className={`section-chevron ${expandedSections.architecture ? 'rotated' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={`section-body ${expandedSections.architecture ? 'expanded' : ''}`}>
            <div className="section-content">
              {project.architecture ? (
                <>
                  {project.architecture.subtitle && (
                    project.architecture.subtitle.split('\n\n').map((para, i) => (
                      <p key={i} className="result-description">{para}</p>
                    ))
                  )}
                  <ArchitectureDiagram architecture={project.architecture} />
                </>
              ) : (
                <p className="architecture-description" style={{opacity: 0.5, fontStyle: 'italic'}}>Arkitekturbeskrivning kommer snart.</p>
              )}
            </div>
          </div>
        </div>

        {/* COMPONENTS */}
        <div className="file-section fullwidth-section">
          <div className="file-header clickable section-components" onClick={() => toggleSection('components')}>
            <span className="file-icon comp-icon"><svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 38h10v-2c0-2.2 1.8-4 4-4s4 1.8 4 4v2h10V28h-2c-2.2 0-4-1.8-4-4s1.8-4 4-4h2V10H28v2c0 2.2-1.8 4-4 4s-4-1.8-4-4v-2H10v10h2c2.2 0 4 1.8 4 4s-1.8 4-4 4h-2v10z"/></svg></span>
            <span className="file-name comp-name">components.lib</span>
            <svg className={`section-chevron ${expandedSections.components ? 'rotated' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={`section-body ${expandedSections.components ? 'expanded' : ''}`}>
            <div className="section-content">
              {project.components && project.components.length > 0 ? (
                <>
                {project.componentsText && (
                  <p className="result-description">{project.componentsText}</p>
                )}
                <div className="components-list">
                  {project.components.map((group, gi) => (
                    <div key={gi} className="component-group">
                      <h4 className="component-group-title">{group.group}</h4>
                      <div className="component-grid">
                        {group.items.map((comp, i) => (
                          <div key={i} className="component-card">
                            <div className="component-card-header">
                              <span className="component-name">{comp.name}</span>
                              <span className="component-type-badge">{comp.type}</span>
                            </div>
                            <p className="component-responsibility">{comp.responsibility}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                </>
              ) : (
                <div className="pipeline">
                  {project.workflow.map((step, i) => (
                    <div key={step.step} className="pipeline-step">
                      <div className="pipeline-content">
                        <span className="pipeline-icon">{step.icon}</span>
                        <div className="pipeline-text">
                          <span className="pipeline-title">{step.title}</span>
                          <span className="pipeline-desc">{step.description}</span>
                          <span className="pipeline-detail">{step.details}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* INSIGHTS */}
        {project.insights && (
        <div className="file-section fullwidth-section">
          <div className="file-header clickable section-insights" onClick={() => toggleSection('insights')}>
            <span className="file-icon insights-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg></span>
            <span className="file-name insights-name">insights.dev</span>
            <svg className={`section-chevron ${expandedSections.insights ? 'rotated' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={`section-body ${expandedSections.insights ? 'expanded' : ''}`}>
            <div className="section-content">
              {typeof project.insights === 'string' ? (
                <p className="insights-description">{project.insights}</p>
              ) : (
                <div className="components-list">
                  {project.insights.map((section, si) => (
                    <div key={si} className="component-group">
                      <h4 className="component-group-title" style={{color: '#9b8ab8', borderBottomColor: 'rgba(155, 138, 184, 0.2)'}}>{section.title}</h4>
                      <div className="feature-commits">
                        {section.items.map((item, i) => (
                          <div key={i} className="feature-commit">
                            <div className="feature-commit-dot" style={{borderColor: '#9b8ab8'}}></div>
                            <div className="feature-commit-content">
                              <span className="feature-commit-label">{item.label}</span>
                              <p className="feature-commit-text">{item.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        )}

        {/* LINKS */}
        <div className="file-section fullwidth-section">
          <div className="file-header clickable section-links" onClick={() => toggleSection('links')}>
            <span className="file-icon links-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>
            <span className="file-name links-name">links.url</span>
            <svg className={`section-chevron ${expandedSections.links ? 'rotated' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={`section-body ${expandedSections.links ? 'expanded' : ''}`}>
            <div className="section-content">
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
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link github"
                  >
                    <span className="link-icon">→</span>
                    <span className="link-text">GitHub Repository</span>
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
