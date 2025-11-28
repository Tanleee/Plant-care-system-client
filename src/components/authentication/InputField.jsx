import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({
  icon: Icon,
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  showPassword,
  onTogglePassword
}) => {
  const isPassword = type === 'password';

  return (
    <div className="input-group">
      <div className="input-wrapper">
        <div className="input-icon">
          <Icon size={20} />
        </div>
        <input
          type={isPassword && showPassword ? 'text' : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`form-input ${error ? 'error' : ''} ${
            isPassword ? 'has-password-toggle' : ''
          }`}
        />
        {isPassword && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="password-toggle"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default InputField;
