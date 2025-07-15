import * as React from "react";
import "@fontsource/krona-one";
import "@fontsource/montserrat"; // Import Montserrat font
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Connect() {
  return (
    <div className="flex overflow-hidden flex-col py-0 px-4 bg-white md:py-12 md:pb-0 pb-0 md:pl-9 lg:pl-9 font-['Krona_One']">
      <div className="self-center text-3xl text-black text-center md:text-4xl lg:text-5xl md:max-w-full">
        Connect with us
      </div>
      <div className="flex flex-col bg-gradient-to-r from-[#E7C375] to-[#fffffe] items-start pt-4 px-4 pb-12 mt-8 w-full rounded-[30px] md:pt-5 md:pr-20 md:pb-20 md:pl-9 md:mt-12 md:rounded-[50px] lg:px-9">
        <div className="text-2xl text-black leading-tight md:text-4xl lg:text-5xl md:max-w-full lg:leading-normal">
          Join our social‑media <br />
          community
        </div>
        <div
          className="mt-3 text-sm leading-relaxed font-semibold text-black w-full md:text-base lg:text-lg md:pt-4 md:w-[710px] lg:w-[710px]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Join us on social media for the latest stories, innovations, and
          exclusive updates. Let's grow and make an impact—together.
        </div>
        <div className="grid grid-cols-2 gap-3 self-center mt-8 w-full text-sm text-white md:flex md:flex-row md:flex-wrap md:gap-3 md:justify-between md:mt-12 md:text-base lg:mt-16 lg:gap-5 lg:max-w-[1155px]">
          <div className="flex items-center gap-1.5 px-6 py-1.5 whitespace-nowrap bg-black rounded-3xl justify-center
            md:px-8 md:py-1.5 md:min-w-[170px] md:h-[48px] lg:min-w-[190px] lg:h-[54px]
            cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg">
            <FaWhatsapp className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]" />
            <div className="basis-auto">WhatsApp</div>
          </div>
          <div className="flex items-center gap-1.5 px-6 py-1.5 bg-black rounded-3xl justify-center
            md:px-8 md:py-1.5 md:min-w-[170px] md:h-[48px] lg:min-w-[190px] lg:h-[54px]
            cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg">
            <FaFacebook className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]" />
            <div>Facebook</div>
          </div>
          <div className="flex items-center gap-1.5 px-6 py-1.5 whitespace-nowrap bg-black rounded-3xl justify-center
            md:px-8 md:py-1.5 md:min-w-[170px] md:h-[48px] lg:min-w-[190px] lg:h-[54px]
            cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg">
            <FaInstagram className="w-6 h-6 md:w-7 md:h-7" />
            <div className="basis-auto">Instagram</div>
          </div>
          <div className="flex items-center gap-1.5 px-6 py-1.5 bg-black rounded-3xl justify-center
            md:px-8 md:py-1.5 md:min-w-[170px] md:h-[48px] lg:min-w-[190px] lg:h-[54px]
            cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg">
            <FaLinkedin className="w-[24px] h-[24px] md:w-[27px] md:h-[27px]" />
            <div>LinkedIn</div>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 px-6 py-1.5 whitespace-nowrap bg-black rounded-3xl justify-center
            md:col-span-1 md:px-8 md:py-1.5 md:min-w-[170px] md:h-[48px] lg:min-w-[190px] lg:h-[54px]
            cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg">
            <FaTwitter className="w-5 h-5" />
            <div>Twitter</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connect;
