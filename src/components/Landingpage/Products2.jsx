import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@fontsource/montserrat';

// ViewButton component
const ViewButton = ({ onClick, isDesktop = false }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 ${
      isDesktop ? 'w-16 h-16 lg:w-20 lg:h-20' : 'w-12 h-12 sm:w-14 sm:h-14'
    }`}
    style={{ background: 'none', border: 'none', padding: 0 }}
  >
    <img
      src="/view.png"
      alt="View"
      className="w-full h-full object-contain"
      draggable="false"
    />
  </button>
);

// Reusable ProductCard component
const ProductCard = ({ product, onClick, isMobile = false }) => {
  const handleClick = () => onClick(product);
  
  const handleViewClick = (e) => {
    e.stopPropagation();
    onClick(product);
  };

  return (
    <div
      className={`rounded-2xl relative group cursor-pointer ${
        isMobile 
          ? 'p-2 w-full' 
          : 'p-4 lg:p-6 w-full'
      }`}
      onClick={handleClick}
    >
      {/* View Button */}
      <div className={`absolute z-10 ${
        isMobile 
          ? '-top-2 -right-2' 
          : '-top-2 -right-1 lg:-right-2'
      }`}>
        <ViewButton onClick={handleViewClick} isDesktop={!isMobile} />
      </div>
      
      {/* Product Image Container - Fixed aspect ratio */}
      <div className={`bg-white rounded-2xl border-2 border-black aspect-square ${
        isMobile ? 'mb-2' : 'mb-3 lg:mb-4'
      }`}>
        <div className="w-full h-full flex items-center justify-center p-2 lg:p-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-4/5 h-4/5 object-contain transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      
      {/* Product Info */}
      <div className="text-center">
        <h4 className={`font-bold text-black mb-1 font-['Montserrat'] leading-tight ${
          isMobile 
            ? 'text-xs sm:text-sm' 
            : 'text-sm lg:text-base xl:text-lg'
        }`} style={{ fontWeight: 600 }}>
          {product.name}
        </h4>
        <p className={`text-gray-600 font-['Krona_One'] ${
          isMobile 
            ? 'text-xs sm:text-sm' 
            : 'text-xs lg:text-sm xl:text-base'
        }`}>
          {product.code}
        </p>
      </div>
    </div>
  );
};

const Products = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const productData = [
    // First Slide
    [
      { id: 14, name: 'SMP Bags', code: '(F110 SMP)', image: '/Food/smp.png' },
      { id: 15, name: 'Bulk Tea Packaging Bags', code: '(F111 BTPB)', image: '/Food/2.png' },
      { id: 16, name: 'PE-Coated Paper', code: '(Food Grade)', image: '/Food/3.png' },
      { id: 17, name: 'Wax Coated Paper', code: '(F109 WCP)', image: '/Food/4.png' },
      { id: 18, name: 'Paper Aluminum Pouches', code: '(F112 PAP)', image: '/Food/5.png' },
      { id: 19, name: 'Standing Pouches', code: '(F113 SP)', image: '/Food/6.png' },
      { id: 20, name: 'HDPE Laminated Paper Bags', code: '(F107 LPB)', image: '/Food/7.png' }
    ],
    // Second Slide
    [
      { id: 21, name: 'Sugar Paper', code: '(F105 SP)', image: '/Food/8.png' },
      { id: 22, name: 'Multiwall Paper Bags', code: '(F106 MPB)', image: '/Food/9.png' }
    ]
  ];

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, position: 'absolute' })
  };

  const navigateSlide = (newDirection) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + productData.length) % productData.length);
  };

  const handleViewClick = (product) => {
    window.location.href = `/product/${product.id}`;
  };

  return (
    <div id="products" className="pt-6 bg-white font-['Krona_One']">    
      {/* Product Container */}
      <div className="max-w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div
          className="bg-[#f1d598] rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative overflow-visible"
          style={{ 
            background: 'linear-gradient(135deg, #E7C477 0%, #FFECC2 100%)',
            minHeight: '800px'
          }}
        >         
          {/* Subtitle */}
          <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-center text-black mb-6 md:mb-8 lg:mb-12 font-['Krona_One'] px-4">
            Food & Agro Packaging
          </h3>
          
          {/* Navigation and Products Container */}
          <div className="relative min-h-[600px]">
            {/* Products Grid */}
            <div className="w-full relative">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "tween", duration: 0.3, ease: "easeInOut" },
                    opacity: { duration: 0.2 }
                  }}
                  className="w-full"
                >
                  {/* First Row - 4 items (only on first slide) */}
                  {currentSlide === 0 && (
                    <div className="mb-4 md:mb-6 lg:mb-8 xl:mb-12">
                      {/* Mobile & Tablet Layout - 2 columns */}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:hidden">
                        {productData[currentSlide].slice(0, 4).map((product) => (
                          <div key={product.id} className="w-full flex justify-center">
                            {/* FIX: lock width to avoid zoom rounding */}
                            <div className="w-[280px]">
                              <ProductCard 
                                product={product} 
                                onClick={handleViewClick}
                                isMobile
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Desktop Layout - 4 columns with equal width */}
                      <div className="hidden lg:grid lg:grid-cols-4 gap-6 xl:gap-8 2xl:gap-10 max-w-[1600px] mx-auto">
                        {productData[currentSlide].slice(0, 4).map((product) => (
                          <div key={product.id} className="w-full flex justify-center">
                            {/* FIX: lock width to avoid zoom rounding */}
                            <div className="w-[320px]">
                              <ProductCard 
                                product={product} 
                                onClick={handleViewClick}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Second Row - 3 items (first slide) or 2 items (second slide) with navigation buttons inline */}
                  <div className="flex items-center justify-between gap-2 md:gap-4 lg:gap-6">
                    {/* Left Navigation Button - Hidden on mobile, shown on desktop */}
                    <button 
                      onClick={() => navigateSlide(-1)}
                      className="hidden lg:block z-10 transition-all duration-300 hover:scale-105 focus:outline-none flex-shrink-0"
                      aria-label="Previous slide"
                    >
                      <img
                        src="/leftnav.png"
                        alt="Previous"
                        className="w-14 h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 object-contain"
                        draggable="false"
                      />
                    </button>

                    {/* Products Container */}
                    <div className="flex-1 max-w-[1200px] mx-auto">
                      {currentSlide === 0 ? (
                        // First slide: 3 items layout
                        <>
                          {/* Mobile & Tablet Layout - 2 columns + 1 centered */}
                          <div className="lg:hidden">
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4">
                              {productData[currentSlide].slice(4, 6).map((product) => (
                                <div key={product.id} className="w-full flex justify-center">
                                  {/* FIX: lock width to avoid zoom rounding */}
                                  <div className="w-[280px]">
                                    <ProductCard 
                                      product={product} 
                                      onClick={handleViewClick}
                                      isMobile
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Last card centered */}
                            {productData[currentSlide].slice(6, 7).length > 0 && (
                              <div className="flex justify-center mb-4">
                                {/* FIX: lock width to avoid zoom rounding */}
                                <div className="w-[280px] px-1.5 sm:px-2 md:px-3">
                                  {productData[currentSlide].slice(6, 7).map((product) => (
                                    <ProductCard 
                                      key={product.id} 
                                      product={product} 
                                      onClick={handleViewClick}
                                      isMobile
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Desktop Layout - 3 columns centered */}
                          <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8 2xl:gap-10">
                            {productData[currentSlide].slice(4, 7).map((product) => (
                              <div key={product.id} className="w-full flex justify-center">
                                {/* FIX: lock width to avoid zoom rounding */}
                                <div className="w-[320px]">
                                  <ProductCard 
                                    product={product} 
                                    onClick={handleViewClick}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        // Second slide: 2 items - keep same grid and nav position
                        <>
                          {/* Mobile & Tablet Layout - 2 columns */}
                          <div className="lg:hidden">
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4">
                              {productData[currentSlide].map((product) => (
                                <div key={product.id} className="w-full flex justify-center">
                                  {/* FIX: lock width to avoid zoom rounding */}
                                  <div className="w-[280px]">
                                    <ProductCard 
                                      product={product} 
                                      onClick={handleViewClick}
                                      isMobile
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Spacer to keep height consistent */}
                            <div className="h-20"></div>
                          </div>
                          
                          {/* Desktop Layout - 3 column grid with 2 items (keep grid, keep nav in row 2) */}
                          <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8 2xl:gap-10">
                            {productData[currentSlide].map((product) => (
                              <div key={product.id} className="w-full flex justify-center">
                                {/* FIX: lock width to avoid zoom rounding */}
                                <div className="w-[320px]">
                                  <ProductCard 
                                    product={product} 
                                    onClick={handleViewClick}
                                  />
                                </div>
                              </div>
                            ))}
                            {/* Empty cell to maintain 3-col structure */}
                            <div></div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Right Navigation Button - Hidden on mobile, shown on desktop */}
                    <button 
                      onClick={() => navigateSlide(1)}
                      className="hidden lg:block z-10 transition-all duration-300 hover:scale-105 focus:outline-none flex-shrink-0"
                      aria-label="Next slide"
                    >
                      <img
                        src="/rightnav.png"
                        alt="Next"
                        className="w-14 h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 object-contain"
                        draggable="false"
                      />
                    </button>
                  </div>

                  {/* Mobile Navigation Buttons - Below products */}
                  <div className="flex justify-between items-center px-2 mt-4 lg:hidden">
                    <button 
                      onClick={() => navigateSlide(-1)}
                      className="z-10 transition-all duration-300 hover:scale-105 focus:outline-none"
                      aria-label="Previous slide"
                    >
                      <img
                        src="/leftnav.png"
                        alt="Previous"
                        className="w-14 h-14 md:w-16 md:h-16 object-contain"
                        draggable="false"
                      />
                    </button>

                    <button 
                      onClick={() => navigateSlide(1)}
                      className="z-10 transition-all duration-300 hover:scale-105 focus:outline-none"
                      aria-label="Next slide"
                    >
                      <img
                        src="/rightnav.png"
                        alt="Next"
                        className="w-14 h-14 md:w-16 md:h-16 object-contain"
                        draggable="false"
                      />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 lg:mt-8 gap-3 lg:gap-4">
          {productData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide ? 'scale-110' : 'opacity-70 hover:opacity-100'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full ${
                index === currentSlide ? 'bg-black' : 'bg-gray-400 hover:bg-gray-600'
              }`}></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
