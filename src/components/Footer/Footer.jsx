import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";
import { FaDribbble } from "react-icons/fa";
import { SiVimeo } from "react-icons/si";
import { navLinks } from "../../data/content";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const goTo = (e, href) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }
    const el = document.querySelector(href);
    if (el && window.lenis) {
      window.lenis.scrollTo(el, { offset: -80 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/[.08] pt-16 pb-8">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-12">
          <div className="flex items-center">
            <img
              src="/images/logo/logo-horizontal.png"
              alt="Vítor Freitas — Filmmaker"
              className="h-10 w-auto object-contain select-none"
              draggable="false"
            />
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
                className="text-xs tracking-[0.1em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors"
                data-cursor-hover
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-4 text-white/60">
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors" data-cursor-hover><FiInstagram /></a>
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors" data-cursor-hover><FaDribbble /></a>
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors" data-cursor-hover><FiLinkedin /></a>
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors" data-cursor-hover><FiYoutube /></a>
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors" data-cursor-hover><SiVimeo /></a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[.06] text-xs text-[var(--color-text-secondary)]">
          <p>© {new Date().getFullYear()} Vítor Freitas. Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/politica-de-privacidade" className="hover:text-white transition-colors" data-cursor-hover>
              Política de Privacidade
            </Link>
            <Link to="/termos-de-uso" className="hover:text-white transition-colors" data-cursor-hover>
              Termos de Uso
            </Link>
            <Link to="/termos-de-agendamento" className="hover:text-white transition-colors" data-cursor-hover>
              Termos de Agendamento
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
