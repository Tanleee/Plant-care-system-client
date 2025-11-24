import React from "react";
import { Droplets, Wind, Zap, WifiOff } from "lucide-react";

// Import Components
import CircularProgress from "../components/Sensor/CircularProgress";
import TemperatureGauge from "../components/Sensor/TemperatureGauge";
import LightBar from "../components/Sensor/LightBar";
import ControlSwitch from "../components/Controls/ControlSwitch";

// Import CSS
import "../assets/dashboard.css";
import "../assets/sensor.css";
import "../assets/controls.css";

/**
 * Trang Dashboard chính hiển thị dữ liệu cảm biến và điều khiển thiết bị.
 * @param {object} props
 * @param {object} props.sensorData - Dữ liệu cảm biến hiện tại.
 * @param {object} props.controls - Trạng thái điều khiển thiết bị.
 * @param {function} props.toggleControl - Hàm bật/tắt thiết bị.
 */
const DashboardPage = ({ sensorData, controls, toggleControl }) => (
  <>
    {/* Header */}
    <div className="header">
      <div>
        <h1 className="header-title">
          <span className="header-icon">🌿</span>
          Environmental Monitor
        </h1>
        <p className="header-subtitle">Real-time sensor tracking system</p>
      </div>
      <div className="status-badge">
        {sensorData.isOnline ? (
          <>
            <div className="status-dot-online"></div>
            <span className="status-text-online">Online</span>
          </>
        ) : (
          <>
            <WifiOff className="status-icon" />
            <span className="status-text-offline">Offline</span>
          </>
        )}
      </div>
    </div>

    {/* Sensor Displays */}
    <div className="sensor-grid">
      <div className="sensor-card">
        <TemperatureGauge value={sensorData.temperature} />
      </div>

      <div className="sensor-card">
        <CircularProgress
          value={sensorData.humidity}
          max={100}
          color="#3b82f6"
          label="Air Humidity"
          unit="%"
          icon={Droplets}
        />
      </div>

      <div className="sensor-card">
        <CircularProgress
          value={sensorData.soilMoisture}
          max={100}
          color="#10b981"
          label="Soil Moisture"
          unit="%"
          icon={Droplets}
        />
      </div>

      <div className="sensor-card">
        <LightBar value={sensorData.light} />
      </div>
    </div>

    {/* Controls */}
    <div className="controls-card">
      <h2 className="controls-title">
        <Zap className="controls-title-icon" />
        Device Control
      </h2>
      <div className="controls-grid">
        <ControlSwitch
          label="Water Pump"
          icon={Droplets}
          isActive={controls.pump}
          onClick={() => toggleControl("pump")}
          color="#3b82f6"
        />
        <ControlSwitch
          label="Cooling Fan"
          icon={Wind}
          isActive={controls.fan}
          onClick={() => toggleControl("fan")}
          color="#10b981"
        />
        <ControlSwitch
          label="LED Light"
          icon={() => <span className="led-icon">💡</span>}
          isActive={controls.light}
          onClick={() => toggleControl("light")}
          color="#fbbf24"
        />
      </div>
    </div>

    {/* Footer */}
    <div className="footer">
      <p className="footer-text">
        Last updated: {sensorData.lastUpdate.toLocaleTimeString("en-US")} •
        ESP32_Plant_System_v2.0
      </p>
    </div>
  </>
);

export default DashboardPage;
