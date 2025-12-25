import React, { useState } from "react";
import {
  Activity,
  LogOut,
  Menu,
  X,
  Leaf,
  AlarmClock,
  Timer,
  Earth,
  Hourglass,
} from "lucide-react";
import {
  useNavigate,
  useRouteLoaderData,
  useLocation,
  useRevalidator,
} from "react-router";

import getApiUrl from "./../../utils/getApiUrl";
import "./../../assets/navBar.css";

function getPhotoUrl(fileName) {
  return `/img/users/${fileName}`;
}

// Brand Logo Component
function Brand() {
  const navigate = useNavigate();

  return (
    <div className="navbar-brand" onClick={() => navigate("/")}>
      <div className="navbar-logo">
        <Leaf size={32} />
      </div>
      <span className="navbar-brand-name">SmartClock</span>
    </div>
  );
}

// Navigation Menu Component
function NavMenu({ onMobileClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", link: "/", icon: Activity },
    { id: "alarm", label: "Báo thức", link: "/alarm", icon: AlarmClock },
    { id: "stopwatch", label: "Bấm giờ", link: "/stopwatch", icon: Timer },
    { id: "timer", label: "Hẹn giờ", link: "/timer", icon: Hourglass },
    {
      id: "worldclock",
      label: "Giờ thế giới",
      link: "/worldclock",
      icon: Earth,
    },
  ];

  return (
    <nav className="navbar-menu">
      {menuItems.map((item) => {
        const Icon = item.icon;
        // Kiểm tra xem path hiện tại có match với link không
        const isActive = location.pathname === item.link;

        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? "active" : ""}`}
            onClick={() => {
              navigate(item.link);
              if (onMobileClose) onMobileClose();
            }}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// User Section Component (khi đã đăng nhập)
function UserSection({ user, isMobile }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const handleLogout = async () => {
    try {
      const res = await fetch(getApiUrl("/api/v1/users/logout"), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Logout failed");

      revalidator.revalidate();

      setTimeout(() => {
        navigate("/auth", { replace: true });
      }, 100);
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  if (isMobile) {
    return (
      <div className="mobile-user-section">
        <div className="mobile-user-info">
          <div className="user-avatar">
            {user.photo ? (
              <img
                src={user.isGoogleAuth ? user.photo : getPhotoUrl(user.photo)}
                alt={user.name}
              />
            ) : (
              <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
            )}
          </div>
          <div className="user-details">
            <span className="user-name">{user.name || "User"}</span>
            <span className="user-email">{user.email}</span>
          </div>
        </div>

        <div className="mobile-user-actions">
          <button className="user-menu-item" onClick={() => navigate("/user")}>
            <span>👤</span>
            <span>Hồ sơ</span>
          </button>
          <div className="user-menu-divider"></div>
          <button className="user-menu-item logout" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar-user">
      {/* User Menu Button */}
      <button
        className="user-button"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <div className="user-avatar">
          {user.photo ? (
            <img
              src={user.isGoogleAuth ? user.photo : getPhotoUrl(user.photo)}
              alt={user.name}
            />
          ) : (
            <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
          )}
        </div>
        <span className="user-name">{user.name || "User"}</span>
        <svg
          className={`chevron ${showUserMenu ? "open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* User Menu Dropdown */}
      {showUserMenu && (
        <div className="user-menu">
          <div className="user-menu-item" onClick={() => navigate("/user")}>
            <span>👤</span>
            <span>Hồ sơ</span>
          </div>
          <div className="user-menu-divider"></div>
          <div className="user-menu-item logout" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Auth Buttons Component (khi chưa đăng nhập)
function AuthButtons({ isMobile }) {
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <div className="mobile-auth-buttons">
        <button
          className="auth-btn signin-btn"
          onClick={() => navigate("/auth")}
        >
          Đăng nhập
        </button>
        <button
          className="auth-btn signup-btn"
          onClick={() => navigate("/auth")}
        >
          Đăng ký
        </button>
      </div>
    );
  }

  return (
    <div className="auth-buttons">
      <button className="auth-btn signin-btn" onClick={() => navigate("/auth")}>
        Đăng nhập
      </button>
      <button className="auth-btn signup-btn" onClick={() => navigate("/auth")}>
        Đăng ký
      </button>
    </div>
  );
}

// Main NavBar Component
const NavBar = ({ onLogout = null }) => {
  const user = useRouteLoaderData("root");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Brand />

        {/* Desktop Navigation Menu */}
        <div className="navbar-menu-desktop">
          <NavMenu />
        </div>

        {/* Desktop User Section hoặc Auth Buttons */}
        <div className="navbar-actions-desktop">
          {user ? (
            <UserSection user={user} onLogout={onLogout} />
          ) : (
            <AuthButtons />
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <NavMenu onMobileClose={closeMobileMenu} />

          {user ? (
            <UserSection user={user} onLogout={onLogout} isMobile={true} />
          ) : (
            <AuthButtons isMobile={true} />
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
