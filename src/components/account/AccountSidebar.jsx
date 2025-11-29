import {
  User,
  Lock,
  Package,
  CreditCard,
  Bell,
  Trash2,
  Camera,
} from "lucide-react";

import UserAvatar from "./UserAvatar";
import { isGoogleUser } from "../../utils/imageHelper";

export default function AccountSidebar({
  activeTab,
  setActiveTab,
  profileData,
  photoPreview,
  fileInputRef,
  onPhotoClick,
  onDeleteClick,
}) {
  const isGoogle = isGoogleUser(profileData);

  return (
    <aside className="account-sidebar">
      <div className="sidebar-header">
        <div className="user-avatar-large">
          {/* Sử dụng UserAvatar component */}
          <UserAvatar
            photo={photoPreview || profileData.photo}
            name={profileData.name}
            className="avatar-image"
            size={100}
          />

          {/* Google Badge nếu user đăng nhập bằng Google */}
          {isGoogle && (
            <div className="google-badge" title="Đăng nhập bằng Google">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
          )}

          {/* Upload button - ẩn nếu là Google user */}
          {!isGoogle && (
            <button
              className="avatar-upload-btn"
              onClick={onPhotoClick}
              title="Tải lên ảnh mới"
            >
              <Camera size={16} />
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        <div className="user-name-large">{profileData.name}</div>
        <div className="user-email-small">{profileData.email}</div>

        {/* Hiển thị badge nếu là Google user */}
        {isGoogle && (
          <div className="auth-method-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
            </svg>
            Google Account
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {[
          { id: "profile", icon: User, label: "Hồ Sơ" },
          { id: "password", icon: Lock, label: "Mật Khẩu", disabled: isGoogle },
          // { id: "bookings", icon: Package, label: "Tour Đã Đặt" },
          // { id: "billing", icon: CreditCard, label: "Thanh Toán" },
          { id: "notifications", icon: Bell, label: "Thông Báo" },
        ].map((item) => (
          <button
            key={item.id}
            className={`user-nav-item ${
              activeTab === item.id ? "active" : ""
            } ${item.disabled ? "disabled" : ""}`}
            onClick={() => !item.disabled && setActiveTab(item.id)}
            disabled={item.disabled}
            title={item.disabled ? "Không khả dụng cho tài khoản Google" : ""}
          >
            <item.icon size={20} />
            {item.label}
            {item.disabled && <span className="disabled-indicator">🔒</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="danger-btn" onClick={onDeleteClick}>
          <Trash2 size={20} />
          Xóa Tài Khoản
        </button>
      </div>
    </aside>
  );
}
