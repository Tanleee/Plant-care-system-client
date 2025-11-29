import React from "react";
import { CreditCard } from "lucide-react";

export default function BillingTab() {
  return (
    <div className="content-section">
      <div className="section-header">
        <h2 className="section-title">Thanh Toán & Hóa Đơn</h2>{" "}
        {/* Đã dịch: Billing & Payment */}
        <p className="section-subtitle">
          Quản lý phương thức thanh toán của bạn
        </p>{" "}
        {/* Đã dịch: Manage your payment methods */}
      </div>

      <div className="payment-methods">
        {/* Thẻ thanh toán hiện có */}
        <div className="payment-card">
          <CreditCard size={32} className="card-icon" />
          <div className="card-info">
            <span className="card-type">Visa kết thúc bằng 4242</span>{" "}
            {/* Đã dịch: Visa ending in 4242 */}
            <span className="card-expiry">Hết hạn 12/25</span>{" "}
            {/* Đã dịch: Expires 12/25 */}
          </div>
          <span className="badge-default">Mặc định</span>{" "}
          {/* Đã dịch: Default */}
        </div>

        {/* Nút thêm thẻ mới */}
        <button className="btn-outline">
          <CreditCard size={20} />
          Thêm Thẻ Mới {/* Đã dịch: Add New Card */}
        </button>
      </div>
    </div>
  );
}
