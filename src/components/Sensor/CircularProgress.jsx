import React from "react";
import "./../../assets/sensor.css";

const CircularProgress = ({
  value,
  max,
  color,
  label,
  unit,
  icon: Icon,
  size = 180,
}) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Cần style inline cho các thuộc tính thay đổi động
  const inlineStyles = {
    circularProgressContainer: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    circularSvg: {
      transform: "rotate(-90deg)",
      filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))",
    },
    circularProgressBar: {
      transition: "all 1s ease-out",
      strokeDashoffset: strokeDashoffset,
    },
    circularIcon: {
      width: "2rem",
      height: "2rem",
      marginBottom: "0.5rem",
      opacity: 0.6,
      color: color,
    },
    circularValue: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: color,
    },
  };

  return (
    <div style={inlineStyles.circularProgressContainer}>
      <svg width={size} height={size} className="circular-svg">
        <defs>
          <linearGradient
            id={`gradient-${label}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          />
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r="70"
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r="70"
          stroke={`url(#gradient-${label})`}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeLinecap="round"
          filter="url(#glow)"
          style={inlineStyles.circularProgressBar}
        />
      </svg>
      <div className="circular-progress-content">
        <Icon style={inlineStyles.circularIcon} />
        <div style={inlineStyles.circularValue}>{value}</div>
        <div className="circular-unit">{unit}</div>
      </div>
      <div className="circular-label">
        <div className="circular-label-text">{label}</div>
        <div className="circular-percentage">{percentage.toFixed(0)}%</div>
      </div>
    </div>
  );
};

export default CircularProgress;
