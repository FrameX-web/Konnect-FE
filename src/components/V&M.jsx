import * as React from "react";
import '@fontsource/krona-one/400.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';

function VisionAndMission() {
  const EyeIcon = () => (
    <svg
      width="56"
      height="56"
      viewBox="0 0 74 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-14 text-white"
    >
      <path
        d="M7.7085 25.2434C8.02916 18.7684 8.98808 14.7292 11.8617 11.8617C14.7292 8.98808 18.7684 8.02916 25.2434 7.7085M66.2918 25.2434C65.9712 18.7684 65.0122 14.7292 62.1386 11.8617C59.2711 8.98808 55.2319 8.02916 48.7569 7.7085M48.7569 66.2918C55.2319 65.9712 59.2711 65.0122 62.1386 62.1386C65.0122 59.2711 65.9712 55.2319 66.2918 48.7569M25.2434 66.2918C18.7684 65.9712 14.7292 65.0122 11.8617 62.1386C8.98808 59.2711 8.02916 55.2319 7.7085 48.7569M60.5414 34.8973C61.2907 35.8347 61.6668 36.3064 61.6668 37.0002C61.6668 37.6939 61.2907 38.1657 60.5414 39.103C57.1713 43.321 48.5657 52.4168 37.0002 52.4168C25.4346 52.4168 16.829 43.321 13.4589 39.103C12.7097 38.1657 12.3335 37.6939 12.3335 37.0002C12.3335 36.3064 12.7097 35.8347 13.4589 34.8973C16.829 30.6793 25.4346 21.5835 37.0002 21.5835C48.5657 21.5835 57.1713 30.6793 60.5414 34.8973Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.1668 37.0002C43.1668 35.3647 42.5171 33.7961 41.3607 32.6397C40.2042 31.4832 38.6357 30.8335 37.0002 30.8335C35.3647 30.8335 33.7961 31.4832 32.6397 32.6397C31.4832 33.7961 30.8335 35.3647 30.8335 37.0002C30.8335 38.6357 31.4832 40.2042 32.6397 41.3607C33.7961 42.5171 35.3647 43.1668 37.0002 43.1668C38.6357 43.1668 40.2042 42.5171 41.3607 41.3607C42.5171 40.2042 43.1668 38.6357 43.1668 37.0002Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const MissionIcon = () => (
    <svg
      width="56"
      height="56"
      viewBox="0 0 74 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-14 text-white"
    >
      <path
        d="M24.6665 27.75V46.25M36.9998 27.75V46.25M24.6665 37H40.0832C42.9568 37 44.3937 37 45.5253 36.5313C46.2739 36.2214 46.9542 35.767 47.5272 35.194C48.1002 34.621 48.5546 33.9408 48.8645 33.1921C49.3332 32.0605 49.3332 30.6237 49.3332 27.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="37" cy="34" r="30.5" stroke="currentColor" />
    </svg>
  );

  const CheckmarkIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-[#E9C77F] flex-shrink-0"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const visionPoints = [
    "Become a global leader in innovative packaging solutions.",
    "Set new standards in quality, design, and sustainability.",
    "Empower brands to create strong consumer connections.",
    "Inspire change through eco-conscious packaging practices.",
    "Continuously evolve to meet future industry needs."
  ];

  const missionPoints = [
    "Deliver high-quality, customized packaging for every client.",
    "Promote sustainable and recyclable materials in all products.",
    "Ensure customer satisfaction through reliable service and support.",
    "Invest in cutting-edge technology for efficient manufacturing.",
    "Build long-term partnerships with brands around the world."
  ];

  return (
    <div className="relative mx-auto my-0 w-full bg-gray-50 min-h-screen max-w-full max-md:p-5 max-sm:p-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Title Section - Keeping as is */}
      <div className="absolute bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] h-[171px] left-1/2 transform -translate-x-1/2 rounded-[30px] top-[104px] w-[1382px] max-md:h-[120px] max-md:top-[84px] max-md:w-[calc(100%_-_40px)] max-sm:rounded-3xl max-sm:h-[100px] max-sm:top-[74px] max-sm:w-[calc(100%_-_30px)]" />
      <div className="absolute text-6xl text-gray-800 h-[75px] left-1/2 transform -translate-x-1/2 top-[152px] text-center max-md:text-4xl max-md:top-[120px] max-sm:text-2xl text-nowrap max-sm:top-[100px]" style={{ fontFamily: 'Krona One, sans-serif' }}>
        Vision and Mission
      </div>

      {/* Main Content */}
      <div className="pt-[300px] px-8 pb-16 max-md:pt-[220px] max-md:px-6 max-sm:pt-[180px] max-sm:px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Vision Section */}
          <div className="mb-16 max-md:mb-12 max-sm:mb-8">
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Vision Header */}
              <div className="bg-gradient-to-r from-[#E9C77F] to-[#FBE6B7] p-8 max-md:p-6 max-sm:p-5">
                <div className="flex items-center space-x-6 max-sm:space-x-4">
                  <div className="w-20 h-20 bg-gray-800 backdrop-blur-sm rounded-2xl flex items-center justify-center max-sm:w-16 max-sm:h-16">
                    <EyeIcon />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2 max-md:text-3xl max-sm:text-2xl">
                      Our Vision
                    </h2>
                    <p className="text-gray-900 font-medium text-xl max-md:text-base max-sm:text-sm">
                      Where we're heading and what we aspire to achieve
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision Content */}
              <div className="p-8 max-md:p-6 max-sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:gap-4">
                  {visionPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-4 group hover:bg-gray-50 p-4 rounded-xl transition-all duration-200 max-sm:space-x-3 max-sm:p-3">
                      <CheckmarkIcon />
                      <div className="flex-1">
                        <p className="text-gray-700 text-xl leading-relaxed font-medium group-hover:text-gray-900 transition-colors duration-200 max-md:text-base max-sm:text-sm">
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-16 max-md:mb-12 max-sm:mb-8">
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Mission Header */}
              <div className="bg-gradient-to-r from-[#FBE6B7] to-[#E9C77F] p-8 max-md:p-6 max-sm:p-5">
                <div className="flex items-center space-x-6 max-sm:space-x-4">
                  <div className="w-20 h-20 bg-gray-800 backdrop-blur-sm rounded-2xl flex items-center justify-center max-sm:w-16 max-sm:h-16">
                    <MissionIcon />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2 max-md:text-3xl max-sm:text-2xl">
                      Our Mission
                    </h2>
                    <p className="text-gray-900 font-medium text-xl max-md:text-base max-sm:text-sm">
                      How we deliver value and make a difference every day
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission Content */}
              <div className="p-8 max-md:p-6 max-sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:gap-4">
                  {missionPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-4 group hover:bg-gray-50 p-4 rounded-xl transition-all duration-200 max-sm:space-x-3 max-sm:p-3">
                      <CheckmarkIcon />
                      <div className="flex-1">
                        <p className="text-gray-700 text-xl font-medium leading-relaxed group-hover:text-gray-900 transition-colors duration-200 max-md:text-base max-sm:text-sm">
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisionAndMission;
