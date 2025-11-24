import React from "react";
import "./../../assets/controls.css";

const ControlSwitch = ({ label, icon: Icon, isActive, onClick, color }) => {
  // Cần style inline cho các thuộc tính thay đổi động
  const buttonStyle = isActive
    ? {
        backgroundImage: `linear-gradient(135deg, ${color}dd, ${color})`,
      }
    : {};

  return (
    <button
      onClick={onClick}
      className={`control-button ${
        isActive ? "control-button-active" : "control-button-inactive"
      }`}
      style={buttonStyle}
    >
      <div className="control-content">
        <div
          className={
            isActive ? "control-icon-wrapper-active" : "control-icon-wrapper"
          }
        >
          <Icon className={isActive ? "control-icon-active" : "control-icon"} />
        </div>
        <div className={isActive ? "control-label-active" : "control-label"}>
          {label}
        </div>
        <div className={isActive ? "control-status-active" : "control-status"}>
          {isActive ? "ON" : "OFF"}
        </div>
      </div>
      <div
        className={isActive ? "control-indicator-active" : "control-indicator"}
      ></div>
    </button>
  );
};

export default ControlSwitch;
