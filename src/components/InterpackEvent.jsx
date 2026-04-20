import React from 'react';
import '@fontsource/krona-one';
import '@fontsource/montserrat';
import { FaCalendarAlt, FaMapMarkerAlt, FaGlobe, FaPhoneAlt, FaEnvelope, FaWarehouse, FaIndustry, FaFlag } from 'react-icons/fa';

const presenceCards = [
  {
    title: 'Company in Lithuania',
    icon: FaFlag,
    accent: 'from-[#1b4d96] to-[#2e73ca]'
  },
  {
    title: 'Warehouse in Netherlands',
    icon: FaWarehouse,
    accent: 'from-[#c16a2d] to-[#e39255]'
  },
  {
    title: 'Manufacturing Base in India',
    icon: FaIndustry,
    accent: 'from-[#2f7b4a] to-[#4ba86b]'
  }
];

const InterpackEvent = () => {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f6e2b6_0%,#efd39b_42%,#132c57_100%)] px-4 pb-10 pt-24 md:px-8 md:pt-28 lg:px-12">
      <section className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[#f3d9a8]/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.94)_0%,rgba(248,236,213,0.92)_58%,rgba(230,203,146,0.9)_100%)] shadow-[0_24px_60px_rgba(8,24,47,0.35)]">
        <div className="relative px-5 pb-8 pt-7 md:px-10 md:pt-10 lg:px-14 lg:pb-12">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-28 w-40 -translate-x-1/2 rounded-full bg-[#f6cf71]/35 blur-3xl" aria-hidden="true" />

          <header className="text-center">
            <p className="text-sm font-semibold tracking-[0.18em] text-[#163b75] md:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              KONNECT PACKAGING
            </p>
            <h1 className="mt-2 text-2xl font-normal leading-tight text-[#0f2853] md:text-4xl" style={{ fontFamily: "'Krona One', sans-serif" }}>
              International UAB - Lithuania
            </h1>
            <p className="mt-6 text-lg text-[#3f331f] md:text-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              We are participating at
            </p>
            <div className="mx-auto mt-3 inline-flex items-center rounded-full border border-[#e8cc95] bg-[#fff8e9] px-5 py-2.5 shadow-sm md:px-8 md:py-3.5">
              <span className="text-3xl font-semibold tracking-tight text-[#10274d] md:text-5xl" style={{ fontFamily: "'Krona One', sans-serif" }}>
                interpack 2026
              </span>
            </div>
          </header>

          <div className="mt-8 grid gap-3 md:mx-auto md:max-w-2xl md:grid-cols-2 md:gap-4">
            <div className="flex items-center justify-center gap-2 rounded-xl border border-[#efd8ad] bg-white/75 px-4 py-3 text-[#2f2a20] shadow-sm">
              <FaCalendarAlt className="text-[#12478b]" aria-hidden="true" />
              <span className="text-sm font-semibold md:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                07-13 May 2026
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-[#efd8ad] bg-white/75 px-4 py-3 text-[#2f2a20] shadow-sm">
              <FaMapMarkerAlt className="text-[#12478b]" aria-hidden="true" />
              <span className="text-sm font-semibold md:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Messe Dusseldorf, Germany
              </span>
            </div>
          </div>

          <section className="relative mt-9 rounded-2xl border border-[#eedab3] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(240,221,183,0.75))] p-4 md:p-6">
            <div className="pointer-events-none absolute left-4 right-4 top-1/2 hidden -translate-y-1/2 border-t-2 border-dashed border-[#caa668] opacity-60 md:block" aria-hidden="true" />
            <h2 className="text-center text-xl text-[#11274d] md:text-3xl" style={{ fontFamily: "'Krona One', sans-serif" }}>
              Global Presence
            </h2>
            <div className="mt-5 grid gap-4 md:mt-7 md:grid-cols-3">
              {presenceCards.map(({ title, icon: Icon, accent }) => (
                <article key={title} className="relative rounded-2xl border border-[#e8cf9c] bg-[#fffaf0]/95 p-4 text-center shadow-md">
                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-white shadow-lg`}>
                    <Icon aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#1f2530] md:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {title}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 text-center">
            <div className="inline-flex w-full max-w-xl items-center justify-center rounded-full border border-[#a77728] bg-[linear-gradient(90deg,#f4d690_0%,#f2ca6c_48%,#e7b54c_100%)] px-5 py-3 shadow-[0_10px_22px_rgba(125,78,14,0.28)] md:px-8 md:py-4">
              <span className="text-lg font-semibold tracking-wide text-[#152f5b] md:text-3xl" style={{ fontFamily: "'Krona One', sans-serif" }}>
                VISIT US AT STAND 7aC10
              </span>
            </div>

            <div className="mt-5 flex flex-col items-center justify-center gap-3 text-[#10274d] md:flex-row md:gap-8">
              <a href="https://www.konnectpackaging.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline md:text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <FaGlobe aria-hidden="true" />
                www.konnectpackaging.com
              </a>
              <a href="tel:+37069912345" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline md:text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <FaPhoneAlt aria-hidden="true" />
                +370 699 12345
              </a>
            </div>
          </section>

          <footer className="mt-8 rounded-2xl border border-[#e3ca99] bg-[#10274d]/95 px-4 py-4 text-center text-white md:px-6 md:py-5">
            <p className="text-sm font-medium leading-relaxed text-[#f8e6bf] md:text-xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Global Anti-Corrosion Packaging Solutions | VCI | Sustainable Export Ready
            </p>
            <div className="mt-3 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-8">
              <a href="mailto:info@konnectpackaging.com" className="inline-flex items-center gap-2 text-sm hover:underline md:text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <FaEnvelope aria-hidden="true" />
                info@konnectpackaging.com
              </a>
              <a href="tel:+37069912345" className="inline-flex items-center gap-2 text-sm hover:underline md:text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <FaPhoneAlt aria-hidden="true" />
                +370 699 12345
              </a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
};

export default InterpackEvent;
