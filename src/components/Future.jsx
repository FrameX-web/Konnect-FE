import React from 'react';

function FutureProof() {
  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto pt-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#F0D395] to-[#EAC882] rounded-2xl p-6 md:p-8 mb-8">
          <h1 className="font-['Krona_One',sans-serif] text-[#111] text-xl md:text-3xl lg:text-4xl mb-3 leading-tight">
            Future-Proof Protection.
          </h1>
          <p className="font-['Montserrat',sans-serif] text-[#333] text-sm md:text-base font-medium lg:text-lg leading-relaxed">
            Safeguard your products today, secure your business for tomorrow.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 md:space-y-8">
          {/* Introduction Paragraph */}
          <div className="text-gray-900 font-['Montserrat',sans-serif] font-medium text-sm md:text-lg leading-relaxed">
            <p>
              Corrosion is a silent yet visible threat, eroding nearly <span className="font-semibold">5% of global GDP every year</span>, causing industries to lose 
              trillions. In Europe and Serbia alone, businesses suffer billions of euros in losses annually due to rust, 
              degradation, and product failures. Many companies either absorb these costs or rely on outdated solutions 
              like greasing metals—messy, expensive, and often ineffective with poor barrier protection.
            </p>
          </div>

          {/* Second Paragraph */}
          <div className="text-gray-900 font-['Montserrat',sans-serif] text-sm font-medium md:text-lg leading-relaxed">
            <p>
              At <span className="font-semibold">Konnect Packaging International LLP, we understand the urgency of this challenge. That's why we've 
              developed smart, sustainable packaging solutions, including advanced VCI (Vapor Corrosion Inhibitor) 
              products, that deliver superior protection, cleanliness, and reliability</span> all at a cost-effective price.
            </p>
          </div>

          {/* Why Choose Section */}
          <div className="mt-8">
            <h2 className="font-['Krona_One',sans-serif] text-[#111] text-lg md:text-xl lg:text-2xl mb-6">
              ● Why Choose Konnect Packaging?
            </h2>
            
            <div className="space-y-6">
              {/* Superior Protection */}
              <div>
                <h3 className="font-['Montserrat',sans-serif] font-semibold text-gray-900 text-sm md:text-lg mb-2">
                  ● Superior Protection –
                </h3>
                <p className="text-gray-800 font-['Montserrat',sans-serif] font-medium text-sm md:text-lg leading-relaxed ml-4">
                  Our VCI technology creates an invisible shield, outperforming traditional greasing and oils.
                </p>
              </div>

              {/* Clean & Sustainable */}
              <div>
                <h3 className="font-['Montserrat',sans-serif] font-semibold text-[#111] text-sm md:text-lg mb-2">
                  ● Clean & Sustainable –
                </h3>
                <p className="text-gray-800 font-['Montserrat',sans-serif] font-medium text-sm md:text-lg leading-relaxed ml-4">
                  No residue, no waste—eco-friendly materials aligned with global ESG standards.
                </p>
              </div>

              {/* Cost-Effective */}
              <div>
                <h3 className="font-['Montserrat',sans-serif] font-semibold text-[#111] text-sm md:text-lg mb-2">
                  ● Cost-Effective –
                </h3>
                <p className="text-gray-800 font-['Montserrat',sans-serif] font-medium text-sm md:text-lg leading-relaxed ml-4">
                  Minimize losses, prevent recalls, and extend product lifespan.
                </p>
              </div>

              {/* Smart & Adaptive */}
              <div>
                <h3 className="font-['Montserrat',sans-serif] font-semibold text-[#111] text-sm md:text-lg mb-2">
                  ● Smart & Adaptive –
                </h3>
                <p className="text-gray-800 font-['Montserrat',sans-serif] font-medium text-sm md:text-lg leading-relaxed ml-4">
                  IoT-enabled solutions for real-time corrosion monitoring.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mt-8">
            <h2 className="font-['Montserrat',sans-serif] font-semibold text-[#111] text-sm md:text-lg mb-2">
              ● Our mission is clear:
            </h2>
            <div className="space-y-4 text-gray-800 font-['Montserrat',sans-serif] font-medium text-sm md:text-lg leading-relaxed">
              <p>
                To empower industries facing corrosion risks with solutions that reduce losses, strengthen competitiveness, 
                and future-proof their supply chains.
              </p>
              <p>
                Join global leaders who trust Konnect Packaging to protect their products, profits, and the planet.
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-12 pt-8">
            <div className="space-y-1 text-gray-800 font-['Montserrat',sans-serif] text-sm md:text-xl">
              <p className="font-semibold md:text-2xl text-xl">Best regards,</p>
              <p className="font-semibold">Marko</p>
              <p>Business Development</p>
              <p>Director</p>
              <p>Konnect Packaging</p>
              <p>International LLP</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-[#E5E5E5]">
          <div className="bg-gradient-to-r from-black to-white text-white text-left py-3 px-6 rounded-lg">
            <p className="font-['Montserrat',sans-serif] text-sm md:text-base font-medium">
              Defending Value, Delivering Innovation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FutureProof;