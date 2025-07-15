import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaCube } from 'react-icons/fa';
import productInfoData from '../utils/ProductInfoData';
import foodProductInfoData from '../utils/FoodProductInfoData';
import BackButton from './BackButton';
import Viewer360 from './360';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [show360, setShow360] = React.useState(false);

  // Scroll to top when productId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Drag functionality for scroll indicator
  useEffect(() => {
    let isDragging = false;
    let startY = 0;
    
    const handleMouseDown = (e) => {
      isDragging = true;
      startY = e.clientY;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      e.preventDefault();
    };

    const handleTouchStart = (e) => {
      isDragging = true;
      startY = e.touches[0].clientY;
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const scrollableContent = document.getElementById('scrollable-content');
      const scrollLine = document.getElementById('scroll-line');
      const indicator = document.getElementById('scroll-indicator');
      
      if (scrollableContent && scrollLine && indicator) {
        const lineRect = scrollLine.getBoundingClientRect();
        const relativeY = e.clientY - lineRect.top;
        const percentage = Math.max(0, Math.min(1, relativeY / lineRect.height));
        
        const maxScrollTop = scrollableContent.scrollHeight - scrollableContent.clientHeight;
        scrollableContent.scrollTop = percentage * maxScrollTop;
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      const scrollableContent = document.getElementById('scrollable-content');
      const scrollLine = document.getElementById('scroll-line');
      const indicator = document.getElementById('scroll-indicator');
      
      if (scrollableContent && scrollLine && indicator) {
        const lineRect = scrollLine.getBoundingClientRect();
        const relativeY = e.touches[0].clientY - lineRect.top;
        const percentage = Math.max(0, Math.min(1, relativeY / lineRect.height));
        
        const maxScrollTop = scrollableContent.scrollHeight - scrollableContent.clientHeight;
        scrollableContent.scrollTop = percentage * maxScrollTop;
      }
      e.preventDefault();
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchEnd = () => {
      isDragging = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    const indicator = document.getElementById('scroll-indicator');
    if (indicator) {
      indicator.addEventListener('mousedown', handleMouseDown);
      indicator.addEventListener('touchstart', handleTouchStart);
    }

    return () => {
      if (indicator) {
        indicator.removeEventListener('mousedown', handleMouseDown);
        indicator.removeEventListener('touchstart', handleTouchStart);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [productId]);

  // Product data - includes both VCI and Food products
  const allProducts = [
    // VCI Products (1-13)
    {
      id: 1,
      name: 'VCI Kraft Paper',
      code: '(K101 A)',
      image: '/VCI/VCI Kraft Paper (K101 A).png'
    },
    {
      id: 2,
      name: 'VCI PE Laminated Paper',
      code: '(K101 PE)',
      image: '/VCI/laminated.png'
    },
    {
      id: 3,
      name: 'VCI 3-Ply Paper',
      code: '(KP 301)',
      image: '/VCI/VCI 3-Ply Paper (KP 301) 1.png'
    },
    {
      id: 4,
      name: 'VCI LDPE Film',
      code: '(K101 VCF)',
      image: '/VCI/VCI LDPE Film (K101 VCF) 1.png'
    },
    {
      id: 5,
      name: 'VCI Strength Fabric',
      code: '(K101 SF)',
      image: '/VCI/VCI PE strength fabric (K101 sf) 2.png'
    },
    {
      id: 6,
      name: 'VCI MET PET Laminated Paper',
      code: '(K101 AMP)',
      image: '/VCI/VCI MET PET Laminated Paper (K101 AMP) 1.png'
    },
    {
      id: 7,
      name: 'VCI 4-Ply Fabric',
      code: '(K104 PF)',
      image: '/VCI/VCI 4-Ply Fabric (K104 PF) 1.png'
    },
    {
      id: 8,
      name: 'VCI Shrink Film',
      code: '(K102 SF)',
      image: '/VCI/VCI Shrink Film (K102 SF) 1.png'
    },
    {
      id: 9,
      name: 'VCI Desiccant',
      code: '(K103 DC)',
      image: '/VCI/VCI Desiccant (K103 DC) 1.png'
    },
    {
      id: 10,
      name: 'VCI Masterbatch',
      code: '(K106 MB)',
      image: '/VCI/VCI Masterbatch (K106 MB) 1.png'
    },
    {
      id: 11,
      name: 'VCI Power Stretch Film',
      code: '(K107 PSF)',
      image: '/VCI/VCI Power Stretch Film (K107 PSF) 1.png'
    },
    {
      id: 12,
      name: 'Industrial Wax Paper',
      code: '(IWP101)',
      image: '/VCI/Industrial Wax Paper1 (IWP101) 1.png'
    },
    {
      id: 13,
      name: 'Alu Barrier Bags',
      code: '(K108 ABB)',
      image: '/VCI/Alu Barrier Bags (K108 ABB) 1.png'
    },
    // Food Products (14-22)
    {
      id: 14,
      name: 'SMP Bags',
      code: '(F110 SMP)',
      image: '/Food/smp.png'
    },
    {
      id: 15,
      name: 'Bulk Tea Packaging Bags',
      code: '(F111 BTPB)',
      image: '/Food/2.png'
    },
    {
      id: 16,
      name: 'PE-Coated Paper',
      code: '(Food Grade)',
      image: '/Food/3.png'
    },
    {
      id: 17,
      name: 'Wax Coated Paper',
      code: '(F109 WCP)',
      image: '/Food/4.png'
    },
    {
      id: 18,
      name: 'Paper Aluminum Pouches',
      code: '(F112 PAP)',
      image: '/Food/5.png'
    },
    {
      id: 19,
      name: 'Standing Pouches',
      code: '(F113 SP)',
      image: '/Food/6.png'
    },
    {
      id: 20,
      name: 'HDPE Laminated Paper Bags',
      code: '(F107 LPB)',
      image: '/Food/7.png'
    },
    {
      id: 21,
      name: 'Sugar Paper',
      code: '(F105 SP)',
      image: '/Food/8.png'
    },
    {
      id: 22,
      name: 'Multiwall Paper Bags',
      code: '(F106 MPB)',
      image: '/Food/9.png'
    }
  ];

  const product = allProducts.find(p => p.id === parseInt(productId));
  
  // Get details from appropriate data file based on product ID
  const details = parseInt(productId) >= 14 
    ? foodProductInfoData[productId] || foodProductInfoData[14]
    : productInfoData[productId] || productInfoData[1];

  const handleBack = () => {
    navigate('/');
  };

  // Function to map product id to the correct .glb file name and folder
  const getGlbFileName = (product) => {
    // Return the .glb file name based on product id (after renaming)
    if (!product) return null;
    if (product.id >= 1 && product.id <= 22) {
      return `${product.id}.glb`;
    }
    return null;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white font-['Krona_One'] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Product Not Found</h1>
          <button 
            onClick={handleBack}
            className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-['Krona_One']">
      {/* Back Button */}
      <BackButton />
      
      {/* Header */}
      <div className="relative p-4 md:p-6">
        {/* Top Right Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-medium shadow-lg border border-white/10">
          {parseInt(productId) >= 14 ? 'Food & Agro Packaging' : 'VCI Packaging Solutions'}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Product Image */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-8 lg:p-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <div className="w-full max-w-md mb-6 relative">
            {/* Product Title - Over image on mobile, above image on desktop */}
            <div className="absolute top-2 left-2 right-2 z-10 text-center lg:relative lg:top-auto lg:left-auto lg:right-auto lg:z-auto lg:text-center lg:mb-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-200/50 lg:bg-transparent lg:backdrop-blur-none lg:shadow-none lg:border-none lg:px-0 lg:py-0">
                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold leading-tight text-gray-900 break-words hyphens-auto">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 font-medium mt-1">
                  {product.code}
                </p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl transform rotate-1 opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-4 md:p-6 shadow-lg border border-gray-100 transition-all duration-300 group-hover:shadow-xl">
                <img 
                  key={product.id} 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-row gap-3 w-full max-w-md">
            <button
              className="group relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-4 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex-1 border border-gray-700/30"
              onClick={() => setShow360(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <div className="p-1 bg-white/10 rounded-md group-hover:bg-white/20 transition-colors duration-300">
                  <FaCube className="w-3.5 h-3.5 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <span className="text-xs sm:text-sm font-medium">VIEW 360°</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-100%] group-hover:translate-x-[100%] duration-700"></div>
            </button>
            <button className="group relative overflow-hidden bg-[#E9C77F] hover:[#E9C77F] text-white px-4 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex-1 border border-amber-500/30">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <div className="p-1 bg-white/10 rounded-md group-hover:bg-white/20 transition-colors duration-300">
                  <FaPlay className="w-3.5 h-3.5 text-white transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs sm:text-sm font-medium">WATCH NOW</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-black/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-100%] group-hover:translate-x-[100%] duration-700"></div>
            </button>
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="lg:w-1/2 relative font-['Montserrat']">
          <div
            id="scrollable-content"
            className="
              h-[60vh] md:h-[70vh] lg:h-screen
              min-h-[60vh] md:min-h-[70vh] lg:min-h-screen
              bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] text-gray-800
              p-4 md:p-8 lg:p-12
              pr-16 md:pr-20 lg:pr-24
              overflow-y-auto
              rounded-tl-3xl rounded-bl-3xl
              font-['Montserrat']
              "
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onScroll={(e) => {
              const scrollTop = e.target.scrollTop;
              const scrollHeight = e.target.scrollHeight - e.target.clientHeight;
              const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
              
              const indicator = document.getElementById('scroll-indicator');
              const line = document.getElementById('scroll-line');
              if (indicator && line) {
                const lineHeight = line.clientHeight;
                const dotPosition = (scrollPercent / 100) * (lineHeight - 12);
                indicator.style.top = `${dotPosition}px`;
              }
            }}
          >
            {/* Overview Section */}
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-1">
                <img src="/details/3.png" alt="Overview" className="w-14 h-14 rounded" />
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">Overview</h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-gray-800 font-medium">
                {details.overview}
              </p>
            </div>

            {/* Composition Section */}
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-1">
                <img src="/details/4.png" alt="Composition" className="w-14 h-14 rounded" />
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">Composition</h2>
              </div>
              <ul className="text-sm md:text-base space-y-2 text-gray-800 font-medium">
                {details.composition && details.composition.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 min-w-[0.5rem] min-h-[0.5rem] rounded-full bg-gray-900 inline-block shadow-md"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Layer Structure Section */}
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-1">
                <img src="/details/6.png" alt="Layer Structure" className="w-14 h-14 rounded" />
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">Layer Structure</h2>
              </div>
              <ul className="text-sm md:text-base space-y-2 text-gray-800 font-medium">
                {details.layerStructure && details.layerStructure.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 min-w-[0.5rem] min-h-[0.5rem] rounded-full bg-gray-900 inline-block shadow-md"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Guidelines Section */}
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-1">
                <img src="/details/1.png" alt="Application Guidelines" className="w-14 h-14 rounded" />
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">Application Guidelines</h2>
              </div>
              <ul className="text-sm md:text-base space-y-2 text-gray-800 font-medium">
                {details.application && details.application.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 min-w-[0.5rem] min-h-[0.5rem] rounded-full bg-gray-900 inline-block shadow-md"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Features Section */}
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-1">
                <img src="/details/2.png" alt="Key Features" className="w-14 h-14 rounded" />
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">Key Features</h2>
              </div>
              <ul className="text-sm md:text-base space-y-2 text-gray-800 font-medium">
                {details.features && details.features.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 min-w-[0.5rem] min-h-[0.5rem] rounded-full bg-gray-900 inline-block shadow-md"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications Section */}
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-1">
                <img src="/details/5.png" alt="Technical Specifications" className="w-14 h-14 rounded" />
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">Technical Specifications</h2>
              </div>
              
              {/* Specifications Table */}
              <div className="bg-transparent rounded-lg overflow-hidden border border-black">
                <table className="w-full text-sm md:text-base bg-transparent">
                  <thead>
                    <tr className="bg-transparent text-gray-800">
                      <th className="text-left p-3 text-base md:text-xl font-bold border-r border-b border-black">Parameter</th>
                      <th className="text-left p-3 text-base md:text-xl font-bold border-b border-black">Specification</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 bg-transparent">
                    {details.specs && details.specs.map(([param, spec], i) => (
                      <tr key={i} className="">
                        <td className="p-3 border-r  border-b border-black font-medium">{param}</td>
                        <td className="p-3 border-b border-black font-medium">{spec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Custom GSM Options Section */}
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-1">
                <img src="/details/7.png" alt="Custom GSM Options" className="w-14 h-14 rounded" />
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">Custom GSM Options</h2>
              </div>
              
              {/* GSM Options Table */}
              <div className="bg-transparent rounded-lg overflow-hidden border border-black">
                <table className="w-full text-sm md:text-base bg-transparent">
                  <thead>
                    <tr className="bg-transparent text-gray-800">
                      <th className="text-left p-3 text-base md:text-xl font-bold border-r border-b border-black">Component</th>
                      <th className="text-left p-3 text-sm md:text-xl font-bold border-b border-black">GSM Range</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 bg-transparent">
                    {details.gsm && details.gsm.map(([comp, gsm], i) => (
                      <tr key={i} className="">
                        <td className="p-3 border-r  border-b border-black font-medium">{comp}</td>
                        <td className="p-3 border-b border-black font-medium">{gsm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Custom Scroll Indicator */}
          <div className="absolute top-4 right-8 lg:right-12 h-[calc(100%-2rem)] w-1 flex items-center">
            <div id="scroll-line" className="relative w-full h-3/4 bg-gray-800/20 rounded-full">
              <div 
                id="scroll-indicator" 
                className="absolute w-7 h-7 bg-gray-600 rounded-full -left-3 transition-all duration-150 ease-out cursor-pointer hover:bg-gray-700 hover:scale-110 touch-none select-none"
                style={{ top: '0px' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 360 Viewer Modal */}
      {show360 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-3xl h-full max-h-[90vh]">
            <button 
              onClick={() => setShow360(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <Viewer360
              open={show360}
              onClose={() => setShow360(false)}
              modelUrl={
                product.id >= 14
                  ? `/KONNECT PRODUCT/Food & Agro Packaging/${getGlbFileName(product)}`
                  : `/KONNECT PRODUCT/VCI Packaging Solutions/${getGlbFileName(product)}`
              }
              productName={`${product.name} ${product.code}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;

