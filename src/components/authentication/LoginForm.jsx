import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import InputField from './InputField';

const LoginForm = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
      setMessage(null);
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    setMessage(null);

    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';

    if (Object.keys(newErrors).length === 0) {
      console.log('Login Data:', formData);
      setMessage({
        type: 'success',
        text: 'Đăng nhập thành công! (Dữ liệu đã được in ra console)'
      });
      setErrors({});
    } else {
      setErrors(newErrors);
      setMessage({
        type: 'error',
        text: 'Vui lòng kiểm tra các trường bị lỗi.'
      });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Chào mừng trở lại!</h2>
      <p className="form-subtitle">Đăng nhập để quản lý vườn cây của bạn</p>

      {message && (
        <div
          className={`message-box ${
            message.type === 'success' ? 'message-success' : 'message-error'
          }`}
        >
          {message.text}
        </div>
      )}

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
        />

        <div className="flex-between">
          <label className="remember-me-label">
            <input type="checkbox" className="checkbox-input" />
            Ghi nhớ đăng nhập
          </label>
          <button type="button" className="link-button">
            Quên mật khẩu?
          </button>
        </div>

        <button onClick={handleSubmit} className="submit-btn">
          Đăng nhập
        </button>
      </div>

      <div className="switch-link-wrapper">
        <span className="switch-text">Chưa có tài khoản? </span>
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="switch-button"
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
