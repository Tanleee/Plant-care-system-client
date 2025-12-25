import React, { useState, useEffect, useRef } from "react";
import { Hourglass } from "lucide-react";
import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";
import "./../assets/timerStyles.css";

const TimerPage = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSettingMode, setIsSettingMode] = useState(true);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
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
  }, [isRunning, remainingSeconds]);

  const formatTimeDisplay = (totalSecs) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const handleStart = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total > 0) {
      setTotalSeconds(total);
      setRemainingSeconds(total);
      setIsSettingMode(false);
      setIsRunning(true);
    }
  };

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  const handleNewTimer = () => {
    setIsRunning(false);
    setIsSettingMode(true);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setRemainingSeconds(0);
    setTotalSeconds(0);
  };

  const progressPercentage =
    totalSeconds > 0
      ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100
      : 0;

  return (
    <>
      <NavBar />
      <div className="timer-page-container">
        <div className="timer-content-wrapper">
          <div className="timer-header-section">
            <div className="timer-icon-wrapper">
              {/* <svg
                className="timer-icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M12 6v6l4 2" strokeWidth="2" />
              </svg> */}
              <Hourglass className="timer-icon-svg" />
            </div>
            <h1 className="timer-page-title">Hẹn Giờ</h1>
          </div>

          {isSettingMode ? (
            <>
              <div className="timer-inputs">
                <div className="timer-input-group">
                  <label className="timer-input-label">Giờ</label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={hours}
                    onChange={(e) =>
                      setHours(
                        Math.max(0, Math.min(23, parseInt(e.target.value) || 0))
                      )
                    }
                    className="timer-input-field"
                  />
                </div>
                <div className="timer-input-separator">:</div>
                <div className="timer-input-group">
                  <label className="timer-input-label">Phút</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) =>
                      setMinutes(
                        Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
                      )
                    }
                    className="timer-input-field"
                  />
                </div>
                <div className="timer-input-separator">:</div>
                <div className="timer-input-group">
                  <label className="timer-input-label">Giây</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) =>
                      setSeconds(
                        Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
                      )
                    }
                    className="timer-input-field"
                  />
                </div>
              </div>

              <div className="timer-button-group">
                <button
                  className="timer-btn timer-btn-primary"
                  onClick={handleStart}
                  disabled={hours === 0 && minutes === 0 && seconds === 0}
                >
                  Bắt đầu
                </button>
              </div>

              <div className="timer-quick-timers">
                <h3 className="timer-quick-title">Thời gian nhanh:</h3>
                <div className="timer-quick-buttons">
                  <button
                    className="timer-quick-btn"
                    onClick={() => {
                      setMinutes(1);
                      setSeconds(0);
                      setHours(0);
                    }}
                  >
                    1 phút
                  </button>
                  <button
                    className="timer-quick-btn"
                    onClick={() => {
                      setMinutes(5);
                      setSeconds(0);
                      setHours(0);
                    }}
                  >
                    5 phút
                  </button>
                  <button
                    className="timer-quick-btn"
                    onClick={() => {
                      setMinutes(10);
                      setSeconds(0);
                      setHours(0);
                    }}
                  >
                    10 phút
                  </button>
                  <button
                    className="timer-quick-btn"
                    onClick={() => {
                      setMinutes(15);
                      setSeconds(0);
                      setHours(0);
                    }}
                  >
                    15 phút
                  </button>
                  <button
                    className="timer-quick-btn"
                    onClick={() => {
                      setMinutes(30);
                      setSeconds(0);
                      setHours(0);
                    }}
                  >
                    30 phút
                  </button>
                  <button
                    className="timer-quick-btn"
                    onClick={() => {
                      setHours(1);
                      setMinutes(0);
                      setSeconds(0);
                    }}
                  >
                    1 giờ
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="timer-display-box">
                <div className="timer-progress-ring">
                  <svg className="timer-progress-svg" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="#d1f4e0"
                      strokeWidth="12"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 85}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 85 * (1 - progressPercentage / 100)
                      }`}
                      transform="rotate(-90 100 100)"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="timer-time-display">
                    {formatTimeDisplay(remainingSeconds)}
                  </div>
                </div>
              </div>

              <div className="timer-button-group">
                <button
                  className={`timer-btn timer-btn-primary ${
                    isRunning ? "timer-btn-stop" : ""
                  }`}
                  onClick={handlePauseResume}
                >
                  {isRunning ? "Tạm dừng" : "Tiếp tục"}
                </button>
                <button
                  className="timer-btn timer-btn-reset"
                  onClick={handleReset}
                >
                  Đặt lại
                </button>
                <button
                  className="timer-btn timer-btn-secondary"
                  onClick={handleNewTimer}
                >
                  Hẹn giờ mới
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TimerPage;
