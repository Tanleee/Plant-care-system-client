import React from "react";
import { GoogleLogin } from "@react-oauth/google";

function SocialAuth({ onGoogleSuccess, onGoogleError, isLogin }) {
  return (
    <>
      <div className="divider">
        <div className="divider-line left"></div>
        <div className="divider-line right"></div>
        <span className="divider-text">HOẶC TIẾP TỤC VỚI</span> {/* Đã dịch */}
      </div>

      {/* Social Buttons */}
      <div className="social-buttons">
        <GoogleLogin
          onSuccess={onGoogleSuccess}
          onError={onGoogleError}
          text={!isLogin ? "signup_with" : "signin_with"}
          shape="pill"
          theme="outline"
          size="large"
        />
        <button className="social-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>
      </div>
    </>
  );
}

export default SocialAuth;
