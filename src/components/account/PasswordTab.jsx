// src/components/account/PasswordTab.jsx
import { Shield, Eye, EyeOff, Check, X } from "lucide-react";

export default function PasswordTab({
  passwordData,
  showPasswords,
  passwordValidation,
  onPasswordChange,
  togglePasswordVisibility,
  isPasswordValid,
  isUpdating,
  onSubmit,
  isGoogleAuth = false,
}) {
  // Helper để check password match
  const isPasswordMatch =
    passwordData.confirmPassword &&
    passwordData.newPassword === passwordData.confirmPassword;

  const isPasswordMismatch =
    passwordData.confirmPassword &&
    passwordData.newPassword !== passwordData.confirmPassword;

  if (isGoogleAuth) {
    return (
      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">Mật Khẩu</h2>
          <p className="section-subtitle">Quản lý mật khẩu tài khoản của bạn</p>
        </div>

        <div className="password-tab-disabled-message">
          <Shield size={48} />
          <h3>Tài Khoản Google</h3>
          <p>
            Bạn đang sử dụng đăng nhập bằng Google. Mật khẩu được quản lý bởi
            Google.
            <br />
            Để thay đổi mật khẩu, vui lòng truy cập{" "}
            <a
              href="https://myaccount.google.com/security"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#0284c7",
                fontWeight: "600",
                textDecoration: "underline",
              }}
            >
              Cài đặt bảo mật Google
            </a>
          </p>
        </div>

        <div className="google-user-notice">
          <Shield size={20} />
          <span>
            Tài khoản của bạn được bảo vệ bởi hệ thống bảo mật của Google
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="content-section">
      <div className="section-header">
        <h2 className="section-title">Thay Đổi Mật Khẩu</h2>
        <p className="section-subtitle">
          Cập nhật mật khẩu của bạn để bảo mật tài khoản
        </p>
      </div>

      <form onSubmit={onSubmit} className="form-content">
        {/* Current Password */}
        <div className="form-group">
          <label htmlFor="currentPassword" className="form-label">
            Mật khẩu hiện tại <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <Shield className="input-icon" size={20} />
            <div className="password-input-wrapper">
              <input
                type={showPasswords.current ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={onPasswordChange}
                placeholder="Nhập mật khẩu hiện tại"
                className="form-input"
                required
                autoComplete="current-password"
                disabled={isUpdating}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => togglePasswordVisibility("current")}
                disabled={isUpdating}
              >
                {showPasswords.current ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* New Password */}
        <div className="form-group">
          <label htmlFor="newPassword" className="form-label">
            Mật khẩu mới <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <Shield className="input-icon" size={20} />
            <div className="password-input-wrapper">
              <input
                type={showPasswords.new ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={onPasswordChange}
                placeholder="Nhập mật khẩu mới"
                className="form-input"
                required
                autoComplete="new-password"
                disabled={isUpdating}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => togglePasswordVisibility("new")}
                disabled={isUpdating}
              >
                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Password Validation */}
        {passwordData.newPassword && (
          <div className="password-requirements">
            {Object.values(passwordValidation).every(Boolean) ? (
              <div className="password-strength-indicator success">
                <Check size={20} />
                <span>Mật khẩu mạnh ✓</span>
              </div>
            ) : (
              <>
                <p className="requirements-title">Yêu cầu mật khẩu:</p>
                <ul className="requirements-list">
                  <li className={passwordValidation.minLength ? "valid" : ""}>
                    {passwordValidation.minLength ? (
                      <Check size={16} />
                    ) : (
                      <X size={16} />
                    )}
                    <span>Ít nhất 8 ký tự</span>
                  </li>
                  <li
                    className={passwordValidation.hasUpperCase ? "valid" : ""}
                  >
                    {passwordValidation.hasUpperCase ? (
                      <Check size={16} />
                    ) : (
                      <X size={16} />
                    )}
                    <span>Ít nhất 1 chữ hoa</span>
                  </li>
                  <li
                    className={passwordValidation.hasLowerCase ? "valid" : ""}
                  >
                    {passwordValidation.hasLowerCase ? (
                      <Check size={16} />
                    ) : (
                      <X size={16} />
                    )}
                    <span>Ít nhất 1 chữ thường</span>
                  </li>
                  <li className={passwordValidation.hasNumber ? "valid" : ""}>
                    {passwordValidation.hasNumber ? (
                      <Check size={16} />
                    ) : (
                      <X size={16} />
                    )}
                    <span>Ít nhất 1 số</span>
                  </li>
                  <li
                    className={passwordValidation.hasSpecialChar ? "valid" : ""}
                  >
                    {passwordValidation.hasSpecialChar ? (
                      <Check size={16} />
                    ) : (
                      <X size={16} />
                    )}
                    <span>Ít nhất 1 ký tự đặc biệt (!@#$%...)</span>
                  </li>
                </ul>
              </>
            )}
          </div>
        )}

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Xác nhận mật khẩu mới <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <Shield className="input-icon" size={20} />
            <div className="password-input-wrapper">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={onPasswordChange}
                placeholder="Nhập lại mật khẩu mới"
                className={`form-input ${
                  isPasswordMatch ? "input-success" : ""
                } ${isPasswordMismatch ? "input-error" : ""}`}
                required
                autoComplete="new-password"
                disabled={isUpdating}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => togglePasswordVisibility("confirm")}
                disabled={isUpdating}
              >
                {showPasswords.confirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Password Match Indicator */}
          {passwordData.confirmPassword && (
            <div
              className={`password-match-indicator ${
                isPasswordMatch ? "match" : "mismatch"
              }`}
            >
              {isPasswordMatch ? (
                <>
                  <Check size={16} />
                  <span>Mật khẩu khớp</span>
                </>
              ) : (
                <>
                  <X size={16} />
                  <span>Mật khẩu không khớp</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={!isPasswordValid || isUpdating}
          >
            {isUpdating ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </button>
        </div>
      </form>
    </div>
  );
}
