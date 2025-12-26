import React, { useEffect, useState } from "react";
import {
  Clock,
  Wifi,
  WifiOff,
  Calendar,
  Sun,
  Moon,
  Timer,
  Sparkles,
} from "lucide-react";

import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";

const HomePage = () => {
  // Clock styles: digital, analog, minimal, flip
  const [clockStyle, setClockStyle] = useState("digital");
  const [showChristmas, setShowChristmas] = useState(true);

  const [clockData, setClockData] = useState({
    timeStr: "--:--",
    dateStr: "",
    city: "Hà Nội",
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Snowflakes for Christmas effect
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Generate snowflakes
    if (showChristmas) {
      const flakes = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 5,
        size: 10 + Math.random() * 20,
        delay: Math.random() * 5,
      }));
      setSnowflakes(flakes);
    }
  }, [showChristmas]);

  useEffect(() => {
    const updateClock = () => {
      const savedZone = localStorage.getItem("homeTimeZone") || "Asia/Bangkok";
      const savedCity = localStorage.getItem("homeCityName") || "Hà Nội";
      const now = new Date();

      const timeString = now.toLocaleTimeString("vi-VN", {
        timeZone: savedZone,
        hour: "2-digit",
        minute: "2-digit",
      });

      const dateString = now.toLocaleDateString("vi-VN", {
        timeZone: savedZone,
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      setClockData({
        timeStr: timeString,
        dateStr: dateString,
        city: savedCity,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Analog Clock Component
  const AnalogClock = () => {
    const hourAngle = (clockData.hours % 12) * 30 + clockData.minutes * 0.5;
    const minuteAngle = clockData.minutes * 6;
    const secondAngle = clockData.seconds * 6;

    return (
      <div style={{ position: "relative", width: "300px", height: "300px" }}>
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Clock face */}
          <circle
            cx="150"
            cy="150"
            r="145"
            fill="white"
            stroke="#10b981"
            strokeWidth="4"
          />

          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 150 + 120 * Math.cos(angle);
            const y1 = 150 + 120 * Math.sin(angle);
            const x2 = 150 + 130 * Math.cos(angle);
            const y2 = 150 + 130 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#10b981"
                strokeWidth="3"
              />
            );
          })}

          {/* Hour hand */}
          <line
            x1="150"
            y1="150"
            x2={150 + 60 * Math.sin((hourAngle * Math.PI) / 180)}
            y2={150 - 60 * Math.cos((hourAngle * Math.PI) / 180)}
            stroke="#047857"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Minute hand */}
          <line
            x1="150"
            y1="150"
            x2={150 + 85 * Math.sin((minuteAngle * Math.PI) / 180)}
            y2={150 - 85 * Math.cos((minuteAngle * Math.PI) / 180)}
            stroke="#10b981"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Second hand */}
          <line
            x1="150"
            y1="150"
            x2={150 + 100 * Math.sin((secondAngle * Math.PI) / 180)}
            y2={150 - 100 * Math.cos((secondAngle * Math.PI) / 180)}
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle cx="150" cy="150" r="8" fill="#047857" />
        </svg>
      </div>
    );
  };

  // Flip Clock Component
  const FlipClock = () => {
    const [prevTime, setPrevTime] = useState(clockData.timeStr);
    const [flipping, setFlipping] = useState(false);

    useEffect(() => {
      if (prevTime !== clockData.timeStr) {
        setFlipping(true);
        setTimeout(() => {
          setPrevTime(clockData.timeStr);
          setFlipping(false);
        }, 300);
      }
    }, [clockData.timeStr, prevTime]);

    return (
      <div
        style={{
          display: "flex",
          gap: "20px",
          perspective: "1000px",
        }}
      >
        {clockData.timeStr.split("").map((char, idx) => (
          <div
            key={idx}
            style={{
              width: char === ":" ? "30px" : "80px",
              height: "120px",
              background:
                char === ":"
                  ? "transparent"
                  : "linear-gradient(135deg, #047857, #10b981)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "4rem",
              fontWeight: "800",
              color: "white",
              boxShadow:
                char === ":" ? "none" : "0 10px 30px rgba(5, 150, 105, 0.4)",
              transform: flipping ? "rotateX(90deg)" : "rotateX(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            {char}
          </div>
        ))}
      </div>
    );
  };

  // Minimal Clock Component
  const MinimalClock = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div
        style={{
          fontSize: "8rem",
          fontWeight: "300",
          color: "#047857",
          letterSpacing: "-5px",
          fontFamily: "'Helvetica Neue', sans-serif",
        }}
      >
        {clockData.timeStr}
      </div>
      <div
        style={{
          width: "80%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #10b981, transparent)",
        }}
      />
    </div>
  );

  // Christmas decorations
  const ChristmasDecorations = () => (
    <>
      {/* Snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          style={{
            position: "absolute",
            left: `${flake.left}%`,
            top: "-20px",
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            background: "white",
            borderRadius: "50%",
            opacity: 0.8,
            animation: `fall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            boxShadow: "0 0 10px rgba(255,255,255,0.8)",
          }}
        />
      ))}

      {/* Christmas tree */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "30px",
          fontSize: "80px",
          animation: "sway 3s ease-in-out infinite",
        }}
      >
        🎄
      </div>

      {/* Gifts */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "30px",
          fontSize: "60px",
          animation: "bounce 2s ease-in-out infinite",
        }}
      >
        🎁
      </div>

      {/* Santa */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "50px",
          fontSize: "50px",
          animation: "float 4s ease-in-out infinite",
        }}
      >
        🎅
      </div>

      <style>{`
        @keyframes fall {
          to { transform: translateY(100vh) rotate(360deg); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-10deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
      `}</style>
    </>
  );

  const renderClock = () => {
    switch (clockStyle) {
      case "analog":
        return <AnalogClock />;
      case "flip":
        return <FlipClock />;
      case "minimal":
        return <MinimalClock />;
      default:
        return (
          <div
            style={{
              fontSize: "6rem",
              fontWeight: "800",
              color: "#059669",
              letterSpacing: "-2px",
            }}
          >
            {clockData.timeStr}
          </div>
        );
    }
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)",
          padding: "2rem",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Header */}
        <header
          style={{
            maxWidth: "1400px",
            margin: "0 auto 2.5rem",
            background: "white",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 4px 20px rgba(5, 150, 105, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  background: "linear-gradient(135deg, #059669, #047857)",
                  padding: "0.875rem",
                  borderRadius: "16px",
                  display: "flex",
                  boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
                }}
              >
                <Clock size={32} color="white" />
              </div>
              <div>
                <h1
                  style={{
                    color: "#047857",
                    fontSize: "2rem",
                    fontWeight: "700",
                    marginBottom: "0.25rem",
                  }}
                >
                  Smart Desk Controller
                </h1>
                <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                  Hệ thống quản lý thời gian thông minh
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 1.5rem",
                background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
                borderRadius: "50px",
                border: "2px solid #10b981",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 10px #10b981",
                  animation: "pulse 2s infinite",
                }}
              />
              <Wifi size={18} />
              <span
                style={{
                  color: "#047857",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                }}
              >
                Đã kết nối
              </span>
            </div>
          </div>
        </header>

        {/* Main Clock Card */}
        <div style={{ maxWidth: "1400px", margin: "0 auto 2rem" }}>
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "3rem 2rem",
              boxShadow: "0 4px 20px rgba(5, 150, 105, 0.1)",
              position: "relative",
              overflow: "hidden",
              minHeight: "500px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {showChristmas && <ChristmasDecorations />}

            {/* Clock Style Selector */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "30px",
                zIndex: 10,
                position: "relative",
              }}
            >
              {[
                { id: "digital", icon: <Timer size={20} />, label: "Số" },
                { id: "analog", icon: <Clock size={20} />, label: "Kim" },
                { id: "flip", icon: <Sparkles size={20} />, label: "Lật" },
                { id: "minimal", icon: <Moon size={20} />, label: "Tối giản" },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setClockStyle(style.id)}
                  style={{
                    padding: "12px 20px",
                    borderRadius: "12px",
                    border:
                      clockStyle === style.id
                        ? "2px solid #10b981"
                        : "2px solid #e5e7eb",
                    background: clockStyle === style.id ? "#ecfdf5" : "white",
                    color: clockStyle === style.id ? "#047857" : "#6b7280",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                    fontSize: "0.875rem",
                  }}
                >
                  {style.icon}
                  {style.label}
                </button>
              ))}
            </div>

            {/* Christmas Toggle */}
            <button
              onClick={() => setShowChristmas(!showChristmas)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                padding: "10px 20px",
                borderRadius: "50px",
                border: "2px solid #ef4444",
                background: showChristmas ? "#fee2e2" : "white",
                color: "#dc2626",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "0.875rem",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {showChristmas ? "🎄 Tắt Giáng Sinh" : "🎅 Bật Giáng Sinh"}
            </button>

            {/* City Label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
                zIndex: 10,
                position: "relative",
              }}
            >
              <Clock size={24} color="#10b981" />
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Thời gian tại {clockData.city}
              </span>
            </div>

            {/* Clock Display */}
            <div
              style={{
                margin: "20px 0",
                zIndex: 10,
                position: "relative",
              }}
            >
              {renderClock()}
            </div>

            {/* Date Display */}
            <div
              style={{
                fontSize: "1.5rem",
                color: "#64748b",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "#f1f5f9",
                padding: "8px 24px",
                borderRadius: "50px",
                zIndex: 10,
                position: "relative",
              }}
            >
              <Calendar size={24} color="#64748b" />
              {clockData.dateStr}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            textAlign: "center",
            padding: "1.5rem",
            color: "#6b7280",
            fontSize: "0.875rem",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(5, 150, 105, 0.08)",
          }}
        >
          <p>Smart Desk System v2.0 • Designed by 113 team</p>
        </footer>

        <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
      `}</style>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
