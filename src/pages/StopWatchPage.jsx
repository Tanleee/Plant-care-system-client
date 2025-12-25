import React, { useState, useEffect, useRef } from "react";
import "./../assets/stopwatchStyles.css";

import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";

// Component Bấm Giờ (Stopwatch)
const StopwatchPage = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setMilliseconds((prev) => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millis = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(millis).padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMilliseconds(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, milliseconds]);
    }
  };

  return (
    <>
      <NavBar />
      <div className="stopwatch-page-container">
        <div className="stopwatch-content-wrapper">
          <div className="stopwatch-header-section">
            <div className="stopwatch-icon-wrapper">
              <svg
                className="stopwatch-icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <polyline points="12 6 12 12 16 14" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="stopwatch-page-title">Bấm Giờ</h1>
          </div>

          <div className="stopwatch-display-box">
            <div className="stopwatch-time-display">
              {formatTime(milliseconds)}
            </div>
          </div>

          <div className="stopwatch-button-group">
            <button
              className={`stopwatch-btn stopwatch-btn-primary ${
                isRunning ? "stopwatch-btn-stop" : ""
              }`}
              onClick={handleStartStop}
            >
              {isRunning ? "Dừng" : "Bắt đầu"}
            </button>
            <button
              className="stopwatch-btn stopwatch-btn-secondary"
              onClick={handleLap}
              disabled={!isRunning}
            >
              Vòng
            </button>
            <button
              className="stopwatch-btn stopwatch-btn-reset"
              onClick={handleReset}
            >
              Đặt lại
            </button>
          </div>

          {laps.length > 0 && (
            <div className="stopwatch-laps-container">
              <h3 className="stopwatch-laps-title">Các vòng đã ghi:</h3>
              <div className="stopwatch-laps-list">
                {laps.map((lap, index) => (
                  <div key={index} className="stopwatch-lap-item">
                    <span className="stopwatch-lap-number">
                      Vòng {laps.length - index}
                    </span>
                    <span className="stopwatch-lap-time">
                      {formatTime(lap)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StopwatchPage;
