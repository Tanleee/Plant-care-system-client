import React, { useState, useEffect, useRef } from "react";
import { useLoaderData } from "react-router";
import { Bell, Plus, Trash2, Clock } from "lucide-react";
import "./../assets/chartsPageStyle.css";

import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";

const AlarmPage = () => {
  // Lấy dữ liệu từ loader
  const loadedAlarms = useLoaderData();

  // --- STATE ---
  const [alarms, setAlarms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // State cho Modal (Giờ, Phút, Tên, Ngày lặp lại)
  const [selectedHour, setSelectedHour] = useState("08");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [tempLabel, setTempLabel] = useState("");
  const [tempDays, setTempDays] = useState([]); // Mảng chứa các ngày được chọn

  // Ref cuộn
  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  // Danh sách các ngày trong tuần để render nút
  const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  // --- LOAD DỮ LIỆU TỪ API ---
  useEffect(() => {
    if (loadedAlarms && loadedAlarms.length > 0) {
      // Chuyển đổi dữ liệu từ API sang format của UI
      const formattedAlarms = loadedAlarms.map((alarm) => ({
        id: alarm._id || alarm.id,
        time: `${alarm.hour.toString().padStart(2, "0")}:${alarm.min
          .toString()
          .padStart(2, "0")}`,
        label: alarm.label || "Báo thức",
        days: convertRepeatArrayToDays(alarm.repeat),
        isActive: alarm.enable,
      }));
      setAlarms(formattedAlarms);
    }
  }, [loadedAlarms]);

  // Hàm chuyển đổi mảng repeat [true, false, ...] sang ["T2", "T3", ...]
  const convertRepeatArrayToDays = (repeatArray) => {
    if (!repeatArray || repeatArray.length !== 7) return [];
    const days = [];
    const dayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    repeatArray.forEach((isActive, index) => {
      if (isActive) {
        days.push(dayLabels[index]);
      }
    });
    return days;
  };

  // Hàm chuyển đổi mảng days ["T2", "T3", ...] sang repeat array [true, false, ...]
  const convertDaysToRepeatArray = (days) => {
    const dayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    return dayLabels.map((day) => days.includes(day));
  };

  // --- HANDLERS ---

  const handleOpenModal = () => {
    const now = new Date();
    setSelectedHour(now.getHours().toString().padStart(2, "0"));
    setSelectedMinute(now.getMinutes().toString().padStart(2, "0"));
    setTempLabel("");
    setTempDays([]);
    setShowModal(true);
  };

  // Cuộn tự động
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        const hourEl = document.getElementById(`hour-${selectedHour}`);
        const minuteEl = document.getElementById(`minute-${selectedMinute}`);
        if (hourEl)
          hourEl.scrollIntoView({ block: "center", behavior: "smooth" });
        if (minuteEl)
          minuteEl.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 100);
    }
  }, [showModal, selectedHour, selectedMinute]);

  // Xử lý chọn/bỏ chọn ngày
  const toggleDay = (day) => {
    if (tempDays.includes(day)) {
      setTempDays(tempDays.filter((d) => d !== day));
    } else {
      setTempDays([...tempDays, day]);
    }
  };

  // Lưu báo thức (GỌI API CREATE)
  const handleSaveAlarm = async () => {
    try {
      const newAlarmData = {
        hour: parseInt(selectedHour),
        min: parseInt(selectedMinute),
        label: tempLabel || "Báo thức",
        repeat: convertDaysToRepeatArray(tempDays),
        enable: true,
      };

      const response = await fetch("/api/v1/alarm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAlarmData),
        credentials: "include", // Để gửi cookie authentication
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create alarm");
      }

      const responseData = await response.json();
      const createdAlarm =
        responseData.data?.alarm || responseData.data || responseData;

      // Thêm vào state local
      const formattedAlarm = {
        id: createdAlarm._id || createdAlarm.id,
        time: `${selectedHour}:${selectedMinute}`,
        label: tempLabel || "Báo thức",
        days: tempDays,
        isActive: true,
      };

      setAlarms([formattedAlarm, ...alarms]);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating alarm:", error);
      alert(`Không thể tạo báo thức: ${error.message}`);
    }
  };

  // Xóa báo thức (GỌI API DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa báo thức này?")) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/alarm/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete alarm");
      }

      setAlarms(alarms.filter((alarm) => alarm.id !== id));
    } catch (error) {
      console.error("Error deleting alarm:", error);
      alert(`Không thể xóa báo thức: ${error.message}`);
    }
  };

  // Toggle bật/tắt báo thức (GỌI API UPDATE)
  const handleToggle = async (id) => {
    try {
      const alarm = alarms.find((a) => a.id === id);
      if (!alarm) return;

      const updatedData = {
        enable: !alarm.isActive,
      };

      const response = await fetch(`/api/v1/alarm/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update alarm");
      }

      setAlarms(
        alarms.map((alarm) =>
          alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
        )
      );
    } catch (error) {
      console.error("Error updating alarm:", error);
      alert(`Không thể cập nhật báo thức: ${error.message}`);
    }
  };

  // Hàm hiển thị text ngày lặp lại cho đẹp
  const formatDays = (days) => {
    if (!days || days.length === 0) return "Một lần";
    if (days.length === 7) return "Hàng ngày";
    if (days.length === 5 && !days.includes("T7") && !days.includes("CN"))
      return "Thứ 2 - Thứ 6";
    if (days.length === 2 && days.includes("T7") && days.includes("CN"))
      return "Cuối tuần";
    return days.join(", ");
  };

  const activeCount = alarms.filter((a) => a.isActive).length;
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <>
      <NavBar />

      <div className="charts-page">
        <div className="alarm-container">
          {/* Header */}
          <div className="alarm-header">
            <div className="alarm-title">
              <div
                style={{
                  background: "#d1fae5",
                  padding: 10,
                  borderRadius: "50%",
                  color: "#059669",
                }}
              >
                <Bell size={28} />
              </div>
              <div>
                <h1>Quản lý Báo thức</h1>
                <p>Đồng bộ với Smart Desk Clock</p>
              </div>
            </div>
            <div className="alarm-count-badge">{activeCount} đang bật</div>
          </div>

          <div
            className="add-alarm-card"
            style={{
              flexDirection: "row",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            <button className="btn-open-modal" onClick={handleOpenModal}>
              <Plus size={24} /> Thiết lập báo thức mới
            </button>
          </div>

          {/* Danh sách báo thức */}
          <div className="alarm-list">
            {alarms.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#6b7280",
                }}
              >
                <p>Chưa có báo thức nào. Hãy thêm báo thức mới!</p>
              </div>
            ) : (
              alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className={`alarm-item ${
                    !alarm.isActive ? "inactive" : "active"
                  }`}
                >
                  <div className="alarm-info">
                    <div className="alarm-icon-box">
                      <Clock size={24} />
                    </div>
                    <div className="alarm-text">
                      <h3>{alarm.time}</h3>
                      <p style={{ fontWeight: "bold", color: "#374151" }}>
                        {alarm.label}
                      </p>
                      <span className="alarm-days">
                        {formatDays(alarm.days)}
                      </span>
                    </div>
                  </div>
                  <div className="alarm-actions">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={alarm.isActive}
                        onChange={() => handleToggle(alarm.id)}
                      />
                      <span className="slider"></span>
                    </label>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(alarm.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --- MODAL (POPUP) TỐI GIẢN --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Đặt báo thức</h3>
            </div>

            {/* 1. Time Picker (Bánh xe số) */}
            <div className="custom-time-picker">
              {/* Cột Giờ */}
              <div className="picker-column" ref={hourRef}>
                <div className="spacer" style={{ height: 65 }}></div>
                {hours.map((h) => (
                  <div
                    key={h}
                    id={`hour-${h}`}
                    className={`picker-item ${
                      selectedHour === h ? "selected" : ""
                    }`}
                    onClick={() => setSelectedHour(h)}
                  >
                    {h}
                  </div>
                ))}
                <div className="spacer" style={{ height: 65 }}></div>
              </div>

              {/* Dấu hai chấm */}
              <div className="time-separator">:</div>

              {/* Cột Phút */}
              <div className="picker-column" ref={minuteRef}>
                <div className="spacer" style={{ height: 65 }}></div>
                {minutes.map((m) => (
                  <div
                    key={m}
                    id={`minute-${m}`}
                    className={`picker-item ${
                      selectedMinute === m ? "selected" : ""
                    }`}
                    onClick={() => setSelectedMinute(m)}
                  >
                    {m}
                  </div>
                ))}
                <div className="spacer" style={{ height: 65 }}></div>
              </div>
            </div>

            {/* 2. Nhập tên */}
            <div className="simple-input-group">
              <input
                type="text"
                className="simple-text-input"
                placeholder="Nhập tên (VD: Uống thuốc)..."
                value={tempLabel}
                onChange={(e) => setTempLabel(e.target.value)}
              />
            </div>

            {/* 3. Chọn ngày */}
            <div className="clean-day-selector">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className={`clean-day-btn ${
                    tempDays.includes(day) ? "selected" : ""
                  }`}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
              <button className="btn-confirm" onClick={handleSaveAlarm}>
                Lưu thiết lập
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AlarmPage;
