import * as React from "react";
import '@fontsource/krona-one/400.css';
// Import Montserrat font weights
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';

const Choose = () => {
  const features = [
    {
      title: "Premium Quality Materials",
      description: "We use only top-grade materials that ensure durability and product safety. Your packaging stays strong, secure, and visually appealing."
    },
    {
      title: "Customized Solutions",
      description: "Each packaging solution is tailored to match your brand and product needs. We help you stand out in a competitive marketplace."
    },
    {
      title: "Eco-Friendly Approach",
      description: "Our materials are sustainable, recyclable, and environmentally conscious. We support your brand's commitment to a greener future."
    },
    {
      title: "Advanced Manufacturing",
      description: "State-of-the-art technology ensures precision and large-scale production. You get consistent quality, fast turnaround, and reduced errors."
    },
    {
      title: "Global Reach",
      description: "We serve clients across various industries and countries worldwide. Our packaging solutions meet international standards and trends."
    },
    {
      title: "Reliable Support",
      description: "Our expert team guides you from concept to delivery. We're always available to ensure a smooth and satisfying experience."
    }
  ];

  const FeatureCard = ({ title, description }) => (
    <div
      className="box-border relative bg-white rounded-3xl w-full mx-auto overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-gray-100 max-sm:rounded-xl max-sm:p-0"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Title section with gradient accent */}
      <div className="relative p-6 bg-gradient-to-br from-white to-gray-50 border-b border-gray-100 max-md:p-4 max-sm:p-3 max-sm:rounded-t-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E9C77F] to-[#FBE6B7] group-hover:h-2 transition-all duration-300"></div>
        <h3
          className="text-xl font-extrabold text-black text-center leading-tight pt-2 group-hover:text-gray-800 transition-colors duration-300 max-md:text-sm max-sm:text-[10px]"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {title}
        </h3>
      </div>
      
      {/* Description section with modern black design */}
      <div className="relative p-6 bg-black min-h-[220px] flex items-center justify-center overflow-hidden max-md:p-4 max-md:min-h-[180px] max-sm:p-3 max-sm:min-h-[160px] max-sm:rounded-b-xl">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-8 h-8 border border-white/20 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300 max-sm:w-6 max-sm:h-6"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-[#E9C77F] to-[#FBE6B7] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300 max-sm:w-4 max-sm:h-4"></div>
        
        <p
          className="relative text-white text-lg text-center leading-relaxed font-normal group-hover:text-gray-100 transition-colors duration-300 max-md:text-xs max-sm:text-[0.7rem]"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="box-border px-7 pt-32 pb-16 mx-auto my-0 w-full bg-white max-w-[1440px] max-md:px-5 max-md:pt-20 max-md:pb-12 max-sm:px-4 max-sm:pt-16 max-sm:pb-8"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <div className="box-border bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] px-6 pt-12 pb-6 mb-12 w-full rounded-3xl max-md:px-4 max-md:py-8 max-md:mb-8 max-sm:px-3 max-sm:py-6 max-sm:mb-6">
        <div
          className="mb-6 text-5xl text-black font-bold max-md:mb-4 max-md:text-4xl max-sm:mb-3 max-sm:text-2xl"
          style={{ fontFamily: 'Krona One, sans-serif' }}
        >
          Why Choose Us
        </div>
        <div
          className="text-lg text-black max-w-7xl leading-relaxed max-md:text-sm max-sm:text-xs"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          At Konnect Packaging, we combine innovation with reliability to deliver exceptional packaging solutions. Our commitment to quality ensures your products stay safe, fresh, and market-ready. Trusted by global brands, we bring experience and excellence to every package we create.
        </div>
      </div>
      <div className="grid gap-8 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center max-md:gap-6 max-sm:gap-4 max-sm:grid-cols-2">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Choose;
