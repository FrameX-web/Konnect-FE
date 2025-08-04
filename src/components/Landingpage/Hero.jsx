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
        w-full h-auto object-contain transform origin-center
        absolute top-[-60px] md:top-0 lg:top-30 left-2 md:left-0
        transition-all duration-[900ms] ease-in-out
        ${className}
      `}
      style={{ zIndex: z }}
    />
  );

  return (
    <div
      className="min-h-[65vh] lg:min-h-[110vh] rounded-[1rem] lg:rounded-[3rem] font-['Krona_One'] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAE5B5 0%, #EECF8E 100%)'
      }}
    >
      <Header />
      <div className="max-w-7xl mx-auto px-2 lg:px-8 py-2 lg:py-8">
        <div className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-16 items-center min-h-[calc(65vh-80px)] lg:min-h-[calc(100vh-150px)]">
          {/* Left Column - Product Image */}
          <div className="hidden lg:flex order-2 lg:order-1 flex-col items-start lg:items-start space-y-4 pt-2 lg:pt-8 relative">
            <div
              className="relative -top-20 z-30 lg:left-16 xl:left-24 2xl:left-22 2xl:-top-30
                w-1/3 lg:w-[60%] xl:w-[70%] 2xl:w-[80%] h-full"
              style={{ minHeight: '250px' }}
            >
              {renderHeroImage(
                HERO_IMAGES[prevImgIndex],
                isAnimating
                  ? "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100 lg:scale-110 xl:scale-125 2xl:scale-130",
                10
              )}
              {renderHeroImage(
                HERO_IMAGES[imgIndex],
                isAnimating
                  ? "translate-x-0 opacity-100 lg:scale-110 xl:scale-125 2xl:scale-130"
                  : "translate-x-full opacity-0 lg:scale-110 xl:scale-125 2xl:scale-130",
                20
              )}
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="order-1 lg:order-2 flex flex-col items-start lg:items-start text-left lg:text-left relative">
            <div className="hidden lg:block absolute -top-25 -left-180 z-30">
              <img
                src="/hero/1.png"
                alt="Certification Badge"
                className="w-32 lg:w-44 xl:w-50 2xl:w-46 h-auto object-contain transition-transform duration-500 hover:scale-105 cursor-pointer"
                onClick={() => navigate('/awards-certifications')}
              />
            </div>

            <div className="z-20 relative lg:-top-30 w-full">
              <div className="bg-black text-white px-1.5 py-0.5 rounded-full text-[2.5vw] lg:text-lg xl:text-xl 2xl:text-[1.2rem] font-medium mb-1.5 inline-block font-['Krona_One']">
                KONNECT PACKAGING
              </div>

              {/* Title Animation */}
              <div className="relative overflow-hidden h-[20vw] lg:h-32 xl:h-40 2xl:h-35 w-full lg:w-[30rem] xl:w-[37rem] 2xl:w-[40rem]">
                <div className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${textAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                  <h1 className="text-[7vw] lg:text-[2.5rem] xl:text-[3.5rem] font-normal text-black leading-snug lg:leading-tight font-['Krona_One'] break-words max-w-full">
                    {TITLES[textIndex].title}
                  </h1>
                </div>
                <div className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${textAnimating ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                  <h1 className="text-[7vw] lg:text-[2.5rem] xl:text-[3.5rem] font-normal text-black leading-snug lg:leading-tight font-['Krona_One'] break-words max-w-full">
                    {TITLES[nextTextIndex].title}
                  </h1>
                </div>
              </div>

              {/* Subtitle Animation */}
              <div className="relative overflow-hidden h-[10vw] lg:h-8 xl:h-8 2xl:h-12 w-full 2xl:w-[40vw] mb-1 2xl:mb-12">
                <div className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${textAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                  <p className="text-black 2xl:text-nowrap font-medium text-[2.5vw] lg:text-[1rem] xl:text-[1rem] 2xl:text-[0.9rem] leading-snug lg:leading-relaxed max-w-full lg:max-w-md px-1 font-['Montserrat'] break-words">
                    {TITLES[textIndex].subtitle}
                  </p>
                </div>
                <div className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${textAnimating ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                   <p className="text-black 2xl:text-nowrap  font-medium text-[2.5vw] lg:text-[1rem] xl:text-[1rem] 2xl:text-[0.9rem] leading-snug lg:leading-relaxed max-w-full lg:max-w-md px-1 font-['Montserrat'] break-words">
                   {TITLES[nextTextIndex].subtitle}
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-start lg:justify-end mt-1">
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
                  className="bg-black text-white 2xl:pr-[0.5vw] px-[2vw] py-[1.5vw] lg:py-2.5 xl:py-3 2xl:py-2 rounded-full flex items-center space-x-1 hover:bg-neutral-900 transition-all duration-300 font-['Krona_One'] font-normal text-[2.7vw] lg:text-sm xl:text-base transition-transform duration-500 hover:scale-105"
                >
                  <span>Explore Our Products</span>
                  <img
                    src="/arrow.png"
                    alt="Arrow"
                    className="w-[5vw] h-[5vw] lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 ml-0.5"
                  />
                </button>
              </div>

              <div className="flex justify-end pt-2 lg:hidden mb-1">
                <img
                  src="/hero/1.png"
                  alt="Certification Badge"
                  className="w-[35vw] h-auto object-contain transition-transform duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => navigate('/awards-certifications')}
                />
              </div>
            </div>

            {/* Mobile image & Text */}
            <div className="block lg:hidden flex flex-col text-white/70 leading-none pointer-events-none select-none text-left space-y-0.5 relative -top-4 z-10 w-[90vw]">
              <div className="text-[8vw] font-normal">KONNECT</div>
              <div className="text-[8vw] font-normal">PACKAGING</div>
              <div className="relative flex justify-end items-center w-full h-auto -mt-[15vw]" style={{ minHeight: '65vw' }}>
                {renderHeroImage(HERO_IMAGES[prevImgIndex], isAnimating ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100", 10)}
                {renderHeroImage(HERO_IMAGES[imgIndex], isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0", 20)}
              </div>
            </div>

            <div className="hidden lg:flex absolute right-30 top-35 opacity-60 flex flex-col text-white leading-none pointer-events-none select-none z-0 space-y-6 xl:space-y-8 2xl:space-y-10">
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
