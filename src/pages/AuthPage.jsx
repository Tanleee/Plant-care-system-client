import React, { useState } from "react";

import { useNavigate } from "react-router";
import { Leaf, ArrowLeft } from "lucide-react";
import axios from "axios";

import "./../assets/authPageStyle.css";
import useAlert from "./../hooks/useAlert";
import ShowAlert from "./../components/shared/ShowAlert";

import LoginForm from "./../components/authentication/LoginForm";
import SignupForm from "./../components/authentication/SignupForm";

import ForgotPasswordModal from "../components/authentication/ForgotPasswordModal";
import AccountRecoveryModal from "./../components/authentication/AccountRecoveryModal";

// Main AuthPage Component
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isRecoverModalOpen, setIsRecoverModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    agreeToTerms: false,
  });
  const navigate = useNavigate();
  const { alert, showSuccess, showError, hideAlert } = useAlert();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function handleLogin(email, password) {
    setIsSending(true);
    try {
      const result = await axios({
        method: "post",
        url: `/api/v1/users/login`,
        data: {
          email,
          password,
        },
        withCredentials: true,
      });

      if (result.data.status === "success") {
        showSuccess("Đăng nhập thành công", 2000);
        setTimeout(() => {
          document.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      if (err.status === 403) {
        setIsForgotPasswordOpen(true);
      } else {
        showError(err.response.data.message, 2000);
      }
    } finally {
      setIsSending(false);
    }
  }

  async function handleSignup(name, email, password, passwordConfirm) {
    setIsSending(true);
    try {
      const result = await axios({
        method: "post",
        url: `/api/v1/users/signup`,
        data: {
          name,
          email,
          password,
          passwordConfirm,
        },
        withCredentials: true,
      });

      if (result.data.status === "success") {
        showSuccess("Đăng ký thành công", 2000);
        setTimeout(() => {
          document.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      showError(err.response.data.message, 2000);
      setIsSending(false);
    } finally {
      setIsSending(false);
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await axios({
        method: "post",
        url: "/api/v1/users/google-auth",
        data: {
          credential: credentialResponse.credential,
          isSignUp: !isLogin,
        },
        withCredentials: true,
      });

      if (result.data.status === "success") {
        showSuccess(
          !isLogin ? "Đăng ký thành công" : "Đăng nhập thành công",
          2000
        );
        setTimeout(() => {
          document.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      if (err.status === 403) {
        setFormData({ ...formData, email: err.response.data.message });
        setIsRecoverModalOpen(true);
      } else {
        showError(err.response.data.message, 2000);
      }
    }
  };

  const handleGoogleError = () => {
    showError("Đăng nhập Google thất bại", 2000);
  };

  const handleRecover = async () => {
    try {
      const { data } = await axios.patch(`/api/v1/users/recover-account`, {
        email: formData.email,
      });

      if (data.status === "success") {
        showSuccess(data.message, 2000);
      }
    } catch (err) {
      showError(err.response.data.message, 2000);
    } finally {
      setIsRecoverModalOpen(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
      agreeToTerms: false,
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <>
      {alert && (
        <ShowAlert
          type={alert.type}
          message={alert.message}
          duration={alert.duration}
          onClose={hideAlert}
        />
      )}

      <AccountRecoveryModal
        isOpen={isRecoverModalOpen}
        onClose={() => setIsRecoverModalOpen(false)}
        onRecover={handleRecover}
        userEmail={formData.email}
      />

      <div className="auth-page-wrapper">
        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
        />

        <div className="auth-card">
          {/* Info Section */}
          <div className="info-section">
            <button onClick={() => navigate("/")} className="back-btn">
              <ArrowLeft size={20} />
              <span>Quay lại</span>
            </button>

            <div className="brand-header">
              <div className="brand-logo">
                <div className="logo-icon">
                  <Leaf size={32} color="white" />
                </div>
                <h1 className="brand-title">SmartPlant</h1>
              </div>
              <h2 className="brand-subtitle">Chăm sóc cây trồng thông minh</h2>
              <p className="brand-desc">
                Giám sát và quản lý vườn cây của bạn từ xa với công nghệ IoT
                hiện đại
              </p>
            </div>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    className="w-5 h-5"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Theo dõi realtime</h3>
                  <p>Giám sát độ ẩm, nhiệt độ, ánh sáng 24/7</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    className="w-5 h-5"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Tưới tự động</h3>
                  <p>Hệ thống tưới thông minh theo nhu cầu cây</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    className="w-5 h-5"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="feature-text">
                  <h3>Cảnh báo thông minh</h3>
                  <p>Nhận thông báo khi cây cần chăm sóc</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="form-section-wrapper">
            {isLogin ? (
              <LoginForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleLogin}
                onSwitchToSignup={toggleAuthMode}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                isSending={isSending}
                onForgotPassword={() => setIsForgotPasswordOpen(true)}
                onGoogleError={handleGoogleError}
                onGoogleSuccess={handleGoogleSuccess}
                isLogin={isLogin}
              />
            ) : (
              <SignupForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSignup}
                onSwitchToLogin={toggleAuthMode}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onToggleConfirmPassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                isSending={isSending}
                onGoogleError={handleGoogleError}
                onGoogleSuccess={handleGoogleSuccess}
                isLogin={isLogin}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
