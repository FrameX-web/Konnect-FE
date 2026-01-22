import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat/400.css';
import Popup from './Popup'; // import Popup component

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const navButtonStyle =
    'font-krona text-black font-medium bg-white rounded-full shadow-sm hover:shadow-lg hover:bg-[#f8f8f8] cursor-pointer transition-all duration-200 whitespace-nowrap';

  const dropdownItemStyle =
    'block truncate whitespace-nowrap text-gray-700 hover:bg-gray-100 transition-all duration-150 font-montserrat';

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsAnimating(false);
        setActiveDropdown(null);
      }, 500);
    } else {
      setIsMobileMenuOpen(true);
      setActiveDropdown(null);
    }
  };

  const closeMobileMenu = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsAnimating(false);
      setActiveDropdown(null);
    }, 500);
  };

  const handleGlobalFootprintClick = (e) => {
    e.preventDefault();
    setActiveDropdown(null);
    window.location.href = '/global-footprint';
  };

  const handleMobileGlobalFootprintClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
    window.location.href = '/global-footprint';
  };

  const handleAwardsCertificationsClick = (e) => {
    e.preventDefault();
    setActiveDropdown(null);
    window.location.href = '/awards-certifications';
  };

  const handleMobileAwardsCertificationsClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
    window.location.href = '/awards-certifications';
  };

  const handleGalleryClick = (e) => {
    e.preventDefault();
    setActiveDropdown(null);
    window.location.href = '/gallery';
  };

  const handleMobileGalleryClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
    window.location.href = '/gallery';
  };

  return (
    <>
      <header className="w-full bg-transparent relative z-50 flex items-center" style={{
        padding: 'clamp(0.75rem, 1.5vw, 1.5rem) clamp(1rem, 2vw, 2rem)',
        minHeight: 'clamp(60px, 8vw, 80px)'
      }}>
        <nav className="flex items-center justify-between max-w-full mx-auto w-full">
          <a className="flex items-center cursor-pointer flex-shrink-0" href="/">
            <img 
              src="/logo.png" 
              alt="Konnect Packaging" 
              style={{
                height: 'clamp(2.5rem, 4vw, 4rem)'
              }}
            />
          </a>

          <div 
            className="hidden lg:flex items-center rounded-4xl bg-white/40 h-full flex-shrink-0"
            style={{
              gap: 'clamp(0.25rem, 0.8vw, 1rem)',
              padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.375rem, 0.8vw, 0.75rem)'
            }}
          >
            <a 
              href="/" 
              className={navButtonStyle}
              style={{
                fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
                padding: 'clamp(0.375rem, 0.8vw, 0.6rem) clamp(0.75rem, 1.5vw, 1.25rem)'
              }}
            >
              Home
            </a>

            <div className="relative h-full flex items-center">
              <button 
                onClick={() => toggleDropdown('about')} 
                className={`${navButtonStyle} flex items-center h-full`}
                style={{
                  fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
                  padding: 'clamp(0.375rem, 0.8vw, 0.6rem) clamp(0.75rem, 1.5vw, 1.25rem)',
                  gap: 'clamp(0.125rem, 0.3vw, 0.25rem)'
                }}
                type="button"
              >
                <span>About us</span>
                <ChevronDown style={{ width: 'clamp(0.75rem, 1.2vw, 1rem)', height: 'clamp(0.75rem, 1.2vw, 1rem)' }} />
              </button>
              <div className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-[9999] overflow-hidden transition-all duration-500 ease-in-out ${activeDropdown === 'about' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{
                  width: 'clamp(12rem, 20vw, 16rem)'
                }}
              >
                <div style={{ padding: 'clamp(0.375rem, 0.6vw, 0.5rem)' }}>
                  <a 
                    href="/our-story" 
                    className={dropdownItemStyle}
                    style={{
                      fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
                      padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                    }}
                  >
                    Our Story
                  </a>
                  <a 
                    href="/vision-values" 
                    className={dropdownItemStyle}
                    style={{
                      fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
                      padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                    }}
                  >
                    Vision & Values
                  </a>
                  <a 
                    href="/leadership" 
                    className={dropdownItemStyle}
                    style={{
                      fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
                      padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                    }}
                  >
                    Leadership Message
                  </a>
                  <a 
                    href="/global-footprint" 
                    onClick={handleGlobalFootprintClick} 
                    className={dropdownItemStyle}
                    style={{
                      fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
                      padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                    }}
                  >
                    Our Global Footprint
                  </a>
                  <a 
                    href="/awards-certifications" 
                    onClick={handleAwardsCertificationsClick} 
                    className={dropdownItemStyle}
                    style={{
                      fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
                      padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                    }}
                  >
                    Awards & Certifications
                  </a>
                  <a 
                    href="/future" 
                    className={dropdownItemStyle}
                    style={{
                      fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
                      padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                    }}
                  >
                    Future-Proof Protection
                  </a>
                  <a 
                    href="#" 
                    onClick={handleGalleryClick} 
                    className={dropdownItemStyle}
                    style={{
                      fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
                      padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                    }}
                  >
                    Gallery
                  </a>
                </div>
              </div>
            </div>

            <button 
              onClick={scrollToProducts} 
              className={navButtonStyle}
              style={{
                fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
                padding: 'clamp(0.375rem, 0.8vw, 0.6rem) clamp(0.75rem, 1.5vw, 1.25rem)'
              }}
            >
              Products
            </button>

            <div className="relative h-full flex items-center">
              <button 
                onClick={() => toggleDropdown('ecosectors')} 
                className={`${navButtonStyle} flex items-center h-full`}
                style={{
                  fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
                  padding: 'clamp(0.375rem, 0.8vw, 0.6rem) clamp(0.75rem, 1.5vw, 1.25rem)',
                  gap: 'clamp(0.125rem, 0.3vw, 0.25rem)'
                }}
                type="button"
              >
                <span>EcoSectors</span>
                <ChevronDown style={{ width: 'clamp(0.75rem, 1.2vw, 1rem)', height: 'clamp(0.75rem, 1.2vw, 1rem)' }} />
              </button>
              <div className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-[9999] overflow-hidden transition-all duration-500 ease-in-out ${activeDropdown === 'ecosectors' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{
                  width: 'clamp(14rem, 22vw, 20rem)'
                }}
              >
                <div style={{ padding: 'clamp(0.375rem, 0.6vw, 0.5rem)' }}>
                  <a 
                    href="/industries" 
                    className={dropdownItemStyle}
                    style={{
                      fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
                      padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                    }}
                  >
                    Industries We Serve
                  </a>
                  <a 
                    href="/eco-sustainability" 
                    className={dropdownItemStyle}
                    style={{
                      fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
                      padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                    }}
                  >
                    Eco-Friendly Sustainability
                  </a>
                  <a 
                    href="/custom-solutions" 
                    className={dropdownItemStyle}
                    style={{
                      fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
                      padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                    }}
                  >
                    Custom Solutions & Innovation
                  </a>
                </div>
              </div>
            </div>

            <a 
              href="/testimonials" 
              className={navButtonStyle}
              style={{
                fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
                padding: 'clamp(0.375rem, 0.8vw, 0.6rem) clamp(0.75rem, 1.5vw, 1.25rem)'
              }}
            >
              Testimonials
            </a>
            <a 
              href="/blogs" 
              className={navButtonStyle}
              style={{
                fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
                padding: 'clamp(0.375rem, 0.8vw, 0.6rem) clamp(0.75rem, 1.5vw, 1.25rem)'
              }}
            >
              Faq
            </a>
          </div>

          <a 
            href="/contact" 
            className="hidden lg:flex items-center bg-white/40 rounded-full shadow-sm hover:shadow-lg hover:bg-white/60 cursor-pointer transition-colors duration-150 h-full flex-shrink-0"
            style={{
              gap: 'clamp(0.25rem, 0.5vw, 0.5rem)',
              padding: 'clamp(0.25rem, 0.5vw, 0.375rem) clamp(0.5rem, 1vw, 0.75rem)'
            }}
          >
            <img 
              src="/contactlogo.png" 
              alt="Contact" 
              style={{
                width: 'clamp(1.25rem, 2vw, 2rem)',
                height: 'clamp(1.25rem, 2vw, 2rem)'
              }}
            />
            <span 
              className="text-black font-normal"
              style={{
                fontSize: 'clamp(0.65rem, 1vw, 0.875rem)'
              }}
            >
              Contact
            </span>
          </a>

          <button onClick={toggleMobileMenu} className="lg:hidden flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/40 rounded-full shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-200 active:scale-95" type="button" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-black" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-black" />}
          </button>
        </nav>

        {(isMobileMenuOpen || isAnimating) && (
          <div
            className={`lg:hidden fixed inset-0 bg-black/50 z-[9998] transition-all duration-500 ease-in-out ${
              isMobileMenuOpen && !isAnimating ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeMobileMenu}
          >
            <div
              className={`absolute top-0 right-0 w-72 sm:w-80 max-w-[85vw] h-full bg-white shadow-xl transform will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-[9999] ${
                isMobileMenuOpen && !isAnimating ? 'translate-x-0' : 'translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end p-3 sm:p-4">
                <button
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  type="button"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              <div className="px-4 sm:px-6 pb-4 sm:pb-6 font-montserrat">
                <div className="space-y-1 sm:space-y-2">
                  <a href="/" onClick={closeMobileMenu} className="block text-black font-medium text-base sm:text-lg py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-100 transition-colors">
                    Home
                  </a>

                  <div>
                    <button
                      onClick={() => toggleDropdown('about')}
                      className="w-full flex items-center justify-between text-black font-medium text-base sm:text-lg py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-100 transition-colors"
                      type="button"
                    >
                      <span>About us</span>
                      <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeDropdown === 'about' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="ml-3 sm:ml-4 mt-1.5 sm:mt-2 space-y-1 pb-2">
                        <a href="/our-story" onClick={closeMobileMenu} className="block text-gray-600 text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded hover:bg-gray-50 transition-colors">Our Story</a>
                        <a href="/vision-values" onClick={closeMobileMenu} className="block text-gray-600 text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded hover:bg-gray-50 transition-colors">Vision & Values</a>
                        <a href="/leadership" onClick={closeMobileMenu} className="block text-gray-600 text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded hover:bg-gray-50 transition-colors">Leadership Message</a>
                        <a href="/global-footprint" onClick={handleMobileGlobalFootprintClick} className="block text-gray-600 text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded hover:bg-gray-50 transition-colors">Our Global Footprint</a>
                        <a href="/awards-certifications" onClick={handleMobileAwardsCertificationsClick} className="block text-gray-600 text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded hover:bg-gray-50 transition-colors">Awards & Certifications</a>
                        <a href="/future" onClick={closeMobileMenu} className="block text-gray-600 text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded hover:bg-gray-50 transition-colors">Future-Proof Protection</a>
                        <a href="#" onClick={handleMobileGalleryClick} className="block text-gray-600 text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded hover:bg-gray-50 transition-colors">Gallery</a>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      scrollToProducts();
                      closeMobileMenu();
                    }}
                    className="block w-full text-left text-black font-medium text-base sm:text-lg py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Products
                  </button>

                  <div>
                    <button
                      onClick={() => toggleDropdown('ecosectors')}
                      className="w-full flex items-center justify-between text-black font-medium text-base sm:text-lg py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-100 transition-colors"
                      type="button"
                    >
                      <span>EcoSectors</span>
                      <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${activeDropdown === 'ecosectors' ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeDropdown === 'ecosectors' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="ml-3 sm:ml-4 mt-1.5 sm:mt-2 space-y-1 pb-2">
                        <a href="/industries" onClick={closeMobileMenu} className="block text-gray-600 text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded hover:bg-gray-50 transition-colors">Industries We Serve</a>
                        <a href="/eco-sustainability" onClick={closeMobileMenu} className="block text-gray-600 text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded hover:bg-gray-50 transition-colors">Eco-Friendly Sustainability</a>
                        <a href="/custom-solutions" onClick={closeMobileMenu} className="block text-gray-600 text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded hover:bg-gray-50 transition-colors">Custom Solutions & Innovation</a>
                      </div>
                    </div>
                  </div>

                  <a href="/testimonials" onClick={closeMobileMenu} className="block text-black font-medium text-base sm:text-lg py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-100 transition-colors">Testimonials</a>
                  <a href="/blogs" onClick={closeMobileMenu} className="block text-black font-medium text-base sm:text-lg py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-100 transition-colors">Faq</a>

                  <a
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-2.5 sm:space-x-3 bg-[#f2d896] px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 mt-4 sm:mt-6"
                  >
                    <img src="/contactlogo.png" alt="Contact" className="w-6 h-6 sm:w-8 sm:h-8" />
                    <span className="text-black font-medium text-base sm:text-lg">Contact</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;