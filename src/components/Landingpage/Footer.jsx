import React, { useState } from "react";
import "@fontsource/krona-one";
import "@fontsource/montserrat"; // Import Montserrat font
import { 
  FaYoutube, 
  FaWhatsapp, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTwitter 
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import Popup from "./Popup"; // Import the new Popup component

// Reusable components for consistent styling
const SectionTitle = ({ children }) => (
  <h3 className="text-[#E9C77F] text-xl font-bold mb-5 uppercase tracking-wider" style={{ fontFamily: "'Krona One', sans-serif" }}>{children}</h3>
);

const LightText = ({ children, className = "" }) => (
  <p className={`text-gray-300 text-sm mb-2 leading-relaxed ${className}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>{children}</p>
);

const SocialIcon = ({ icon: Icon, label }) => (
  <a 
    href="#" 
    aria-label={label} 
    className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#E9C77F] hover:bg-[#E9C77F]/10 transition-all duration-300 ease-out transform hover:scale-105"
    style={{ fontFamily: "'Montserrat', sans-serif" }}
  >
    <Icon size={18} />
  </a>
);

const ContactItem = ({ icon: Icon, href, children }) => (
  <div className="flex items-center gap-3 mb-4 group" style={{ fontFamily: "'Montserrat', sans-serif" }}>
    <div className="text-[#E9C77F]">
      <Icon size={20} />
    </div>
    <a 
      href={href} 
      className="text-white text-sm hover:text-[#E9C77F] transition-colors duration-300"
    >
      {children}
    </a>
  </div>
);

// Navigation link component for company links with hover effect
const CompanyLink = ({ to, children }) => (
  <li>
    <a 
      href={to} 
      className="text-gray-300 text-sm transition-all duration-500 ease-out block py-2.5 px-3 -mx-3 rounded-lg relative overflow-hidden group hover:text-white hover:translate-x-2 transform hover:bg-gradient-to-r hover:from-[#E9C77F]/20 hover:to-[#E9C77F]/5 hover:shadow-lg hover:shadow-[#E9C77F]/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#E9C77F] before:to-transparent before:w-1 before:h-full before:left-0 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {children}
    </a>
  </li>
);

function Footer() {
  // Popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  // Handler to open popup with custom message
  const handlePopup = (msg) => {
    setPopupMsg(msg);
    setPopupOpen(true);
  };

  return (
    <>
      {/* Popup */}
      <Popup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        message={popupMsg}
      />
      <footer
        className="bg-black text-white py-16 px-8"
        // Remove fontFamily here so only SectionTitle and credit use Krona One
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo Section */}
            <div className="col-span-1 flex flex-col justify-center h-full md:h-[220px]">
              <div className="flex flex-col relative z-10 items-start">
                <img
                  src="/logow.png"
                  alt="KONNECT Logo"
                  className="h-36 md:h-[110px] w-auto mb-2"
                  style={{ objectFit: "contain" }}
                  onError={e => {
                    e.target.style.display = "none";
                    const fallback = e.target.nextSibling;
                    if (fallback) fallback.style.display = "block";
                  }}
                />
                <div style={{ display: "none" }}>
                  <h1 className="text-5xl font-bold text-[#E9C77F]" style={{ fontFamily: "'Krona One', sans-serif" }}>KONNECT</h1>
                  <p className="text-xl mt-1 font-light text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>packaging excellence;</p>
                </div>
              </div>
            </div>
            {/* Our Company Section */}
            <div className="col-span-1">
              <SectionTitle>Our company</SectionTitle>
              <ul>
                <li>
                  <button
                    type="button"
                    onClick={() => handlePopup("The Career page is still under construction. We're building something amazing for you!")}
                    className="text-gray-300 text-sm transition-all duration-500 ease-out block py-2.5 px-3 -mx-3 rounded-lg relative overflow-hidden group hover:text-white hover:translate-x-2 transform hover:bg-gradient-to-r hover:from-[#E9C77F]/20 hover:to-[#E9C77F]/5 hover:shadow-lg hover:shadow-[#E9C77F]/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#E9C77F] before:to-transparent before:w-1 before:h-full before:left-0 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Career
                  </button>
                </li>
                <CompanyLink to="/why-choose-us">Why Choose Us</CompanyLink>
                <CompanyLink to="/vision-mission">Vision and Mission</CompanyLink>
                <CompanyLink to="/analysis">Product Analysis</CompanyLink>
                <li>
                  <button
                    type="button"
                    onClick={() => handlePopup("Our Catalog page is coming soon. Get ready to explore our products!")}
                    className="text-gray-300 text-sm transition-all duration-500 ease-out block py-2.5 px-3 -mx-3 rounded-lg relative overflow-hidden group hover:text-white hover:translate-x-2 transform hover:bg-gradient-to-r hover:from-[#E9C77F]/20 hover:to-[#E9C77F]/5 hover:shadow-lg hover:shadow-[#E9C77F]/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#E9C77F] before:to-transparent before:w-1 before:h-full before:left-0 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Catalog
                  </button>
                </li>
                <li>
                  <a
                    href="/KONNECT-2.pdf"
                    download
                    className="text-gray-300 text-sm transition-all duration-500 ease-out block py-2.5 px-3 -mx-3 rounded-lg relative overflow-hidden group hover:text-white hover:translate-x-2 transform hover:bg-gradient-to-r hover:from-[#E9C77F]/20 hover:to-[#E9C77F]/5 hover:shadow-lg hover:shadow-[#E9C77F]/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#E9C77F] before:to-transparent before:w-1 before:h-full before:left-0 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Brochure
                  </a>
                </li>
              </ul>
            </div>

            {/* Location Section */}
            <div className="col-span-1">
              <SectionTitle>location</SectionTitle>
              <LightText>
                Plot no J/60; KONNECT packaging<br />
                International LLP,<br />
                Borgaon, Chhinwara,<br />
                Madhya Pradesh- pin<br />
                code- 480106, India
              </LightText>
            </div>

            {/* Contact Section */}
            <div className="col-span-1">
              <SectionTitle>contact</SectionTitle>
              <LightText className="mb-2 text-[0.7rem]">For general enquires and information</LightText>
              <ContactItem icon={MdEmail} href="mailto:info@konnectpackaging.com">
                info@konnectpackaging.com
              </ContactItem>

              <LightText className="mb-2 text-[0.7rem]">For material requirements, quotations,</LightText>
              <ContactItem icon={MdEmail} href="mailto:sales@konnectpackaging.com">
                sales@konnectpackaging.com
              </ContactItem>

              <LightText className="mb-2 text-[0.7rem]">Contact Number</LightText>
              <ContactItem icon={MdPhone} href="tel:+917774031665">
                +91-7774031665
              </ContactItem>
            </div>
          </div>
          {/* Social Media Icons */}
          <div className="border-t-2 border-white/50 pt-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
              <div className="flex justify-center md:justify-start order-2 md:order-1">
                <span className="hover:text-[#E9C77F] transition-colors duration-300 text-[11px] pt-4 md:pt-0 text-gray-500" style={{ fontFamily: "'Krona One', sans-serif" }}>
                  Crafted with excellence by{" "}
                  <span className="text-[#E9C77F] text-[12px] font-normal tracking-wide">FrameX</span>
                </span>
              </div>
              <div className="flex justify-center md:justify-end space-x-6 order-1 md:order-2">
                <SocialIcon icon={FaYoutube} label="YouTube" />
                <SocialIcon icon={FaWhatsapp} label="WhatsApp" />
                <SocialIcon icon={FaFacebookF} label="Facebook" />
                <SocialIcon icon={FaInstagram} label="Instagram" />
                <SocialIcon icon={FaLinkedinIn} label="LinkedIn" />
                <SocialIcon icon={FaTwitter} label="Twitter" />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="w-full h-10 bg-transparent" />
    </>
  );
}

export default Footer;
       

