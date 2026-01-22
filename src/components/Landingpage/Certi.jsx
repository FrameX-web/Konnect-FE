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

// Reusable Card component with responsive sizes
const CertificationCard = ({ certification }) => {
  const { id, title, description } = certification;

  return (
    <article
      className="relative mx-auto w-full transition-all duration-400 ease-in-out"
      style={{
        maxWidth: 'min(550px, 90vw)',
        aspectRatio: '1.72',
        height: 'auto'
      }}
      aria-labelledby={`cert-${id}-title`}
    >
      {/* Card background with rounded corners and gradient */}
      <div 
        className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 border-black/60"
        style={{
          background: 'linear-gradient(to top right, #FFD57F, #F6DFAB)'
        }}
        aria-hidden="true"
      />
      
      {/* Title - responsive sizing with Tailwind breakpoints */}
      <div 
        id={`cert-${id}-title`}
        className="absolute left-0 right-0 text-center text-black font-bold px-4
                   text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                   top-3 sm:top-4 md:top-5 lg:top-6"
      >
        {title}
      </div>
      
      {/* Horizontal line under title with fade effect */}
      <div 
        className="absolute h-0.5
                   left-5 right-5 sm:left-6 sm:right-6 md:left-8 md:right-8 lg:left-10 lg:right-10
                   top-10 sm:top-12 md:top-14 lg:top-16"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0))'
        }}
        aria-hidden="true"
      />
      
      {/* Description text container with responsive positioning */}
      <div 
        className="absolute flex items-center justify-center
                   px-6 sm:px-8 md:px-10 lg:px-12
                   top-14 sm:top-16 md:top-20 lg:top-24
                   bottom-14 sm:bottom-16 md:bottom-20 lg:bottom-24"
      >
        <p
          className="font-medium text-black text-center
                     text-[0.55rem] sm:text-sm md:text-base lg:text-lg
                     leading-relaxed"
          style={{ 
            fontFamily: "'Montserrat', sans-serif"
          }}
        >
          {description}
        </p>
      </div>
      
      {/* Check mark icon at the bottom of the card */}
      <div 
        className="absolute left-1/2 -translate-x-1/2
                   bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6"
      >
        <img 
          src="/hero/check.png" 
          alt={`${title} verification checkmark`}
          loading="lazy"
          width="140"
          height="140"
          className="w-14 h-auto sm:w-18 md:w-24 lg:w-24"
        />
      </div>
    </article>
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

  React.useEffect(() => {
    if (typeof document === 'undefined') return;

    const upsertScript = (id, data) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(data);
    };

    const certLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: certifications.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'EducationalOccupationalCredential',
          name: c.title,
          description: c.description,
          credentialCategory: 'Certification'
        }
      }))
    };
    upsertScript('ld-certifications', certLd);
  }, []);

  return (
    <section className="box-border py-8 md:py-12 lg:py-14 w-full font-['Krona_One']" aria-labelledby="h2-certs">
      {/* Heading - using clamp for smooth scaling */}
      <h2 
        id="h2-certs"
        className="text-center text-black mb-8 md:mb-12 lg:mb-16"
        style={{
          fontSize: 'clamp(24px, 4vw, 48px)'
        }}
      >
        Certifications for VCI Packaging & Corrosion Protection
      </h2>

      {/* Desktop view - use Carousel with infinite auto-scroll */}
      <div className="hidden sm:flex w-full justify-center items-center px-8 md:px-12 py-12" role="region" aria-label="Certifications carousel">
        <div 
          className="mx-auto w-full"
          style={{
            maxWidth: 'min(700px, 85vw)'
          }}
        >
          <Carousel slides={carouselSlides} infinite autoScroll autoScrollInterval={3500} />
        </div>
      </div>

      {/* Mobile view - use Carousel with infinite auto-scroll */}
      <div className="sm:hidden w-full px-8 py-12" role="region" aria-label="Certifications carousel mobile">
        <div className="relative w-full flex items-center justify-center">
          <div 
            className="mx-auto w-full"
            style={{
              maxWidth: 'min(400px, 85vw)'
            }}
          >
            <Carousel slides={carouselSlides} infinite autoScroll autoScrollInterval={3500} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certi;
