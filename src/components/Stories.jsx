import * as React from "react";
import { useState, useEffect, useRef } from "react";
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat/400.css';

function Stories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const featureCardsData = [
    {
      id: 'voices',
      title: 'Voices of Trust',
      description: 'Our clients share how Konnect Packaging made a difference. Real stories from real industries — built on reliability and results. Their trust fuels our drive to deliver more every day.',
      image: '/testimonials/2.png'
    },
    {
      id: 'partnerships',
      title: 'Partnerships That Deliver',
      description: 'Hear directly from businesses that trust our packaging expertise. Every success story reflects our commitment to quality and innovation. These testimonials are proof of our purpose-driven approach.',
      image: '/testimonials/1.png'
    },
    {
      id: 'perform',
      title: 'Built to Perform',
      description: 'Explore testimonials from industry-diverse sectors. From export protection to eco-packaging — we go beyond expectations. Decades of experience shaped by every client we serve.',
      image: '/testimonials/3.png'
    },
    {
      id: 'clients',
      title: 'What Our Clients Say',
      description: 'Insights from hundreds of satisfied businesses worldwide. Their words reflect the impact, consistency, and value we bring. It\'s not just packaging — it\'s confidence in every layer.',
      image: '/testimonials/4.png'
    }
  ];

  const testimonialsData = [
    {
      id: 'fahrettin',
      name: 'Fahrettin Yılmaz',
      position: 'Packaging Lead',
      initial: 'F',
      testimonial: "The quality of VCI laminates and their moisture-barrier technology has extended our product shelf life significantly. Konnect is our go-to partner.",
      badge: 'Aug 3, 2020',
      location: 'Ankara, Turkey'
    },
    {
      id: 'ankur',
      name: 'Ankur Mehta',
      position: 'Procurement Head',
      initial: 'A',
      testimonial: "Konnect's anti-corrosion packaging helped us reduce product damage during export by over 80%. Their team truly understands logistics-grade protection.",
      badge: 'June 18, 2021',
      location: 'Stuttgart, Germany'
    },
    {
      id: 'om',
      name: 'Om Pawar',
      position: 'Multimedia designer',
      initial: 'O',
      testimonial: "From material selection to delivery timelines, Konnect has been reliable and responsive. Their custom solutions fit perfectly with our OEM processes.",
      badge: 'Mar 9, 2023',
      location: 'Pune, India'
    },
    {
      id: 'claire',
      name: 'Claire van Dijk',
      position: 'Director',
      initial: 'C',
      testimonial: "We've worked with many suppliers, but Konnect stands out for its innovation and quality. Their R&D-backed packaging gave us a competitive edge in Europe.",
      badge: 'Nov 25, 2022',
      location: 'Rotterdam, Netherlands'
    }
  ];

  // Create extended array for infinite scroll
  const extendedTestimonials = [
    ...testimonialsData.slice(-3),
    ...testimonialsData,
    ...testimonialsData.slice(0, 3),
  ];
  const totalCards = testimonialsData.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize position to show first 3 cards (offset by 3 due to prepended items)
  useEffect(() => {
    if (carouselRef.current) {
      setCurrentIndex(0);
      const cardWidthPercent = 100 / extendedTestimonials.length;
      const initialOffset = 3 * cardWidthPercent;
      carouselRef.current.style.transition = 'none';
      carouselRef.current.style.transform = `translateX(-${initialOffset}%)`;
      setTimeout(() => setIsLoaded(true), 50);
    }
  }, [isMobile, extendedTestimonials.length]);

  // Auto-advance carousel on desktop every 3 seconds, pause on hover
  useEffect(() => {
    if (!isMobile && isLoaded && !isHovered) {
      const interval = setInterval(() => {
        if (!isAnimating) {
          handleNext();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isMobile, isLoaded, isAnimating, currentIndex, isHovered]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);

    const cardWidth = 100 / extendedTestimonials.length;
    const translateX = -((3 + newIndex) * cardWidth);

    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
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
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);

    const cardWidth = 100 / extendedTestimonials.length;
    const translateX = -((3 + newIndex) * cardWidth);

    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
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
    }, 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);

    const cardWidth = 100 / extendedTestimonials.length;
    const translateX = -((3 + index) * cardWidth);

    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      carouselRef.current.style.transform = `translateX(${translateX}%)`;
    }

    setTimeout(() => setIsAnimating(false), 500);
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

  const FeatureCard = ({ title, description, image }) => (
    <div className="bg-white border-2 border-black/60 rounded-[20px] p-8 pt-14 relative">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-7 h-7 object-cover"
        />
      </div>
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-black">{title}</h3>
      </div>
      <p className="text-gray-900 leading-normal font-medium text-center">
        {description}
      </p>
    </div>
  );

  const TestimonialCard = ({ name, position, initial, testimonial, badge, location }) => (
    <div className="bg-gradient-to-br from-[#E9C77F] to-[#FBE6B7] rounded-[20px] p-8 relative">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
          {initial}
        </div>
        <div>
          <h4 className="text-xl font-bold text-black">{name}</h4>
          <p className="text-sm text-black">{position}</p>
        </div>
      </div>
      <p className="text-black text-sm leading-relaxed  mb-6">
        {testimonial}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="bg-black text-white px-3 py-1 rounded-full text-xs">{badge}</span>
        </div>
        <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium">{location}</span>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-white py-16 px-6 lg:px-12" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header Section */}
      <div className="bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] rounded-[20px] p-8 lg:p-12 mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4" style={{ fontFamily: 'Krona One, sans-serif' }}>
          Testimonials & Client Stories
        </h1>
        <p className="text-lg lg:text-xl font-normal text-black mb-2">
          Real feedback. Real results.
        </p>
        <p className="text-base lg:text-lg font-normal text-black leading-relaxed">
          Hear from our global clients who trust Konnect Packaging for reliability, innovation, and performance.
          <br />
          Explore success stories that showcase how our solutions made a measurable impact.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {featureCardsData.map((card) => (
          <FeatureCard
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>

      {/* Global Trust Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-black mb-8" style={{ fontFamily: 'Krona One, sans-serif' }}>
          Global Trust. Proven Impact.
        </h2>
      </div>

      {/* Testimonials Carousel */}
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
              width: `${extendedTestimonials.length * 100 / (isMobile ? 1 : 3)}%`,
              opacity: isLoaded ? 1 : 0,
              transition: isLoaded ? 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out' : 'none',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex justify-center"
                style={{
                  width: `${100 / extendedTestimonials.length}%`,
                  padding: isMobile ? '0 4px' : '0 8px',
                }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  position={testimonial.position}
                  initial={testimonial.initial}
                  testimonial={testimonial.testimonial}
                  badge={testimonial.badge}
                  location={testimonial.location}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="flex justify-center mt-6 sm:mt-8">
        {testimonialsData.map((_, idx) => (
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
  );
}

export default Stories;
