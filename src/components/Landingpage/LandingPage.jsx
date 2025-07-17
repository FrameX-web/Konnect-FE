import Hero from './Hero'
import Products from './Products'
import Products2 from './Products2'
import Progress from './Progress'
import Worldwide from './Worldwide'
import Serve from './Serve'
import Certifiation from './Certi'
import Connect from './Connect'
import Ribbon from './Ribbon'
import Footer from './Footer'

const LandingPage = () => {
  return (
    <>
      <div className="w-[95%] mx-auto mt-8 rounded-[3rem] overflow-hidden">
        <Hero />
        <Products />
        <Products2 />
        <Progress />
        {/* Worldwide section with its own background */}
        <div
          className="ww-bg"
          style={{
            position: "relative",
            width: "100%",
            backgroundImage: "url('/mapbg.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "70% auto", // reduced image width
            backgroundPosition: "center",
            backgroundAttachment: "scroll", // Parallax effect
            zIndex: 0,
          }}
        >
          {/* Responsive background for mobile */}
          <style>
            {`
              @media (max-width: 768px) {
                .ww-bg {
                  background-image: url('/mapm.png') !important;
                  background-size: 95% auto !important; /* slightly larger for mobile */
                  background-attachment: scroll !important;
                }
              }
            `}
          </style>
          <div style={{ position: "relative", zIndex: 1 }}>
            <Worldwide />
          </div>
        </div>
        {/* Start background image here */}
        <div style={{ position: "relative", width: "100%" }}>
          {/* Background image layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: "url('/back1.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "80% auto", // reduced image width
              backgroundPosition: "center 0", // center horizontally
              opacity: 0.7, // only background is faded
              pointerEvents: "none",
            }}
          />
          {/* Foreground content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <Serve />
            <Certifiation />
          </div>
        </div>
        {/* End background image here */}
        {/* Start second background image here */}
        <div style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: "url('/back2.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "80% auto", // reduced image width
              backgroundPosition: "center 0", // center horizontally
              opacity: 1,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Connect />
            <Ribbon />
            {/* Footer removed from here */}
          </div>
        </div>
        {/* End second background image here */}
      </div>
      {/* Footer now outside, full width */}
      <div style={{ width: "100%" }}>
        <Footer />
      </div>
    </>
  )
}

export default LandingPage
