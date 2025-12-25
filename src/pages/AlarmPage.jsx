import React, { useState, useEffect } from "react";
import getApiUrl from "../utils/getApiUrl";
import "./../assets/alarmPageStyle.css";

const AlarmPage = () => {
  const [alarms, setAlarms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState(22);
  const [selectedMin, setSelectedMin] = useState(10);
  const [alarmName, setAlarmName] = useState("");
  const [selectedDays, setSelectedDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [loading, setLoading] = useState(true);
  const [hourScrollStart, setHourScrollStart] = useState(null);
  const [minScrollStart, setMinScrollStart] = useState(null);

  const dayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  useEffect(() => {
    fetchAlarms();
  }, []);

  const fetchAlarms = async () => {
    try {
      const response = await fetch(getApiUrl("/api/v1/alarm"), {
        credentials: "include",
      });
      const data = await response.json();
      if (data.status === "success") {
        setAlarms(data.data.data);
      }
    } catch (error) {
      console.error("Error fetching alarms:", error);
    } finally {
      setLoading(false);
    }
  };

  const createAlarm = async () => {
    try {
      const response = await fetch(getApiUrl("/api/v1/alarm"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hour: selectedHour,
          min: selectedMin,
          enable: true,
          repeat: selectedDays,
        }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.status === "success") {
        setAlarms([...alarms, data.data.data]);
        closeModal();
      }
    } catch (error) {
      console.error("Error creating alarm:", error);
    }
  };

  const toggleAlarm = async (id, currentState) => {
    try {
      const response = await fetch(getApiUrl(`/api/v1/alarm/${id}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enable: !currentState,
        }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.status === "success") {
        setAlarms(
          alarms.map((alarm) =>
            alarm._id === id ? { ...alarm, enable: !currentState } : alarm
          )
        );
      }
    } catch (error) {
      console.error("Error updating alarm:", error);
    }
  };

  const deleteAlarm = async (id) => {
    try {
      await fetch(getApiUrl(`/api/v1/alarm/${id}`), {
        method: "DELETE",
        credentials: "include",
      });
      setAlarms(alarms.filter((alarm) => alarm._id !== id));
    } catch (error) {
      console.error("Error deleting alarm:", error);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setSelectedHour(22);
    setSelectedMin(10);
    setAlarmName("");
    setSelectedDays([false, false, false, false, false, false, false]);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleDay = (index) => {
    const newDays = [...selectedDays];
    newDays[index] = !newDays[index];
    setSelectedDays(newDays);
  };

  const handleHourScroll = (e) => {
    const delta = e.deltaY;
    if (delta > 0) {
      setSelectedHour((prev) => (prev + 1) % 24);
    } else {
      setSelectedHour((prev) => (prev - 1 + 24) % 24);
    }
  };

  const handleMinScroll = (e) => {
    const delta = e.deltaY;
    if (delta > 0) {
      setSelectedMin((prev) => (prev + 1) % 60);
    } else {
      setSelectedMin((prev) => (prev - 1 + 60) % 60);
    }
  };

  const handleHourTouch = (e) => {
    if (e.type === "touchstart") {
      setHourScrollStart(e.touches[0].clientY);
    } else if (e.type === "touchmove" && hourScrollStart !== null) {
      const delta = hourScrollStart - e.touches[0].clientY;
      if (Math.abs(delta) > 20) {
        if (delta > 0) {
          setSelectedHour((prev) => (prev + 1) % 24);
        } else {
          setSelectedHour((prev) => (prev - 1 + 24) % 24);
        }
        setHourScrollStart(e.touches[0].clientY);
      }
    } else if (e.type === "touchend") {
      setHourScrollStart(null);
    }
  };

  const handleMinTouch = (e) => {
    if (e.type === "touchstart") {
      setMinScrollStart(e.touches[0].clientY);
    } else if (e.type === "touchmove" && minScrollStart !== null) {
      const delta = minScrollStart - e.touches[0].clientY;
      if (Math.abs(delta) > 20) {
        if (delta > 0) {
          setSelectedMin((prev) => (prev + 1) % 60);
        } else {
          setSelectedMin((prev) => (prev - 1 + 60) % 60);
        }
        setMinScrollStart(e.touches[0].clientY);
      }
    } else if (e.type === "touchend") {
      setMinScrollStart(null);
    }
  };

  const getRepeatText = (repeat) => {
    const count = repeat.filter(Boolean).length;
    if (count === 0) return "Hằng ngày";
    if (count === 7) return "Hằng ngày";
    return "Tùy chỉnh";
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="alarmpage-container">
      <div className="alarmpage-header">
        <div className="alarmpage-header-content">
          <div className="alarmpage-bell-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <h1 className="alarmpage-title">Quản lý Báo thức</h1>
            <p className="alarmpage-subtitle">Đồng bộ với Smart Desk Clock</p>
          </div>
        </div>
        <div className="alarmpage-status">
          <span className="alarmpage-status-count">{alarms.length}</span> đang
          bật
        </div>
      </div>

      <div className="alarmpage-create-section">
        <button className="alarmpage-create-btn" onClick={openModal}>
          <span className="alarmpage-plus-icon">+</span>
          Thiết lập báo thức mới
        </button>
      </div>

      <div className="alarmpage-list">
        {loading ? (
          <div className="alarmpage-loading">Đang tải...</div>
        ) : alarms.length === 0 ? (
          <div className="alarmpage-empty">Chưa có báo thức nào</div>
        ) : (
          alarms.map((alarm) => (
            <div key={alarm._id} className="alarmpage-item">
              <div className="alarmpage-item-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="alarmpage-item-content">
                <div className="alarmpage-item-time">
                  {String(alarm.hour).padStart(2, "0")}:
                  {String(alarm.min).padStart(2, "0")}
                </div>
                <div className="alarmpage-item-info">
                  <span className="alarmpage-item-label">Báo thức</span>
                  <span className="alarmpage-item-repeat">
                    {getRepeatText(alarm.repeat)}
                  </span>
                </div>
              </div>
              <div className="alarmpage-item-actions">
                <label className="alarmpage-toggle">
                  <input
                    type="checkbox"
                    checked={alarm.enable}
                    onChange={() => toggleAlarm(alarm._id, alarm.enable)}
                  />
                  <span className="alarmpage-toggle-slider"></span>
                </label>
                <button
                  className="alarmpage-delete-btn"
                  onClick={() => deleteAlarm(alarm._id)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 7H15M8 10V14M12 10V14M13 7V5C13 4.44772 12.5523 4 12 4H8C7.44772 4 7 4.44772 7 5V7M6 7H14L13.5 16C13.5 16.5523 13.0523 17 12.5 17H7.5C6.94772 17 6.5 16.5523 6.5 16L6 7Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="alarmpage-modal-overlay" onClick={closeModal}>
          <div className="alarmpage-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="alarmpage-modal-title">Đặt báo thức</h2>

            <div className="alarmpage-time-picker">
              <div
                className="alarmpage-time-column"
                onWheel={handleHourScroll}
                onTouchStart={handleHourTouch}
                onTouchMove={handleHourTouch}
                onTouchEnd={handleHourTouch}
              >
                <div className="alarmpage-time-value">
                  {String((selectedHour - 1 + 24) % 24).padStart(2, "0")}
                </div>
                <div className="alarmpage-time-selected">
                  {String(selectedHour).padStart(2, "0")}
                </div>
                <div className="alarmpage-time-value">
                  {String((selectedHour + 1) % 24).padStart(2, "0")}
                </div>
              </div>
              <div className="alarmpage-time-separator">:</div>
              <div
                className="alarmpage-time-column"
                onWheel={handleMinScroll}
                onTouchStart={handleMinTouch}
                onTouchMove={handleMinTouch}
                onTouchEnd={handleMinTouch}
              >
                <div className="alarmpage-time-value">
                  {String((selectedMin - 1 + 60) % 60).padStart(2, "0")}
                </div>
                <div className="alarmpage-time-selected">
                  {String(selectedMin).padStart(2, "0")}
                </div>
                <div className="alarmpage-time-value">
                  {String((selectedMin + 1) % 60).padStart(2, "0")}
                </div>
              </div>
            </div>

            <input
              type="text"
              className="alarmpage-name-input"
              placeholder="Nhập tên (VD: Uống thuốc)..."
              value={alarmName}
              onChange={(e) => setAlarmName(e.target.value)}
            />

            <div className="alarmpage-days-selector">
              {dayLabels.map((day, index) => (
                <button
                  key={index}
                  className={`alarmpage-day-btn ${
                    selectedDays[index] ? "alarmpage-day-active" : ""
                  }`}
                  onClick={() => toggleDay(index)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="alarmpage-modal-actions">
              <button className="alarmpage-cancel-btn" onClick={closeModal}>
                Hủy
              </button>
              <button className="alarmpage-save-btn" onClick={createAlarm}>
                Lưu thiết lập
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlarmPage;
