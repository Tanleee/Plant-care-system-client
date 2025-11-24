import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

// Import Components đã tách
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import MainLayout from "./components/routes/MainLayout";

import "./assets/layout.css";
import "./assets/auth.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [sensorData, setSensorData] = useState({
    temperature: 28.5,
    humidity: 65,
    soilMoisture: 45,
    light: 1200,
    lastUpdate: new Date(),
    isOnline: true,
  });

  const [controls, setControls] = useState({
    pump: false,
    fan: false,
    light: false,
  });

  const [chartData, setChartData] = useState([]);

  // Simulate real-time sensor data
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        temperature: parseFloat((28 + Math.random() * 4).toFixed(1)),
        humidity: parseInt((60 + Math.random() * 15).toFixed(0)),
        soilMoisture: parseInt((40 + Math.random() * 20).toFixed(0)),
        light: parseInt((1000 + Math.random() * 500).toFixed(0)),
        lastUpdate: new Date(),
        isOnline: true,
      };

      setSensorData(newData);

      setChartData((prev) => {
        const updated = [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            ...newData,
          },
        ];
        return updated.slice(-20);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (!isLoginMode && authForm.password !== authForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsAuthenticated(true);
    setAuthForm({ email: "", password: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("dashboard");
  };

  const toggleControl = (device) => {
    setControls((prev) => ({
      ...prev,
      [device]: !prev[device],
    }));
  };

  return (
    <Router>
      <Routes>
        {/* Route Đăng nhập */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <AuthPage
                isLoginMode={isLoginMode}
                setIsLoginMode={setIsLoginMode}
                authForm={authForm}
                setAuthForm={setAuthForm}
                handleAuth={handleAuth}
              />
            )
          }
        />

        {/* Protected Routes (Main Application) */}
        <Route
          path="/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout
                currentView={currentView}
                setCurrentView={setCurrentView}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                handleLogout={handleLogout}
                sensorData={sensorData}
                controls={controls}
                toggleControl={toggleControl}
                chartData={chartData}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
