import { useState } from 'react';
import { Eye, EyeOff, Lock, User, Shield, AlertCircle, CheckCircle } from 'lucide-react';

const DEFAULT_ID = 'manas';
const DEFAULT_PASSWORD = 'manas123';

const AdminLogin = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (id === DEFAULT_ID && password === DEFAULT_PASSWORD) {
      onLogin();
    } else {
      setError('Invalid ID or password');
    }
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#E9C77F] to-[#FBE6B7] px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-xl"></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-[20vw] h-[5vw] mb-4">
            <img
              src="/logo.png"
              alt="Konnect Logo"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
          </div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-6 border border-white/20"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            fontFamily: 'Montserrat, sans-serif'
          }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Krona One, sans-serif' }}>
              Admin Login
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#E9C77F] to-[#FBE6B7] rounded-full mx-auto"></div>
          </div>

          {/* Admin ID Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Admin ID
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter your admin ID"
                value={id}
                onChange={e => setId(e.target.value)}
                onFocus={() => setFocusedField('id')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-gray-50 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400 ${
                  focusedField === 'id' 
                    ? 'border-[#E9C77F] ring-2 ring-[#E9C77F]/20' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 bg-gray-50 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400 ${
                  focusedField === 'password' 
                    ? 'border-[#E9C77F] ring-2 ring-[#E9C77F]/20' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-bold text-base transition-all duration-200 transform ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
            } text-[#E9C77F] shadow-lg`}
            style={{ fontFamily: 'Krona One, sans-serif', letterSpacing: '1px' }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-[#E9C77F] border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-4 w-4" />
                <span>LOG IN</span>
              </div>
            )}
          </button>

          {/* Additional Info */}
          <div className="text-center pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
              <CheckCircle className="h-3 w-3" />
              <span>Crafted with Excellence by FrameX</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;