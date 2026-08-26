"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ParallaxClient = () => {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!els.length) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        els.forEach((el) => {
          const sp = Number(el.dataset.parallax || "0.12");
          el.style.transform = `translateY(${y * sp}px)`;
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}

export default ParallaxClient;