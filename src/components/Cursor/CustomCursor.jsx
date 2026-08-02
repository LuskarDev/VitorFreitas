import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useIsTouchDevice from "../../hooks/useIsTouchDevice";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");
  const [variant, setVariant] = useState("default");
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.12, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);

    gsap.ticker.add(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    });

    const setHoverState = (el) => {
      const cursorAttr = el.getAttribute?.("data-cursor");
      if (cursorAttr) {
        setVariant("label");
        setLabel(cursorAttr);
      } else if (el.closest?.("a, button, [data-cursor-hover]")) {
        setVariant("hover");
        setLabel("");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    const onOver = (e) => setHoverState(e.target);
    const onOut = (e) => {
      if (!e.relatedTarget) {
        setVariant("default");
        setLabel("");
      }
    };

    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[999] pointer-events-none rounded-full bg-[var(--color-gold)] transition-[width,height] duration-200"
        style={{
          width: variant === "default" ? 8 : 0,
          height: variant === "default" ? 8 : 0,
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[998] pointer-events-none rounded-full border border-[var(--color-gold)] flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          width:
            variant === "hover" ? 64 : variant === "label" ? 84 : 34,
          height:
            variant === "hover" ? 64 : variant === "label" ? 84 : 34,
          background:
            variant === "label"
              ? "rgba(200,169,106,0.95)"
              : "rgba(200,169,106,0.08)",
          borderColor:
            variant === "label" ? "transparent" : "var(--color-gold)",
        }}
      >
        {label && (
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#060606] font-medium">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
