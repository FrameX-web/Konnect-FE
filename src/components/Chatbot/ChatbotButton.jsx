import { useState } from 'react';
import Chatbot from './chatbot';

const ChatbotButton = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      {/* Chatbot Window */}
      {isChatbotOpen && (
        <div
          className="fixed bottom-20 right-4 z-50 transform transition-all duration-300 ease-out animate-slide-in"
        >
          <Chatbot onClose={toggleChatbot} />
        </div>
      )}

      {/* Cortana-Style Chat Button */}
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg 
          transform transition-all duration-300 z-40 focus:outline-none
          ${isChatbotOpen ? 'bg-blue-600 scale-110' : 'bg-blue-500 hover:bg-blue-400'}`}
        aria-label="Toggle Chatbot"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Central Circle */}
          <div
            className={`w-6 h-6 rounded-full bg-white transition-all duration-500 ${
              isChatbotOpen ? 'scale-110 opacity-90' : 'scale-100 opacity-100'
            }`}
          ></div>

          {/* Pulsating Ring 1 (Fast Pulse) */}
          <div
            className={`absolute w-10 h-10 rounded-full border-2 border-white 
              transition-all duration-1000 ${
              isChatbotOpen
                ? 'scale-125 opacity-20 animate-cortana-pulse'
                : 'scale-0 opacity-0'
            }`}
          ></div>

          {/* Pulsating Ring 2 (Delayed Pulse) */}
          <div
            className={`absolute w-12 h-12 rounded-full border border-white 
              transition-all duration-1500 ${
              isChatbotOpen
                ? 'scale-150 opacity-10 animate-cortana-pulse-delayed'
                : 'scale-0 opacity-0'
            }`}
          ></div>

          {/* Hover Glow Effect */}
          <div
            className={`absolute w-full h-full rounded-full bg-blue-300 
              transition-all duration-300 ${
              isChatbotOpen
                ? 'scale-0 opacity-0'
                : 'scale-0 opacity-0 group-hover:scale-125 group-hover:opacity-20'
            }`}
          ></div>

          {/* Breathing Effect for Idle State */}
          <div
            className={`absolute w-8 h-8 rounded-full bg-white/30 
              transition-all duration-2000 ${
              isChatbotOpen ? 'scale-110 opacity-40' : 'scale-100 opacity-60 animate-breathe'
            }`}
          ></div>
        </div>
      </button>
    </>
  );
};

export default ChatbotButton;
