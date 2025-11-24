import React from "react";
import "./../../assets/sensor.css";

const TemperatureGauge = ({ value }) => {
  const minTemp = 0;
  const maxTemp = 50;
  const percentage = ((value - minTemp) / (maxTemp - minTemp)) * 100;
  const rotation = (percentage / 100) * 180 - 90;

  // Cần style inline cho các thuộc tính thay đổi động
  const inlineStyles = {
    tempNeedle: {
      position: "absolute",
      bottom: "0.5rem",
      left: "50%",
      width: "4px",
      height: "4rem",
      background: "#1f2937",
      borderRadius: "9999px",
      transformOrigin: "bottom",
      transition: "transform 1s ease-out",
      transform: `translateX(-50%) rotate(${rotation}deg)`,
    },
  };

  return (
    <div className="temp-gauge-container">
      <div className="temp-gauge-wrapper">
        <svg
          width="192"
          height="110"
          viewBox="0 0 192 110"
          className="temp-gauge-svg"
        >
          <defs>
            <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path
            d="M 16 94 A 80 80 0 0 1 176 94"
            stroke="url(#tempGradient)"
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <path
            d="M 16 94 A 80 80 0 0 1 176 94"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            opacity="0.3"
          />
        </svg>
        <div style={inlineStyles.tempNeedle}>
          <div className="temp-needle-head"></div>
        </div>
      </div>
      <div className="temp-gauge-info">
        <div className="temp-value">{value}°C</div>
        <div className="temp-label">Temperature</div>
        <div className="temp-range">0° - 50°C</div>
      </div>
    </div>
  );
};

export default TemperatureGauge;
