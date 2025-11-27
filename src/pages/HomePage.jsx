import React, { useState, useEffect } from 'react';
import {
  Droplets,
  Sun,
  Thermometer,
  Activity,
  Wifi,
  WifiOff,
  Leaf
} from 'lucide-react';

import './../assets/homePageStyle.css';
import CircularGauge from './../components/home/CircularGauge';
import InfoCard from './../components/home/InfoCard';
import LightBar from './../components/home/LightBar';
import TemperatureGauge from './../components/home/TemperatureGauge';

const HomePage = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 28.5,
    humidity: 65,
    soilMoisture: 47,
    light: 1342,
    lastUpdate: new Date(),
    isOnline: true
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) => ({
        ...prev,
        temperature: parseFloat((25 + Math.random() * 8).toFixed(1)),
        humidity: parseInt(60 + Math.random() * 20),
        soilMoisture: parseInt(40 + Math.random() * 25),
        light: parseInt(1000 + Math.random() * 1500),
        lastUpdate: new Date()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="header-top">
          <div className="header-title">
            <div className="logo-wrapper">
              <Leaf size={32} />
            </div>
            <div className="title-group">
              <h1>SmartPlant Dashboard</h1>
              <p>Hệ thống giám sát môi trường cây trồng thông minh</p>
            </div>
          </div>

          <div
            className={`status-indicator ${
              !sensorData.isOnline ? 'offline' : ''
            }`}
          >
            {sensorData.isOnline ? (
              <>
                <div className="status-dot"></div>
                <Wifi size={18} />
                <span>Đang hoạt động</span>
              </>
            ) : (
              <>
                <div className="status-dot"></div>
                <WifiOff size={18} />
                <span>Mất kết nối</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Info Cards Row */}
      <div className="info-cards-row">
        <InfoCard
          icon={Thermometer}
          title="Nhiệt độ hiện tại"
          value={`${sensorData.temperature}°C`}
          subtitle="Trong phạm vi tốt"
          trend={2.5}
        />
        <InfoCard
          icon={Droplets}
          title="Độ ẩm không khí"
          value={`${sensorData.humidity}%`}
          subtitle="Ổn định"
          trend={1.2}
        />
        <InfoCard
          icon={Activity}
          title="Độ ẩm đất"
          value={`${sensorData.soilMoisture}%`}
          subtitle="Cần theo dõi"
          trend={-0.8}
        />
        <InfoCard
          icon={Sun}
          title="Cường độ ánh sáng"
          value={`${sensorData.light}`}
          subtitle="Lux - Tốt"
          trend={3.1}
        />
      </div>

      {/* Main Gauges Grid */}
      <div className="dashboard-grid">
        <TemperatureGauge value={sensorData.temperature} />

        <CircularGauge
          value={sensorData.humidity}
          max={100}
          color="#3b82f6"
          label="Độ ẩm không khí"
          unit="%"
          icon={Droplets}
        />

        <CircularGauge
          value={sensorData.soilMoisture}
          max={100}
          color="#10b981"
          label="Độ ẩm đất"
          unit="%"
          icon={Droplets}
        />

        <LightBar value={sensorData.light} />
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>
          Cập nhật lần cuối: {sensorData.lastUpdate.toLocaleTimeString('vi-VN')}{' '}
          • ESP32 SmartPlant System v2.0
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
