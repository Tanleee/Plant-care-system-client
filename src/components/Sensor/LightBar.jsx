import React from "react";
import "./../../assets/sensor.css";

const LightBar = ({ value, max = 3000 }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const barHeight = (percentage / 100) * 160;

  // Cần style inline cho các thuộc tính thay đổi động
  const inlineStyles = {
    lightBarFill: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      background: "linear-gradient(to top, #fbbf24, #fef08a)",
      borderRadius: "9999px",
      transition: "height 1s ease-out",
      height: `${barHeight}px`,
    },
  };

  return (
    <div className="light-bar-container">
      <div className="light-bar-wrapper">
        <div style={inlineStyles.lightBarFill}>
          <div className="light-bar-glow"></div>
        </div>
        <div className="light-bar-line-1"></div>
        <div className="light-bar-line-2"></div>
        <div className="light-bar-line-3"></div>
      </div>
      <div className="light-bar-info">
        <div className="light-value">{value}</div>
        <div className="light-unit">lux</div>
        <div className="light-label">Light Intensity</div>
      </div>
    </div>
  );
};

export default LightBar;
