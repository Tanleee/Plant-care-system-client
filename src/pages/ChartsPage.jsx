import React, { useState } from "react";
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

const generateHourlyData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      temperature: 25 + Math.random() * 10,
      humidity: 60 + Math.random() * 20,
      soilMoisture: 50 + Math.random() * 30,
      light:
        i >= 6 && i <= 18 ? 800 + Math.random() * 400 : Math.random() * 100,
    });
  }
  return data;
};

const generateDailyData = () => {
  const data = [];
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  days.forEach((day) => {
    data.push({
      day,
      temperature: 28 + Math.random() * 5,
      humidity: 65 + Math.random() * 15,
      soilMoisture: 55 + Math.random() * 25,
      light: 900 + Math.random() * 300,
    });
  });
  return data;
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
  hourlyData,
}) => {
  return (
    <div className="charts-metrics-grid">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        // Logic tính toán giữ nguyên từ code gốc
        const latestValue = hourlyData[hourlyData.length - 1][metric.id];
        const prevValue = hourlyData[hourlyData.length - 2][metric.id];
        const change = (((latestValue - prevValue) / prevValue) * 100).toFixed(
          1
        );

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

  const hourlyData = generateHourlyData();
  const weeklyData = generateDailyData();

  // Xác định data để truyền vào các chart component
  const currentData = timeRange === "day" ? hourlyData : weeklyData;

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
    { id: "light", name: "Ánh sáng", icon: Sun, color: "#f59e0b", unit: "Lux" },
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
          hourlyData={hourlyData}
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
