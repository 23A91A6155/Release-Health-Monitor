import React, { useEffect } from 'react';

export interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  toast: ToastData;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const iconMap = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className={`toast toast--${toast.type}`}>
      <span className="toast__icon">{iconMap[toast.type]}</span>
      <span className="toast__message">{toast.message}</span>
      <button className="toast__close" onClick={() => onClose(toast.id)} aria-label="Close">
        ×
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastData[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

export default Toast;
