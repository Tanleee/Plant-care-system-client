import React from "react";
import { LogOut, Menu, X, Home, BarChart3, Settings } from "lucide-react";
import "./../../assets/navbar.css";

const Navbar = ({
  currentView,
  setCurrentView,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleLogout,
}) => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-brand">
          <span className="nav-icon">🌿</span>
          <span className="nav-title">SmartPlant</span>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`nav-links ${isMobileMenuOpen ? "nav-links-mobile" : ""}`}
        >
          <button
            className={
              currentView === "dashboard" ? "nav-link-active" : "nav-link"
            }
            onClick={() => {
              setCurrentView("dashboard");
              setIsMobileMenuOpen(false);
            }}
          >
            <Home size={18} />
            <span>Dashboard</span>
          </button>
          <button
            className={
              currentView === "analytics" ? "nav-link-active" : "nav-link"
            }
            onClick={() => {
              setCurrentView("analytics");
              setIsMobileMenuOpen(false);
            }}
          >
            <BarChart3 size={18} />
            <span>Analytics</span>
          </button>
          <button className="nav-link">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="nav-link-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
