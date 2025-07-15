"use client";;
import { ArrowRight } from "lucide-react";
import { useState, useRef, useId, useEffect } from "react";
import React from "react"; // <-- Add this import

const Slide = ({
  slide,
  index,
  current,
  handleSlideClick,
  slidesLength // <-- pass slides length for rotation logic
}) => {
  const slideRef = useRef(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title, renderCard } = slide;

  // Helper for rotation logic
  const leftIndex = (current - 1 + slidesLength) % slidesLength;
  const rightIndex = (current + 1) % slidesLength;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[50vmin] mx-[4vmin] z-10 "
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          // Determine rotation based on position relative to current
          transform:
            index === current
              ? "scale(1.1) rotateX(0deg) rotateY(0deg)"
              : index === leftIndex
                ? "scale(1.1) rotateX(0deg) rotateY(30deg)" // left card
                : index === rightIndex
                  ? "scale(1.1) rotateX(0deg) rotateY(-30deg)" // right card
                  : "scale(0.8) rotateX(0deg) rotateY(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}>
        <div
          className="absolute top-0 left-0 w-full h-full bg-transparent rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}>
          {/* If renderCard is provided, render it instead of default image/card */}
          {renderCard ? (
            <div className="w-full h-full flex items-center justify-center">
              {renderCard()}
            </div>
          ) : (
            <>
              <img
                className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
                style={{
                  opacity: current === index ? 1 : 0.5,
                }}
                alt={title}
                src={src}
                onLoad={imageLoaded}
                loading="eager"
                decoding="sync" />
              {/* Removed overlay */}
            </>
          )}
        </div>
        {/* Only show default article if not using renderCard */}
        {!renderCard && (
          <article
            className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
              current === index ? "opacity-100 visible" : "opacity-0 invisible"
            }`}>
            <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold  relative">
              {title}
            </h2>
            {/* Removed button */}
          </article>
        )}
      </li>
    </div>
  );
};

const CarouselControl = ({
  type,
  title,
  handleClick
}) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#FFD57F] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}>
      <ArrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

export function Carousel({
  slides
}) {
  // Infinite carousel logic for circular effect
  const [current, setCurrent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const listRef = useRef(null);

  // Memoize extendedSlides to avoid unnecessary rerenders
  const extendedSlides = React.useMemo(() => [
    slides[slides.length - 1], // last card clone at start
    ...slides,
    slides[0], // first card clone at end
  ], [slides]);

  const totalSlides = slides.length;

  // Use a longer transition and always set transition on the DOM node for smoothness
  const TRANSITION_DURATION = 1200; // ms, slower for smoother effect
  const TRANSITION_STYLE = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;

  // Always set transition on mount for smoothness
  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.transition = TRANSITION_STYLE;
    }
  }, []);

  const handlePreviousClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (listRef.current) {
      listRef.current.style.transition = TRANSITION_STYLE;
    }
    setCurrent(prev => prev - 1);
  };

  const handleNextClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (listRef.current) {
      listRef.current.style.transition = TRANSITION_STYLE;
    }
    setCurrent(prev => prev + 1);
  };

  const handleSlideClick = (index) => {
    if (isTransitioning) return;
    if (current !== index) {
      setIsTransitioning(true);
      if (listRef.current) {
        listRef.current.style.transition = TRANSITION_STYLE;
      }
      setCurrent(index);
    }
  };

  // Smooth infinite jump logic for circular effect
  useEffect(() => {
    if (!isTransitioning) return;
    const handleTransitionEnd = () => {
      if (current === 0) {
        if (listRef.current) {
          listRef.current.style.transition = "none";
          setCurrent(totalSlides);
          void listRef.current.offsetWidth;
          listRef.current.style.transition = TRANSITION_STYLE;
        } else {
          setCurrent(totalSlides);
        }
      } else if (current === extendedSlides.length - 1) {
        if (listRef.current) {
          listRef.current.style.transition = "none";
          setCurrent(1);
          void listRef.current.offsetWidth;
          listRef.current.style.transition = TRANSITION_STYLE;
        } else {
          setCurrent(1);
        }
      }
      setIsTransitioning(false);
    };

    const ref = listRef.current;
    if (ref) {
      ref.addEventListener("transitionend", handleTransitionEnd);
    }
    return () => {
      if (ref) {
        ref.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, [current, isTransitioning, totalSlides, extendedSlides.length]);

  // Prevent unnecessary rerenders by memoizing Slide
  const MemoSlide = React.useMemo(() => Slide, []);

  const id = useId();

  // Touch/swipe state
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchStartTime = useRef(null);
  const touchMoved = useRef(false);

  // Touch event handlers for swipe and tap
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
      touchMoved.current = false;
    }
  };

  const handleTouchMove = (e) => {
    if (!touchStartX.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
      touchMoved.current = true;
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const dx = (e.changedTouches[0].clientX - touchStartX.current);
    const dy = (e.changedTouches[0].clientY - touchStartY.current);
    const dt = Date.now() - touchStartTime.current;
    // Swipe left/right
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        handleNextClick();
      } else {
        handlePreviousClick();
      }
    } else if (!touchMoved.current && dt < 350) {
      // Tap with minimal movement
      handleNextClick();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    touchStartTime.current = null;
    touchMoved.current = false;
  };

  return (
    <div
      className="relative w-[70vmin] h-[50vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
      // Touch handlers for mobile
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <ul
        ref={listRef}
        className="absolute flex mx-[-4vmin]"
        style={{
          transform: `translateX(-${current * (100 / extendedSlides.length)}%)`
          // transition is handled directly on the DOM node for smoothness
        }}>
        {extendedSlides.map((slide, index) => (
          <MemoSlide
            key={index}
            slide={slide}
            index={index}
            current={current}
            slidesLength={extendedSlides.length} // <-- pass slides length
            handleSlideClick={handleSlideClick} />
        ))}
      </ul>
      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick} />
        <CarouselControl type="next" title="Go to next slide" handleClick={handleNextClick} />
      </div>
    </div>
  );
}
