import { useEffect } from "react";

const SITE_URL = "https://vitorfreitas.com";
const DEFAULT_TITLE = "Vítor Freitas — Filmmaker | Histórias que Marcam, Imagens que Conectam";
const DEFAULT_DESCRIPTION =
  "Vítor Freitas é filmmaker e fotógrafo no Rio de Janeiro, com mais de 6 anos de experiência e 300+ projetos para marcas como Renner, L'Oréal e BTG Pactual.";
const DEFAULT_IMAGE = `${SITE_URL}/images/logo/logo-horizontal.png`;

function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(path) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", `${SITE_URL}${path === "/" ? "" : path}`);
}

/**
 * Keeps <title>, meta description/OG/Twitter and canonical link in sync
 * with the current route, since this is a client-rendered SPA and each
 * page (Home, projeto/:slug, Política de Privacidade, etc.) needs its
 * own indexable metadata — including a distinct social preview image
 * per case study instead of always reusing the site's generic logo.
 */
export default function useDocumentMeta({
  title,
  description,
  path = "/",
  image,
  noindex = false,
} = {}) {
  useEffect(() => {
    const finalTitle = title ? `${title} | Vítor Freitas` : DEFAULT_TITLE;
    const finalDescription = description || DEFAULT_DESCRIPTION;
    const finalImage = image
      ? image.startsWith("http")
        ? image
        : `${SITE_URL}${image}`
      : DEFAULT_IMAGE;

    document.title = finalTitle;
    setMetaTag("name", "description", finalDescription);
    setMetaTag("property", "og:title", finalTitle);
    setMetaTag("property", "og:description", finalDescription);
    setMetaTag("property", "og:url", `${SITE_URL}${path === "/" ? "" : path}`);
    setMetaTag("property", "og:image", finalImage);
    setMetaTag("name", "twitter:title", finalTitle);
    setMetaTag("name", "twitter:description", finalDescription);
    setMetaTag("name", "twitter:image", finalImage);
    setCanonical(path);

    let robotsEl = document.querySelector('meta[name="robots"]');
    if (!robotsEl) {
      robotsEl = document.createElement("meta");
      robotsEl.setAttribute("name", "robots");
      document.head.appendChild(robotsEl);
    }
    robotsEl.setAttribute("content", noindex ? "noindex, follow" : "index, follow");

    window.scrollTo(0, 0);
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, path, image, noindex]);
}
