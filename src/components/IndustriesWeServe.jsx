import * as React from "react";
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat/400.css';

const IndustriesWeServe = () => {
  const industries = [
    {
      title: "Metals & Foundry",
      description:
        "We provide corrosion-resistant and durable packaging for raw metals, castings, and foundry components. Our solutions ensure protection during storage and transit, even in harsh environments. Ideal for steel, iron, and alloy manufacturers needing high-performance wrapping.",
    },
    {
      title: "Automotive & Engineering",
      description:
        "Tailored packaging for precision parts, engine components, and transmission systems. Protects against moisture, corrosion, and physical damage during export and assembly. Trusted by OEMs and Tier-1 suppliers for safe, scalable logistics.",
    },
    {
      title: "Food & Beverage",
      description:
        "Food-grade packaging solutions ensuring freshness, contamination protection, and extended shelf life. Compliant with FDA standards and suitable for both processed foods and beverages. Temperature-resistant materials for hot-fill and frozen products.",
    },
    {
      title: "Agriculture & Tea Export",
      description:
        "Specialized in breathable, eco-friendly packaging for grains, pulses, tea, and fertilizers. Ensures long shelf life, aroma protection, and reduced spoilage in transit. Custom sizes and barrier layers suitable for both bulk and branded exports.",
    },
    {
      title: "Export & Logistics",
      description:
        "High-strength, tear-resistant packaging built for long-distance shipping and warehousing. Ensures compliance with international trade norms and reduces customs damage claims. QR-code ready and RFID-compatible for modern supply chains.",
    },
    {
      title: "Defense & Aerospace",
      description:
        "Heavy-duty, certified packaging for sensitive equipment and high-value machinery. Offers VCI protection, moisture barriers, and anti-tamper design. Meets military-grade standards for reliability in extreme conditions.",
    },
  ];

  const IndustryCard = ({ title, description }) => (
    <div
      className="box-border relative p-6 bg-black rounded-[4rem] w-full max-w-md mx-auto h-[400px] max-md:p-3 max-md:h-[300px] max-md:max-w-none max-sm:p-3 max-sm:h-[230px] max-sm:rounded-[2rem] transition-transform duration-500 hover:shadow-xl hover:scale-[1.03]"
      style={{fontFamily: 'Montserrat, sans-serif'}}
    >
      <div className="relative mb-2 text-xl font-extrabold flex items-center justify-center text-black border-2 border-white bg-white h-16 rounded-[3rem] w-full max-md:h-10 max-md:text-[10px] max-sm:h-9 max-sm:text-[10px]" style={{fontFamily: 'Montserrat, sans-serif'}}>
        {title}
      </div>
      <div className="h-[280px] p-[2px] bg-gradient-to-b from-transparent to-white max-md:h-[150px] max-sm:h-[165px] rounded-b-[3rem] max-sm:rounded-b-[2rem]">
        <div className="h-full text-[1rem] text-center font-normal text-white leading-relaxed p-4 bg-black flex items-center justify-center rounded-b-[3rem] max-sm:rounded-b-[2rem] max-md:text-[0.6rem] max-md:p-2 max-sm:text-[0.52rem] max-sm:p-2" style={{fontFamily: 'Montserrat, sans-serif'}}>
          {description}
        </div>
      </div>
    </div>
  );

  return (
    <div className="box-border px-7 pt-32 pb-16 mx-auto my-0 w-full bg-white max-w-[1440px] max-md:px-5 max-md:pt-20 max-md:pb-12 max-sm:px-4 max-sm:pt-16 max-sm:pb-8" style={{fontFamily: 'Montserrat, sans-serif'}}>
      <div className="box-border bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] px-6 pt-12 pb-0 mb-12 w-full min-h-[17rem] max-w-full rounded-4xl max-md:px-4 max-md:py-8 max-md:mb-8 max-md:min-h-auto max-sm:px-3 max-sm:py-6 max-sm:mb-6 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
        <div className="mb-6 text-5xl text-black max-md:mb-4 max-md:text-4xl max-sm:mb-3 max-sm:text-2xl" style={{fontFamily: 'Krona One, sans-serif'}}>
          Industries We Serve
        </div>
        <div className="text-2xl text-black max-w-4xl max-md:text-lg max-sm:text-base" style={{fontFamily: 'Montserrat, sans-serif'}}>
          Smart packaging for diverse sectors—secure, sustainable, and
          industry-ready.
        </div>
      </div>
      <div className="grid gap-8 w-full grid-cols-2 lg:grid-cols-3 justify-items-center max-md:gap-6 max-sm:gap-4">
        {industries.map((industry, index) => (
          <IndustryCard
            key={index}
            title={industry.title}
            description={industry.description}
          />
        ))}
      </div>
    </div>
  );
};

export default IndustriesWeServe;
