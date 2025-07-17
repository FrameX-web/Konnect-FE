import React from "react";

const Popup = ({ open, onClose, message }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="relative rounded-lg px-8 py-8 max-w-xs w-full text-center border shadow-2xl animate-popup-scale"
        style={{
          backgroundColor: "#1a1a1a",
          borderColor: "#E9C77F",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(233, 199, 127, 0.1)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-200"
          aria-label="Close popup"
        >
          <span className="sr-only">Close</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-4xl mb-4">🚧</span>
          <h2
            className="text-white text-lg font-bold mb-3 tracking-wide"
            style={{ fontFamily: "'Krona One', sans-serif" }}
          >
            Coming Soon!
          </h2>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {message}
          </p>
          <span className="text-xs text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Stay tuned for updates.
          </span>
        </div>
      </div>
      
      <style>
        {`
          @keyframes popup-scale {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-popup-scale {
            animation: popup-scale 0.2s ease-out both;
          }
        `}
      </style>
    </div>
  );
};

export default Popup;