import React from 'react';
import '@fontsource/montserrat/400.css';
import '@fontsource/krona-one/400.css';

const VisionValues = () => {
  const values = [
    {
      number: "1",
      title: "Eco-First Philosophy",
      description: "We prioritize sustainability by replacing plastic and synthetic materials with biodegradable alternatives.",
      icon: "/vv/1.png"
    },
    {
      number: "2", 
      title: "Innovation-Driven",
      description: "We innovate continuously to deliver high-performance packaging solutions tailored for modern industrial needs.",
      icon: "/vv/2.png"
    },
    {
      number: "3",
      title: "ZED & ESG Aligned", 
      description: "Our operations align with India's 'Zero Effect, Zero Defect' mission and global ESG compliance frameworks.",
      icon: "/vv/3.png"
    },
    {
      number: "4",
      title: "Collaboration for Impact",
      description: "Partnering with industry leaders like Hindalco enables us to scale quickly and offer premium materials.",
      icon: "/vv/4.png"
    },
    {
      number: "5",
      title: "Customer-Centric Design",
      description: "We offer customizable packaging solutions that cater to the exact needs of our B2B clients.",
      icon: "/vv/5.png"
    },
    {
      number: "6",
      title: "Operational Excellence",
      description: "We believe in lean manufacturing, process optimization, and data-backed decision-making for sustainable growth.",
      icon: "/vv/6.png"
    },
    {
      number: "7",
      title: "Trust & Transparency",
      description: "Legal compliance, IP protection, and business ethics are at the heart of our corporate governance.",
      icon: "/vv/7.png"
    },
    {
      number: "8",
      title: "Scalability with Responsibility",
      description: "We grow with purpose—balancing business expansion with social and environmental accountability.",
      icon: "/vv/8.png"
    },
    {
      number: "9",
      title: "Industry Leadership Vision",
      description: "We believe in lean manufacturing, process automation, and data-backed decision-making for sustainable growth.",
      icon: "/vv/9.png"
    }
  ];

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
      : 'https://www.konnectpackaging.com/vision-values';

    document.title = 'Vision & Values | Konnect Packaging';

    const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', canonicalUrl);
    if (!canonical.parentElement) document.head.appendChild(canonical);

    setMeta({ name: 'description', content: 'Our vision and core values: eco-first, innovation-driven, ESG-aligned, customer-centric, and operational excellence for scalable, sustainable growth.' });
    setMeta({ name: 'robots', content: 'index,follow' });
    setMeta({ property: 'og:title', content: 'Vision & Values | Konnect Packaging' });
    setMeta({ property: 'og:description', content: 'Innovative, sustainable, and scalable packaging principles that guide our work.' });
    setMeta({ property: 'og:type', content: 'website' });
    setMeta({ property: 'og:url', content: canonicalUrl });
    setMeta({ property: 'og:image', content: '/vv/2.png' });
    setMeta({ name: 'twitter:card', content: 'summary_large_image' });
    setMeta({ name: 'twitter:title', content: 'Vision & Values' });
    setMeta({ name: 'twitter:description', content: 'Our guiding principles: sustainability, innovation, trust, and excellence.' });
    setMeta({ name: 'twitter:image', content: '/vv/2.png' });

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Vision & Values',
      url: canonicalUrl,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: (values || []).map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Thing',
            name: v.title,
            description: v.description,
            image: v.icon
          }
        }))
      }
    };
    let script = document.getElementById('ld-vision-values');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-vision-values';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(ld);
  }, []);

  return (
    <div className="bg-white py-12 px-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] rounded-3xl p-8 mb-12 transition-all duration-500 ease-in-out hover:scale-105">
          <h1
            className="text-2xl md:text-5xl text-black mb-2"
            style={{ fontFamily: 'Krona One, sans-serif' }}
          >
            Vision & Values
          </h1>
          <p className="text-sm font-medium md:text-2xl text-black">
            Innovative, sustainable, scalable<br/>
            packaging solutions.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-6 lg:gap-12">
          {values.map((value, index) => (
            <div
              key={index}
              className={`relative p-[2px] md:p-[3px] bg-gradient-to-tr from-black via-white to-white h-38 md:h-55 w-full transition-all duration-500 ease-in-out hover:scale-105 ${index === 8 ? 'col-span-2 max-w-[50%] mx-auto md:col-span-1 md:max-w-full md:mx-0' : ''}`}
            >
              {/* Inner card with white background */}
              <div className="relative bg-white  p-3 md:p-6 h-full w-full flex flex-col">
                {/* Large Number Background */}
                <div className="absolute -top-8 md:-top-12 lg:-top-14 right-1 font-bold md:right-2 text-[80px] md:text-[120px] lg:text-[160px] leading-none z-0 select-none opacity-60 bg-gradient-to-b from-black to-white bg-clip-text text-transparent">
                  {value.number}
                </div>
                
                {/* Image Icon Circle - Positioned on top left border */}
                <div className="absolute -top-4 md:-top-6 -left-5 md:-left-8 w-10 h-10 md:w-16 md:h-16 bg-white border-2 border-black/60 rounded-full flex items-center justify-center text-gray-600 z-20 overflow-hidden">
                  <img
                    src={value.icon}
                    alt={value.title}
                    className="w-8 h-8 md:w-14 md:h-14 object-contain"
                  />
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-2 md:pt-4 flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-sm font-bold md:text-lg lg:text-xl text-black mb-2 md:mb-3 leading-tight">
                    {value.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-800 font-medium text-[12px] md:text-[17px] leading-none md:leading-relaxed flex-1">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisionValues;