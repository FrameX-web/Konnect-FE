import React from 'react';

function LeadershipTeam() {
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
      : 'https://www.konnectpackaging.com/leadership';

    document.title = 'Leadership Message | Konnect Packaging';

    const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', canonicalUrl);
    if (!canonical.parentElement) document.head.appendChild(canonical);

    setMeta({ name: 'description', content: 'Konnect Packaging leadership message: commitment to innovation, VCI corrosion protection, sustainability, and global quality standards.' });
    setMeta({ name: 'robots', content: 'index,follow' });
    setMeta({ property: 'og:title', content: 'Leadership Message | Konnect Packaging' });
    setMeta({ property: 'og:description', content: 'Driving innovation with sustainable, high‑quality packaging and VCI protection.' });
    setMeta({ property: 'og:type', content: 'website' });
    setMeta({ property: 'og:url', content: canonicalUrl });
    setMeta({ property: 'og:image', content: '/logo.png' });
    setMeta({ name: 'twitter:card', content: 'summary_large_image' });
    setMeta({ name: 'twitter:title', content: 'Leadership Message' });
    setMeta({ name: 'twitter:description', content: 'Our commitment to protection, sustainability, and performance.' });
    setMeta({ name: 'twitter:image', content: '/logo.png' });

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Leadership Message',
      url: canonicalUrl,
      description: 'Leadership vision for innovation, sustainability, and VCI protection.'
    };
    let script = document.getElementById('ld-leadership');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-leadership';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(ld);
  }, []);

  return (
    <div className="w-full min-h-[90vh] pt-20 bg-white flex items-start justify-center p-2">
      <div className="relative flex flex-col items-start justify-start w-[95%] min-h-[95vh] p-[18px_22px_18px_18px] box-border bg-gradient-to-br from-[#F0D395] to-[#EAC882]" 
           style={{ borderBottomRightRadius: '300px' }}>
        
        {/* Content Container */}
       {/* Main Title */}
          <h1 className="font-normal xl:pl-8  xl:pt-6 pb-2 text-[1.3rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem]
                          text-[#111] mb-1 leading-[1.1]
                          font-['Krona_One',sans-serif]">
            Leadership Message
          </h1>
                     
          {/* Message Content */}
          <div className="font-normal  xl:pl-10 text-[0.95rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] xl:text-[2rem]
                         text-[#222] leading-[1.4] max-w-[340px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[90%] xl:max-w-[90%]
                         font-['Montserrat',sans-serif] space-y-4">
            <p>
              At Konnect Packaging International LLP, we are driving the evolution 
              of the packaging industry with innovative and sustainable solutions. 
              Our expertise in VCI Packaging ensures corrosion protection for metal 
              components, safeguarding them during storage and transport.
            </p>
            
            <p>
              We are committed to delivering high-quality, eco-friendly, and reliable 
              packaging that meets global standards. By protecting products and 
              reducing material waste, we contribute to a safer supply chain and a 
              sustainable future.
            </p>
            
            <p>
              Under my leadership, we will continue to expand globally and set new 
              benchmarks in packaging—offering solutions that protect, preserve, 
              and perform.
            </p>
            
            <p className="font-semibold  text-[#111] mt-12 pb-8">
              Konnect Packaging International LLP
            </p>
            {/* Logo for mobile view: placed just below the text */}
            <div className=" md:hidden w-full flex -ml-8 justify-left">
              <img
                src="/logo.png"
                alt="Konnect Packaging Logo"
                className="w-[100%] max-w-[80vw] opacity-60 mt-2"
                style={{ minWidth: '100px' }}
              />
            </div>
          </div>
        {/* Logo for desktop view: absolutely positioned at bottom right */}
        <img
          src="/logo.png"
          alt="Konnect Packaging Logo"
          className="hidden md:block absolute right-38 bottom-2 w-[460px] max-w-[60vw] opacity-30"
          style={{ minWidth: '160px' }}
        />
      </div>
    </div>
  );
}

export default LeadershipTeam;