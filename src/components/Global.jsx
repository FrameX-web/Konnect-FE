import * as React from "react";
import '@fontsource/montserrat/400.css';
import '@fontsource/krona-one/400.css';

const Global = () => {
  const footprintItems = [
    {
      title: "Strong Base in India",
      description: "Headquartered in Nagpur, we serve key industrial hubs across India with innovative, eco-friendly packaging tailored for high-volume sectors.",
      icon: "/footprint/1.png"
    },
    {
      title: "Expanding Presence in Europe",
      description: "Actively entering European markets with sustainable solutions that align with strict ESG, circular economy, and packaging compliance mandates.",
      icon: "/footprint/2.png"
    },
    {
      title: "Cross-Border Standards Compliance",
      description: "Our products are engineered to meet both Indian and European quality, environmental, and safety standards for seamless global acceptance.",
      icon: "/footprint/3.png"
    },
    {
      title: "Serving Export-Focused Clients",
      description: "Empowering Indian exporters—especially in automotive, steel, and agro industries—with packaging that meets global durability and compliance needs.",
      icon: "/footprint/4.png"
    },
    {
      title: "Partnering with European Distributors",
      description: "Forming strategic alliances with European distributors and procurement networks to expand reach and localize supply for faster delivery.",
      icon: "/footprint/5.png"
    },
    {
      title: "Sustainable Impact Across Borders",
      description: "Driving global sustainability by offering packaging that reduces carbon footprint and aligns with both India's and Europe's green goals.",
      icon: "/footprint/6.png"
    }
  ];

  const FootprintCard = ({ title, description, icon }) => (
    <div
      className="box-border relative rounded-2xl mx-auto overflow-hidden shadow-none border-2 border-black max-sm:rounded-xl
        w-[260px] h-[340px] lg:w-[360px] lg:h-[400px] flex flex-col
        max-sm:w-full max-sm:h-auto
        bg-white/30 backdrop-blur-md
        transition-all duration-500 ease-in-out hover:scale-105"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Icon section */}
      <div className="relative p-4 bg-transparent flex justify-start items-center max-md:p-3 max-sm:p-2">
        <img 
          src={icon} 
          alt={title}
          className="w-16 h-16 max-md:w-10 max-md:h-10 max-sm:w-8 max-sm:h-8"
        />
      </div>
      {/* Title section */}
      <div className="relative px-4 py-2 bg-transparent text-left max-md:px-3 max-md:py-2 max-sm:px-2 max-sm:py-1">
        <h3 className="text-xl font-bold text-black leading-tight max-md:text-sm max-sm:text-xs">
          {title}
        </h3>
      </div>
      {/* Description section */}
      <div className="relative px-4 py-4 bg-transparent flex-1 flex items-start justify-start max-md:px-3 max-md:py-3 max-sm:px-2 max-sm:py-2">
        <p className="text-gray-900 text-lg text-left leading-relaxed font-normal max-md:text-[0.7rem] max-sm:text-[0.6rem]">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <div 
      className="box-border px-7 pt-32 pb-16 mx-auto my-0 w-full  bg-white max-w-[90%] relative max-md:px-5 max-md:pt-20 max-md:pb-12 max-sm:px-4 max-sm:pt-16 max-sm:pb-8" 
      style={{
        fontFamily: 'Montserrat, sans-serif',
        backgroundImage: 'url(/worldmap.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay to control opacity */}
      <div className="absolute inset-0 bg-white opacity-90 pointer-events-none"></div>
      
      {/* Content with relative positioning to appear above background */}
      <div className="relative z-10">
        <div className="box-border bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] px-6 pt-12 pb-6 mb-12 w-full rounded-3xl max-md:px-4 max-md:py-8 max-md:mb-8 max-sm:px-3 max-sm:py-6 max-sm:mb-6 transition-all duration-500 ease-in-out hover:scale-105">
          <div
            className="mb-6 text-5xl text-black font-bold max-md:mb-4 max-md:text-4xl max-sm:mb-3 max-sm:text-2xl"
            style={{ fontFamily: 'Krona One, sans-serif' }}
          >
            Our Global Footprint
          </div>
          <div className="text-base text-black max-w-4xl leading-relaxed max-md:text-sm max-sm:text-xs">
            Based in India and expanding into Europe, we deliver sustainable, export ready packaging aligned with global ESG standards.
          </div>
        </div>
        <div className="grid gap-6 w-full grid-cols-3 grid-rows-2 justify-items-center max-md:gap-4 max-sm:gap-2 max-sm:grid-cols-2 max-sm:grid-rows-3">
          {footprintItems.map((item, index) => (
            <FootprintCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Global;

