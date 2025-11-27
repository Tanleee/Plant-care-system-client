import React from 'react';
import { Sun } from 'lucide-react';

const LightBar = ({ value, max = 3000 }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="gauge-card">
      <div className="gauge-wrapper light-gauge">
        <div className="light-icon-wrapper">
          <Sun className="light-icon" size={28} />
        </div>

        <div className="light-bar-container">
          <div className="light-bar-bg">
            <div
              className="light-bar-fill"
              style={{ height: `${percentage}%` }}
            >
              <div className="light-bar-shine"></div>
            </div>

            <div className="light-bar-marker" style={{ bottom: '75%' }}></div>
            <div className="light-bar-marker" style={{ bottom: '50%' }}></div>
            <div className="light-bar-marker" style={{ bottom: '25%' }}></div>
          </div>
        </div>

        <div className="light-value-wrapper">
          <div className="gauge-value light-value">{value}</div>
          <div className="gauge-unit">lux</div>
        </div>
      </div>

      <div className="gauge-footer">
        <div className="gauge-label">Ánh sáng</div>
        <div className="gauge-percentage">{percentage.toFixed(0)}%</div>
      </div>
    </div>
  );
};

export default LightBar;
