import { useState, useEffect, useRef } from 'react';
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat/400.css'; // Import Montserrat font

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
    const [shouldAnimate, setShouldAnimate] = useState(false); // Track if animation should run
    const radius = 85;
    const circumference = 2 * Math.PI * radius;
    const animationFrame = useRef(null);

    useEffect(() => {
      if (isVisible && !shouldAnimate) {
        setShouldAnimate(true); // Start animation when first visible
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
        className="relative w-[200px] h-[200px] flex items-center justify-center"
      >
        {/* Background circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
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
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#000000"
            strokeWidth="28"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              // Removed transition to allow JS-driven gradual fill
              opacity: 1,
            }}
          />
        </svg>

        {/* Center count */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center font-bold text-2xl lg:text-2xl text-black">
            {state.count}+
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="w-full bg-white py-2 md:pb-12 px-4 sm:py-6 sm:px-6 lg:py-4 lg:px-8 font-['Krona_One']">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-6 lg:mb-8 transition duration-700">
          <h1 className="font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] text-black leading-normal">
            Our Progress in Numbers
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 justify-items-center">
          {progressData.map((item, index) => (
            <div key={index} className="flex flex-col items-center max-w-[378px] w-full">
              <div
                className="relative w-full rounded-[30px] flex flex-col items-center py-4 px-4 transition duration-700   hover:scale-105"
                style={{
                  background: 'linear-gradient(to top right, #E7C478, #FDE9BD)'
                }}
              >
                <div className="mb-4">
                  <CircularProgress
                    percentage={item.progressPercentage}
                    targetNumber={item.number}
                  />
                </div>
                <div className="mt-2 mb-2">
                  <h3 className="font-normal text-sm sm:text-base lg:text-[18px] text-black text-center">
                    {item.title}
                  </h3>
                </div>
                <div className="w-[95%] mx-auto">
                  <div className="border-[1.5px] border-black rounded-b-[30px] py-2 px-5">
                    <p className="text-sm font-medium sm:text-[12px] text-black text-center leading-relaxed font-['Montserrat']">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
