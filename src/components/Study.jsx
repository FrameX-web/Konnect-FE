import * as React from "react";
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';

const Study = () => {
  const solutions = [
    {
      title: "Build Your Packaging Wizard",
      description: "An intelligent, interactive platform that helps customers identify the best packaging configurations. By selecting parameters such as industry type, product sensitivity, shelf life, storage condition, and logistics route, the wizard offers:",
      features: [
        "Material recommendations (VCI, laminated, PE-coated, etc.)",
        "Format suggestions (rolls, sheets, pouches, liners)",
        "Barrier requirements (moisture, oxygen, corrosion, UV)",
        "This tool simplifies decision-making for buyers, engineers, and procurement teams."
      ]
    },
    {
      title: "Tailored Packaging for OEMs & Exporters",
      description: "We collaborate closely with OEMs and exporters to develop precisely engineered packaging that meets international logistics and regulatory demands. Solutions include:",
      features: [
        "Export-grade pouches, wraps, and bulk liners with customized thickness and coatings",
        "Anti-corrosion layers for long-distance sea/air shipments",
        "Sizing and format optimization for pallets, drums, crates, or machine components",
        "Branding elements including print, color coding, and labeling for traceability"
      ]
    },
    {
      title: "Innovation Through R&D",
      description: "Our dedicated R&D wing drives continuous innovation in functional packaging. Our focus areas include:",
      features: [
        "Advanced Anti-Corrosion Technologies – Improved VCI formulations and layered barriers",
        "Sustainable Materials – Compostable films, wax alternatives, recyclable structures",
        "Performance Testing – Real-time simulations for humidity, mechanical stress, and shelf life",
        "Product Development – Co-engineering projects with clients for next-gen packaging"
      ]
    }
  ];

  const SolutionCard = ({ title, description, features }) => (
    <div className="box-border relative p-8 bg-white border border-gray-100 rounded-2xl w-full mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-md:p-6 max-sm:p-4" style={{fontFamily: 'Montserrat, sans-serif'}}>
      {/* Title with enhanced styling */}
      <div className="relative mb-8 max-md:mb-6 max-sm:mb-4">
        <div className="flex items-center justify-start mb-3">
          <div className="w-3 h-3 bg-gradient-to-r from-[#E9C77F] to-[#FBE6B7] rounded-full mr-4 max-md:w-2 max-md:h-2 max-sm:mr-3"></div>
          <div className="h-px bg-gradient-to-r from-[#E9C77F] to-transparent flex-1"></div>
        </div>
        <h3
          className="text-2xl font-bold text-black leading-tight max-md:text-xl max-sm:text-lg"
          style={{fontFamily: 'Montserrat, sans-serif', fontWeight: 600}}
        >
          {title}
        </h3>
      </div>
      
      {/* Description with better typography */}
      <div className="mb-8 max-md:mb-6 max-sm:mb-4">
        <p
          className="text-base text-gray-600 leading-relaxed font-normal max-md:text-sm max-sm:text-xs"
          style={{fontFamily: 'Montserrat, sans-serif', fontWeight: 500}}
        >
          {description}
        </p>
      </div>
      
      {/* Enhanced feature list */}
      <div className="space-y-4 max-md:space-y-3 max-sm:space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start group">
            <div className="flex-shrink-0 w-6 h-6 mt-0.5 mr-4 flex items-center justify-center max-md:w-5 max-md:h-5 max-sm:w-4 max-sm:h-4 max-sm:mr-3">
              <div className="w-2 h-2 bg-gradient-to-r from-[#E9C77F] to-[#FBE6B7] rounded-full group-hover:scale-125 transition-transform duration-200 max-md:w-1.5 max-md:h-1.5"></div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-normal flex-1 max-md:text-xs max-sm:text-[0.7rem]" style={{fontFamily: 'Montserrat, sans-serif', fontWeight: 500}}>
              {feature}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="box-border px-7 pt-32 pb-16 mx-auto my-0 w-full bg-white max-w-[1440px] max-md:px-5 max-md:pt-20 max-md:pb-12 max-sm:px-4 max-sm:pt-16 max-sm:pb-8" style={{fontFamily: 'Montserrat, sans-serif'}}>
      <div className="box-border bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] px-6 pt-12 pb-6 mb-12 w-full min-h-[17rem] max-w-full rounded-3xl max-md:px-4 max-md:py-8 max-md:mb-8 max-md:min-h-auto max-sm:px-3 max-sm:py-6 max-sm:mb-6">
        <div className="mb-6 text-5xl text-black max-md:mb-4 max-md:text-4xl max-sm:mb-3 max-sm:text-2xl" style={{fontFamily: 'Krona One, sans-serif'}}>
          Custom Solutions & Innovation
        </div>
        <div
          className="text-lg text-black max-w-4xl leading-relaxed max-md:text-base max-sm:text-sm"
          style={{fontFamily: 'Montserrat, sans-serif', fontWeight: 500}}
        >
          At Konnect Packaging, we don't just provide products — we provide purpose-built solutions. Our approach blends industry insight, material science, and client collaboration to create packaging that performs under pressure and stands out on the shelf.
        </div>
      </div>
      <div className="grid gap-8 w-full grid-cols-1 justify-items-center max-md:gap-6 max-sm:gap-4">
        {solutions.map((solution, index) => (
          <SolutionCard
            key={index}
            title={solution.title}
            description={solution.description}
            features={solution.features}
          />
        ))}
      </div>
    </div>
  );
};

export default Study;
