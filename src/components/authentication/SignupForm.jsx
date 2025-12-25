import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import InputField from "./InputField";
import SocialAuth from "./SocialAuth";
import validatePassword from "../../utils/validatePassword";
import validateEmail from "../../utils/validateEmail";

function FieldMessage({ isSuccess, successMessage, errorMessage }) {
  return (
    <div className="input-group" style={{ fontSize: "0.875rem" }}>
      {isSuccess ? (
        <span style={{ color: "var(--primary-color)" }}>
          ✓ {successMessage}
        </span>
      ) : (
        <span style={{ color: "var(--danger)" }}>✗ {errorMessage}</span>
      )}
    </div>
  );
}

const SignupForm = ({
  formData,
  onInputChange,
  onSubmit,
  onSwitchToLogin,
  showPassword,
  showConfirmPassword,
  onTogglePassword,
  onToggleConfirmPassword,
  isSending,
  isLogin,
  onGoogleSuccess,
  onGoogleError,
}) => {
  const [errors, setErrors] = useState({});

  function isFormValid() {
    return (
      formData.fullName.trim() !== "" &&
      formData.email.trim() !== "" &&
      validateEmail(formData.email) &&
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      validatePassword(formData.password) &&
      formData.password === formData.confirmPassword &&
      formData.agreeToTerms
    );
  }

  const handleSubmit = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Tên là bắt buộc";
    if (!formData.email) newErrors.email = "Email là bắt buộc";
    if (!formData.password) newErrors.password = "Mật khẩu là bắt buộc";
    else if (!validatePassword(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Bạn phải đồng ý với điều khoản dịch vụ";
    }

    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      onSubmit(
        formData.fullName,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
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
        <h2 className="form-title">Tạo tài khoản</h2>
        <p className="form-subtitle">
          Hãy tạo tài khoản để trải nghiệm hệ thống này 
        </p>
      </div>

      <div>
        <InputField
          icon={User}
          type="text"
          placeholder="Họ và tên"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          isSending={isSending}
        />

        <InputField
          icon={Mail}
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          isSending={isSending}
        />

        {formData.email.trim() !== "" && (
          <FieldMessage
            isSuccess={validateEmail(formData.email)}
            successMessage="Email hợp lệ"
            errorMessage="Email không hợp lệ"
          />
        )}

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
          isSending={isSending}
        />

        {formData.password.trim() !== "" && (
          <FieldMessage
            isSuccess={validatePassword(formData.password)}
            successMessage="Mật khẩu mạnh"
            errorMessage="Mật khẩu phải bao gồm: 8+ ký tự, chữ hoa, chữ thường,
                        số, và ký tự đặc biệt (!@#$...)"
          />
        )}

        <InputField
          icon={Lock}
          type="password"
          placeholder="Xác nhận mật khẩu"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          showPassword={showConfirmPassword}
          onTogglePassword={onToggleConfirmPassword}
          isSending={isSending}
        />

        {formData.confirmPassword.trim() !== "" && (
          <FieldMessage
            isSuccess={formData.password === formData.confirmPassword}
            successMessage="Mật khẩu khớp"
            errorMessage="Mật khẩu không trùng khớp"
          />
        )}

        <div className="terms-check">
          <label
            className="checkbox-label"
            style={{ alignItems: "flex-start" }}
          >
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={onInputChange}
              className="checkbox-input"
              style={{ marginTop: "0.25rem" }}
            />
            <span style={{ marginLeft: "0.5rem" }}>
              Tôi đồng ý với{" "}
              <button type="button" className="link-btn">
                điều khoản dịch vụ
              </button>{" "}
              và{" "}
              <button type="button" className="link-btn">
                chính sách bảo mật
              </button>
            </span>
          </label>
          {errors.agreeToTerms && !formData.agreeToTerms && (
            <p className="error-message" style={{ marginTop: "0.25rem" }}>
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSending && isFormValid()}
          className="submit-btn"
        >
          {isSending ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </div>

      <SocialAuth
        isLogin={isLogin}
        onGoogleSuccess={onGoogleSuccess}
        onGoogleError={onGoogleError}
      />

      <div className="switch-auth-text">
        <span>Đã có tài khoản? </span>
        <button type="button" onClick={onSwitchToLogin} className="link-btn">
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
