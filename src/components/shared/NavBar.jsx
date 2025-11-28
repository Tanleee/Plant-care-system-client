import React, { useState } from 'react';
import {
  Activity,
  TrendingUp,
  Settings,
  History,
  LogOut,
  Menu,
  X,
  Leaf
} from 'lucide-react';
import { useNavigate } from 'react-router';
import './../../assets/navBar.css';

// Helper function để lấy URL ảnh
function getPhotoUrl(fileName) {
  return `/img/users/${fileName}`;
}

// Brand Logo Component
function Brand() {
  const navigate = useNavigate();

  return (
    <div className="navbar-brand" onClick={() => navigate('/')}>
      <div className="navbar-logo">
        <Leaf size={32} />
      </div>
      <span className="navbar-brand-name">SmartPlant</span>
    </div>
  );
}

// Navigation Menu Component
function NavMenu({ currentPage, onPageChange, isMobile, onMobileClose }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'charts', label: 'Biểu đồ', icon: TrendingUp },
    { id: 'control', label: 'Điều khiển', icon: Settings },
    { id: 'history', label: 'Lịch sử', icon: History }
  ];

  return (
    <nav className={`navbar-menu ${isMobile ? 'mobile' : ''}`}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => {
              onPageChange(item.id);
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
function UserSection({ user, onLogout, isMobile }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Gọi API logout nếu cần
      // const res = await fetch('/api/v1/users/logout');
      // if (!res.ok) throw new Error('Logout failed');

      if (onLogout) {
        onLogout();
      }

      // Redirect về trang login
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err.message);
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
              <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
            )}
          </div>
          <div className="user-details">
            <span className="user-name">{user.name || 'User'}</span>
            <span className="user-email">{user.email}</span>
          </div>
        </div>

        <div className="mobile-user-actions">
          <button
            className="user-menu-item"
            onClick={() => navigate('/profile')}
          >
            <span>👤</span>
            <span>Hồ sơ</span>
          </button>
          <button
            className="user-menu-item"
            onClick={() => navigate('/settings')}
          >
            <span>⚙️</span>
            <span>Cài đặt</span>
          </button>
          <button
            className="user-menu-item"
            onClick={() => navigate('/notifications')}
          >
            <span>🔔</span>
            <span>Thông báo</span>
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
            <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
          )}
        </div>
        <span className="user-name">{user.name || 'User'}</span>
        <svg
          className={`chevron ${showUserMenu ? 'open' : ''}`}
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

      {showUserMenu && (
        <div className="user-menu">
          <div className="user-menu-item" onClick={() => navigate('/profile')}>
            <span>👤</span>
            <span>Hồ sơ</span>
          </div>
          <div className="user-menu-item" onClick={() => navigate('/settings')}>
            <span>⚙️</span>
            <span>Cài đặt</span>
          </div>
          <div
            className="user-menu-item"
            onClick={() => navigate('/notifications')}
          >
            <span>🔔</span>
            <span>Thông báo</span>
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
          onClick={() => navigate('/auth')}
        >
          Đăng nhập
        </button>
        <button
          className="auth-btn signup-btn"
          onClick={() => navigate('/auth')}
        >
          Đăng ký
        </button>
      </div>
    );
  }

  return (
    <div className="auth-buttons">
      <button className="auth-btn signin-btn" onClick={() => navigate('/auth')}>
        Đăng nhập
      </button>
      <button className="auth-btn signup-btn" onClick={() => navigate('/auth')}>
        Đăng ký
      </button>
    </div>
  );
}

// Main NavBar Component
const NavBar = ({
  currentPage = 'dashboard',
  onPageChange = () => {},
  user = null, // Truyền vào thông tin user từ parent component hoặc context
  onLogout = null
}) => {
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
        {/* Brand Logo */}
        <Brand />

        {/* Desktop Navigation Menu */}
        <div className="navbar-menu-desktop">
          <NavMenu currentPage={currentPage} onPageChange={onPageChange} />
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
          {/* Mobile Navigation */}
          <NavMenu
            currentPage={currentPage}
            onPageChange={onPageChange}
            isMobile={true}
            onMobileClose={closeMobileMenu}
          />

          {/* Mobile User Section hoặc Auth Buttons */}
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
