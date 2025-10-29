import * as React from "react";
import { useState } from "react";
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat';
import { Carousel } from "../ui/Carousal";

// Certification data array
const certifications = [
  {
    id: "zed",
    title: "ZED",
    description: "ZED‑certified enterprises follow India's \"Zero Defect Zero Effect\" standards, delivering defect‑free products while minimizing environmental impact and meeting global quality and sustainability expectations.",
  },
  {
    id: "rohs",
    title: "ROHS",
    description: "RoHS-certified products are free from harmful substances like lead and mercury, making them safe and eco-friendly. This certification ensures compliance with global standards, especially in electronics and packaging.",
  },
  {
    id: "ce",
    title: "CE",
    description: "CE‑certified products meet the European Union's safety, health, and environmental protection standards, ensuring they are reliable, consumer‑safe, and eligible for sale across the EU single market.",
  },
  {
    id: "gpsd",
    title: "GPSD",
    description: "GPSD-certified products meet EU safety standards (2001/95/EC), ensuring safe, risk-free use and compliance for the EU market. They are tested for consumer safety, durability, and environmental impact.",
  },
  {
    id: "pqc",
    title: "PQC",
    description: "PQC-certified products ensure quality, safety, and durability through strict testing and global compliance. They meet international standards, ensuring reliable use across industries.",
  },
  {
    id: "usfda",
    title: "US- FDA",
    description: "USFDA-certified products ensure safety, quality, and regulatory compliance through rigorous testing and approval. They meet strict U.S. Food and Drug Administration standards, ensuring trusted and reliable use across healthcare and consumer industries.",
  },
  {
    id: "zed",
    title: "ZED",
    description: "ZED‑certified enterprises follow India's \"Zero Defect Zero Effect\" standards, delivering defect‑free products while minimizing environmental impact and meeting global quality and sustainability expectations.",
  },
  {
    id: "rohs",
    title: "ROHS",
    description: "RoHS-certified products are free from harmful substances like lead and mercury, making them safe and eco-friendly. This certification ensures compliance with global standards, especially in electronics and packaging.",
  },
  {
    id: "ce",
    title: "CE",
    description: "CE‑certified products meet the European Union's safety, health, and environmental protection standards, ensuring they are reliable, consumer‑safe, and eligible for sale across the EU single market.",
  },
  {
    id: "gpsd",
    title: "GPSD",
    description: "GPSD-certified products meet EU safety standards (2001/95/EC), ensuring safe, risk-free use and compliance for the EU market. They are tested for consumer safety, durability, and environmental impact.",
  },
  {
    id: "pqc",
    title: "PQC",
    description: "PQC-certified products ensure quality, safety, and durability through strict testing and global compliance. They meet international standards, ensuring reliable use across industries.",
  },
   {
    id: "usfda",
    title: "US- FDA",
    description: "USFDA-certified products ensure safety, quality, and regulatory compliance through rigorous testing and approval. They meet strict U.S. Food and Drug Administration standards, ensuring trusted and reliable use across healthcare and consumer industries.",
  }
];

// Reusable Card component with fixed sizes for zoom stability
const CertificationCard = ({ certification }) => {
  const { id, title, description } = certification;

  return (
    <div
      className="relative mx-auto duration-400 ease-in-out"
      style={{
        width: '550px',
        height: '320px',
        maxWidth: '90vw'
      }}
    >
      {/* Card background with rounded corners and gradient */}
      <div 
        className="w-full h-full rounded-[20px] border-2 border-black/60"
        style={{
          background: 'linear-gradient(to top right, #FFD57F, #F6DFAB)'
        }}
      ></div>
      
      {/* Title - using clamp for smooth scaling */}
      <div 
        className="absolute left-0 right-0 text-center text-black font-bold"
        style={{
          top: '30px',
          fontSize: 'clamp(20px, 3vw, 32px)'
        }}
      >
        {title}
      </div>
      
      {/* Horizontal line under title with fade effect */}
      <div 
        className="absolute left-[30px] right-[30px]"
        style={{
          top: '80px',
          height: '2px',
          background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0))'
        }}
      ></div>
      
      {/* Description text container with fixed height */}
      <div 
        className="absolute left-[25px] right-[25px] flex items-center justify-center"
        style={{
          top: '110px',
          height: '140px'
        }}
      >
        <div
          className="font-medium text-black text-center leading-[1.4] px-4 overflow-hidden"
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'clamp(14px, 1.5vw, 18px)' // Increased size with dynamic scaling
          }}
        >
          {description}
        </div>
      </div>
      
      {/* Check mark icon at the bottom of the card */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ bottom: '15px' }}
      >
        <img 
          src="/hero/check.png" 
          alt="Certification check" 
          style={{
            width: 'clamp(100px, 10vw, 140px)',
            height: 'auto'
          }}
        />
      </div>
    </div>
  );
};

// Main Certifications component
function Certi() {
  const [currentCardIndex, setCurrentCardIndex] = useState(1);

  // Prepare slides for Carousel
  const carouselSlides = [
    // Add two clones from the end at the start
    {
      ...certifications[certifications.length - 2],
      renderCard: () => (
        <div className="flex items-center justify-center w-full h-full">
          <CertificationCard certification={certifications[certifications.length - 2]} />
        </div>
      ),
    },
    {
      ...certifications[certifications.length - 1],
      renderCard: () => (
        <div className="flex items-center justify-center w-full h-full">
          <CertificationCard certification={certifications[certifications.length - 1]} />
        </div>
      ),
    },
    // Main slides
    ...certifications.map(cert => ({
      ...cert,
      renderCard: () => (
        <div className="flex items-center justify-center w-full h-full">
          <CertificationCard certification={cert} />
        </div>
      ),
    })),
    // Add two clones from the start at the end
    {
      ...certifications[0],
      renderCard: () => (
        <div className="flex items-center justify-center w-full h-full">
          <CertificationCard certification={certifications[0]} />
        </div>
      ),
    },
    {
      ...certifications[1],
      renderCard: () => (
        <div className="flex items-center justify-center w-full h-full">
          <CertificationCard certification={certifications[1]} />
        </div>
      ),
    },
  ];

  // Mobile navigation handlers
  const goPrev = () => setCurrentCardIndex(prev => (prev <= 0 ? carouselSlides.length - 2 : prev - 1));
  const goNext = () => setCurrentCardIndex(prev => (prev >= carouselSlides.length - 2 ? 1 : prev + 1));

  return (
    <div className="box-border py-8 md:py-12 lg:py-14 w-full font-['Krona_One']">
      {/* Heading - using clamp for smooth scaling */}
      <div 
        className="text-center text-black mb-8 md:mb-12 lg:mb-16"
        style={{
          fontSize: 'clamp(24px, 4vw, 48px)'
        }}
      >
        Certifications
      </div>

      {/* Desktop view - use Carousel with infinite auto-scroll */}
      <div className="hidden sm:flex w-full justify-center items-center">
        <div 
          className="mx-auto"
          style={{
            width: 'clamp(500px, 70vw, 700px)'
          }}
        >
          <Carousel slides={carouselSlides} infinite autoScroll autoScrollInterval={3500} />
        </div>
      </div>

      {/* Mobile view - use Carousel with infinite auto-scroll */}
      <div className="sm:hidden w-full px-4 py-8">
        <div className="relative overflow-visible w-full py-8 flex flex-col items-center justify-center">
          <div 
            className="mx-auto relative"
            style={{
              width: 'min(90vw, 400px)'
            }}
          >
            <Carousel slides={carouselSlides} infinite autoScroll autoScrollInterval={3500} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certi;
