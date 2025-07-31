import Header from './Header'; // Import the Header component
import '@fontsource/montserrat'; // Import Montserrat font
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TITLES = [
  {
    title: (
      <>
        <div>Sealing Quality</div>
        <div>Delivering Trust.</div>
      </>
    ),
    subtitle: (
      <>
        From design to delivery, we ensure every bag reflects your brand's value. Strong. <br className="hidden lg:block"/>
        Stylish. Sustainable. Just like your vision.
      </>
    )
  },
  {
    title: (
      <>
        <div>Guarding Quality,</div>
        <div>Earning Trust.</div>
      </>
    ),
    subtitle: (
      <>
        Crafted from idea to impact, every product mirrors your brand's strength. Reliable. <br className="hidden lg:block"/>
        Refined. Responsible. Just like your vision.
      </>
    )
  }
];

const HERO_IMAGES = [
  "/hero/bg/1.png",
  "/hero/bg/2.png",
  "/hero/bg/3.png",
  "/hero/bg/4.png",
  "/hero/bg/5.png"
];

const Hero = ({ scrollToProducts }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [prevImgIndex, setPrevImgIndex] = useState(HERO_IMAGES.length - 1);
  const [isAnimating, setIsAnimating] = useState(false);

  const [textIndex, setTextIndex] = useState(0);
  const [nextTextIndex, setNextTextIndex] = useState(1);
  const [textAnimating, setTextAnimating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setPrevImgIndex(imgIndex);
        setImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        setIsAnimating(false);
      }, 900); // match duration of animation
    }, 4000);
    return () => clearInterval(imageInterval);
  }, [imgIndex]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextAnimating(true);
      setTimeout(() => {
        setTextIndex(nextTextIndex);
        setNextTextIndex((nextTextIndex + 1) % TITLES.length);
        setTextAnimating(false);
      }, 5000);
    }, 5000);
    return () => clearInterval(textInterval);
  }, [nextTextIndex]);

  const renderHeroImage = (src, className, z) => (
    <img
      key={src}
      src={src}
      alt="Konnect Packaging Bags"
      className={`
        w-full h-auto object-contain scale-140 md:scale-90 lg:scale-100 xl:scale-110 2xl:scale-300 transform origin-center
        absolute top-[-100px] md:top-30 left-10 md:left-0
        transition-all duration-[900ms] ease-in-out
        ${className}
      `}
      style={{ zIndex: z }}
    />
  );

  return (
    <div
      className="min-h-[70vh] md:min-h-[90vh] lg:min-h-[110vh] rounded-[2rem] md:rounded-[2rem] lg:rounded-[3rem] font-['Krona_One'] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAE5B5 0%, #EECF8E 100%)'
      }}
    >
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        <div className="flex flex-col md:flex-col lg:grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-16 items-center min-h-[calc(70vh-120px)] md:min-h-[calc(80vh-120px)] lg:min-h-[calc(100vh-150px)]">
          {/* Left Column - Product Image */}
          <div className="hidden md:flex lg:flex order-2 md:order-2 lg:order-1 flex-col items-start md:items-center lg:items-start space-y-6 pt-4 md:pt-6 lg:pt-8 relative">
            <div className="relative z-30 md:left-6 lg:left-16 xl:left-24 2xl:left-32 top-0 w-1/3 md:w-2/5 lg:w-2/5 h-full" style={{ minHeight: '300px' }}>
              {renderHeroImage(HERO_IMAGES[prevImgIndex], isAnimating ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100", 10)}
              {renderHeroImage(HERO_IMAGES[imgIndex], isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0", 20)}
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="order-1 md:order-1 lg:order-2 flex flex-col items-start md:items-center lg:items-start text-left md:text-center lg:text-left relative">
            <div className="hidden lg:block absolute -top-25 -left-180 z-30">
              <img
                src="/hero/1.png"
                alt="Certification Badge"
                className="w-36 lg:w-44 xl:w-50 2xl:w-46 h-auto object-contain transition-transform duration-500 hover:scale-105 cursor-pointer"
                onClick={() => navigate('/awards-certifications')}
              />
            </div>

            <div className="max-w-2xl z-20 relative lg:-top-30">
              <div className="bg-black text-white px-2 rounded-full text-[0.65rem] md:text-base lg:text-lg xl:text-xl 2xl:text-[1.2rem] font-medium mb-3 inline-block font-['Krona_One']">
                KONNECT PACKAGING
              </div>

              {/* Title Animation */}
              <div className="relative overflow-hidden h-20 w-[23rem] md:h-24 lg:w-[30rem] xl:w-[37rem] 2xl:w-[40rem] lg:h-32 xl:h-40 2xl:h-35">
                <div className={`absolute top-0 left-1 w-full transition-all duration-1000 ease-in-out ${textAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                  <h1 className="text-3xl lg:text-[2.5rem] xl:text-[3.5rem] font-normal text-black leading-tight font-['Krona_One']">
                    {TITLES[textIndex].title}
                  </h1>
                </div>
                <div className={`absolute top-0 left-1 w-full transition-all duration-1000 ease-in-out ${textAnimating ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                  <h1 className="text-3xl lg:text-[2.5rem] xl:text-[3.5rem] font-normal text-black leading-tight font-['Krona_One']">
                    {TITLES[nextTextIndex].title}
                  </h1>
                </div>
              </div>

              {/* Subtitle Animation */}
                <div className="relative overflow-hidden h-12 lg:h-8 xl:h-8 2xl:h-12 w-full max-w-2xl 2xl:mb-12 mb-0">
                <div className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${textAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                  <p className="text-black lg:text-nowrap font-medium text-[0.65rem] md:text-sm lg:text-[1rem] xl:text-[1rem] 2xl:text-[0.9rem] leading-relaxed max-w-sm md:max-w-md lg:max-w-md px-2 md:px-0 font-['Montserrat']">
                    {TITLES[textIndex].subtitle}
                  </p>
                </div>
                <div className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${textAnimating ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                   <p className="text-black lg:text-nowrap font-medium text-[0.65rem] md:text-sm lg:text-[1rem] xl:text-[1rem] 2xl:text-[0.9rem] leading-relaxed max-w-sm md:max-w-md lg:max-w-md px-2 md:px-0 font-['Montserrat']">
                   {TITLES[nextTextIndex].subtitle}
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-start md:justify-center lg:justify-end">
                <button
                  onClick={() => {
                    if (typeof scrollToProducts === "function") {
                      scrollToProducts();
                    } else {
                      // fallback: scroll to #products section if scrollToProducts not provided
                      const el = document.getElementById('products');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-black text-white 2xl:pl-4 2xl:px-2 px-1 pl-3 py-1 md:py-2.5 lg:py-2.5 xl:py-3 2xl:py-2 rounded-full flex items-center space-x-2 hover:bg-neutral-900 transition-all duration-300 font-['Krona_One'] font-normal text-[0.65rem] md:text-sm lg:text-sm xl:text-base transition-transform duration-500 hover:scale-105"
                >
                  <span>Explore Our Products</span>
                  <img
                    src="/arrow.png"
                    alt="Arrow"
                    className="w-6 h-6 md:w-4 md:h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 ml-1"
                  />
                </button>
              </div>

              <div className="flex justify-end pt-4 md:flex md:justify-center lg:hidden mb-2">
                <img
                  src="/hero/1.png"
                  alt="Certification Badge"
                  className="w-36 md:w-35 h-auto object-contain transition-transform duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => navigate('/certi')}
                />
              </div>
            </div>

            {/* Mobile image & Text */}
            <div className="block md:block lg:hidden flex flex-col text-white/70 leading-none pointer-events-none select-none text-left space-y-1 relative -top-8 z-10">
              <div className="text-[2.1rem] md:text-4xl font-normal">KONNECT</div>
              <div className="text-[2.1rem] md:text-4xl font-normal">PACKAGING</div>
              <div className="relative flex justify-center items-center w-full h-auto mt-2" style={{ minHeight: '180px' }}>
                {renderHeroImage(HERO_IMAGES[prevImgIndex], isAnimating ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100", 10)}
                {renderHeroImage(HERO_IMAGES[imgIndex], isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0", 20)}
              </div>
            </div>

            <div className="hidden lg:flex absolute right-30 top-35 opacity-60 flex flex-col text-white leading-none pointer-events-none select-none z-0 space-y-6 lg:space-y-6 xl:space-y-8 2xl:space-y-10">
              <div className="text-[3.5rem] lg:text-[4.5rem] xl:text-[6.5rem] 2xl:text-[9rem] font-light">KONNECT</div>
              <div className="text-[3.5rem] lg:text-[4.5rem] xl:text-[6.5rem] 2xl:text-[9rem] font-normal">PACKAGING</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
