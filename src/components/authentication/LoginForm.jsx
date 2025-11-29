import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import InputField from "./InputField";
import SocialAuth from "./SocialAuth";

const LoginForm = ({
  formData,
  onInputChange,
  onSubmit,
  onSwitchToSignup,
  showPassword,
  onTogglePassword,
  isSending,
  isLogin,
  onForgotPassword,
  onGoogleSuccess,
  onGoogleError,
}) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email là bắt buộc";
    if (!formData.password) newErrors.password = "Mật khẩu là bắt buộc";

    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      onSubmit(formData.email, formData.password);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    onInputChange(e);
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">Chào mừng trở lại!</h2>
        <p className="form-subtitle">Đăng nhập để quản lý vườn cây của bạn</p>
      </div>

      <div>
        <InputField
          icon={Mail}
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          icon={Lock}
          type="password"
          placeholder="Mật khẩu"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          showPassword={showPassword}
          onTogglePassword={onTogglePassword}
        />

        <div className="form-actions">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={onInputChange}
              className="checkbox-input"
            />
            <span>Ghi nhớ đăng nhập</span>
          </label>
          <button type="button" onClick={onForgotPassword} className="link-btn">
            Quên mật khẩu?
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSending}
          className="submit-btn"
        >
          {isSending ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </div>

      <SocialAuth
        isLogin={isLogin}
        onGoogleSuccess={onGoogleSuccess}
        onGoogleError={onGoogleError}
      />

      <div className="switch-auth-text">
        <span>Chưa có tài khoản? </span>
        <button type="button" onClick={onSwitchToSignup} className="link-btn">
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
