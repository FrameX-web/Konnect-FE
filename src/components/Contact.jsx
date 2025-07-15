import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import BackButton from './BackButton';
import Toast from './Toast';
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat/400.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import CountryFlag from 'react-country-flag';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryOptions] = useState(countryList().getData());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Use the correct environment variable for backend API base URL
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent empty form submission
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.country.trim() ||
      !formData.message.trim()
    ) {
      alert('Please fill in all fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowToast(true);
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', country: '', message: '' });
        setTimeout(() => setShowToast(false), 3000);
      } else {
        setSuccess(false);
        alert('Failed to send message.');
      }
    } catch {
      setSuccess(false);
      alert('Failed to send message.');
    }
    setIsSubmitting(false);
  };

  // Helper to get selected country option
  const selectedCountry = countryOptions.find(
    (option) => option.label === formData.country
  );

  return (
    <div className="min-h-screen w-full p-4 relative" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Back Button */}
      <BackButton />

      {/* Main Container */}
      <div className="flex items-center justify-center min-h-[90%] pt-10">
        <div 
          className="relative w-full max-w-full lg:max-w-[90%] mx-auto flex lg:flex-row flex-col rounded-[0_0_150px_0] lg:rounded-[0_0_300px_0] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #E9C77F 0%, #FBE6B7 100%)',
            minHeight: '600px'
          }}
        >
          {/* Left Section - Contact Info */}
          <div className="flex-1 px-6 lg:px-12 py-8 lg:py-16 flex flex-col">
            {/* Contact Us Header */}
            <h1 
              className="text-3xl lg:text-5xl font-bold text-black mb-8 lg:mb-16 text-center lg:text-left"
              style={{ fontFamily: 'Krona One, sans-serif', letterSpacing: '2px' }}
            >
              CONTACT US
            </h1>
            
            {/* Contact Details */}
            <div className="space-y-6 lg:space-y-8 lg:mt-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 lg:w-14 h-12 lg:h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-black mb-1 lg:mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Contact Number
                  </h3>
                  <p className="text-black text-base lg:text-lg font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>+91-7774031665</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 lg:w-14 h-12 lg:h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-black mb-1 lg:mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    For general enquires
                  </h3>
                  <p className="text-black text-base lg:text-lg font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>info@konnectpackaging.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 lg:w-14 h-12 lg:h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-black mb-1 lg:mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    For material requirements
                  </h3>
                  <p className="text-black text-base lg:text-lg font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>sales@konnectpackaging.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Separator - Hidden on mobile */}
          <div className="hidden lg:block w-1 bg-white/60 my-12"></div>

          {/* Horizontal Separator - Visible on mobile */}
          <div className="lg:hidden h-1 bg-white/60 mx-6"></div>

          {/* Right Section - Contact Form */}
          <div
            className="flex-1 px-2 lg:px-12 py-8 lg:py-16 flex flex-col"
            style={{
              background: 'linear-gradient(90deg, #F0D395 0%, #EAC882 100%)',
              borderRadius: window.innerWidth < 1024 ? '10px 30px 150px 0' : '10px 30px 300px 0',
              margin: '30px',
            }}
          >
            {/* Send Us Message Header */}
            <h2 
              className="text-xl lg:text-2xl font-bold text-black mb-6 lg:mb-8 text-center"
              style={{ fontFamily: 'Krona One, sans-serif', letterSpacing: '1px' }}
            >
              SEND US MESSAGE
            </h2>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4 flex-1 flex flex-col justify-center">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 lg:px-6 py-3 lg:py-3 rounded-full bg-white/70 backdrop-blur-sm placeholder-gray-600 text-black focus:outline-none focus:bg-white/90 transition-all duration-200 text-base lg:text-lg border-2 border-white"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 lg:px-6 py-3 lg:py-3 rounded-full bg-white/70 backdrop-blur-sm placeholder-gray-600 text-black focus:outline-none focus:bg-white/90 transition-all duration-200 text-base lg:text-lg border-2 border-white"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 lg:px-6 py-3 lg:py-3 rounded-full bg-white/70 backdrop-blur-sm placeholder-gray-600 text-black focus:outline-none focus:bg-white/90 transition-all duration-200 text-base lg:text-lg border-2 border-white"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              
              {/* Country Input */}
              <Select
                options={countryOptions}
                value={selectedCountry || null}
                onChange={option =>
                  setFormData(prev => ({
                    ...prev,
                    country: option ? option.label : ''
                  }))
                }
                placeholder="Country"
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderRadius: '9999px',
                    background: 'rgba(255,255,255,0.7)',
                    border: '2px solid #fff',
                    minHeight: '48px',
                    boxShadow: state.isFocused ? '0 0 0 2px #E9C77F' : provided.boxShadow,
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '1rem',
                    paddingLeft: '0.5rem',
                  }),
                  input: (provided) => ({
                    ...provided,
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#111',
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#666',
                    fontFamily: 'Montserrat, sans-serif',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#111',
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    fontFamily: 'Montserrat, sans-serif',
                    backgroundColor: state.isFocused ? '#F0D395' : '#fff',
                    color: '#111',
                  }),
                  menu: (provided) => ({
                    ...provided,
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }),
                }}
                formatOptionLabel={option => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Show flag using react-country-flag */}
                    <CountryFlag
                      countryCode={option.value}
                      svg
                      style={{
                        width: '1.5em',
                        height: '1.5em',
                        marginRight: 8,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        boxShadow: '0 0 2px #ccc'
                      }}
                      aria-label={option.label}
                    />
                    <span>{option.label}</span>
                  </div>
                )}
                isClearable
              />
              
              <textarea
                name="message"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 lg:px-6 py-3 lg:py-3 rounded-3xl bg-white/70 backdrop-blur-sm placeholder-gray-600 text-black focus:outline-none focus:bg-white/90 transition-all duration-200 resize-none text-base lg:text-lg border-2 border-white lg:rows-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              
              {/* Submit Button */}
              <div className="flex justify-center pt-4 lg:pt-6">
                <button
                  type="submit"
                  className="bg-black text-white px-6 lg:px-8 py-2 lg:py-3 rounded-full font-bold text-xs lg:text-sm hover:bg-gray-800 transition-colors duration-200 tracking-wider"
                  style={{ fontFamily: 'Krona One, sans-serif' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'SEND MESSAGE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showToast && (
        <Toast message="Message sent successfully!" onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default Contact;