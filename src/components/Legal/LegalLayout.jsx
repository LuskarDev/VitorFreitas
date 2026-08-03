import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";

/**
 * Consistent shell for the legal pages (Privacy Policy, Terms of Use,
 * Booking Terms): a simple, readable layout with a back-to-site link,
 * a title/subtitle block and a "last updated" stamp.
 */
export default function LegalLayout({ eyebrow, title, updatedAt, children }) {
  return (
    <section className="relative pt-40 pb-28 lg:pt-48 lg:pb-36">
      <div className="max-w-[860px] mx-auto px-6 lg:px-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors mb-10"
          data-cursor-hover
        >
          <HiArrowLeft size={14} />
          Voltar para o site
        </Link>

        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="text-4xl md:text-6xl leading-[0.95] mb-4">{title}</h1>
        {updatedAt && (
          <p className="text-xs text-[var(--color-text-secondary)] mb-14">
            Última atualização: {updatedAt}
          </p>
        )}

        <div className="legal-content space-y-10">{children}</div>
      </div>
    </section>
  );
}

export function LegalSection({ title, children }) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl normal-case font-body font-semibold tracking-normal text-[var(--color-gold)] mb-3">
        {title}
      </h2>
      <div className="space-y-3 text-sm md:text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
        {children}
      </div>
    </div>
  );
}
