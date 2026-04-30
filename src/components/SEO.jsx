import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.konnectpackaging.com';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const productNames = {
  1: 'VCI Kraft Paper',
  2: 'VCI PE Laminated Paper',
  3: 'VCI 3-Ply Paper',
  4: 'VCI LDPE Film',
  5: 'VCI Strength Fabric',
  6: 'VCI MET PET Laminated Paper',
  7: 'VCI 4-Ply Fabric',
  8: 'VCI Shrink Film',
  9: 'VCI Desiccant',
  10: 'VCI Masterbatch',
  11: 'VCI Power Stretch Film',
  12: 'Industrial Wax Paper',
  13: 'Alu Barrier Bags',
  14: 'SMP Bags',
  15: 'Bulk Tea Packaging Bags',
  16: 'PE-Coated Paper',
  17: 'Wax Coated Paper',
  18: 'Paper Aluminum Pouches',
  19: 'Standing Pouches',
  20: 'HDPE Laminated Paper Bags',
  21: 'Sugar Paper',
  22: 'Multiwall Paper Bags',
  24: 'VCI Eco Paper',
};

const pageMeta = {
  '/': {
    title: 'Konnect Packaging International | VCI & Food Packaging',
    description:
      'Manufacturer of VCI rust-prevention packaging, food-grade packaging and specialty industrial packaging. Based in Nagpur, India with European operations.',
  },
  '/contact': {
    title: 'Contact Konnect Packaging International | Packaging Enquiries',
    description:
      'Contact Konnect Packaging International for VCI packaging, food-grade packaging, quotes and support. Phone +91-7774031665 or email info@konnectpackaging.com.',
  },
  '/industries': {
    title: 'Industries We Serve | Konnect Packaging International',
    description:
      'Packaging solutions for automotive, engineering, export, food, agro and industrial supply chains requiring corrosion prevention and barrier protection.',
  },
  '/custom-solutions': {
    title: 'Custom Packaging Solutions | Konnect Packaging International',
    description:
      'Custom VCI, food-grade and industrial packaging solutions engineered for storage, transport, export and brand-specific requirements.',
  },
  '/why-choose-us': {
    title: 'Why Choose Konnect Packaging | Quality Packaging Manufacturer',
    description:
      'Learn why customers choose Konnect Packaging for reliable VCI, food and specialty industrial packaging backed by quality and export readiness.',
  },
  '/global-footprint': {
    title: 'Global Footprint | Konnect Packaging International',
    description:
      'Konnect Packaging combines manufacturing in India with European operations to support global packaging buyers and export supply chains.',
  },
  '/vision-mission': {
    title: 'Vision & Mission | Konnect Packaging International',
    description:
      'Konnect Packaging mission and vision for trusted, sustainable and engineered packaging for industrial and food supply chains.',
  },
  '/testimonials': {
    title: 'Testimonials | Konnect Packaging International',
    description:
      'Customer stories and testimonials for Konnect Packaging VCI, food and specialty industrial packaging solutions.',
  },
  '/eco-sustainability': {
    title: 'Eco-Friendly Sustainability | Konnect Packaging International',
    description:
      'Sustainable packaging options from Konnect Packaging including recyclable and eco-conscious VCI and industrial packaging materials.',
  },
  '/our-story': {
    title: 'Our Story | Konnect Packaging International',
    description:
      'The story of Konnect Packaging International LLP, a packaging manufacturer serving VCI, food-grade and industrial packaging markets.',
  },
  '/vision-values': {
    title: 'Vision & Values | Konnect Packaging International',
    description:
      'Konnect Packaging values, quality commitments and long-term vision for trusted industrial and food packaging solutions.',
  },
  '/awards-certifications': {
    title: 'Awards & Certifications | Konnect Packaging International',
    description:
      'Awards, certifications and compliance credentials for Konnect Packaging International industrial and food packaging products.',
  },
  '/blogs': {
    title: 'FAQ & Blogs | Konnect Packaging International',
    description:
      'Packaging FAQs and insights about VCI rust prevention, food-grade packaging, sustainable materials and industrial packaging.',
  },
  '/leadership': {
    title: 'Leadership Message | Konnect Packaging International',
    description:
      'Leadership message from Konnect Packaging International about quality, customer service and global packaging growth.',
  },
  '/analysis': {
    title: 'Packaging Analysis | Konnect Packaging International',
    description:
      'Packaging analysis and guidance for selecting VCI, food-grade, barrier and specialty industrial packaging solutions.',
  },
  '/future': {
    title: 'Future-Proof Protection | Konnect Packaging International',
    description:
      'Future-ready corrosion prevention and sustainable packaging solutions for global manufacturing, storage and logistics.',
  },
  '/gallery': {
    title: 'Gallery | Konnect Packaging International',
    description:
      'Gallery of Konnect Packaging products, events, packaging materials and industrial packaging applications.',
  },
  '/interpack-2026': {
    title: 'Interpack 2026 Stand 7aC10 | Konnect Packaging International',
    description:
      'Meet Konnect Packaging International at Interpack 2026 in Dusseldorf, Germany from 7 May to 13 May 2026 at Stand 7aC10.',
  },
};

const upsertMeta = ({ name, property, content }) => {
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    if (name) el.setAttribute('name', name);
    if (property) el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
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

const getMetaForPath = (pathname) => {
  const productMatch = pathname.match(/^\/product\/(\d+)/);
  if (productMatch) {
    const productName = productNames[productMatch[1]] || 'Packaging Product';
    return {
      title: `${productName} | Konnect Packaging International`,
      description: `${productName} from Konnect Packaging International for corrosion prevention, food-grade packaging or specialty industrial packaging applications.`,
    };
  }

  return pageMeta[pathname] || pageMeta['/'];
};

const SeoManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const pathname = location.pathname;
    const meta = getMetaForPath(pathname);
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

    document.title = meta.title;

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    upsertMeta({ name: 'description', content: meta.description });
    upsertMeta({ name: 'robots', content: 'index, follow' });
    upsertMeta({ property: 'og:title', content: meta.title });
    upsertMeta({ property: 'og:description', content: meta.description });
    upsertMeta({ property: 'og:image', content: OG_IMAGE });
    upsertMeta({ property: 'og:url', content: canonicalUrl });
    upsertMeta({ property: 'og:type', content: 'website' });
    upsertMeta({ name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta({ name: 'twitter:title', content: meta.title });
    upsertMeta({ name: 'twitter:description', content: meta.description });
    upsertMeta({ name: 'twitter:image', content: OG_IMAGE });

    upsertJsonLd('ld-org', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Konnect Packaging International LLP',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description: 'Manufacturer of VCI rust-prevention, food and specialty industrial packaging.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nagpur',
        addressCountry: 'IN',
      },
      sameAs: ['https://www.linkedin.com/company/konnect-packaging-international-llp'],
    });

    const productMatch = pathname.match(/^\/product\/(\d+)/);
    if (productMatch) {
      const productName = productNames[productMatch[1]] || 'Packaging Product';
      upsertJsonLd('ld-product', {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productName,
        brand: {
          '@type': 'Brand',
          name: 'Konnect Packaging International',
        },
        category: productMatch[1] >= 14 && productMatch[1] <= 22 ? 'Food & Agro Packaging' : 'VCI Packaging Solutions',
        description: meta.description,
        url: canonicalUrl,
      });
    } else {
      const productLd = document.getElementById('ld-product');
      if (productLd) productLd.remove();
    }
  }, [location.pathname]);

  return null;
};

export default SeoManager;
