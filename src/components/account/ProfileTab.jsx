// src/components/account/ProfileTab.jsx
import { User, Mail, Save } from "lucide-react";

export default function ProfileTab({
  profileData,
  onProfileChange,
  hasChanges,
  isUpdating,
  onSubmit,
}) {
  return (
    <div className="content-section">
      <div className="section-header">
        <h2 className="section-title">Cài Đặt Hồ Sơ</h2>
        <p className="section-subtitle">Cập nhật thông tin cá nhân của bạn</p>
      </div>

      <div className="form-content">
        <div className="form-group">
          <label className="form-label">Họ và Tên</label>
          <div className="input-with-icon">
            <User className="input-icon" size={20} />
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={onProfileChange}
              className="form-input"
              placeholder="Nhập họ và tên đầy đủ của bạn"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Địa Chỉ Email</label>
          <div className="input-with-icon">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={onProfileChange}
              className="form-input"
              placeholder="tenban@email.com"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Vai Trò</label> {/* Đã dịch: Role */}
          <div className="input-with-icon">
            <User className="input-icon" size={20} />
            <input
              type="text"
              value={profileData.role}
              className="form-input"
              disabled
              style={{
                backgroundColor: "#f9fafb",
                cursor: "not-allowed",
                color: "#6b7280",
              }}
            />
          </div>
          <p className="form-hint">Vai trò của bạn không thể thay đổi</p>{" "}
          {/* Đã dịch: Your role cannot be changed */}
        </div>

        <div className="form-actions">
          <button
            onClick={onSubmit}
            className="btn-primary"
            disabled={!hasChanges || isUpdating}
            style={{ opacity: !hasChanges || isUpdating ? 0.6 : 1 }}
          >
            <Save size={20} />
            {isUpdating ? "Đang Lưu..." : "Lưu Thay Đổi"}{" "}
            {/* Đã dịch: Saving... / Save Changes */}
          </button>
        </div>
      </div>
    </div>
  );
}
