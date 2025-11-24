import React from "react";
import { Routes, Route, Navigate } from "react-router";

// Import Components
import Navbar from "./../Shared/NavBar";
import DashboardPage from "./../../pages/AuthPage";
import ChartView from "./../ChartView";

// Import CSS
import "./../../assets/layout.css";
import "./../../assets/navbar.css";

/**
 * Component bố cục chính cho các trang đã được xác thực (authenticated).
 * @param {object} props - Props được truyền từ App.jsx
 */
const MainLayout = ({
  currentView,
  setCurrentView,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleLogout,
  sensorData,
  controls,
  toggleControl,
  chartData,
}) => (
  <div className="container">
    <Navbar
      currentView={currentView}
      setCurrentView={setCurrentView}
      isMobileMenuOpen={isMobileMenuOpen}
      setIsMobileMenuOpen={setIsMobileMenuOpen}
      handleLogout={handleLogout}
    />

    <div className="main">
      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              sensorData={sensorData}
              controls={controls}
              toggleControl={toggleControl}
            />
          }
        />
        <Route
          path="/analytics"
          element={<ChartView chartData={chartData} sensorData={sensorData} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  </div>
);

export default MainLayout;
