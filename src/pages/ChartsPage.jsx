import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Thermometer,
  Droplets,
  Sun,
  Activity,
  TrendingUp,
  Download,
} from "lucide-react";
import { useLoaderData } from "react-router";
import "./../assets/chartsPageStyle.css";

import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";

// --- 1. Helper Components & Functions ---

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="charts-tooltip">
        <p className="charts-tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="charts-tooltip-item"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value.toFixed(1)} {entry.unit}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Hàm format thời gian cho trục X
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};

// Hàm format ngày cho trục X
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  return `${days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
};

// Hàm xử lý dữ liệu sensor realtime cho biểu đồ theo giờ
const processSensorData = (sensorData) => {
  if (!sensorData || !Array.isArray(sensorData)) {
    return [];
  }

  if (sensorData.length === 0) {
    return [];
  }

  const processed = sensorData.map((item) => ({
    time: formatTime(item.timestamp),
    temperature: Number(item.temperature) || 0,
    humidity: Number(item.humidity) || 0,
    soilMoisture: Number(item.soilMoisture) || 0,
    light: Number(item.light) || 0,
    timestamp: item.timestamp,
  }));

  return processed;
};

// Hàm xử lý dữ liệu archive cho biểu đồ theo tuần/tháng
const processArchiveData = (archiveData, timeRange) => {
  if (!archiveData || !Array.isArray(archiveData)) {
    return [];
  }

  if (archiveData.length === 0) {
    return [];
  }

  let filteredData = [...archiveData];

  // Lọc dữ liệu theo timeRange
  if (timeRange === "week") {
    // Lấy 7 ngày gần nhất
    filteredData = filteredData.slice(-7);
  } else if (timeRange === "month") {
    // Lấy 30 ngày gần nhất
    filteredData = filteredData.slice(-30);
  }

  const processed = filteredData.map((item) => ({
    day: formatDate(item.date),
    date: item.date,
    temperature: Number(item.average?.temperature) || 0,
    humidity: Number(item.average?.humidity) || 0,
    soilMoisture: Number(item.average?.soilMoisture) || 0,
    light: Number(item.average?.light) || 0,
    // Thêm min/max để có thể sử dụng sau này
    tempMin: Number(item.min?.temperature) || 0,
    tempMax: Number(item.max?.temperature) || 0,
  }));

  return processed;
};

// --- 2. Sub-Components ---

const ChartsHeader = ({ timeRange, setTimeRange }) => {
  return (
    <div className="charts-header">
      <div className="charts-header-content">
        <div>
          <h1 className="charts-title">
            <TrendingUp size={32} className="charts-title-icon" />
            Biểu Đồ Theo Dõi
          </h1>
          <p className="charts-subtitle">
            Phân tích dữ liệu cảm biến theo thời gian
          </p>
        </div>

        <div className="charts-header-actions">
          {[
            { value: "day", label: "Hôm nay" },
            { value: "week", label: "Tuần này" },
            { value: "month", label: "Tháng này" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`charts-time-btn ${
                timeRange === option.value ? "charts-time-btn-active" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
          <button className="charts-export-btn">
            <Download size={18} />
            Xuất báo cáo
          </button>
        </div>
      </div>
    </div>
  );
};

const MetricsGrid = ({
  metrics,
  selectedMetric,
  setSelectedMetric,
  currentData,
}) => {
  return (
    <div className="charts-metrics-grid">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        if (!currentData || currentData.length < 2) {
          return (
            <div key={metric.id} className="charts-metric-card">
              <div className="charts-metric-header">
                <div
                  className="charts-metric-icon"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <Icon size={24} color={metric.color} />
                </div>
                <span className="charts-metric-change">--</span>
              </div>
              <h3 className="charts-metric-name">{metric.name}</h3>
              <p className="charts-metric-value">
                -- <span className="charts-metric-unit">{metric.unit}</span>
              </p>
            </div>
          );
        }

        const latestValue = currentData[currentData.length - 1][metric.id];
        const prevValue = currentData[currentData.length - 2][metric.id];
        const change =
          prevValue !== 0
            ? (((latestValue - prevValue) / prevValue) * 100).toFixed(1)
            : 0;

        return (
          <div
            key={metric.id}
            onClick={() => setSelectedMetric(metric.id)}
            className={`charts-metric-card ${
              selectedMetric === metric.id ? "charts-metric-card-selected" : ""
            }`}
            style={{
              borderColor:
                selectedMetric === metric.id ? metric.color : "transparent",
            }}
          >
            <div className="charts-metric-header">
              <div
                className="charts-metric-icon"
                style={{ backgroundColor: `${metric.color}15` }}
              >
                <Icon size={24} color={metric.color} />
              </div>
              <span
                className={`charts-metric-change ${
                  change >= 0
                    ? "charts-metric-change-positive"
                    : "charts-metric-change-negative"
                }`}
              >
                {change >= 0 ? "+" : ""}
                {change}%
              </span>
            </div>
            <h3 className="charts-metric-name">{metric.name}</h3>
            <p className="charts-metric-value">
              {latestValue.toFixed(1)}{" "}
              <span className="charts-metric-unit">{metric.unit}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

const TemperatureChart = ({ data, timeRange }) => {
  if (!data || data.length === 0) {
    return (
      <div className="charts-card">
        <h2 className="charts-card-title">Biểu Đồ Nhiệt Độ Theo Thời Gian</h2>
        <div
          style={{
            height: 350,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "#6b7280" }}>Không có dữ liệu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="charts-card">
      <h2 className="charts-card-title">Biểu Đồ Nhiệt Độ Theo Thời Gian</h2>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey={timeRange === "day" ? "time" : "day"}
            stroke="#6b7280"
          />
          <YAxis stroke="#6b7280" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#colorTemp)"
            name="Nhiệt độ"
            unit="°C"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const HumiditySoilCharts = ({ data, timeRange }) => {
  if (!data || data.length === 0) {
    return (
      <div className="charts-two-column">
        <div className="charts-card">
          <h2 className="charts-card-title">Độ Ẩm Không Khí</h2>
          <div
            style={{
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "#6b7280" }}>Không có dữ liệu</p>
          </div>
        </div>
        <div className="charts-card">
          <h2 className="charts-card-title">Độ Ẩm Đất</h2>
          <div
            style={{
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "#6b7280" }}>Không có dữ liệu</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="charts-two-column">
      {/* Humidity Chart */}
      <div className="charts-card">
        <h2 className="charts-card-title">Độ Ẩm Không Khí</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey={timeRange === "day" ? "time" : "day"}
              stroke="#6b7280"
            />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Độ ẩm KK"
              unit="%"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Soil Moisture Chart */}
      <div className="charts-card">
        <h2 className="charts-card-title">Độ Ẩm Đất</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey={timeRange === "day" ? "time" : "day"}
              stroke="#6b7280"
            />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="soilMoisture"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Độ ẩm đất"
              unit="%"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const LightChart = ({ data, timeRange }) => {
  if (!data || data.length === 0) {
    return (
      <div className="charts-card">
        <h2 className="charts-card-title">Cường Độ Ánh Sáng</h2>
        <div
          style={{
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "#6b7280" }}>Không có dữ liệu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="charts-card">
      <h2 className="charts-card-title">Cường Độ Ánh Sáng</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey={timeRange === "day" ? "time" : "day"}
            stroke="#6b7280"
          />
          <YAxis stroke="#6b7280" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="light"
            fill="#f59e0b"
            radius={[8, 8, 0, 0]}
            name="Ánh sáng"
            unit=" Lux"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- 3. Main Component ---

const ChartsPage = () => {
  const [timeRange, setTimeRange] = useState("day");
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Lấy dữ liệu thực từ API
  const chartsData = useLoaderData();

  // Xử lý dữ liệu dựa trên timeRange
  const currentData = useMemo(() => {
    if (timeRange === "day") {
      // Sử dụng dữ liệu realtime cho "Hôm nay"
      const sensorData = chartsData?.sensorData || [];
      return processSensorData(sensorData);
    } else {
      // Sử dụng dữ liệu archive cho "Tuần này" và "Tháng này"
      const archiveData = chartsData?.sensorDataArchieve || [];
      return processArchiveData(archiveData, timeRange);
    }
  }, [chartsData, timeRange]);

  const metrics = [
    {
      id: "temperature",
      name: "Nhiệt độ",
      icon: Thermometer,
      color: "#ef4444",
      unit: "°C",
    },
    {
      id: "humidity",
      name: "Độ ẩm không khí",
      icon: Droplets,
      color: "#3b82f6",
      unit: "%",
    },
    {
      id: "soilMoisture",
      name: "Độ ẩm đất",
      icon: Activity,
      color: "#10b981",
      unit: "%",
    },
    {
      id: "light",
      name: "Ánh sáng",
      icon: Sun,
      color: "#f59e0b",
      unit: "Lux",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="charts-page">
        <ChartsHeader timeRange={timeRange} setTimeRange={setTimeRange} />

        <MetricsGrid
          metrics={metrics}
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          currentData={currentData}
        />

        <TemperatureChart data={currentData} timeRange={timeRange} />

        <HumiditySoilCharts data={currentData} timeRange={timeRange} />

        <LightChart data={currentData} timeRange={timeRange} />
      </div>
      <Footer />
    </>
  );
};

export default ChartsPage;
