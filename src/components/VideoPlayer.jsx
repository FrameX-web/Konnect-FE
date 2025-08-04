import React from 'react';

const VideoPlayer = ({ videoUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
      <div className="relative w-[95%] max-w-5xl mx-auto">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-black hover:text-gray-600 text-3xl transition-colors duration-200"
          aria-label="Close video"
        >
          &times;
        </button>
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://drive.google.com/file/d/${videoUrl}/preview`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
