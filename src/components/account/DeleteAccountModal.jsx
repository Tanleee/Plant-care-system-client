import React from "react";
import { Trash2 } from "lucide-react";

export default function DeleteAccountModal({ show, onClose, onDelete }) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-danger">
            <Trash2 size={24} />
          </div>
          <h3 className="modal-title">Xác Nhận Xóa Tài Khoản</h3>{" "}
          <p className="user-modal-description">
            Bạn có chắc chắn muốn xóa tài khoản của mình không? Hành động này
            <b> không thể hoàn tác</b> và tất cả dữ liệu của bạn sẽ bị xóa vĩnh
            viễn.
          </p>
        </div>

        <div className="modal-actions">
          <button className="modal-btn-cancel" onClick={onClose}>
            Hủy Bỏ
          </button>
          <button className="modal-btn-danger" onClick={onDelete}>
            <Trash2 size={18} />
            Xóa Tài Khoản
          </button>
        </div>
      </div>
    </div>
  );
}
