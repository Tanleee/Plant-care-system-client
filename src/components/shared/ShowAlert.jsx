import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Component ShowAlert với animation và responsive
export default function ShowAlert({
  type = 'info',
  message,
  duration = 5000,
  onClose
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!isVisible) return null;

  // Cấu hình alert đã được Việt hóa (success -> thành công, error -> lỗi, ...)
  const alertConfig = {
    success: {
      icon: CheckCircle,
      bgColor: '#10b981',
      bgLight: '#d1fae5',
      textColor: '#065f46',
      borderColor: '#34d399'
    },
    error: {
      icon: XCircle,
      bgColor: '#ef4444',
      bgLight: '#fee2e2',
      textColor: '#991b1b',
      borderColor: '#f87171'
    },
    warning: {
      icon: AlertCircle,
      bgColor: '#f59e0b',
      bgLight: '#fef3c7',
      textColor: '#92400e',
      borderColor: '#fbbf24'
    },
    info: {
      icon: Info,
      bgColor: '#3b82f6',
      bgLight: '#dbeafe',
      textColor: '#1e40af',
      borderColor: '#60a5fa'
    }
  };

  const config = alertConfig[type] || alertConfig.info;
  const Icon = config.icon;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: isExiting
          ? 'translateX(-50%) translateY(-120%)'
          : 'translateX(-50%) translateY(0)',
        zIndex: 9999,
        width: '90%',
        maxWidth: '500px',
        opacity: isExiting ? 0 : 1,
        transition: 'all 0.3s ease-out',
        animation: isExiting ? 'none' : 'slideDown 0.3s ease-out',
        padding: '0 15px'
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          border: `2px solid ${config.borderColor}`,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background gradient accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${config.bgColor} 0%, ${config.borderColor} 100%)`
          }}
        />

        {/* Icon container */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: config.bgLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Icon size={24} color={config.bgColor} strokeWidth={2.5} />
        </div>

        {/* Message */}
        <div
          style={{
            flex: 1,
            paddingTop: '8px',
            paddingRight: '10px'
          }}
        >
          <p
            style={{
              margin: 0,
              color: config.textColor,
              fontSize: '15px',
              lineHeight: '1.5',
              fontWeight: '500',
              wordBreak: 'break-word'
            }}
          >
            {message}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
            flexShrink: 0,
            marginTop: '4px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = config.bgLight;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
          aria-label="Đóng thông báo" // Đã dịch: "Close alert"
        >
          <X size={20} color={config.bgColor} />
        </button>

        {/* Progress bar for auto-dismiss */}
        {duration > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '3px',
              background: config.bgColor,
              animation: `shrink ${duration}ms linear`,
              transformOrigin: 'left'
            }}
          />
        )}
      </div>

      <style>
        {`
          @keyframes slideDown {
            from {
              transform: translateX(-50%) translateY(-120%);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }

          @keyframes shrink {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }

          @media (max-width: 640px) {
            /* Tối ưu cho thiết bị di động */ // Đã dịch: "Mobile optimization"
          }
        `}
      </style>
    </div>
  );
}
