import * as React from "react";
import '@fontsource/montserrat/400.css';
import '@fontsource/krona-one/400.css';

const Global = () => {
  const footprintItems = [
    {
      title: "Strong Base in India",
      description: "Headquartered in Nagpur, we serve key industrial hubs across India with innovative, eco-friendly packaging tailored for high-volume sectors.",
      icon: "/footprint/1.png"
    },
    {
      title: "Expanding Presence in Europe",
      description: "Actively entering European markets with sustainable solutions that align with strict ESG, circular economy, and packaging compliance mandates.",
      icon: "/footprint/2.png"
    },
    {
      title: "Cross-Border Standards Compliance",
      description: "Our products are engineered to meet both Indian and European quality, environmental, and safety standards for seamless global acceptance.",
      icon: "/footprint/3.png"
    },
    {
      title: "Serving Export-Focused Clients",
      description: "Empowering Indian exporters—especially in automotive, steel, and agro industries—with packaging that meets global durability and compliance needs.",
      icon: "/footprint/4.png"
    },
    {
      title: "Partnering with European Distributors",
      description: "Forming strategic alliances with European distributors and procurement networks to expand reach and localize supply for faster delivery.",
      icon: "/footprint/5.png"
    },
    {
      title: "Sustainable Impact Across Borders",
      description: "Driving global sustainability by offering packaging that reduces carbon footprint and aligns with both India's and Europe's green goals.",
      icon: "/footprint/6.png"
    }
  ];

  const FootprintCard = ({ title, description, icon }) => (
    <div
      className="box-border relative rounded-2xl mx-auto overflow-hidden shadow-none border-2 border-black
        w-full max-w-[360px] h-[400px] md:h-[360px] sm:h-[320px] flex flex-col
        bg-white/30 backdrop-blur-md
        transition-all duration-500 ease-in-out hover:scale-105"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Icon section */}
      <div className="relative p-4 md:p-3 sm:p-2.5 bg-transparent flex justify-start items-center">
        <img 
          src={icon} 
          alt={title}
          className="w-16 h-16 md:w-12 md:h-12 sm:w-9 sm:h-9"
        />
      </div>
      {/* Title section */}
      <div className="relative px-4 py-2 md:px-3 md:py-1.5 sm:px-2.5 sm:py-1 bg-transparent text-left">
        <h3 className="text-xl md:text-lg sm:text-sm font-bold text-black leading-tight">
          {title}
        </h3>
      </div>
      {/* Description section */}
      <div className="relative px-4 py-4 md:px-3 md:py-3 sm:px-2.5 sm:py-2 bg-transparent flex-1 flex items-start justify-start">
        <p className="text-gray-900 text-lg md:text-lg text-[0.8rem] text-left leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );

  React.useEffect(() => {
    if (typeof document === 'undefined') return;

    const upsertTag = (selector, createFn) => {
      const existing = document.head.querySelector(selector);
      if (existing) return existing;
      const el = createFn();
      document.head.appendChild(el);
      return el;
    };
    const setMeta = ({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      const el = upsertTag(selector, () => {
        const m = document.createElement('meta');
        if (name) m.setAttribute('name', name);
        if (property) m.setAttribute('property', property);
        return m;
      });
      el.setAttribute('content', content);
    };

    const canonicalUrl = (typeof window !== 'undefined' && window.location?.href)
      ? window.location.href.split('#')[0]
      : 'https://www.konnectpackaging.com/global-footprint';

    document.title = 'Global Footprint | Konnect Packaging';

    const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', canonicalUrl);
    if (!canonical.parentElement) document.head.appendChild(canonical);

    setMeta({ name: 'description', content: 'Based in India and expanding into Europe, Konnect Packaging delivers export‑ready, sustainable packaging aligned with global ESG standards.' });
    setMeta({ name: 'robots', content: 'index,follow' });
    setMeta({ property: 'og:title', content: 'Global Footprint | Konnect Packaging' });
    setMeta({ property: 'og:description', content: 'Our presence across India and Europe with sustainable, compliant packaging solutions.' });
    setMeta({ property: 'og:type', content: 'website' });
    setMeta({ property: 'og:url', content: canonicalUrl });
    setMeta({ property: 'og:image', content: '/worldmap.png' });
    setMeta({ name: 'twitter:card', content: 'summary_large_image' });
    setMeta({ name: 'twitter:title', content: 'Global Footprint' });
    setMeta({ name: 'twitter:description', content: 'Sustainable, export‑ready packaging for global markets.' });
    setMeta({ name: 'twitter:image', content: '/worldmap.png' });

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Our Global Footprint',
      url: canonicalUrl,
      description: 'Presence across India and Europe delivering sustainable, export‑ready packaging.',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: footprintItems.map((f, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Thing',
            name: f.title,
            description: f.description,
            image: f.icon
          }
        }))
      }
    };
    let script = document.getElementById('ld-global-footprint');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-global-footprint';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(ld);
  }, []);

  return (
    <div 
      className="box-border px-7 pt-32 pb-16 md:px-6 md:pt-24 md:pb-12 sm:px-4 sm:pt-20 sm:pb-10 mx-auto my-0 w-full bg-white max-w-[90%] relative" 
      style={{
        fontFamily: 'Montserrat, sans-serif',
        backgroundImage: 'url(/worldmap.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay to control opacity */}
      <div className="absolute inset-0 bg-white opacity-90 pointer-events-none"></div>
      
      {/* Content with relative positioning to appear above background */}
      <div className="relative z-10">
        <div className="box-border bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] px-6 pt-12 pb-6 mb-12 md:px-5 md:pt-10 md:pb-5 md:mb-10 sm:px-3 sm:pt-6 sm:pb-3 sm:mb-6 w-full rounded-3xl md:rounded-2xl sm:rounded-xl transition-all duration-500 ease-in-out hover:scale-105">
          <div
            className="mb-6 text-5xl md:text-4xl sm:text-2xl text-black font-bold md:mb-5 sm:mb-3"
            style={{ fontFamily: 'Krona One, sans-serif' }}
          >
            Our Global Footprint
          </div>
          <div className="text-base md:text-sm sm:text-[0.7rem] text-black max-w-4xl leading-relaxed">
            Based in India and expanding into Europe, we deliver sustainable, export ready packaging aligned with global ESG standards.
          </div>
        </div>
        <div className="grid gap-3 md:gap-5 lg:gap-6 w-full grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {footprintItems.map((item, index) => (
            <FootprintCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Global;

