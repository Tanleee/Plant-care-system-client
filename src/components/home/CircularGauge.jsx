import React from 'react';

const CircularGauge = ({
  value,
  max,
  min = 0,
  color,
  label,
  unit,
  icon: Icon
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="gauge-card">
      <div className="gauge-wrapper">
        <svg className="gauge-svg" viewBox="0 0 140 140">
          <defs>
            <linearGradient
              id={`gradient-${label}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: color, stopOpacity: 0.6 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: color, stopOpacity: 1 }}
              />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            cx="70"
            cy="70"
            r="58"
            fill="none"
            stroke="#e8f5e9"
            strokeWidth="12"
          />

          <circle
            cx="70"
            cy="70"
            r="58"
            fill="none"
            stroke={`url(#gradient-${label})`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="gauge-progress"
            filter="url(#glow)"
          />
        </svg>

        <div className="gauge-content">
          <div
            className="gauge-icon-wrapper"
            style={{ background: `${color}20` }}
          >
            <Icon style={{ color }} size={24} />
          </div>
          <div className="gauge-value" style={{ color }}>
            {value}
          </div>
          <div className="gauge-unit">{unit}</div>
        </div>
      </div>

      <div className="gauge-footer">
        <div className="gauge-label">{label}</div>
        <div className="gauge-percentage">{percentage.toFixed(0)}%</div>
      </div>
    </div>
  );
};

export default CircularGauge;
