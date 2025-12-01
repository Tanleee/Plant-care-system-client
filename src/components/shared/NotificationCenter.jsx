// ============================================
// FILE: NotificationCenter.jsx
// ============================================
import React, { useEffect, useState } from "react";
import {
  Bell,
  X,
  Check,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Trash2,
  Filter,
} from "lucide-react";
import "./../../assets/notificationCenterStyle.css";
import { useRouteLoaderData } from "react-router";

const NotificationCenter = ({ isOpen, onClose }) => {
  // const [notifications, setNotifications] = useState([]);
  const notifications = useRouteLoaderData("root").notifications;
  const [filter, setFilter] = useState("all"); // all, unread, sensor, device, system
  const [loading, setLoading] = useState(false);

  const markAsRead = async (id) => {
    await fetch(`/api/v1/notifications/${id}/read`, {
      method: "PATCH",
    });
  };

  const markAllAsRead = async () => {
    await fetch(`/api/v1/notifications/read-all`, { method: "PATCH" });
  };

  const deleteNotification = async (id) => {
    await fetch(`/api/v1/notifications/${id}`, { method: "DELETE" });
  };

  const getIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertTriangle size={20} />;
      case "error":
        return <XCircle size={20} />;
      case "success":
        return <CheckCircle size={20} />;
      case "info":
        return <Info size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;

    return date.toLocaleDateString("vi-VN");
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.isRead;
    return n.category === filter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="notif-overlay" onClick={onClose}>
      <div className="notif-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="notif-header">
          <div className="notif-header-left">
            <Bell size={24} />
            <h2 className="notif-title">Thông báo</h2>
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </div>
          <div className="notif-header-actions">
            {unreadCount > 0 && (
              <button
                className="notif-mark-all-btn"
                onClick={markAllAsRead}
                title="Đánh dấu tất cả đã đọc"
              >
                <Check size={18} />
              </button>
            )}
            <button className="notif-close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="notif-filters">
          {[
            { value: "all", label: "Tất cả", icon: Bell },
            { value: "unread", label: "Chưa đọc", icon: Bell },
            { value: "sensor", label: "Cảm biến", icon: AlertTriangle },
            { value: "device", label: "Thiết bị", icon: Info },
            { value: "system", label: "Hệ thống", icon: Info },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.value}
                className={`notif-filter-btn ${
                  filter === item.value ? "active" : ""
                }`}
                onClick={() => setFilter(item.value)}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Notifications List */}
        <div className="notif-list">
          {loading ? (
            <div className="notif-loading">
              <div className="notif-spinner"></div>
              <p>Đang tải...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="notif-empty">
              <Bell size={48} />
              <p>Không có thông báo</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`notif-item ${!notif.isRead ? "unread" : ""} notif-${
                  notif.type
                }`}
              >
                <div className="notif-item-icon">{getIcon(notif.type)}</div>

                <div className="notif-item-content">
                  <div className="notif-item-header">
                    <h4 className="notif-item-title">{notif.title}</h4>
                    <span className="notif-item-time">
                      {formatTime(notif.createdAt)}
                    </span>
                  </div>
                  <p className="notif-item-message">{notif.message}</p>

                  {notif.data && (
                    <div className="notif-item-data">
                      {notif.data.sensorValue && (
                        <span className="notif-data-tag">
                          Giá trị: {notif.data.sensorValue}
                          {notif.data.threshold &&
                            ` / Ngưỡng: ${notif.data.threshold}`}
                        </span>
                      )}
                      {notif.data.device && (
                        <span className="notif-data-tag">
                          Thiết bị: {notif.data.device}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="notif-item-actions">
                  {!notif.isRead && (
                    <button
                      className="notif-action-btn"
                      onClick={() => markAsRead(notif.id)}
                      title="Đánh dấu đã đọc"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    className="notif-action-btn delete"
                    onClick={() => deleteNotification(notif.id)}
                    title="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {filteredNotifications.length > 0 && (
          <div className="notif-footer">
            <button className="notif-view-all-btn">Xem tất cả thông báo</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
