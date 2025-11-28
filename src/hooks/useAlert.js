import React, { useState } from 'react';

export default function useAlert() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message, duration = 5000) => {
    setAlert({ type, message, duration });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return {
    alert,
    showAlert,
    hideAlert,
    showSuccess: (msg, duration) => showAlert('success', msg, duration),
    showError: (msg, duration) => showAlert('error', msg, duration),
    showWarning: (msg, duration) => showAlert('warning', msg, duration),
    showInfo: (msg, duration) => showAlert('info', msg, duration)
  };
}
