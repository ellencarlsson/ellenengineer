import React from 'react';
import './Robot.css';

function Robot() {
  return (
    <div className="robot-container">
      <div className="robot">
        <div className="robot-head">
          <div className="antenna">
            <div className="antenna-ball"></div>
          </div>
          <div className="eyes">
            <div className="eye left-eye">
              <div className="pupil"></div>
            </div>
            <div className="eye right-eye">
              <div className="pupil"></div>
            </div>
          </div>
          <div className="mouth"></div>
        </div>

        <div className="robot-body">
          <div className="chest-panel">
            <div className="light"></div>
          </div>
          <div className="arm left-arm">
            <div className="hand"></div>
          </div>
          <div className="arm right-arm">
            <div className="hand"></div>
          </div>
        </div>

        <div className="robot-legs">
          <div className="leg left-leg">
            <div className="foot"></div>
          </div>
          <div className="leg right-leg">
            <div className="foot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Robot;
