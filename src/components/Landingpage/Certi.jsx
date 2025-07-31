import * as React from "react";
import { useState } from "react";
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat';
import { Carousel } from "../ui/Carousal";
import { ArrowRight } from "lucide-react"; // Use Lucide React icon

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

// Reusable Card component
const CertificationCard = ({ certification }) => {
  const { id, title, description } = certification;

  return (
    <div
      className="relative max-w-full mx-auto h-[320px] w-[550px] max-md:h-[220px] max-md:w-[380px] max-sm:h-[45vw] max-sm:w-[350px] duration-400 ease-in-out"
    >
      {/* Card background with rounded corners and gradient */}
      <div className="w-full h-full bg-gradient-to-tr from-[#FFD57F] to-[#F6DFAB] rounded-[20px] border-2 border-black/60"></div>
      
      {/* Title */}
      <div className="absolute top-[30px] left-0 right-0 text-center text-[32px] max-md:text-[24px] max-sm:text-[20px] text-black font-bold max-sm:top-[18px]">
        {title}
      </div>
      
      {/* Horizontal line under title with fade effect */}
      <div 
        className="absolute top-[80px] left-[30px] right-[30px] h-[2px] max-md:top-[65px] max-sm:top-[43px] max-md:left-[20px] max-md:right-[20px]"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0))'
        }}
      ></div>
      
      {/* Description text container with fixed height */}
      <div className="absolute top-[110px] left-[25px] right-[25px] h-[100px] max-md:top-[80px] max-md:h-[90px] max-sm:top-[60px] max-sm:h-[85px] max-md:left-[15px] max-md:right-[15px] flex items-center justify-center">
        <div
          className="text-[1.2rem] max-md:text-[12px] max-sm:text-[2.7vw] font-medium text-black text-center leading-[1.3] px-4 overflow-hidden"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {description}
        </div>
      </div>
      
      {/* Check mark icon at the bottom of the card */}
      <div className="absolute bottom-[15px] left-1/2 transform -translate-x-1/2 max-md:bottom-[8px] max-sm:bottom-[6px]">
        <img 
          src="/hero/check.png" 
          alt="Certification check" 
          className="w-[140px] h-[40px] max-md:w-[100px] max-md:h-[20px] max-sm:w-[16vw] max-sm:h-[5vw]" 
        />
      </div>
    </div>
  );
};

// Main Certifications component
function Certi() {
  const [currentCardIndex, setCurrentCardIndex] = useState(1); // Sync with Carousel initial index

  // Prepare slides for Carousel (both mobile and desktop)
  // Add multiple clones for infinite effect
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

  // Mobile navigation handlers (wrap around for infinite effect)
  const goPrev = () => setCurrentCardIndex(prev => (prev <= 0 ? carouselSlides.length - 2 : prev - 1));
  const goNext = () => setCurrentCardIndex(prev => (prev >= carouselSlides.length - 2 ? 1 : prev + 1));

  return (
    <div className="box-border py-6 md:pb-14 pt-0 w-full font-['Krona_One']">
      <div className="text-5xl text-center text-black mb-2 md:mb-12 max-md:text-4xl max-sm:text-3xl">
        Certifications
      </div>

      {/* Desktop view - use Carousel with infinite auto-scroll */}
      <div className="hidden sm:flex w-full justify-center items-center">
        <div className="w-[70vw] max-w-[700px] mx-auto">
          <Carousel slides={carouselSlides} infinite autoScroll autoScrollInterval={3500} />
        </div>
      </div>

      {/* Mobile view - use Carousel with infinite auto-scroll, only one card visible at a time, with navigation buttons */}
      <div className="sm:hidden w-full px-4 pt-8 pb-8"> {/* Increased pt-8 and added pb-8 for more vertical space */}
        <div className="relative overflow-visible w-full py-8 flex flex-col items-center justify-center"> {/* Increased py-8 and set overflow-visible */}
          <div className="w-[100vw] max-w-[70vw] mx-auto relative"> {/* Increased max-w for more space */}
            <Carousel slides={carouselSlides} infinite autoScroll autoScrollInterval={3500} />
            {/* Navigation buttons for mobile */}
            <div className="flex justify-center w-full mt-12">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certi;
