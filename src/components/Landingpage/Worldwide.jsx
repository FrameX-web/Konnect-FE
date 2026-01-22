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
      personTitle: "Head of Operations - India",
      email: "info@konnectpackaging.com",
      contact: "+917774031655",
      address: ""
    },
    {
      id: "2015:50",
      name: "FRANCE",
      type: "OFFICE",
      image: "/france.png",
      imageStyle: { width: '80%', height: '80%', left: '10%', top: '10%' },
      description: "",
      personName: "Omar Azzam",
      personTitle: "Head of Operations – France",
      email: "",
      contact: "+33 7 83 53 35 12",
      address: ""
    },
    {
      id: "2015:37",
      name: "SERBIA",
      type: "OFFICE",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0492bf98b49f6501dcbdf863df50689a0cb0982e",
      imageStyle: { width: '53%', height: '76%', left: '24%', top: '12%' },
      description: "Delivering quality products across Serbia",
      personName: "Marko Ristovski",
      personTitle: "Head of Operations",
      email: "marko@konnectpackaging.com",
      contact: "+381693226316",
      address: ""
    },
    {
      id: "2015:42",
      name: "LITHUANIA",
      type: "OFFICE",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5a1c092ff68133d0941e96eb5e5e0d8ea4f0afe7",
      imageStyle: { width: '87%', height: '65%', left: '7%', top: '19%' },
      description: "Delivering quality products across Lithuania",
      personName: "Suchitra Gupta",
      personTitle: "Head of Operations",
      email: "Sales@konnectpackaging.com",
      contact: "",
      address: "Ramybės g. 4-70, Vilnius, 02103, Lithuania"
    },
   {
  id: "2015:45",
  name: "SLOVAKIA",
  type: "OFFICE",
  image: "/slovakia.png",
  imageStyle: { width: '80%', height: '80%', left: '10%', top: '10%' },
  description: "Delivering quality products across Slovakia",
  personName: "Pida Juraj",
  personTitle: "Head of Operations",
  email: "info.slovakia@konnectpackaging.com",
  contact: "+421 944 350 482",
  address: "SK-067 73 Ubl’a 202\nSlovak Republic"
}
  ];

  // Reusable CountryCard component
  const CountryCard = ({ country }) => {
    const { id, name, type, image, imageStyle, description, personName, personTitle, email, contact, address } = country;
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className={`relative w-full cursor-pointer group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          paddingBottom: isHovered ? '165%' : '100%',
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
              top: '6px',
              right: '10px',
              display: 'flex',
              flexDirection: 'row',
              gap: '3px',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
              transitionDelay: '0.1s'
            }}
          >
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black"></div>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black"></div>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black"></div>
          </div>

          {/* Circular section container - maintains circular area for map and country name */}
          <div 
            className="absolute top-0 left-0 w-full"
            style={{
              height: isHovered ? '55%' : '100%',
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
                pointerEvents: 'none',
                // Prevent any movement or resizing on hover
                transition: 'none'
              }}
            >
              <img
                src={image}
                alt={name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  // Prevent any scaling or movement on hover
                  transition: 'none'
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
                width: '85%',
                transition: 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div 
                className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-white leading-tight mb-0.5" 
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
              >
                {name}
              </div>
              <div
                className={
                  name === "INDIA"
                    ? "text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] text-white font-medium"
                    : "text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] text-white font-medium"
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
              height: isHovered ? '45%' : '0%',
              opacity: isHovered ? 1 : 0,
              transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out',
              transitionDelay: '0.1s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 10px'
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
              <div className="text-black font-bold text-[10px] sm:text-[11px] md:text-xs lg:text-sm leading-tight mb-0.5" style={{ marginBottom: '0px' }}>
                {personName}
              </div>
              <p 
                className="text-black text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs leading-snug"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  marginTop: '0px',
                  marginBottom: '3px'
                }}
              >
                {personTitle}
              </p>
              <div className="h-px bg-black/20 w-8 sm:w-10 md:w-12 lg:w-14 mx-auto mb-2" />
              {/* Show email and contact for any country if present and only on hover */}
              {isHovered && (
                <>
                  {email && (
                    <div
                      className="text-black font-medium text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] leading-snug w-full flex justify-center"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        marginBottom: '3px',
                        textAlign: 'center',
                        maxWidth: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        display: 'inline-block',
                        width: '100%',
                        whiteSpace: 'normal',
                        overflowWrap: 'anywhere',
                        wordBreak: 'break-word'
                      }}
                    >
                      {email}
                    </div>
                  )}
                  {address && (
                    <div
                      className="text-black font-semibold text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] leading-snug w-full flex justify-center"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        textAlign: 'center',
                        whiteSpace: 'pre-line',
                        lineHeight: '1.3',
                        maxWidth: '95%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '4px 6px',
                        background: 'rgba(255,255,255,0.75)',
                        borderRadius: '5px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                        marginBottom: '3px'
                      }}
                    >
                      {`${address}`}
                    </div>
                  )}
                  {contact && (
                    <div
                      className="text-black font-medium text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] leading-snug w-full flex justify-center"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        textAlign: 'center',
                        marginTop: '2px'
                      }}
                    >
                      Contact: {contact}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full py-[5%] px-[3%] sm:px-[2%] max-w-full mx-auto" style={{ fontFamily: "'Krona One', sans-serif" }}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-black w-full mx-auto mb-[5%] font-normal px-2">
        Our Offices Worldwide
      </h1>
      
      {/* World map image container */}
      {/* Removed map image and container */}
      
      {/* Cards grid */}
      <div className="mt-8 md:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-[3%] max-w-[95%] sm:max-w-[90%] md:max-w-[92%] mx-auto px-2 sm:px-4" style={{ paddingRight: 'max(1rem, env(safe-area-inset-right))' }}>
        {countries.map((country, index) => (
          <div 
            key={index} 
            className="w-full"
            style={{
              maxWidth: '100%',
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