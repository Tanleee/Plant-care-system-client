import React from "react";

export default function NotificationsTab() {
  const items = [
    {
      label: "Thông báo qua Email", // Đã dịch: Email notifications
      desc: "Nhận cập nhật qua email về các đặt tour của bạn", // Đã dịch: Receive email updates about your bookings
    },
    {
      label: "Thông báo qua SMS", // Đã dịch: SMS notifications
      desc: "Nhận tin nhắn văn bản cho các cập nhật quan trọng", // Đã dịch: Get text messages for important updates
    },
    {
      label: "Email Quảng cáo & Ưu đãi", // Đã dịch: Marketing emails
      desc: "Nhận tin tức và các ưu đãi đặc biệt", // Đã dịch: Receive news and special offers
    },
    {
      label: "Thông báo Đẩy (Push)", // Đã dịch: Push notifications
      desc: "Nhận thông báo đẩy trên thiết bị của bạn", // Đã dịch: Get push notifications on your device
    },
  ];

  return (
    <div className="content-section">
      <div className="section-header">
        <h2 className="section-title">Tùy Chọn Thông Báo</h2>{" "}
        {/* Đã dịch: Notification Preferences */}
        <p className="section-subtitle">
          Chọn cách bạn muốn nhận thông báo
        </p>{" "}
        {/* Đã dịch: Choose how you want to be notified */}
      </div>

      <div className="notification-settings">
        {items.map((item, idx) => (
          <div key={idx} className="notification-item">
            <div>
              <h4>{item.label}</h4>
              <p>{item.desc}</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked={idx < 2} />
              <span className="toggle-slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
