import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG, SEO_KEYWORDS } from "@/lib/constants";
import { ThemeProvider } from "@/components/layout/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1128" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  manifest: "/manifest.json",
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Sachin Kumar", url: SITE_CONFIG.links.twitter }],
  creator: "Sachin Kumar",
  publisher: "Tralance",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Tralance Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: "@tralanceapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: SITE_CONFIG.name,
        operatingSystem: "Android",
        applicationCategory: "FinanceApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: SITE_CONFIG.description,
        url: SITE_CONFIG.url,
        author: {
          "@type": "Person",
          name: "Sachin Kumar",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.5",
          ratingCount: "2"
        },
        installUrl: "https://play.google.com/store/apps/details?id=com.sachin.tralance",
        softwareVersion: "1.0",
      },
      {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/icon.png`,
        contactPoint: {
          "@type": "ContactPoint",
          email: SITE_CONFIG.contactEmail,
          contactType: "customer support",
        },
        sameAs: [
          SITE_CONFIG.links.twitter,
          SITE_CONFIG.links.github,
        ],
      },
      {
        "@type": "WebSite",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_CONFIG.url}/?s={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-rich-black text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>

        <GoogleAnalytics gaId="G-QZ3VZDMVPR" />
      </body>
    </html>
  );
}
