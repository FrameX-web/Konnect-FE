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
      : 'https://www.konnectpackaging.com/vision-mission';

    document.title = 'Vision & Mission | Konnect Packaging';

    const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', canonicalUrl);
    if (!canonical.parentElement) document.head.appendChild(canonical);

    setMeta({ name: 'description', content: 'Our vision: lead innovative, sustainable packaging. Our mission: deliver high-quality, customized, eco-friendly solutions with reliable support.' });
    setMeta({ name: 'robots', content: 'index,follow' });
    setMeta({ property: 'og:title', content: 'Vision & Mission | Konnect Packaging' });
    setMeta({ property: 'og:description', content: 'Where we are heading and how we deliver value every day with sustainable, innovative packaging.' });
    setMeta({ property: 'og:type', content: 'website' });
    setMeta({ property: 'og:url', content: canonicalUrl });
    setMeta({ property: 'og:image', content: '/vv/1.png' });
    setMeta({ name: 'twitter:card', content: 'summary_large_image' });
    setMeta({ name: 'twitter:title', content: 'Vision & Mission' });
    setMeta({ name: 'twitter:description', content: 'Our path and purpose in sustainable, high-performance packaging.' });
    setMeta({ name: 'twitter:image', content: '/vv/1.png' });

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Vision & Mission',
      url: canonicalUrl,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Thing',
              name: 'Vision',
              description: (Array.isArray(visionPoints) ? visionPoints.join(' ') : '')
            }
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Thing',
              name: 'Mission',
              description: (Array.isArray(missionPoints) ? missionPoints.join(' ') : '')
            }
          }
        ]
      }
    };
    let script = document.getElementById('ld-vision-mission');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-vision-mission';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(ld);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white py-12 px-4 md:px-6 lg:px-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-tr from-[#E9C77F] to-[#FBE6B7] rounded-3xl p-6 md:p-8 mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-black mb-2 font-['Krona_One',sans-serif]">
            Vision & Mission
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-black/90">
            Our path and purpose in sustainable, high‑performance packaging.
          </p>
        </div>

        {/* Vision + Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {/* Vision */}
          <section
            aria-labelledby="vision-title"
            className="rounded-3xl border border-black/10 bg-white shadow-sm p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <EyeIcon />
              <h2 id="vision-title" className="text-xl md:text-2xl lg:text-3xl font-semibold text-black font-['Krona_One',sans-serif]">
                Our Vision
              </h2>
            </div>
            <ul className="space-y-3 md:space-y-4">
              {visionPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckmarkIcon />
                  <span className="text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Mission */}
          <section
            aria-labelledby="mission-title"
            className="rounded-3xl border border-black/10 bg-white shadow-sm p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <MissionIcon />
              <h2 id="mission-title" className="text-xl md:text-2xl lg:text-3xl font-semibold text-black font-['Krona_One',sans-serif]">
                Our Mission
              </h2>
            </div>
            <ul className="space-y-3 md:space-y-4">
              {missionPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckmarkIcon />
                  <span className="text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default VisionAndMission;
