import React, { useState, useEffect } from "react";
import { Globe, Plus, X, Home, CheckCircle } from "lucide-react";
import "./../assets/controlsPageStyle.css";

import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";
import WorldClockMap from "../components/WorldClockMap";

// Dữ liệu các múi giờ có sẵn
const AVAILABLE_ZONES = [
  { city: "Hà Nội", zone: "Asia/Bangkok", lat: 21.0285, lng: 105.8542 },
  { city: "Tokyo", zone: "Asia/Tokyo", lat: 35.6762, lng: 139.6503 },
  { city: "Seoul", zone: "Asia/Seoul", lat: 37.5665, lng: 126.978 },
  { city: "New York", zone: "America/New_York", lat: 40.7128, lng: -74.006 },
  { city: "London", zone: "Europe/London", lat: 51.5074, lng: -0.1278 },
  { city: "Sydney", zone: "Australia/Sydney", lat: -33.8688, lng: 151.2093 },
  { city: "Paris", zone: "Europe/Paris", lat: 48.8566, lng: 2.3522 },
  { city: "Dubai", zone: "Asia/Dubai", lat: 25.2048, lng: 55.2708 },
  {
    city: "Los Angeles",
    zone: "America/Los_Angeles",
    lat: 34.0522,
    lng: -118.2437,
  },
  { city: "Moscow", zone: "Europe/Moscow", lat: 55.7558, lng: 37.6173 },
  { city: "Singapore", zone: "Asia/Singapore", lat: 1.3521, lng: 103.8198 },
  { city: "Berlin", zone: "Europe/Berlin", lat: 52.52, lng: 13.405 },
  {
    city: "Rio de Janeiro",
    zone: "America/Sao_Paulo",
    lat: -22.9068,
    lng: -43.1729,
  },
  {
    city: "Cape Town",
    zone: "Africa/Johannesburg",
    lat: -33.9249,
    lng: 18.4241,
  },
];

const WordlClockPage = () => {
  // --- STATE ---
  const [clocks, setClocks] = useState([
    {
      id: 1,
      city: "Hà Nội",
      zone: "Asia/Bangkok",
      lat: 21.0285,
      lng: 105.8542,
    },
    {
      id: 2,
      city: "London",
      zone: "Europe/London",
      lat: 51.5074,
      lng: -0.1278,
    },
    {
      id: 3,
      city: "New York",
      zone: "America/New_York",
      lat: 40.7128,
      lng: -74.006,
    },
    { id: 4, city: "Tokyo", zone: "Asia/Tokyo", lat: 35.6762, lng: 139.6503 },
  ]);

  const [selectedZone, setSelectedZone] = useState(AVAILABLE_ZONES[0].zone);
  const [now, setNow] = useState(new Date());
  // Lấy cài đặt Home từ bộ nhớ
  const [homeZone, setHomeZone] = useState(
    localStorage.getItem("homeTimeZone") || "Asia/Bangkok"
  );

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Thêm đồng hồ
  const handleAddClock = () => {
    const cityObj = AVAILABLE_ZONES.find((z) => z.zone === selectedZone);
    if (cityObj) {
      if (!clocks.find((c) => c.zone === cityObj.zone)) {
        setClocks([...clocks, { id: Date.now(), ...cityObj }]);
      } else {
        alert(`Đồng hồ ${cityObj.city} đã được thêm rồi!`);
      }
    }
  };

  // Xóa đồng hồ
  const handleRemoveClock = (id) => {
    setClocks(clocks.filter((c) => c.id !== id));
  };

  // Đặt làm Trang Chủ
  const handleSetHome = (zone, city) => {
    localStorage.setItem("homeTimeZone", zone);
    localStorage.setItem("homeCityName", city);
    setHomeZone(zone);
    alert(`Đã đặt ${city} làm giờ hiển thị trên Trang Chủ!`);
  };

  // --- COMPONENT THẺ ĐỒNG HỒ ---
  const WorldClockCard = ({ id, city, zone }) => {
    const timeInZoneStr = now.toLocaleString("en-US", { timeZone: zone });
    const timeInZone = new Date(timeInZoneStr);
    const hours = timeInZone.getHours();
    const minutes = timeInZone.getMinutes();
    const seconds = timeInZone.getSeconds();

    // Tính góc quay kim đồng hồ
    const secondDeg = (seconds / 60) * 360;
    const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
    const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

    // Format hiển thị text
    const timeString = timeInZone.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateString = timeInZone.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "numeric",
      month: "numeric",
    });
    const isNight = hours >= 18 || hours < 6;
    const isHome = homeZone === zone;

    return (
      <div
        className={`clock-card ${isNight ? "night" : ""}`}
        style={{ border: isHome ? "2px solid #10b981" : "1px solid white" }}
      >
        {/* NÚT XÓA ĐỒNG HỒ (Nằm bên trong thẻ để CSS hover hoạt động) */}
        <button
          className="btn-remove-clock"
          onClick={() => handleRemoveClock(id)}
          title="Xóa đồng hồ này"
        >
          <X size={16} />
        </button>

        {/* Mặt đồng hồ kim */}
        <div className="analog-face">
          <div
            className="hand hour"
            style={{ transform: `rotate(${hourDeg}deg)` }}
          ></div>
          <div
            className="hand minute"
            style={{ transform: `rotate(${minuteDeg}deg)` }}
          ></div>
          <div
            className="hand second"
            style={{ transform: `rotate(${secondDeg}deg)` }}
          ></div>
        </div>

        <div className="city-name">
          {city}{" "}
          {isHome && (
            <CheckCircle
              size={14}
              color="#10b981"
              style={{ display: "inline" }}
            />
          )}
        </div>
        <div className="digital-time">{timeString}</div>
        <div className="date-info">
          {dateString} • {isNight ? "🌙 Đêm" : "☀️ Ngày"}
        </div>

        {/* Nút đặt làm Home */}
        <button
          onClick={() => handleSetHome(zone, city)}
          style={{
            marginTop: "10px",
            padding: "6px 12px",
            background: isHome ? "#10b981" : "#f3f4f6",
            color: isHome ? "white" : "#374151",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.85rem",
            fontWeight: "500",
            transition: "0.2s",
          }}
        >
          <Home size={14} /> {isHome ? "Đã chọn" : "Hiện trang chủ"}
        </button>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <div className="controls-page">
        <div className="controls-container">
          <div className="world-header">
            <div className="header-title">
              <h1>
                <Globe size={32} color="#059669" /> Giờ Thế Giới
              </h1>
              <p>Quản lý thời gian & Cài đặt hiển thị Trang chủ</p>
            </div>
            <div className="add-city-group">
              <select
                className="city-select"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
              >
                {AVAILABLE_ZONES.map((z) => (
                  <option key={z.zone} value={z.zone}>
                    {z.city}
                  </option>
                ))}
              </select>
              <button className="btn-add-city" onClick={handleAddClock}>
                <Plus size={18} /> Thêm
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <WorldClockMap cities={clocks} />
          </div>

          <div className="clock-grid">
            {clocks.map((clock) => (
              <WorldClockCard
                key={clock.id}
                id={clock.id}
                city={clock.city}
                zone={clock.zone}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WordlClockPage;
