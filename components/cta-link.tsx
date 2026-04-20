"use client";

import type { ReactNode } from "react";

import { pushDataLayerEvent } from "@/lib/gtm";

type CtaLinkProps = {
  children: ReactNode;
  className: string;
  ctaLocation: string;
  href: string;
};

export function CtaLink({
  children,
  className,
  ctaLocation,
  href,
}: CtaLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() =>
        pushDataLayerEvent({
          event: "waitlist_cta_click",
          cta_location: ctaLocation,
          href,
        })
      }
    >
      {children}
    </a>
  );
}
