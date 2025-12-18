import React from "react";
import { useNavigate } from "react-router";
import "./../assets/pageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-card">
          <div className="plant-icon-large">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="60" fill="#D1FAE5" />
              <path
                d="M60 30C60 30 45 36 45 54C45 72 60 78 60 90M60 30C60 30 75 36 75 54C75 72 60 78 60 90M60 30V90"
                stroke="#059669"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M50 60C50 60 45 65 48 72C51 79 58 80 60 80M70 60C70 60 75 65 72 72C69 79 62 80 60 80"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1 className="error-code">404</h1>
          <h2 className="error-title">Không tìm thấy trang</h2>
          <p className="error-description">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
            <br />
            Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ.
          </p>

          <div className="suggestion-cards">
            <div className="suggestion-card">
              <div
                className="suggestion-icon"
                style={{ background: "#D1FAE5" }}
              >
                <span style={{ fontSize: "24px" }}>📊</span>
              </div>
              <h3>Dashboard</h3>
              <p>Xem tổng quan hệ thống</p>
            </div>
            <div className="suggestion-card">
              <div
                className="suggestion-icon"
                style={{ background: "#DBEAFE" }}
              >
                <span style={{ fontSize: "24px" }}>📈</span>
              </div>
              <h3>Biểu đồ</h3>
              <p>Theo dõi số liệu</p>
            </div>
            <div className="suggestion-card">
              <div
                className="suggestion-icon"
                style={{ background: "#FEF3C7" }}
              >
                <span style={{ fontSize: "24px" }}>⚙️</span>
              </div>
              <h3>Điều khiển</h3>
              <p>Quản lý thiết bị</p>
            </div>
          </div>

          <button className="btn-home" onClick={() => navigate("/")}>
            <span>←</span>
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
