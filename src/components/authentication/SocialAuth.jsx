import React from "react";
import { GoogleLogin } from "@react-oauth/google";
// import FacebookLogin from "./FacebookLogin";

function SocialAuth({ onGoogleSuccess, onGoogleError, isLogin }) {
  return (
    <>
      <div className="divider">
        <div className="divider-line left"></div>
        <div className="divider-line right"></div>
        <span className="divider-text">HOẶC TIẾP TỤC VỚI</span>
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
        {/* <FacebookLogin isSignUp={!isLogin} /> */}
      </div>
    </>
  );
}

export default SocialAuth;
