import React, { useState, useMemo } from "react";
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
import { useLoaderData } from "react-router";
import "./../assets/historyPageStyle.css";
import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";

// --- 1. Helpers & Constants ---

const deviceInfo = {
  pump: { name: "Máy bơm nước", icon: Droplet, color: "#3b82f6" },
  pumper: { name: "Máy bơm nước", icon: Droplet, color: "#3b82f6" }, // Alias for API
  fan: { name: "Quạt thông gió", icon: Fan, color: "#10b981" },
  light: { name: "Đèn chiếu sáng", icon: Lightbulb, color: "#f59e0b" },
};

const modeLabels = {
  auto: "Tự động",
  manual: "Thủ công",
  schedule: "Lịch trình",
};

const formatDateTime = (dateInput) => {
  const date = new Date(dateInput);
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

// Filter logs by date range
const filterByDateRange = (logs, dateRange, customDateStart, customDateEnd) => {
  const now = new Date();

  return logs.filter((log) => {
    const logDate = new Date(log.timestamp);

    switch (dateRange) {
      case "today":
        return logDate.toDateString() === now.toDateString();

      case "week":
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return logDate >= weekAgo;

      case "month":
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return logDate >= monthAgo;

      case "custom":
        if (!customDateStart || !customDateEnd) return true;
        const start = new Date(customDateStart);
        const end = new Date(customDateEnd);
        end.setHours(23, 59, 59, 999); // Include the entire end day
        return logDate >= start && logDate <= end;

      default:
        return true;
    }
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

const HistoryStats = ({ controlLogs }) => {
  const stats = useMemo(() => {
    if (!controlLogs || controlLogs.length === 0) {
      return {
        total: 0,
        auto: 0,
        manual: 0,
        schedule: 0,
        autoPercent: 0,
        manualPercent: 0,
        schedulePercent: 0,
      };
    }

    const total = controlLogs.length;
    const auto = controlLogs.filter((log) => log.mode === "auto").length;
    const manual = controlLogs.filter((log) => log.mode === "manual").length;
    const schedule = controlLogs.filter(
      (log) => log.mode === "schedule"
    ).length;

    return {
      total,
      auto,
      manual,
      schedule,
      autoPercent: total > 0 ? Math.round((auto / total) * 100) : 0,
      manualPercent: total > 0 ? Math.round((manual / total) * 100) : 0,
      schedulePercent: total > 0 ? Math.round((schedule / total) * 100) : 0,
    };
  }, [controlLogs]);

  return (
    <div className="history-stats-grid">
      <StatCard
        title="Tổng thao tác"
        value={stats.total}
        subtitle="Tất cả"
        icon={Activity}
        color="#10b981"
      />
      <StatCard
        title="Chế độ tự động"
        value={stats.auto}
        subtitle={`${stats.autoPercent}% tổng số`}
        icon={Activity}
        color="#3b82f6"
      />
      <StatCard
        title="Thủ công"
        value={stats.manual}
        subtitle={`${stats.manualPercent}% tổng số`}
        icon={User}
        color="#f59e0b"
      />
      <StatCard
        title="Lịch trình"
        value={stats.schedule}
        subtitle={`${stats.schedulePercent}% tổng số`}
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
          <option value="pumper">Máy bơm</option>
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
  const device = deviceInfo[log.device] || deviceInfo.pump;
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
            {modeLabels[log.mode] || log.mode}
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
          <span className="sensor-value temperature">
            {log.temperature?.toFixed(1) || "--"}°C
          </span>
        </div>

        <div className="history-sensor-metric">
          <span className="sensor-label">Độ ẩm KK</span>
          <span className="sensor-value humidity">
            {log.humidity?.toFixed(1) || "--"}%
          </span>
        </div>

        <div className="history-sensor-metric">
          <span className="sensor-label">Độ ẩm đất</span>
          <span className="sensor-value soil">
            {log.soilMoisture?.toFixed(1) || "--"}%
          </span>
        </div>

        <div className="history-sensor-metric">
          <span className="sensor-label">Ánh sáng</span>
          <span className="sensor-value light">
            {log.light?.toFixed(0) || "--"} Lux
          </span>
        </div>
      </div>
    </div>
  );
};

const HistoryContent = ({
  activeTab,
  filteredControlLogs,
  filteredSensorLogs,
}) => {
  if (activeTab === "control") {
    return (
      <div className="history-log-list">
        {filteredControlLogs.length > 0 ? (
          filteredControlLogs.map((log, index) => (
            <ControlLogItem key={log._id || log.id || index} log={log} />
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
      {filteredSensorLogs.length > 0 ? (
        filteredSensorLogs.map((log, index) => (
          <SensorLogItem key={log._id || log.id || index} log={log} />
        ))
      ) : (
        <div className="history-empty">
          <Activity size={48} />
          <p>Không có dữ liệu cảm biến</p>
        </div>
      )}
    </div>
  );
};

const HistoryPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="history-pagination">
      <button
        className="history-pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Trước
      </button>
      <div className="history-pagination-pages">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`}>...</span>
          ) : (
            <button
              key={page}
              className={`history-pagination-page ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        className="history-pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Sau
      </button>
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Get real data from loader
  const historyData = useLoaderData();

  // Extract data arrays (handle both direct array and wrapped in .data)
  const controlLogs = useMemo(() => {
    const logs = historyData?.controlLog || [];
    return Array.isArray(logs) ? logs : [];
  }, [historyData]);

  const sensorLogs = useMemo(() => {
    const logs = historyData?.sensorData || [];
    return Array.isArray(logs) ? logs : [];
  }, [historyData]);

  // Filter control logs
  const filteredControlLogs = useMemo(() => {
    let filtered = [...controlLogs];

    // Filter by device type
    if (filterType !== "all") {
      filtered = filtered.filter(
        (log) =>
          log.device === filterType ||
          (filterType === "pump" && log.device === "pumper") ||
          (filterType === "pumper" && log.device === "pump")
      );
    }

    // Filter by mode
    if (filterMode !== "all") {
      filtered = filtered.filter((log) => log.mode === filterMode);
    }

    // Filter by date range
    filtered = filterByDateRange(
      filtered,
      dateRange,
      customDateStart,
      customDateEnd
    );

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((log) => {
        const deviceName = deviceInfo[log.device]?.name?.toLowerCase() || "";
        const mode = modeLabels[log.mode]?.toLowerCase() || "";
        return deviceName.includes(searchLower) || mode.includes(searchLower);
      });
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return filtered;
  }, [
    controlLogs,
    filterType,
    filterMode,
    dateRange,
    customDateStart,
    customDateEnd,
    searchTerm,
  ]);

  // Filter sensor logs
  const filteredSensorLogs = useMemo(() => {
    let filtered = [...sensorLogs];

    // Filter by date range
    filtered = filterByDateRange(
      filtered,
      dateRange,
      customDateStart,
      customDateEnd
    );

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return filtered;
  }, [sensorLogs, dateRange, customDateStart, customDateEnd]);

  // Pagination logic
  const paginatedControlLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredControlLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredControlLogs, currentPage]);

  const paginatedSensorLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSensorLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSensorLogs, currentPage]);

  const totalPages = useMemo(() => {
    const logs =
      activeTab === "control" ? filteredControlLogs : filteredSensorLogs;
    return Math.ceil(logs.length / itemsPerPage);
  }, [activeTab, filteredControlLogs, filteredSensorLogs]);

  // Reset page when filters change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset page when tab or filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filterType, filterMode, dateRange, searchTerm]);

  return (
    <>
      <NavBar />
      <div className="history-page">
        <HistoryHeader />

        <HistoryStats controlLogs={controlLogs} />

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
              filteredControlLogs={paginatedControlLogs}
              filteredSensorLogs={paginatedSensorLogs}
            />
          </div>

          <HistoryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HistoryPage;
