import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import CountryFlag from 'react-country-flag';
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat/400.css';

const WelcomePopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryOptions] = useState(countryList().getData());

  useEffect(() => {
    setTimeout(() => {
      setShowButton(true);
      setTimeout(() => setHighlight(true), 600);
      setTimeout(() => setHighlight(false), 2600);
    }, 1000);
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    setTimeout(() => setIsAnimating(true), 50);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsPopupOpen(false);
    }, 300);
  };

  const BACKEND_URL = (import.meta.env.VITE_BACKEND_API_URL && import.meta.env.VITE_BACKEND_API_URL.trim())
    ? import.meta.env.VITE_BACKEND_API_URL.replace(/\/+$/, '')
    : (import.meta.env.DEV ? 'http://localhost:5000' : 'https://konnect-be.vercel.app');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.country.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/welcome`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Thank you for your interest!');
        localStorage.setItem('hasVisitedBefore', 'true');
        handleClose();
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch {
      alert('Failed to submit. Please try again.');
    }
    setIsSubmitting(false);
  };

  const selectedCountry = countryOptions.find(option => option.label === formData.country);

  return (
    <>
      {/* Floating Button */}
      <div
        className="fixed z-[9998] transition-all duration-500 ease-out"
        style={{
          right: showButton ? '0' : '-80px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Montserrat, sans-serif',
          opacity: showButton ? 1 : 0
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={handleOpenPopup}
          className="relative rounded-l-full shadow-lg flex items-center overflow-hidden transition-all duration-300 ease-out hover:shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)',
            height: 'clamp(45px, 12vw, 60px)',
            width: isHovered ? 'min(220px, 55vw)' : 'clamp(45px, 12vw, 60px)',
            animation: highlight ? 'gentle-bounce 0.5s ease-in-out 4' : 'none'
          }}
          aria-label="Open contact form"
        >
          <div 
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 'clamp(45px, 12vw, 60px)',
              height: 'clamp(45px, 12vw, 60px)'
            }}
          >
            <span 
              className="font-bold text-white"
              style={{ fontSize: 'clamp(18px, 5vw, 24px)' }}
            >
              !
            </span>
          </div>
          <div
            className="hidden md:block pr-4 whitespace-nowrap transition-opacity duration-500 ease-out"
            style={{
              opacity: isHovered ? 1 : 0
            }}
          >
            <span className="text-[11px] font-semibold text-white leading-tight">
              Need Help? Let's Connect!
            </span>
          </div>
        </button>
      </div>

      {/* Keyframe Animation */}
      <style>
        {`
          @keyframes gentle-bounce {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(-10px);
            }
          }
        `}
      </style>

      {/* Popup Modal */}
      {isPopupOpen && (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300"
      style={{ 
        fontFamily: 'Montserrat, sans-serif',
        zIndex: 9999,
        opacity: isAnimating ? 1 : 0
      }}
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={handleClose}
        style={{ opacity: isAnimating ? 1 : 0 }}
      />
      <div 
        className="relative w-full max-w-md rounded-3xl shadow-2xl transition-all duration-300"
        style={{ 
          background: 'linear-gradient(135deg, #E9C77F 0%, #FBE6B7 100%)',
          transform: isAnimating ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          opacity: isAnimating ? 1 : 0,
          overflow: 'visible'
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/80 hover:bg-black rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto" style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>
          <h2 
            className="text-xl sm:text-2xl font-bold text-black mb-2 text-center"
            style={{ fontFamily: 'Krona One, sans-serif', letterSpacing: '1px' }}
          >
            GET IN TOUCH
          </h2>
          <p className="text-center text-black/80 mb-4 sm:mb-6 text-xs sm:text-sm px-2">
            Share your details and we'll reach out to you shortly
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Name *"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-full bg-white/70 placeholder-gray-600 text-black focus:outline-none focus:bg-white/90 focus:ring-2 focus:ring-black/20 transition-all text-sm border-2 border-white"
              required
            />
            <input
              type="tel"
              placeholder="Phone *"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-full bg-white/70 placeholder-gray-600 text-black focus:outline-none focus:bg-white/90 focus:ring-2 focus:ring-black/20 transition-all text-sm border-2 border-white"
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-full bg-white/70 placeholder-gray-600 text-black focus:outline-none focus:bg-white/90 focus:ring-2 focus:ring-black/20 transition-all text-sm border-2 border-white"
              required
            />
            <Select
              options={countryOptions}
              value={selectedCountry || null}
              onChange={option => setFormData(prev => ({ ...prev, country: option ? option.label : '' }))}
              placeholder="Country *"
              className="react-select-container"
              classNamePrefix="react-select"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.7)',
                  border: '2px solid #fff',
                  minHeight: '42px',
                  boxShadow: state.isFocused ? '0 0 0 2px rgba(0,0,0,0.2)' : 'none',
                  fontSize: '0.875rem',
                  paddingLeft: '0.5rem',
                  '&:hover': { background: 'rgba(255,255,255,0.9)' }
                }),
                placeholder: (provided) => ({ ...provided, color: '#666' }),
                singleValue: (provided) => ({ ...provided, color: '#111' }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#F0D395' : '#fff',
                  color: '#111',
                  cursor: 'pointer'
                }),
                menu: (provided) => ({ 
                  ...provided, 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  zIndex: 99999
                }),
                menuPortal: (provided) => ({
                  ...provided,
                  zIndex: 99999
                }),
              }}
              formatOptionLabel={option => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CountryFlag
                    countryCode={option.value}
                    svg
                    style={{ width: '1.5em', height: '1.5em', marginRight: 8, borderRadius: '50%' }}
                  />
                  <span>{option.label}</span>
                </div>
              )}
              isClearable
              menuPortalTarget={document.body}
            />
            <input
              type="text"
              placeholder="Area of Interest (Optional)"
              value={formData.interest}
              onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-full bg-white/70 placeholder-gray-600 text-black focus:outline-none focus:bg-white/90 focus:ring-2 focus:ring-black/20 transition-all text-sm border-2 border-white"
            />

            <div className="flex justify-center pt-2 sm:pt-4">
              <button
                type="submit"
                className="bg-black text-white px-8 py-2.5 rounded-full font-bold text-xs hover:bg-gray-800 transition-all duration-200 tracking-wider disabled:opacity-50 hover:scale-105"
                style={{ fontFamily: 'Krona One, sans-serif' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      )}
    </>
  );
};

export default WelcomePopup;
