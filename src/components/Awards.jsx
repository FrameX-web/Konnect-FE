import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { FileText, Trophy } from "lucide-react";
import '@fontsource/montserrat/400.css';
import '@fontsource/krona-one/400.css';

// CertificateCard component
function CertificateCard({ title, description, image }) {
  const handleViewCertificate = (e) => {
    e.stopPropagation();
    if (image) {
      window.open(image, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border relative hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <button
          className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-semibold shadow-md hover:from-gray-800 hover:to-gray-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
          onClick={handleViewCertificate}
        >
          View Certificate
        </button>
      </div>
      <h3 className="text-base sm:text-lg lg:text-lg font-bold text-black mb-4 mt-6" style={{ fontFamily: 'Krona One, sans-serif' }}>
        {title}
      </h3>
      <p className="text-[14px] text-gray-800 leading-relaxed mb-6 font-bold">
        {description}
      </p>
      <div className="absolute bottom-4 right-4">
        <div className="w-10 lg:w-12 h-8 lg:h-10 bg-gradient-to-br from-[#E9C77F] to-[#D4B270] rounded-lg flex items-center justify-center shadow-lg">
          <FileText className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

// Certificate info array with image paths
const certificates = [
  {
    title: "ROHS (Restriction of Hazardous Substances)",
    description: "Confirms that Konnect's packaging materials are free from harmful substances, making them safe for industrial and export applications.",
    image: "/Cetificates/ROHS.jpg"
  },
  {
    title: "ZED (Zero Effect, Zero Defect) Certification",
    description: "A prestigious Indian government certification promoting quality manufacturing with minimal environmental impact.",
    image: "/Cetificates/ZED.jpg"
  },
  {
    title: "CE Certification",
    description: "Ensures Konnect's products meet European safety, health, and environmental protection standards—critical for international trade and credibility.",
    image: "/Cetificates/CE.jpg"
  },
  {
    title: "GPSD-certified",
    description: "GPSD-certified products meet EU safety standards (2001/95/EC), ensuring safe, risk-free use and compliance for the EU market.",
    image: "/Cetificates/GPSD.jpg"
  }
];

// Certificate Carousel Card
const CertificateCarouselCard = CertificateCard;

function AwardsCertifications() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Infinite scroll: prepend and append 3 items for smoothness
  const extendedCertificates = [
    ...certificates.slice(-3),
    ...certificates,
    ...certificates.slice(0, 3),
  ];
  const totalCards = certificates.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      setCurrentIndex(0);
      const cardWidthPercent = 100 / extendedCertificates.length;
      const initialOffset = 3 * cardWidthPercent;
      carouselRef.current.style.transition = 'none';
      carouselRef.current.style.transform = `translateX(-${initialOffset}%)`;
      setTimeout(() => setIsLoaded(true), 50);
    }
  }, [isMobile, extendedCertificates.length]);

  useEffect(() => {
    if (!isMobile && isLoaded && !isHovered) {
      const interval = setInterval(() => {
        if (!isAnimating) {
          handleNext();
        }
      }, 1800); // was 3000
      return () => clearInterval(interval);
    }
  }, [isMobile, isLoaded, isAnimating, currentIndex, isHovered]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);

    const cardWidth = 100 / extendedCertificates.length;
    const translateX = -((3 + newIndex) * cardWidth);

    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.3s ease-in-out'; // was 0.5s
      carouselRef.current.style.transform = `translateX(${translateX}%)`;
    }

    setTimeout(() => {
      if (newIndex >= totalCards) {
        setCurrentIndex(0);
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          carouselRef.current.style.transform = `translateX(-${3 * cardWidth}%)`;
        }
      }
      setIsAnimating(false);
    }, 300); // was 500
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);

    const cardWidth = 100 / extendedCertificates.length;
    const translateX = -((3 + newIndex) * cardWidth);

    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.3s ease-in-out'; // was 0.5s
      carouselRef.current.style.transform = `translateX(${translateX}%)`;
    }

    setTimeout(() => {
      if (newIndex < 0) {
        setCurrentIndex(totalCards - 1);
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          carouselRef.current.style.transform = `translateX(-${(3 + totalCards - 1) * cardWidth}%)`;
        }
      }
      setIsAnimating(false);
    }, 300); // was 500
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);

    const cardWidth = 100 / extendedCertificates.length;
    const translateX = -((3 + index) * cardWidth);

    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.3s ease-in-out'; // was 0.5s
      carouselRef.current.style.transform = `translateX(${translateX}%)`;
    }

    setTimeout(() => setIsAnimating(false), 300); // was 500
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <div className="w-full bg-gray-100 py-12 px-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#E9C77F] to-[#FBE6B7] rounded-2xl p-6 lg:p-8 mb-12 hover:shadow-lg transition-shadow duration-300">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-black mb-4" style={{ fontFamily: 'Krona One, sans-serif' }}>
            Awards & Certifications
          </h1>
          <p className="text-sm font-medium sm:text-base lg:text-lg text-black/80 leading-relaxed max-w-4xl">
            Recognized for excellence in sustainable packaging solutions, 
            Konnect holds industry certifications that validate our innovation and 
            ESG commitment.
          </p>
        </div>

        {/* Awards Section with background image */}
        <div className="relative mb-16 flex flex-col items-center">
          {/* Background image starts below the top banner */}
          <img
            src="/awardbg.png"
            alt="Awards Background"
            className="absolute left-0 top-0 w-full h-full object-cover opacity-100 pointer-events-none select-none z-0"
            style={{
              objectPosition: 'top',
              maxHeight: '600px',
              minHeight: '300px',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black" style={{ fontFamily: 'Krona One, sans-serif' }}>
                Awards
              </h2>
              <Trophy className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#E9C77F]" />
            </div>
            {/* Show award2.png on mobile, award.png on tablet/desktop */}
            <img
              src="/award2.png"
              alt="Awards"
              className="block sm:hidden w-auto max-w-xs"
            />
            <img
              src="/award.png"
              alt="Awards"
              className="hidden sm:block w-auto max-w-xs sm:max-w-md lg:max-w-4xl"
            />
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black" style={{ fontFamily: 'Krona One, sans-serif' }}>Certifications</h2>
            <FileText className="w-12 h-12 sm:w-14 sm:h-14 lg:w-14 lg:h-14 text-[#E9C77F]" />
          </div>
          {/* Carousel */}
          <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="w-full max-w-full overflow-hidden px-2 sm:px-3 py-8 sm:py-10">
              <div
                ref={carouselRef}
                className={`flex ${isLoaded ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{
                  width: `${extendedCertificates.length * 100 / (isMobile ? 1 : 3)}%`,
                  opacity: isLoaded ? 1 : 0,
                  transition: isLoaded ? 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out' : 'none',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {extendedCertificates.map((cert, index) => (
                  <div
                    key={`${cert.title}-${index}`}
                    className="flex justify-center"
                    style={{
                      width: `${100 / extendedCertificates.length}%`,
                      padding: isMobile ? '0 4px' : '0 8px',
                    }}
                  >
                    <CertificateCarouselCard
                      title={cert.title}
                      description={cert.description}
                      image={cert.image}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Prev/Next buttons (optional, can be added for desktop) */}
            {/* <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10">Prev</button>
            <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-10">Next</button> */}
          </div>
          {/* Carousel indicators */}
          <div className="flex justify-center mt-6 sm:mt-8">
            {certificates.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full transition-all duration-300 ${
                  idx === (currentIndex % totalCards) ? "bg-black scale-110" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          {/* Mobile swipe instruction */}
          <div className="text-center mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm sm:hidden">
            Swipe left or right to navigate
          </div>
        </div>
      </div>
    </div>
  );
}

export default AwardsCertifications;