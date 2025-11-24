import React from "react";
import "./../assets/auth.css";

const AuthPage = ({
  isLoginMode,
  setIsLoginMode,
  authForm,
  setAuthForm,
  handleAuth,
}) => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-icon">🌿</span>
          <h1 className="auth-title">SmartPlant Monitor</h1>
          <p className="auth-subtitle">Smart agriculture monitoring system</p>
        </div>

        <div className="auth-tabs">
          <button
            className={isLoginMode ? "auth-tab-active" : "auth-tab"}
            onClick={() => setIsLoginMode(true)}
          >
            Login
          </button>
          <button
            className={!isLoginMode ? "auth-tab-active" : "auth-tab"}
            onClick={() => setIsLoginMode(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleAuth} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={authForm.email}
              onChange={(e) =>
                setAuthForm({ ...authForm, email: e.target.value })
              }
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
              required
              placeholder="••••••••"
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                value={authForm.confirmPassword}
                onChange={(e) =>
                  setAuthForm({
                    ...authForm,
                    confirmPassword: e.target.value,
                  })
                }
                required
                placeholder="••••••••"
              />
            </div>
          )}

          <button type="submit" className="auth-button">
            {isLoginMode ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
