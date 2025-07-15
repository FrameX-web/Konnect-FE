import * as React from "react";
import { useState } from "react";

function Worldwide() {
  // Country data array for reusable cards
  const countries = [
    {
      id: "2015:27",
      name: "INDIA",
      type: "Headquarter",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f70d605a2ea2cc5dbc06c200a8381192a80966c",
      imageStyle: { width: '80%', height: '87%', left: '11%', top: '5%' },
      description: "Konnect Packaging Proudly Rooted in India, Delivering Globally.",
      personName: "Parth Chandra",
      personTitle: "Head of Operations - India"
    },
    {
      id: "2015:50",
      name: "FRANCE",
      type: "OFFICE",
      image: "/france.png",
      imageStyle: { width: '80%', height: '80%', left: '10%', top: '10%' },
      description: "",
      personName: "Omar Azzam",
      personTitle: "Head of Operations – France"
    },
    {
      id: "2015:37",
      name: "SERBIA",
      type: "OFFICE",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0492bf98b49f6501dcbdf863df50689a0cb0982e",
      imageStyle: { width: '53%', height: '76%', left: '24%', top: '12%' },
      description: "Delivering quality products across Serbia",
      personName: "Marko Ristovski",
      personTitle: "Head of Operations - Serbia"
    },
    {
      id: "2015:42",
      name: "LITHUANIA",
      type: "OFFICE",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5a1c092ff68133d0941e96eb5e5e0d8ea4f0afe7",
      imageStyle: { width: '87%', height: '65%', left: '7%', top: '19%' },
      description: "Delivering quality products across Lithuania",
      personName: "Suchitra Gupta",
      personTitle: "Head of Operations - Lithuania"
    }
  ];

  // Reusable CountryCard component
  const CountryCard = ({ country }) => {
    const { id, name, type, image, imageStyle, description, personName, personTitle } = country;
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className={`relative w-full cursor-pointer group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          paddingBottom: isHovered ? '140%' : '100%',
          transition: 'padding-bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{
            background: 'linear-gradient(to top right, #E7C478, #FDE9BD)',
            border: '1px solid #000',
            borderRadius: isHovered ? '16px' : '50%',
            transition: 'border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease-out',
            boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.05)',
          }}
        >
          {/* Three dots at the top right */}
          <div 
            className="absolute z-10"
            style={{
              top: '8px',
              right: '12px',
              display: 'flex',
              flexDirection: 'row',
              gap: '4px',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
              transitionDelay: '0.1s'
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
          </div>

          {/* Circular section container - maintains circular area for map and country name */}
          <div 
            className="absolute top-0 left-0 w-full"
            style={{
              height: isHovered ? '70%' : '100%',
              transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Map image - stays in original circular position */}
            <div 
              className="absolute"
              style={{
                ...imageStyle,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <img
                src={image}
                alt={name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Country name and type overlay - stays in original circular position */}
            <div 
              className="absolute z-3"
              style={{
                left: '50%',
                top: '48%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                width: '70%'
              }}
            >
              <div className="text-sm md:text-lg font-bold text-white leading-tight mb-1" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                {name}
              </div>
              <div
                className={
                  name === "INDIA"
                    ? "text-[6px] md:text-[9px] text-white font-medium"
                    : "text-[10px] md:text-xs text-white font-medium"
                }
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
              >
                {type}
              </div>
            </div>
          </div>

          {/* Rectangle extension area - only visible on hover */}
          <div 
            className="absolute bottom-0 left-0 w-full"
            style={{
              height: isHovered ? '30%' : '0%',
              opacity: isHovered ? 1 : 0,
              transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out',
              transitionDelay: '0.1s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 16px'
            }}
          >
            <div 
              className="text-center w-full"
              style={{
                transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: '0.2s'
              }}
            >
              <div className="text-black font-bold text-[12px] md:text-base mb-1 leading-tight">
                {personName}
              </div>
              <p 
                className="text-black text-xs md:text-sm leading-relaxed"
                style={{
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                {personTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full py-[5%] px-[2%] max-w-full mx-auto" style={{ fontFamily: "'Krona One', sans-serif" }}>
      <h1 className="text-xl md:text-5xl text-center text-black w-full mx-auto mb-[5%] font-normal">
        Our Offices Worldwide
      </h1>
      
      {/* World map image container */}
      {/* Removed map image and container */}
      
      {/* Cards grid */}
      <div className="mt-8 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-[6%] max-w-[95%] md:max-w-[90%] mx-auto">
        {countries.map((country, index) => (
          <div 
            key={index} 
            className="w-full"
            style={{
              maxWidth: '250px',
              margin: '0 auto'
            }}
          >
            <CountryCard country={country} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Worldwide;