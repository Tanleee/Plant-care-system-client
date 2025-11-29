import React, { useState } from "react";
import { X, AlertCircle, RefreshCw, UserX } from "lucide-react";
import "./../../assets/accountRecoveryModal.css";

const AccountRecoveryModal = ({ isOpen, onClose, onRecover, userEmail }) => {
  const [isRecovering, setIsRecovering] = useState(false);

  if (!isOpen) return null;

  const handleRecover = async () => {
    setIsRecovering(true);
    try {
      await onRecover();
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <div className="recovery-modal-overlay">
      <div className="recovery-modal-container">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="recovery-modal-close"
          disabled={isRecovering}
        >
          <X size={24} />
        </button>

        {/* Modal Content */}
        <div className="recovery-modal-content">
          {/* Icon */}
          <div className="recovery-modal-icon-wrapper">
            <div className="recovery-modal-icon">
              <AlertCircle size={32} />
            </div>
          </div>

          {/* Title */}
          <h2 className="recovery-modal-title">Tài Khoản Đã Bị Vô Hiệu Hóa</h2>

          {/* Description */}
          <div className="recovery-modal-description">
            <p className="recovery-modal-text">
              Tài khoản{" "}
              <span className="recovery-modal-email">{userEmail}</span> đã bị vô
              hiệu hóa trước đó.
            </p>
            <p className="recovery-modal-text">
              Bạn có muốn khôi phục và tiếp tục sử dụng tài khoản này không?
            </p>
          </div>

          {/* Info Box */}
          <div className="recovery-modal-info-box">
            <div className="recovery-modal-info-content">
              <div className="recovery-modal-info-icon">
                <AlertCircle size={20} />
              </div>
              <div className="recovery-modal-info-text">
                <h4 className="recovery-modal-info-title">
                  Sau khi khôi phục:
                </h4>
                <ul className="recovery-modal-info-list">
                  <li>• Bạn có thể đăng nhập và sử dụng đầy đủ tính năng</li>
                  <li>• Tất cả dữ liệu của bạn sẽ được giữ nguyên</li>
                  <li>• Bạn có thể vô hiệu hóa lại bất cứ lúc nào</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="recovery-modal-buttons">
            <button
              onClick={onClose}
              className="recovery-modal-cancel-btn"
              disabled={isRecovering}
            >
              <UserX size={20} />
              <span>Để Sau</span>
            </button>

            <button
              onClick={handleRecover}
              className="recovery-modal-recover-btn"
              disabled={isRecovering}
            >
              {isRecovering ? (
                <>
                  <div className="recovery-modal-spinner"></div>
                  <span>Đang Khôi Phục...</span>
                </>
              ) : (
                <>
                  <RefreshCw size={20} />
                  <span>Khôi Phục Ngay</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountRecoveryModal;
