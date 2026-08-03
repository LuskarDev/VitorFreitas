import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineArrowUpRight, HiBars3, HiXMark } from "react-icons/hi2";
import { navLinks } from "../../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Fecha com Esc e devolve o foco ao botao hamburguer (comportamento
  // esperado de menu mobile por quem navega via teclado/leitor de tela).
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      // Focus trap simples: mantem o Tab circulando dentro do menu aberto.
      if (e.key === "Tab" && mobileMenuRef.current) {
        const focusables = mobileMenuRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      // Menu mobile aberto nunca deve ser escondido "por baixo" da tela
      if (open) {
        lastY = y;
        return;
      }

      const delta = y - lastY;

      if (y < 80) {
        // Sempre visível perto do topo
        setHidden(false);
      } else if (delta > 4) {
        // Rolando para baixo -> esconde o navbar para focar no conteúdo
        setHidden(true);
      } else if (delta < -4) {
        // Rolando para cima -> mostra o navbar de novo
        setHidden(false);
      }

      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const goTo = (href) => {
    setOpen(false);
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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#060606]/85 backdrop-blur-xl border-white/[.08] py-3"
          : "bg-transparent border-transparent py-6"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            goTo("#home");
          }}
          className={`flex items-center transition-transform duration-500 ${
            scrolled ? "scale-90" : "scale-100"
          }`}
          data-cursor-hover
        >
          <img
            src="/images/logo/logo-horizontal.png"
            alt="Vítor Freitas — Filmmaker"
            className="h-9 sm:h-11 w-auto object-contain select-none"
            draggable="false"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => {
            const isActive = location.pathname === "/" && location.hash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(link.href);
                }}
                className="text-xs tracking-[0.15em] uppercase text-[var(--color-text-secondary)] hover:text-white transition-colors relative group"
                data-cursor-hover
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
              </a>
            );
          })}
        </nav>

        <a
          href="#contato"
          onClick={(e) => {
            e.preventDefault();
            goTo("#contato");
          }}
          className="hidden lg:flex items-center gap-2 btn-gold-outline rounded-full px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-medium"
          data-cursor-hover
        >
          Orçamento <HiOutlineArrowUpRight />
        </a>

        <button
          ref={menuButtonRef}
          className="lg:hidden text-white text-2xl"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <HiXMark /> : <HiBars3 />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="lg:hidden overflow-hidden bg-[#060606] border-t border-white/[.08]"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((link) => {
                const isActive = location.pathname === "/" && location.hash === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(link.href);
                    }}
                    className="text-sm tracking-[0.15em] uppercase text-[var(--color-text-secondary)]"
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("#contato");
                }}
                className="btn-gold-outline rounded-full px-6 py-3 text-xs tracking-[0.15em] uppercase text-center mt-2"
              >
                Orçamento
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
