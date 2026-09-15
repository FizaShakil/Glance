import React, { useState } from "react";

const GENERIC_FALLBACK =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80";

/**
 * Resilient image: on error, tries `fallbacks` (then a generic curated
 * image), and if everything fails renders a calm branded placeholder so
 * cards never appear empty.
 */
const Img = ({
  src,
  alt = "",
  fallbacks = [],
  wrapperClassName = "",
  imgClassName = "",
  eager = false,
}) => {
  const [attempt, setAttempt] = useState(0);

  const chain = [src, ...fallbacks, GENERIC_FALLBACK].filter(Boolean);
  const current = chain[attempt];

  if (!current) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-sand via-cream-alt to-line ${wrapperClassName}`}
      >
        <span className="flex flex-col items-center gap-2 text-taupe">
          <i className="fas fa-mountain-sun text-2xl" aria-hidden="true"></i>
          <span className="px-3 text-center font-display text-xs font-medium">Glance</span>
        </span>
      </div>
    );
  }

  return (
    <img
      src={current}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setAttempt((a) => a + 1)}
      className={`${imgClassName} ${wrapperClassName}`}
    />
  );
};

export default Img;