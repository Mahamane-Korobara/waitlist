import type { Metadata } from "next";
import { Caveat, Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const isProduction = process.env.NODE_ENV === "production";
const gtmId = "GTM-543F83JQ";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Liste d'attente 2026",
    template: "%s | Liste d'attente 2026",
  },
  description: "Projet Next.js unique avec frontend waitlist, API Supabase et emails Resend.",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "GTg5-2S2kgxIiMLXQbGWkzmxNAGWU-NxA4copGCfB1k",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${fraunces.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {isProduction ? (
          <>
            <Script id="gtm-base" strategy="beforeInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
