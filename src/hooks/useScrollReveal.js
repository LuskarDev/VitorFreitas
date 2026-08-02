import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Applies a fade/slide reveal to every [data-reveal] element inside the ref.
 * data-reveal values: "up" | "left" | "right" | "scale" (default: up)
 * data-reveal-delay: seconds
 */
export default function useScrollReveal(deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = containerRef.current?.querySelectorAll("[data-reveal]");
      els?.forEach((el) => {
        const type = el.getAttribute("data-reveal") || "up";
        const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");

        const from = {
          up: { y: 60, opacity: 0 },
          left: { x: -60, opacity: 0 },
          right: { x: 60, opacity: 0 },
          scale: { scale: 0.9, opacity: 0 },
        }[type];

        gsap.fromTo(
          el,
          from,
          {
            y: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 1.1,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, deps);

  return containerRef;
}
