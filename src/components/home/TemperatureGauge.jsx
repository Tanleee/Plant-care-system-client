import React from 'react';
import { Thermometer } from 'lucide-react';

const TemperatureGauge = ({ value }) => {
  const minTemp = 0;
  const maxTemp = 50;
  const percentage = ((value - minTemp) / (maxTemp - minTemp)) * 100;
  const rotation = (percentage / 100) * 180 - 90;

  const getColor = (temp) => {
    if (temp < 15) return '#3b82f6';
    if (temp < 25) return '#10b981';
    if (temp < 35) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="gauge-card">
      <div className="gauge-wrapper">
        <svg className="temp-gauge-svg" viewBox="0 0 180 120">
          <defs>
            <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
              <stop offset="33%" style={{ stopColor: '#10b981' }} />
              <stop offset="66%" style={{ stopColor: '#f59e0b' }} />
              <stop offset="100%" style={{ stopColor: '#ef4444' }} />
            </linearGradient>
          </defs>

          <path
            d="M 20 90 A 70 70 0 0 1 160 90"
            fill="none"
            stroke="#e8f5e9"
            strokeWidth="14"
            strokeLinecap="round"
          />

          <path
            d="M 20 90 A 70 70 0 0 1 160 90"
            fill="none"
            stroke="url(#tempGradient)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          <g transform={`rotate(${rotation} 90 90)`}>
            <line
              x1="90"
              y1="90"
              x2="90"
              y2="35"
              stroke={getColor(value)}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="90" cy="90" r="5" fill={getColor(value)} />
          </g>
        </svg>

        <div className="temp-gauge-content">
          <div
            className="gauge-icon-wrapper"
            style={{ background: `${getColor(value)}20` }}
          >
            <Thermometer style={{ color: getColor(value) }} size={24} />
          </div>
          <div className="gauge-value" style={{ color: getColor(value) }}>
            {value}°C
          </div>
        </div>
      </div>

      <div className="gauge-footer">
        <div className="gauge-label">Nhiệt độ</div>
        <div className="gauge-range">0° - 50°C</div>
      </div>
    </div>
  );
};

export default TemperatureGauge;
