import React, { useEffect } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import {
  Droplets,
  Sun,
  Thermometer,
  Activity,
  Wifi,
  WifiOff,
  Leaf,
} from "lucide-react";

import "./../assets/homePageStyle.css";
import CircularGauge from "./../components/home/CircularGauge";
import InfoCard from "./../components/home/InfoCard";
import LightBar from "./../components/home/LightBar";
import TemperatureGauge from "./../components/home/TemperatureGauge";
import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";

const HomePage = () => {
  // Lấy dữ liệu từ loader
  const initialData = useLoaderData();
  const revalidator = useRevalidator();

  // Tính toán sensorData trực tiếp từ initialData - không cần state
  const sensorData = React.useMemo(() => {
    if (initialData) {
      return {
        temperature: initialData.temperature || 0,
        humidity: initialData.humidity || 0,
        soilMoisture: initialData.soilMoisture || 0,
        light: initialData.light || 0,
        lastUpdate: initialData.timestamp
          ? new Date(initialData.timestamp)
          : new Date(),
        isOnline: true,
      };
    }

    // Fallback khi không có dữ liệu
    return {
      temperature: 0,
      humidity: 0,
      soilMoisture: 0,
      light: 0,
      lastUpdate: new Date(),
      isOnline: false,
    };
  }, [initialData]);

  // Auto reload mỗi 5 phút
  useEffect(() => {
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [revalidator]);

  return (
    <>
      <NavBar />
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
                !sensorData.isOnline ? "offline" : ""
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
            Cập nhật lần cuối:{" "}
            {sensorData.lastUpdate.toLocaleTimeString("vi-VN")} • ESP32
            SmartPlant System v2.0
          </p>
        </footer>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
