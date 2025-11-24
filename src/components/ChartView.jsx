import React from "react";
import { BarChart3 } from "lucide-react";
import "./../assets/chart.css";

const ChartView = ({ chartData, sensorData }) => (
  <div className="chart-container">
    <h2 className="chart-title">
      <BarChart3 className="chart-icon" />
      Data Analytics
    </h2>
    <div className="chart-grid">
      {["temperature", "humidity", "soilMoisture", "light"].map((metric) => (
        <div key={metric} className="chart-card">
          <h3 className="chart-card-title">
            {metric === "temperature"
              ? "Temperature (°C)"
              : metric === "humidity"
              ? "Air Humidity (%)"
              : metric === "soilMoisture"
              ? "Soil Moisture (%)"
              : "Light Intensity (lux)"}
          </h3>
          <div className="mini-chart">
            {chartData.map((data, idx) => {
              const maxVal = metric === "light" ? 3000 : 100;
              const height = (data[metric] / maxVal) * 100;
              const backgroundColor =
                metric === "temperature"
                  ? "#ef4444"
                  : metric === "humidity"
                  ? "#3b82f6"
                  : metric === "soilMoisture"
                  ? "#10b981"
                  : "#fbbf24";

              // Cần style inline cho các thuộc tính thay đổi động
              const inlineStyles = {
                chartBarFill: {
                  width: "100%",
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.5s ease",
                  opacity: 0.8,
                  height: `${height}%`,
                  backgroundColor: backgroundColor,
                },
              };

              return (
                <div key={idx} className="chart-bar">
                  <div style={inlineStyles.chartBarFill} />
                </div>
              );
            })}
          </div>
          <div className="chart-current-value">
            Current: <strong>{sensorData[metric]}</strong>
            {metric === "temperature"
              ? "°C"
              : metric === "light"
              ? " lux"
              : "%"}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ChartView;
