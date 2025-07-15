import React from 'react';

const Toast = ({ message, onClose }) => (
  <div
    className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
    style={{ minWidth: 200 }}
  >
    <span className="flex-1">{message}</span>
    <button
      className="ml-4 text-white font-bold"
      onClick={onClose}
      aria-label="Close"
    >
      ×
    </button>
  </div>
);

export default Toast;
