import { PageId, BookItem } from '../types';

export interface PageSEOData {
  title: string;
  description: string;
  canonicalPath: string;
  ogType: 'website' | 'profile' | 'book';
  keywords?: string[];
  structuredData?: Record<string, any>;
}

const BASE_URL = 'https://iyenomaosazee.com';

export const PAGE_SEO_MAP: Record<string, PageSEOData> = {
  home: {
    title: 'Engr. Iyenoma ThankGod Osazee | Executive HSE Leader & Civil Engineer',
    description: 'Official executive portfolio of Engr. Iyenoma ThankGod Osazee (CMIOSH, MNSE, Fellow ISPON) — HSE Manager at Julius Berger Nigeria PLC, Civil Engineer, and Author.',
    canonicalPath: '/',
    ogType: 'profile',
    keywords: ['Engr. Iyenoma Osazee', 'HSE Manager', 'Julius Berger', 'CMIOSH', 'Civil Engineering', 'Occupational Health and Safety', 'Safety Governance', 'ISO 45001'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Engr. Iyenoma ThankGod Osazee',
        jobTitle: 'HSE Manager & Civil Engineering Safety Director',
        worksFor: {
          '@type': 'Organization',
          name: 'Julius Berger Nigeria PLC'
        },
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Chartered Safety and Health Professional (CMIOSH)',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Institution of Occupational Safety and Health (IOSH UK)'
            }
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'ISO 45001:2018 Lead Auditor',
            recognizedBy: {
              '@type': 'Organization',
              name: 'CQI / IRCA'
            }
          }
        ]
      }
    }
  },
  about: {
    title: 'About Engr. Iyenoma ThankGod Osazee | 25+ Year HSE Trajectory & Credentials',
    description: 'Executive profile, 25+ year career progression, CMIOSH UK chartered fellowship, and academic distinctions of Engr. Iyenoma ThankGod Osazee.',
    canonicalPath: '/#about',
    ogType: 'profile',
    keywords: ['About Engr. Osazee', 'Career Trajectory', 'Julius Berger Safety Leader', 'Chartered CMIOSH', 'Fellow ISPON', 'Heriot-Watt University', 'University of Portsmouth'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      mainEntity: {
        '@type': 'Person',
        name: 'Engr. Iyenoma ThankGod Osazee',
        description: 'Chartered Safety Professional (CMIOSH #100175) and corporate HSE Manager with over two decades leading frontline mega-infrastructure safety in Nigeria.'
      }
    }
  },
  works: {
    title: 'Landmark Civil Infrastructure & Megaprojects | Engr. Iyenoma ThankGod Osazee',
    description: 'Engineering achievements and verified safety performance on the Second River Niger Bridge, cross-river marine foundations, and federal highway schemes.',
    canonicalPath: '/#works',
    ogType: 'website',
    keywords: ['Second River Niger Bridge', 'Civil Infrastructure Safety', 'Megaprojects Nigeria', 'Julius Berger Projects', 'Zero Harm Construction', 'Marine Piling Safety'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Featured Civil Infrastructure Projects',
      description: 'Major infrastructure projects and zero-fatality engineering operations executed by Engr. Iyenoma ThankGod Osazee.'
    }
  },
  books: {
    title: 'Authored Books & Technical Safety Monographs | Engr. Iyenoma ThankGod Osazee',
    description: 'Published books, peer-reviewed monographs, and practical safety manuals authored by Engr. Iyenoma ThankGod Osazee covering thermal hazards, ISO standards, and HSE command.',
    canonicalPath: '/#books',
    ogType: 'book',
    keywords: ['Safety Books', 'HSE Monograph', 'Thermal Hazards Construction', 'ISO 45001 Handbook', 'Construction Safety Publications', 'Engr. Osazee Books'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Authored Books & Publications',
      description: 'Author repository and scientific safety publications by Engr. Iyenoma ThankGod Osazee.'
    }
  },
  services: {
    title: 'Executive HSE Advisory & Engineering Consultation | Engr. Iyenoma ThankGod Osazee',
    description: 'Retain Engr. Iyenoma ThankGod Osazee for corporate safety governance, high-consequence risk audits, statutory advisory, and independent project oversight.',
    canonicalPath: '/#services',
    ogType: 'website',
    keywords: ['HSE Consultancy', 'Safety Auditing Nigeria', 'ISO 45001 Gap Analysis', 'Executive Safety Retainer', 'Megaproject Safety Advisory'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Executive HSE Advisory & Safety Consultancy',
      provider: {
        '@type': 'Person',
        name: 'Engr. Iyenoma ThankGod Osazee'
      }
    }
  },
  leadership: {
    title: 'Thought Leadership & Executive Keynotes | Engr. Iyenoma ThankGod Osazee',
    description: 'Keynote topics, parliamentary statutory advisory, board governance workshops, and institutional safety symposiums by Engr. Iyenoma ThankGod Osazee.',
    canonicalPath: '/#leadership',
    ogType: 'website',
    keywords: ['Keynote Speaker Safety', 'HSE Thought Leadership', 'Safety Governance Boardroom', 'Construction Symposium Keynote'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Thought Leadership & Keynote Themes',
      description: 'Signature keynote themes and institutional advisory by Engr. Iyenoma ThankGod Osazee.'
    }
  },
  contact: {
    title: 'Contact & Executive Consultation Booking | Engr. Iyenoma ThankGod Osazee',
    description: 'Direct communication coordinates and formal written query portal to retain Engr. Iyenoma ThankGod Osazee for executive advisory or keynote engagements.',
    canonicalPath: '/#contact',
    ogType: 'website',
    keywords: ['Contact Engr. Osazee', 'Book HSE Consultation', 'Safety Consultant Contact', 'Speaking Inquiry'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Executive Contact & Booking Portal'
    }
  },
  admin: {
    title: 'Executive Portal & Dashboard | Engr. Iyenoma ThankGod Osazee',
    description: 'Secure management portal for live portfolio inquiries, credential verifications, and real-time site telemetry.',
    canonicalPath: '/#admin',
    ogType: 'website'
  }
};

/**
 * Dynamically updates all document head meta tags and structured data
 * for search engines and social media scrapers (LinkedIn, Twitter, WhatsApp, Slack).
 */
export function applyDynamicSEO(page: PageId | 'admin', selectedBook?: BookItem | null) {
  if (typeof document === 'undefined') return;

  const normalizedKey = page === 'overview' ? 'home' : page === 'publications' ? 'books' : page === 'advisory' ? 'services' : page;
  let seo = PAGE_SEO_MAP[normalizedKey] || PAGE_SEO_MAP.home;

  // If a book is specifically selected for detail modal inspection, customize title and description
  if (selectedBook) {
    seo = {
      title: `${selectedBook.title} | Book by Engr. Iyenoma ThankGod Osazee`,
      description: selectedBook.abstract.slice(0, 155) + '...',
      canonicalPath: `/#books?id=${selectedBook.id}`,
      ogType: 'book',
      keywords: selectedBook.keyTopics,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: selectedBook.title,
        headline: selectedBook.subtitle,
        author: {
          '@type': 'Person',
          name: 'Engr. Iyenoma ThankGod Osazee'
        },
        publisher: {
          '@type': 'Organization',
          name: selectedBook.publisherOrJournal
        },
        datePublished: selectedBook.publishedYear,
        description: selectedBook.abstract
      }
    };
  }

  // 1. Update <title>
  document.title = seo.title;

  // Helper to update or create <meta>
  const setMetaTag = (attribute: 'name' | 'property', name: string, content: string) => {
    let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attribute, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Helper to update or create <link rel="...">
  const setLinkTag = (rel: string, href: string) => {
    let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  // Determine current absolute canonical URL
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : BASE_URL;
  const canonicalUrl = `${currentOrigin}${seo.canonicalPath}`;

  // 2. Standard Meta Tags
  setMetaTag('name', 'description', seo.description);
  if (seo.keywords && seo.keywords.length > 0) {
    setMetaTag('name', 'keywords', seo.keywords.join(', '));
  }

  // 3. OpenGraph Social Cards
  setMetaTag('property', 'og:title', seo.title);
  setMetaTag('property', 'og:description', seo.description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:type', seo.ogType);
  setMetaTag('property', 'og:site_name', 'Engr. Iyenoma ThankGod Osazee');

  // 4. Twitter / X Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', seo.title);
  setMetaTag('name', 'twitter:description', seo.description);

  // 5. Canonical Link
  setLinkTag('canonical', canonicalUrl);

  // 6. Dynamic Context-Aware JSON-LD Structured Data
  if (seo.structuredData) {
    const SCRIPT_ID = 'dynamic-seo-ldjson';
    let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = SCRIPT_ID;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(seo.structuredData, null, 2);
  }
}
