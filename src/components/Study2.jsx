import * as React from "react";
import '@fontsource/montserrat'; // Use Montserrat font
import BackButton from "./BackButton";

function Study2() {
  const storyFeatures = [
    {
      id: 'founded',
      icon: '/story/1.png',
      title: 'Founded in Innovation, Built for the Future',
      description: 'Established in November 2023 in Borgaon (Madhya Pradesh), Konnect Packaging delivers certified, sustainable VCI solutions for global industries built to protect, preserve, and perform.'
    },
    {
      id: 'pioneering',
      icon: '/story/2.png',
      title: 'Pioneering Innovation with Hindalco',
      description: 'From VCI paper bags to VCI-coated fabric, our wide range of products ensures product safety with an eco-friendly approach.'
    },
    {
      id: 'driving',
      icon: '/story/3.png',
      title: "Driving India's ESG & ZED Goals",
      description: 'Leading corrosion protection with water-based VCI technologies, reducing damage and increasing product shelf life.'
    },
    {
      id: 'vision',
      icon: '/story/4.png',
      title: 'Led by Vision, Powered by Compliance',
      description: 'Driven by founders Parth Chandra and Suchitra Gupta, Konnect blends legal precision, lean operations, and sustainable innovation to build the future of industrial packaging.'
    }
  ];

  return (
    <div className="w-full py-16 px-6 lg:px-12" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Desktop View: Only show the image, fit to screen */}
      <div className="hidden lg:flex fixed inset-0 w-screen h-screen z-50 bg-white items-center justify-start">
        <BackButton />
        <img
          src="/story2.png"
          alt="Story 2"
          className="h-full object-cover"
          style={{ maxWidth: "90vw" }}
        />
      </div>

      {/* Mobile View: Show original content */}
      <div className="block lg:hidden">
        <div className="max-w-[100vw] mx-auto lg:grid lg:grid-cols-2 gap-16 lg:items-center">
          {/* Left Side - Our Story */}
          <div className="relative mb-12 lg:mb-0">
            {/* Rectangle background image - hidden on mobile */}
            <div
              className="hidden lg:block absolute inset-0 w-[120vh] -top-40 -left-26 h-[120vh] -translate-x-16 -translate-y-8"
              style={{
                backgroundImage: "url('/rectangle.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: 0,
              }}
            ></div>
            
            {/* Mobile background rectangle image */}
            <div
              className="lg:hidden absolute -top-22 -right-4 w-[50vh] h-[50vh]"
              style={{
                backgroundImage: "url('/storyback.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: 0,
              }}
            ></div>
            
                <div className="relative z-10 lg:pl-8">
                    <img
                    src="/story.png"
                    alt="Konnect Packaging"
                    className="w-full max-w-[450px] h-auto lg:h-130 mb-12"
                    />
                  </div>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-8 lg:space-y-11 relative">
            {storyFeatures.map((feature, index) => {
              const isFirstOrLast = index === 0 || index === storyFeatures.length - 1;
              const overlayClass = isFirstOrLast ? "lg:-ml-32 lg:pr-12 relative z-20" : "";
              
              return (
                <div key={feature.id} className={`flex items-start gap-4 lg:gap-6 ${overlayClass}`}>
                  {/* Icon as image */}
                  <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center bg-transparent">
                    <img src={feature.icon}/>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg lg:text-xl font-medium text-black mb-2 lg:mb-3 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm font-medium lg:text-base text-black/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Study2;