import React, { useState } from "react";
import {
  History,
  Droplet,
  Fan,
  Lightbulb,
  Filter,
  Calendar,
  Download,
  Search,
  Clock,
  User,
  Activity,
} from "lucide-react";
import "./../assets/historyPageStyle.css";
import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";

// --- 1. Helpers & Constants ---

const deviceInfo = {
  pump: { name: "Máy bơm nước", icon: Droplet, color: "#3b82f6" },
  fan: { name: "Quạt thông gió", icon: Fan, color: "#10b981" },
  light: { name: "Đèn chiếu sáng", icon: Lightbulb, color: "#f59e0b" },
};

const modeLabels = {
  auto: "Tự động",
  manual: "Thủ công",
  schedule: "Lịch trình",
};

const formatDateTime = (date) => {
  const now = new Date();
  const diff = now - date;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;

  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// --- 2. Sub-Components ---

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => {
  return (
    <div className="history-stat-card">
      <div
        className="history-stat-icon"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={24} color={color} />
      </div>
      <div className="history-stat-content">
        <span className="history-stat-label">{title}</span>
        <h3 className="history-stat-value">{value}</h3>
        <span className="history-stat-subtitle">{subtitle}</span>
      </div>
    </div>
  );
};

const HistoryHeader = () => {
  return (
    <div className="history-header">
      <div>
        <h1 className="history-title">
          <History size={32} className="history-title-icon" />
          Lịch Sử Hoạt Động
        </h1>
        <p className="history-subtitle">
          Theo dõi lịch sử điều khiển và dữ liệu cảm biến
        </p>
      </div>

      <button className="history-export-btn">
        <Download size={18} />
        Xuất báo cáo
      </button>
    </div>
  );
};

const HistoryStats = () => {
  return (
    <div className="history-stats-grid">
      <StatCard
        title="Tổng thao tác"
        value="127"
        subtitle="Hôm nay"
        icon={Activity}
        color="#10b981"
      />
      <StatCard
        title="Chế độ tự động"
        value="89"
        subtitle="70% tổng số"
        icon={Activity}
        color="#3b82f6"
      />
      <StatCard
        title="Thủ công"
        value="28"
        subtitle="22% tổng số"
        icon={User}
        color="#f59e0b"
      />
      <StatCard
        title="Lịch trình"
        value="10"
        subtitle="8% tổng số"
        icon={Calendar}
        color="#8b5cf6"
      />
    </div>
  );
};

const HistoryTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="history-tabs">
      <button
        className={`history-tab ${
          activeTab === "control" ? "history-tab-active" : ""
        }`}
        onClick={() => setActiveTab("control")}
      >
        <Activity size={18} />
        Lịch sử điều khiển
      </button>
      <button
        className={`history-tab ${
          activeTab === "sensor" ? "history-tab-active" : ""
        }`}
        onClick={() => setActiveTab("sensor")}
      >
        <Activity size={18} />
        Lịch sử cảm biến
      </button>
    </div>
  );
};

const HistoryFilters = ({
  filterType,
  setFilterType,
  filterMode,
  setFilterMode,
  dateRange,
  setDateRange,
  customDateStart,
  setCustomDateStart,
  customDateEnd,
  setCustomDateEnd,
}) => {
  return (
    <div className="history-filters">
      <div className="history-filter-group">
        <label className="history-filter-label">
          <Filter size={16} />
          Thiết bị
        </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="history-filter-select"
        >
          <option value="all">Tất cả</option>
          <option value="pump">Máy bơm</option>
          <option value="fan">Quạt</option>
          <option value="light">Đèn</option>
        </select>
      </div>

      <div className="history-filter-group">
        <label className="history-filter-label">
          <Activity size={16} />
          Chế độ
        </label>
        <select
          value={filterMode}
          onChange={(e) => setFilterMode(e.target.value)}
          className="history-filter-select"
        >
          <option value="all">Tất cả</option>
          <option value="auto">Tự động</option>
          <option value="manual">Thủ công</option>
          <option value="schedule">Lịch trình</option>
        </select>
      </div>

      <div className="history-filter-group">
        <label className="history-filter-label">
          <Calendar size={16} />
          Thời gian
        </label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="history-filter-select"
        >
          <option value="today">Hôm nay</option>
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="custom">Tùy chỉnh</option>
        </select>
      </div>

      {dateRange === "custom" && (
        <>
          <input
            type="date"
            value={customDateStart}
            onChange={(e) => setCustomDateStart(e.target.value)}
            className="history-date-input"
            placeholder="Từ ngày"
          />
          <input
            type="date"
            value={customDateEnd}
            onChange={(e) => setCustomDateEnd(e.target.value)}
            className="history-date-input"
            placeholder="Đến ngày"
          />
        </>
      )}
    </div>
  );
};

const HistorySearchBar = ({ activeTab, searchTerm, setSearchTerm }) => {
  return (
    <div className="history-search-bar">
      <Search size={18} />
      <input
        type="text"
        placeholder={
          activeTab === "control" ? "Tìm kiếm theo thiết bị..." : "Tìm kiếm..."
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="history-search-input"
      />
    </div>
  );
};

const ControlLogItem = ({ log }) => {
  const device = deviceInfo[log.device];
  const Icon = device.icon;

  return (
    <div className="history-log-item">
      <div
        className="history-log-icon"
        style={{ backgroundColor: `${device.color}20` }}
      >
        <Icon size={24} color={device.color} />
      </div>

      <div className="history-log-content">
        <div className="history-log-header">
          <h4 className="history-log-device">{device.name}</h4>
          <span
            className={`history-log-status ${
              log.status ? "status-on" : "status-off"
            }`}
          >
            {log.status ? "BẬT" : "TẮT"}
          </span>
        </div>

        <div className="history-log-details">
          <span className="history-log-mode">
            <Activity size={14} />
            {modeLabels[log.mode]}
          </span>
          <span className="history-log-time">
            <Clock size={14} />
            {formatDateTime(log.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

const SensorLogItem = ({ log }) => {
  return (
    <div className="history-sensor-item">
      <div className="history-sensor-time">
        <Clock size={18} />
        <span>{formatDateTime(log.timestamp)}</span>
      </div>

      <div className="history-sensor-data">
        <div className="history-sensor-metric">
          <span className="sensor-label">Nhiệt độ</span>
          <span className="sensor-value temperature">{log.temperature}°C</span>
        </div>

        <div className="history-sensor-metric">
          <span className="sensor-label">Độ ẩm KK</span>
          <span className="sensor-value humidity">{log.humidity}%</span>
        </div>

        <div className="history-sensor-metric">
          <span className="sensor-label">Độ ẩm đất</span>
          <span className="sensor-value soil">{log.soilMoisture}%</span>
        </div>

        <div className="history-sensor-metric">
          <span className="sensor-label">Ánh sáng</span>
          <span className="sensor-value light">{log.light} Lux</span>
        </div>
      </div>
    </div>
  );
};

const HistoryContent = ({ activeTab, filteredControlLogs, sensorLogs }) => {
  if (activeTab === "control") {
    return (
      <div className="history-log-list">
        {filteredControlLogs.length > 0 ? (
          filteredControlLogs.map((log) => (
            <ControlLogItem key={log.id} log={log} />
          ))
        ) : (
          <div className="history-empty">
            <History size={48} />
            <p>Không có dữ liệu phù hợp</p>
          </div>
        )}
      </div>
    );
  }

  // Sensor Tab
  return (
    <div className="history-sensor-list">
      {sensorLogs.length > 0 ? (
        sensorLogs.map((log) => <SensorLogItem key={log.id} log={log} />)
      ) : (
        <div className="history-empty">
          <Activity size={48} />
          <p>Không có dữ liệu cảm biến</p>
        </div>
      )}
    </div>
  );
};

const HistoryPagination = () => {
  return (
    <div className="history-pagination">
      <button className="history-pagination-btn">Trước</button>
      <div className="history-pagination-pages">
        <button className="history-pagination-page active">1</button>
        <button className="history-pagination-page">2</button>
        <button className="history-pagination-page">3</button>
        <span>...</span>
        <button className="history-pagination-page">10</button>
      </div>
      <button className="history-pagination-btn">Sau</button>
    </div>
  );
};

// --- 3. Main Component ---

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState("control");
  const [filterType, setFilterType] = useState("all");
  const [filterMode, setFilterMode] = useState("all");
  const [dateRange, setDateRange] = useState("today");
  const [searchTerm, setSearchTerm] = useState("");
  const [customDateStart, setCustomDateStart] = useState("");
  const [customDateEnd, setCustomDateEnd] = useState("");

  // Sample data
  const controlLogs = [
    {
      id: 1,
      device: "pump",
      status: true,
      mode: "auto",
      timestamp: new Date("2024-01-15T08:30:00"),
      userId: "507f1f77bcf86cd799439011",
    },
    {
      id: 2,
      device: "light",
      status: false,
      mode: "manual",
      timestamp: new Date("2024-01-15T07:15:00"),
      userId: "507f1f77bcf86cd799439011",
    },
    {
      id: 3,
      device: "fan",
      status: true,
      mode: "schedule",
      timestamp: new Date("2024-01-15T06:00:00"),
      userId: "507f1f77bcf86cd799439011",
    },
    {
      id: 4,
      device: "pump",
      status: false,
      mode: "auto",
      timestamp: new Date("2024-01-14T18:45:00"),
      userId: "507f1f77bcf86cd799439011",
    },
    {
      id: 5,
      device: "light",
      status: true,
      mode: "schedule",
      timestamp: new Date("2024-01-14T06:00:00"),
      userId: "507f1f77bcf86cd799439011",
    },
  ];

  const sensorLogs = [
    {
      id: 1,
      temperature: 28.5,
      humidity: 65,
      soilMoisture: 58,
      light: 1200,
      timestamp: new Date("2024-01-15T08:00:00"),
    },
    {
      id: 2,
      temperature: 27.8,
      humidity: 68,
      soilMoisture: 55,
      light: 980,
      timestamp: new Date("2024-01-15T07:00:00"),
    },
    {
      id: 3,
      temperature: 26.2,
      humidity: 70,
      soilMoisture: 52,
      light: 450,
      timestamp: new Date("2024-01-15T06:00:00"),
    },
  ];

  // Filtering Logic
  const filteredControlLogs = controlLogs.filter((log) => {
    if (filterType !== "all" && log.device !== filterType) return false;
    if (filterMode !== "all" && log.mode !== filterMode) return false;
    // Note: Search term logic wasn't fully implemented in original code, kept as is.
    return true;
  });

  return (
    <>
      <NavBar />
      <div className="history-page">
        <HistoryHeader />

        <HistoryStats />

        <div className="history-card">
          <HistoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "control" && (
            <HistoryFilters
              filterType={filterType}
              setFilterType={setFilterType}
              filterMode={filterMode}
              setFilterMode={setFilterMode}
              dateRange={dateRange}
              setDateRange={setDateRange}
              customDateStart={customDateStart}
              setCustomDateStart={setCustomDateStart}
              customDateEnd={customDateEnd}
              setCustomDateEnd={setCustomDateEnd}
            />
          )}

          <HistorySearchBar
            activeTab={activeTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="history-content">
            <HistoryContent
              activeTab={activeTab}
              filteredControlLogs={filteredControlLogs}
              sensorLogs={sensorLogs}
            />
          </div>

          <HistoryPagination />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HistoryPage;
