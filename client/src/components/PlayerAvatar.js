import React from 'react';
import './PlayerAvatar.css';

function PlayerAvatar({ isWalking }) {
  return (
    <svg
      className={`soldier ${isWalking ? 'walking' : ''}`}
      viewBox="0 0 200 260"
      width="80"
      height="104"
    >
      {/* ARM VÄNSTER */}
      <g id="armL" className="limb arm-left">
        <rect x="61" y="90" width="14" height="45" rx="7" fill="#3f5a3c" stroke="#1f1f1f" strokeWidth="2" />
        <circle cx="68" cy="138" r="7" fill="#d9b595" stroke="#1f1f1f" strokeWidth="2" />
      </g>

      {/* ARM HÖGER */}
      <g id="armR" className="limb arm-right">
        <rect x="125" y="90" width="14" height="45" rx="7" fill="#3f5a3c" stroke="#1f1f1f" strokeWidth="2" />
        <circle cx="132" cy="138" r="7" fill="#d9b595" stroke="#1f1f1f" strokeWidth="2" />
      </g>

      {/* BEN VÄNSTER */}
      <g id="legL" className="limb leg-left">
        <rect x="84" y="150" width="16" height="55" rx="8" fill="#3f5a3c" stroke="#1f1f1f" strokeWidth="2" />
        <rect x="78" y="200" width="26" height="12" rx="4" fill="#1f1f1f" />
      </g>

      {/* BEN HÖGER */}
      <g id="legR" className="limb leg-right">
        <rect x="100" y="150" width="16" height="55" rx="8" fill="#3f5a3c" stroke="#1f1f1f" strokeWidth="2" />
        <rect x="96" y="200" width="26" height="12" rx="4" fill="#1f1f1f" />
      </g>

      {/* HUVUD + KROPP */}
      <g id="torsoHead">
        {/* Hår – bak (rundad, enklare form) */}
        <path
          d="
            M76 28
            Q100 10 124 28
            Q132 38 130 55
            L130 102
            Q130 116 116 116
            L84 116
            Q70 116 70 102
            L70 55
            Q68 38 76 28
            Z
          "
          fill="#e6d27a"
          stroke="#1f1f1f"
          strokeWidth="2"
        />

        {/* Huvud */}
        <circle cx="100" cy="50" r="30" fill="#d9b595" stroke="#1f1f1f" strokeWidth="2" />

        {/* Mittbena (superenkel, gör att det läses som hår) */}
        <path
          d="M100 20 L100 44"
          stroke="#1f1f1f"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Ansikte */}
        <circle cx="92" cy="55" r="2" fill="#222" />
        <circle cx="108" cy="55" r="2" fill="#222" />
        <path d="M95 66 Q100 70 105 66" stroke="#222" strokeWidth="2" fill="none" />

        {/* Hår – fram (två enkla slingor över ansiktet) */}
        <path
          d="M78 48 Q74 70 80 92 Q84 104 78 112"
          fill="none"
          stroke="#1f1f1f"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M122 48 Q126 70 120 92 Q116 104 122 112"
          fill="none"
          stroke="#1f1f1f"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Hals */}
        <rect x="92" y="70" width="16" height="10" rx="5" fill="#d9b595" />

        {/* Kropp */}
        <rect x="75" y="80" width="50" height="70" rx="10" fill="#3f5a3c" stroke="#1f1f1f" strokeWidth="2" />
      </g>
    </svg>
  );
}

export default PlayerAvatar;
