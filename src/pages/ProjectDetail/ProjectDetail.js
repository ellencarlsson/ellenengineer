/**
 * @file Project detail page with expandable sections and architecture diagrams.
 */
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
                      anchor={anchor2} fill="rgba(255,255,255,0.7)" fontSize={28}
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
                  fill="rgba(255,255,255,0.7)" fontSize={28}
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

/** Detail page displaying all information about a specific project. */
function ProjectDetail() {
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
      tagline: 'AI-driven teckenspråksigenkänning med Apple Watch rörelsesensorer',
      description: 'Personer som talar teckenspråk har ofta svårt att kommunicera med människor som inte förstår teckenspråk, vilket skapar en barriär i vardagen, på jobbet, i affären, hos läkaren. SignTalker är en app där man har en vanlig Apple Watch på handleden och gör teckenspråkstecken. Klockan känner av handrörelserna och skickar dem till en AI som har lärt sig vad varje rörelse betyder. Resultatet skickas till en iPhone som säger ordet högt. Man kan göra flera tecken i rad och bygga hela meningar. Klockan tolkar, telefonen pratar.\n\nDet enda man behöver är en Apple Watch och en iPhone. Ingen kamera, ingen dator, ingen internetuppkoppling. Allt fungerar i realtid, direkt på enheten. Projektet började som mitt examensarbete. Efter examen byggde jag om det från grunden för att göra det ännu bättre.',
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
        subtitle: 'Appen är uppbyggd enligt MVVM, där vyer och logik hålls separata. Både klockan och telefonen följer samma struktur med egna vyer och ViewModels. Att de delar samma arkitektur gör det enklare för dem att kommunicera med varandra, och gör det möjligt att testa och bygga vidare på varje del för sig.\n\nHela AI-modellen körs lokalt på klockan. Det är klockan som samlar in sensordata och tolkar tecknen, telefonen fungerar bara som en skärm för att visa resultatet och en fjärrkontroll för att starta detektionen. Eftersom all logik redan ligger på klockan innebär det att den i framtiden skulle kunna fungera helt självständigt.'
      },
      github: 'https://github.com/ellencarlsson/sign-language-recognition',
      demo: null,
      thesis: 'https://www.diva-portal.org/smash/get/diva2:1880636/FULLTEXT01.pdf',
      image: null,
      demoVideos: [
        { title: 'Presentation', description: 'Introduktion till projektet och hur appen fungerar', url: 'https://www.youtube.com/embed/qRDOVvyBVKQ' },
        { title: 'Drive in', description: 'Beställer mat på McDonald\'s med hjälp av klockan', url: 'https://www.youtube.com/embed/UfcuVqfH8x8' },
        { title: 'Dog mode', description: 'Ropar på sin hund med ett egentränat tecken kopplat till en inspelning av ägarens röst', url: 'https://www.youtube.com/embed/-NRR78CkO18' },
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
          text: 'När klockan har samlat in 60 data samples efter ca 1.2 sekunder är ett tecken färdigtolkat och klockan vibrerar. Man har sedan 1 sekund på sig att förbereda nästa tecken, och då vibrerar klockan igen som signal att den börjat lyssna på en ny rörelse.'
        },
        {
          label: 'Avsluta en mening',
          text: 'För att markera att en mening är klar gör man ett speciellt stopptecken, man håller handen upp och ned. Klockan känner igen det som en avslutningssignal, slutar lyssna efter fler tecken och den färdiga meningen hörs och syns från telefonen.'
        }
      ],
      insights: [
        {
          title: 'Begränsningar',
          items: [
            {
              label: 'Manuell träning',
              text: 'Modellen kan inte lära sig nya tecken på egen hand. Varje nytt ord kräver att man samlar in data, tränar om modellen och exporterar en ny version till appen. Det gör att det skalar dåligt och begränsar hur snabbt ordförrådet kan växa.'
            },
            {
              label: 'Fast fönsterstorlek',
              text: 'Alla inputs till modellen måste ha samma storlek, 60 samples. Det innebär att snabba tecken måste göras långsammare och långsamma tecken snabbare för att passa fönstret. Problemet är att modellen inte kan veta vilket tecken som kommer, och därför inte kan anpassa hur länge den lyssnar. Fler samples ger mer precis data men gör appen långsammare, och färre samples gör appen snabbare men tappar detaljer.'
            }
          ]
        },
        {
          title: 'Fortsatt utveckling',
          items: [
            {
              label: 'Fler sensorer',
              text: 'Apple Watch har just nu gyroskop och accelerometer. Fler sensortyper hade gett rikare data per rörelse. Dessutom hade en klocka på varje hand gjort att modellen fångar båda händernas rörelser, vilket ger mycket mer specifika mönster och hade förbättrat träffsäkerheten avsevärt.'
            },
            {
              label: 'Automatisk träningspipeline',
              text: 'Att träna modellen direkt på enheten skulle ta bort det manuella arbetet och göra det möjligt att lägga till nya tecken utan att bygga om appen. Jag försökte implementera detta men det visade sig inte vara möjligt med Create ML. Med ett annat AI-ramverk hade det kanske gått.'
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
              responsibility: 'Kör Core ML-modellen som tolkar rörelsedata till ord.'
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
      tagline: 'Interaktiv portfolio med terminal-tema och kreativa animationer',
      description: 'Jag ville ha någonstans att samla mina projekt och tyckte det var kul att bygga en egen hemsida. Temat är inspirerat av teknik och data, med en terminal som startsida och interaktiva element genom hela sidan.\n\nVarje sida är byggd kring ett eget koncept. Startsidan är en terminal, projektsidan visar alla projekt som noder, Om mig är en tidslinje med elektrisk inspiration, CV-sidan använder SQL-queries, och Kontakta mig är upplagd som API-anrop.',
      platforms: ['Web'],
      techStack: ['React', 'JavaScript'],
      architecture: {
        nodes: [
          { id: 'browser', label: 'Client', col: 0, row: 0 },
          { id: 'router', label: 'React Router', col: 1, row: 0 },
          { id: 'view', label: 'View', col: 2, row: 0 },
        ],
        connections: [
          { from: 'browser', to: 'router', label: 'Användaren\nnavigerar' },
          { from: 'router', to: 'view', label: 'Väljer rätt\nsida' },
        ],
        subtitle: 'Sidan är en ren frontend utan backend eller databas. Varje komponent har sin data hårdkodad direkt i sig, det finns ingen separat datafil. Det räcker för en portfolio eftersom innehållet uppdateras sällan och alltid av mig. Det gör sidan snabb, enkel att deploya och kräver ingen server som kostar pengar eller behöver underhållas.\n\nNavigeringen sköts av React Router som en SPA (Single Page Application), vilket betyder att sidan aldrig laddas om när man byter vy. Det ger en snabbare och smidigare upplevelse för besökaren.'
      },
      github: 'https://github.com/ellencarlsson/ellenengineer',
      demo: null,
      image: null,
      demoVideo: null,
      resultText: 'Sidan är live och fungerar bra på både desktop och mobil. Den har en startsida med en animerad terminal, en Om mig-sektion med en interaktiv tidslinje, en projektsida och en CV-sida med nedladdningsbar PDF. Hela sidan är fortfarande under utveckling och jag lägger till nya saker löpande.',
      insights: [
        {
          title: 'Kreativitet',
          items: [
            {
              label: 'Interaktiva teman',
              text: 'Det roligaste har varit att göra varje sida interaktiv och kreativ på sitt eget sätt. Varje flik har ett eget tema, en sida kan se ut som en SQL-query medan en annan liknar API-anrop. Jag ville att det skulle kännas som att man upptäcker något nytt varje gång man klickar sig vidare, och jag tycker att det blev bra.'
            },
            {
              label: 'Balans mellan kreativitet och tydlighet',
              text: 'Det kluriga var att hitta balansen mellan kreativitet och tydlighet. Informationen ska vara lätt att förstå samtidigt som det ska vara snyggt och lite interaktivt. Det är lätt att det blir för mycket av det ena eller det andra.'
            }
          ]
        },
        {
          title: 'Verktyg',
          items: [
            {
              label: 'Claude som AI-verktyg',
              text: 'Hela sidan är byggd med hjälp av Claude som AI-verktyg. Jag styr projektet, tar besluten, väljer design och bestämmer vad som ska byggas. Claude hjälper mig att skriva koden snabbare. Det kräver att man har en bra överblick över projektet och kan ge tydliga instruktioner för att det ska bli rätt.'
            }
          ]
        }
      ],
      componentsText: 'Eftersom sidan är en ren frontend utan backend finns det inte så många tekniska delar att bryta ner. Här är de viktigaste.',
      components: [
        {
          group: '',
          items: [
            {
              name: 'App',
              type: 'Entry Point',
              responsibility: 'Applikationens startpunkt som renderar hela sidan och kopplar ihop alla delar.'
            },
            {
              name: 'React Router',
              type: 'Router',
              responsibility: 'Konfigurerar alla routes och kopplar varje URL till rätt sidkomponent. Hanterar navigering utan att sidan laddas om.'
            },
            {
              name: 'Komponentstruktur',
              type: 'Mönster',
              responsibility: 'Varje del av sidan är organiserad i en egen mapp där både logik (.js) och styling (.css) bor tillsammans. All projektdata ligger hårdkodad direkt i komponenterna.'
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
    'nordpunkt': {
      id: 'nordpunkt',
      model: 'IBM DESKSTAR NP1',
      label: 'NORDPUNKT-2025',
      name: 'NordPunkt',
      year: 'Under utveckling',
      capacity: '512 MB',
      interface: 'GPIO',
      status: 'IN DEVELOPMENT',
      ledColor: 'brown',
      accentColor: 'sand',
      tagline: 'Raspberry Pi-enhet för MGRS-koordinater och automatisk schemaläggning i fält',
      description: 'Ett postschema är ett schema som styr vem som ska posta och när. Det stora problemet med att göra detta för hand är att få kalkylen att gå ihop: uppgiften måste lösas dygnet runt, samtidigt som varje person måste få sömn och vila. Eftersom flera personer ständigt måste vara i tjänst blir det snabbt ett svårt pussel att fördela passen rättvist så att ingen blir överbelastad.\n\nFör att underlätta detta håller jag på att bygga ett system som räknar ut det bästa schemat automatiskt. Systemet kan alla regler för vilotider, körtider och bemanning, och fördelar passen så rättvist som möjligt.\n\nMGRS är det koordinatsystem som används i fält för att ange exakta positioner på kartan. Att räkna ut dessa manuellt är tidskrävande och svårt att få rätt när man är trött eller stressad. Därför håller jag också på att implementera en funktion på enheten som tar fram MGRS-koordinaten automatiskt med hjälp av GPS.',
      platforms: ['Raspberry Pi'],
      techStack: ['Python'],
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
          { from: 'view', to: 'rpi', label: 'Sends\ncommands' },
          { from: 'rpi', to: 'view', label: 'Shows MGRS\n/ Schedule' },
          { from: 'rpi', to: 'schedule', label: 'Generate\nschedule' },
          { from: 'schedule', to: 'rpi', label: 'Returns\nschedule' },
          { from: 'schedule', to: 'sqlite', label: 'Read/Write' },
          { from: 'webadmin', to: 'sqlite', label: 'Read/Write' },
        ],
        subtitle: 'Allt körs på en Raspberry Pi med pekskärm. Web Admin används från en dator för att hantera data.'
      },
      github: null,
      demo: null,
      image: null,
      demoVideos: null,
      resultText: 'Projektet är under utveckling. GPS-modulen kan läsa satellitsignaler och visa positionen som MGRS-koordinater på pekskärmen. Schemamodulen kan generera scheman baserat på regler som att ingen jobbar dubbla pass, att alla skift har tillräckligt med folk, och att arbetstiden fördelas rättvist. Enheten fungerar helt offline utan internet.',
      insights: [
        {
          title: 'Bakgrund',
          items: [
            {
              label: 'Från iOS till Raspberry Pi',
              text: 'Jag byggde först en iOS-app för att lösa det, mest för att jag gillade att programmera i Swift och SwiftUI. Den funkade bra, men man får inte ta med telefonen ut i fält. Så nu bygger jag om det till en fristående enhet med en Raspberry Pi och en liten pekskärm som man kan ta med sig överallt.'
            }
          ]
        }
      ],
      hasWorkflow: false,
      workflow: [],
      componentsText: 'Enheten är uppdelad i oberoende moduler som kan utvecklas var för sig.',
      components: [
        {
          group: 'GPS',
          items: [
            {
              name: 'GPS Receiver',
              type: 'Hardware',
              responsibility: 'En USB GPS-mottagare (VK-162) som fångar upp satellitsignaler och ger enhetens position.'
            },
            {
              name: 'MGRS Converter',
              type: 'Service',
              responsibility: 'Tar emot GPS-koordinater och konverterar dem till MGRS-format som kan användas direkt på en militär karta.'
            }
          ]
        },
        {
          group: 'Schedule',
          items: [
            {
              name: 'Schedule Engine',
              type: 'Service',
              responsibility: 'Genererar scheman automatiskt utifrån tillgängliga personer och skift som behöver täckas.'
            },
            {
              name: 'Constraints',
              type: 'Rules',
              responsibility: 'Reglerna som schemat måste följa: ingen jobbar dubbla pass, tillräckligt med folk per skift, vilotider efter långa pass, och rättvis fördelning av arbetstimmar.'
            }
          ]
        },
        {
          group: 'Databas',
          items: [
            {
              name: 'SQLite',
              type: 'Database',
              responsibility: 'Lokal databas som lagrar alla scheman, personer och inställningar direkt på enheten. Kräver inget internet.'
            },
            {
              name: 'Web Admin',
              type: 'Interface',
              responsibility: 'Ett webbgränssnitt för att hantera data från en vanlig dator. Delar samma databas som enheten.'
            }
          ]
        }
      ]
    },
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
                      {video.description && <span className="video-description">{video.description}</span>}
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
                        <img className="result-image" src={img.src} alt={img.title} />
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
                  <div className="arch-tap-hint" onClick={() => setArchModalOpen(true)}>
                    <ArchitectureDiagram architecture={project.architecture} />
                    <span className="arch-tap-label">Tryck för att förstora</span>
                  </div>
                </>
              ) : (
                <p className="architecture-description" style={{opacity: 0.5, fontStyle: 'italic'}}>Arkitekturbeskrivning kommer snart.</p>
              )}
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
                  <p className="result-description">{project.componentsText}</p>
                )}
                <div className="components-list">
                  {project.components.map((group, gi) => (
                    <div key={gi} className="component-group">
                      {group.group && <h4 className="component-group-title">{group.group}</h4>}
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
                      <h4 className="insights-group-title">{section.title}</h4>
                      <div className="feature-commits">
                        {section.items.map((item, i) => (
                          <div key={i} className="feature-commit">
                            <div className="feature-commit-dot insights-dot"></div>
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
