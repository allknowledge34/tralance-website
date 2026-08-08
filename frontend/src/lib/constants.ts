import { SiteMetadata, NavLink } from "@/types";

export const SITE_CONFIG: SiteMetadata = {
  name: "Tralance",
  title: "Tralance | Private Freelance Workspace & Tools",
  description: "Practical tools for freelancers to manage projects, money, clients, and the work behind them — with privacy at the core. Available for web, mobile, and desktop.",
  url: "https://www.tralance.pro", // Placeholder, change to production domain
  ogImage: "https://www.tralance.pro/og-image.jpg", // Placeholder
  links: {
    twitter: "https://www.instagram.com/dmilx.tech/",
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
  "freelance workspace",
  "freelance tools",
  "freelance productivity",
  "freelance invoice generator",
  "project profit calculator",
  "freelance project management",
  "freelance contract generator",
  "project brief builder",
  // Secondary
  "offline freelance app",
  "privacy focused freelance tools",
  "freelance business tools",
  "freelance finance tracker",
  "client management for freelancers",
  "freelancer ecosystem",
  // Long-tail
  "best tools for freelancers",
  "private workspace for freelance work",
  "offline first tools for freelancers",
  "freelance project and money management",
  "tools to calculate freelance rates",
];
