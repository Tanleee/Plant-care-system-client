import React from "react";
import { Navigate } from "react-router";

/**
 * @param {boolean} isAuthenticated - Trạng thái đã đăng nhập từ App State.
 * @param {JSX.Element} children - Các component con (ví dụ: MainLayout).
 */
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Chuyển hướng đến trang đăng nhập nếu chưa xác thực
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
