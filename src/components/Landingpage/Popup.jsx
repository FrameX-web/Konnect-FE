import React from "react";

const Popup = ({ open, onClose, message }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className="relative rounded-2xl px-8 py-7 max-w-xs w-full text-center border border-[#E9C77F]/40 shadow-2xl animate-popup-scale"
        style={{
          background: "linear-gradient(135deg, #181818 80%, #E9C77F22 100%)",
          boxShadow: "0 0 32px 0 #E9C77F55, 0 8px 32px 0 #000a",
          border: "2px solid #E9C77F55",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 bg-[#232323] hover:bg-[#E9C77F] text-gray-400 hover:text-[#232323] text-xl font-bold rounded-full w-8 h-8 flex items-center justify-center shadow transition-all duration-200 border border-[#E9C77F]/30"
          aria-label="Close popup"
          style={{
            boxShadow: "0 2px 8px #E9C77F33",
          }}
        >
          <span className="sr-only">Close</span>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-3 animate-bounce drop-shadow-glow">🚧</span>
          <h2
            className="text-[#E9C77F] text-xl font-extrabold mb-2 tracking-wide drop-shadow-glow"
            style={{ fontFamily: "'Krona One', sans-serif", letterSpacing: "0.05em" }}
          >
            Coming Soon!
          </h2>
          <p className="text-gray-200 text-base mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {message}
          </p>
          <span className="text-xs text-gray-400 mt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Stay tuned for updates.
          </span>
        </div>
      </div>
      <style>
        {`
          @keyframes popup-scale {
            0% { transform: scale(0.85); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-popup-scale {
            animation: popup-scale 0.25s cubic-bezier(.4,2,.6,1) both;
          }
          .drop-shadow-glow {
            filter: drop-shadow(0 0 8px #E9C77F88);
          }
        `}
      </style>
    </div>
  );
};

export default Popup;
