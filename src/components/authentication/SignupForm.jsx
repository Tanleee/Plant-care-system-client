import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import InputField from './InputField';

const SignupForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
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

    if (!formData.name) newErrors.name = 'Tên là bắt buộc';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    if (Object.keys(newErrors).length === 0) {
      console.log('Signup Data:', formData);
      setMessage({
        type: 'success',
        text: 'Đăng ký thành công! (Dữ liệu đã được in ra console)'
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
      <h2 className="form-title">Tạo tài khoản</h2>
      <p className="form-subtitle">
        Bắt đầu hành trình chăm sóc cây trồng thông minh
      </p>

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
          icon={User}
          type="text"
          placeholder="Họ và tên"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

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

        <InputField
          icon={Lock}
          type="password"
          placeholder="Xác nhận mật khẩu"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <label className="signup-terms-label">
          <input type="checkbox" className="signup-terms-input" required />
          <span>
            Tôi đồng ý với{' '}
            <button type="button" className="terms-button">
              điều khoản dịch vụ
            </button>{' '}
            và{' '}
            <button type="button" className="terms-button">
              chính sách bảo mật
            </button>
          </span>
        </label>

        <button onClick={handleSubmit} className="submit-btn">
          Đăng ký
        </button>
      </div>

      <div className="switch-link-wrapper">
        <span className="switch-text">Đã có tài khoản? </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="switch-button"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
