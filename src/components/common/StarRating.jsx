import { useState } from "react";
import { HiStar } from "react-icons/hi2";

export default function StarRating({ value, onChange, size = 24 }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
          data-cursor-hover
          className="transition-transform duration-150 hover:scale-110"
        >
          <HiStar
            size={size}
            className={
              n <= (hover || value)
                ? "text-[var(--color-gold)]"
                : "text-white/15"
            }
          />
        </button>
      ))}
    </div>
  );
}
