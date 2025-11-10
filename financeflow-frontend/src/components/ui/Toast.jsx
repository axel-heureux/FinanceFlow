import React, { useState, useEffect } from 'react';

const Toast = ({ show, message, type = 'success', onHide, duration = 3000 }) => {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onHide();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onHide]);

  if (!show) return null;

  const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-primary';
  const icon = type === 'success' ? 'bi-check-circle' : type === 'error' ? 'bi-exclamation-triangle' : 'bi-info-circle';

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
      <div className={`toast show align-items-center text-white ${bgClass} border-0`} role="alert">
        <div className="d-flex">
          <div className="toast-body">
            <i className={`bi ${icon} me-2`}></i>
            {message}
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white me-2 m-auto" 
            onClick={onHide}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;