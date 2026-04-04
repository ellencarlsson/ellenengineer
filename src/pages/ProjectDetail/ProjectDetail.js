/**
 * @file Project detail page with expandable sections and architecture diagrams.
 */
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import { useLanguage } from '../../context/LanguageContext';
import './ProjectDetail.css';

/** SVG icons mapped to each technology in the tech stack. */
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
  'JavaScript': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><text x="12" y="16" textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">JS</text></svg>,
  'CSS3': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z"/><path d="M7 7h10l-.5 5H9.5l.25 3L12 16l2.25-1"/></svg>,
  'React Router': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="12" cy="6" r="3"/><path d="M12 9v3M9 15l-1.5 1.5M15 15l1.5 1.5"/></svg>,
  'Python': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-1.7 0-3 .5-3.5 1.5V6c0 .8.7 1.5 1.5 1.5h4c.8 0 1.5.7 1.5 1.5v1H8.5C6.6 10 5 11.6 5 13.5V16c0 1 .5 1.5 1.5 1.5H9v-2c0-1.1.9-2 2-2h4c1.1 0 2-.9 2-2V6c0-2.2-2.2-4-5-4z"/><path d="M12 22c1.7 0 3-.5 3.5-1.5V18c0-.8-.7-1.5-1.5-1.5h-4c-.8 0-1.5-.7-1.5-1.5v-1h7c1.9 0 3.5-1.6 3.5-3.5V8c0-1-.5-1.5-1.5-1.5H15v2c0 1.1-.9 2-2 2H9c-1.1 0-2 .9-2 2v5.5c0 2.2 2.2 4 5 4z"/><circle cx="9.5" cy="5" r=".7" fill="currentColor"/><circle cx="14.5" cy="19" r=".7" fill="currentColor"/></svg>,
  'SQLite': <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="7" ry="2.5"/><path d="M5 5v4c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5"/><path d="M5 9v4c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V9"/><path d="M5 13v4c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-4"/></svg>,
  'Raspberry Pi': <svg className="tech-icon" viewBox="0 0 128 128"><path d="M42.489 5.002c-.606.018-1.258.239-1.998.814-1.813-.689-3.57-.928-5.142.474-2.427-.31-3.216.33-3.814 1.077-.532-.011-3.986-.54-5.57 1.788-3.98-.464-5.239 2.306-3.814 4.889-.812 1.24-1.655 2.464.246 4.827-.672 1.317-.255 2.744 1.33 4.473-.419 1.85.403 3.155 1.877 4.173-.276 2.531 2.357 4.004 3.143 4.528.302 1.475.932 2.868 3.94 3.637.495 2.2 2.303 2.579 4.053 3.04-5.785 3.313-10.746 7.67-10.712 18.363l-.848 1.49c-6.633 3.973-12.601 16.743-3.269 27.123.61 3.25 1.632 5.583 2.542 8.166 1.362 10.409 10.247 15.282 12.59 15.859 3.435 2.576 7.092 5.02 12.042 6.733 4.665 4.74 9.72 6.546 14.803 6.544h.224c5.083.003 10.138-1.804 14.803-6.544 4.95-1.712 8.607-4.157 12.041-6.733 2.344-.577 11.229-5.45 12.59-15.86.91-2.582 1.933-4.915 2.543-8.165 9.332-10.38 3.364-23.152-3.27-27.126l-.848-1.488c.034-10.692-4.927-15.05-10.712-18.363 1.75-.461 3.558-.841 4.054-3.04 3.007-.77 3.636-2.162 3.938-3.637.787-.525 3.42-1.997 3.144-4.53 1.474-1.016 2.296-2.322 1.878-4.172 1.584-1.728 2-3.156 1.328-4.472 1.902-2.362 1.058-3.587.246-4.827 1.425-2.583.168-5.353-3.814-4.889-1.584-2.327-5.037-1.798-5.57-1.788-.598-.747-1.387-1.387-3.814-1.077-1.571-1.401-3.329-1.162-5.142-.473-2.152-1.673-3.577-.332-5.204.175-2.606-.84-3.202.31-4.482.778-2.842-.592-3.706.696-5.069 2.056l-1.585-.031c-4.286 2.488-6.416 7.555-7.17 10.16-.756-2.606-2.88-7.673-7.166-10.16l-1.585.03c-1.364-1.36-2.228-2.647-5.07-2.055-1.28-.468-1.875-1.617-4.483-.778-1.068-.333-2.05-1.025-3.206-.99l.002.001" fill="currentColor" opacity="0.3"/><path d="M34.04 15.95c11.373 5.774 17.984 10.447 21.606 14.426-1.854 7.323-11.531 7.657-15.07 7.451.725-.332 1.33-.73 1.544-1.34-.888-.622-4.036-.066-6.234-1.283.844-.172 1.239-.34 1.634-.953-2.077-.653-4.313-1.215-5.629-2.296.71.01 1.373.157 2.3-.477-1.86-.987-3.845-1.769-5.386-3.278.96-.023 1.998-.01 2.3-.358-1.703-1.038-3.14-2.194-4.328-3.457 1.346.16 1.914.022 2.24-.21-1.288-1.297-2.916-2.393-3.693-3.993 1 .34 1.914.47 2.573-.03-.438-.972-2.311-1.545-3.39-3.815 1.052.1 2.168.226 2.391 0-.488-1.96-1.326-3.061-2.148-4.202 2.251-.033 5.662.008 5.508-.18l-1.392-1.4c2.199-.583 4.449.094 6.083.596.733-.57-.013-1.29-.908-2.027 1.869.246 3.557.67 5.083 1.252.816-.725-.529-1.45-1.18-2.176 2.888.54 4.111 1.298 5.326 2.057.883-.833.05-1.54-.544-2.265 2.177.794 3.298 1.82 4.479 2.831.4-.532 1.016-.922.272-2.206 1.545.878 2.71 1.912 3.57 3.07.957-.6.57-1.42.576-2.175 1.606 1.287 2.626 2.656 3.874 3.994.25-.18.47-.792.665-1.759 3.832 3.662 9.247 12.886 1.392 16.543-6.685-5.43-14.67-9.378-23.517-12.34h.002m60.239 0c-11.373 5.775-17.984 10.446-21.606 14.426 1.855 7.323 11.532 7.657 15.07 7.451-.725-.332-1.329-.73-1.543-1.34.888-.622 4.036-.066 6.234-1.283-.844-.172-1.24-.34-1.634-.953 2.076-.653 4.313-1.215 5.628-2.296-.71.01-1.373.157-2.3-.477 1.86-.987 3.845-1.769 5.387-3.278-.962-.023-1.998-.01-2.3-.358 1.703-1.038 3.139-2.194 4.328-3.457-1.346.16-1.914.022-2.24-.21 1.287-1.297 2.916-2.393 3.692-3.993-.999.34-1.913.47-2.572-.03.437-.972 2.31-1.545 3.39-3.815-1.053.1-2.168.226-2.392 0 .49-1.96 1.327-3.062 2.149-4.203-2.251-.033-5.662.008-5.508-.179l1.393-1.4c-2.2-.584-4.45.093-6.083.595-.734-.57.013-1.29.907-2.027-1.868.246-3.557.67-5.083 1.252-.816-.725.529-1.45 1.18-2.176-2.887.54-4.11 1.298-5.326 2.057-.882-.833-.05-1.54.544-2.265-2.177.794-3.298 1.82-4.478 2.831-.4-.532-1.017-.922-.273-2.206-1.545.878-2.71 1.912-3.57 3.07-.957-.6-.57-1.42-.576-2.175-1.606 1.287-2.626 2.657-3.873 3.994-.251-.18-.471-.792-.666-1.759-3.832 3.662-9.247 12.886-1.392 16.543 6.682-5.432 14.665-9.379 23.514-12.34h-.001" fill="currentColor" opacity="0.6"/><path d="M77.913 90.52c.04 6.833-6.028 12.402-13.551 12.438-7.524.036-13.655-5.474-13.695-12.308v-.13c-.04-6.834 6.027-12.403 13.551-12.439 7.524-.036 13.655 5.474 13.695 12.308v.13M56.672 55.173c5.645 3.642 6.662 11.9 2.273 18.442-4.39 6.543-12.524 8.894-18.169 5.251-5.644-3.642-6.662-11.9-2.273-18.442 4.39-6.543 12.524-8.894 18.169-5.251m15.236-.66c-5.645 3.643-6.663 11.9-2.273 18.443 4.39 6.542 12.524 8.894 18.168 5.25 5.645-3.642 6.663-11.899 2.273-18.442-4.39-6.542-12.523-8.893-18.168-5.25m-43.099 6.652c6.094-1.609 2.057 24.835-2.901 22.665-5.455-4.321-7.212-16.977 2.9-22.665m70.43-.329c-6.095-1.609-2.058 24.835 2.901 22.666 5.455-4.322 7.211-16.978-2.901-22.666m-20.44-19.73c10.517-1.75 19.268 4.405 18.915 15.639-.346 4.306-22.79-14.998-18.915-15.64m-29.059-.329c-10.519-1.75-19.27 4.407-18.916 15.64.346 4.306 22.79-14.999 18.916-15.64m14.489-2.62c-6.277-.16-12.301 4.59-12.316 7.344-.017 3.348 4.963 6.775 12.36 6.862 7.552.053 12.371-2.743 12.396-6.198.027-3.914-6.87-8.068-12.44-8.008m.485 68.645c5.473-.236 12.817 1.736 12.831 4.351.091 2.54-6.66 8.278-13.194 8.168-6.767.287-13.402-5.46-13.315-7.452-.101-2.921 8.24-5.201 13.678-5.067M44.459 91.3c3.896 4.625 5.672 12.748 2.421 15.142-3.076 1.829-10.547 1.076-15.858-6.438-3.58-6.304-3.119-12.72-.604-14.605 3.76-2.256 9.57.791 14.04 5.901m39.232-1.465c-4.217 4.864-6.565 13.735-3.489 16.592 2.94 2.22 10.834 1.91 16.666-6.06 4.234-5.352 2.815-14.29.397-16.664-3.593-2.738-8.75.765-13.575 6.13v.002" fill="currentColor"/></svg>,
};

/** Fallback icon displayed when a technology has no dedicated icon. */
const defaultIcon = <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>;

/** SVG text element that supports multiline labels in the architecture diagram. */
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

/** Renders an SVG architecture diagram with nodes, connections, and groups. */
function ArchitectureDiagram({ architecture }) {
  const { language } = useLanguage();
  const { nodes, connections, groups } = architecture;

  /** Gets localized text from an object with sv/en keys. */
  const loc = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object' && (value.sv || value.en)) {
      return value[language] || value.sv || value.en || '';
    }
    return value;
  };
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

  /**
   * Calculates the position of a node in the diagram.
   * @param {string} id - The node ID.
   * @returns {{x: number, y: number, cx: number, cy: number, w: number}} Position and dimensions.
   */
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
                  anchor={anchor1} fill="rgba(255,255,255,0.7)" fontSize={28}
                >{loc(conn.label)}</SvgLabel>
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
                      anchor={anchor2} fill="rgba(255,255,255,0.7)" fontSize={28}
                    >{loc(reverse.label)}</SvgLabel>
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
                  fill="rgba(255,255,255,0.7)" fontSize={28}
                >{loc(conn.label)}</SvgLabel>
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

/** Detail page displaying all information about a specific project. */
function ProjectDetail() {
  const { t, language } = useLanguage();
  const { projectId } = useParams();
  const [playingVideos, setPlayingVideos] = useState({});
  const [archModalOpen, setArchModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    result: false,
    architecture: false,
    components: false,
    insights: false,
    links: false
  });

  /** Gets the localized text from an object with sv/en keys, or returns the value if it's a plain string. */
  const loc = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object' && (value.sv || value.en)) {
      return value[language] || value.sv || value.en || '';
    }
    return value;
  };

  /** Expands or collapses a section. */
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
      name: 'SignTalker',
      year: '2024 – 2025',
      capacity: '847 MB',
      interface: 'SCSI',
      status: 'VERIFIED',
      ledColor: 'brown',
      accentColor: 'terracotta',
      tagline: {
        sv: 'AI-driven teckenspråksigenkänning med Apple Watch rörelsesensorer',
        en: 'AI-powered sign language recognition using Apple Watch motion sensors'
      },
      description: {
        sv: 'Personer som talar teckenspråk har ofta svårt att kommunicera med människor som inte förstår teckenspråk, vilket skapar en barriär i vardagen, på jobbet, i affären, hos läkaren. SignTalker är en app där man har en vanlig Apple Watch på handleden och gör teckenspråkstecken. Klockan känner av handrörelserna och skickar dem till en AI som har lärt sig vad varje rörelse betyder. Resultatet skickas till en iPhone som säger ordet högt. Man kan göra flera tecken i rad och bygga hela meningar. Klockan tolkar, telefonen pratar.\n\nDet enda man behöver är en Apple Watch och en iPhone. Ingen kamera, ingen dator, ingen internetuppkoppling. Allt fungerar i realtid, direkt på enheten. Projektet började som mitt examensarbete. Efter examen byggde jag om det från grunden för att göra det ännu bättre.',
        en: 'People who use sign language often struggle to communicate with those who don\'t understand it, creating barriers in everyday life—at work, in stores, at the doctor\'s office. SignTalker is an app where you wear a regular Apple Watch on your wrist and make sign language gestures. The watch detects the hand movements and sends them to an AI that has learned what each movement means. The result is sent to an iPhone that speaks the word out loud. You can make multiple signs in a row and build complete sentences. The watch interprets, the phone speaks.\n\nAll you need is an Apple Watch and an iPhone. No camera, no computer, no internet connection. Everything works in real-time, directly on the device. The project started as my thesis. After graduating, I rebuilt it from the ground up to make it even better.'
      },
      platforms: ['Apple Watch', 'iPhone'],
      techStack: ['Swift', 'Core ML'],
      architecture: {
        nodes: [
          { id: 'iphone-view', label: 'iPhone View', col: 0, row: 0 },
          { id: 'iphone-vm', label: 'ViewModel', col: 0, row: 1 },
          { id: 'tts', label: 'AVSpeech', col: 0, row: 2 },
          { id: 'wc', label: 'WatchConnectivity', col: 1, row: 1 },
          { id: 'watch-view', label: 'Watch View', col: 2, row: 0 },
          { id: 'watch-vm', label: 'ViewModel', col: 2, row: 1 },
          { id: 'motion', label: 'CMMotionManager', col: 2, row: 2 },
          { id: 'datahelper', label: 'DataHelper', col: 3, row: 2 },
          { id: 'mlmodel', label: 'Core ML', col: 3, row: 1 },
        ],
        connections: [
          { from: 'watch-vm', to: 'watch-view', label: 'Detecting or not' },
          { from: 'watch-vm', to: 'motion', label: 'Start/Stop\ndetecting' },
          { from: 'motion', to: 'datahelper', label: 'Raw data' },
          { from: 'datahelper', to: 'mlmodel', label: '60 samples' },
          { from: 'mlmodel', to: 'watch-vm', label: 'Prediction' },
          { from: 'iphone-vm', to: 'wc', label: 'Send detect\nsignal' },
          { from: 'wc', to: 'iphone-vm', label: 'Detected word' },
          { from: 'wc', to: 'watch-vm', label: 'Send detect\nsignal' },
          { from: 'watch-vm', to: 'wc', label: 'Detected word' },
          { from: 'iphone-view', to: 'iphone-vm', label: 'Tap to\ndetect' },
          { from: 'iphone-vm', to: 'iphone-view', label: 'Display\nwords' },
          { from: 'iphone-vm', to: 'tts', label: 'Speak\nwords' },
        ],
        groups: [
          { label: 'APPLE WATCH', nodeIds: ['watch-view', 'watch-vm', 'motion', 'datahelper', 'mlmodel'] },
          { label: 'IPHONE', nodeIds: ['iphone-view', 'iphone-vm', 'tts'] },
        ],
        subtitle: {
          sv: 'Appen är uppbyggd enligt MVVM, där vyer och logik hålls separata. Både klockan och telefonen följer samma struktur med egna vyer och ViewModels. Att de delar samma arkitektur gör det enklare för dem att kommunicera med varandra, och gör det möjligt att testa och bygga vidare på varje del för sig.\n\nHela AI-modellen körs lokalt på klockan. Det är klockan som samlar in sensordata och tolkar tecknen, telefonen fungerar bara som en skärm för att visa resultatet och en fjärrkontroll för att starta detektionen. Eftersom all logik redan ligger på klockan innebär det att den i framtiden skulle kunna fungera helt självständigt.',
          en: 'The app is built using MVVM, where views and logic are kept separate. Both the watch and the phone follow the same structure with their own views and ViewModels. Sharing the same architecture makes it easier for them to communicate with each other and allows testing and development of each part independently.\n\nThe entire AI model runs locally on the watch. The watch collects sensor data and interprets the signs, while the phone serves only as a screen to display results and a remote to start detection. Since all logic already resides on the watch, it could potentially function completely independently in the future.'
        }
      },
      github: null,
      demo: null,
      thesis: 'https://www.diva-portal.org/smash/get/diva2:1880636/FULLTEXT01.pdf',
      image: null,
      demoVideos: [
        { title: 'Presentation', description: { sv: 'Introduktion till projektet och hur appen fungerar', en: 'Introduction to the project and how the app works' }, url: 'https://www.youtube.com/embed/qRDOVvyBVKQ' },
        { title: 'Drive in', description: { sv: 'Beställer mat på McDonald\'s med hjälp av klockan', en: 'Ordering food at McDonald\'s using the watch' }, url: 'https://www.youtube.com/embed/UfcuVqfH8x8' },
        { title: 'Dog mode', description: { sv: 'Ropar på sin hund med ett egentränat tecken kopplat till en inspelning av ägarens röst', en: 'Calling the dog using a custom-trained sign linked to a recording of the owner\'s voice' }, url: 'https://www.youtube.com/embed/-NRR78CkO18' },
      ],
      resultText: {
        sv: 'Användaren startar inspelningen från telefonen, som skickar en signal till klockan att börja läsa av rörelsesensorerna. Utöver vanliga tecken kan man även koppla egna handtecken till inspelningar av sin egen röst.',
        en: 'The user starts recording from the phone, which sends a signal to the watch to begin reading the motion sensors. In addition to regular signs, you can also link custom hand gestures to recordings of your own voice.'
      },
      techDetails: [
        {
          label: { sv: 'Träningsfas', en: 'Training phase' },
          text: { sv: 'Man spelar in samma tecken upprepade gånger med klockan. Sensordata sparas som CSV-filer som sedan manuellt läggs in i Create ML, Apples verktyg för att skapa AI-modeller. Create ML konverterar datan till en färdig Core ML-fil, som är själva AI-modellen som sedan manuellt exporteras till appen. Ju fler inspelningar med olika vinklar och hastigheter, desto bättre blir modellen.', en: 'You record the same sign repeatedly with the watch. Sensor data is saved as CSV files that are then manually imported into Create ML, Apple\'s tool for creating AI models. Create ML converts the data into a finished Core ML file, which is the actual AI model that is then manually exported to the app. The more recordings with different angles and speeds, the better the model becomes.' }
        },
        {
          label: { sv: '50 Hz motion sampling', en: '50 Hz motion sampling' },
          text: { sv: 'Klockan har inbyggda sensorer, en accelerometer som mäter hur handen förflyttas och ett gyroskop som mäter hur den vrids. Dessa sensorer fångar de aktuella värdena var 0.02:e sekund, vilket ger en väldigt detaljerad bild av hela rörelsen.', en: 'The watch has built-in sensors—an accelerometer that measures how the hand moves and a gyroscope that measures how it rotates. These sensors capture current values every 0.02 seconds, providing a very detailed picture of the entire movement.' }
        },
        {
          label: { sv: 'Fixed-window segmentering (60 samples)', en: 'Fixed-window segmentation (60 samples)' },
          text: { sv: 'Varje inspelning samlar in exakt 60 data samples och motsvarar ett ord. Den fasta storleken gör att modellen alltid får samma mängd data att jobba med, oavsett vilket tecken som görs.', en: 'Each recording collects exactly 60 data samples and corresponds to one word. The fixed size ensures the model always receives the same amount of data to work with, regardless of which sign is made.' }
        },
        {
          label: { sv: 'Haptisk feedback', en: 'Haptic feedback' },
          text: { sv: 'När klockan har samlat in 60 data samples efter ca 1.2 sekunder är ett tecken färdigtolkat och klockan vibrerar. Man har sedan 1 sekund på sig att förbereda nästa tecken, och då vibrerar klockan igen som signal att den börjat lyssna på en ny rörelse.', en: 'When the watch has collected 60 data samples after about 1.2 seconds, a sign has been interpreted and the watch vibrates. You then have 1 second to prepare the next sign, and the watch vibrates again to signal that it has started listening for a new movement.' }
        },
        {
          label: { sv: 'Avsluta en mening', en: 'Ending a sentence' },
          text: { sv: 'För att markera att en mening är klar gör man ett speciellt stopptecken, man håller handen upp och ned. Klockan känner igen det som en avslutningssignal, slutar lyssna efter fler tecken och den färdiga meningen hörs och syns från telefonen.', en: 'To mark that a sentence is complete, you make a special stop sign by holding your hand upside down. The watch recognizes this as an ending signal, stops listening for more signs, and the finished sentence is heard and displayed on the phone.' }
        }
      ],
      insights: [
        {
          title: { sv: 'Begränsningar', en: 'Limitations' },
          items: [
            {
              label: { sv: 'Manuell träning', en: 'Manual training' },
              text: { sv: 'Modellen kan inte lära sig nya tecken på egen hand. Varje nytt ord kräver att man samlar in data, tränar om modellen och exporterar en ny version till appen. Det gör att det skalar dåligt och begränsar hur snabbt ordförrådet kan växa.', en: 'The model cannot learn new signs on its own. Each new word requires collecting data, retraining the model, and exporting a new version to the app. This means it scales poorly and limits how quickly the vocabulary can grow.' }
            },
            {
              label: { sv: 'Fast fönsterstorlek', en: 'Fixed window size' },
              text: { sv: 'Alla inputs till modellen måste ha samma storlek, 60 samples. Det innebär att snabba tecken måste göras långsammare och långsamma tecken snabbare för att passa fönstret. Problemet är att modellen inte kan veta vilket tecken som kommer, och därför inte kan anpassa hur länge den lyssnar. Fler samples ger mer precis data men gör appen långsammare, och färre samples gör appen snabbare men tappar detaljer.', en: 'All inputs to the model must be the same size—60 samples. This means fast signs must be slowed down and slow signs sped up to fit the window. The problem is that the model cannot know which sign is coming and therefore cannot adjust how long it listens. More samples provide more precise data but make the app slower, while fewer samples make the app faster but lose details.' }
            }
          ]
        },
        {
          title: { sv: 'Fortsatt utveckling', en: 'Future development' },
          items: [
            {
              label: { sv: 'Fler sensorer', en: 'More sensors' },
              text: { sv: 'Apple Watch har just nu gyroskop och accelerometer. Fler sensortyper hade gett rikare data per rörelse. Dessutom hade en klocka på varje hand gjort att modellen fångar båda händernas rörelser, vilket ger mycket mer specifika mönster och hade förbättrat träffsäkerheten avsevärt.', en: 'Apple Watch currently has a gyroscope and accelerometer. More sensor types would provide richer data per movement. Additionally, a watch on each hand would allow the model to capture both hands\' movements, providing much more specific patterns and significantly improving accuracy.' }
            },
            {
              label: { sv: 'Automatisk träningspipeline', en: 'Automatic training pipeline' },
              text: { sv: 'Att träna modellen direkt på enheten skulle ta bort det manuella arbetet och göra det möjligt att lägga till nya tecken utan att bygga om appen. Jag försökte implementera detta men det visade sig inte vara möjligt med Create ML. Med ett annat AI-ramverk hade det kanske gått.', en: 'Training the model directly on the device would eliminate the manual work and make it possible to add new signs without rebuilding the app. I tried to implement this but it turned out not to be possible with Create ML. With a different AI framework, it might have worked.' }
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
          description: { sv: 'Apple Watch känner av handrörelser', en: 'Apple Watch detects hand movements' },
          details: { sv: 'Gyroskop + Accelerometer', en: 'Gyroscope + Accelerometer' },
          ledColor: 'blue'
        },
        {
          step: 2,
          icon: '📊',
          title: 'DATA COLLECTION',
          description: { sv: 'Spelar in samma tecken många gånger', en: 'Recording the same sign many times' },
          details: { sv: 'Träningsdata samlas in', en: 'Training data is collected' },
          ledColor: 'blue'
        },
        {
          step: 3,
          icon: '🤖',
          title: 'AI TRAINING',
          description: { sv: 'AI lär sig känna igen varje tecken', en: 'AI learns to recognize each sign' },
          details: { sv: 'Modellen justeras och optimeras', en: 'The model is adjusted and optimized' },
          ledColor: 'yellow'
        },
        {
          step: 4,
          icon: '⌚',
          title: 'LIVE CAPTURE',
          description: { sv: 'Gör ett tecken med klockan', en: 'Make a sign with the watch' },
          details: { sv: 'Real-time rörelseinspelning', en: 'Real-time motion recording' },
          ledColor: 'green'
        },
        {
          step: 5,
          icon: '🤖',
          title: 'AI PREDICTION',
          description: { sv: 'AI identifierar vilket tecken det är', en: 'AI identifies which sign it is' },
          details: { sv: 'Returnerar predicted output', en: 'Returns predicted output' },
          ledColor: 'green'
        },
        {
          step: 6,
          icon: '📱',
          title: 'OUTPUT',
          description: { sv: 'Telefonen säger ordet högt', en: 'The phone speaks the word aloud' },
          details: 'Text-to-Speech',
          ledColor: 'green'
        }
      ],
      componentsText: {
        sv: 'Varje komponent i appen har en specifik uppgift och tillhör antingen iPhone- eller Apple Watch-sidan. Här är en översikt av de viktigaste delarna och vad de ansvarar för.',
        en: 'Each component in the app has a specific task and belongs to either the iPhone or Apple Watch side. Here is an overview of the most important parts and what they are responsible for.'
      },
      components: [
        {
          group: 'iPhone',
          items: [
            {
              name: 'IPhoneViewModel',
              type: 'ViewModel',
              responsibility: { sv: 'Skickar kommandon till klockan och tar emot detekterade ord. Bygger upp en ordlista som sedan kan omvandlas till en mening.', en: 'Sends commands to the watch and receives detected words. Builds up a word list that can then be converted into a sentence.' }
            },
            {
              name: 'SentenceConverter',
              type: 'Model',
              responsibility: { sv: 'Tar en lista av detekterade ord och sätter ihop dem till en grammatiskt korrekt svensk mening.', en: 'Takes a list of detected words and assembles them into a grammatically correct Swedish sentence.' }
            }
          ]
        },
        {
          group: 'Apple Watch',
          items: [
            {
              name: 'WatchViewModel',
              type: 'ViewModel',
              responsibility: { sv: 'Tar emot kommandon från telefonen och bestämmer vad klockan ska göra. Skickar tillbaka detekterade ord.', en: 'Receives commands from the phone and decides what the watch should do. Sends back detected words.' }
            },
            {
              name: 'PredictionViewModel',
              type: 'ViewModel',
              responsibility: { sv: 'Startar sensorerna, samlar in rörelsedata och skickar den vidare till AI-modellen.', en: 'Starts the sensors, collects motion data, and forwards it to the AI model.' }
            },
            {
              name: 'TrainingViewModel',
              type: 'ViewModel',
              responsibility: { sv: 'Samlar in träningsdata för nya tecken och exporterar den som CSV-filer till en träningsserver.', en: 'Collects training data for new signs and exports it as CSV files to a training server.' }
            },
            {
              name: 'PredictionModel',
              type: 'Model',
              responsibility: { sv: 'Kör Core ML-modellen som tolkar rörelsedata till ord.', en: 'Runs the Core ML model that interprets motion data into words.' }
            },
            {
              name: 'DataHelper',
              type: 'Helper',
              responsibility: { sv: 'Definierar samplingsfrekvens (50 Hz) och fönsterstorlek (60 samples). Strukturerar rå sensorvärden.', en: 'Defines sampling frequency (50 Hz) and window size (60 samples). Structures raw sensor values.' }
            }
          ]
        }
      ]
    },
    'ellenengineer': {
      id: 'ellenengineer',
      model: 'MAXTOR MX2026',
      label: 'ELLENENGINEER-2026',
      name: 'EllenEngineer',
      year: '2026',
      capacity: '2.6 GB',
      interface: 'IDE',
      status: 'OPERATIONAL',
      ledColor: 'medium',
      accentColor: 'rose',
      tagline: {
        sv: 'Portfolio-hemsida med teknisk design',
        en: 'Portfolio website with technical design'
      },
      description: {
        sv: 'Jag ville ha någonstans att samla mina projekt och tyckte det var kul att bygga en egen hemsida. Temat är inspirerat av teknik och data, med en terminal som startsida och interaktiva element genom hela sidan.\n\nVarje sida är byggd kring ett eget koncept. Startsidan är en terminal, projektsidan visar alla projekt som noder, Om mig är en tidslinje med elektrisk inspiration, CV-sidan använder SQL-queries, och Kontakta mig är upplagd som API-anrop.\n\nSidan har integrationer med Telegram-botar som skickar notiser vid besök och buggrapporter.',
        en: 'I wanted a place to showcase my projects and thought it would be fun to build my own website. The theme is inspired by technology and data, with a terminal as the landing page and interactive elements throughout the site.\n\nEach page is built around its own concept. The landing page is a terminal, the projects page displays all projects as nodes, About me is a timeline with electric inspiration, the CV page uses SQL queries, and Contact me is laid out as API calls.\n\nThe site has integrations with Telegram bots that send notifications on visits and bug reports.'
      },
      platforms: ['Web'],
      techStack: ['React', 'JavaScript'],
      architecture: {
        nodes: [
          { id: 'browser', label: 'Client', col: 0, row: 0 },
          { id: 'router', label: 'React Router', col: 1, row: 0 },
          { id: 'view', label: 'View', col: 2, row: 0 },
          { id: 'php', label: 'PHP', col: 2, row: 1 },
          { id: 'telegram', label: 'Telegram Bot', col: 1, row: 1 },
        ],
        connections: [
          { from: 'browser', to: 'router', label: { sv: 'Användaren\nnavigerar', en: 'User\nnavigates' } },
          { from: 'router', to: 'view', label: { sv: 'Väljer rätt\nsida', en: 'Selects correct\npage' } },
          { from: 'view', to: 'php', label: { sv: 'Besök/\nBuggrapport', en: 'Visit/\nBug report' } },
          { from: 'php', to: 'telegram', label: { sv: 'Notis', en: 'Notify' } },
        ],
        subtitle: {
          sv: 'Sidan är en React-frontend med PHP-scripts för notifieringar. Navigeringen sköts av React Router som en SPA, vilket betyder att sidan aldrig laddas om. Vid besök och buggrapporter skickas ett anrop till PHP som vidarebefordrar det till en Telegram-bot.',
          en: 'The site is a React frontend with PHP scripts for notifications. Navigation is handled by React Router as a SPA, meaning the page never reloads. On visits and bug reports, a call is sent to PHP which forwards it to a Telegram bot.'
        }
      },
      github: null,
      demo: null,
      image: null,
      demoVideo: null,
      resultText: {
        sv: 'Sidan är live och fungerar bra på både desktop och mobil. Den har en startsida med en animerad terminal, en Om mig-sektion med en interaktiv tidslinje, en projektsida och en CV-sida med nedladdningsbar PDF. Hela sidan är fortfarande under utveckling och jag lägger till nya saker löpande.',
        en: 'The site is live and works well on both desktop and mobile. It has a landing page with an animated terminal, an About me section with an interactive timeline, a projects page, and a CV page with a downloadable PDF. The entire site is still under development and I add new things continuously.'
      },
      insights: [
        {
          title: { sv: 'Kreativitet', en: 'Creativity' },
          items: [
            {
              label: { sv: 'Interaktiva teman', en: 'Interactive themes' },
              text: { sv: 'Det roligaste har varit att göra varje sida interaktiv och kreativ på sitt eget sätt. Varje flik har ett eget tema, en sida kan se ut som en SQL-query medan en annan liknar API-anrop. Jag ville att det skulle kännas som att man upptäcker något nytt varje gång man klickar sig vidare, och jag tycker att det blev bra.', en: 'The most fun part has been making each page interactive and creative in its own way. Each tab has its own theme—one page can look like a SQL query while another resembles API calls. I wanted it to feel like you discover something new every time you click through, and I think it turned out well.' }
            },
            {
              label: { sv: 'Balans mellan kreativitet och tydlighet', en: 'Balance between creativity and clarity' },
              text: { sv: 'Det kluriga var att hitta balansen mellan kreativitet och tydlighet. Informationen ska vara lätt att förstå samtidigt som det ska vara snyggt och lite interaktivt. Det är lätt att det blir för mycket av det ena eller det andra.', en: 'The tricky part was finding the balance between creativity and clarity. The information should be easy to understand while also being visually appealing and somewhat interactive. It\'s easy to end up with too much of one or the other.' }
            }
          ]
        }
      ],
      componentsText: {
        sv: 'Eftersom sidan är en ren frontend utan backend finns det inte så många tekniska delar att bryta ner. Här är de viktigaste.',
        en: 'Since the site is a pure frontend without a backend, there aren\'t many technical parts to break down. Here are the most important ones.'
      },
      components: [
        {
          group: '',
          items: [
            {
              name: 'App',
              type: 'Entry Point',
              responsibility: { sv: 'Applikationens startpunkt som renderar hela sidan och kopplar ihop alla delar.', en: 'The application\'s entry point that renders the entire site and connects all parts.' }
            },
            {
              name: 'React Router',
              type: 'Router',
              responsibility: { sv: 'Konfigurerar alla routes och kopplar varje URL till rätt sidkomponent. Hanterar navigering utan att sidan laddas om.', en: 'Configures all routes and maps each URL to the correct page component. Handles navigation without reloading the page.' }
            },
            {
              name: { sv: 'Komponentstruktur', en: 'Component structure' },
              type: { sv: 'Mönster', en: 'Pattern' },
              responsibility: { sv: 'Varje del av sidan är organiserad i en egen mapp där både logik (.js) och styling (.css) bor tillsammans. All projektdata ligger hårdkodad direkt i komponenterna.', en: 'Each part of the site is organized in its own folder where both logic (.js) and styling (.css) live together. All project data is hardcoded directly in the components.' }
            }
          ]
        }
      ],
      hasWorkflow: true,
      workflow: [
        {
          step: 1,
          icon: '💻',
          title: 'TERMINAL HERO',
          description: { sv: 'macOS-terminal med skrivanimation', en: 'macOS terminal with typing animation' },
          details: 'React + useState + useEffect',
          ledColor: 'green'
        },
        {
          step: 2,
          icon: '🗺️',
          title: 'REACT ROUTER',
          description: { sv: 'Klient-navigering mellan sidor', en: 'Client-side navigation between pages' },
          details: { sv: 'SPA med React Router', en: 'SPA with React Router' },
          ledColor: 'green'
        },
        {
          step: 3,
          icon: '🕸️',
          title: { sv: 'PROJEKT-NÄTVERK', en: 'PROJECT NETWORK' },
          description: { sv: 'Interaktiva noder med SVG-linjer', en: 'Interactive nodes with SVG lines' },
          details: { sv: 'Animerade datapaket', en: 'Animated data packets' },
          ledColor: 'blue'
        },
        {
          step: 4,
          icon: '📄',
          title: { sv: 'PROJEKTSIDOR', en: 'PROJECT PAGES' },
          description: { sv: 'Expanderbara sektioner med chevrons', en: 'Expandable sections with chevrons' },
          details: { sv: 'Dynamiskt innehåll per projekt', en: 'Dynamic content per project' },
          ledColor: 'green'
        }
      ]
    },
    'fieldcompanion': {
      id: 'fieldcompanion',
      model: 'IBM DESKSTAR NP1',
      label: 'FIELDCOMPANION-2026',
      name: 'Field Companion',
      year: '2025–2026',
      capacity: '512 MB',
      interface: 'GPIO',
      status: 'DISCONTINUED',
      ledColor: 'brown',
      accentColor: 'sand',
      tagline: {
        sv: 'Raspberry Pi-enhet för MGRS-koordinater och schemaläggning inom militären',
        en: 'Raspberry Pi device for MGRS coordinates and scheduling in the military'
      },
      description: {
        sv: 'Ett postschema är ett schema inom militären som styr vem som ska posta och när ute i fält. Det stora problemet med att göra detta för hand är att få kalkylen att gå ihop, uppgiften måste lösas dygnet runt, samtidigt som varje person måste få sömn och vila. Eftersom flera personer ständigt måste vara i tjänst blir det snabbt ett svårt pussel att fördela passen rättvist så att ingen blir överbelastad.\n\nFör att underlätta detta försökte jag bygga ett system som räknar ut det bästa schemat automatiskt. Systemet kan alla regler för vilotider, körtider och bemanning, och fördelar passen så rättvist som möjligt.\n\nMGRS är det koordinatsystem som används i militären för att ange exakta positioner på kartan. Att räkna ut dessa manuellt är tidskrävande och svårt att få rätt när man är trött eller stressad. Därför implementerade jag en lösning som tar fram MGRS-koordinaten automatiskt med hjälp av GPS.',
        en: 'A post schedule is a military schedule that controls who is on post and when in the field. The main problem with doing this manually is making the calculations work out—the task must be covered around the clock while each person needs sleep and rest. Since multiple people must constantly be on duty, it quickly becomes a difficult puzzle to distribute shifts fairly so no one gets overloaded.\n\nTo make this easier, I tried to build a system that calculates the optimal schedule automatically. The system knows all the rules for rest periods, driving times, and staffing, and distributes shifts as fairly as possible.\n\nMGRS is the coordinate system used in the military to specify exact positions on the map. Calculating these manually is time-consuming and difficult to get right when tired or stressed. Therefore I implemented a solution that retrieves the MGRS coordinate automatically using GPS.'
      },
      platforms: ['Raspberry Pi'],
      techStack: ['Python', 'SQLite'],
      architecture: {
        nodes: [
          { id: 'gps', label: 'GPS', col: 0, row: 0 },
          { id: 'rpi', label: 'Raspberry Pi', col: 1, row: 0 },
          { id: 'view', label: 'View', col: 2, row: 0 },
          { id: 'schedule', label: 'Schedule', col: 1, row: 1 },
          { id: 'webadmin', label: 'Web Admin', col: 0, row: 2 },
          { id: 'sqlite', label: 'SQLite', col: 1, row: 2 },
        ],
        connections: [
          { from: 'gps', to: 'rpi', label: 'MGRS' },
          { from: 'view', to: 'rpi', label: { sv: 'Skickar\nkommandon', en: 'Sends\ncommands' } },
          { from: 'rpi', to: 'view', label: { sv: 'Visar MGRS\n/ Schema', en: 'Shows MGRS\n/ Schedule' } },
          { from: 'rpi', to: 'schedule', label: { sv: 'Generera\nschema', en: 'Generate\nschedule' } },
          { from: 'schedule', to: 'rpi', label: { sv: 'Returnerar\nschema', en: 'Returns\nschedule' } },
          { from: 'schedule', to: 'sqlite', label: { sv: 'Läs/Skriv', en: 'Read/Write' } },
          { from: 'webadmin', to: 'sqlite', label: { sv: 'Läs/Skriv', en: 'Read/Write' } },
        ],
        subtitle: {
          sv: 'Allt körs på en Raspberry Pi med pekskärm. Web Admin används från en dator för att hantera data.',
          en: 'Everything runs on a Raspberry Pi with a touchscreen. Web Admin is used from a computer to manage data.'
        }
      },
      github: null,
      demo: null,
      image: null,
      demoVideos: null,
      resultImages: [
        { title: 'Postschema', src: '/images/postschema.png', subtitle: { sv: 'Schemat visar vem som postar när, fördelat per timme och posttyp. Man kan se att jag ska ha eldpost mellan 18 till 19, och efter det ska jag sitta StriE från kl 22.', en: 'The schedule shows who is on post and when, distributed by hour and post type. You can see that I have fire post between 18 and 19, and after that I am on StriE from 22.' } },
        { title: 'MGRS', src: '/images/mgrs.png', subtitle: { sv: 'GPS-modulen läser latitud och longitud och konverterar koordinaterna till MGRS-format.', en: 'The GPS module reads latitude and longitude and converts the coordinates to MGRS format.' } },
        { title: 'Web Admin', src: '/images/webadmin.png', subtitle: { sv: 'Webbgränssnittet för att hantera posttyper, enheter och befattningar.', en: 'The web interface for managing post types, units and roles.' } }
      ],
      resultText: {
        sv: 'Schemaläggningssystemet visade sig vara extremt svårt att implementera. Det finns för många yttre faktorer som påverkar hur ett rättvist schema ska skapas, t.ex. vädret (en patrull är jobbigare att genomföra i spöregn än i 10 grader och sol), om gruppen precis genomfört en omgruppering och inte sovit på länge, om någon är sjuk eller om någon sovit väldigt dåligt. Ingen algoritm kan väga ihop alla dessa parametrar bättre än en erfaren gruppchef med penna och papper. Lösningen blev därmed inte bättre än det manuella alternativet.\n\nMGRS-funktionen däremot fungerar riktigt bra. GPS-modulen läser satellitsignaler och visar positionen som MGRS-koordinater direkt på skärmen, vilket underlättar betydligt när man ska genomföra rekognosering av en ny grupperingsplats.',
        en: 'The scheduling system proved extremely difficult to implement. There are too many external factors that affect how a fair schedule should be created — the weather, whether the group has just completed a regrouping and hasn\'t slept in hours, whether someone is sick and can\'t cover all posts. No algorithm can weigh all these parameters better than an experienced squad leader with a pen and paper. The solution therefore proved no better than the manual alternative, and that part of the project was abandoned.\n\nThe MGRS function, however, works really well. The GPS module reads satellite signals and displays the position as MGRS coordinates directly on the screen, which makes it significantly easier when conducting reconnaissance of a new assembly point.'
      },
      resultDetails: [
        {
          label: { sv: 'Användarens input', en: 'User input' },
          text: { sv: 'Användaren anger vilka posttyper som ska bemannas och under vilka timmar, exempelvis: Eldpost 00–10, Patrull 00–02 och 06–08. Resultatet blir en lista block som generatorn sedan arbetar med.', en: 'The user specifies which post types need to be staffed and during which hours, for example: Fire post 00–10, Patrol 00–02 and 06–08. The result is a list of blocks that the generator then works with.' }
        },
        {
          label: { sv: 'Hämta historik', en: 'Fetch history' },
          text: { sv: 'Varje soldats tidigare pass läses in och räknas om till belastningspoäng. Poängen viktas efter tid på dygnet, nattpass (00–06) räknas tyngre än dagpass. Historiken används sedan i rangordningen.', en: 'Each soldier\'s previous shifts are read and converted into load points. The points are weighted by time of day — night shifts (00–06) count heavier than day shifts. The history is then used in the ranking.' }
        },
        {
          label: { sv: 'Dela upp block i pass', en: 'Split blocks into shifts' },
          text: { sv: 'Varje block delas upp så att varje pass respekterar min/max-reglerna för hur länge en soldat får sitta på samma post i sträck.', en: 'Each block is split so that every shift respects the min/max rules for how long a soldier can man the same post in a row.' }
        },
        {
          label: { sv: 'Ta fram godkända kandidater', en: 'Find approved candidates' },
          text: { sv: '- Rätt befattning för posttypen\n- Kan inte ha två poster samtidigt\n- Får inte överskrida max antal tillåtna timmar i sträck\n- Förare ska ha 6h sammanhängande vila', en: '- Correct role for the post type\n- Cannot have two posts at the same time\n- Cannot exceed max allowed hours in a row\n- Drivers must have 6h consecutive rest' }
        },
        {
          label: { sv: 'Rangordna kandidater', en: 'Rank candidates' },
          text: { sv: 'Bland godkända kandidater väljs den med lägst belastningspoäng först. Vid lika poäng avgör befattningsprioritet, vissa poster riktar sig i första hand till specifika befattningar. Vid fortsatt lika avgör slumpen.', en: 'Among approved candidates the one with the lowest load score is chosen first. If tied, position priority decides — some posts are directed primarily to specific roles. If still tied, chance decides.' }
        },
        {
          label: { sv: 'Optimering', en: 'Optimisation' },
          text: { sv: 'Systemet granskar det genererade schemat och försöker förbättra fördelningen av förarvila. Upprepas tills ingen förbättring hittas, max 10 iterationer.', en: 'The system reviews the generated schedule and tries to improve the distribution of driver rest. Repeats until no improvement is found, max 10 iterations.' }
        },
        {
          label: { sv: 'Validera', en: 'Validate' },
          text: { sv: 'Schemat kontrolleras mot alla hårda krav, ingen dubbelbokning, förarvila uppnådd, bemanning uppfylld. Pass som inte kan bemannas markeras som obemannade, användaren får själv tilldela en soldat till dessa manuellt efteråt.', en: 'The schedule is checked against all hard requirements, no double booking, driver rest achieved, staffing met. Shifts that cannot be staffed are marked as unstaffed, and the user manually assigns a soldier to these afterwards.' }
        },
      ],
      insights: [
        {
          title: { sv: 'Det som provades', en: 'What was tried' },
          items: [
            {
              label: { sv: 'Från iOS till Raspberry Pi', en: 'From iOS to Raspberry Pi' },
              text: { sv: 'Jag byggde först en iOS-app för att lösa det, mest för att jag gillade att programmera i Swift och SwiftUI. Den funkade bra, men man får inte ta med telefonen ut i fält. Därför byggde jag om det till en fristående enhet med en Raspberry Pi och en liten pekskärm som man kan ta med sig överallt.', en: 'I first built an iOS app to solve this, mostly because I enjoyed programming in Swift and SwiftUI. It worked well, but you\'re not allowed to bring your phone into the field. So I rebuilt it as a standalone device with a Raspberry Pi and a small touchscreen that you can take anywhere.' }
            },
            {
              label: { sv: 'OR-Tools', en: 'OR-Tools' },
              text: { sv: 'Ett försök gjordes att använda OR-Tools CP-SAT solver för att hitta det optimala schemat matematiskt, men lösaren hade svårt att hantera kombinationen av alla regler och begränsningar, och jag valde därför att inte använda det.', en: 'An attempt was made to use the OR-Tools CP-SAT solver to find the optimal schedule mathematically, but the solver struggled to handle the combination of all rules and constraints, and I therefore chose not to use it.' }
            }
          ]
        },
        {
          title: { sv: 'Att avsluta ett projekt', en: 'Closing a project' },
          items: [
            {
              label: { sv: 'När man inser att det inte går', en: 'Realising it won\'t work' },
              text: { sv: 'I praktiken visade det sig finnas för många yttre faktorer som påverkar schemaläggningen för att en algoritm ska kunna göra det bättre än en människa. Jag valde därför att avsluta projektet, även om det inte gick som jag hade hoppats.', en: 'In practice there turned out to be too many external factors affecting the scheduling for an algorithm to do it better than a human. I therefore chose to close the project, even though it didn\'t go the way I had hoped.' }
            }
          ]
        }
      ],
      hasWorkflow: false,
      workflow: [],
      componentsText: {
        sv: 'Enheten är uppdelad i oberoende moduler som kan utvecklas var för sig.',
        en: 'The device is divided into independent modules that can be developed separately.'
      },
      components: [
        {
          group: 'GPS',
          items: [
            {
              name: 'GPS Receiver',
              type: 'Hardware',
              responsibility: { sv: 'En USB GPS-mottagare (VK-162) som fångar upp satellitsignaler och ger enhetens position.', en: 'A USB GPS receiver (VK-162) that captures satellite signals and provides the device\'s position.' }
            },
            {
              name: 'MGRS Converter',
              type: 'Service',
              responsibility: { sv: 'Tar emot GPS-koordinater och konverterar dem till MGRS-format som kan användas direkt på en militär karta.', en: 'Receives GPS coordinates and converts them to MGRS format that can be used directly on a military map.' }
            }
          ]
        },
        {
          group: 'Schedule',
          items: [
            {
              name: 'Schedule Engine',
              type: 'Service',
              responsibility: { sv: 'Genererar scheman automatiskt utifrån tillgängliga personer och skift som behöver täckas.', en: 'Generates schedules automatically based on available personnel and shifts that need to be covered.' }
            },
            {
              name: 'Constraints',
              type: { sv: 'Regler', en: 'Rules' },
              responsibility: { sv: 'Reglerna som schemat måste följa: ingen jobbar dubbla pass, tillräckligt med folk per skift, vilotider efter långa pass, och rättvis fördelning av arbetstimmar.', en: 'The rules the schedule must follow: no one works double shifts, enough people per shift, rest periods after long shifts, and fair distribution of work hours.' }
            }
          ]
        },
        {
          group: { sv: 'Databas', en: 'Database' },
          items: [
            {
              name: 'SQLite',
              type: 'Database',
              responsibility: { sv: 'Lokal databas som lagrar alla scheman, personer och inställningar direkt på enheten. Kräver inget internet.', en: 'Local database that stores all schedules, personnel, and settings directly on the device. Requires no internet.' }
            },
            {
              name: 'Web Admin',
              type: 'Interface',
              responsibility: { sv: 'Ett webbgränssnitt för att hantera data från en vanlig dator. Körs lokalt och är inte en publik hemsida, den är enbart avsedd för den som administrerar enheten, Delar samma databas som enheten.', en: 'A web interface for managing data from a regular computer. Runs locally and is not a public website, it is only intended for whoever administers the device. Shares the same database as the device.' }
            }
          ]
        },
        {
          group: { sv: 'Hårdvara', en: 'Hardware' },
          items: [
            {
              name: 'Raspberry Pi 5',
              type: { sv: 'Enhet', en: 'Device' },
              responsibility: { sv: 'Hjärnan i systemet. Kör all mjukvara lokalt utan internetuppkoppling.', en: 'The brain of the system. Runs all software locally without internet connection.' }
            },
            {
              name: { sv: 'CUQI 3.5" pekskärm', en: 'CUQI 3.5" touchscreen' },
              type: { sv: 'Skärm', en: 'Display' },
              responsibility: { sv: '480×320 TFT LCD med pekfunktion och inbyggd kylfläns. Monterad direkt på Pi:n.', en: '480×320 TFT LCD with touch input and built-in cooling fan. Mounted directly on the Pi.' }
            },
            {
              name: 'Ejoyous VK-162',
              type: 'GPS',
              responsibility: { sv: 'USB GPS-mottagare som fångar satellitsignaler och ger enhetens position i latitud/longitud.', en: 'USB GPS receiver that captures satellite signals and provides the device\'s position in latitude/longitude.' }
            }
          ]
        }
      ]
    },
  };

  const project = projects[projectId];

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className={`project-detail-page accent-${project.accentColor}`}>
      <div className="project-detail-container">
        {/* Project Title Header - GitHub Style */}
        <div className="project-header-title">
          <Link to="/projects" className="back-link">
            {t('projects.backToProjects')}
          </Link>
          <div className="project-title-row">
            <h1 className="github-project-name">{project.name}</h1>
            <p className="project-tagline">{loc(project.tagline)}</p>
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
                <p className="readme-description">{loc(project.description)}</p>
              </div>
            </div>
          </div>

          {/* Right Column - About */}
          <div className="sidebar-column">
            <div className={`about-section led-${project.ledColor}`}>
              <div className="about-header">
                <span className="about-title">{t('projects.details')}</span>
              </div>
              <div className="about-content">
                <div className="about-item">
                  <span className="about-label">{t('projects.platforms')}</span>
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
                  <span className="about-label">{t('projects.techStack')}</span>
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
                  <span className="about-label">{t('projects.year')}</span>
                  <span className="about-value">{loc(project.year)}</span>
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
                loc(project.resultText).split('\n\n').map((para, i) => (
                  <p key={i} className="result-description">{para}</p>
                ))
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
                      {video.description && <span className="video-description">{loc(video.description)}</span>}
                    </div>
                  ))}
                </div>
              )}
              {project.resultImages && (
                <div className="result-images-row">
                  {project.resultImages.map((img, i) => (
                    <div key={i} className="result-image-item">
                      <span className="result-image-title">{img.title}</span>
                      <div className="result-image-container">
                        <img className="result-image" src={img.src} alt={img.title} loading="lazy" />
                      </div>
                      {img.subtitle && <p className="result-image-subtitle">{loc(img.subtitle)}</p>}
                    </div>
                  ))}
                </div>
              )}
              {project.resultDetails && (
                <div className="feature-commits">
                  {project.resultDetails.map((item, i) => (
                    <div key={i} className="feature-commit">
                      <div className="feature-commit-dot insights-dot"></div>
                      <div className="feature-commit-content">
                        <span className="feature-commit-label">{loc(item.label)}</span>
                        {loc(item.text).split('\n').map((line, j) => (
                          <p key={j} className="feature-commit-text">{line}</p>
                        ))}
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
                        <span className="feature-commit-label">{loc(detail.label)}</span>
                        <p className="feature-commit-text">{loc(detail.text)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button className="section-collapse-btn" onClick={() => toggleSection('result')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15L12 9L6 15"/>
                </svg>
                {t('projects.close')}
              </button>
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
                    loc(project.architecture.subtitle).split('\n\n').map((para, i) => (
                      <p key={i} className="result-description">{para}</p>
                    ))
                  )}
                  <div className="arch-tap-hint" onClick={() => setArchModalOpen(true)}>
                    <ArchitectureDiagram architecture={project.architecture} />
                    <span className="arch-tap-label">{t('projects.expandHint')}</span>
                  </div>
                </>
              ) : (
                <p className="architecture-description" style={{opacity: 0.5, fontStyle: 'italic'}}>Arkitekturbeskrivning kommer snart.</p>
              )}
              <button className="section-collapse-btn" onClick={() => toggleSection('architecture')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15L12 9L6 15"/>
                </svg>
                {t('projects.close')}
              </button>
            </div>
          </div>
        </div>

        {archModalOpen && project.architecture && (
          <div className="arch-modal-overlay" onClick={() => setArchModalOpen(false)}>
            <div className="arch-modal" onClick={(e) => e.stopPropagation()}>
              <button className="arch-modal-close" onClick={() => setArchModalOpen(false)}>✕</button>
              <div className="arch-modal-content">
                <ArchitectureDiagram architecture={project.architecture} />
              </div>
            </div>
          </div>
        )}

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
                  <p className="result-description">{loc(project.componentsText)}</p>
                )}
                <div className="components-list">
                  {project.components.map((group, gi) => (
                    <div key={gi} className="component-group">
                      {group.group && <h4 className="component-group-title">{loc(group.group)}</h4>}
                      <div className="component-grid">
                        {group.items.map((comp, i) => (
                          <div key={i} className="component-card">
                            <div className="component-card-header">
                              <span className="component-name">{loc(comp.name)}</span>
                              <span className="component-type-badge">{loc(comp.type)}</span>
                            </div>
                            <p className="component-responsibility">{loc(comp.responsibility)}</p>
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
                          <span className="pipeline-title">{loc(step.title)}</span>
                          <span className="pipeline-desc">{loc(step.description)}</span>
                          <span className="pipeline-detail">{loc(step.details)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button className="section-collapse-btn" onClick={() => toggleSection('components')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15L12 9L6 15"/>
                </svg>
                {t('projects.close')}
              </button>
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
                <p className="insights-description">{loc(project.insights)}</p>
              ) : (
                <div className="components-list">
                  {project.insights.map((section, si) => (
                    <div key={si} className="component-group">
                      <h4 className="insights-group-title">{loc(section.title)}</h4>
                      <div className="feature-commits">
                        {section.items.map((item, i) => (
                          <div key={i} className="feature-commit">
                            <div className="feature-commit-dot insights-dot"></div>
                            <div className="feature-commit-content">
                              <span className="feature-commit-label">{loc(item.label)}</span>
                              <p className="feature-commit-text">{loc(item.text)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button className="section-collapse-btn" onClick={() => toggleSection('insights')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15L12 9L6 15"/>
                </svg>
                {t('projects.close')}
              </button>
            </div>
          </div>
        </div>
        )}

        {/* LINKS */}
        {(project.thesis || project.demo || project.github) && <div className="file-section fullwidth-section">
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
              <button className="section-collapse-btn" onClick={() => toggleSection('links')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15L12 9L6 15"/>
                </svg>
                {t('projects.close')}
              </button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default ProjectDetail;
