import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

const FeaturedClients = () => {
  // No need for manual offset/drag/animation state with Marquee

  // Sample client logos - you can replace these with actual logo URLs
const topClients = [
    { name: 'ESSAR STEEL', logo: '/ribbon1/1.png' },
    { name: 'HMT', logo: '/ribbon1/2.png' },
    { name: 'NALCO', logo: '/ribbon1/3.png' },
    { name: 'SPMCIL', logo: '/ribbon1/4.png' },
     { name: 'SPMCIL', logo: '/ribbon1/5.png' },
];

  const bottomClients = [
    { name: 'ONGC', logo: '/ribbon2/1.png' },
    { name: 'NATIONAL STEEL', logo: '/ribbon2/2.png' },
    { name: 'HAL', logo: '/ribbon2/3.png' },
    { name: 'NAVY', logo: '/ribbon2/4.png' },
    { name: 'ARMY', logo: '/ribbon2/5.png' },
    { name: 'SPM', logo: '/ribbon2/6.png' },
    { name: 'SEVEJNO', logo: '/ribbon2/7.png' },
  ];

  // No need for extended arrays with Marquee

  // Responsive: track window width in state
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive logo width and margin for mobile/desktop
  const logoWidth = isMobile ? 80 : 192;
  const logoMargin = isMobile ? 6 : 20;

  // No manual animation needed with Marquee

  // No drag handlers needed with Marquee

  const ClientLogo = ({ client, index }) => (
    <div 
      key={`${client.name}-${index}`}
      className="flex-shrink-0 w-20 h-14 mx-1.5 md:w-48 md:h-24 md:mx-5 cursor-pointer group relative z-20"
      style={{ overflow: 'visible' }}
    >
      <img 
        src={client.logo} 
        alt={client.name}
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-125 z-30"
        style={{ overflow: 'visible', display: 'block' }}
        draggable={false}
      />
    </div>
  );

  return (
    <div className="w-full py-8 md:py-12 px-4 overflow-hidden">
      <div className="w-[90%] mx-auto">
        <div className="text-center mb-2 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-normal text-gray-800 mb-4" style={{ fontFamily: 'Krona One, sans-serif' }}>
            Featured Clients
          </h2>
        </div>
        <div className="space-y-1 md:space-y-6">
          {/* Top Ribbon - Left to Right */}
          <div className="relative" style={{ overflow: 'visible' }}>
            <div className="w-full" style={{ overflow: 'visible' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ pointerEvents: 'none', overflow: 'visible' }}></div>
            </div>
            <Marquee
              gradient={false}
              speed={isMobile ? 20 : 60}
              direction="left"
              pauseOnHover={true}
              className="absolute inset-0 flex items-center px-4"
              style={{ height: isMobile ? 56 : 96, overflow: 'visible' }}
            >
              {topClients.map((client, index) => (
                <ClientLogo key={`top-${index}`} client={client} index={index} />
              ))}
            </Marquee>
          </div>
          {/* Bottom Ribbon - Right to Left */}
          <div className="relative" style={{ overflow: 'visible' }}>
            <div className="w-full h-8 md:h-8  relative" style={{ overflow: 'visible' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ pointerEvents: 'none', overflow: 'visible' }}></div>
            </div>
            <Marquee
              gradient={false}
              speed={isMobile ? 20 : 60}
              direction="right"
              pauseOnHover={true}
              className="absolute inset-0 flex items-center px-4"
              style={{ height: isMobile ? 56 : 96, overflow: 'visible' }}
            >
              {bottomClients.map((client, index) => (
                <ClientLogo key={`bottom-${index}`} client={client} index={index} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedClients;