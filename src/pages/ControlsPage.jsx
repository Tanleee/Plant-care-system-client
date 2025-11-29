import React, { useState } from "react";
import {
  Droplet,
  Fan,
  Lightbulb,
  Settings,
  Clock,
  Zap,
  Calendar,
  Plus,
  X,
  Save,
} from "lucide-react";
import "./../assets/controlsPageStyle.css";
import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";

// --- 1. Sub-Components ---

const ScheduleModal = ({ isOpen, onClose, onSave }) => {
  const [newSchedule, setNewSchedule] = useState({
    device: "pump",
    time: "08:00",
    duration: 15,
  });

  const handleSaveClick = () => {
    const schedule = {
      id: Date.now(),
      ...newSchedule,
      active: true,
    };
    onSave(schedule);
  };

  if (!isOpen) return null;

  return (
    <div className="control-modal-overlay">
      <div className="control-modal-container">
        <div className="control-modal-header">
          <h3 className="control-modal-title">Thêm Lịch Trình</h3>
          <button onClick={onClose} className="control-modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="control-modal-body">
          <div className="control-modal-field">
            <label className="control-modal-label">Thiết bị</label>
            <select
              value={newSchedule.device}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, device: e.target.value })
              }
              className="control-modal-input"
            >
              <option value="pump">Máy bơm nước</option>
              <option value="fan">Quạt thông gió</option>
              <option value="light">Đèn chiếu sáng</option>
            </select>
          </div>

          <div className="control-modal-field">
            <label className="control-modal-label">Thời gian bắt đầu</label>
            <input
              type="time"
              value={newSchedule.time}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, time: e.target.value })
              }
              className="control-modal-input"
            />
          </div>

          <div className="control-modal-field">
            <label className="control-modal-label">Thời lượng (phút)</label>
            <input
              type="number"
              value={newSchedule.duration}
              onChange={(e) =>
                setNewSchedule({
                  ...newSchedule,
                  duration: parseInt(e.target.value),
                })
              }
              className="control-modal-input"
            />
          </div>

          <div className="control-modal-actions">
            <button onClick={onClose} className="control-modal-cancel-btn">
              Hủy
            </button>
            <button
              onClick={handleSaveClick}
              className="control-modal-save-btn"
            >
              <Save size={18} />
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ControlHeader = () => {
  return (
    <div className="control-header">
      <h1 className="control-title">
        <Settings size={32} className="control-title-icon" />
        Điều Khiển Thiết Bị
      </h1>
      <p className="control-subtitle">
        Quản lý và điều khiển các thiết bị trong hệ thống
      </p>
    </div>
  );
};

const ModeSelector = ({ currentMode, setMode }) => {
  const modes = [
    {
      value: "manual",
      label: "Thủ công",
      icon: Zap,
      desc: "Điều khiển trực tiếp",
    },
    {
      value: "auto",
      label: "Tự động",
      icon: Settings,
      desc: "Dựa trên cảm biến",
    },
    {
      value: "schedule",
      label: "Lịch trình",
      icon: Calendar,
      desc: "Theo thời gian",
    },
  ];

  return (
    <div className="control-card">
      <h2 className="control-section-title">Chế Độ Hoạt Động</h2>
      <div className="control-mode-grid">
        {modes.map((option) => {
          const Icon = option.icon;
          const isActive = currentMode === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setMode(option.value)}
              className={`control-mode-btn ${
                isActive ? "control-mode-btn-active" : ""
              }`}
            >
              <div className="control-mode-btn-header">
                <Icon size={24} color={isActive ? "#10b981" : "#6b7280"} />
                <span
                  className="control-mode-btn-label"
                  style={{ color: isActive ? "#10b981" : "#1f2937" }}
                >
                  {option.label}
                </span>
              </div>
              <p className="control-mode-btn-desc">{option.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const DeviceCard = ({
  icon: Icon,
  deviceKey,
  deviceData,
  mode,
  onToggle,
  color,
}) => {
  const isOn = deviceData.status;
  const isManual = mode === "manual";

  return (
    <div
      onClick={() => onToggle(deviceKey)}
      className={`control-device-card ${isOn ? "control-device-card-on" : ""} ${
        !isManual ? "control-device-card-disabled" : ""
      }`}
      style={{
        borderColor: isOn ? color : "#e5e7eb",
        boxShadow: isOn ? `0 8px 16px ${color}40` : "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {isOn && (
        <div
          className="control-device-gradient"
          style={{
            background: `linear-gradient(135deg, ${color}10, transparent)`,
          }}
        />
      )}

      <div className="control-device-content">
        <div
          className="control-device-badge"
          style={{ backgroundColor: isOn ? color : "#9ca3af" }}
        >
          {isOn ? "BẬT" : "TẮT"}
        </div>

        <div
          className="control-device-icon"
          style={{ backgroundColor: isOn ? `${color}20` : "#f3f4f6" }}
        >
          <Icon size={40} color={isOn ? color : "#9ca3af"} />
        </div>

        <h3 className="control-device-name">{deviceData.name}</h3>
        <p className="control-device-status">
          {isOn ? "Đang hoạt động" : "Đã tắt"}
        </p>

        {!isManual && (
          <div className="control-device-mode-badge">
            Chế độ {mode === "auto" ? "Tự động" : "Lịch trình"}
          </div>
        )}
      </div>
    </div>
  );
};

const DeviceList = ({ devices, mode, toggleDevice }) => {
  return (
    <div className="control-card">
      <h2 className="control-section-title">Thiết Bị</h2>
      <div className="control-devices-grid">
        <DeviceCard
          icon={Droplet}
          deviceKey="pump"
          deviceData={devices.pump}
          mode={mode}
          onToggle={toggleDevice}
          color="#3b82f6"
        />
        <DeviceCard
          icon={Fan}
          deviceKey="fan"
          deviceData={devices.fan}
          mode={mode}
          onToggle={toggleDevice}
          color="#10b981"
        />
        <DeviceCard
          icon={Lightbulb}
          deviceKey="light"
          deviceData={devices.light}
          mode={mode}
          onToggle={toggleDevice}
          color="#f59e0b"
        />
      </div>
    </div>
  );
};

const AutoSettingsPanel = ({ autoSettings, setAutoSettings }) => {
  return (
    <div className="control-card">
      <h2 className="control-section-title">Cài Đặt Tự Động</h2>
      <div className="control-auto-settings">
        {Object.entries(autoSettings).map(([key, value]) => (
          <div key={key} className="control-auto-setting-item">
            <h3 className="control-auto-setting-title">
              {key === "soilMoisture"
                ? "Độ ẩm đất"
                : key === "temperature"
                ? "Nhiệt độ"
                : "Ánh sáng"}
            </h3>
            <div className="control-auto-setting-inputs">
              <div className="control-auto-input-group">
                <label className="control-auto-input-label">Tối thiểu</label>
                <input
                  type="number"
                  value={value.min}
                  onChange={(e) =>
                    setAutoSettings({
                      ...autoSettings,
                      [key]: { ...value, min: parseInt(e.target.value) },
                    })
                  }
                  className="control-auto-input"
                />
              </div>
              <div className="control-auto-input-group">
                <label className="control-auto-input-label">Tối đa</label>
                <input
                  type="number"
                  value={value.max}
                  onChange={(e) =>
                    setAutoSettings({
                      ...autoSettings,
                      [key]: { ...value, max: parseInt(e.target.value) },
                    })
                  }
                  className="control-auto-input"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="control-save-btn">
        <Save size={18} />
        Lưu cài đặt
      </button>
    </div>
  );
};

const ScheduleList = ({ schedules, setSchedules, devices, onAddClick }) => {
  return (
    <div className="control-card">
      <div className="control-schedule-header">
        <h2 className="control-section-title">Lịch Trình</h2>
        <button onClick={onAddClick} className="control-add-schedule-btn">
          <Plus size={18} />
          Thêm lịch trình
        </button>
      </div>

      <div className="control-schedule-list">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className={`control-schedule-item ${
              schedule.active ? "control-schedule-item-active" : ""
            }`}
          >
            <div className="control-schedule-info">
              <Clock
                size={24}
                color={schedule.active ? "#10b981" : "#6b7280"}
              />
              <div>
                <h4 className="control-schedule-device-name">
                  {devices[schedule.device].name}
                </h4>
                <p className="control-schedule-time">
                  {schedule.time} - {schedule.duration} phút
                </p>
              </div>
            </div>
            <div className="control-schedule-actions">
              <button
                onClick={() => {
                  setSchedules(
                    schedules.map((s) =>
                      s.id === schedule.id ? { ...s, active: !s.active } : s
                    )
                  );
                }}
                className="control-schedule-toggle-btn"
                style={{ color: schedule.active ? "#ef4444" : "#10b981" }}
              >
                {schedule.active ? "Tắt" : "Bật"}
              </button>
              <button
                onClick={() =>
                  setSchedules(schedules.filter((s) => s.id !== schedule.id))
                }
                className="control-schedule-delete-btn"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 2. Main Component ---

const ControlPage = () => {
  const [mode, setMode] = useState("manual");
  const [devices, setDevices] = useState({
    pump: { status: false, name: "Máy bơm nước" },
    fan: { status: false, name: "Quạt thông gió" },
    light: { status: true, name: "Đèn chiếu sáng" },
  });

  const [schedules, setSchedules] = useState([
    { id: 1, device: "pump", time: "06:00", duration: 15, active: true },
    { id: 2, device: "pump", time: "18:00", duration: 15, active: true },
    { id: 3, device: "light", time: "06:00", duration: 720, active: true },
  ]);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [autoSettings, setAutoSettings] = useState({
    soilMoisture: { min: 40, max: 70 },
    temperature: { min: 20, max: 35 },
    light: { min: 500, max: 2000 },
  });

  const toggleDevice = (deviceKey) => {
    if (mode === "manual") {
      setDevices((prev) => ({
        ...prev,
        [deviceKey]: { ...prev[deviceKey], status: !prev[deviceKey].status },
      }));
      console.log(`Toggle ${deviceKey}: ${!devices[deviceKey].status}`);
    }
  };

  const handleSaveSchedule = (newScheduleItem) => {
    setSchedules([...schedules, newScheduleItem]);
    setShowScheduleModal(false);
  };

  return (
    <>
      <NavBar />
      <div className="control-page">
        <ScheduleModal
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          onSave={handleSaveSchedule}
        />

        <ControlHeader />

        <ModeSelector currentMode={mode} setMode={setMode} />

        <DeviceList devices={devices} mode={mode} toggleDevice={toggleDevice} />

        {mode === "auto" && (
          <AutoSettingsPanel
            autoSettings={autoSettings}
            setAutoSettings={setAutoSettings}
          />
        )}

        {mode === "schedule" && (
          <ScheduleList
            schedules={schedules}
            setSchedules={setSchedules}
            devices={devices}
            onAddClick={() => setShowScheduleModal(true)}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ControlPage;
