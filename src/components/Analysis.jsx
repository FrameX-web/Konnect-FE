import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import CountryFlag from 'react-country-flag';

function Analysis() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    message: ''
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryOptions] = useState(countryList().getData());

  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000';

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024 // 2MB
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
    if (!uploadedFile) {
      alert('Please upload an image file.');
      return;
    }
    setIsSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append('file', uploadedFile);

    try {
      const res = await fetch(`${BACKEND_URL}/analytics`, {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', country: '', message: '' });
        setUploadedFile(null);
        setTimeout(() => setSuccess(false), 3000);
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
    <div className="w-full min-h-screen bg-white p-4  md:p-6 lg:p-8">
      <div className="max-w-7xl pt-8 mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#E9C77F] to-[#FBE6B7] rounded-2xl  p-6 md:p-8 mb-8">
          <h1 className="font-['Krona_One',sans-serif] text-[#111] text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight">
            Product Analysis
          </h1>
          <p className="font-['Montserrat',sans-serif] text-[#333] text-sm md:text-base lg:text-lg leading-relaxed max-w-4xl">
            We evaluate every product's design, material, and functionality to ensure it meets quality and performance 
            standards. This helps us create packaging that's efficient, appealing, and aligned with market needs.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="font-['Krona_One',sans-serif] text-[#111] text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-4">
              Have a product{' '}
              <span className="block pb-1 lg:pb-2 text-5xl lg:text-[5rem]">query?</span>
            </h2>
            <div className="flex flex-row items-end flex-wrap gap-2">
              <span className="font-['Krona_One',sans-serif] text-2xl md:text-4xl lg:text-5xl">
                Upload <br/>an image for
              </span>
              <span className="font-['Krona_One',sans-serif] text-5xl md:text-5xl lg:text-[5rem] text-[#111]">
                info
              </span>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#E5E5E5] rounded-lg border-none outline-none font-['Montserrat',sans-serif] text-[#666] placeholder-[#999]"
              />

              {/* Phone Input */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#E5E5E5] rounded-lg border-none outline-none font-['Montserrat',sans-serif] text-[#666] placeholder-[#999]"
              />

              {/* Email Input */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#E5E5E5] rounded-lg border-none outline-none font-['Montserrat',sans-serif] text-[#666] placeholder-[#999]"
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
                placeholder="Search country"
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderRadius: '0.5rem',
                    background: '#E5E5E5',
                    border: 'none',
                    minHeight: '48px',
                    boxShadow: state.isFocused ? '0 0 0 2px #E9C77F' : provided.boxShadow,
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '1rem',
                    paddingLeft: '0.5rem',
                  }),
                  input: (provided) => ({
                    ...provided,
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#666',
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#999',
                    fontFamily: 'Montserrat, sans-serif',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#666',
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

              {/* Message Textarea */}
              <textarea
                name="message"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-[#E5E5E5] rounded-lg border-none outline-none font-['Montserrat',sans-serif] text-[#666] placeholder-[#999] resize-none"
              />

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#111] text-white px-6 py-3 rounded-lg font-['Montserrat',sans-serif] text-sm font-medium hover:bg-[#333] transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'SEND MESSAGE'}
                </button>
              </div>
              {success && (
                <div className="text-green-700 text-center font-semibold mt-4">
                  Message sent successfully!
                </div>
              )}
            </form>

            {/* File Upload Section */}
            <div className="mt-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  isDragActive
                    ? 'border-[#F0D395] bg-[#F0D395]/10'
                    : 'border-[#CCC] bg-[#F9F9F9]'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center space-y-3">
                  <Upload className="w-12 h-12 text-[#666]" />
                  <p className="font-['Montserrat',sans-serif] text-[#666] text-lg">
                    Drag & Drop image here, or click to browse
                  </p>
                  <span className="text-xs text-gray-500">(Only image files, max 2MB)</span>
                </div>
              </div>
              {/* File Name Display */}
              {uploadedFile && (
                <div className="mt-3 flex items-center justify-between bg-[#F0F0F0] p-3 rounded-lg">
                  <span className="font-['Montserrat',sans-serif] text-[#666] text-sm">
                    Image name: {uploadedFile.name}
                  </span>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-[#999] hover:text-[#666] transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;