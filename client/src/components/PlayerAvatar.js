import React from 'react';
import './PlayerAvatar.css';

function PlayerAvatar({ isWalking }) {
  return (
    <svg className={`soldier ${isWalking ? 'walking' : ''}`} viewBox="0 0 200 260" width="80" height="104">
      {/* ARM VÄNSTER */}
      <g id="armL" className="limb arm-left">
        <rect x="61" y="90" width="14" height="45" rx="7" fill="#3f5a3c"/>
        <rect x="61" y="130" width="14" height="35" rx="7" fill="#3f5a3c"/>
        <circle cx="68" cy="170" r="7" fill="#f2d2b6"/>
      </g>

      {/* ARM HÖGER */}
      <g id="armR" className="limb arm-right">
        <rect x="125" y="90" width="14" height="45" rx="7" fill="#3f5a3c"/>
        <rect x="125" y="130" width="14" height="35" rx="7" fill="#3f5a3c"/>
        <circle cx="132" cy="170" r="7" fill="#f2d2b6"/>
      </g>

      {/* BEN VÄNSTER */}
      <g id="legL" className="limb leg-left">
        <rect x="84" y="150" width="16" height="55" rx="8" fill="#3f5a3c"/>
        <rect x="78" y="200" width="26" height="12" rx="4" fill="#1f1f1f"/>
      </g>

      {/* BEN HÖGER */}
      <g id="legR" className="limb leg-right">
        <rect x="100" y="150" width="16" height="55" rx="8" fill="#3f5a3c"/>
        <rect x="96" y="200" width="26" height="12" rx="4" fill="#1f1f1f"/>
      </g>

      {/* HUVUD + KROPP */}
      <g id="torsoHead">
        {/* Huvud */}
        <circle cx="100" cy="50" r="22" fill="#f2d2b6"/>

        {/* Blond lugg */}
        <path d="M80 50 Q100 35 120 50 Q100 42 80 50Z" fill="#e6d27a"/>

        {/* Fältmössa */}
        <path d="M78 38 Q100 18 122 38 L122 46 Q100 36 78 46Z" fill="#3f5a3c"/>
        <rect x="76" y="43" width="48" height="7" rx="3.5" fill="#2f432e"/>

        {/* Tofs (tjej) */}
        <g id="ponytail" className="ponytail">
          <circle cx="125" cy="60" r="4" fill="#c43b3b"/>
          <path d="
            M129 60
            Q150 70 145 90
            Q140 108 125 112
            Q132 92 128 78
            Q125 68 129 60
          " fill="#e6d27a"/>
        </g>

        {/* Ansikte */}
        <circle cx="92" cy="55" r="2" fill="#222"/>
        <circle cx="108" cy="55" r="2" fill="#222"/>
        <path d="M95 62 Q100 66 105 62" stroke="#222" strokeWidth="2" fill="none"/>

        {/* Hals */}
        <rect x="92" y="70" width="16" height="10" rx="5" fill="#f2d2b6"/>

        {/* Kropp */}
        <rect x="75" y="80" width="50" height="70" rx="10" fill="#3f5a3c"/>
      </g>
    </svg>
  );
}

export default PlayerAvatar;
