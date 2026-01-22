import { useState, useEffect, useRef } from 'react';
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat/400.css';

const useInView = (options) => {
  const ref = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, isIntersecting];
};

const Progress = () => {
  const progressData = [
    {
      number: 1000,
      title: "Happy Clients",
      description:
        "Trusted by 1000+ happy clients worldwide, Our commitment speaks through every successful delivery.",
      gradient: "bg-gradient-golden-1",
      progressPercentage: 50,
    },
    {
      number: 2000,
      title: "Projects",
      description:
        "With 2000+ projects delivered and counting, Our work reflects excellence, trust, and consistency.",
      gradient: "bg-gradient-golden-2",
      progressPercentage: 60,
    },
    {
      number: 500,
      title: "Hard workers",
      description:
        "Powered by 500+ hardworking team members, We turn challenges into achievements every day.",
      gradient: "bg-gradient-golden-3",
      progressPercentage: 60,
    },
  ];

  const CircularProgress = ({ percentage, targetNumber }) => {
    const [ref, isVisible] = useInView({ threshold: 0.5 });
    const [state, setState] = useState({ count: 0, percent: 0 });
    const hasAnimated = useRef(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const animationFrame = useRef(null);

    // Use fixed pixel values for consistent sizing
    const radius = 85;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
      if (isVisible && !shouldAnimate) {
        setShouldAnimate(true);
      }
    }, [isVisible, shouldAnimate]);

    useEffect(() => {
      if (!shouldAnimate || hasAnimated.current) return;

      hasAnimated.current = true;
      const duration = 2000;
      const start = performance.now();

      const easeInOutCubic = (t) => t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animate = (time) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        const newCount = Math.round(eased * targetNumber);
        const newPercent = eased * percentage;

        setState({ count: newCount, percent: newPercent });

        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animate);
        }
      };

      animationFrame.current = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame.current);
    }, [shouldAnimate, percentage, targetNumber]);

    const strokeDashoffset = circumference - (state.percent / 100) * circumference;

    return (
      <div
        ref={ref}
        className="relative flex items-center justify-center"
        style={{ width: '200px', height: '200px' }} // Fixed pixel size
      >
        {/* Background circle */}
        <svg 
          className="absolute inset-0 -rotate-90" 
          viewBox="0 0 200 200"
          style={{ width: '200px', height: '200px' }}
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#ffffff"
            strokeWidth="28"
            fill="none"
          />
        </svg>

        {/* Animated Progress circle */}
        <svg 
          className="absolute inset-0 -rotate-90" 
          viewBox="0 0 200 200"
          style={{ width: '200px', height: '200px' }}
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#000000"
            strokeWidth="28"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ opacity: 1 }}
          />
        </svg>

        {/* Center count - fixed font size */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="text-center font-bold text-black"
            style={{ fontSize: '28px' }} // Fixed pixel font size
          >
            {state.count}+
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8 font-['Krona_One']">
      <div className="max-w-7xl mx-auto">
        {/* Heading - using clamp for smooth scaling */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 transition duration-700">
          <h1 
            className="font-normal text-black leading-tight"
            style={{ fontSize: 'clamp(24px, 4vw, 50px)' }} // Smooth scaling with fixed bounds
          >
            Our Progress in Numbers
          </h1>
        </div>

        {/* Cards - fixed max-width for consistency */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 justify-items-center">
          {progressData.map((item, index) => {
            const isLastItem = index === progressData.length - 1;
            
            return (
              <div 
                key={index} 
                className={`flex flex-col items-center w-full ${
                  isLastItem && progressData.length === 3 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ maxWidth: '378px' }}
              >
                <div
                  className="relative w-full rounded-[30px] flex flex-col items-center py-6 px-4 transition duration-700 hover:scale-105"
                  style={{
                    background: 'linear-gradient(to top right, #E7C478, #FDE9BD)'
                  }}
                >
                  {/* Progress Circle */}
                  <div className="mb-4">
                    <CircularProgress
                      percentage={item.progressPercentage}
                      targetNumber={item.number}
                    />
                  </div>

                  {/* Title - fixed font size */}
                  <div className="mt-2 mb-3">
                    <h3 
                      className="font-normal text-black text-center"
                      style={{ fontSize: 'clamp(16px, 1.2vw, 18px)' }} // Smooth scaling
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Description container */}
                  <div className="w-[95%] mx-auto">
                    <div className="border-[1.5px] border-black rounded-b-[30px] py-3 px-5">
                      <p 
                        className="text-black text-center leading-relaxed font-['Montserrat'] font-medium"
                        style={{ fontSize: 'clamp(12px, 0.9vw, 14px)' }} // Smooth scaling for description
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Progress;
