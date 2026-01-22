import * as React from "react";
import { useState, useEffect, useRef } from "react";
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat/400.css';

function Stories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
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
      id: 'rajesh',
      name: 'Rajesh Kumar',
      position: 'Supply Chain Manager',
      initial: 'R',
      testimonial: "Konnect's VCI packaging has been a game-changer for our automotive exports. The anti-corrosion protection is exceptional, and we've seen zero damage claims in the last 18 months. Highly reliable partner.",
      badge: 'Jan 15, 2024',
      location: 'Mumbai, India'
    },
    {
      id: 'martin',
      name: 'Martin Novák',
      position: 'Procurement Director',
      initial: 'M',
      testimonial: "Working with Konnect has streamlined our packaging operations significantly. Their custom solutions and timely delivery have helped us meet strict European compliance standards without any hassle.",
      badge: 'Oct 22, 2023',
      location: 'Bratislava, Slovakia'
    },
    {
      id: 'priya',
      name: 'Priya Sharma',
      position: 'Operations Head',
      initial: 'P',
      testimonial: "The quality consistency and technical support from Konnect is outstanding. Their moisture-barrier packaging has extended our product shelf life by 40%. A true partner in our growth journey.",
      badge: 'Mar 8, 2024',
      location: 'Pune, India'
    },
    {
      id: 'jana',
      name: 'Jana Kováčová',
      position: 'Logistics Manager',
      initial: 'J',
      testimonial: "Konnect's sustainable packaging solutions align perfectly with our ESG goals. Their R&D team worked closely with us to develop eco-friendly alternatives without compromising on protection quality.",
      badge: 'Dec 5, 2023',
      location: 'Košice, Slovakia'
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
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize position to show first cards (offset by prepended items)
  useEffect(() => {
    if (carouselRef.current) {
      setCurrentIndex(0);
      const cardWidthPercent = 100 / extendedTestimonials.length;
      const initialOffset = (isMobile ? 3 : isTablet ? 3 : 3) * cardWidthPercent;
      carouselRef.current.style.transition = 'none';
      carouselRef.current.style.transform = `translateX(-${initialOffset}%)`;
      setTimeout(() => setIsLoaded(true), 50);
    }
  }, [isMobile, isTablet, extendedTestimonials.length]);

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
    <div className="bg-white border-2 border-black/60 rounded-[20px] p-6 md:p-8 pt-12 md:pt-14 relative">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-7 h-7 object-cover"
        />
      </div>
      <div className="text-center mb-4 md:mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-black">{title}</h3>
      </div>
      <p className="text-gray-900 text-sm md:text-base leading-normal font-medium text-center">
        {description}
      </p>
    </div>
  );

  const TestimonialCard = ({ name, position, initial, testimonial, badge, location }) => (
    <div className="bg-gradient-to-br from-[#E9C77F] to-[#FBE6B7] rounded-[20px] p-6 md:p-8 relative">
      <div className="flex items-center mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold mr-3 md:mr-4">
          {initial}
        </div>
        <div>
          <h4 className="text-lg md:text-xl font-bold text-black">{name}</h4>
          <p className="text-xs md:text-sm text-black">{position}</p>
        </div>
      </div>
      <p className="text-black text-xs md:text-sm leading-relaxed mb-4 md:mb-6">
        {testimonial}
      </p>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <span className="bg-black text-white px-2 md:px-3 py-1 rounded-full text-[0.65rem] md:text-xs">{badge}</span>
        </div>
        <span className="bg-white text-black px-2 md:px-3 py-1 rounded-full text-[0.65rem] md:text-xs font-medium">{location}</span>
      </div>
    </div>
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const upsertTag = (selector, createFn) => {
      const existing = document.head.querySelector(selector);
      if (existing) return existing;
      const el = createFn();
      document.head.appendChild(el);
      return el;
    };
    const setMeta = ({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      const el = upsertTag(selector, () => {
        const m = document.createElement('meta');
        if (name) m.setAttribute('name', name);
        if (property) m.setAttribute('property', property);
        return m;
      });
      el.setAttribute('content', content);
    };
    const canonicalUrl = (typeof window !== 'undefined' && window.location?.href)
      ? window.location.href.split('#')[0]
      : 'https://www.konnectpackaging.com/testimonials';

    document.title = 'Testimonials & Client Stories | Konnect Packaging';

    const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', canonicalUrl);
    if (!canonical.parentElement) document.head.appendChild(canonical);

    setMeta({ name: 'description', content: 'Hear from global clients who trust Konnect Packaging for reliability, innovation, and performance in VCI and sustainable packaging.' });
    setMeta({ name: 'robots', content: 'index,follow' });
    setMeta({ property: 'og:title', content: 'Testimonials & Client Stories | Konnect Packaging' });
    setMeta({ property: 'og:description', content: 'Real feedback and results from businesses using our protective and sustainable packaging.' });
    setMeta({ property: 'og:type', content: 'website' });
    setMeta({ property: 'og:url', content: canonicalUrl });
    setMeta({ property: 'og:image', content: '/testimonials/1.png' });
    setMeta({ name: 'twitter:card', content: 'summary_large_image' });
    setMeta({ name: 'twitter:title', content: 'Testimonials & Client Stories' });
    setMeta({ name: 'twitter:description', content: 'Global trust. Proven impact. See what clients say about Konnect Packaging.' });
    setMeta({ name: 'twitter:image', content: '/testimonials/1.png' });

    // JSON-LD
    const parseDate = (d) => {
      const t = Date.parse(d);
      return Number.isNaN(t) ? undefined : new Date(t).toISOString();
    };
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Testimonials & Client Stories',
      url: canonicalUrl,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: (testimonialsData || []).map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Review',
            name: `Client testimonial from ${t.name}`,
            reviewBody: t.testimonial,
            author: { '@type': 'Person', name: t.name },
            datePublished: parseDate(t.badge),
            locationCreated: t.location
          }
        }))
      }
    };
    let script = document.getElementById('ld-testimonials');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-testimonials';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(ld);
  }, []);

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
              width: `${extendedTestimonials.length * 100 / (isMobile ? 1 : isTablet ? 2 : 3)}%`,
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
