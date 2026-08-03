import { useEffect, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";
import Services from "../components/Services/Services";
import Portfolio from "../components/Portfolio/Portfolio";
import About from "../components/About/About";

// Abaixo da dobra: adiadas com React.lazy para não entrarem no bundle
// inicial (Testimonials usa Swiper, Contact usa Framer Motion pesado).
const Clients = lazy(() => import("../components/Clients/Clients"));
const Testimonials = lazy(() => import("../components/Testimonials/Testimonials"));
const Bastidores = lazy(() => import("../components/Bastidores/Bastidores"));
const CTA = lazy(() => import("../components/CTA/CTA"));
const Contact = lazy(() => import("../components/Contact/Contact"));

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    let attempts = 0;
    let raf;
    const tryScroll = () => {
      const el = document.querySelector(location.hash);
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -80, immediate: true });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }
      // Seção pode ainda estar em um chunk lazy carregando (abaixo da
      // dobra); tenta de novo por até ~2s antes de desistir.
      attempts += 1;
      if (attempts < 40) raf = setTimeout(tryScroll, 50);
    };
    raf = setTimeout(tryScroll, 100);
    return () => clearTimeout(raf);
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <About />
      <Suspense fallback={null}>
        <Clients />
        <Testimonials />
        <Bastidores />
        <CTA />
        <Contact />
      </Suspense>
    </>
  );
}
