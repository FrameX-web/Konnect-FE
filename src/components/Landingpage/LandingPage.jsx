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
import WelcomePopup from '../WelcomePopup'
import React, { useEffect } from 'react';

const LandingPage = () => {
  // SEO: inject/update head tags and JSON-LD
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const upsertTag = (selector, createFn) => {
      const existing = document.head.querySelector(selector);
      if (existing) return existing;
      const el = createFn();
      document.head.appendChild(el);
      return el;
    };

    const setMeta = (attr, value) => {
      const selector = `meta[${attr.name ? `name="${attr.name}"` : `property="${attr.property}"`}]`;
      const el = upsertTag(selector, () => {
        const m = document.createElement('meta');
        if (attr.name) m.setAttribute('name', attr.name);
        if (attr.property) m.setAttribute('property', attr.property);
        return m;
      });
      el.setAttribute(attr.content ? 'content' : 'value', value || attr.content);
      if (attr.content) el.setAttribute('content', attr.content);
      return el;
    };

    const canonicalUrl = (typeof window !== 'undefined' && window.location?.href)
      ? window.location.href.split('#')[0]
      : 'https://www.konnectpackaging.com/';

    document.title = 'Konnect Packaging';

    // Canonical
    const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', canonicalUrl);
    if (!canonical.parentElement) document.head.appendChild(canonical);

    // Meta basics
    setMeta({ name: 'description', content: 'Konnect Packaging delivers VCI packaging, corrosion protection, and sustainable packaging solutions. Explore engineered barrier films, moisture control, and eco-friendly materials for global supply chains.' });
    setMeta({ name: 'robots', content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' });
    setMeta({ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' });

    // Open Graph
    setMeta({ property: 'og:title', content: 'VCI Packaging & Corrosion Protection | Konnect Packaging' });
    setMeta({ property: 'og:description', content: 'Engineered VCI packaging and corrosion protection with sustainable packaging options for global brands.' });
    setMeta({ property: 'og:type', content: 'website' });
    setMeta({ property: 'og:url', content: canonicalUrl });
    setMeta({ property: 'og:image', content: '/hero/bg/1.png' });

    // Twitter
    setMeta({ name: 'twitter:card', content: 'summary_large_image' });
    setMeta({ name: 'twitter:title', content: 'VCI Packaging & Corrosion Protection | Konnect Packaging' });
    setMeta({ name: 'twitter:description', content: 'Sustainable VCI packaging and corrosion protection solutions for modern logistics and manufacturing.' });
    setMeta({ name: 'twitter:image', content: '/hero/bg/1.png' });

    // Preload likely LCP image
    const preload = document.createElement('link');
    preload.setAttribute('rel', 'preload');
    preload.setAttribute('as', 'image');
    preload.setAttribute('href', '/hero/bg/1.png');
    document.head.appendChild(preload);

    // JSON-LD: Organization
    const orgLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Konnect Packaging',
      url: canonicalUrl,
      logo: '/logo.png',
      sameAs: [
        'https://www.facebook.com/',
        'https://www.instagram.com/',
        'https://www.linkedin.com/',
        'https://twitter.com/'
      ],
      contactPoint: [{
        '@type': 'ContactPoint',
        contactType: 'customer support',
        availableLanguage: ['en'],
      }]
    };

    // JSON-LD: Product (VCI Packaging Bags)
    const productLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'VCI Packaging Bags',
      image: ['/hero/bg/1.png', '/hero/bg/2.png'],
      description: 'VCI packaging bags engineered for corrosion protection with sustainable packaging materials.',
      brand: { '@type': 'Brand', name: 'Konnect Packaging' },
      category: 'VCI Packaging',
    };

    const upsertJsonLd = (id, data) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(data);
    };

    upsertJsonLd('ld-org', orgLd);
    upsertJsonLd('ld-product', productLd);

    return () => {
      // Optional: keep JSON-LD/meta persistent across SPA routes
    };
  }, []);

  // Smooth scroll handler for products section (used by Hero)
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <WelcomePopup />
      {/* Semantic header with hero */}
      <header role="banner" aria-label="Konnect Packaging hero section">
        <div className="w-[95%] mx-auto mt-8 rounded-[3rem] overflow-hidden">
          <Hero scrollToProducts={scrollToProducts} />
        </div>
      </header>

      {/* Main content with semantic sections and accessible headings */}
      <main id="main-content" role="main" aria-label="Main content">
        <div className="w-[95%] mx-auto rounded-[3rem] overflow-hidden">
          <section id="products" aria-labelledby="h2-products">
            <h2 id="h2-products" className="sr-only">VCI Packaging Products for Corrosion Protection</h2>
            <Products />
          </section>

          <section id="solutions" aria-labelledby="h2-solutions">
            <h2 id="h2-solutions" className="sr-only">Sustainable Packaging Solutions and Engineered Films</h2>
            <Products2 />
          </section>

          <section id="progress" aria-labelledby="h2-progress">
            <h2 id="h2-progress" className="sr-only">Operational Excellence and Quality Progress</h2>
            <Progress />
          </section>

          {/* Worldwide section with its own background */}
          <section id="worldwide" aria-labelledby="h2-worldwide">
            <h2 id="h2-worldwide" className="sr-only">Global Reach and Worldwide Shipping</h2>
            <div
              className="ww-bg"
              style={{
                position: "relative",
                width: "100%",
                backgroundImage: "url('/mapbg.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "70% auto",
                backgroundPosition: "center",
                backgroundAttachment: "scroll",
                zIndex: 0,
              }}
            >
              {/* Responsive background for mobile */}
              <style>
                {`
                  @media (max-width: 768px) {
                    .ww-bg {
                      background-image: url('/mapm.png') !important;
                      background-size: 95% auto !important;
                      background-attachment: scroll !important;
                    }
                  }
                `}
              </style>
              <div style={{ position: "relative", zIndex: 1 }}>
                <Worldwide />
              </div>
            </div>
          </section>

          {/* Start background image here */}
          <section id="services" aria-labelledby="h2-services">
            <h2 id="h2-services" className="sr-only">Services: VCI Packaging, Corrosion Prevention, Sustainability</h2>
            <div style={{ position: "relative", width: "100%" }}>
              {/* Background image layer */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  backgroundImage: "url('/back1.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "80% auto",
                  backgroundPosition: "center 0",
                  opacity: 0.7,
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              />
              {/* Foreground content */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <Serve />
                <Certifiation />
              </div>
            </div>
          </section>
          {/* End background image here */}

          {/* Start second background image here */}
          <section id="connect" aria-labelledby="h2-connect">
            <h2 id="h2-connect" className="sr-only">Connect with Konnect Packaging on Social Media</h2>
            <div style={{ position: "relative", width: "100%" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  backgroundImage: "url('/back2.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "80% auto",
                  backgroundPosition: "center 0",
                  opacity: 1,
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <Connect />
                <Ribbon />
                {/* Footer removed from here */}
              </div>
            </div>
          </section>
          {/* End second background image here */}
        </div>
      </main>

      {/* Footer now outside, full width */}
      <footer role="contentinfo">
        <div style={{ width: "100%" }}>
          <Footer />
        </div>
      </footer>
    </>
  )
}

export default LandingPage
