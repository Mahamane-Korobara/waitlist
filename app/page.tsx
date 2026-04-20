import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";

import { AnalyticsTracker } from "@/components/analytics-tracker";
import { CtaLink } from "@/components/cta-link";
import { WaitlistForm } from "@/components/waitlist-form";
import { siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Liste d'attente 2026 | Les vrais moments se vivent ensemble",
  description:
    "Rejoins la liste d'attente d'une plateforme independante pour decouvrir et vivre les evenements qui comptent, sans pub et sans commission.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Liste d'attente 2026 | Les vrais moments se vivent ensemble",
    description:
      "Inscription a la waitlist avec confirmation email via Next.js, Supabase et Resend.",
    url: siteUrl,
    siteName,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/waitlist-assets/hero.png",
        width: 1200,
        height: 630,
        alt: "Waitlist 2026 - les vrais moments se vivent ensemble",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liste d'attente 2026",
    description:
      "Une plateforme independante pour celles et ceux qui veulent vraiment y etre.",
    images: ["/waitlist-assets/hero.png"],
  },
  keywords: [
    "waitlist nextjs",
    "liste d'attente evenement",
    "supabase resend nextjs",
    "evenements independants",
    "inscription acces anticipe",
  ],
};

const marqueeItems = [
  "Concerts",
  "Ateliers",
  "Conferences",
  "Soirees",
  "Sport",
  "Marches",
  "Lectures",
  "Expos",
  "Festivals",
  "Rencontres",
];

const manifestoItems = [
  {
    id: "01",
    title: "Trouve ce qui se passe pres de toi.",
    description:
      "Sans algorithme louche. Sans frais caches. Juste ce qui compte, a 2 km ou a l'autre bout du monde.",
    tone: "coral",
  },
  {
    id: "02",
    title: "Vis l'evenement, pas la billetterie.",
    description:
      "Inscription en deux clics, billet QR instantane, tout reste dans la meme page.",
    tone: "sun",
  },
  {
    id: "03",
    title: "Une communaute autour de chaque event.",
    description:
      "Avant, pendant, apres. Le mur reste vivant et tes souvenirs aussi.",
    tone: "grape",
  },
  {
    id: "04",
    title: "Organise sans payer de commission.",
    description:
      "Cree ton atelier, ton concert, ton meetup. C'est gratuit. Pour de vrai.",
    tone: "leaf",
  },
];

const perks = [
  {
    title: "Acces anticipe",
    description: "Tu recois ton invitation avant l'ouverture publique.",
    tone: "coral",
  },
  {
    title: "Badge fondateur",
    description: "Affiche sur ton profil. Gratuit, a vie. Pour les premiers seulement.",
    tone: "sun",
  },
  {
    title: "Voix au chapitre",
    description: "On construit avec vous. Tes retours faconnent les premieres versions.",
    tone: "grape",
  },
];

const photos = {
  crowd: "/waitlist-assets/wl-crowd.jpg",
  workshop: "/waitlist-assets/wl-workshop.jpg",
  dance: "/waitlist-assets/wl-dance.jpg",
  concert: "/waitlist-assets/wl-concert.jpg",
};


function getManifestoToneClass(tone: string) {
  return {
    coral: "manifesto-coral",
    sun: "manifesto-sun",
    grape: "manifesto-grape",
    leaf: "manifesto-leaf",
  }[tone] || "manifesto-coral";
}

function getDotToneClass(tone: string) {
  return {
    coral: "bg-coral",
    sun: "bg-sun",
    grape: "bg-grape",
    leaf: "bg-leaf",
  }[tone] || "bg-coral";
}

function getPerkToneClass(tone: string) {
  return {
    coral: "bg-coral text-ink",
    sun: "bg-sun text-ink",
    grape: "bg-grape text-paper",
    leaf: "bg-leaf text-paper",
  }[tone] || "bg-coral text-ink";
}

function Sticker({
  children,
  variant = "ink",
  className = "",
}: {
  children: ReactNode;
  variant?: "ink" | "outline";
  className?: string;
}) {
  return (
    <span className={`${variant === "ink" ? "sticker" : "sticker-outline"} ${className}`}>
      {children}
    </span>
  );
}

function PhotoCard({
  src,
  alt,
  caption,
  rotate = 0,
  stickerPos = "-bottom-3 -left-3",
  stickerRotate = -6,
  shadow = "ink",
  stickerColor = "paper",
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  rotate?: number;
  stickerPos?: string;
  stickerRotate?: number;
  shadow?: "ink" | "coral" | "sun" | "grape" | "leaf";
  stickerColor?: "paper" | "coral" | "sun" | "grape" | "leaf";
  className?: string;
}) {
  const shadowClass = {
    ink: "",
    coral: "shadow-coral",
    sun: "shadow-sun",
    grape: "shadow-grape",
    leaf: "shadow-leaf",
  }[shadow];

  const stickerBg = {
    paper: "bg-paper text-ink",
    coral: "bg-coral text-ink",
    sun: "bg-sun text-ink",
    grape: "bg-grape text-paper",
    leaf: "bg-leaf text-paper",
  }[stickerColor];

  return (
    <div className={`relative ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <div className={`photo-frame relative aspect-4/5 overflow-hidden border-2 border-ink bg-paper ${shadowClass}`}>
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
      </div>
      <div
        className={`absolute ${stickerPos} ${stickerBg} border-2 border-ink px-3 py-1 font-hand text-xl leading-none whitespace-nowrap`}
        style={{ transform: `rotate(${stickerRotate}deg)` }}
      >
        {caption}
      </div>
    </div>
  );
}

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "fr",
    description:
      "Plateforme independante pour decouvrir, vivre et garder en memoire les evenements qui comptent.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker />

      <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <header className="glass sticky top-0 z-50">
          <div className="mx-auto flex h-14 max-w-350 items-center justify-between px-5 md:px-10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-coral opacity-60 animate-ping" />
                <span className="relative size-2 rounded-full bg-coral" />
              </span>
              <span className="text-sm font-medium tracking-tight">
                Liste d&apos;attente <span className="text-ink/50">· ouverte</span>
              </span>
            </div>

            <nav className="hidden items-center gap-1 text-sm md:flex">
              <a href="#manifesto" className="rounded-full px-3 py-1.5 text-ink/70 transition hover:bg-ink/5 hover:text-ink">
                Manifeste
              </a>
              <a href="#perks" className="rounded-full px-3 py-1.5 text-ink/70 transition hover:bg-ink/5 hover:text-ink">
                Avantages
              </a>
            </nav>

            <CtaLink
              href="#join"
              ctaLocation="header"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white! transition hover:bg-ink/90"
            >
              Rejoindre
              <span aria-hidden>→</span>
            </CtaLink>
          </div>
        </header>

        <section
          className="relative mx-auto max-w-350 overflow-hidden px-5 pb-20 pt-14 md:px-10 md:pb-32 md:pt-24"
          data-track-section="hero"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="blob bg-coral" style={{ width: 320, height: 320, top: "8%", left: "20%", animationDelay: "0s" }} />
            <div className="blob bg-sun" style={{ width: 280, height: 280, top: "55%", right: "15%", animationDelay: "-5s" }} />
            <div className="blob bg-grape" style={{ width: 240, height: 240, bottom: "5%", left: "40%", animationDelay: "-9s", opacity: 0.4 }} />
          </div>

          <div className="grid grid-cols-12 items-start gap-6 md:gap-8">
            <div className="col-span-12 hidden flex-col gap-12 pt-10 md:col-span-3 md:flex">
              <PhotoCard
                src={photos.crowd}
                alt="Trois amis riant ensemble lors d'un evenement"
                caption="vendredi soir."
                rotate={-3}
                shadow="coral"
                stickerColor="sun"
              />
              <PhotoCard
                src={photos.workshop}
                alt="Atelier intimiste"
                caption="atelier · 12 places"
                rotate={2}
                stickerPos="-top-3 -right-3"
                stickerRotate={5}
                shadow="grape"
                stickerColor="coral"
              />
            </div>

            <div className="col-span-12 min-w-0 text-center md:col-span-6">
              <div className="mb-8 flex justify-center gap-2">
                <Sticker variant="outline">Acces anticipe</Sticker>
                <Sticker className="sticker-coral">2026</Sticker>
              </div>

              <h1 className="font-display text-[clamp(2.15rem,5vw,6.2rem)] leading-[0.92] tracking-[-0.03em] text-balance">
                <span className="whitespace-nowrap">Les vrais moments</span>
                <br className="hidden sm:block" />
                <span className="italic font-light">se vivent</span>{" "}
                <span className="relative inline-block">
                  <span className="highlight-coral relative z-10">ensemble</span>
                  <svg
                    className="absolute -bottom-3 left-0 z-0 w-full"
                    viewBox="0 0 300 18"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M2 12 C 80 2, 160 18, 298 6"
                      stroke="hsl(var(--ink))"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                .
              </h1>

              <p className="mx-auto mt-10 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft md:text-xl">
                Une nouvelle facon de decouvrir, vivre et garder en memoire les
                evenements qui comptent. Sans algorithme opaque. Sans commission.
                Juste les gens, les lieux, et l&apos;envie d&apos;y etre.
              </p>

              <div id="join" className="mx-auto mt-10 max-w-lg">
                <WaitlistForm />
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                <div className="flex -space-x-3">
                  {[photos.crowd, photos.dance, photos.workshop, photos.concert].map((src, index) => (
                    <div key={src} className="relative size-10 overflow-hidden rounded-full border-2 border-ink bg-paper-2">
                      <Image src={src} alt="" fill sizes="40px" className="object-cover" priority={index === 0} />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="font-display text-2xl leading-none tabular-nums">
                    <span className="highlight-sun">Pas de spam.</span>
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-ink-soft">
                    Un seul email a l'ouvertures.
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 hidden flex-col gap-12 pt-24 md:col-span-3 md:flex">
              <PhotoCard
                src={photos.dance}
                alt="Deux personnes dansant"
                caption="cours du jeudi"
                rotate={3}
                stickerPos="-top-3 -left-3"
                stickerRotate={-7}
                shadow="sun"
                stickerColor="grape"
              />
              <PhotoCard
                src={photos.concert}
                alt="Concert vu depuis la foule"
                caption="ce soir · a 2 km"
                rotate={-2}
                stickerPos="-bottom-3 -right-3"
                stickerRotate={4}
                shadow="leaf"
                stickerColor="coral"
              />
            </div>

            <div className="col-span-12 mt-6 grid grid-cols-2 gap-5 md:hidden">
              <PhotoCard
                src={photos.crowd}
                alt=""
                caption="vendredi soir"
                rotate={-2}
                shadow="coral"
                stickerColor="sun"
              />
              <PhotoCard
                src={photos.dance}
                alt=""
                caption="cours du jeudi"
                rotate={3}
                stickerPos="-top-3 -right-3"
                stickerRotate={-6}
                shadow="grape"
                stickerColor="coral"
              />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y-2 border-ink bg-ink text-paper">
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap py-4">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`} className="font-display text-2xl italic tracking-tight md:text-3xl">
                {item} <span className="mx-6 text-xl not-italic opacity-60">✺</span>
              </span>
            ))}
          </div>
        </section>

        <section
          id="manifesto"
          className="mx-auto max-w-350 scroll-mt-20 px-5 py-24 md:px-10 md:py-36"
          data-track-section="manifesto"
        >
          <div className="grid grid-cols-12 items-start gap-8 md:gap-12">
            <div className="col-span-12 min-w-0 md:col-span-5">
              <Sticker className="sticker-coral">Notre parti pris</Sticker>
              <h2 className="mt-6 wrap-break-word font-display text-[clamp(2.15rem,8vw,4.75rem)] leading-[0.98] tracking-tight">
                On a perdu l&apos;habitude
                <br />
                de <span className="italic">sortir <span className="highlight-sun">pour de vrai</span></span>.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                Pas par manque d&apos;envie. Par exces d&apos;ecrans, d&apos;invitations
                fantomes et de pages d&apos;evenements qui s&apos;evaporent une fois la
                soiree terminee.
              </p>
            </div>

            <div className="col-span-12 grid min-w-0 gap-4 sm:grid-cols-2 sm:gap-5 md:col-span-7">
              {manifestoItems.map((item) => (
                <div
                  key={item.id}
                  className={`relative min-w-0 border-2 border-ink bg-paper p-5 sm:p-6 ${getManifestoToneClass(item.tone)}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${getDotToneClass(item.tone)}`} />
                    <div className="font-mono-tab text-xs text-ink-soft">{item.id}</div>
                  </div>
                  <h3 className="mt-3 wrap-break-word font-display text-[1.35rem] leading-tight sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="perks"
          className="grain relative border-y-2 border-ink bg-paper-2 scroll-mt-20"
          data-track-section="perks"
        >
          <div className="mx-auto grid max-w-350 grid-cols-12 gap-8 px-5 py-20 md:px-10 md:py-28">
            <div className="col-span-12 hidden md:col-span-6 md:block">
              <Sticker className="sticker-sun">Liste d&apos;attente</Sticker>
              <h2 className="mt-6 font-display text-4xl leading-[0.95] md:text-6xl">
                Trois bonnes raisons
                <br />
                <span className="italic">d&apos;arriver <span className="highlight-coral">en avance</span>.</span>
              </h2>
            </div>

            <div className="col-span-12 md:hidden">
              <div className="border-2 border-ink bg-paper p-5 shadow-[4px_4px_0_hsl(var(--sun))]">
                <Sticker className="sticker-sun">Liste d&apos;attente</Sticker>
                <h2 className="mt-4 font-display text-[1.9rem] leading-none">
                  Trois bonnes raisons
                  <br />
                  <span className="italic">d&apos;arriver <span className="highlight-coral">en avance</span>.</span>
                </h2>
              </div>
            </div>

            <ul className="col-span-12 divide-y-2 divide-ink border-y-2 border-ink md:col-span-6">
              {perks.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[auto,1fr] items-baseline gap-6 py-6">
                  <span className={`font-mono-tab border-2 border-ink px-2 py-1 text-sm font-semibold ${getPerkToneClass(item.tone)}`}>
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">{item.title}</h3>
                    <p className="mt-1 text-ink-soft">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="mx-auto max-w-350 px-3 py-20 sm:px-5 md:px-10 md:py-36"
          data-track-section="final_cta"
        >
          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink text-paper sm:rounded-4xl md:rounded-[3rem]">
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="blob bg-coral" style={{ width: 320, height: 320, top: "-18%", left: "-12%", opacity: 0.4 }} />
              <div className="blob bg-grape" style={{ width: 260, height: 260, bottom: "-16%", right: "6%", opacity: 0.26, animationDelay: "-7s" }} />
              <div className="blob hidden sm:block bg-sun" style={{ width: 220, height: 220, top: "30%", right: "-5%", opacity: 0.3, animationDelay: "-3s" }} />
            </div>

            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--paper)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--paper)) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative grid grid-cols-12 items-start gap-7 px-4 py-8 sm:px-6 sm:py-12 md:items-center md:gap-12 md:px-16 md:py-20">
              <div className="col-span-12 min-w-0 md:col-span-7">
                <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-2xl border border-paper/15 bg-paper/10 px-3 py-1.5 text-left text-[11px] font-medium leading-snug text-paper/90 backdrop-blur sm:rounded-full sm:py-1 sm:text-xs">
                  <span className="size-1.5 rounded-full bg-coral" />
                  Plus que quelques places en acces anticipe
                </div>

                <h2 className="mt-5 wrap-break-word font-display text-[clamp(1.95rem,7.8vw,4.75rem)] leading-none tracking-[-0.02em] text-balance sm:mt-6">
                  Sois la <span className="italic font-light">avant</span>
                  <br />
                  que ca commence.
                </h2>

                <p className="mt-4 max-w-136 wrap-break-word text-[0.97rem] leading-8 text-paper/70 sm:mt-5 sm:text-base md:text-lg">
                  Inscris ton email maintenant. Tu recois ton invitation des
                  l&apos;ouverture, ton badge fondateur, et un acces gratuit a vie
                  aux fonctionnalites premium.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-paper/65 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3 sm:text-xs">
                  <div className="flex items-center gap-2 leading-relaxed">✓ Aucune carte requise</div>
                  <div className="flex items-center gap-2 leading-relaxed">✓ Desinscription en 1 clic</div>
                  <div className="flex items-center gap-2 leading-relaxed">✓ Donnees jamais revendues</div>
                </div>
              </div>

              <div className="col-span-12 min-w-0 md:col-span-5 md:pl-4">
                <div className="rounded-3xl border border-paper/12 bg-paper/6 p-3 backdrop-blur-md sm:rounded-[1.75rem] sm:p-4 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
                  <WaitlistForm variant="dark" buttonLabel="Reserver" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-8">
          <div className="mx-auto max-w-350 px-3 sm:px-5 md:px-10">
            <div className="overflow-hidden rounded-t-[1.75rem] bg-ink px-4 py-8 text-paper sm:px-6 sm:py-10 md:rounded-t-4xl md:px-12 md:py-16">
              <div className="grid grid-cols-12 gap-7 md:gap-10">
                <div className="col-span-12 min-w-0 md:col-span-6">
                  <div className="max-w-2xl wrap-break-word font-display text-[clamp(1.65rem,7vw,3.25rem)] leading-[1.08] tracking-[-0.02em]">
                    Construit pour <span className="italic text-coral">celles et ceux</span> qui veulent vraiment y etre.
                  </div>
                  <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-paper/55 sm:text-sm">
                    Une plateforme independante, sans pub, sans commission. En
                    preparation pour l&apos;ete 2026.
                  </p>
                </div>

                <div className="col-span-12 min-w-0 border-t border-paper/10 pt-5 sm:col-span-7 md:col-span-3 md:col-start-9 md:border-t-0 md:pt-0">
                  <p className="mb-4 text-xs uppercase tracking-[0.16em] text-paper/40">Naviguer</p>
                  <ul className="grid gap-3 text-[0.98rem] sm:grid-cols-3 sm:gap-4 sm:text-sm md:grid-cols-1">
                    <li><a href="#manifesto" className="text-paper/80 transition hover:text-paper">Manifeste</a></li>
                    <li><a href="#perks" className="text-paper/80 transition hover:text-paper">Avantages</a></li>
                    <li>
                      <CtaLink
                        href="#join"
                        ctaLocation="footer"
                        className="text-paper/80 transition hover:text-paper"
                      >
                        Rejoindre
                      </CtaLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-paper/10 pt-5 text-xs text-paper/45 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-coral" />
                  <span>© 2026 — fait avec soin.</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  <a href="#" className="transition hover:text-paper/80">Confidentialite</a>
                  <a href="#" className="transition hover:text-paper/80">Mentions legales</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
