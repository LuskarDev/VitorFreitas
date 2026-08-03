import { useEffect } from "react";

/**
 * Injects a <script type="application/ld+json"> tag with the given
 * structured-data object while the component is mounted, removing it on
 * unmount. Used for per-page schema (e.g. BreadcrumbList on project pages)
 * that shouldn't leak into other routes of this SPA.
 */
export default function useJsonLd(data, id) {
  useEffect(() => {
    if (!data) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    if (id) script.id = id;
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data), id]);
}
