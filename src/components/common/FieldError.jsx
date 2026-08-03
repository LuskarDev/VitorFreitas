import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

/**
 * Styled inline validation message shown right under a form field,
 * so the person knows exactly which spot needs attention.
 */
export default function FieldError({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="field-error absolute left-0 top-full mt-1.5 flex items-center gap-1.5 text-[11px] text-[#e2695f]"
        >
          <HiOutlineExclamationCircle size={13} className="shrink-0" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
