"use client";

import { useEffect } from "react";

import { pushDataLayerEvent } from "@/lib/gtm";

export function AnalyticsTracker() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-track-section]")
    );

    if (!sections.length) {
      return;
    }

    const seen = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionId = entry.target.getAttribute("data-track-section");

          if (!sectionId || seen.has(sectionId)) {
            return;
          }

          seen.add(sectionId);
          pushDataLayerEvent({
            event: "waitlist_section_view",
            section_id: sectionId,
          });
        });
      },
      {
        threshold: 0.45,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return null;
}
