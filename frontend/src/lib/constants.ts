import { SiteMetadata, NavLink } from "@/types";

export const SITE_CONFIG: SiteMetadata = {
  name: "Tralance",
  title: "Tralance (The Best Freelance Income & Expense Tracker)",
  description: "Take full control of your variable project income and daily spending with total privacy. No servers, no data leaks—just pure money management right in your pocket.",
  url: "https://www.tralance.pro", // Placeholder, change to production domain
  ogImage: "https://www.tralance.pro/og-image.jpg", // Placeholder
  links: {
    twitter: "https://www.instagram.com/",
    github: "https://github.com/allknowledge34",
  },
  contactEmail: "allknowledge34@gmail.com",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SEO_KEYWORDS = [
  // Primary
  "freelance income tracker",
  "freelance expense tracker",
  "freelancer finance app",
  "income and expense tracker",
  "freelancer budget app",
  "freelance accounting app",
  "expense manager app",
  "income manager app",
  // Secondary
  "offline expense tracker",
  "offline income tracker",
  "privacy focused finance app",
  "local database finance app",
  "SQLite finance tracker",
  "project income tracker",
  "client payment tracker",
  "freelancer project manager",
  // Long-tail
  "best freelance income and expense tracker",
  "offline income and expense tracker app",
  "freelancer income management app",
  "client payment tracking app",
  "expense tracker for freelancers",
  "privacy focused expense manager",
  "local storage finance tracker",
];
