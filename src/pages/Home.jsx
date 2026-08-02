import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";
import Services from "../components/Services/Services";
import Portfolio from "../components/Portfolio/Portfolio";
import About from "../components/About/About";
import Clients from "../components/Clients/Clients";
import Testimonials from "../components/Testimonials/Testimonials";
import Bastidores from "../components/Bastidores/Bastidores";
import CTA from "../components/CTA/CTA";
import Contact from "../components/Contact/Contact";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const t = setTimeout(() => {
      const el = document.querySelector(location.hash);
      if (el && window.lenis) {
        window.lenis.scrollTo(el, { offset: -80, immediate: true });
      } else if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <About />
      <Clients />
      <Testimonials />
      <Bastidores />
      <CTA />
      <Contact />
    </>
  );
}
