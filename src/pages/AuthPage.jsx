import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

import LoginForm from './../components/authentication/LoginForm';
import SignupForm from './../components/authentication/SignupForm';
import './../assets/authPageStyle.css';

// ===================== MAIN AUTH PAGE COMPONENT =====================
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <style>{`
        
      `}</style>

      <div className="auth-card">
        <div className="auth-content-wrapper">
          {/* INFO SECTION */}
          <div className="auth-info-section">
            <div>
              <div className="logo-wrapper">
                <div className="logo-icon-bg">
                  <Leaf className="text-green-600" size={32} color="green" />
                </div>
                <h1 className="info-title">SmartPlant</h1>
              </div>
              <h2 className="info-tagline">Chăm sóc cây trồng thông minh</h2>
              <p className="info-subtitle">
                Giám sát và quản lý vườn cây của bạn từ xa với công nghệ IoT
                hiện đại
              </p>
            </div>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon-bg">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="feature-title">Theo dõi realtime</h3>
                  <p className="feature-description">
                    Giám sát độ ẩm, nhiệt độ, ánh sáng 24/7
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-bg">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="feature-title">Tưới tự động</h3>
                  <p className="feature-description">
                    Hệ thống tưới thông minh theo nhu cầu cây
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-bg">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    width="16"
                    height="16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="feature-title">Cảnh báo thông minh</h3>
                  <p className="feature-description">
                    Nhận thông báo khi cây cần chăm sóc
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="auth-form-section">
            {isLogin ? (
              <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
              <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
