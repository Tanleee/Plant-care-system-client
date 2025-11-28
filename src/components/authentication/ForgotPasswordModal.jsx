import React, { useState } from 'react';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!email) {
      setMessage({ type: 'error', text: 'Vui lòng nhập email' });
      return;
    }

    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setMessage({
        type: 'success',
        text: 'Link khôi phục mật khẩu đã được gửi đến email của bạn'
      });
      setIsSending(false);
      setTimeout(() => {
        onClose();
        setEmail('');
        setMessage(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Quên mật khẩu?</h3>
        <p className="form-subtitle" style={{ marginBottom: '1.5rem' }}>
          Nhập email của bạn và chúng tôi sẽ gửi link khôi phục mật khẩu
        </p>

        {message && (
          <div className={`status-message ${message.type}`}>{message.text}</div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          style={{ marginBottom: '1rem' }}
        />

        <div className="modal-actions">
          <button onClick={onClose} className="btn-secondary">
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSending}
            className="btn-primary"
            style={{ opacity: isSending ? 0.7 : 1 }}
          >
            {isSending ? 'Đang gửi...' : 'Gửi'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
