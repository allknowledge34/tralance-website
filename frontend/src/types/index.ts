export interface NavLink {
  label: string;
  href: string;
}

export interface SiteMetadata {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
  contactEmail: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}
