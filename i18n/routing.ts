import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["bs", "en"],

  // Used when no locale matches
  defaultLocale: "bs",
  localePrefix: "always",

  pathnames: {
    // Static pages
    "/": "/",
    "/about": { en: "/about", bs: "/o-nama", de: "/uber-uns" }, // Updated "ueber-uns" to "uber-uns"
    "/contact": { en: "/contact", bs: "/kontakt", de: "/kontakt" },
    "/gallery": {en:"/gallery",bs:"/galerija"},
    // "/pricing": { en: "/pricing", bs: "/cijene", de: "/preise" },
    "/terms": { en: "/terms", bs: "/uslovi", de: "/nutzungsbedingungen" },
    "/privacy": {
      en: "/privacy",
      bs: "/politika-privatnosti",
      de: "/datenschutz",
    },
    // "/faq": { en: "/faq", bs: "/faq", de: "/faq" },

    // Job-related pages
    // "/jobs": { en: "/jobs", bs: "/poslovi", de: "/stellenangebote" },
    // "/candidates": { en: "/candidates", bs: "/kandidati", de: "/kandidaten" },
    // "/employers": { en: "/employers", bs: "/poslodavci", de: "/arbeitgeber" },
    // "/bookmarks": { en: "/bookmarks", bs: "/zabiljeske", de: "/lesezeichen" },
    // "/dashboard": { en: "/dashboard", bs: "/kontrolna-ploca", de: "/dashboard" },
    // "/submit-job": { en: "/submit-job", bs: "/objavi-posao", de: "/job-einreichen" },

    // // Dynamic job posting pages
    // "/jobs/[slug]": { en: "/jobs/[slug]", bs: "/poslovi/[slug]", de: "/stellenangebote/[slug]" },

    // // Dynamic employer pages
    // "/employers/[id]": { en: "/employers/[id]", bs: "/poslodavci/[id]", de: "/arbeitgeber/[id]" },

    // // Dynamic candidate profile pages
    // "/candidates/[id]": { en: "/candidates/[id]", bs: "/kandidati/[id]", de: "/kandidaten/[id]" }
  },
    
  },
);

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
